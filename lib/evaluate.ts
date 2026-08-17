import { benefitBySlug, type BenefitSlug } from "./benefits";
import { ageInMonths, ageInYears, type Profile } from "./profile";

export type MatchStatus = "likely" | "check" | "no";

export interface BenefitResult {
  slug: BenefitSlug;
  status: MatchStatus;
  statusLabel: string;
  reason: string;
  signals: string[];
  amount: string;
  amountLabel: string;
}

const statusOrder: Record<MatchStatus, number> = { likely: 0, check: 1, no: 2 };
const labels: Record<MatchStatus, string> = {
  likely: "Starker Treffer",
  check: "Prüfen lohnt sich",
  no: "Aktuell kein Treffer",
};

function result(
  slug: BenefitSlug,
  status: MatchStatus,
  reason: string,
  signals: string[],
  amount?: string,
  amountLabel?: string,
): BenefitResult {
  const benefit = benefitBySlug.get(slug)!;
  return {
    slug,
    status,
    statusLabel: labels[status],
    reason,
    signals,
    amount: amount ?? benefit.amount,
    amountLabel: amountLabel ?? benefit.amountLabel,
  };
}

function formatDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function ageLabel(months: number) {
  if (months < 1) return "unter einem Monat";
  if (months < 24) return `${months} Monat${months === 1 ? "" : "e"}`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return remainingMonths
    ? `${years} Jahr${years === 1 ? "" : "e"} und ${remainingMonths} Monat${remainingMonths === 1 ? "" : "e"}`
    : `${years} Jahr${years === 1 ? "" : "e"}`;
}

