#!/usr/bin/env bash
# compare-against-main.sh — capture baselines on `main` then compare them
# against the current working tree. Use on a dev branch to prove whether your
# changes produced unintended visual regressions.
#
# Flow:
#   1. Stash current changes.
#   2. Checkout main, capture baselines into /tmp/qa-main-baseline/.
#   3. Return to the original branch, restore stash.
#   4. Point CHECKPOINT_MODE=compare at /tmp/qa-main-baseline/ and run the suite.
#
# Env:
#   QA_BASELINE_DIR      override capture/compare dir (default: /tmp/qa-main-baseline)
#   QA_BASELINE_REFRESH  set 1 to force re-capture even if the dir exists

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UI_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(git -C "$UI_DIR" rev-parse --show-toplevel)"
BASELINE_DIR="${QA_BASELINE_DIR:-/tmp/qa-main-baseline}"

cd "$REPO_ROOT"
CURRENT_REF="$(git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD)"
echo "[compare-main] current branch: $CURRENT_REF"

if [[ -z "${QA_BASELINE_REFRESH:-}" && -d "$BASELINE_DIR" ]]; then
  echo "[compare-main] using cached baselines at $BASELINE_DIR (QA_BASELINE_REFRESH=1 to force)"
else
  echo "[compare-main] capturing fresh baselines from main into $BASELINE_DIR"
  STASH=""
  if ! git diff-index --quiet HEAD --; then
    STASH="qa-baseline-$(date +%s)"
    git stash push -u -m "$STASH" > /dev/null
    echo "[compare-main] stashed working tree as '$STASH'"
  fi
  trap 'cleanup' EXIT
  cleanup() {
    local exit_code=$?
    cd "$REPO_ROOT"
    git checkout -q "$CURRENT_REF" 2>/dev/null || true
    if [[ -n "$STASH" ]]; then
      # Find the stash by message.
      STASH_REF=$(git stash list --format='%gd %gs' | grep "$STASH" | awk '{print $1}' | head -1)
      if [[ -n "$STASH_REF" ]]; then
        git stash pop "$STASH_REF" > /dev/null
        echo "[compare-main] restored stash"
      fi
    fi
    exit "$exit_code"
  }

  git checkout -q main
  echo "[compare-main] on main: $(git rev-parse --short HEAD)"

  rm -rf "$BASELINE_DIR"
  mkdir -p "$BASELINE_DIR"

  # Playwright writes baselines relative to the spec. Redirect via env read by
  # helpers/checkpoint.ts (QA_CHECKPOINT_ROOT).
  ( cd "$UI_DIR"
    QA_CHECKPOINT_ROOT="$BASELINE_DIR" CHECKPOINT_MODE=capture \
      npx playwright test \
        tests/0-baseline-seeded.spec.ts \
        tests/a-parts-category-create.spec.ts \
        tests/h-parts-bom-ui.spec.ts \
        tests/k-parts-pricing-ui.spec.ts \
        --reporter=list
  )
fi

# Back to original ref (or no-op if we never left).
cd "$REPO_ROOT"
git checkout -q "$CURRENT_REF" 2>/dev/null || true

# Compare current tree against the main baselines.
echo ""
echo "[compare-main] running compare on $CURRENT_REF against main baselines"
( cd "$UI_DIR"
  QA_CHECKPOINT_ROOT="$BASELINE_DIR" CHECKPOINT_MODE=compare \
    npx playwright test \
      tests/0-baseline-seeded.spec.ts \
      tests/a-parts-category-create.spec.ts \
      tests/h-parts-bom-ui.spec.ts \
      tests/k-parts-pricing-ui.spec.ts \
      --reporter=list
) || true

echo ""
echo "[compare-main] building HTML diff report…"
( cd "$UI_DIR" && QA_CHECKPOINT_ROOT="$BASELINE_DIR" npx tsx scripts/build-diff-report.ts )

echo ""
echo "[compare-main] open:  xdg-open $BASELINE_DIR/../report.html (or $UI_DIR/baseline/report.html)"
