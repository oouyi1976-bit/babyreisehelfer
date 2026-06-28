export type TravelFAQ = {
  question: string;
  answer: string;
};

export type TravelPageSection = {
  heading: string;
  text: string;
  items: string[];
};

export type TravelPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  primaryLink: string;
  primaryLabel: string;
  secondaryLink: string;
  secondaryLabel: string;
  sections: TravelPageSection[];
  productSectionTitle: string;
  productSectionText: string;
  productIds: string[];
  showAllProducts?: boolean;
  comparisonIds: string[];
  prominentDigistoreIds: string[];
  secondaryDigistoreIds: string[];
  articleCategories: string[];
  articleTitle: string;
  faq: TravelFAQ[];
  pros: string[];
  cons: string[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  ctaButtonText: string;
};

const secondaryTravelRecommendations = ['mallorca-mehr-als-urlaub', 'urlaub-zum-nulltarif'];

export const travelPages: TravelPage[] = [
  {
    slug: 'urlaub',
    title: 'Urlaub mit Baby und Kind planen',
    description:
      'Urlaub mit Baby oder Kind vorbereiten: Packlisten, Reiseprodukte, Familienurlaub-Tipps, Flugreise-Checklisten und Madeira mit Bus.',
    eyebrow: 'Urlaub & Reisen mit Kind',
    h1: 'Urlaub mit Baby und Kind entspannter planen',
    intro:
      'Diese Übersichtsseite bündelt die wichtigsten Ratgeber, Produktideen und internen Einstiege für Familien, die ihren Urlaub realistisch und ohne Überpacken vorbereiten möchten.',
    heroImage: '/article-images/fallback-babyreise.webp',
    primaryLink: '/reisen-mit-kind/',
    primaryLabel: 'Reisen mit Kind starten',
    secondaryLink: '/reiseprodukte/',
    secondaryLabel: 'Reiseprodukte ansehen',
    sections: [
      {
        heading: 'Welche Reiseart passt zu euch?',
        text:
          'Ein guter Familienurlaub beginnt nicht mit der perfekten Unterkunft, sondern mit einer ehrlichen Einschätzung von Alter, Schlafbedarf, Transfers und Wetter.',
        items: ['Kurze Wege priorisieren', 'Pausen realistisch einplanen', 'Unterkunft nach Alltagstauglichkeit auswählen']
      },
      {
        heading: 'Was wirklich mit muss',
        text:
          'Packe nach Situationen statt nach Angst. Schlafen, Wickeln, Essen, Sonnenschutz, Beschäftigung und Dokumente decken die meisten Reisetage ab.',
        items: ['Handgepäck separat denken', 'Doppelte Produkte vermeiden', 'Reiseapotheke fachlich abstimmen']
      },
      {
        heading: 'Interne Reisebereiche',
        text:
          'Von Flugreise bis Madeira: Die neuen Bereiche verlinken untereinander, damit Leser schnell vom Planen zum passenden Produktvergleich kommen.',
        items: ['Flugreise mit Kind', 'Familienurlaub günstig planen', 'Madeira ohne Mietwagen entdecken']
      }
    ],
    productSectionTitle: 'Produktideen für den ersten Urlaubs-Check',
    productSectionText:
      'Diese Auswahl deckt Schlafen, Transport, Sonne, Ordnung und Beschäftigung ab. Geprüfte Amazon-Affiliate-Links öffnen extern, unsichere Links bleiben sichtbar deaktiviert.',
    productIds: [
      'reisebett-baby-kompakt',
      'buggy-reisen-handgepaeck',
      'babytrage-urlaub-luftig',
      'wickelrucksack-reise-handgepaeck',
      'reiseapotheke-organizer-baby',
      'baby-sonnenhut-uv',
      'strandmuschel-baby-uv',
      'packwuerfel-familienurlaub-set',
      'snackbox-kind-faecher',
      'dokumententasche-familie-rfid'
    ],
    comparisonIds: [
      'reisebett-baby-kompakt',
      'buggy-reisen-handgepaeck',
      'babytrage-urlaub-luftig',
      'packwuerfel-familienurlaub-set',
      'dokumententasche-familie-rfid'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['urlaub', 'reisen-mit-kind', 'familienurlaub', 'reiseprodukte', 'flugreise-mit-kind', 'madeira-mit-bus'],
    articleTitle: 'Neue Urlaubsratgeber',
    faq: [
      {
        question: 'Wann sollte man Urlaub mit Baby planen?',
        answer:
          'Sobald Reiseziel, Unterkunft und Transport klar sind, lohnt sich eine grobe Packliste. Final packen solltest du erst, wenn Wetter, Gepäckregeln und Schlafsituation geprüft sind.'
      },
      {
        question: 'Welche Produkte sind für Urlaub mit Kind wirklich wichtig?',
        answer:
          'Wichtig sind vor allem Produkte, die wiederkehrende Situationen erleichtern: Schlafen, Wickeln, Essen, Sonne, Transport, Dokumente und Beschäftigung.'
      },
      {
        question: 'Sind die Produktlinks Affiliate-Links?',
        answer:
          'Ja. Links zu Amazon und digitalen Reiseangeboten sind als Affiliate-Links gekennzeichnet. Bei einem Kauf kann BabyReiseHelfer eine Provision erhalten.'
      }
    ],
    pros: ['Gute Planung reduziert Sucherei unterwegs', 'Weniger Gepäck ist oft entspannter als jede Reserve', 'Interne Links führen schnell zu passenden Spezialthemen'],
    cons: ['Kein Produkt ersetzt Aufsicht und gesunden Menschenverstand', 'Medizinische Fragen gehören zu Kinderarzt oder Apotheke', 'Gepäck- und Airline-Regeln immer aktuell prüfen'],
    ctaTitle: 'Direkt in die Familienreise einsteigen',
    ctaText: 'Starte mit Reisen mit Kind oder springe direkt zu Flugreise, Familienurlaub und Reiseprodukten.',
    ctaHref: '/reisen-mit-kind/',
    ctaButtonText: 'Reisen mit Kind lesen'
  },
  {
    slug: 'reisen-mit-kind',
    title: 'Reisen mit Kind: Planung, Packliste und Produkte',
    description:
      'Reisen mit Kind vorbereiten: praktische Tipps für Gepäck, Schlaf, Snacks, Beschäftigung, Transport und passende Affiliate-Produkte.',
    eyebrow: 'Reisen mit Kind',
    h1: 'Reisen mit Kind ohne unnötigen Stress',
    intro:
      'Mit Kind zählt nicht die perfekte Route, sondern ein Tagesablauf, der Essen, Schlaf, Bewegung und Pausen mitdenkt. Diese Seite sortiert die wichtigsten Schritte.',
    heroImage: '/category-images/packlisten.webp',
    primaryLink: '/flugreise-mit-kind/',
    primaryLabel: 'Flugreise vorbereiten',
    secondaryLink: '/familienurlaub/',
    secondaryLabel: 'Familienurlaub planen',
    sections: [
      {
        heading: 'Reisetage kindgerecht strukturieren',
        text:
          'Plane Transferzeiten so, dass Hunger, Müdigkeit und Wartezeiten nicht alle gleichzeitig kommen. Kleine Puffer sind oft wertvoller als ein weiterer Programmpunkt.',
        items: ['Snackpausen vorher einplanen', 'Lieblingsgegenstand griffbereit halten', 'Nicht jede Minute verplanen']
      },
      {
        heading: 'Handgepäck und Tagesrucksack trennen',
        text:
          'Was während der Reise gebraucht wird, gehört nicht tief in den Koffer. Wickeln, Trinken, Snacks, Wechselkleidung und Dokumente sollten schnell erreichbar sein.',
        items: ['Eine Tasche pro Reisetag denken', 'Kleinteile in Beuteln bündeln', 'Dokumente separat sichern']
      },
      {
        heading: 'Beschäftigung ohne Überladung',
        text:
          'Kinder brauchen unterwegs Abwechslung, aber nicht den halben Spieleschrank. Leise, kleine und mehrfach nutzbare Dinge funktionieren meist besser.',
        items: ['Hörspiel plus Kopfhörer', 'Sticker- oder Magnetspiel', 'Ein neues kleines Überraschungsteil']
      }
    ],
    productSectionTitle: 'Nützliche Produkte für Reisen mit Kind',
    productSectionText:
      'Diese Auswahl unterstützt typische Reisesituationen von Transport über Snacks bis Beschäftigung.',
    productIds: [
      'wickelrucksack-reise-handgepaeck',
      'snackbox-kind-faecher',
      'trinkflasche-kind-auslaufsicher',
      'kopfhoerer-kinder-lautstaerkebegrenzung',
      'spielzeug-flugreise-beschaeftigungsbuch',
      'packwuerfel-familienurlaub-set',
      'dokumententasche-familie-rfid',
      'buggy-organizer-getraenkehalter'
    ],
    comparisonIds: [
      'wickelrucksack-reise-handgepaeck',
      'snackbox-kind-faecher',
      'trinkflasche-kind-auslaufsicher',
      'kopfhoerer-kinder-lautstaerkebegrenzung'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['reisen-mit-kind', 'flugreise-mit-kind', 'familienurlaub'],
    articleTitle: 'Ratgeber zum Reisen mit Kind',
    faq: [
      {
        question: 'Was gehört beim Reisen mit Kind ins Handgepäck?',
        answer:
          'Wechselkleidung, Snacks, Trinkflasche, Windeln oder Feuchttücher, kleine Beschäftigung, wichtige Dokumente und alles, was während Transfer oder Wartezeit gebraucht wird.'
      },
      {
        question: 'Wie vermeidet man Stress auf langen Reisen?',
        answer:
          'Plane Pausen, halte Essen und Trinken griffbereit und reduziere Erwartungen. Ein ruhiger Reisetag ist mit Kind oft wichtiger als ein sehr voller Plan.'
      },
      {
        question: 'Welche Produkte sollte man vorher testen?',
        answer:
          'Alles, was sitzen, passen oder funktionieren muss: Buggy, Trage, Kopfhörer, Trinkflasche, Reisebett und Kindersitz.'
      }
    ],
    pros: ['Klare Taschenstruktur spart Zeit', 'Kinder verstehen Reisen besser mit kleinen Routinen', 'Wenige gute Produkte sind besser als viele Notlösungen'],
    cons: ['Jedes Kind reagiert anders auf Ortswechsel', 'Nicht alle Flugzeug-Hilfen sind bei jeder Airline erlaubt', 'Sicherheitsangaben der Hersteller bleiben entscheidend'],
    ctaTitle: 'Weiter zur Flugreise-Checkliste',
    ctaText: 'Wenn ihr fliegt, lohnt sich ein eigener Blick auf Handgepäck, Boarding, Snacks und Beschäftigung.',
    ctaHref: '/flugreise-mit-kind/',
    ctaButtonText: 'Flugreise mit Kind lesen'
  },
  {
    slug: 'familienurlaub',
    title: 'Familienurlaub planen: Unterkunft, Budget und Packliste',
    description:
      'Familienurlaub einfach planen: Unterkunft, Budget, Reiseprodukte, Packliste, Sonnenschutz und stressarme Tagesabläufe mit Kindern.',
    eyebrow: 'Familienurlaub',
    h1: 'Familienurlaub planen, der wirklich zu euch passt',
    intro:
      'Ein guter Familienurlaub muss nicht vollgepackt sein. Entscheidend sind kurze Wege, verlässliche Basics und genug Raum für Pausen.',
    heroImage: '/category-images/hotel-mit-baby.webp',
    primaryLink: '/urlaub-ratgeber/',
    primaryLabel: 'Urlaubsratgeber lesen',
    secondaryLink: '/beste-reiseprodukte/',
    secondaryLabel: 'Beste Reiseprodukte ansehen',
    sections: [
      {
        heading: 'Unterkunft nach Alltag auswählen',
        text:
          'Frage nicht nur nach Pool und Lage, sondern auch nach Küche, Waschmöglichkeit, Verdunkelung, Babybett, Aufzug und Wegen zum Supermarkt.',
        items: ['Schlafplatz vorab klären', 'Waschmöglichkeit spart Gepäck', 'Kurze Wege reduzieren Reizüberflutung']
      },
      {
        heading: 'Budget realistisch halten',
        text:
          'Familien sparen oft mehr durch gute Vorbereitung als durch das billigste Angebot. Snacks, Wäsche, Transfers und Gepäckgebühren gehören in die Rechnung.',
        items: ['Gepäckkosten prüfen', 'Ferienwohnung gegen Hotel abwägen', 'Ausflüge mit Ruhetagen mischen']
      },
      {
        heading: 'Sicherheit und Gesundheit vorsichtig formulieren',
        text:
          'Sonnenschutz, Reiseapotheke und Mückenschutz sind wichtige Themen, ersetzen aber keine fachliche Beratung. Bei Gesundheitsfragen bitte Kinderarzt oder Apotheke einbeziehen.',
        items: ['Sonnenzeiten meiden', 'Medikamente vorab abstimmen', 'Notfallnummern und Versicherung prüfen']
      }
    ],
    productSectionTitle: 'Familienurlaub-Produkte für Hotel, Strand und Ausflug',
    productSectionText:
      'Diese Produkte decken Unterkunft, Ordnung, Strandtage, Snacks und kleine Notfälle ab.',
    productIds: [
      'reisebett-baby-kompakt',
      'reisebett-matratze-faltbar',
      'packwuerfel-familienurlaub-set',
      'strandmuschel-pop-up-familie',
      'kuehlrucksack-familie-strand',
      'reisehandtuch-mikrofaser-kind',
      'reisewaschmittel-tube',
      'reiseapotheke-organizer-baby'
    ],
    comparisonIds: [
      'reisebett-baby-kompakt',
      'packwuerfel-familienurlaub-set',
      'strandmuschel-pop-up-familie',
      'kuehlrucksack-familie-strand'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['familienurlaub', 'urlaub', 'reiseprodukte'],
    articleTitle: 'Ratgeber für Familienurlaub',
    faq: [
      {
        question: 'Ist Hotel oder Ferienwohnung besser mit Kind?',
        answer:
          'Das hängt von Alter, Schlaf, Budget und Alltag ab. Ferienwohnungen bieten oft Küche und Waschmöglichkeit, Hotels können Wege und Organisation vereinfachen.'
      },
      {
        question: 'Wie plant man Familienurlaub günstiger?',
        answer:
          'Vergleiche Reisezeit, Gepäckkosten, Transfer, Verpflegung und Waschmöglichkeiten. Manchmal spart eine etwas praktischere Unterkunft mehr als der niedrigste Zimmerpreis.'
      },
      {
        question: 'Welche Gesundheitsprodukte sollten mit?',
        answer:
          'Eine kleine Reiseapotheke kann sinnvoll sein. Medikamente, Dosierungen und individuelle Fragen solltest du immer mit Kinderarzt oder Apotheke abstimmen.'
      }
    ],
    pros: ['Weniger Ortswechsel bringen oft mehr Erholung', 'Ferienwohnungen können Gepäck reduzieren', 'Gute Sonnenschutzplanung verhindert Stress'],
    cons: ['Nicht jede Unterkunft ist wirklich familientauglich', 'Billige Angebote können hohe Zusatzkosten haben', 'Gesundheitsthemen brauchen fachliche Prüfung'],
    ctaTitle: 'Familienurlaub mit klarer Packliste angehen',
    ctaText: 'Die besten Produktideen findest du gebündelt im neuen Reiseprodukte-Bereich.',
    ctaHref: '/reiseprodukte/',
    ctaButtonText: 'Reiseprodukte öffnen'
  },
  {
    slug: 'flugreise-mit-kind',
    title: 'Flugreise mit Kind: Checkliste, Handgepäck und Produkte',
    description:
      'Flugreise mit Kind vorbereiten: Handgepäck, Beschäftigung, Snacks, Buggy, Kopfhörer, Nackenkissen und Eltern-Checkliste.',
    eyebrow: 'Flugreise mit Kind',
    h1: 'Flugreise mit Kind gut vorbereitet angehen',
    intro:
      'Fliegen mit Kind wird leichter, wenn Handgepäck, Wartezeiten, Essen und Schlaf realistisch geplant sind. Diese Seite bündelt die wichtigsten Punkte.',
    heroImage: '/category-images/fliegen-mit-baby.webp',
    primaryLink: '/ratgeber/flugreise-mit-kind-checkliste-eltern/',
    primaryLabel: 'Checkliste lesen',
    secondaryLink: '/reiseprodukte/',
    secondaryLabel: 'Flug-Produkte ansehen',
    sections: [
      {
        heading: 'Vor dem Flug klären',
        text:
          'Airline-Regeln unterscheiden sich bei Buggy, Kindersitz, Flüssigkeiten, Fußstützen und Handgepäck. Prüfe die Vorgaben immer direkt bei der Airline.',
        items: ['Buggy-Abgabe klären', 'Sitzplatz und Boarding prüfen', 'Flüssigkeitenregel für Babynahrung lesen']
      },
      {
        heading: 'Handgepäck nach Phasen packen',
        text:
          'Denke in Boarding, Start, Reiseflug, Landung und Wartezeit. Was in einer Phase gebraucht wird, sollte nicht unter mehreren Schichten liegen.',
        items: ['Snacks und Trinken griffbereit', 'Wechselkleidung separat', 'Kleine Beschäftigung in Portionen']
      },
      {
        heading: 'Beschäftigung im Flugzeug',
        text:
          'Leise, leichte und bekannte Dinge funktionieren oft besser als große Überraschungen. Für ältere Kinder können Hörspiele und Kopfhörer sehr hilfreich sein.',
        items: ['Kopfhörer vorher testen', 'Offline-Inhalte laden', 'Kleinteile vermeiden']
      }
    ],
    productSectionTitle: 'Produkte für Flugreise und Handgepäck',
    productSectionText:
      'Diese Auswahl konzentriert sich auf typische Flugthemen: Unterhaltung, Komfort, Gepäckgewicht, Snacks und Dokumente.',
    productIds: [
      'kopfhoerer-kinder-lautstaerkebegrenzung',
      'kopfhoerer-kinder-bluetooth-kabel',
      'nackenkissen-kind-flugzeug',
      'flugzeug-fussstuetze-kind',
      'flugzeug-tablet-halter-kind',
      'spielzeug-flugreise-beschaeftigungsbuch',
      'spielzeug-flugreise-magnetspiel',
      'kofferwaage-digital',
      'dokumententasche-familie-rfid'
    ],
    comparisonIds: [
      'kopfhoerer-kinder-lautstaerkebegrenzung',
      'nackenkissen-kind-flugzeug',
      'flugzeug-fussstuetze-kind',
      'kofferwaage-digital'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['flugreise-mit-kind', 'reisen-mit-kind'],
    articleTitle: 'Flugreise-Ratgeber',
    faq: [
      {
        question: 'Darf eine Fußstütze im Flugzeug immer genutzt werden?',
        answer:
          'Nein. Viele Airlines haben eigene Regeln. Prüfe vor dem Kauf und vor dem Flug, ob das konkrete Produkt auf eurem Flug erlaubt ist.'
      },
      {
        question: 'Was hilft Kindern beim Druckausgleich?',
        answer:
          'Je nach Alter können Trinken, Stillen, Schnuller oder Kauen helfen. Bei Ohrproblemen oder Erkrankung bitte vorher ärztlich abklären.'
      },
      {
        question: 'Wie viele Spielsachen gehören ins Handgepäck?',
        answer:
          'Wenige, leise und wechselbare Dinge reichen oft. Packe kleine Beschäftigungen in Etappen, damit nicht alles direkt am Gate verbraucht ist.'
      }
    ],
    pros: ['Gute Vorbereitung macht Wartezeiten leichter', 'Kleine Produkte können viel Sucherei vermeiden', 'Airline-Checks verhindern Ärger am Gate'],
    cons: ['Flugzeug-Zubehör ist nicht überall erlaubt', 'Kinder können trotz Planung müde oder überreizt sein', 'Gesundheitliche Fragen vor dem Flug fachlich klären'],
    ctaTitle: 'Die komplette Flugreise-Checkliste lesen',
    ctaText: 'Der passende Ratgeber führt Schritt für Schritt durch Handgepäck, Boarding und Beschäftigung.',
    ctaHref: '/ratgeber/flugreise-mit-kind-checkliste-eltern/',
    ctaButtonText: 'Zur Checkliste'
  },
  {
    slug: 'reiseprodukte',
    title: 'Reiseprodukte für Baby, Kind und Familienurlaub',
    description:
      '50 Reiseprodukte für Baby, Kind und Familienurlaub: Reisebett, Buggy, Wickelrucksack, Flugzeug-Zubehör, Sonnenschutz, Strand und Packhilfen.',
    eyebrow: 'Reiseprodukte',
    h1: 'Reiseprodukte für Baby, Kind und Familienurlaub',
    intro:
      'Hier findest du 50 strukturierte Produktideen für Reisen, Urlaub und Familienferien. Alle Amazon-Links sind als Affiliate-Links gekennzeichnet und führen extern zu Amazon.de.',
    heroImage: '/category-images/kinderwagen-zubehoer.webp',
    primaryLink: '/beste-reiseprodukte/',
    primaryLabel: 'Beste Auswahl ansehen',
    secondaryLink: '/urlaub-ratgeber/',
    secondaryLabel: 'Ratgeber lesen',
    sections: [
      {
        heading: 'Nach Reisesituation auswählen',
        text:
          'Ein Produkt ist nur dann sinnvoll, wenn es ein echtes Problem eurer Reise löst. Denke zuerst an Schlaf, Transport, Essen, Sonne, Ordnung und Beschäftigung.',
        items: ['Nicht alles auf einmal kaufen', 'Maße und Gewicht prüfen', 'Vor der Reise testen']
      },
      {
        heading: 'Affiliate-Links transparent prüfen',
        text:
          'Die Produktlinks führen als gekennzeichnete Amazon-Partnerlinks extern zu Amazon.de. Preise, Sternebewertungen und Rezensionen werden bewusst nicht übernommen.',
        items: ['Keine erfundenen Preise', 'Keine Sternebewertungen kopieren', 'Keine Amazon-Bilder übernehmen']
      },
      {
        heading: 'Produktpflege im Code',
        text:
          'Alle neuen Reiseprodukte liegen zentral in src/data/travelProducts.ts und können dort später mit echten Affiliate-URLs ergänzt werden.',
        items: ['50 Produkte', '25 Kategorien', 'Einheitliche Datenstruktur']
      }
    ],
    productSectionTitle: 'Alle 50 Reiseprodukte',
    productSectionText:
      'Die Produktkarten zeigen neutrale Kaufkriterien, keine aktuellen Preise und keine Amazon-Bewertungen.',
    productIds: [],
    showAllProducts: true,
    comparisonIds: [
      'reisebett-baby-kompakt',
      'buggy-reisen-handgepaeck',
      'wickelrucksack-reise-handgepaeck',
      'reiseapotheke-organizer-baby',
      'strandmuschel-baby-uv',
      'kopfhoerer-kinder-lautstaerkebegrenzung'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['reiseprodukte', 'urlaub', 'flugreise-mit-kind'],
    articleTitle: 'Ratgeber zu Reiseprodukten',
    faq: [
      {
        question: 'Warum führen die Produktlinks zu Amazon.de?',
        answer:
          'Die Links sind Amazon-Partnerlinks mit Tracking-ID. Wenn du darüber kaufst, erhalten wir ggf. eine Provision; für dich entstehen keine Mehrkosten.'
      },
      {
        question: 'Werden Amazon-Preise oder Sterne angezeigt?',
        answer:
          'Nein. Die Seite zeigt bewusst keine Amazon-Preise, Sternebewertungen oder Rezensionen, weil diese Daten aktuell und regelkonform gepflegt werden müssten.'
      },
      {
        question: 'Wie wähle ich passende Reiseprodukte aus?',
        answer:
          'Wähle nach konkreter Reisesituation: Flug, Auto, Strand, Hotel, Ferienwohnung, Alter des Kindes und Gepäckgrenzen.'
      }
    ],
    pros: ['Zentrale Datenpflege', 'Klare Affiliate-Kennzeichnung', 'Produkte nach Reiseproblemen sortiert'],
    cons: ['Produktverfügbarkeit kann sich ändern', 'Herstellerangaben immer aktuell prüfen', 'Keine individuelle Kaufberatung'],
    ctaTitle: 'Die besten Reiseprodukte fokussiert ansehen',
    ctaText: 'Wenn du nicht alle 50 Produkte prüfen möchtest, starte mit der kuratierten Auswahl.',
    ctaHref: '/beste-reiseprodukte/',
    ctaButtonText: 'Beste Reiseprodukte'
  },
  {
    slug: 'urlaub-ratgeber',
    title: 'Urlaub-Ratgeber für Reisen mit Baby und Kind',
    description:
      'Urlaub-Ratgeber für Familien: Packlisten, Flugreise, Reisebett, Buggy, Sonnenschutz, Madeira mit Bus und günstige Familienurlaub-Planung.',
    eyebrow: 'Urlaub-Ratgeber',
    h1: 'Urlaub-Ratgeber für Familienreisen',
    intro:
      'Diese Seite bündelt alle neuen Reiseartikel und führt zu konkreten Themen wie Packliste, Flugreise, Strandurlaub, Reisebett und Madeira mit Bus.',
    heroImage: '/article-images/packliste-mallorca-mit-baby.webp',
    primaryLink: '/ratgeber/packliste-familienurlaub/',
    primaryLabel: 'Packliste öffnen',
    secondaryLink: '/reiseprodukte/',
    secondaryLabel: 'Produkte vergleichen',
    sections: [
      {
        heading: 'Artikel für die Reisevorbereitung',
        text:
          'Die neuen Ratgeber sind so aufgebaut, dass sie erst Entscheidungen sortieren und dann passende Produkte verlinken.',
        items: ['Was muss wirklich mit?', 'Flugreise-Checkliste', 'Familienurlaub günstig planen']
      },
      {
        heading: 'SEO und interne Links',
        text:
          'Jeder Artikel verlinkt in die passenden Hauptseiten, damit Leser und Suchmaschinen den Reisebereich leicht verstehen.',
        items: ['Urlaub', 'Reisen mit Kind', 'Beste Reiseprodukte']
      },
      {
        heading: 'Verantwortliche Hinweise',
        text:
          'Gesundheits-, Sonnen- und Sicherheitsthemen bleiben vorsichtig formuliert. Bei medizinischen Fragen gilt immer: Kinderarzt oder Apotheke fragen.',
        items: ['Keine Heilversprechen', 'Keine falschen Testsieger', 'Affiliate-Hinweis sichtbar']
      }
    ],
    productSectionTitle: 'Produktideen, die in vielen Ratgebern wiederkehren',
    productSectionText:
      'Diese Produkte tauchen in mehreren Reiseartikeln auf, weil sie häufige Alltagssituationen abdecken.',
    productIds: [
      'packwuerfel-familienurlaub-set',
      'wickelrucksack-reise-handgepaeck',
      'reiseapotheke-organizer-baby',
      'baby-sonnenhut-uv',
      'snackbox-kind-faecher',
      'dokumententasche-familie-rfid'
    ],
    comparisonIds: [
      'packwuerfel-familienurlaub-set',
      'wickelrucksack-reise-handgepaeck',
      'reiseapotheke-organizer-baby',
      'baby-sonnenhut-uv'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['urlaub', 'reisen-mit-kind', 'familienurlaub', 'flugreise-mit-kind', 'reiseprodukte', 'madeira-mit-bus'],
    articleTitle: 'Alle neuen Reiseartikel',
    faq: [
      {
        question: 'Welche Urlaub-Ratgeber sind neu?',
        answer:
          'Neu sind Artikel zu Reisen mit Baby, Flugreise mit Kind, Familienurlaub, Reisebett, Buggy, Baby im Flugzeug, Strandurlaub, Packliste, Madeira und Reiseapotheke.'
      },
      {
        question: 'Sind die Ratgeber medizinische Beratung?',
        answer:
          'Nein. Reiseapotheke, Sonnenschutz und Gesundheit werden nur allgemein eingeordnet. Bitte kläre konkrete Fragen mit Kinderarzt oder Apotheke.'
      },
      {
        question: 'Warum gibt es interne Links zu Produkten?',
        answer:
          'Die Produktlinks helfen Lesern, passende Ausrüstung schneller zu finden. Sie sind als Werbung beziehungsweise Affiliate-Link gekennzeichnet.'
      }
    ],
    pros: ['Schneller Einstieg in viele Familienthemen', 'Artikel und Produkte sind intern verbunden', 'Vorsichtige Formulierungen bei Gesundheit und Sicherheit'],
    cons: ['Ratgeber ersetzen keine individuelle Beratung', 'Reisebedingungen können sich ändern', 'Produktlinks müssen regelmäßig gepflegt werden'],
    ctaTitle: 'Mit der Familien-Packliste starten',
    ctaText: 'Der Packlisten-Artikel ist der beste Einstieg, wenn die Reise bald ansteht.',
    ctaHref: '/ratgeber/packliste-familienurlaub/',
    ctaButtonText: 'Packliste lesen'
  },
  {
    slug: 'madeira-mit-bus',
    title: 'Madeira mit Bus entdecken: Tipps für Familien',
    description:
      'Madeira mit Bus entdecken: Tipps für Familien, Ausflüge ohne Mietwagen, Packideen, Tagesplanung und passender Madeira-Bus-PDF-Reiseführer.',
    eyebrow: 'Madeira mit Bus',
    h1: 'Madeira mit Bus entdecken',
    intro:
      'Madeira kann auch ohne Mietwagen spannend sein. Mit Kindern zählt dabei eine realistische Planung: kurze Etappen, klare Rückwege, Snacks und Wetterschutz.',
    heroImage: '/article-images/fallback-babyreise.webp',
    primaryLink: 'https://www.madeira-bus.com/pdf#aff=Benman8810',
    primaryLabel: 'Madeira-Busführer ansehen',
    secondaryLink: '/ratgeber/madeira-mit-bus-entdecken-tipps/',
    secondaryLabel: 'Madeira-Tipps lesen',
    sections: [
      {
        heading: 'Warum Bus statt Mietwagen?',
        text:
          'Busfahren kann entspannter sein, wenn ihr Parkstress vermeiden wollt oder nur einzelne Ausflüge plant. Wichtig sind realistische Strecken und genug Puffer.',
        items: ['Rückfahrt vor Abfahrt prüfen', 'Kinderwagen- und Trageoptionen abwägen', 'Wetterumschwünge einplanen']
      },
      {
        heading: 'Mit Kindern auf Madeira unterwegs',
        text:
          'Madeira ist hügelig. Für manche Wege ist eine Trage praktischer als ein Buggy, während ein kompakter Buggy in Funchal oder am Hotel hilfreich sein kann.',
        items: ['Trage für Treppen und Wege', 'Wasser und Snacks einpacken', 'Sonnenschutz auch bei Wolken']
      },
      {
        heading: 'PDF-Reiseführer passend einsetzen',
        text:
          'Der Madeira-Bus-PDF-Link passt inhaltlich direkt zu dieser Seite. Die anderen Digistore-Reiselinks bleiben nur ergänzende Empfehlungen.',
        items: ['Buslinien vor Ort gegenprüfen', 'Etappen familienfreundlich kürzen', 'Keine Überplanung am ersten Tag']
      }
    ],
    productSectionTitle: 'Produkte für Madeira ohne Mietwagen',
    productSectionText:
      'Für Madeira sind leichte, wetterfeste und gut tragbare Dinge besonders praktisch.',
    productIds: [
      'babytrage-urlaub-luftig',
      'buggy-reisen-handgepaeck',
      'dokumentenhuelle-wasserdicht',
      'trinkflasche-kind-auslaufsicher',
      'snackbox-kind-faecher',
      'reisehandtuch-mikrofaser-kind',
      'mueckenschutz-kinderwagen-netz',
      'packwuerfel-familienurlaub-set'
    ],
    comparisonIds: [
      'babytrage-urlaub-luftig',
      'buggy-reisen-handgepaeck',
      'dokumentenhuelle-wasserdicht',
      'trinkflasche-kind-auslaufsicher'
    ],
    prominentDigistoreIds: ['madeira-bus-pdf'],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['madeira-mit-bus', 'reisen-mit-kind', 'familienurlaub'],
    articleTitle: 'Madeira und Reiseplanung',
    faq: [
      {
        question: 'Kann man Madeira mit Kindern per Bus entdecken?',
        answer:
          'Ja, wenn die Route realistisch geplant ist. Prüfe Fahrzeiten, Rückfahrten, Wege zur Haltestelle und ob Buggy oder Trage besser passt.'
      },
      {
        question: 'Passt der Madeira-Bus-Link zu BabyReiseHelfer?',
        answer:
          'Ja, er passt zur konkreten Madeira-ohne-Mietwagen-Seite. Deshalb wird er hier prominent gezeigt.'
      },
      {
        question: 'Braucht man auf Madeira eher Buggy oder Babytrage?',
        answer:
          'Oft beides je nach Ort. In hügeligen Gegenden kann eine Trage praktischer sein, in Funchal oder im Hotelumfeld ein kompakter Buggy.'
      }
    ],
    pros: ['Direkter Themenfit für Madeira ohne Mietwagen', 'Busplanung kann Parkstress reduzieren', 'Leichte Produkte passen gut zur Insel'],
    cons: ['Fahrpläne und Routen können sich ändern', 'Nicht jede Strecke ist buggyfreundlich', 'Wetter und Höhenmeter realistisch prüfen'],
    ctaTitle: 'Madeira-Ratgeber vertiefen',
    ctaText: 'Der Artikel sammelt praktische Tipps für Bus, Gepäck, Tagesausflüge und Familienplanung auf Madeira.',
    ctaHref: '/ratgeber/madeira-mit-bus-entdecken-tipps/',
    ctaButtonText: 'Madeira-Tipps lesen'
  },
  {
    slug: 'beste-reiseprodukte',
    title: 'Beste Reiseprodukte für Familien: ehrliche Auswahl',
    description:
      'Die besten Reiseprodukte für Familien als ehrliche Auswahl: Reisebett, Buggy, Trage, Wickelrucksack, Sonnenschutz, Flugzeug-Zubehör und Packhilfen.',
    eyebrow: 'Beste Reiseprodukte',
    h1: 'Die besten Reiseprodukte für Familien',
    intro:
      'Beste bedeutet hier nicht Testsieger. Gemeint sind Produkte, die häufige Familienreise-Probleme lösen und vor der Reise sinnvoll geprüft werden können.',
    heroImage: '/product-images/reisedokumententasche-familie.webp',
    primaryLink: '/reiseprodukte/',
    primaryLabel: 'Alle 50 Produkte ansehen',
    secondaryLink: '/ratgeber/die-besten-reiseprodukte-fuer-familien/',
    secondaryLabel: 'Ratgeber lesen',
    sections: [
      {
        heading: 'Was ein gutes Reiseprodukt ausmacht',
        text:
          'Ein gutes Reiseprodukt ist leicht, sicher nutzbar, schnell erreichbar und löst ein Problem, das unterwegs wirklich vorkommt.',
        items: ['Kleines Packmaß', 'Einfache Reinigung', 'Vor Abreise testbar']
      },
      {
        heading: 'Keine falschen Testsieger',
        text:
          'Diese Seite behauptet keine eigenen Labortests und zeigt keine erfundenen Rankings. Die Auswahl basiert auf typischen Reisebedürfnissen von Familien.',
        items: ['Keine Amazon-Sterne', 'Keine aktuellen Preise', 'Keine Produktbilder von Amazon']
      },
      {
        heading: 'Prioritäten für Familien',
        text:
          'Wer nur wenig kaufen möchte, startet mit Ordnung, Schlaf, Sonnenschutz, Snacks, Dokumenten und einem passenden Transporthelfer.',
        items: ['Erst Basisprobleme lösen', 'Dann Komfort ergänzen', 'Sicherheitsangaben prüfen']
      }
    ],
    productSectionTitle: 'Kuratiert: 16 starke Reiseprodukt-Ideen',
    productSectionText:
      'Diese Auswahl ist ein sinnvoller Startpunkt, bevor du die komplette Produktliste prüfst.',
    productIds: [
      'reisebett-baby-kompakt',
      'buggy-reisen-handgepaeck',
      'babytrage-urlaub-luftig',
      'wickelrucksack-reise-handgepaeck',
      'reiseapotheke-organizer-baby',
      'baby-sonnenhut-uv',
      'uv-shirt-kind-langarm',
      'strandmuschel-baby-uv',
      'kopfhoerer-kinder-lautstaerkebegrenzung',
      'nackenkissen-kind-flugzeug',
      'packwuerfel-familienurlaub-set',
      'kofferwaage-digital',
      'trinkflasche-kind-auslaufsicher',
      'snackbox-kind-faecher',
      'dokumententasche-familie-rfid',
      'mueckenschutz-kinderwagen-netz'
    ],
    comparisonIds: [
      'reisebett-baby-kompakt',
      'buggy-reisen-handgepaeck',
      'babytrage-urlaub-luftig',
      'wickelrucksack-reise-handgepaeck',
      'strandmuschel-baby-uv',
      'kopfhoerer-kinder-lautstaerkebegrenzung',
      'packwuerfel-familienurlaub-set',
      'dokumententasche-familie-rfid'
    ],
    prominentDigistoreIds: [],
    secondaryDigistoreIds: secondaryTravelRecommendations,
    articleCategories: ['reiseprodukte', 'urlaub', 'familienurlaub'],
    articleTitle: 'Ratgeber zu den besten Reiseprodukten',
    faq: [
      {
        question: 'Sind das echte Testsieger?',
        answer:
          'Nein. Die Seite nutzt bewusst keine Testsieger-Behauptung. Es sind kuratierte Produktideen nach typischen Familienreise-Situationen.'
      },
      {
        question: 'Warum fehlen Preise?',
        answer:
          'Preise ändern sich häufig. Ohne offizielle, aktuelle Schnittstelle werden deshalb keine konkreten Amazon-Preise angezeigt.'
      },
      {
        question: 'Welche Produkte sollte man zuerst kaufen?',
        answer:
          'Starte mit den Dingen, die eure größte Reibung lösen: Schlafplatz, Transport, Sonnenschutz, Ordnung, Snacks oder Beschäftigung.'
      }
    ],
    pros: ['Fokussierte Auswahl statt 50 Produkte auf einmal', 'Keine übertriebenen Werbeversprechen', 'Gute interne Verlinkung zu Ratgebern'],
    cons: ['Keine individuelle Kaufberatung', 'Einzelne Amazon-Links können noch Platzhalter sein', 'Produktdetails vor Kauf beim Anbieter prüfen'],
    ctaTitle: 'Alle Reiseprodukte vergleichen',
    ctaText: 'Die vollständige Liste mit 50 Produktideen findest du im Reiseprodukte-Bereich.',
    ctaHref: '/reiseprodukte/',
    ctaButtonText: 'Alle Produkte ansehen'
  }
];

export function getTravelPageBySlug(slug: string) {
  return travelPages.find((page) => page.slug === slug);
}
