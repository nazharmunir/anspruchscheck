export type BenefitSlug =
  | "kindergeld"
  | "kinderzuschlag"
  | "elterngeld"
  | "wohngeld"
  | "rundfunkbeitrag"
  | "bildung-und-teilhabe"
  | "unterhaltsvorschuss"
  | "mutterschaftsgeld";

export interface BenefitPage {
  slug: BenefitSlug;
  name: string;
  shortName: string;
  kicker: string;
  summary: string;
  amount: string;
  amountLabel: string;
  symbol: string;
  tone: "mint" | "amber" | "blue" | "rose";
  intro: string;
  whoShouldCheck: string[];
  documents: string[];
  nextSteps: string[];
  sourceName: string;
  sourceUrl: string;
  verified: string;
}

export const benefits: BenefitPage[] = [
  {
    slug: "kindergeld",
    name: "Kindergeld",
    shortName: "Kindergeld",
    kicker: "Familie",
    summary: "Monatliche Grundunterstützung für Kinder – unabhängig vom Einkommen der Eltern.",
    amount: "259 €",
    amountLabel: "pro Monat und berechtigtem Kind",
    symbol: "K",
    tone: "mint",
    intro:
      "Kindergeld wird grundsätzlich bis zum 18. Geburtstag gezahlt. Bei Ausbildung, Studium, Arbeitssuche oder besonderen Situationen kann es darüber hinaus weiterlaufen.",
    whoShouldCheck: [
      "Eltern mit Kindern unter 18 Jahren",
      "Eltern mit Kindern bis 24 in Ausbildung oder Studium",
      "Familien, die nach Deutschland gezogen sind oder deren Situation sich geändert hat",
    ],
    documents: [
      "Steuer-Identifikationsnummern von Elternteil und Kind",
      "Geburtsurkunde",
      "Bei Kindern über 18: Nachweis über Schule, Ausbildung oder Studium",
      "Bankverbindung",
    ],
    nextSteps: [
      "Grunddaten des Kindes und der antragstellenden Person bereithalten",
      "Online-Antrag bei der Familienkasse starten",
      "Nachweise digital hochladen oder nachreichen",
    ],
    sourceName: "Bundesagentur für Arbeit",
    sourceUrl: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld",
    verified: "17.08.2026",
  },
  {
    slug: "kinderzuschlag",
    name: "Kinderzuschlag (KiZ)",
    shortName: "Kinderzuschlag",
    kicker: "Familie & Einkommen",
    summary: "Zusätzliche Hilfe, wenn das Einkommen für die Eltern reicht, aber für die ganze Familie knapp ist.",
    amount: "bis 297 €",
    amountLabel: "pro Monat und Kind",
    symbol: "+",
    tone: "amber",
    intro:
      "Der Kinderzuschlag ergänzt das Kindergeld. Die Familienkasse berücksichtigt Einkommen, Wohnkosten, Vermögen und die Situation jedes Kindes – deshalb ist ein offizieller Detailcheck nötig.",
    whoShouldCheck: [
      "Paare mit mindestens 900 € monatlichem Bruttoeinkommen",
      "Alleinerziehende mit mindestens 600 € monatlichem Bruttoeinkommen",
      "Familien, deren Einkommen den eigenen Bedarf deckt, aber kaum den Bedarf der Kinder",
    ],
    documents: [
      "Einkommensnachweise der letzten sechs Monate",
      "Mietvertrag und aktuelle Wohnkosten",
      "Nachweise über Vermögen, Unterhalt oder Unterhaltsvorschuss",
      "Kindergeldnummer",
    ],
    nextSteps: [
      "Mit dem offiziellen KiZ-Lotsen eine Vorprüfung durchführen",
      "Unterlagen für alle Haushaltsmitglieder sammeln",
      "Antrag bei der Familienkasse stellen",
    ],
    sourceName: "Familienkasse der Bundesagentur für Arbeit",
    sourceUrl: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen",
    verified: "17.08.2026",
  },
  {
    slug: "elterngeld",
    name: "Elterngeld",
    shortName: "Elterngeld",
    kicker: "Baby & Elternzeit",
    summary: "Einkommensersatz, wenn Eltern nach der Geburt weniger oder vorübergehend nicht arbeiten.",
    amount: "300–1.800 €",
    amountLabel: "Basiselterngeld pro Monat",
    symbol: "E",
    tone: "blue",
    intro:
      "Basiselterngeld liegt grundsätzlich zwischen 300 und 1.800 Euro monatlich. ElterngeldPlus, Bezugsmonate, frühere Einkünfte und die Arbeitszeit beeinflussen das Ergebnis.",
    whoShouldCheck: [
      "Werdende Eltern und Eltern mit einem sehr jungen Kind",
      "Eltern, die während des Bezugs höchstens 32 Stunden pro Woche arbeiten",
      "Haushalte unter der Grenze von 175.000 € zu versteuerndem Jahreseinkommen",
    ],
    documents: [
      "Geburtsurkunde",
      "Einkommensnachweise aus dem Bemessungszeitraum",
      "Nachweis über Mutterschaftsgeld",
      "Arbeitgeberbescheinigung zu Arbeitszeit oder Elternzeit",
    ],
    nextSteps: [
      "Bezugsmodell und Aufteilung zwischen den Eltern planen",
      "Offiziellen Elterngeldrechner nutzen",
      "Antrag nach der Geburt bei der zuständigen Elterngeldstelle einreichen",
    ],
    sourceName: "Familienportal des Bundes",
    sourceUrl: "https://familienportal.de/familienportal/familienleistungen/elterngeld",
    verified: "17.08.2026",
  },
  {
    slug: "wohngeld",
    name: "Wohngeld",
    shortName: "Wohngeld",
    kicker: "Wohnen",
    summary: "Zuschuss zur Miete oder zu Belastungen von selbst genutztem Wohneigentum.",
    amount: "individuell",
    amountLabel: "nach Haushalt, Einkommen und Wohnort",
    symbol: "W",
    tone: "rose",
    intro:
      "Wohngeld richtet sich nach Haushaltsgröße, berücksichtigtem Einkommen, Wohnkosten und der Mietenstufe der Gemeinde. Wer bereits eine Leistung mit enthaltenen Wohnkosten bezieht, ist häufig ausgeschlossen.",
    whoShouldCheck: [
      "Mieterinnen und Mieter mit niedrigem bis mittlerem Einkommen",
      "Eigentümerinnen und Eigentümer mit selbst genutztem Wohnraum",
      "Haushalte, die keine Grundsicherung mit bereits berücksichtigten Wohnkosten erhalten",
    ],
    documents: [
      "Mietvertrag oder Nachweise zu Eigentumsbelastungen",
      "Einkommensnachweise aller Haushaltsmitglieder",
      "Nachweise über Heiz- und Nebenkosten",
      "Melde- und Ausweisdokumente",
    ],
    nextSteps: [
      "Offiziellen Wohngeldrechner für eine erste Orientierung nutzen",
      "Zuständige Wohngeldstelle der Stadt oder Gemeinde ermitteln",
      "Antrag möglichst früh stellen, da der Antragsmonat wichtig ist",
    ],
    sourceName: "Bundesministerium für Wohnen",
    sourceUrl: "https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html",
    verified: "17.08.2026",
  },
  {
    slug: "rundfunkbeitrag",
    name: "Rundfunkbeitrag-Befreiung",
    shortName: "Rundfunkbeitrag",
    kicker: "Haushaltskosten",
    summary: "Befreiung oder Ermäßigung für bestimmte Sozialleistungsbeziehende und Härtefälle.",
    amount: "18,36 €",
    amountLabel: "mögliche Ersparnis pro Monat und Wohnung",
    symbol: "R",
    tone: "blue",
    intro:
      "Die Befreiung erfolgt nicht automatisch. Ein passender Bewilligungsbescheid muss zusammen mit dem Antrag eingereicht werden. Wohngeld oder Arbeitslosengeld I allein reichen normalerweise nicht.",
    whoShouldCheck: [
      "Beziehende von Grundsicherung, Sozialhilfe oder Asylbewerberleistungen",
      "Bestimmte BAföG-Empfängerinnen und -Empfänger, die nicht bei den Eltern wohnen",
      "Personen in einem eng definierten finanziellen Härtefall",
    ],
    documents: [
      "Aktueller Bewilligungsbescheid",
      "Beitragsnummer, falls vorhanden",
      "Bei Härtefall: Ablehnungsbescheid und Einkommensnachweise",
    ],
    nextSteps: [
      "Prüfen, ob der Leistungsbescheid den benötigten Zeitraum ausweist",
      "Befreiungsformular online ausfüllen",
      "Nachweis beifügen und Antrag absenden",
    ],
    sourceName: "ARD ZDF Deutschlandradio Beitragsservice",
    sourceUrl: "https://www.rundfunkbeitrag.de/buergerinnen-und-buerger/formulare/befreiung-oder-ermaessigung-beantragen",
    verified: "17.08.2026",
  },
  {
    slug: "bildung-und-teilhabe",
    name: "Bildung und Teilhabe",
    shortName: "Bildung & Teilhabe",
    kicker: "Kinder & Schule",
    summary: "Unterstützung für Mittagessen, Ausflüge, Lernförderung, Schulweg, Sport und Kultur.",
    amount: "mehrere Leistungen",
    amountLabel: "abhängig vom konkreten Bedarf",
    symbol: "B",
    tone: "mint",
    intro:
      "Das Bildungspaket unterstützt Kinder und junge Menschen in Familien mit geringem Einkommen. Der Zugang entsteht häufig über Kinderzuschlag, Wohngeld, Grundsicherung, Sozialhilfe oder Asylbewerberleistungen.",
    whoShouldCheck: [
      "Familien mit Kinderzuschlag oder Wohngeld",
      "Familien mit Grundsicherung, Sozialhilfe oder Asylbewerberleistungen",
      "Schülerinnen und Schüler sowie Kinder in Kita oder Tagespflege",
    ],
    documents: [
      "Aktueller Leistungsbescheid",
      "Schul- oder Kita-Nachweis",
      "Nachweis über den konkreten Bedarf, etwa Ausflug oder Vereinsbeitrag",
    ],
    nextSteps: [
      "Konkreten Bedarf und zuständige kommunale Stelle ermitteln",
      "Nachweis der Schule, Kita oder des Anbieters besorgen",
      "Leistung vor der Zahlung beantragen, wenn die Kommune dies verlangt",
    ],
    sourceName: "Bundesagentur für Arbeit",
    sourceUrl: "https://www.arbeitsagentur.de/familie-und-kinder/informationen-zum-bildungspaket",
    verified: "17.08.2026",
  },
  {
    slug: "unterhaltsvorschuss",
    name: "Unterhaltsvorschuss",
    shortName: "Unterhaltsvorschuss",
    kicker: "Alleinerziehend",
    summary: "Staatliche Zahlung, wenn der andere Elternteil keinen oder zu wenig Unterhalt zahlt.",
    amount: "227–394 €",
    amountLabel: "pro Monat und Kind – je nach Alter",
    symbol: "U",
    tone: "amber",
    intro:
      "Unterhaltsvorschuss kann Kindern bis zum 18. Geburtstag zustehen, die überwiegend von einem Elternteil betreut werden und keinen ausreichenden Unterhalt erhalten.",
    whoShouldCheck: [
      "Alleinerziehende mit einem minderjährigen Kind im gemeinsamen Haushalt",
      "Familien mit ausbleibenden, unregelmäßigen oder zu niedrigen Unterhaltszahlungen",
      "Bei 12- bis 17-Jährigen: Haushalte, die die zusätzlichen Einkommensregeln erfüllen",
    ],
    documents: [
      "Geburtsurkunde des Kindes",
      "Meldebescheinigung und Ausweisdokument",
      "Unterhaltstitel oder Nachweise über ausbleibende Zahlungen",
      "Bei älteren Kindern gegebenenfalls Schul- und Einkommensnachweise",
    ],
    nextSteps: [
      "Zuständige Unterhaltsvorschussstelle beim Jugendamt finden",
      "Zahlungsverlauf und vorhandene Unterlagen sammeln",
      "Antrag bei der örtlichen Stelle einreichen",
    ],
    sourceName: "Familienportal des Bundes",
    sourceUrl: "https://familienportal.de/familienportal/familienleistungen/unterhaltsvorschuss",
    verified: "17.08.2026",
  },
  {
    slug: "mutterschaftsgeld",
    name: "Mutterschaftsgeld",
    shortName: "Mutterschaftsgeld",
    kicker: "Schwangerschaft",
    summary: "Einkommensschutz während der gesetzlichen Mutterschutzfristen.",
    amount: "bis 13 € täglich",
    amountLabel: "plus möglicher Arbeitgeberzuschuss",
    symbol: "M",
    tone: "rose",
    intro:
      "Welche Stelle zahlt, hängt von Beschäftigung und Krankenversicherung ab. Gesetzlich versicherte Arbeitnehmerinnen beantragen normalerweise bei ihrer Krankenkasse; andere Konstellationen können über das Bundesamt laufen.",
    whoShouldCheck: [
      "Schwangere Arbeitnehmerinnen",
      "Gesetzlich, privat oder familienversicherte Beschäftigte",
      "Selbstständige und Studierende mit passender Versicherung oder Beschäftigung",
    ],
    documents: [
      "Bescheinigung über den voraussichtlichen Geburtstermin",
      "Arbeitgeberbescheinigung zum Verdienst",
      "Nachweis über die Krankenversicherung",
    ],
    nextSteps: [
      "Versicherungsstatus und zuständigen Leistungsträger klären",
      "Bescheinigung zum Geburtstermin einholen",
      "Antrag bei Krankenkasse oder Bundesamt stellen",
    ],
    sourceName: "Familienportal des Bundes",
    sourceUrl: "https://familienportal.de/familienportal/familienleistungen/mutterschaftsleistungen",
    verified: "17.08.2026",
  },
];

export const benefitBySlug = new Map(benefits.map((benefit) => [benefit.slug, benefit]));
