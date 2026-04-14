let partCounter = 0;
let categoryCounter = 0;

function stamp(): string {
  return `${Date.now().toString(36)}${Math.floor(Math.random() * 1000).toString(36)}`;
}

export type PartInput = {
  name: string;
  IPN: string;
  description?: string;
  category?: number;
  active?: boolean;
  assembly?: boolean;
  component?: boolean;
  purchaseable?: boolean;
  salable?: boolean;
  virtual?: boolean;
  trackable?: boolean;
  template?: boolean;
  testable?: boolean;
};

export type CategoryInput = {
  name: string;
  parent?: number | null;
  description?: string;
  structural?: boolean;
};

export function makePart(overrides: Partial<PartInput> = {}): PartInput {
  partCounter += 1;
  const base: PartInput = {
    name: `QA-Part-${stamp()}-${partCounter}`,
    IPN: `QAP-${stamp()}-${partCounter}`,
    description: 'QA generated part',
    active: true,
    assembly: false,
    component: true,
    purchaseable: true,
    salable: false,
    virtual: false,
    trackable: false,
    template: false,
  };
  return { ...base, ...overrides };
}

export function makeCategory(overrides: Partial<CategoryInput> = {}): CategoryInput {
  categoryCounter += 1;
  const base: CategoryInput = {
    name: `QA-Cat-${stamp()}-${categoryCounter}`,
    parent: null,
    description: 'QA generated category',
    structural: false,
  };
  return { ...base, ...overrides };
}

export type CreatedPart = PartInput & { pk: number };
export type CreatedCategory = CategoryInput & { pk: number };
