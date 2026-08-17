import { benefitBySlug, type BenefitSlug } from "./benefits";
import type { Profile } from "./profile";

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

function hasMinorChild(profile: Profile) {
  return profile.children > 0 && !["none", "adult", "unborn"].includes(profile.youngestAge);
}

export function evaluateProfile(profile: Profile): BenefitResult[] {
  const results: BenefitResult[] = [];
  const qualifyingSocialBenefit = profile.existingBenefits.some((item) =>
    ["grundsicherung", "sozialhilfe", "asyl"].includes(item),
  );
  const hasHousingExclusion = qualifyingSocialBenefit;
  const incomeThreshold = profile.adults === 1 ? 600 : 900;

  if (hasMinorChild(profile) || (profile.children > 0 && profile.hasAdultChildInEducation)) {
    results.push(
      result(
        "kindergeld",
        "likely",
        "Die grundlegenden Altersangaben deines Kindes passen.",
        [
          `${profile.children} Kind${profile.children === 1 ? "" : "er"} im Haushalt`,
          profile.hasAdultChildInEducation ? "Kind über 18 in Ausbildung oder Studium" : "Mindestens ein minderjähriges Kind",
        ],
        `${profile.children * 259} €`,
        "pro Monat für deine angegebene Kinderzahl",
      ),
    );
  } else {
    results.push(result("kindergeld", "no", "Deine Angaben enthalten aktuell kein Kind in einer typischen Kindergeld-Situation.", []));
  }

  if (profile.children === 0 || !hasMinorChild(profile)) {
    results.push(result("kinderzuschlag", "no", "Kinderzuschlag setzt grundsätzlich ein kindergeldberechtigtes Kind voraus.", []));
  } else if (qualifyingSocialBenefit) {
    results.push(result("kinderzuschlag", "no", "Eine von dir gewählte Grund- oder Sozialleistung spricht derzeit gegen den typischen KiZ-Fall.", ["Der offizielle Einzelfall kann abweichen"]));
  } else if (profile.grossMonthlyIncome >= incomeThreshold) {
    results.push(
      result(
        "kinderzuschlag",
        "check",
        "Kinderzahl und Mindesteinkommen passen. Ob KiZ zusteht, hängt zusätzlich von Wohnkosten, Vermögen und dem genauen Familieneinkommen ab.",
        [`Mindesteinkommen von ${incomeThreshold} € brutto erreicht`, "Mindestens ein minderjähriges Kind"],
        `bis ${profile.children * 297} €`,
        "pro Monat für deine angegebene Kinderzahl",
      ),
    );
  } else {
    results.push(result("kinderzuschlag", "no", `Das angegebene Bruttoeinkommen liegt unter der üblichen Mindesteinkommensgrenze von ${incomeThreshold} €.`, []));
  }

  const youngBaby = ["under1", "oneTo5"].includes(profile.youngestAge);
  if ((profile.expectingChild || youngBaby) && !profile.annualTaxableIncomeOver175k && !profile.worksOver32Hours) {
    const estimated = profile.previousNetIncome
      ? Math.max(300, Math.min(1800, Math.round(profile.previousNetIncome * 0.65)))
      : null;
    results.push(
      result(
        "elterngeld",
        youngBaby ? "likely" : "check",
        profile.expectingChild
          ? "Deine Angaben sprechen dafür, Elterngeld jetzt zu planen. Beantragt wird es nach der Geburt."
          : "Alter des Kindes, Einkommensgrenze und Arbeitszeit passen zu den grundlegenden Regeln.",
        ["Einkommensgrenze nicht überschritten", "Arbeitszeit bis 32 Stunden angegeben"],
        estimated ? `ca. ${estimated} €` : undefined,
        estimated ? "grobe Monatsorientierung; offiziell berechnen lassen" : undefined,
      ),
    );
  } else {
    const reason = profile.annualTaxableIncomeOver175k
      ? "Das angegebene zu versteuernde Jahreseinkommen liegt über der aktuellen Einkommensgrenze."
      : profile.worksOver32Hours
        ? "Mehr als 32 Wochenstunden während des Bezugs sprechen gegen Elterngeld."
        : "Deine Angaben enthalten aktuell keine Schwangerschaft oder ein sehr junges Kind.";
    results.push(result("elterngeld", "no", reason, []));
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
  if (hasMinorChild(profile) && educationBenefit) {
    results.push(result("bildung-und-teilhabe", "likely", "Du hast ein minderjähriges Kind und beziehst eine Leistung, die Zugang zum Bildungspaket schaffen kann.", ["Minderjähriges Kind", "Qualifizierender Leistungsbezug"]));
  } else if (hasMinorChild(profile) && likelyHousingOrKiz) {
    results.push(result("bildung-und-teilhabe", "check", "Falls Wohngeld oder Kinderzuschlag bewilligt wird, kann auch das Bildungspaket relevant werden.", ["Minderjähriges Kind", "Wohngeld oder Kinderzuschlag erscheint prüfenswert"]));
  } else {
    results.push(result("bildung-und-teilhabe", "no", "Aktuell fehlt in deinen Angaben die Kombination aus minderjährigem Kind und passendem Leistungsbezug.", []));
  }

  if (profile.singleParent && hasMinorChild(profile) && profile.missingSupport) {
    const uvAmount = profile.youngestAge === "twelveTo17" ? "394 €" : profile.youngestAge === "sixTo11" ? "299 €" : "227 €";
    results.push(result("unterhaltsvorschuss", "likely", "Du bist alleinerziehend, betreust ein minderjähriges Kind und erhältst keinen oder zu wenig Unterhalt.", ["Alleinerziehender Haushalt", "Unterhalt fehlt oder reicht nicht"], uvAmount, "pro Monat für das jüngste Kind; Altersstufe berücksichtigt"));
  } else {
    results.push(result("unterhaltsvorschuss", "no", "Die typische Kombination aus Alleinerziehen, minderjährigem Kind und fehlendem Unterhalt liegt nicht vor.", []));
  }

  if (profile.expectingChild && profile.employed && profile.statutoryInsurance) {
    results.push(result("mutterschaftsgeld", "likely", "Schwangerschaft, Beschäftigung und gesetzliche Krankenversicherung passen zum häufigsten Mutterschaftsgeld-Fall.", ["Schwangerschaft angegeben", "Beschäftigt und gesetzlich versichert"]));
  } else if (profile.expectingChild) {
    results.push(result("mutterschaftsgeld", "check", "Auch in deiner Versicherungssituation kann eine Leistung möglich sein. Zuständig kann statt der Krankenkasse das Bundesamt sein.", ["Schwangerschaft angegeben"]));
  } else {
    results.push(result("mutterschaftsgeld", "no", "Mutterschaftsgeld ist rund um die gesetzlichen Schutzfristen vor und nach einer Geburt relevant.", []));
  }

  return results.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}
