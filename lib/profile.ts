export const STORAGE_KEY = "anspruch-profile:v2";
const LEGACY_STORAGE_KEY = "anspruch-profile:v1";

export type ExistingBenefit =
  | "grundsicherung"
  | "sozialhilfe"
  | "asyl"
  | "bafoeg"
  | "wohngeld"
  | "kinderzuschlag";

export type ChildcareSituation =
  | "not-specified"
  | "self"
  | "shared"
  | "not-personal"
  | "not-in-household";

export interface Profile {
  adults: 1 | 2;
  children: number;
  childBirthDates: string[];
  hasAdultChildInEducation: boolean | null;
  expectingChild: boolean | null;
  dueDate: string;
  childcareSituation: ChildcareSituation;
  singleParent: boolean | null;
  missingSupport: boolean | null;
  grossMonthlyIncome: number;
  previousNetIncome: number;
  annualTaxableIncomeOver175k: boolean | null;
  weeklyWorkingHours: number | null;
  housing: "rent" | "own" | "other";
  monthlyHousingCost: number;
  existingBenefits: ExistingBenefit[];
  employed: boolean | null;
  statutoryInsurance: boolean | null;
}

export const defaultProfile: Profile = {
  adults: 1,
  children: 0,
  childBirthDates: [],
  hasAdultChildInEducation: null,
  expectingChild: null,
  dueDate: "",
  childcareSituation: "not-specified",
  singleParent: null,
  missingSupport: null,
  grossMonthlyIncome: 0,
  previousNetIncome: 0,
  annualTaxableIncomeOver175k: null,
  weeklyWorkingHours: null,
  housing: "rent",
  monthlyHousingCost: 0,
  existingBenefits: [],
  employed: null,
  statutoryInsurance: null,
};

function dateParts(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day, date };
}

export function ageInMonths(birthDate: string, now = new Date()) {
  const parsed = dateParts(birthDate);
  if (!parsed) return null;
  let months =
    (now.getUTCFullYear() - parsed.year) * 12 +
    (now.getUTCMonth() + 1 - parsed.month);
  if (now.getUTCDate() < parsed.day) months -= 1;
  return months >= 0 ? months : null;
}

export function ageInYears(birthDate: string, now = new Date()) {
  const months = ageInMonths(birthDate, now);
  return months === null ? null : Math.floor(months / 12);
}

export function isValidBirthDate(value: string, now = new Date()) {
  const parsed = dateParts(value);
  return Boolean(parsed && parsed.date.getTime() <= now.getTime());
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      ...defaultProfile,
      ...parsed,
      childBirthDates: Array.isArray(parsed.childBirthDates)
        ? parsed.childBirthDates.slice(0, 12)
        : [],
      existingBenefits: Array.isArray(parsed.existingBenefits)
        ? parsed.existingBenefits
        : [],
    } as Profile;
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
  window.localStorage.removeItem(LEGACY_STORAGE_KEY);
}
