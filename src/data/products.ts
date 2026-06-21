export type Product = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  idealFor: string;
  benefits: string[];
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  buttonText: string;
};

export const products: Product[] = [
  {
    id: 'kinderwagen-sonnenschutz',
    title: 'Kinderwagen-Sonnenschutz',
    category: 'kinderwagen-zubehoer',
    shortDescription:
      'Flexibler Sonnenschutz für Buggy oder Kinderwagen, der Schatten spendet ohne die Luftzirkulation komplett zu blockieren.',
    idealFor: 'Stadtbummel, Flughafenwege und Spaziergänge in warmen Reisezielen',
    benefits: ['Schnell montiert', 'Leicht zu verstauen', 'Besser als ein loses Tuch am Verdeck'],
    pros: ['Schafft mobilen Schatten', 'Passt oft an verschiedene Wagenmodelle', 'Klein im Gepäck'],
    cons: ['Sitz und Befestigung vor der Reise testen', 'Ersetzt keinen UV-Schutz durch Kleidung'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Sonnenschutz ansehen'
  },
  {
    id: 'baby-uv-hut',
    title: 'Baby-UV-Hut',
    category: 'strand-sonne',
    shortDescription:
      'Leichter Hut mit Nacken- oder breiter Krempe für zusätzlichen Schutz bei Sonne und hellem Strandlicht.',
    idealFor: 'Strandtage, Pool, Ausflüge und kurze Wege in der Mittagssonne',
    benefits: ['Schützt Kopf und Nacken', 'Wiegt wenig', 'Schnell trocknende Materialien möglich'],
    pros: ['Sehr einfach mitzunehmen', 'Hilft auch im Kinderwagen', 'Keine Technik, keine Akkus'],
    cons: ['Größe muss gut sitzen', 'Babys ziehen Hüte manchmal aus'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'UV-Hut ansehen'
  },
  {
    id: 'kinderwagen-ventilator',
    title: 'Kinderwagen-Ventilator mit Akku',
    category: 'kinderwagen-zubehoer',
    shortDescription:
      'Kompakter Akku-Ventilator mit flexibler Befestigung für warme Tage, Wartezeiten und stickige Wege.',
    idealFor: 'Sommerurlaub, Wartezeiten am Gate und Spaziergange ohne Wind',
    benefits: ['Mobiler Luftstrom', 'Wiederaufladbar per USB', 'Flexibel positionierbar'],
    pros: ['Angenehm bei Hitze', 'Auch im Hotelzimmer nutzbar', 'Leicht nachzuladen'],
    cons: ['Fingerabstand und Schutzgitter genau prufen', 'Akkulaufzeit variiert je nach Stufe'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Ventilator ansehen'
  },
  {
    id: 'moskitonetz-kinderwagen',
    title: 'Moskitonetz für Kinderwagen',
    category: 'kinderwagen-zubehoer',
    shortDescription:
      'Feines Netz für Buggy, Kinderwagen oder Reisebett, das abends und in mückenreichen Regionen helfen kann.',
    idealFor: 'Abendessen draussen, Seen, Camping, tropischere Urlaubsorte',
    benefits: ['Sehr leicht', 'Ohne Wirkstoffe', 'Schnell ubergezogen'],
    pros: ['Kleines Packmass', 'Kann auch beim Mittagsschlaf helfen', 'Meist universell nutzbar'],
    cons: ['Muss dicht abschließen', 'Nicht jedes Netz passt auf jeden Wagen gleich gut'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Moskitonetz ansehen'
  },
  {
    id: 'faltbare-wickelunterlage',
    title: 'Faltbare Wickelunterlage',
    category: 'wickeln-unterwegs',
    shortDescription:
      'Abwischbare, faltbare Unterlage für Flughafen, Raststätten, Strandtasche und kurze Ausflüge.',
    idealFor: 'Wickeln im Flugzeug, unterwegs im Restaurant oder auf Tagesausflugen',
    benefits: ['Hygienischer Untergrund', 'Passt in viele Taschen', 'Schnell abwischbar'],
    pros: ['Sehr alltagstauglich', 'Oft mit Fächern für Windeln', 'Nimmt wenig Platz weg'],
    cons: ['Polsterung kann dunner sein', 'Regelmassig reinigen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Wickelunterlage ansehen'
  },
  {
    id: 'wickelrucksack',
    title: 'Wickelrucksack',
    category: 'wickeln-unterwegs',
    shortDescription:
      'Rucksack mit Fächern für Windeln, Wechselkleidung, Flaschen, Snacks und Reisedokumente.',
    idealFor: 'Flugreisen, Mietwagen, Tagesausfluge und Familien, die die Hande frei haben wollen',
    benefits: ['Viele Facher', 'Bequem zu tragen', 'Besser organisiert als ein Shopper'],
    pros: ['Gute Übersicht unterwegs', 'Kann Handgepäck ersetzen', 'Unisex-Designs verfügbar'],
    cons: ['Zu große Modelle verleiten zum Überpacken', 'Reißverschlüsse und Tragekomfort prüfen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Wickelrucksack ansehen'
  },
  {
    id: 'baby-gehoerschutz',
    title: 'Baby-Gehörschutz',
    category: 'fliegen-mit-baby',
    shortDescription:
      'Weicher Gehörschutz für laute Umgebungen wie Flughafen, Events oder ungewöhnlich laute Reiseorte.',
    idealFor: 'Flughafen, Transferbus, laute Hotelshows oder Stadtfeste',
    benefits: ['Kann Reizuberflutung reduzieren', 'Weich gepolstert', 'Verstellbar je nach Modell'],
    pros: ['Hilft in sehr lauten Situationen', 'Klein im Handgepack', 'Auch ausserhalb des Urlaubs nutzbar'],
    cons: ['Nicht jedes Baby akzeptiert ihn', 'Passform und Altersangabe genau beachten'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Gehörschutz ansehen'
  },
  {
    id: 'nachtlicht-hotel',
    title: 'Nachtlicht für Hotelzimmer',
    category: 'hotel-mit-baby',
    shortDescription:
      'Kleines, dimmbares Licht für nächtliches Stillen, Fläschchen, Wickeln und fremde Hotelzimmer.',
    idealFor: 'Hotelzimmer, Ferienwohnung und dunkle Flure',
    benefits: ['Sanftes Licht', 'Hilft bei nachtlicher Orientierung', 'Oft per USB ladbar'],
    pros: ['Sehr beruhigend in fremder Umgebung', 'Kein grelles Deckenlicht nötig', 'Klein und leicht'],
    cons: ['Akku vor dem Schlafengehen laden', 'Sehr helle Modelle meiden'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Nachtlicht ansehen'
  },
  {
    id: 'usb-flaschenwaermer',
    title: 'USB-Flaschenwärmer',
    category: 'hotel-mit-baby',
    shortDescription:
      'Kompakter Wärmer für Fläschchen oder Gläser, der unterwegs oder im Hotelzimmer helfen kann.',
    idealFor: 'Hotelzimmer ohne Kochnische, Transfer und lange Reisetage',
    benefits: ['Kompakter als klassische Geräte', 'USB-Anschluss', 'Praktisch für unterwegs'],
    pros: ['Flexibler Einsatz', 'Kann Wartezeiten entspannen', 'Leicht zu verstauen'],
    cons: ['Erwärmt oft langsamer als ein Wasserbad', 'Leistung hängt von Stromquelle und Flasche ab'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Flaschenwärmer ansehen'
  },
  {
    id: 'reisebett',
    title: 'Reisebett',
    category: 'hotel-mit-baby',
    shortDescription:
      'Faltbares Babybett für Ferienwohnungen, Hotels ohne passendes Bett oder Familienbesuche.',
    idealFor: 'Längere Aufenthalte, Ferienhaus, Großelternbesuch und unsichere Hotelbetten',
    benefits: ['Eigener Schlafplatz', 'Planbarer als Hotel-Ausstattung', 'Kann vertraut riechen'],
    pros: ['Mehr Unabhangigkeit', 'Auch tagsuber als Ruheplatz nutzbar', 'Viele leichte Modelle verfugbar'],
    cons: ['Zusätzliches Gepäck', 'Matratze und Sicherheitshinweise sorgfältig prüfen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Reisebett ansehen'
  },
  {
    id: 'baby-strandmuschel',
    title: 'Baby-Strandmuschel',
    category: 'strand-sonne',
    shortDescription:
      'Leichter Schattenspender für Strand und Wiese, ideal als Ruhezone für kurze Pausen.',
    idealFor: 'Strandurlaub, Badesee, Picknick und Poolbereich',
    benefits: ['Schattiger Rückzugsort', 'Schnell aufgebaut', 'Schützt vor Wind und Sand'],
    pros: ['Deutlich angenehmer als nur ein Handtuch', 'Gut für Pausen', 'Viele Modelle mit UV-Schutzstoff'],
    cons: ['Windstabilitat beachten', 'Nicht als Schlafplatz ohne Aufsicht nutzen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Strandmuschel ansehen'
  },
  {
    id: 'thermosflasche',
    title: 'Thermosflasche',
    category: 'packlisten',
    shortDescription:
      'Isolierflasche für warmes Wasser, Tee oder abgekochtes Wasser bei Ausflügen und im Hotel.',
    idealFor: 'Fläschchenzubereitung, lange Wege, Flugreisen und Ausflüge',
    benefits: ['Hält Wasser warm oder kühl', 'Keine Steckdose nötig', 'Robust für unterwegs'],
    pros: ['Sehr vielseitig', 'Hilft bei unplanbaren Wartezeiten', 'Auch nach der Babyzeit nutzbar'],
    cons: ['Auslaufsicherheit vor Reisebeginn testen', 'Nicht zu groß wählen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Thermosflasche ansehen'
  },
  {
    id: 'kinderwagen-organizer',
    title: 'Kinderwagen-Organizer',
    category: 'kinderwagen-zubehoer',
    shortDescription:
      'Kleine Tasche am Schieber für Schnuller, Tücher, Trinkflasche, Handy und Tickets.',
    idealFor: 'Flughafen, Promenade, Zoo, Stadtbummel und Tagesausfluge',
    benefits: ['Wichtige Kleinigkeiten griffbereit', 'Mehr Ordnung am Wagen', 'Schnell abnehmbar'],
    pros: ['Sehr praktisch im Alltag', 'Vermeidet Suchen in großen Taschen', 'Oft mit Becherfach'],
    cons: ['Nicht zu schwer beladen', 'Kann je nach Wagen den Schwerpunkt beeinflussen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Organizer ansehen'
  },
  {
    id: 'regen-windschutz-buggy',
    title: 'Regen- und Windschutz für Buggy',
    category: 'kinderwagen-zubehoer',
    shortDescription:
      'Transparenter Schutz gegen Wind, kurzen Regen und kühle Abendluft im Urlaub.',
    idealFor: 'Wechselhaftes Wetter, Kustenorte, Städtetrips und Abendspaziergange',
    benefits: ['Schützt vor Wind', 'Hilft bei kurzem Regen', 'Klein zusammenfaltbar'],
    pros: ['Gibt Sicherheit bei Wetterwechsel', 'Oft sehr leicht', 'Nutzlich auch daheim'],
    cons: ['Beluftung muss ausreichend sein', 'Passform vor Abreise testen'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Wetterschutz ansehen'
  },
  {
    id: 'kleine-reiseapotheke-box',
    title: 'Kleine Reiseapotheke-Box',
    category: 'baby-reiseapotheke',
    shortDescription:
      'Kompakte Box, um Fieberthermometer, Pflaster, Nasentropfen und wichtige Basics sauber zu bundeln.',
    idealFor: 'Packlisten, Flugreisen, Ferienwohnung und Ausflüge',
    benefits: ['Alles an einem Ort', 'Schnell im Handgepäck gefunden', 'Schützt kleine Tuben und Fläschchen'],
    pros: ['Macht Kontrolle vor Abreise einfacher', 'Kann dauerhaft gepackt bleiben', 'Gut beschriftbar'],
    cons: ['Inhalt muss altersgerecht mit Kinderarzt oder Apotheke abgestimmt werden', 'Keine Medikamente lose einpacken'],
    affiliateUrl: 'AMAZON_AFFILIATE_LINK_HIER',
    buttonText: 'Reiseapotheke-Box ansehen'
  }
];

export function getProductsByIds(ids: string[]) {
  return ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}
