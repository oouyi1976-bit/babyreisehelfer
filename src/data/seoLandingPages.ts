export type SeoChecklistGroup = {
  heading: string;
  text: string;
  items: string[];
};

export type SeoRelatedLink = {
  title: string;
  href: string;
  description: string;
};

export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  checklist: SeoChecklistGroup[];
  productIds: string[];
  relatedLinks: SeoRelatedLink[];
  ctaHref: string;
  ctaText: string;
};

export const popularGuideLinks: SeoRelatedLink[] = [
  {
    title: 'Fliegen mit Baby',
    href: '/fliegen-mit-baby/',
    description: 'Handgepäck, Wickeln, Boarding und ruhige Flugmomente mit Baby.'
  },
  {
    title: 'Urlaub mit Baby Packliste',
    href: '/urlaub-mit-baby-packliste/',
    description: 'Strukturierte Packliste für Schlafen, Wickeln, Sonne, Essen und Dokumente.'
  },
  {
    title: 'Reiseapotheke Baby',
    href: '/reiseapotheke-baby-urlaub/',
    description: 'Basics und Prüfpunkte für Urlaub, Flug und Ausflüge mit Baby.'
  },
  {
    title: 'Baby im Hotel',
    href: '/baby-im-hotel-packliste/',
    description: 'Schlafplatz, Fläschchen, Wickeln und kleine Hotelzimmer-Helfer.'
  },
  {
    title: 'Strandurlaub mit Baby',
    href: '/strandurlaub-mit-baby-packliste/',
    description: 'Schatten, UV-Schutz, nasse Kleidung und Strandtasche sinnvoll planen.'
  },
  {
    title: 'Kinderwagen-Zubehör Urlaub',
    href: '/kinderwagen-zubehoer/',
    description: 'Sonnensegel, Organizer, Moskitonetz und Buggy-Helfer für unterwegs.'
  },
  {
    title: 'Reiseprodukte für Familien',
    href: '/reiseprodukte/',
    description: 'Neutral sortierte Produktideen ohne Preise, Sterne oder Fake-Testsieger.'
  },
  {
    title: 'Autofahrt mit Baby Checkliste',
    href: '/autofahrt-mit-baby-checkliste/',
    description: 'Pausen, Snacks, Wickeln, Schlaf und Beschäftigung für lange Autofahrten.'
  }
];

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: 'fliegen-mit-baby-packliste',
    title: 'Fliegen mit Baby Packliste: Handgepäck und Flugzeug-Basics',
    description:
      'Fliegen mit Baby Packliste: Was ins Handgepäck gehört, welche Dinge im Flugzeug griffbereit sein sollten und welche Produktideen helfen können.',
    eyebrow: 'Flugreise mit Baby',
    h1: 'Fliegen mit Baby Packliste',
    intro:
      'Beim Fliegen mit Baby zählt vor allem Zugriff: Wickeln, Trinken, Wechselkleidung, Dokumente und kleine Beruhigungshelfer sollten erreichbar sein, ohne dass du im engen Sitz den ganzen Rucksack ausräumen musst.',
    heroImage: '/category-images/fliegen-mit-baby.webp',
    checklist: [
      {
        heading: 'Vor dem Flughafen',
        text: 'Prüfe Airline-Regeln und plane Handgepäck nach Situationen, nicht nach Sorge.',
        items: ['Buggy- und Gepäckregeln prüfen', 'Flüssigkeiten und Babynahrung klären', 'Boarding-Zeit mit Puffer planen']
      },
      {
        heading: 'In die Wickeltasche',
        text: 'Alles fürs Wickeln sollte in einem separaten kleinen Beutel liegen.',
        items: ['Windeln plus Reserve', 'Feuchttücher und Müllbeutel', 'Unterlage und Wechselbody']
      },
      {
        heading: 'Für den Flug',
        text: 'Kleine, leise und schnell greifbare Dinge sind im Flugzeug oft hilfreicher als viel Spielzeug.',
        items: ['Schnuller oder Fläschchen bereithalten', 'Dünnes Tuch einpacken', 'Kleine Beschäftigung griffbereit halten']
      }
    ],
    productIds: [
      'wickelrucksack-reise-handgepaeck',
      'feuchttuecherbox-reise',
      'snackbox-kind-faecher',
      'kopfhoerer-kinder-lautstaerkebegrenzung',
      'spielzeug-flugreise-beschaeftigungsbuch',
      'dokumententasche-familie-rfid'
    ],
    relatedLinks: [
      popularGuideLinks[0],
      { title: 'Handgepäck Baby Flug', href: '/handgepaeck-baby-flug/', description: 'Noch konkreter für die Tasche am Sitzplatz.' },
      { title: 'Fliegen mit Baby Ratgeber', href: '/ratgeber/fliegen-mit-baby-dinge/', description: 'Ausführlicher Ratgeber für entspanntere Flugtage.' }
    ],
    ctaHref: '/fliegen-mit-baby/',
    ctaText: 'Zur Hauptseite Fliegen mit Baby'
  },
  {
    slug: 'urlaub-mit-baby-packliste',
    title: 'Urlaub mit Baby Packliste: Was wirklich mit muss',
    description:
      'Urlaub mit Baby Packliste für Schlafen, Wickeln, Essen, Sonne, Reiseapotheke, Dokumente und praktische Baby-Reiseprodukte.',
    eyebrow: 'Packliste Urlaub',
    h1: 'Urlaub mit Baby Packliste',
    intro:
      'Eine gute Urlaub-mit-Baby-Packliste verhindert Überpacken und vergessene Kleinigkeiten. Starte mit den Alltagssituationen: Schlafen, Wickeln, Essen, Sonne, Gesundheit und Transport.',
    heroImage: '/category-images/packlisten.webp',
    checklist: [
      {
        heading: 'Schlafen und Unterkunft',
        text: 'Vorab klären, was vor Ort vorhanden ist und was dein Baby wirklich kennt.',
        items: ['Reisebett oder Hotelbett prüfen', 'Schlafsack und vertrautes Tuch einpacken', 'Nachtlicht bei Bedarf einplanen']
      },
      {
        heading: 'Wickeln und Kleidung',
        text: 'Packe nach Reisetagen und Waschmöglichkeit, nicht nach jeder theoretischen Panne.',
        items: ['Windeln für Anreise plus Startreserve', 'Wetbag oder Beutel für nasse Sachen', 'Packwürfel für Babywäsche nutzen']
      },
      {
        heading: 'Unterwegs im Urlaub',
        text: 'Für Ausflüge zählen leichte, robuste und gut verstaubare Helfer.',
        items: ['Sonnenschutz und Hut prüfen', 'Snackbox und Trinkflasche vorbereiten', 'Dokumente separat aufbewahren']
      }
    ],
    productIds: [
      'reisebett-baby-kompakt',
      'packwuerfel-familienurlaub-set',
      'baby-sonnenhut-uv',
      'wickelrucksack-reise-handgepaeck',
      'reiseapotheke-organizer-baby',
      'dokumententasche-familie-rfid'
    ],
    relatedLinks: [
      { title: 'Packlisten', href: '/packlisten/', description: 'Alle Packlisten für Flug, Hotel, Strand und Reiseapotheke.' },
      popularGuideLinks[0],
      { title: 'Reiseprodukte', href: '/reiseprodukte/', description: 'Produktideen für typische Reisesituationen.' }
    ],
    ctaHref: '/urlaub/',
    ctaText: 'Urlaub mit Baby planen'
  },
  {
    slug: 'reiseapotheke-baby-urlaub',
    title: 'Reiseapotheke Baby Urlaub: Checkliste und Basics',
    description:
      'Reiseapotheke Baby Urlaub: allgemeine Checkliste, sinnvolle Basics, wichtige Prüfpunkte und neutrale Produktideen ohne medizinische Versprechen.',
    eyebrow: 'Reiseapotheke',
    h1: 'Reiseapotheke Baby für Urlaub und Flug',
    intro:
      'Eine Baby-Reiseapotheke sollte individuell zu deinem Kind, Reiseziel und Gesundheitszustand passen. Diese Seite hilft beim Sortieren, ersetzt aber keine Beratung durch Kinderarzt, Arzt oder Apotheke.',
    heroImage: '/article-images/baby-reiseapotheke.webp',
    checklist: [
      {
        heading: 'Vor der Reise prüfen',
        text: 'Medizinische Fragen gehören vorab in fachliche Hände.',
        items: ['Dauermedikamente und Dosierung klären', 'Fieber- und Schmerzmittel fachlich abstimmen', 'Impf- und Reisehinweise prüfen']
      },
      {
        heading: 'Ordnung in der Tasche',
        text: 'Eine klare Sortierung hilft nachts, im Hotel oder unterwegs.',
        items: ['Thermometer schnell erreichbar halten', 'Pflaster und Wundversorgung getrennt lagern', 'Beipackzettel nicht wegwerfen']
      },
      {
        heading: 'Unterwegs realistisch bleiben',
        text: 'Die Reiseapotheke ist kein Ersatz für medizinische Hilfe.',
        items: ['Bei Unsicherheit ärztlich abklären', 'Hitze und Lagerhinweise beachten', 'Notfallnummern griffbereit speichern']
      }
    ],
    productIds: [
      'reiseapotheke-organizer-baby',
      'fieberthermometer-reise',
      'dokumentenhuelle-wasserdicht',
      'feuchttuecherbox-reise',
      'wetbag-windeln-reise'
    ],
    relatedLinks: [
      { title: 'Baby-Reiseapotheke Ratgeber', href: '/ratgeber/reiseapotheke-baby-kind/', description: 'Ausführlicher Ratgeber mit vorsichtiger Einordnung.' },
      { title: 'Packlisten', href: '/packlisten/', description: 'Weitere Checklisten für Reise und Urlaub.' },
      { title: 'Urlaub mit Baby Packliste', href: '/urlaub-mit-baby-packliste/', description: 'Reiseapotheke im Kontext der kompletten Packliste.' }
    ],
    ctaHref: '/ratgeber/reiseapotheke-baby-kind/',
    ctaText: 'Reiseapotheke-Ratgeber lesen'
  },
  {
    slug: 'baby-im-hotel-packliste',
    title: 'Baby im Hotel Packliste: Schlafen, Wickeln, Fläschchen',
    description:
      'Baby im Hotel Packliste: Schlafplatz, Wickeln, Fläschchen, Nachtlicht, Reisebett und kleine Helfer für das Hotelzimmer.',
    eyebrow: 'Hotel mit Baby',
    h1: 'Baby im Hotel Packliste',
    intro:
      'Im Hotel hilft eine kurze, klare Packliste mehr als viel Gepäck. Wichtig sind vor allem Schlafplatz, Wickelmöglichkeit, Fläschchen-Organisation und ein ruhiger Ablauf am Abend.',
    heroImage: '/category-images/hotel-mit-baby.webp',
    checklist: [
      {
        heading: 'Vor der Buchung klären',
        text: 'Nicht jedes Babybett und nicht jedes Zimmer passt automatisch zu eurer Routine.',
        items: ['Babybett oder Reisebett anfragen', 'Wasserkocher oder Küche prüfen', 'Zimmerlage und Verdunkelung klären']
      },
      {
        heading: 'Für die Nacht',
        text: 'Ruhige Nächte lassen sich nicht garantieren, aber die Umgebung kann vertrauter wirken.',
        items: ['Schlafsack und vertrautes Tuch einpacken', 'Nachtlicht oder kleines Licht bereithalten', 'White Noise nur passend und vorsichtig nutzen']
      },
      {
        heading: 'Wickeln und Fläschchen',
        text: 'Richte dir im Zimmer eine kleine feste Station ein.',
        items: ['Wickelunterlage und Feuchttücher bündeln', 'Flaschenzubehör trocken lagern', 'Müllbeutel und Wetbag einpacken']
      }
    ],
    productIds: [
      'reisebett-baby-kompakt',
      'flaschenwaermer-akku-reise',
      'milchpulver-portionierer-reise',
      'verdunkelungsrollo-reise-baby',
      'weisses-rauschen-geraet-reise',
      'babyphone-kamera-reise'
    ],
    relatedLinks: [
      { title: 'Hotel mit Baby', href: '/hotel-mit-baby/', description: 'Kategorie für Reisebett, Nachtlicht und Flaschenwärmer.' },
      { title: 'Baby im Hotel Ratgeber', href: '/ratgeber/baby-im-hotel/', description: 'Ausführlichere Tipps für Hotelzimmer mit Baby.' },
      { title: 'Reisebett oder Hotelbett?', href: '/ratgeber/reisebett-oder-hotelbett-was-ist-besser/', description: 'Einordnung für Schlafplatz-Entscheidungen.' }
    ],
    ctaHref: '/hotel-mit-baby/',
    ctaText: 'Hotel mit Baby öffnen'
  },
  {
    slug: 'strandurlaub-mit-baby-packliste',
    title: 'Strandurlaub mit Baby Packliste: Sonne, Schatten, Wickeln',
    description:
      'Strandurlaub mit Baby Packliste: Schatten, UV-Schutz, Strandtasche, Wetbag, Trinkpausen und praktische Produktideen.',
    eyebrow: 'Strand & Sonne',
    h1: 'Strandurlaub mit Baby Packliste',
    intro:
      'Am Strand mit Baby zählen Schatten, kurze Wege und gute Vorbereitung. Diese Checkliste hilft beim Packen, ohne Sicherheit oder Sonnenschutz pauschal zu versprechen.',
    heroImage: '/article-images/urlaub-am-strand-mit-baby.webp',
    checklist: [
      {
        heading: 'Schatten und Kleidung',
        text: 'Sonnenschutz ist individuell und sollte immer zur Situation passen.',
        items: ['Schattenlösung vorab prüfen', 'UV-Kleidung und Sonnenhut einpacken', 'Mittagshitze möglichst meiden']
      },
      {
        heading: 'Strandtasche packen',
        text: 'Alles sollte sandtauglich und schnell greifbar sein.',
        items: ['Trinkflasche und Snacks einpacken', 'Wetbag für nasse Kleidung nutzen', 'Wickelset separat halten']
      },
      {
        heading: 'Nach dem Strand',
        text: 'Nasse Sachen und Sand sind leichter zu handhaben, wenn du sie direkt trennst.',
        items: ['Wechselkleidung oben einpacken', 'Reisehandtuch griffbereit halten', 'Sandspielzeug bewusst begrenzen']
      }
    ],
    productIds: [
      'strandmuschel-baby-uv',
      'baby-sonnenhut-uv',
      'uv-shirt-kind-langarm',
      'wetbag-windeln-reise',
      'schwimmwindeln-reise',
      'sandfreie-strandmatte-familie'
    ],
    relatedLinks: [
      { title: 'Strand & Sonne', href: '/strand-sonne/', description: 'Kategorie für UV-Schutz, Schatten und Strandhelfer.' },
      { title: 'Urlaub am Strand mit Baby', href: '/ratgeber/urlaub-am-strand-mit-baby/', description: 'Ratgeber für Strandtage mit Baby.' },
      { title: 'Urlaub mit Baby Packliste', href: '/urlaub-mit-baby-packliste/', description: 'Komplette Packliste für den Familienurlaub.' }
    ],
    ctaHref: '/strand-sonne/',
    ctaText: 'Strand & Sonne ansehen'
  },
  {
    slug: 'handgepaeck-baby-flug',
    title: 'Handgepäck Baby Flug: Wickeltasche richtig packen',
    description:
      'Handgepäck Baby Flug: Checkliste für Wickeltasche, Dokumente, Snacks, Wechselkleidung, Beschäftigung und kleine Helfer im Flugzeug.',
    eyebrow: 'Handgepäck Flug',
    h1: 'Handgepäck mit Baby für den Flug',
    intro:
      'Das wichtigste Handgepäck mit Baby ist nicht besonders groß, sondern gut sortiert. Alles, was du am Sitzplatz oder auf der Flugzeugtoilette brauchst, sollte mit wenigen Griffen erreichbar sein.',
    heroImage: '/article-images/fliegen-mit-baby-dinge.webp',
    checklist: [
      {
        heading: 'Direkt griffbereit',
        text: 'Diese Dinge sollten nicht im Kofferfach verschwinden.',
        items: ['Windeln, Tücher und Unterlage', 'Wechselbody und Shirt für Eltern', 'Schnuller, Fläschchen oder Stilltuch']
      },
      {
        heading: 'Dokumente und Regeln',
        text: 'Vor allem bei internationalen Flügen lohnt sich eine eigene Dokumententasche.',
        items: ['Ausweise und Buchungsunterlagen bündeln', 'Airline-Regeln für Babynahrung prüfen', 'Notfallkontakte offline speichern']
      },
      {
        heading: 'Für Wartezeiten',
        text: 'Am Gate, im Bus oder auf dem Sitzplatz helfen kleine ruhige Dinge.',
        items: ['Leises Spielzeug einpacken', 'Snackbox altersgerecht vorbereiten', 'Dünne Decke oder Tuch mitnehmen']
      }
    ],
    productIds: [
      'wickelrucksack-reise-handgepaeck',
      'feuchttuecherbox-reise',
      'schnullerbox-reise',
      'snackbox-kind-faecher',
      'trinkflasche-kind-auslaufsicher',
      'spielzeug-flugreise-beschaeftigungsbuch'
    ],
    relatedLinks: [
      { title: 'Fliegen mit Baby Packliste', href: '/fliegen-mit-baby-packliste/', description: 'Komplette Flug-Checkliste für Eltern.' },
      popularGuideLinks[0],
      { title: 'Wickeln unterwegs', href: '/ratgeber/wickeln-unterwegs/', description: 'Ratgeber für Wickeln auf Reisen und im Flugzeug.' }
    ],
    ctaHref: '/ratgeber/fliegen-mit-baby-dinge/',
    ctaText: 'Flug-Ratgeber lesen'
  },
  {
    slug: 'autofahrt-mit-baby-checkliste',
    title: 'Autofahrt mit Baby Checkliste: Pausen, Snacks und Reisehelfer',
    description:
      'Autofahrt mit Baby Checkliste: Pausen planen, Wickeltasche packen, Snacks, Trinkflasche, Sonnenschutz, Beschäftigung und praktische Produktideen.',
    eyebrow: 'Autoreise mit Baby',
    h1: 'Autofahrt mit Baby Checkliste',
    intro:
      'Eine lange Autofahrt mit Baby wird leichter, wenn Pausen, Wickeln, Trinken, Sonnenschutz und Schlaf nicht improvisiert werden müssen. Diese Checkliste hilft dir, realistisch zu planen und das Handgepäck im Auto sinnvoll zu sortieren.',
    heroImage: '/travel-product-images/auto-sonnenschutz-kind-fenster.webp',
    checklist: [
      {
        heading: 'Vor der Abfahrt',
        text: 'Plane die Route so, dass Pausen nicht erst kommen, wenn alle erschöpft sind.',
        items: ['Wickel- und Fütterpausen einplanen', 'Route mit geeigneten Stopps prüfen', 'Sonnenschutz am Fenster testen']
      },
      {
        heading: 'Griffbereit im Auto',
        text: 'Alles, was während der Fahrt gebraucht wird, gehört in Reichweite der Erwachsenen.',
        items: ['Windeln, Feuchttücher und Wechselkleidung', 'Trinkflasche und altersgerechte Snacks', 'Müllbeutel oder Wetbag für nasse Sachen']
      },
      {
        heading: 'Schlaf und Beschäftigung',
        text: 'Wenige vertraute Dinge reichen oft aus. Wichtig ist, dass nichts lose und gefährlich herumfliegt.',
        items: ['Leichte Decke oder Tuch einpacken', 'Leise Beschäftigung für Pausen bereithalten', 'Kindersitz und Gurte nach Herstellerangaben prüfen']
      }
    ],
    productIds: [
      'auto-sonnenschutz-kind-fenster',
      'snackbox-kind-faecher',
      'trinkflasche-kind-auslaufsicher',
      'feuchttuecherbox-reise',
      'reise-toilettensitz-kind',
      'kuscheldecke-kind-reise'
    ],
    relatedLinks: [
      { title: 'Lange Autofahrt mit Kind', href: '/ratgeber/lange-autofahrt-mit-kind-tipps/', description: 'Ratgeber für Pausen, Snacks und Beschäftigung unterwegs.' },
      { title: 'Reisen mit Kind', href: '/reisen-mit-kind/', description: 'Planung, Tagesrucksack und Reiseprodukte für Familien.' },
      { title: 'Urlaub mit Baby Packliste', href: '/urlaub-mit-baby-packliste/', description: 'Die komplette Packliste für Schlafen, Wickeln, Essen und Sonne.' }
    ],
    ctaHref: '/ratgeber/lange-autofahrt-mit-kind-tipps/',
    ctaText: 'Autofahrt-Ratgeber lesen'
  }
];

export function getSeoLandingPageBySlug(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
