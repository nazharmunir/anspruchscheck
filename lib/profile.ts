export const STORAGE_KEY = "anspruch-profile:v1";

export type ExistingBenefit =
  | "grundsicherung"
  | "sozialhilfe"
  | "asyl"
  | "bafoeg"
  | "wohngeld"
  | "kinderzuschlag";

export type YoungestAge =
  | "none"
  | "unborn"
  | "under1"
  | "oneTo5"
  | "sixTo11"
  | "twelveTo17"
  | "adult";

export interface Profile {
  adults: 1 | 2;
  children: number;
  youngestAge: YoungestAge;
  hasAdultChildInEducation: boolean;
  expectingChild: boolean;
  singleParent: boolean;
  missingSupport: boolean;
  grossMonthlyIncome: number;
  previousNetIncome: number;
  annualTaxableIncomeOver175k: boolean;
  worksOver32Hours: boolean;
  housing: "rent" | "own" | "other";
  monthlyHousingCost: number;
  existingBenefits: ExistingBenefit[];
  employed: boolean;
  statutoryInsurance: boolean;
}

export const defaultProfile: Profile = {
  adults: 1,
  children: 0,
  youngestAge: "none",
  hasAdultChildInEducation: false,
  expectingChild: false,
  singleParent: false,
  missingSupport: false,
  grossMonthlyIncome: 0,
  previousNetIncome: 0,
  annualTaxableIncomeOver175k: false,
  worksOver32Hours: false,
  housing: "rent",
  monthlyHousingCost: 0,
  existingBenefits: [],
  employed: false,
  statutoryInsurance: false,
};

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return { ...defaultProfile, ...JSON.parse(raw) } as Profile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
