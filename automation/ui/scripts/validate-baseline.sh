#!/usr/bin/env bash
# validate-baseline.sh — prove the checkpoint baselines catch visual defects.
# Runs the checkpoint subset in compare mode with a client-side defect injected
# via Playwright's page.addInitScript (see fixtures/auth.ts). No container
# patching, no sudo, no cleanup risk.
#
# Usage:
#   ./scripts/validate-baseline.sh                 # default: buttons-magenta
#   ./scripts/validate-baseline.sh <defect>
#   ./scripts/validate-baseline.sh all             # run every defect in sequence
#
# Available defects:
#   color / style          buttons-magenta, invert-colors, comic-sans
#   layout                 shift-layout, zoom-out, shrink-buttons, wiggle-table
#   hidden elements        hide-nav, hide-icons, remove-labels
#   form regressions       dim-inputs, red-rows
#   text / content         rename-submit, currency-euro
#   overlay                fake-loading
#
# Exit codes:
#   0 — baseline caught the defect (expected)
#   1 — baseline passed despite the defect (too loose — tighten masking)

set -euo pipefail

DEFECT="${1:-buttons-magenta}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UI_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$UI_DIR"

# "all" mode — run every known defect in sequence, report a summary table.
if [[ "$DEFECT" == "all" ]]; then
  DEFECTS=(
    buttons-magenta hide-nav shift-layout rename-submit
    zoom-out hide-icons dim-inputs red-rows comic-sans
    shrink-buttons invert-colors remove-labels wiggle-table
    fake-loading currency-euro
  )
  declare -A RESULTS
  for d in "${DEFECTS[@]}"; do
    echo ""
    echo "========================================"
    echo "[validate-all] running defect: $d"
    echo "========================================"
    if "$0" "$d" > "/tmp/validate-$d.log" 2>&1; then
      RESULTS[$d]="CAUGHT"
    else
      RESULTS[$d]="MISSED"
    fi
  done
  echo ""
  echo "========================================"
  echo "[validate-all] summary"
  echo "========================================"
  for d in "${DEFECTS[@]}"; do
    printf "  %-20s %s\n" "$d" "${RESULTS[$d]}"
  done
  MISSED=$(printf '%s\n' "${RESULTS[@]}" | grep -c MISSED || true)
  echo ""
  if [[ "$MISSED" -eq 0 ]]; then
    echo "[validate-all] PASS — all ${#DEFECTS[@]} defects caught"
    exit 0
  else
    echo "[validate-all] FAIL — $MISSED / ${#DEFECTS[@]} defects slept through"
    exit 1
  fi
fi

echo "[validate] defect: $DEFECT (injected via page.addInitScript)"

# Clear stale .actual.* from previous runs so the diff report reflects only
# this defect's detected changes.
find "$UI_DIR/baseline" -maxdepth 3 -name '*.actual.*' -type f -delete 2>/dev/null || true

set +e
CHECKPOINT_MODE=compare CHECKPOINT_DEFECT="$DEFECT" npx playwright test \
  tests/a-parts-category-create.spec.ts \
  tests/h-parts-bom-ui.spec.ts \
  tests/k-parts-pricing-ui.spec.ts \
  --reporter=list > /tmp/validate-baseline.log 2>&1
RESULT=$?
set -e

PASSED=$(grep -E '^\s+[0-9]+ passed' /tmp/validate-baseline.log | tail -1 || true)
FAILED=$(grep -E '^\s+[0-9]+ failed' /tmp/validate-baseline.log | tail -1 || true)
echo ""
echo "[validate] suite result: $PASSED $FAILED"
echo "[validate] full log: /tmp/validate-baseline.log"

if [[ "$RESULT" -ne 0 ]]; then
  echo "[validate] PASS — baseline caught the '$DEFECT' defect"
  echo ""
  echo "[validate] caught diffs:"
  grep -hE 'PNG differs|HTML differs|Requests differ' test-results/*/error-context.md 2>/dev/null |
    sort -u | sed 's|/home/.*/baseline/|  |; s|\.actual\.|.|' | head -20
  echo ""
  echo "[validate] building HTML diff report…"
  npx tsx "$SCRIPT_DIR/build-diff-report.ts" 2>&1 | sed 's/^/  /'
  exit 0
else
  echo "[validate] FAIL — baseline slept through the '$DEFECT' defect"
  echo "[validate] either the defect is too subtle or the masking is too loose"
  exit 1
fi
