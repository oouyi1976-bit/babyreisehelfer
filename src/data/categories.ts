export type SiteCategory = {
  slug: string;
  title: string;
  navLabel: string;
  description: string;
  homeDescription: string;
  highlights: string[];
  image: string;
  intro: string;
  productCategories: string[];
  featuredProductIds: string[];
};

export const categories: SiteCategory[] = [
  {
    slug: 'fliegen-mit-baby',
    title: 'Fliegen mit Baby',
    navLabel: 'Fliegen',
    description:
      'Ruhige Flugtage mit Baby: hilfreiche Produkte, Packtipps und kleine Routinen für Flughafen und Kabine.',
    homeDescription: 'Alles für entspannte Flugtage mit Baby - von Vorbereitung bis Kabine.',
    highlights: ['Flugzeug', 'Flughafen', 'Handgepäck'],
    image: '/category-images/fliegen-mit-baby.webp',
    intro:
      'Vom Boarding bis zur Landung zählt vor allem, dass wichtige Dinge schnell griffbereit sind. Diese Rubrik sammelt Produktideen und Ratgeber für entspanntere Flugreisen mit Baby.',
    productCategories: ['fliegen-mit-baby', 'wickeln-unterwegs', 'baby-reiseapotheke'],
    featuredProductIds: [
      'baby-gehoerschutz',
      'faltbare-wickelunterlage',
      'wickelrucksack',
      'kleine-reiseapotheke-box',
      'kompaktes-reise-nachtlicht'
    ]
  },
  {
    slug: 'kinderwagen-zubehoer',
    title: 'Kinderwagen-Zubehör',
    navLabel: 'Kinderwagen',
    description:
      'Sonnenschutz, Organizer, Ventilator, Mückenschutz und Wetterschutz für Buggy und Kinderwagen.',
    homeDescription: 'Praktische Helfer für Sonne, Wind, Mücken und Spaziergänge.',
    highlights: ['Sonnenschutz', 'Organizer', 'Wetterschutz'],
    image: '/category-images/kinderwagen-zubehoer.webp',
    intro:
      'Gutes Kinderwagen-Zubehör ist leicht, sicher befestigt und löst ein echtes Reiseproblem. Hier findest du neutrale Empfehlungen, worauf du vor dem Kauf achten solltest.',
    productCategories: ['kinderwagen-zubehoer', 'strand-sonne'],
    featuredProductIds: [
      'kinderwagen-sonnenschutz',
      'kinderwagen-ventilator',
      'moskitonetz-kinderwagen',
      'kinderwagen-organizer',
      'regen-windschutz-buggy'
    ]
  },
  {
    slug: 'hotel-mit-baby',
    title: 'Hotel mit Baby',
    navLabel: 'Hotel',
    description:
      'Praktische Helfer für ruhige Nächte, Fläschchen, Schlafplatz und kleine Routinen im Hotelzimmer.',
    homeDescription: 'Kleine Helfer für ruhige Nächte, Fläschchen und Schlafplatz.',
    highlights: ['Reisebett', 'Nachtlicht', 'Flaschenwärmer'],
    image: '/category-images/hotel-mit-baby.webp',
    intro:
      'Im Hotel sind kleine, verlässliche Helfer oft wichtiger als viel Gepäck. Diese Kategorie zeigt, was im Zimmer wirklich Komfort bringt.',
    productCategories: ['hotel-mit-baby'],
    featuredProductIds: [
      'reisebett',
      'usb-flaschenwaermer',
      'reise-wickelorganizer',
      'nachtlicht-hotel',
      'faltbare-babybadewanne'
    ]
  },
  {
    slug: 'strand-sonne',
    title: 'Strand & Sonne',
    navLabel: 'Strand',
    description:
      'Schatten, UV-Schutz, Trinkflaschen und Hitzeschutz für Strandtage mit Baby.',
    homeDescription: 'Schatten, UV-Schutz und clevere Basics für warme Tage.',
    highlights: ['UV-Schutz', 'Strandmuschel', 'Trinkflasche'],
    image: '/category-images/strand-sonne.webp',
    intro:
      'Sonne, Wind und Sand machen Urlaubstage wunderschön, aber auch anstrengend. Hier geht es um Schutz, Schatten und einfache Helfer für warme Reiseziele.',
    productCategories: ['strand-sonne', 'kinderwagen-zubehoer'],
    featuredProductIds: [
      'baby-uv-hut',
      'baby-strandmuschel',
      'uv-schutz-zelt-baby',
      'baby-sonnenbrille',
      'wetbag-nasse-kleidung'
    ]
  },
  {
    slug: 'packlisten',
    title: 'Packlisten',
    navLabel: 'Packlisten',
    description:
      'Übersichtliche Packlisten für Flug, Hotel, Strand, Kinderwagen und Reiseapotheke.',
    homeDescription: 'Übersichtliche Listen für Flug, Hotel, Strand und Kinderwagen.',
    highlights: ['Abhaken', 'Koffer', 'Reiseapotheke'],
    image: '/category-images/packlisten.webp',
    intro:
      'Eine gute Packliste verhindert zu viel Gepäck und vergessene Kleinigkeiten. Hier findest du strukturierte Listen für verschiedene Reisesituationen mit Baby.',
    productCategories: ['packlisten', 'baby-reiseapotheke', 'wickeln-unterwegs'],
    featuredProductIds: [
      'packing-cubes-baby-kleidung',
      'thermosflasche',
      'reisedokumententasche-familie',
      'feuchttuecher-spender-unterwegs',
      'kulturtasche-babyartikel'
    ]
  },
  {
    slug: 'babyschlaf',
    title: 'Babyschlaf',
    navLabel: 'Babyschlaf',
    description:
      'Bindungsorientierte Babyschlaf-Ratgeber, ruhige Routinen und digitale Orientierung für entspanntere Nächte und Reisetage.',
    homeDescription: 'Sanfte Schlafroutinen, Tagesschlaf und Orientierung ohne Druck.',
    highlights: ['Routinen', 'Nächte', 'Tagesschlaf'],
    image: '/article-images/fallback-babyreise.webp',
    intro:
      'Babyschlaf ist selten planbar, aber Eltern können sich gut vorbereiten. Diese Rubrik sammelt sanfte Ratgeber, realistische Erwartungen und digitale Produkte für Familien, die Unterstützung wünschen.',
    productCategories: ['babyschlaf'],
    featuredProductIds: [
      'bindungsorientiert-durchschlafen-lernen',
      'babys-tage-meistern',
      'schlummergeheimnisse-neugeborene'
    ]
  }
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
