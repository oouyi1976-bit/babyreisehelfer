import fs from 'node:fs/promises';

type Frontmatter = {
  title?: string;
  description?: string;
  category?: string;
};

type PinAngle = {
  title: string;
  description: string;
  overlayText: string;
  visual: string;
};

type Topic = {
  topicId: string;
  articleSlug: string;
  category: string;
  route: string;
  label: string;
  boardSuggestion: string;
  keywords: string[];
  hashtags: string[];
  angles: PinAngle[];
};

type Board = {
  name: string;
  description: string;
  keywords: string[];
  pinMatches: string[];
};

const siteUrl = process.env.SITE_URL ?? 'https://babyreisehelfer.pages.dev';
const pinterestDir = new URL('../marketing/pinterest/', import.meta.url);
const articlesDir = new URL('../src/content/ratgeber/', import.meta.url);

const publishWindows = [
  'Montag 19:00-21:00',
  'Dienstag 12:00-14:00',
  'Mittwoch 20:00-21:30',
  'Donnerstag 18:00-20:00',
  'Freitag 11:00-13:00',
  'Samstag 09:00-11:00',
  'Sonntag 19:00-21:00'
];

const boards: Board[] = [
  {
    name: 'Reisen mit Baby',
    description:
      'Praktische Ratgeber, Packideen und ruhige Vorbereitung für Reisen mit Baby, von Wochenendtrip bis Sommerurlaub.',
    keywords: ['Reisen mit Baby', 'Baby Reise Tipps', 'Familienurlaub', 'Baby unterwegs'],
    pinMatches: ['Packlisten', 'Flugzeug', 'Hotel', 'Strand', 'Reiseprodukte']
  },
  {
    name: 'Baby Packlisten',
    description:
      'Speicherbare Checklisten für Koffer, Handgepäck, Reiseapotheke, Hotelzimmer und Strandtage mit Baby.',
    keywords: ['Baby Packliste', 'Packliste Urlaub Baby', 'Handgepäck Baby', 'Checkliste Baby'],
    pinMatches: ['Mallorca-Packliste', 'Reiseapotheke', 'Wickeln unterwegs', 'Organisation']
  },
  {
    name: 'Fliegen mit Baby',
    description:
      'Ruhige Vorbereitung für Flughafen, Kabine, Handgepäck, Wickeln und Schlafen während der Flugreise.',
    keywords: ['Fliegen mit Baby', 'Baby Flugzeug', 'Handgepäck Baby', 'Flugreise Baby'],
    pinMatches: ['Flugzeug', 'Handgepäck', 'Wickelunterlage', 'Gehörschutz']
  },
  {
    name: 'Urlaub mit Baby',
    description:
      'Ideen für entspanntere Urlaubstage mit Baby: Unterkunft, Transfers, Tagesrhythmus, Packen und kleine Helfer.',
    keywords: ['Urlaub mit Baby', 'Familienurlaub Baby', 'Baby Urlaub Tipps', 'Reiseplanung Baby'],
    pinMatches: ['Mallorca', 'Hotel', 'Packlisten', 'Reiseprodukte']
  },
  {
    name: 'Baby Strandurlaub',
    description:
      'Schatten, UV-Schutz, Sand, Wind und praktische Planung für Strandtage und warme Reiseziele mit Baby.',
    keywords: ['Baby Strandurlaub', 'UV Schutz Baby', 'Strand mit Baby', 'Sommerurlaub Baby'],
    pinMatches: ['Strandurlaub', 'UV-Schutz', 'Sonnenschutz', 'Mallorca']
  },
  {
    name: 'Kinderwagen Zubehör',
    description:
      'Kinderwagen-Zubehör für unterwegs: Sonnenschutz, Moskitonetz, Organizer, Ventilator und Regenschutz.',
    keywords: ['Kinderwagen Zubehör', 'Buggy Urlaub', 'Kinderwagen Sommer', 'Kinderwagen Sonnenschutz'],
    pinMatches: ['Kinderwagen', 'Buggy', 'Sommer', 'Zubehör']
  },
  {
    name: 'Baby im Hotel',
    description:
      'Ratgeber für Hotelzimmer mit Baby: Schlafplatz, Nachtlicht, Fläschchen, Wickeln und ruhige Abendroutine.',
    keywords: ['Baby im Hotel', 'Hotel mit Baby', 'Reisebett Baby', 'Nachtlicht Baby'],
    pinMatches: ['Hotel', 'Reisebett', 'Nachtlicht', 'Flaschenwärmer']
  },
  {
    name: 'Familienurlaub Tipps',
    description:
      'Alltagstaugliche Tipps für Familienurlaub ohne übertriebenes Gepäck und ohne hektische Last-Minute-Suche.',
    keywords: ['Familienurlaub Tipps', 'Urlaub planen Familie', 'Reisen mit Kindern', 'Packen Familie'],
    pinMatches: ['Organisation', 'Dokumente', 'Packwürfel', 'Planung']
  }
];

