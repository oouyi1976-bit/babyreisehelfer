export type DigistoreLink = {
  id: string;
  title: string;
  url: string;
  description: string;
  bestFor: string;
  placement: 'prominent' | 'secondary';
  relevanceNote: string;
};

export const digistoreLinks: DigistoreLink[] = [
  {
    id: 'madeira-bus-pdf',
    title: 'Madeira mit Bus PDF-Reiseführer',
    url: 'https://www.madeira-bus.com/pdf#aff=Benman8810',
    description:
      'Digitaler Madeira-Busführer für Reisende, die Inselorte, Küstenwege und Ausflüge ohne Mietwagen planen möchten.',
    bestFor: 'Madeira-Reisen, Familien ohne Mietwagen und ruhige Tagesplanung mit Busverbindungen',
    placement: 'prominent',
    relevanceNote:
      'Passt inhaltlich direkt zur Seite Madeira mit Bus und zu Urlaub ohne Mietwagen.'
  },
  {
    id: 'mallorca-mehr-als-urlaub',
    title: 'Mallorca: mehr als Urlaub',
    url: 'https://www.digistore24.com/redir/702242/Benman8810/',
    description:
      'Allgemeiner Mallorca-Ratgeber. Inhaltlich reisebezogen, aber nicht speziell auf Babyreise oder Familienurlaub ausgerichtet.',
    bestFor: 'Reisende, die zusätzlich nach Mallorca-Ideen suchen',
    placement: 'secondary',
    relevanceNote:
      'Der Redirect führt zu einem Mallorca-Ratgeber. Deshalb nur unter Weitere Reise-Empfehlungen eingebunden.'
  },
  {
    id: 'urlaub-zum-nulltarif',
    title: 'Urlaub zum Nulltarif',
    url: 'https://www.digistore24.com/redir/40363/Benman8810/',
    description:
      'Sparratgeber rund um günstige oder kostenlose Reisemöglichkeiten. Reisebezug vorhanden, aber kein spezieller Familien- oder Babyfokus.',
    bestFor: 'Preisbewusste Reisende, die ergänzende Sparideen prüfen möchten',
    placement: 'secondary',
    relevanceNote:
      'Der Redirect führt zu einem allgemeinen Sparratgeber. Deshalb nicht prominent auf Familienreise-Seiten platziert.'
  }
];

export function getDigistoreLinksByIds(ids: string[]) {
  return ids
    .map((id) => digistoreLinks.find((link) => link.id === id))
    .filter((link): link is DigistoreLink => Boolean(link));
}

export function getProminentDigistoreLinks() {
  return digistoreLinks.filter((link) => link.placement === 'prominent');
}

export function getSecondaryDigistoreLinks() {
  return digistoreLinks.filter((link) => link.placement === 'secondary');
}
