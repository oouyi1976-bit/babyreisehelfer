export type SiteCategory = {
  slug: string;
  title: string;
  navLabel: string;
  description: string;
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
    intro:
      'Vom Boarding bis zur Landung zählt vor allem, dass wichtige Dinge schnell griffbereit sind. Diese Rubrik sammelt Produktideen und Ratgeber für entspanntere Flugreisen mit Baby.',
    productCategories: ['fliegen-mit-baby', 'wickeln-unterwegs', 'baby-reiseapotheke'],
    featuredProductIds: ['baby-gehoerschutz', 'faltbare-wickelunterlage', 'wickelrucksack']
  },
  {
    slug: 'kinderwagen-zubehoer',
    title: 'Kinderwagen-Zubehör',
    navLabel: 'Kinderwagen',
    description:
      'Sonnenschutz, Organizer, Ventilator, Mückenschutz und Wetterschutz für Buggy und Kinderwagen.',
    intro:
      'Gutes Kinderwagen-Zubehör ist leicht, sicher befestigt und löst ein echtes Reiseproblem. Hier findest du neutrale Empfehlungen, worauf du vor dem Kauf achten solltest.',
    productCategories: ['kinderwagen-zubehoer', 'strand-sonne'],
    featuredProductIds: ['kinderwagen-sonnenschutz', 'kinderwagen-ventilator', 'moskitonetz-kinderwagen']
  },
  {
    slug: 'hotel-mit-baby',
    title: 'Hotel mit Baby',
    navLabel: 'Hotel',
    description:
      'Praktische Helfer für ruhige Nächte, Fläschchen, Schlafplatz und kleine Routinen im Hotelzimmer.',
    intro:
      'Im Hotel sind kleine, verlässliche Helfer oft wichtiger als viel Gepäck. Diese Kategorie zeigt, was im Zimmer wirklich Komfort bringt.',
    productCategories: ['hotel-mit-baby'],
    featuredProductIds: ['nachtlicht-hotel', 'usb-flaschenwaermer', 'reisebett']
  },
  {
    slug: 'strand-sonne',
    title: 'Strand & Sonne',
    navLabel: 'Strand',
    description:
      'Schatten, UV-Schutz, Trinkflaschen und Hitzeschutz für Strandtage mit Baby.',
    intro:
      'Sonne, Wind und Sand machen Urlaubstage wunderschön, aber auch anstrengend. Hier geht es um Schutz, Schatten und einfache Helfer für warme Reiseziele.',
    productCategories: ['strand-sonne', 'kinderwagen-zubehoer'],
    featuredProductIds: ['baby-strandmuschel', 'baby-uv-hut', 'thermosflasche']
  },
  {
    slug: 'packlisten',
    title: 'Packlisten',
    navLabel: 'Packlisten',
    description:
      'Übersichtliche Packlisten für Flug, Hotel, Strand, Kinderwagen und Reiseapotheke.',
    intro:
      'Eine gute Packliste verhindert zu viel Gepäck und vergessene Kleinigkeiten. Hier findest du strukturierte Listen für verschiedene Reisesituationen mit Baby.',
    productCategories: ['packlisten', 'baby-reiseapotheke', 'wickeln-unterwegs'],
    featuredProductIds: ['kleine-reiseapotheke-box', 'faltbare-wickelunterlage', 'thermosflasche']
  }
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