const topics: Topic[] = [
  {
    topicId: 'packliste-mallorca-mit-baby',
    articleSlug: 'packliste-mallorca-mit-baby',
    category: 'packlisten',
    route: '/ratgeber/packliste-mallorca-mit-baby/',
    label: 'Packliste Mallorca mit Baby',
    boardSuggestion: 'Baby Packlisten',
    keywords: ['Packliste Mallorca Baby', 'Urlaub mit Baby', 'Mallorca mit Baby', 'Baby Packliste'],
    hashtags: ['#babyreise', '#urlaubmitbaby', '#mallorcaMitBaby', '#packliste', '#familienurlaub'],
    angles: [
      {
        title: 'Packliste Mallorca mit Baby: Was wirklich mit sollte',
        description:
          'Eine ruhige Mallorca-Packliste für Babyurlaub: Schatten, Kleidung, Flug, Hotel und Reiseapotheke sinnvoll vorbereiten.',
        overlayText: 'Mallorca Packliste',
        visual: 'offener Koffer mit Babybody, Sonnenhut, Windeln, Checkliste und weichem Sommerlicht'
      },
      {
        title: 'Mallorca mit Baby: Diese Packliste spart Sucherei',
        description:
          'Speicherbare Packidee für Mallorca mit Baby, damit Handgepäck, Strandtasche und Hotel-Basics übersichtlich bleiben.',
        overlayText: 'Weniger suchen',
        visual: 'ordentliche Packing Cubes mit Baby-Kleidung und kleiner Kulturtasche auf hellem Untergrund'
      },
      {
        title: 'Babyurlaub auf Mallorca: Die wichtigsten Basics',
        description:
          'Praktische Übersicht für warme Reisetage mit Baby: Sonnenschutz, Wickeln, Schlafen und die ersten 24 Stunden planen.',
        overlayText: 'Die Basics',
        visual: 'cremefarbene Reise-Checkliste neben Babyhut, Musselintuch und kleiner Tasche'
      },
      {
        title: 'Was packen für Mallorca mit Baby?',
        description:
          'Orientierung für Eltern, die nicht zu viel einpacken wollen: Was hilft im Flugzeug, im Hotel und am Strand?',
        overlayText: 'Was packen?',
        visual: 'Baby-Reisegepäck als ruhiges Flatlay mit Koffer, Dokumententasche und Thermosflasche'
      },
      {
        title: 'Mallorca-Packliste Baby: Erstflug, Hotel und Strand',
        description:
          'Eine realistische Packstruktur für Mallorca: Handgepäck, Hotelzimmer, Strandtage und Reiseapotheke getrennt planen.',
        overlayText: 'Flug Hotel Strand',
        visual: 'dreigeteilte Pin-Komposition mit Flugzeugfenster, Hotelbett und Strandmuschel als dezente Fotoideen'
      },
      {
        title: 'Baby-Reiseplanung für Mallorca: Kleiner Check vor dem Abflug',
        description:
          'Kurz vor der Reise prüfen: Schatten, Trinkzubehör, Windeln, Schlafplatz, Dokumente und erste Versorgung am Ankunftstag.',
        overlayText: 'Check vor Abflug',
        visual: 'Hand mit Stift auf Checkliste, daneben Baby-Sonnenhut und Reisepasshülle'
      }
    ]
  },
  {
    topicId: 'fliegen-mit-baby',
    articleSlug: 'fliegen-mit-baby-dinge',
    category: 'fliegen-mit-baby',
    route: '/ratgeber/fliegen-mit-baby-dinge/',
    label: 'Fliegen mit Baby',
    boardSuggestion: 'Fliegen mit Baby',
    keywords: ['Fliegen mit Baby', 'Handgepäck Baby', 'Baby Flugzeug', 'Flugreise Baby'],
    hashtags: ['#fliegenmitbaby', '#babyreise', '#handgepäck', '#flugzeugmitbaby', '#elterntipps'],
    angles: [
      {
        title: 'Fliegen mit Baby: Was gehört griffbereit ins Handgepäck?',
        description:
          'Handgepäck-Ideen für den Flug mit Baby: Wickeln, Wechselkleidung, Nahrung, Dokumente und kleine Ruhehelfer.',
        overlayText: 'Handgepäck griffbereit',
        visual: 'Flugzeug-Sitz mit geordnetem Wickelrucksack, Feuchttüchern und kleinem Beutel'
      },
      {
        title: 'Baby im Flugzeug: 7 Dinge, die den Ablauf leichter machen',
        description:
          'Keine perfekte Flugreise, aber weniger Chaos: So planst du Wickeln, Schlafen, Druckausgleich und Ordnung in der Kabine.',
        overlayText: 'Ruhiger fliegen',
        visual: 'helles Flatlay mit Bordkarte, Baby-Gehörschutz, Wickelunterlage und Wechselbody'
      },
      {
        title: 'Flug mit Baby vorbereiten: Kleine Beutel statt Chaos',
        description:
          'Modulares Packen für die Kabine: Wickelbeutel, Essensbeutel, Schlafbeutel und Dokumente getrennt vorbereiten.',
        overlayText: 'Beutel statt Chaos',
        visual: 'mehrere beschriftungsfreie Stoffbeutel in Pastellfarben neben einem Handgepäck-Rucksack'
      },
      {
        title: 'Fliegen mit Baby: Wickeln im Flugzeug besser planen',
        description:
          'Praktische Vorbereitung für enge Flugzeugtoiletten: wenige Dinge, schnell erreichbar und hygienisch verstaut.',
        overlayText: 'Wickeln im Flug',
        visual: 'faltbare Wickelunterlage, Windel und Mini-Tücher auf kleinem Reisetisch'
      },
      {
        title: 'Erster Flug mit Baby: Diese Vorbereitung hilft',
        description:
          'Vor dem ersten Flug mit Baby: Airline-Regeln prüfen, Handgepäck sortieren und Pausen am Flughafen einplanen.',
        overlayText: 'Erster Flug',
        visual: 'Familien-Handgepäck vor hellem Flughafenfenster, ohne Logos und ohne Airline-Marken'
      },
      {
        title: 'Flugzeug mit Baby: Was du vorher klären solltest',
        description:
          'Buggy, Flüssigkeiten, Babynahrung und Gepäckregeln unterscheiden sich je nach Airline. Diese Punkte vorher prüfen.',
        overlayText: 'Vorher klären',
        visual: 'Laptop mit Reisecheckliste, daneben Reisepass, Babyfläschchen und kleine Tasche'
      }
    ]
  },
  {
    topicId: 'baby-im-hotel',
    articleSlug: 'baby-im-hotel',
    category: 'hotel-mit-baby',
    route: '/ratgeber/baby-im-hotel/',
    label: 'Baby im Hotel',
    boardSuggestion: 'Baby im Hotel',
    keywords: ['Baby im Hotel', 'Hotel mit Baby', 'Reisebett Baby', 'Nachtlicht Baby'],
    hashtags: ['#hotelmitbaby', '#babyreise', '#urlaubmitbaby', '#reisebett', '#familienhotel'],
    angles: [
      {
        title: 'Baby im Hotel: Diese Fragen vor der Buchung stellen',
        description:
          'Babybett, Aufzug, Verdunklung, Wasserkocher und Kühlschrank: Was du vor dem Hotelaufenthalt prüfen kannst.',
        overlayText: 'Vor Buchung prüfen',
        visual: 'helles Hotelzimmer mit Reisebett, Nachtlicht und geordneter Baby-Tasche'
      },
      {
        title: 'Hotelzimmer mit Baby: Kleine Helfer für ruhigere Nächte',
        description:
          'Nachtlicht, Schlafplatz und einfache Routinen können im Hotelzimmer helfen, ohne dass der Koffer übervoll wird.',
        overlayText: 'Ruhigere Nächte',
        visual: 'Nachttisch mit warmem Nachtlicht, Babyflasche und weichem Musselintuch'
      },
      {
        title: 'Baby im Hotel: Was wirklich vor Ort wichtig wird',
        description:
          'Im Hotel zählen Wege, Schlafplatz, Licht und Fütterung oft mehr als viele Extra-Produkte. Ein praktischer Überblick.',
        overlayText: 'Hotel-Basics',
        visual: 'übersichtliche Hotel-Packtasche mit Wickelorganizer und Schlafsachen'
      },
      {
        title: 'Hotel mit Baby: Reisebett, Nachtlicht und Flaschenwärmer',
        description:
          'Produktideen für den Hotelaufenthalt mit Baby, neutral erklärt und ohne Preise, Sterne oder Shop-Versprechen.',
        overlayText: '3 Hotel-Helfer',
        visual: 'Reisebett, kleines Nachtlicht und Fläschchenwärmer als cleane Studio-Komposition'
      },
      {
        title: 'Baby schläft im Hotel: So planst du die Umgebung',
        description:
          'Verdunklung, Geräusche, Licht und Schlafplatz vorher bedenken, damit die erste Nacht weniger überraschend wird.',
        overlayText: 'Schlafplatz planen',
        visual: 'ruhige Hotelszene mit Reisebett am Fenster und leichtem Vorhang'
      },
      {
        title: 'Checkliste Hotel mit Baby: Kurz vor der Anreise',
        description:
          'Eine praktische Hotel-Checkliste für Babybett, Kühlschrank, Wasserkocher, Aufzug und nächtliches Licht.',
        overlayText: 'Hotel Checkliste',
        visual: 'Checkliste auf Hotelbett mit Baby-Reisetasche, Nachtlicht und kleinen Pflegeartikeln'
      }
    ]
  },
  {
    topicId: 'kinderwagen-im-sommer',
    articleSlug: 'kinderwagen-im-sommer',
    category: 'kinderwagen-zubehoer',
    route: '/ratgeber/kinderwagen-im-sommer/',
    label: 'Kinderwagen im Sommer',
    boardSuggestion: 'Kinderwagen Zubehör',
    keywords: ['Kinderwagen Sommer', 'Kinderwagen Sonnenschutz', 'Buggy Sommer', 'Baby Hitzeschutz'],
    hashtags: ['#kinderwagen', '#sommermitbaby', '#babyreise', '#sonnenschutz', '#buggy'],
    angles: [
      {
        title: 'Kinderwagen im Sommer: Schatten ohne Hitzestau',
        description:
          'Warum luftige Schattenlösungen wichtiger sind als dichte Tücher über dem Kinderwagen. Tipps für warme Reisetage.',
        overlayText: 'Schatten ohne Stau',
        visual: 'Kinderwagen im hellen Park mit luftigem Sonnenschutz und viel Abstand zum Stoff'
      },
      {
        title: 'Sommer mit Baby: Kinderwagen-Zubehör sinnvoll auswählen',
        description:
          'Sonnenschutz, Ventilator und Moskitonetz neutral einordnen: Worauf du bei Befestigung und Luftzirkulation achten solltest.',
        overlayText: 'Sommer-Zubehör',
        visual: 'Buggy mit Sonnenschutz, kleinem Ventilator und Organizer als sauberes Reisemotiv'
      },
      {
        title: 'Kinderwagen-Sonnenschutz: Worauf Eltern achten sollten',
        description:
          'Universal-Sonnenschutz für Kinderwagen ist praktisch, sollte aber sicher sitzen und Luft nicht blockieren.',
        overlayText: 'Sonnenschutz prüfen',
        visual: 'Nahaufnahme eines Kinderwagen-Sonnensegels in Beige mit weichem Sommerlicht'
      },
      {
        title: 'Buggy im Urlaub: Ventilator, Netz und Organizer',
        description:
          'Drei Zubehörtypen für warme Urlaube mit Baby: nicht als Muss, sondern als mögliche Helfer je nach Reiseort.',
        overlayText: 'Buggy im Urlaub',
        visual: 'Buggy am Hotelweg mit Organizer, Ventilator und kleinem Netzbeutel'
      },
      {
        title: 'Kinderwagen im Sommer: Was du lieber vermeiden solltest',
        description:
          'Dichte Abdeckungen können Wärme stauen. Besser sind luftige Lösungen, Schattenpausen und regelmäßiges Prüfen.',
        overlayText: 'Nicht zu dicht',
        visual: 'Vergleichsmotiv mit luftigem Sonnensegel und freier Luftzirkulation, keine Warnsymbole'
      },
      {
        title: 'Sommerurlaub mit Kinderwagen: Praktische Checkliste',
        description:
          'Kurze Checkliste für Spaziergänge bei Wärme: Schatten, Getränke, Pausen, Mückenschutz und Wetterschutz einplanen.',
        overlayText: 'Sommer-Check',
        visual: 'Kinderwagen neben Checkliste, Trinkflasche und Sonnenhut auf heller Terrasse'
      }
    ]
  },
  {
    topicId: 'reiseapotheke-baby',
    articleSlug: 'baby-reiseapotheke',
    category: 'packlisten',
    route: '/ratgeber/baby-reiseapotheke/',
    label: 'Reiseapotheke Baby',
    boardSuggestion: 'Baby Packlisten',
    keywords: ['Baby Reiseapotheke', 'Reiseapotheke Baby Urlaub', 'Baby Medikamente Reise', 'Packliste Baby'],
    hashtags: ['#reiseapotheke', '#babyreise', '#packliste', '#urlaubmitbaby', '#elterntipps'],
    angles: [
      {
        title: 'Baby-Reiseapotheke: Was gehört in die Tasche?',
        description:
          'Neutrale Packhilfe für die Baby-Reiseapotheke: gut sortieren, altersgerecht prüfen und vor der Reise fachlich abklären.',
        overlayText: 'Reiseapotheke Baby',
        visual: 'kleine Reiseapotheke-Box mit Thermometer, Pflastern und neutralen Fläschchen ohne Marken'
      },
      {
        title: 'Reiseapotheke Baby: Vor dem Urlaub fachlich prüfen',
        description:
          'Medikamente und Dosierungen gehören vor der Reise mit Kinderarzt oder Apotheke abgestimmt. Diese Liste hilft beim Sortieren.',
        overlayText: 'Vorher prüfen',
        visual: 'Checkliste neben kompakter Apotheke-Box und Fieberthermometer auf cremefarbenem Hintergrund'
      },
      {
        title: 'Baby-Reiseapotheke packen: Ordnung statt großer Tasche',
        description:
          'Eine kleine Box kann helfen, Pflaster, Thermometer und Pflegeartikel getrennt von Kleidung und Snacks aufzubewahren.',
        overlayText: 'Kleine Box',
        visual: 'offene Erste-Hilfe-Box für Reisen, sauber sortiert und hell fotografiert'
      },
      {
        title: 'Urlaub mit Baby: Reiseapotheke nicht erst am Abend packen',
        description:
          'Rechtzeitig prüfen, was altersgerecht ist, was mit ins Handgepäck sollte und was unterwegs schnell erreichbar bleibt.',
        overlayText: 'Rechtzeitig packen',
        visual: 'Elternhand legt kleine Reiseapotheke in Wickelrucksack, warme natürliche Beleuchtung'
      },
      {
        title: 'Baby-Reiseapotheke: Die ruhige Checkliste',
        description:
          'Eine vorsichtige Übersicht ohne Heilversprechen: Was viele Eltern vor der Reise gedanklich durchgehen.',
        overlayText: 'Ruhige Checkliste',
        visual: 'minimalistische Checkliste mit Häkchen, Baby-Pflegeartikel und kleiner Tasche'
      },
      {
        title: 'Reiseapotheke Baby: Was ins Handgepäck kann',
        description:
          'Für Flug oder lange Fahrt: wichtige, fachlich abgestimmte Dinge so packen, dass sie schnell erreichbar sind.',
        overlayText: 'Ins Handgepäck?',
        visual: 'Handgepäckfach mit kleiner medizinischer Reisebox, Wickeltasche und Reisedokumenten'
      }
    ]
  },
  {
    topicId: 'wickeln-unterwegs',
    articleSlug: 'wickeln-unterwegs',
    category: 'packlisten',
    route: '/ratgeber/wickeln-unterwegs/',
    label: 'Wickeln unterwegs',
    boardSuggestion: 'Baby Packlisten',
    keywords: ['Wickeln unterwegs', 'Wickeltasche Reise', 'Baby unterwegs wickeln', 'Wickelunterlage Reise'],
    hashtags: ['#wickelnunterwegs', '#babyreise', '#wickeltasche', '#reisenmitbaby', '#packliste'],
    angles: [
      {
        title: 'Wickeln unterwegs: Was in den kleinen Wickelbeutel gehört',
        description:
          'Eine kompakte Wickel-Packliste für Reise, Flugzeug und Tagesausflug: nur das, was schnell erreichbar sein sollte.',
        overlayText: 'Wickelbeutel packen',
        visual: 'faltbare Wickelunterlage, Windeln, Feuchttücher und kleiner Beutel als helles Flatlay'
      },
      {
        title: 'Wickeln auf Reisen: Weniger Tasche, mehr Ordnung',
        description:
          'Warum ein kleiner separater Wickelbeutel im Rucksack oft praktischer ist als eine große unübersichtliche Tasche.',
        overlayText: 'Mehr Ordnung',
        visual: 'Wickelrucksack mit separatem Organizer, klaren Fächern und Pastellfarben'
      },
      {
        title: 'Wickeln im Flugzeug: Mini-Set statt großer Tasche',
        description:
          'Für enge Räume hilft ein vorbereitetes Mini-Set mit Unterlage, Windel, Tüchern und Müllbeutel.',
        overlayText: 'Mini-Set',
        visual: 'kleines Wickelset auf Flugzeug-Klapptisch, ohne Airline-Logos'
      },
      {
        title: 'Baby unterwegs wickeln: Diese Reihenfolge spart Zeit',
        description:
          'Vorbereiten, Unterlage auslegen, wenige Dinge griffbereit halten und den Rest im Rucksack lassen.',
        overlayText: 'Schneller finden',
        visual: 'Elternhand öffnet Wickelorganizer auf neutralem Reisetisch'
      },
      {
        title: 'Wickeltasche für Reisen: Was wirklich griffbereit sein sollte',
        description:
          'Nicht alles muss oben liegen. Diese Übersicht trennt Sofort-Basics von Reservekleidung und Extra-Zubehör.',
        overlayText: 'Griffbereit',
        visual: 'zwei geordnete Taschenbereiche: Sofort-Basics und Reserve, ohne Textlabels'
      },
      {
        title: 'Wickeln unterwegs: Kleine Checkliste für Flug und Auto',
        description:
          'Eine speicherbare Checkliste für Eltern, die unterwegs nicht lange in der Tasche suchen möchten.',
        overlayText: 'Flug & Auto',
        visual: 'Wickelset neben Autositz-Gurtmotiv und Reisetasche, neutral und ruhig'
      }
    ]
  },
  {
    topicId: 'strandurlaub-mit-baby',
    articleSlug: 'urlaub-am-strand-mit-baby',
    category: 'strand-sonne',
    route: '/ratgeber/urlaub-am-strand-mit-baby/',
    label: 'Strandurlaub mit Baby',
    boardSuggestion: 'Baby Strandurlaub',
    keywords: ['Strandurlaub Baby', 'Baby Strand', 'UV Schutz Baby', 'Urlaub am Strand mit Baby'],
    hashtags: ['#strandmitbaby', '#babyreise', '#uvschutz', '#urlaubmitbaby', '#strandurlaub'],
    angles: [
      {
        title: 'Strandurlaub mit Baby: Schatten zuerst planen',
        description:
          'Für Strandtage mit Baby sind Schatten, Pausen und kurze Wege oft wichtiger als viel Zubehör.',
        overlayText: 'Schatten zuerst',
        visual: 'helle Strandmuschel im Sand, Babyhut und Tasche daneben, ohne Menschen im Fokus'
      },
      {
        title: 'Baby am Strand: Was du vorher einpacken kannst',
        description:
          'Packideen für Strandtage mit Baby: UV-Hut, Wetbag, Trinkzubehör, Tücher und eine ruhige Schattenlösung.',
        overlayText: 'Strand-Packliste',
        visual: 'Strandtasche mit UV-Hut, Musselintuch, Wetbag und Wasserflasche'
      },
      {
        title: 'Strand mit Baby: Weniger Hitze, mehr Pausen',
        description:
          'Kurze Strandzeiten, Schatten und Luftzirkulation helfen, warme Tage entspannter zu planen.',
        overlayText: 'Mehr Pausen',
        visual: 'ruhiger Strandplatz am Vormittag mit Sonnenschutz und heller Picknickdecke'
      },
      {
        title: 'UV-Schutz für Baby: Worauf du im Urlaub achten solltest',
        description:
          'Neutraler Überblick zu Hut, Schatten, Kleidung und Strandmuschel, ohne Produktversprechen oder medizinische Aussagen.',
        overlayText: 'UV-Schutz prüfen',
        visual: 'Baby-UV-Hut, leichte Kleidung und Strandmuschel als cleane Studio-Komposition'
      },
      {
        title: 'Strandurlaub Baby: Nasse Kleidung sauber verstauen',
        description:
          'Wetbag, Wechselkleidung und kleine Beutel halten Sand und nasse Sachen getrennt vom Rest der Tasche.',
        overlayText: 'Nasses getrennt',
        visual: 'wasserfeste Tasche neben nasser Baby-Badekleidung und Handtuch auf hellem Sand'
      },
      {
        title: 'Baby Strandtag planen: Die einfache Morgen-Checkliste',
        description:
          'Vor dem Strand kurz prüfen: Schatten, Trinkpause, Wechselkleidung, Wickeln, Rückweg und Mittagshitze.',
        overlayText: 'Morgen-Check',
        visual: 'Morgenlicht am Hoteltisch mit Strand-Checkliste, Sonnenhut und kleiner Tasche'
      }
    ]
  },
  {
    topicId: 'kinderwagen-zubehoer',
    articleSlug: 'kinderwagen-zubehoer-urlaub',
    category: 'kinderwagen-zubehoer',
    route: '/ratgeber/kinderwagen-zubehoer-urlaub/',
    label: 'Kinderwagen-Zubehör',
    boardSuggestion: 'Kinderwagen Zubehör',
    keywords: ['Kinderwagen Zubehör Urlaub', 'Buggy Zubehör Reise', 'Kinderwagen Organizer', 'Regenschutz Buggy'],
    hashtags: ['#kinderwagenzubehör', '#buggy', '#babyreise', '#urlaubmitbaby', '#kinderwagen'],
    angles: [
      {
        title: 'Kinderwagen-Zubehör für den Urlaub: Was lohnt sich wirklich?',
        description:
          'Neutraler Ratgeber zu Sonnenschutz, Organizer, Moskitonetz, Ventilator und Regenschutz für Reisen mit Baby.',
        overlayText: 'Was lohnt sich?',
        visual: 'Kinderwagen mit wenigen Zubehörteilen sauber arrangiert auf hellem Reiseweg'
      },
      {
        title: 'Buggy im Urlaub: Zubehör nach Reiseziel auswählen',
        description:
          'Strand, Stadt oder Hotelanlage: Welches Kinderwagen-Zubehör je nach Situation sinnvoll sein kann.',
        overlayText: 'Nach Reiseziel',
        visual: 'Buggy neben drei dezenten Reiseziel-Symbolen: Strand, Stadt, Hotel'
      },
      {
        title: 'Kinderwagen-Organizer: Praktisch oder nur extra Gepäck?',
        description:
          'Ein Organizer kann helfen, wenn Flasche, Tücher und Handy griffbereit bleiben sollen. Worauf du achten kannst.',
        overlayText: 'Organizer prüfen',
        visual: 'Kinderwagen-Organizer mit Flasche, Tuch und Handy-Dummy ohne Marken'
      },
      {
        title: 'Moskitonetz für Kinderwagen: Wann es auf Reisen hilft',
        description:
          'Mückenschutz kann je nach Reiseziel sinnvoll sein. Wichtig sind Passform, Luftigkeit und sichere Befestigung.',
        overlayText: 'Mückenschutz',
        visual: 'Kinderwagen mit fein sichtbarem Moskitonetz in ruhiger Abendstimmung'
      },
      {
        title: 'Buggy-Regenschutz im Urlaub: Nicht nur bei Regen',
        description:
          'Wind, kurze Schauer und kühle Abende: Warum ein leichter Wetterschutz in manchen Urlauben praktisch sein kann.',
        overlayText: 'Regen & Wind',
        visual: 'Buggy mit transparentem Regenschutz und wenigen Regentropfen vor hellem Hintergrund'
      },
      {
        title: 'Kinderwagen-Zubehör: Die kleine Urlaubsliste',
        description:
          'Eine reduzierte Liste für Eltern, die nicht jedes Zubehörteil mitnehmen möchten, sondern gezielt nach Reiseproblem packen.',
        overlayText: 'Kleine Liste',
        visual: 'Checkliste neben Sonnenschutz, Organizer und Mückennetz in sanften Farben'
      }
    ]
  },
  {
    topicId: 'baby-reiseprodukte',
    articleSlug: 'produkte',
    category: 'produkte',
    route: '/produkte/',
    label: 'Baby-Reiseprodukte',
    boardSuggestion: 'Reisen mit Baby',
    keywords: ['Baby Reiseprodukte', 'Reiseprodukte Baby', 'Urlaub mit Baby Produkte', 'Baby Reisehelfer'],
    hashtags: ['#babyreiseprodukte', '#babyreise', '#urlaubmitbaby', '#familienurlaub', '#packliste'],
    angles: [
      {
        title: 'Baby-Reiseprodukte: Welche Helfer lösen echte Probleme?',
        description:
          'Produktideen für Reisen mit Baby, neutral sortiert nach Flugzeug, Hotel, Strand, Kinderwagen und Packlisten.',
        overlayText: 'Echte Reisehelfer',
        visual: 'hochwertiges Flatlay mit Baby-Reiseprodukten ohne Marken, Preise oder Shop-Elemente'
      },
      {
        title: 'Reiseprodukte fürs Baby: Erst Problem, dann Produkt',
        description:
          'Nicht alles ist nötig. Diese Übersicht hilft, Produkte nach konkreter Reisesituation statt nach Werbung auszuwählen.',
        overlayText: 'Problem vor Produkt',
        visual: 'cleane Magazin-Komposition mit Koffer, Checkliste und wenigen Baby-Reisehelfern'
      },
      {
        title: 'Baby-Reisehelfer: Produktideen ohne Preis- und Sternevergleich',
        description:
          'Seriöse Produktkarten ohne Amazon-Bilder, Preise oder Bewertungen: Fokus auf Nutzen, Grenzen und Kaufkriterien.',
        overlayText: 'Ohne Sterne-Hype',
        visual: 'ruhige Produktübersicht mit neutralen Karten, Pastellfarben und Baby-Reisekontext'
      },
      {
        title: 'Urlaub mit Baby: Produkte nach Flug, Hotel und Strand sortieren',
        description:
          'Eine übersichtliche Produktseite für Eltern, die Reisehelfer nach Situation statt nach Shop-Kategorie finden möchten.',
        overlayText: 'Nach Situation',
        visual: 'drei Reisebereiche als Foto-Set: Flughandgepäck, Hotelzimmer, Strandtasche'
      },
      {
        title: 'Baby-Reiseprodukte: Worauf du vor dem Kauf achten kannst',
        description:
          'Größe, Gewicht, Reinigung, Sicherheitshinweise und Alltagstauglichkeit: Kriterien für Reiseprodukte mit Baby.',
        overlayText: 'Worauf achten?',
        visual: 'Checkliste mit Maßband, Tasche und ausgewählten neutralen Baby-Reiseartikeln'
      },
      {
        title: 'Packen mit Baby: Kleine Helfer für mehr Ordnung',
        description:
          'Packing Cubes, Dokumententasche, Wickelorganizer und Wetbag können helfen, wenn sie zum Reisestil passen.',
        overlayText: 'Mehr Ordnung',
        visual: 'ordentlich gepackter Koffer mit Packwürfeln, Dokumententasche und Baby-Kleidung'
      }
    ]
  },
  {
    topicId: 'hotel-mit-baby',
    articleSlug: 'hotel-mit-baby',
    category: 'hotel-mit-baby',
    route: '/hotel-mit-baby/',
    label: 'Hotel mit Baby',
    boardSuggestion: 'Baby im Hotel',
    keywords: ['Hotel mit Baby', 'Baby Hotelzimmer', 'Reisebett Baby', 'Flaschenwärmer Reise'],
    hashtags: ['#hotelmitbaby', '#babyreise', '#urlaubmitbaby', '#familienurlaub', '#reisebett'],
    angles: [
      {
        title: 'Hotel mit Baby: Produktideen fürs Zimmer',
        description:
          'Übersicht für Hotelaufenthalte mit Baby: Schlafplatz, Licht, Fläschchen, Wickeln und kleine Routinen.',
        overlayText: 'Hotelzimmer Basics',
        visual: 'Hotelzimmer mit Reisebett, Wickelorganizer und warmem Nachtlicht'
      },
      {
        title: 'Baby im Hotelzimmer: Was den Alltag einfacher machen kann',
        description:
          'Kleine Helfer für Zimmer und Nacht, ohne den Koffer unnötig voll zu machen: neutral und nach Situation sortiert.',
        overlayText: 'Einfacher Alltag',
        visual: 'Baby-Reisetasche auf Hotelbett mit wenigen gut sichtbaren Helfern'
      },
      {
        title: 'Hotel mit Baby: Reisebett vorab klären',
        description:
          'Ob du ein Reisebett mitnimmst oder nicht: Vorab nach Bett, Matratze, Platz und Aufzug fragen.',
        overlayText: 'Reisebett klären',
        visual: 'Reisebett im hellen Hotelzimmer mit Checkliste auf dem Nachttisch'
      },
      {
        title: 'Fläschchen im Hotel: Was vorher praktisch sein kann',
        description:
          'Wasserkocher, Kühlschrank, USB-Flaschenwärmer oder Thermosflasche: Was je nach Hotel sinnvoll sein kann.',
        overlayText: 'Fläschchen planen',
        visual: 'Babyflasche, Thermosflasche und kleiner Wärmer auf Hotel-Schreibtisch'
      },
      {
        title: 'Hotel mit Baby: Nachtlicht statt grelles Zimmerlicht',
        description:
          'Ein kleines Nachtlicht kann nachts Orientierung geben, ohne das ganze Zimmer hell zu machen.',
        overlayText: 'Sanftes Licht',
        visual: 'kleines warmes Nachtlicht neben Babyflasche in ruhigem Hotelzimmer'
      },
      {
        title: 'Baby-Hotelcheck: Diese Punkte vorher notieren',
        description:
          'Babybett, Verdunklung, Wege, Aufzug, Kühlschrank und Wasserkocher: eine speicherbare Hotel-Checkliste.',
        overlayText: 'Hotelcheck',
        visual: 'Notizbuch mit Hotel-Checkliste, Zimmerkarte und kleiner Baby-Tasche'
      }
    ]
  }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function readArticleFrontmatter() {
  const entries = await fs.readdir(articlesDir);
  const markdownFiles = entries.filter((entry) => entry.endsWith('.md'));
  const result = new Map<string, Frontmatter>();

  for (const fileName of markdownFiles) {
    const slug = fileName.replace(/\.md$/, '');
    const raw = await fs.readFile(new URL(fileName, articlesDir), 'utf8');
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter: Frontmatter = {};

    if (match) {
      for (const line of match[1].split('\n')) {
        const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
        if (!field) continue;
        const [, key, value] = field;
        if (key === 'title' || key === 'description' || key === 'category') {
          frontmatter[key] = value.replace(/^"|"$/g, '');
        }
      }
    }

    result.set(slug, frontmatter);
  }

  return result;
}

function buildTargetUrl(route: string) {
  return new URL(route, siteUrl).href;
}

function buildImagePrompt(topic: Topic, angle: PinAngle) {
  return [
    'Pinterest pin 1000 x 1500',
    'warm cream background',
    'baby blue, sage green and coral accent palette',
    `large readable German overlay text "${angle.overlayText}"`,
    'premium clean magazine look for BabyReiseHelfer',
    angle.visual,
    'baby travel context',
    'no logos',
    'no Amazon images',
    'no prices',
    'no star ratings',
    'no reviews',
    'no watermarks',
    `topic: ${topic.label}`
  ].join(', ');
}

function buildPins(articleData: Map<string, Frontmatter>) {
  let index = 0;

  return topics.flatMap((topic) => {
    const frontmatter = articleData.get(topic.articleSlug);
    const baseDescription = frontmatter?.description;

    return topic.angles.map((angle, angleIndex) => {
      index += 1;

      return {
        id: `${topic.topicId}-pin-${String(angleIndex + 1).padStart(2, '0')}`,
        status: 'draft',
        targetUrl: buildTargetUrl(topic.route),
        boardSuggestion: topic.boardSuggestion,
        pinTitle: angle.title,
        pinDescription: `${angle.description} ${baseDescription ? `Passend zum BabyReiseHelfer-Ratgeber: ${baseDescription}` : 'Mehr dazu findest du auf BabyReiseHelfer.'}`,
        overlayText: angle.overlayText,
        imagePrompt: buildImagePrompt(topic, angle),
        keywords: topic.keywords,
        hashtags: topic.hashtags,
        publishWindowSuggestion: publishWindows[(index - 1) % publishWindows.length],
        articleSlug: topic.articleSlug,
        category: topic.category
      };
    });
  });
}

function renderPinsMarkdown(pins: ReturnType<typeof buildPins>) {
  const sections = topics
    .map((topic) => {
      const topicPins = pins.filter((pin) => pin.articleSlug === topic.articleSlug);
      const rows = topicPins
        .map(
          (pin) => `### ${pin.pinTitle}

- Status: ${pin.status}
- Ziel-URL: ${pin.targetUrl}
- Board: ${pin.boardSuggestion}
- Beschreibung: ${pin.pinDescription}
- Overlay-Text: ${pin.overlayText}
- Bildidee: ${pin.imagePrompt}
- Keywords: ${pin.keywords.join(', ')}
- Hashtags: ${pin.hashtags.join(' ')}
- Veröffentlichungsfenster: ${pin.publishWindowSuggestion}`
        )
        .join('\n\n');

      return `## ${topic.label}\n\n${rows}`;
    })
    .join('\n\n');

  return `# Pinterest-Pin-Ideen für BabyReiseHelfer

Diese Übersicht ist eine Arbeitsfassung für manuelle Planung, Canva und spätere API-Automatisierung. Alle Ziel-URLs zeigen auf BabyReiseHelfer, nicht direkt auf Amazon.

${sections}
`;
}

function renderBoardsMarkdown() {
  const rows = boards
    .map(
      (board) => `## ${board.name}

${board.description}

- Passende Keywords: ${board.keywords.join(', ')}
- Pins für dieses Board: ${board.pinMatches.join(', ')}`
    )
    .join('\n\n');

  return `# Pinterest-Board-Ideen für BabyReiseHelfer

Diese Boards sind als Startstruktur gedacht. Vor dem Veröffentlichen bitte Board-Namen, Beschreibung und Keywords im Pinterest-Business-Konto prüfen.

${rows}
`;
}

function renderThirtyDayPlan(pins: ReturnType<typeof buildPins>) {
  const planPins = pins.slice(0, 30);
  const rows = planPins
    .map((pin, index) => {
      const shortDescription = pin.pinDescription.replace(/\s+/g, ' ').slice(0, 155);
      return `| ${index + 1} | ${pin.boardSuggestion} | ${pin.pinTitle} | ${pin.targetUrl} | ${shortDescription}${pin.pinDescription.length > 155 ? '...' : ''} | ${pin.overlayText} |`;
    })
    .join('\n');

  return `# 30-Tage-Pinterest-Plan

Ein Pin pro Tag. Vor Veröffentlichung Bild, Text, Link und Board im Pinterest-Business-Konto manuell prüfen.

| Tag | Board | Titel | Ziel-URL | Kurzbeschreibung | Bild-/Overlay-Idee |
| --- | --- | --- | --- | --- | --- |
${rows}

## Prüfliste vor Veröffentlichung

- Ziel-URL zeigt auf BabyReiseHelfer und nicht direkt auf Amazon.
- Kein Amazon-Bild, kein Preis, keine Sternebewertung, keine Rezension.
- Overlay-Text ist kurz, groß und mobil lesbar.
- Medizinische Themen bleiben vorsichtig formuliert und ersetzen keine fachliche Beratung.
- Der Pin passt zum Board und wiederholt nicht exakt denselben Titel wie der Vortag.
`;
}

async function main() {
  await fs.mkdir(pinterestDir, { recursive: true });
  const articleData = await readArticleFrontmatter();
  const pins = buildPins(articleData);

  const payload = {
    generatedAt: new Date().toISOString(),
    siteUrl,
    statusDefault: 'draft',
    notes: [
      'Diese Pins sind lokale Drafts.',
      'Keine automatische Veröffentlichung.',
      'Keine direkten Amazon-Affiliate-Links in Pinterest-Pins.'
    ],
    pins
  };

  await fs.writeFile(new URL('pins.json', pinterestDir), `${JSON.stringify(payload, null, 2)}\n`);
  await fs.writeFile(new URL('pins.md', pinterestDir), renderPinsMarkdown(pins));
  await fs.writeFile(new URL('boards.md', pinterestDir), renderBoardsMarkdown());
  await fs.writeFile(new URL('30-day-plan.md', pinterestDir), renderThirtyDayPlan(pins));

  console.log(`Pinterest-Drafts erzeugt: ${pins.length}`);
  console.log(`Aus Artikeln gelesen: ${articleData.size}`);
  console.log(`Zielordner: ${pinterestDir.pathname}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