export function evaluateProfile(profile: Profile, now = new Date()): BenefitResult[] {
  const results: BenefitResult[] = [];
  const qualifyingSocialBenefit = profile.existingBenefits.some((item) =>
    ["grundsicherung", "sozialhilfe", "asyl"].includes(item),
  );
  const hasHousingExclusion = qualifyingSocialBenefit;
  const incomeThreshold = profile.adults === 1 ? 600 : 900;
  const childAges = profile.childBirthDates.map((birthDate) => ({
    birthDate,
    months: ageInMonths(birthDate, now),
    years: ageInYears(birthDate, now),
  }));
  const hasCompleteChildDates =
    profile.children > 0 &&
    childAges.length === profile.children &&
    childAges.every((child) => child.months !== null && child.years !== null);
  const minorChildren = childAges.filter(
    (child) => child.years !== null && child.years < 18,
  );
  const adultChildrenUnder25 = childAges.filter(
    (child) => child.years !== null && child.years >= 18 && child.years < 25,
  );
  const possibleAdultEducationCount =
    profile.hasAdultChildInEducation === true ? adultChildrenUnder25.length : 0;
  const kindergeldChildCount = minorChildren.length + possibleAdultEducationCount;
  const hasMinorChild = minorChildren.length > 0;
  const youngestMonths = childAges.reduce<number | null>((youngest, child) => {
    if (child.months === null) return youngest;
    return youngest === null ? child.months : Math.min(youngest, child.months);
  }, null);
  const youngestYears = youngestMonths === null ? null : Math.floor(youngestMonths / 12);
  const childLivesWithApplicant = profile.childcareSituation !== "not-in-household";
  const personallyCaresForChild = ["self", "shared"].includes(
    profile.childcareSituation,
  );

  if (kindergeldChildCount > 0 && hasCompleteChildDates) {
    results.push(
      result(
        "kindergeld",
        "likely",
        "Die angegebenen Geburtsdaten passen zu den grundlegenden Altersregeln.",
        [
          `${minorChildren.length} minderjährige${minorChildren.length === 1 ? "s Kind" : " Kinder"}`,
          ...(possibleAdultEducationCount
            ? [`${possibleAdultEducationCount} volljährige${possibleAdultEducationCount === 1 ? "s Kind" : " Kinder"} unter 25 in Ausbildung oder Studium`]
            : []),
        ],
        `${kindergeldChildCount * 259} €`,
        `pro Monat für ${kindergeldChildCount} möglicherweise berechtigte${kindergeldChildCount === 1 ? "s Kind" : " Kinder"}`,
      ),
    );
  } else if (profile.children > 0 && !hasCompleteChildDates) {
    results.push(
      result(
        "kindergeld",
        "check",
        "Mindestens ein Geburtsdatum fehlt oder ist ungültig. Ohne genaue Altersangaben vergeben wir keinen starken Treffer.",
        [],
      ),
    );
  } else {
    results.push(
      result(
        "kindergeld",
        "no",
        profile.expectingChild
          ? "Kindergeld kann grundsätzlich erst ab der Geburt relevant werden."
          : "Deine Angaben enthalten aktuell kein Kind in einer typischen Kindergeld-Situation.",
        [],
      ),
    );
  }

  if (profile.children === 0 || kindergeldChildCount === 0) {
    results.push(result("kinderzuschlag", "no", "Kinderzuschlag setzt grundsätzlich ein kindergeldberechtigtes Kind unter 25 voraus.", []));
  } else if (!childLivesWithApplicant) {
    results.push(result("kinderzuschlag", "no", "Das für den Check angegebene Kind lebt nicht in deinem Haushalt. Das spricht gegen den typischen KiZ-Fall.", []));
  } else if (qualifyingSocialBenefit) {
    results.push(result("kinderzuschlag", "no", "Eine von dir gewählte Grund- oder Sozialleistung spricht derzeit gegen den typischen KiZ-Fall.", ["Der offizielle Einzelfall kann abweichen"]));
  } else if (profile.grossMonthlyIncome >= incomeThreshold) {
    results.push(
      result(
        "kinderzuschlag",
        "check",
        "Kinderzahl und Mindesteinkommen passen. Ob KiZ zusteht, hängt zusätzlich von Wohnkosten, Vermögen und dem genauen Familieneinkommen ab.",
        [`Mindesteinkommen von ${incomeThreshold} € brutto erreicht`, "Mindestens ein möglicherweise kindergeldberechtigtes Kind unter 25"],
        `bis ${kindergeldChildCount * 297} €`,
        "pro Monat für die möglicherweise berechtigten Kinder",
      ),
    );
  } else {
    results.push(result("kinderzuschlag", "no", `Das angegebene Bruttoeinkommen liegt unter der üblichen Mindesteinkommensgrenze von ${incomeThreshold} €.`, []));
  }

  const hoursAreEligible =
    profile.weeklyWorkingHours !== null && profile.weeklyWorkingHours <= 32;
  const elterngeldAgeWindow = youngestMonths !== null && youngestMonths < 32;
  const basisElterngeldAgeWindow = youngestMonths !== null && youngestMonths < 14;

  if (profile.expectingChild) {
    if (profile.annualTaxableIncomeOver175k) {
      results.push(result("elterngeld", "no", "Das angegebene zu versteuernde Jahreseinkommen liegt über der aktuellen Einkommensgrenze.", []));
    } else if (profile.weeklyWorkingHours !== null && profile.weeklyWorkingHours > 32) {
      results.push(result("elterngeld", "no", "Mehr als 32 Arbeitsstunden pro Woche während des Bezugs sprechen gegen Elterngeld.", [`${profile.weeklyWorkingHours} Arbeitsstunden pro Woche angegeben`]));
    } else {
      results.push(
        result(
          "elterngeld",
          "check",
          "Die Schwangerschaft ist erfasst. Elterngeld kann geplant, aber erst nach der Geburt beantragt werden.",
          [
            profile.dueDate ? `Voraussichtlicher Geburtstermin: ${formatDate(profile.dueDate)}` : "Geburtstermin noch ergänzen",
            profile.weeklyWorkingHours === null ? "Arbeitszeit noch offen" : `${profile.weeklyWorkingHours} Arbeitsstunden pro Woche geplant`,
          ],
        ),
      );
    }
  } else if (!elterngeldAgeWindow) {
    results.push(result("elterngeld", "no", "Es wurde weder eine Schwangerschaft noch ein Kind innerhalb der üblichen Elterngeld-Zeiträume angegeben.", []));
  } else if (!childLivesWithApplicant || !personallyCaresForChild) {
    results.push(result("elterngeld", "no", !childLivesWithApplicant ? "Das Kind lebt laut deinen Angaben nicht mit dir in einem gemeinsamen Haushalt." : "Elterngeld setzt voraus, dass du dein Kind selbst betreust und erziehst.", []));
  } else if (profile.annualTaxableIncomeOver175k) {
    results.push(result("elterngeld", "no", "Das angegebene zu versteuernde Jahreseinkommen liegt über der aktuellen Einkommensgrenze.", []));
  } else if (profile.weeklyWorkingHours !== null && profile.weeklyWorkingHours > 32) {
    results.push(result("elterngeld", "no", "Mehr als 32 Arbeitsstunden pro Woche während des Bezugs sprechen gegen Elterngeld.", [`${profile.weeklyWorkingHours} Arbeitsstunden pro Woche angegeben`]));
  } else if (!hoursAreEligible || profile.annualTaxableIncomeOver175k === null) {
    results.push(
      result(
        "elterngeld",
        "check",
        "Alter und Betreuung passen, aber Arbeitszeit oder Einkommensgrenze sind noch nicht vollständig beantwortet.",
        youngestMonths === null ? [] : [`Jüngstes Kind: ${ageLabel(youngestMonths)}`],
      ),
    );
  } else {
    results.push(
      result(
        "elterngeld",
        basisElterngeldAgeWindow ? "likely" : "check",
        basisElterngeldAgeWindow
          ? "Geburtsdatum, gemeinsamer Haushalt, persönliche Betreuung, Einkommensgrenze und Arbeitszeit passen zu den grundlegenden Regeln."
          : "Das Kind ist älter als 14 Monate. ElterngeldPlus kann je nach bisheriger Aufteilung noch bis zum 32. Lebensmonat relevant sein.",
        [
          `Jüngstes Kind: ${ageLabel(youngestMonths!)}`,
          "Kind lebt im gemeinsamen Haushalt und wird persönlich betreut",
          `${profile.weeklyWorkingHours} Arbeitsstunden pro Woche`,
        ],
      ),
    );
  }

  if (profile.housing !== "other" && !hasHousingExclusion) {
    results.push(
      result(
        "wohngeld",
        "check",
        "Wohnform und Leistungsbezug schließen Wohngeld nicht offensichtlich aus. Die Höhe muss mit Wohnort, Haushaltsgröße, Einkommen und Wohnkosten berechnet werden.",
        [profile.housing === "rent" ? "Mietwohnung angegeben" : "Selbst genutztes Eigentum angegeben", `${profile.adults + profile.children} Personen im Haushalt`],
      ),
    );
  } else {
    results.push(result("wohngeld", "no", hasHousingExclusion ? "Bei deiner ausgewählten Leistung sind Wohnkosten normalerweise bereits berücksichtigt." : "Für die gewählte Wohnsituation ergibt sich hier kein typischer Wohngeld-Fall.", []));
  }

  const broadcastBenefit = profile.existingBenefits.find((item) =>
    ["grundsicherung", "sozialhilfe", "asyl", "bafoeg"].includes(item),
  );
  if (broadcastBenefit) {
    results.push(result("rundfunkbeitrag", "likely", "Eine von dir bezogene Leistung kann eine Befreiung vom Rundfunkbeitrag ermöglichen. Sie muss separat beantragt werden.", ["Passender Leistungsbezug ausgewählt", "Bewilligungsbescheid als Nachweis nötig"]));
  } else {
    results.push(result("rundfunkbeitrag", "no", "Die ausgewählten Leistungen begründen üblicherweise keine direkte Befreiung. Härtefälle können separat geprüft werden.", []));
  }

  const educationBenefit = profile.existingBenefits.some((item) =>
    ["grundsicherung", "sozialhilfe", "asyl", "wohngeld", "kinderzuschlag"].includes(item),
  );
  const likelyHousingOrKiz = results.some((item) =>
    ["wohngeld", "kinderzuschlag"].includes(item.slug) && item.status !== "no",
  );
  if (hasMinorChild && educationBenefit) {
    results.push(result("bildung-und-teilhabe", "likely", "Du hast ein minderjähriges Kind und beziehst eine Leistung, die Zugang zum Bildungspaket schaffen kann.", ["Minderjähriges Kind", "Qualifizierender Leistungsbezug"]));
  } else if (hasMinorChild && likelyHousingOrKiz) {
    results.push(result("bildung-und-teilhabe", "check", "Falls Wohngeld oder Kinderzuschlag bewilligt wird, kann auch das Bildungspaket relevant werden.", ["Minderjähriges Kind", "Wohngeld oder Kinderzuschlag erscheint prüfenswert"]));
  } else {
    results.push(result("bildung-und-teilhabe", "no", "Aktuell fehlt in deinen Angaben die Kombination aus minderjährigem Kind und passendem Leistungsbezug.", []));
  }

  if (profile.singleParent === true && hasMinorChild && profile.missingSupport === true) {
    const uvAmount = youngestYears !== null && youngestYears >= 12
      ? "394 €"
      : youngestYears !== null && youngestYears >= 6
        ? "299 €"
        : "227 €";
    results.push(result("unterhaltsvorschuss", "likely", "Du bist alleinerziehend, betreust ein minderjähriges Kind und erhältst keinen oder zu wenig Unterhalt.", ["Alleinerziehender Haushalt", "Unterhalt fehlt oder reicht nicht", ...(youngestMonths === null ? [] : [`Jüngstes Kind: ${ageLabel(youngestMonths)}`])], uvAmount, "pro Monat für das jüngste Kind; Altersstufe berücksichtigt"));
  } else {
    results.push(result("unterhaltsvorschuss", "no", "Die typische Kombination aus Alleinerziehen, minderjährigem Kind und fehlendem Unterhalt liegt nicht vor.", []));
  }

  if (profile.expectingChild && profile.employed && profile.statutoryInsurance) {
    results.push(result("mutterschaftsgeld", "likely", "Schwangerschaft, Beschäftigung und eigene gesetzliche Krankenversicherung passen zum häufigsten Mutterschaftsgeld-Fall.", [profile.dueDate ? `Voraussichtlicher Geburtstermin: ${formatDate(profile.dueDate)}` : "Schwangerschaft angegeben", "Beschäftigt und selbst gesetzlich versichert"]));
  } else if (profile.expectingChild) {
    results.push(result("mutterschaftsgeld", "check", "Auch in deiner Beschäftigungs- oder Versicherungssituation kann eine Leistung möglich sein. Zuständig kann statt der Krankenkasse das Bundesamt sein.", [profile.dueDate ? `Voraussichtlicher Geburtstermin: ${formatDate(profile.dueDate)}` : "Schwangerschaft angegeben"]));
  } else {
    results.push(result("mutterschaftsgeld", "no", "Mutterschaftsgeld ist rund um die gesetzlichen Schutzfristen vor und nach einer Geburt relevant.", []));
  }

  return results.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}
