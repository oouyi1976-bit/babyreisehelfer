export type AffiliateStatus = 'placeholder' | 'ready';
export type AffiliateNetwork = 'amazon' | 'babyschlummerland';

export type Product = {
  id: string;
  title: string;
  category: string;
  affiliateNetwork?: AffiliateNetwork;
  amazonSearchTerm: string;
  amazonProductUrl: string;
  affiliateUrl: string;
  affiliateStatus: AffiliateStatus;
  shortDescription: string;
  idealFor: string;
  whyItFits: string;
  whatToLookFor: string[];
  benefits: string[];
  pros: string[];
  cons: string[];
  buttonText: string;
  imageType: string;
  image?: string;
  icon: string;
  legalNote: string;
};

export const amazonTrackingId = 'epic05e-21';
export const babyschlummerlandTrackingId = 'Benman8810';

export function hasAmazonTrackingId(url: string) {
  return url.includes(`tag=${amazonTrackingId}`);
}

export function isAffiliateLinkReady(product: Product) {
  if (product.affiliateStatus !== 'ready') return false;

  const network = product.affiliateNetwork ?? 'amazon';

  if (network === 'amazon') {
    return product.affiliateUrl.startsWith('https://www.amazon.de/') && hasAmazonTrackingId(product.affiliateUrl);
  }

  if (network === 'babyschlummerland') {
    return (
      product.affiliateUrl.startsWith('https://www.babyschlummerland.de/') &&
      product.affiliateUrl.includes(`#aff=${babyschlummerlandTrackingId}`)
    );
  }

  return false;
}

export const babysleepProductIds = [
  'bindungsorientiert-durchschlafen-lernen',
  'babys-tage-meistern',
  'schlummergeheimnisse-neugeborene'
];

export const products: Product[] = [
  {
    id: 'baby-gehoerschutz',
    title: 'Alpine Muffy Baby Classic Gehörschutz',
    category: 'fliegen-mit-baby',
    amazonSearchTerm: 'Alpine Muffy Baby Classic Gehörschutz Flugzeug',
    amazonProductUrl: 'https://www.amazon.de/dp/B071H56GPH',
    affiliateUrl: 'https://www.amazon.de/dp/B071H56GPH?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Weicher Baby-Gehörschutz für laute Reiseumgebungen wie Flughafen, Transferbus oder belebte Hotelbereiche.',
    idealFor: 'Flughafen, Flugzeugumfeld, laute Wartebereiche und Veranstaltungen im Urlaub',
    whyItFits:
      'Passt gut zur Flug- und Reise-Nische, weil Lärm für Babys unterwegs schnell anstrengend werden kann.',
    whatToLookFor: ['Altersangabe und Kopfumfang prüfen', 'Sitz vor der Reise testen', 'Nur nutzen, wenn das Baby ihn akzeptiert'],
    benefits: ['Kann Reize reduzieren', 'Klein im Handgepäck', 'Ohne Akku oder App nutzbar'],
    pros: ['Leicht mitzunehmen', 'Flexibles Kopfband', 'Auch außerhalb von Flugreisen nutzbar'],
    cons: ['Nicht jedes Baby toleriert Kopfhörer', 'Kein Ersatz für ruhige Pausen', 'Passform sorgfältig prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'baby-earmuffs',
    image: '/product-images/baby-gehoerschutz.webp',
    icon: 'ear',
    legalNote: 'Herstellerangaben zu Alter, Passform und Anwendung beachten.'
  },
  {
    id: 'faltbare-wickelunterlage',
    title: 'Lekebaby tragbare Wickelunterlage',
    category: 'wickeln-unterwegs',
    amazonSearchTerm: 'Lekebaby tragbare Wickelunterlage Reise Baby',
    amazonProductUrl: 'https://www.amazon.de/dp/B0D9NQD9LX',
    affiliateUrl: 'https://www.amazon.de/dp/B0D9NQD9LX?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kompakte Wickelstation für unterwegs, wenn im Flugzeug, Restaurant oder am Strand nur wenig Platz ist.',
    idealFor: 'Flugzeugtoilette, Raststätte, Strandtasche und kurze Ausflüge',
    whyItFits:
      'Eine eigene Unterlage löst ein sehr konkretes Reiseproblem: hygienisch und schnell wickeln, ohne die große Tasche auszupacken.',
    whatToLookFor: ['Abwischbares Material', 'Kompaktes Faltmaß', 'Platz für wenige Windeln und Tücher'],
    benefits: ['Schnell griffbereit', 'Schafft einen eigenen Untergrund', 'Passt in viele Wickelrucksäcke'],
    pros: ['Sehr alltagstauglich', 'Gut für Flugreisen', 'Hilft bei wenig Platz'],
    cons: ['Polsterung kann dünn sein', 'Muss regelmäßig gereinigt werden', 'Nicht zu groß für Flugzeugtoiletten wählen'],
    buttonText: 'Produkt ansehen',
    imageType: 'changing-mat',
    image: '/product-images/faltbare-wickelunterlage.webp',
    icon: 'mat',
    legalNote: 'Nur als Unterlage verwenden und Baby nie unbeaufsichtigt lassen.'
  },
  {
    id: 'wickelrucksack',
    title: 'LÄSSIG Green Label Wickelrucksack',
    category: 'wickeln-unterwegs',
    amazonSearchTerm: 'LÄSSIG Green Label Wickelrucksack Reise Flugzeug',
    amazonProductUrl: 'https://www.amazon.de/dp/B08T7VKR2R',
    affiliateUrl: 'https://www.amazon.de/dp/B08T7VKR2R?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Organisierter Wickelrucksack für Handgepäck, Tagesausflüge und Eltern, die beide Hände frei haben wollen.',
    idealFor: 'Flugreisen, Mietwagen, Städtetrips und lange Reisetage',
    whyItFits:
      'Ein Rucksack bündelt Wickelsachen, Wechselkleidung, Fläschchen und Dokumente besser als eine offene Tasche.',
    whatToLookFor: ['Angenehme Träger', 'Klare Innenfächer', 'Nicht zu groß für euer Handgepäck planen'],
    benefits: ['Hände bleiben frei', 'Viele Dinge bleiben sortiert', 'Kann Handgepäck ergänzen'],
    pros: ['Gute Übersicht unterwegs', 'Praktisch mit Kinderwagen', 'Auch nach der Babyzeit nutzbar'],
    cons: ['Zu viel Stauraum verleitet zum Überpacken', 'Tragekomfort vorher testen', 'Nicht jede Tasche passt unter jeden Flugzeugsitz'],
    buttonText: 'Produkt ansehen',
    imageType: 'packing-cubes',
    image: '/product-images/wickelrucksack.webp',
    icon: 'bag',
    legalNote: 'Airline-Vorgaben für Handgepäckmaße separat prüfen.'
  },
  {
    id: 'kleine-reiseapotheke-box',
    title: 'Tatonka First Aid Mini Reiseapotheke-Set',
    category: 'baby-reiseapotheke',
    amazonSearchTerm: 'Tatonka First Aid Mini Reiseapotheke Baby Urlaub',
    amazonProductUrl: 'https://www.amazon.de/dp/B0B698Z6N6',
    affiliateUrl: 'https://www.amazon.de/dp/B0B698Z6N6?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleine Erste-Hilfe-Tasche als robuste Basis, um wichtige Reiseapotheken-Basics geordnet zu transportieren.',
    idealFor: 'Packlisten, Ausflüge, Ferienwohnung, Strandtasche und Handgepäck',
    whyItFits:
      'Für Reisen mit Baby ist Ordnung wichtiger als viele Produkte. Eine feste Tasche hilft beim Prüfen und schnellen Finden.',
    whatToLookFor: ['Inhalt altersgerecht ergänzen', 'Medikamente separat fachlich abstimmen', 'Regelmäßig Ablaufdaten prüfen'],
    benefits: ['Alles an einem Ort', 'Schnell kontrollierbar', 'Kompakt im Gepäck'],
    pros: ['Robuste Organisationslösung', 'Gutes Format für Ausflüge', 'Kann dauerhaft gepackt bleiben'],
    cons: ['Kein Ersatz für medizinische Beratung', 'Baby-Medikamente müssen individuell ergänzt werden', 'Inhalt vor jeder Reise prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'first-aid-box',
    image: '/product-images/kleine-reiseapotheke-box.webp',
    icon: 'cross',
    legalNote: 'Medikamente, Dosierungen und Notfallfragen immer mit Kinderarzt oder Apotheke klären.'
  },
  {
    id: 'kompaktes-reise-nachtlicht',
    title: 'reer LED-Nachtlicht für die Steckdose',
    category: 'fliegen-mit-baby',
    amazonSearchTerm: 'reer LED Nachtlicht Steckdose Baby Hotel Reise',
    amazonProductUrl: 'https://www.amazon.de/dp/B00447I3L8',
    affiliateUrl: 'https://www.amazon.de/dp/B00447I3L8?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleines Steckdosen-Nachtlicht für Hotelzimmer und Ferienwohnungen, wenn nachts nur wenig Orientierung nötig ist.',
    idealFor: 'Hotelzimmer, Ferienwohnung, Flurlicht und nächtliche Wickelroutine nach Reisetagen',
    whyItFits:
      'Ein sehr kleines Licht passt gut in die Packliste und kann fremde Räume nachts leichter nutzbar machen.',
    whatToLookFor: ['Passende Steckdose am Bett oder Wickelplatz', 'Lichtstärke vor der Reise testen', 'Adapter bei Auslandsreisen prüfen'],
    benefits: ['Sehr klein im Gepäck', 'Keine App nötig', 'Hilft bei nächtlicher Orientierung'],
    pros: ['Gut für feste Steckdosenplätze', 'Nimmt kaum Platz weg', 'Praktisch für Hotelnächte'],
    cons: ['Nur mit passender Steckdose nutzbar', 'Nicht flexibel wie ein Akku-Licht', 'Bei Auslandsreisen Adapter prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'night-light',
    image: '/product-images/kompaktes-reise-nachtlicht.webp',
    icon: 'night',
    legalNote: 'Elektrische Geräte nur nach Herstellerhinweisen und außerhalb der Reichweite des Babys nutzen.'
  },
  {
    id: 'nachtlicht-hotel',
    title: 'G Keni wiederaufladbares Baby-Nachtlicht',
    category: 'hotel-mit-baby',
    amazonSearchTerm: 'G Keni Baby Nachtlicht USB wiederaufladbar Reise Hotel',
    amazonProductUrl: 'https://www.amazon.de/dp/B0CF4HBM8P',
    affiliateUrl: 'https://www.amazon.de/dp/B0CF4HBM8P?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Tragbares Nachtlicht für nächtliches Stillen, Wickeln und Orientierung in fremden Zimmern.',
    idealFor: 'Hotelzimmer, Ferienwohnung, nächtliche Fläschchen und dunkle Flure',
    whyItFits:
      'Ein kleines warmes Licht verhindert grelles Deckenlicht und macht nächtliche Routinen unterwegs ruhiger.',
    whatToLookFor: ['Warmweißes, dimmbares Licht', 'Akkulaufzeit vor Reisebeginn testen', 'Keine Kleinteile im Babybereich'],
    benefits: ['Sanftes Licht', 'USB-ladbar', 'Hilft bei fremder Umgebung'],
    pros: ['Klein und leicht', 'Auch daheim nutzbar', 'Praktisch für nächtliches Wickeln'],
    cons: ['Akku muss geladen sein', 'Zu helles Licht kann stören', 'Nicht ins Babybett legen'],
    buttonText: 'Produkt ansehen',
    imageType: 'night-light',
    image: '/product-images/nachtlicht-hotel.webp',
    icon: 'light',
    legalNote: 'Elektrische Produkte nur nach Herstellerhinweisen und außerhalb der Reichweite des Babys nutzen.'
  },
  {
    id: 'kinderwagen-sonnenschutz',
    title: 'reer ShineSafe Premium Sonnensegel',
    category: 'kinderwagen-zubehoer',
    amazonSearchTerm: 'reer ShineSafe Premium Sonnensegel Kinderwagen Sonnenschutz',
    amazonProductUrl: 'https://www.amazon.de/dp/B088GHGG23',
    affiliateUrl: 'https://www.amazon.de/dp/B088GHGG23?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Universelles Sonnensegel für Kinderwagen oder Buggy, wenn das vorhandene Verdeck nicht genug Schatten spendet.',
    idealFor: 'Sommerurlaub, Promenade, Flughafenwege und Spaziergänge mit seitlicher Sonne',
    whyItFits:
      'Schatten am Kinderwagen ist auf Reisen oft wichtiger als zusätzliche Kleidung im Gepäck.',
    whatToLookFor: ['Kompatibilität mit eurem Wagen', 'Seitliche Luftzirkulation', 'Befestigung vor der Reise testen'],
    benefits: ['Flexibler Schatten', 'Leichtes Packmaß', 'Schnell montiert'],
    pros: ['Praktisch bei tief stehender Sonne', 'Passt zu vielen Wagen', 'Nimmt wenig Platz weg'],
    cons: ['Ersetzt keine Schattenpausen', 'Nicht dicht über dem Baby abschließen', 'Kann je nach Wagen anders sitzen'],
    buttonText: 'Produkt ansehen',
    imageType: 'stroller-sunshade',
    image: '/product-images/kinderwagen-sonnenschutz.webp',
    icon: 'sunshade',
    legalNote: 'Bei Hitze regelmäßig Temperatur und Luftzirkulation im Kinderwagen prüfen.'
  },
  {
    id: 'kinderwagen-ventilator',
    title: 'PaPaFboy Kinderwagen-Ventilator mit Akku',
    category: 'kinderwagen-zubehoer',
    amazonSearchTerm: 'PaPaFboy Kinderwagen Ventilator Akku Baby Reise',
    amazonProductUrl: 'https://www.amazon.de/dp/B0BXKL1DF2',
    affiliateUrl: 'https://www.amazon.de/dp/B0BXKL1DF2?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleiner Akku-Ventilator für stehende Luft am Kinderwagen, im Hotelzimmer oder in Warteschlangen.',
    idealFor: 'Warme Reisetage, Gate-Wartezeiten, windstille Wege und Hotelzimmer',
    whyItFits:
      'Ein Mini-Ventilator kann Komfort schaffen, wenn Schatten vorhanden ist, aber kaum Luftbewegung entsteht.',
    whatToLookFor: ['Enges Schutzgitter', 'Stabile Befestigung', 'Abstand zu kleinen Fingern'],
    benefits: ['Mobiler Luftstrom', 'Wiederaufladbar', 'Flexibel positionierbar'],
    pros: ['Kann bei Hitze angenehmer sein', 'Auch am Reisebettumfeld nutzbar', 'Leicht nachzuladen'],
    cons: ['Kein Ersatz für Schatten und Pausen', 'Akkulaufzeit variiert', 'Fingerabstand genau prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'stroller-fan',
    image: '/product-images/kinderwagen-ventilator.webp',
    icon: 'fan',
    legalNote: 'Ventilator sicher befestigen und niemals direkt in Reichweite kleiner Hände platzieren.'
  },
  {
    id: 'moskitonetz-kinderwagen',
    title: 'Zamboo Universal Mückennetz für Kinderwagen',
    category: 'kinderwagen-zubehoer',
    amazonSearchTerm: 'Zamboo Universal Insektenschutz Mückennetz Kinderwagen Buggy',
    amazonProductUrl: 'https://www.amazon.de/dp/B01HH1MZ6G',
    affiliateUrl: 'https://www.amazon.de/dp/B01HH1MZ6G?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Feinmaschiges Netz für Kinderwagen und Buggy, wenn abends oder am Wasser viele Insekten unterwegs sind.',
    idealFor: 'Abendessen draußen, See, Campingplatz, Hotelgarten und Spaziergänge in grünen Anlagen',
    whyItFits:
      'Ein Netz ist leicht, wirkstofffrei und im Gepäck deutlich kleiner als viele andere Schutzlösungen.',
    whatToLookFor: ['Dichter Abschluss', 'Netz darf nicht auf dem Gesicht liegen', 'Passform am eigenen Wagen prüfen'],
    benefits: ['Sehr leicht', 'Ohne Wirkstoff', 'Schnell übergezogen'],
    pros: ['Kleines Packmaß', 'Gut für Abendstunden', 'Meist universell nutzbar'],
    cons: ['Muss sauber abschließen', 'Nicht jedes Modell passt gleich gut', 'Baby weiter im Blick behalten'],
    buttonText: 'Produkt ansehen',
    imageType: 'mosquito-net',
    image: '/product-images/moskitonetz-kinderwagen.webp',
    icon: 'net',
    legalNote: 'Nur so nutzen, dass Atmung, Sicht und Luftzirkulation nicht eingeschränkt werden.'
  },
  {
    id: 'kinderwagen-organizer',
    title: 'Zamboo Kinderwagen-Organizer',
    category: 'kinderwagen-zubehoer',
    amazonSearchTerm: 'Zamboo Leichte Kinderwagentasche Organizer Buggy',
    amazonProductUrl: 'https://www.amazon.de/dp/B07F1SFW6D',
    affiliateUrl: 'https://www.amazon.de/dp/B07F1SFW6D?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleine Kinderwagentasche für Schnuller, Tücher, Trinkflasche, Tickets und andere Dinge, die schnell erreichbar sein sollen.',
    idealFor: 'Flughafen, Promenade, Zoo, Stadtbummel und kurze Ausflüge',
    whyItFits:
      'Auf Reisen sparen gut erreichbare Kleinteile viel Sucherei im Wickelrucksack.',
    whatToLookFor: ['Nicht zu schwer beladen', 'Stabilität des Wagens testen', 'Schnelle Abnahme bei Bedarf'],
    benefits: ['Kleinteile griffbereit', 'Mehr Ordnung am Schieber', 'Ideal für kurze Wege'],
    pros: ['Vermeidet Suchen', 'Kompakter als eine große Tasche', 'Für Tickets und Handy praktisch'],
    cons: ['Kann den Schwerpunkt beeinflussen', 'Nicht für schwere Lasten gedacht', 'Kompatibilität prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'stroller-organizer',
    image: '/product-images/kinderwagen-organizer.webp',
    icon: 'organizer',
    legalNote: 'Kinderwagen nicht durch zu viel Gewicht am Schieber instabil machen.'
  },
  {
    id: 'regen-windschutz-buggy',
    title: 'Zamboo Universal Regenschutz für Buggy',
    category: 'kinderwagen-zubehoer',
    amazonSearchTerm: 'Zamboo Universal Regenschutz Buggy Kinderwagen Frontöffnung',
    amazonProductUrl: 'https://www.amazon.de/dp/B0GZNZSY6G',
    affiliateUrl: 'https://www.amazon.de/dp/B0GZNZSY6G?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Transparenter Regenschutz für Buggy und Kinderwagen, wenn Wetterwechsel oder kühle Abendluft geplant sind.',
    idealFor: 'Städtetrips, Küstenorte, wechselhaftes Wetter und Abendspaziergänge',
    whyItFits:
      'Ein leichter Wetterschutz kann unterwegs hilfreicher sein als zusätzliche Decken oder improvisierte Abdeckungen.',
    whatToLookFor: ['Gute Belüftung', 'Passform am eigenen Buggy', 'Einstieg und Zugriff auf das Kind'],
    benefits: ['Schützt bei kurzem Regen', 'Hilft gegen Wind', 'Klein im Gepäck'],
    pros: ['Nützlich bei Wetterwechsel', 'Schnell montierbar', 'Auch zuhause einsetzbar'],
    cons: ['Nicht dauerhaft geschlossen lassen', 'Bei Wärme auf Luft achten', 'Universal passt nicht immer perfekt'],
    buttonText: 'Produkt ansehen',
    imageType: 'rain-cover',
    image: '/product-images/regen-windschutz-buggy.webp',
    icon: 'rain',
    legalNote: 'Regenschutz nur mit ausreichender Belüftung und regelmäßiger Kontrolle nutzen.'
  },
  {
    id: 'reisebett',
    title: 'hauck Dream N Play Plus Reisebett',
    category: 'hotel-mit-baby',
    amazonSearchTerm: 'hauck Dream N Play Plus Reisebett Baby Hotel',
    amazonProductUrl: 'https://www.amazon.de/dp/B004AHLMF6',
    affiliateUrl: 'https://www.amazon.de/dp/B004AHLMF6?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Faltbares Reisebett für Ferienwohnung, Familienbesuch oder Hotels, bei denen die Bettausstattung unklar ist.',
    idealFor: 'Hotelzimmer, Ferienhaus, Großelternbesuch und längere Aufenthalte',
    whyItFits:
      'Ein eigenes Bett kann Routinen stabiler machen, wenn Unterkunft und Schlafplatz nicht planbar sind.',
    whatToLookFor: ['Aufbau vor Reise testen', 'Gewicht und Packmaß beachten', 'Matratze und Herstellerhinweise prüfen'],
    benefits: ['Eigener Schlafplatz', 'Planbarer als Hotel-Ausstattung', 'Zusammenklappbar'],
    pros: ['Mehr Unabhängigkeit', 'Auch als Ruheplatz nutzbar', 'Geeignet für längere Reisen'],
    cons: ['Zusätzliches Gepäck', 'Nicht jedes Hotelzimmer hat genug Platz', 'Sicherheitsangaben genau beachten'],
    buttonText: 'Produkt ansehen',
    imageType: 'travel-crib',
    image: '/product-images/reisebett.webp',
    icon: 'bed',
    legalNote: 'Nur nach Montage- und Altershinweisen des Herstellers verwenden.'
  },
  {
    id: 'usb-flaschenwaermer',
    title: 'Momcozy MW05 tragbarer Flaschenwärmer',
    category: 'hotel-mit-baby',
    amazonSearchTerm: 'Momcozy MW05 tragbarer Flaschenwärmer Baby unterwegs',
    amazonProductUrl: 'https://www.amazon.de/dp/B0GWH4W3DQ',
    affiliateUrl: 'https://www.amazon.de/dp/B0GWH4W3DQ?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Mobiler Flaschenwärmer für Reisetage und Hotelzimmer, wenn kein vertrautes Wasserbad verfügbar ist.',
    idealFor: 'Hotelzimmer, lange Transfers, Ausflüge und Reisen ohne Kochnische',
    whyItFits:
      'Er kann die Fläschchenroutine unterwegs vereinfachen, wenn Temperatur und Hygiene bewusst kontrolliert werden.',
    whatToLookFor: ['Kompatibilität mit euren Flaschen', 'Temperatur selbst kontrollieren', 'Reinigung unterwegs realistisch planen'],
    benefits: ['Mobiler Einsatz', 'Für längere Reisetage gedacht', 'Kann Wartezeiten entspannen'],
    pros: ['Flexibler als ein stationäres Gerät', 'Hilfreich im Hotel', 'Praktisch bei langen Wegen'],
    cons: ['Zusätzliches Gewicht', 'Reinigung und Hygiene beachten', 'Temperatur immer prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'bottle-warmer',
    image: '/product-images/usb-flaschenwaermer.webp',
    icon: 'bottle',
    legalNote: 'Babynahrung nach Hersteller- und Hygienevorgaben zubereiten; Temperatur immer prüfen.'
  },
  {
    id: 'reise-wickelorganizer',
    title: 'reer Growing Wickelorganizer',
    category: 'hotel-mit-baby',
    amazonSearchTerm: 'reer Growing Wickelorganizer Unterlage Reise',
    amazonProductUrl: 'https://www.amazon.de/dp/B09LMLZWZH',
    affiliateUrl: 'https://www.amazon.de/dp/B09LMLZWZH?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kompakter Wickelorganizer mit Unterlage für Hotelzimmer, Flugzeug und Tagesausflüge.',
    idealFor: 'Hotel-Wickelstation, Handgepäck, Restaurantbesuche und kurze Wege',
    whyItFits:
      'Ein kleiner Organizer trennt Wickelsachen vom restlichen Gepäck und ist nachts schneller griffbereit.',
    whatToLookFor: ['Genug Platz für wenige Basics', 'Leicht zu reinigen', 'Einfaches Öffnen mit einer Hand'],
    benefits: ['Wickelsachen gebündelt', 'Schnell aus dem Rucksack genommen', 'Praktisch im Hotelzimmer'],
    pros: ['Kompakter als ein voller Rucksack', 'Gut für kurze Wege', 'Kann zuhause vorbereitet werden'],
    cons: ['Begrenzt Stauraum', 'Nicht für lange Tagesausflüge allein', 'Regelmäßig auffüllen'],
    buttonText: 'Produkt ansehen',
    imageType: 'changing-mat',
    image: '/product-images/reise-wickelorganizer.webp',
    icon: 'pouch',
    legalNote: 'Baby beim Wickeln immer sichern und nie unbeaufsichtigt lassen.'
  },
  {
    id: 'faltbare-babybadewanne',
    title: 'Badabulle faltbare Babybadewanne',
    category: 'hotel-mit-baby',
    amazonSearchTerm: 'Badabulle faltbare Babybadewanne Reise Hotel',
    amazonProductUrl: 'https://www.amazon.de/dp/B0CKF6GZ2S',
    affiliateUrl: 'https://www.amazon.de/dp/B0CKF6GZ2S?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Faltbare Babybadewanne für Unterkünfte ohne passende Badelösung, wenn im Auto oder Koffer genug Platz ist.',
    idealFor: 'Ferienwohnung, längerer Hotelaufenthalt, Autoreise und kleine Badezimmer',
    whyItFits:
      'Sie ist kein Muss, kann aber bei längeren Aufenthalten eine vertraute Baderoutine ermöglichen.',
    whatToLookFor: ['Stabiler Stand', 'Rutschfeste Füße', 'Wassertemperatur immer separat kontrollieren'],
    benefits: ['Faltbar', 'Planbare Baderoutine', 'Auch in kleinen Bädern nutzbar'],
    pros: ['Praktisch bei Ferienwohnungen', 'Platzsparender als starre Wannen', 'Kann längere Aufenthalte erleichtern'],
    cons: ['Für Flugreisen eher sperrig', 'Nur unter ständiger Aufsicht', 'Standfläche vor Ort prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'travel-crib',
    image: '/product-images/faltbare-babybadewanne.webp',
    icon: 'bath',
    legalNote: 'Baby beim Baden nie unbeaufsichtigt lassen; Wassertemperatur und Standfestigkeit immer prüfen.'
  },
  {
    id: 'baby-uv-hut',
    title: 'LaLoona Baby-UV-Sonnenhut mit Nackenschutz',
    category: 'strand-sonne',
    amazonSearchTerm: 'LaLoona Baby Sonnenhut Nackenschutz UV Schutz Urlaub',
    amazonProductUrl: 'https://www.amazon.de/dp/B0CF91H1XG',
    affiliateUrl: 'https://www.amazon.de/dp/B0CF91H1XG?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Leichter UV-Sonnenhut für Baby und Kleinkind als Ergänzung zu Schatten, Kleidung und kurzen Strandzeiten.',
    idealFor: 'Strand, Pool, Kinderwagen, Ausflüge und helle Reiseziele',
    whyItFits:
      'Ein Hut ist klein im Gepäck und schützt besonders Kopf, Gesicht und je nach Schnitt auch den Nacken.',
    whatToLookFor: ['Passende Kopfgröße', 'Nackenschutz oder breite Krempe', 'Sitz bei Wind testen'],
    benefits: ['Klein und leicht', 'Schnell trocknendes Material möglich', 'Hilft auch im Kinderwagen'],
    pros: ['Einfach mitzunehmen', 'Keine Technik', 'Gute Ergänzung zu Schatten'],
    cons: ['Babys ziehen Hüte manchmal aus', 'Ersetzt keine Schattenpausen', 'Größe muss gut sitzen'],
    buttonText: 'Produkt ansehen',
    imageType: 'beach-tent',
    image: '/product-images/baby-uv-hut.webp',
    icon: 'hat',
    legalNote: 'Sonnenschutz für Babys immer mit Schatten, Kleidung und fachlicher Empfehlung kombinieren.'
  },
  {
    id: 'baby-strandmuschel',
    title: 'Badabulle Strandmuschel Safari UV 50+',
    category: 'strand-sonne',
    amazonSearchTerm: 'Badabulle Strandmuschel Safari UV Schutz Baby Reise',
    amazonProductUrl: 'https://www.amazon.de/dp/B0BKL64SQ6',
    affiliateUrl: 'https://www.amazon.de/dp/B0BKL64SQ6?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kompakte Strandmuschel als kleine Ruhezone gegen Sonne, Wind und Sand bei kurzen Strandpausen.',
    idealFor: 'Strandurlaub, Badesee, Park, Picknick und Poolbereich',
    whyItFits:
      'Eine kleine Schattenzone hilft, Strandtage mit Baby kürzer und planbarer zu gestalten.',
    whatToLookFor: ['Belüftung', 'Sichere Befestigung bei Wind', 'Falten vor der Reise üben'],
    benefits: ['Eigene Schattenzone', 'Schutz vor Sand', 'Schnell aufgebaut'],
    pros: ['Praktisch für Pausen', 'Besser als nur ein Handtuch', 'Kompakt für Tagesausflüge'],
    cons: ['Windstabilität beachten', 'Nicht als unbeaufsichtigter Schlafplatz', 'Kann im Koffer sperrig sein'],
    buttonText: 'Produkt ansehen',
    imageType: 'beach-tent',
    image: '/product-images/baby-strandmuschel.webp',
    icon: 'tent',
    legalNote: 'Baby im Strandzelt immer beaufsichtigen und auf Hitze sowie Luftzirkulation achten.'
  },
  {
    id: 'uv-schutz-zelt-baby',
    title: 'Glymnis Baby-Strandzelt UV 50+',
    category: 'strand-sonne',
    amazonSearchTerm: 'Glymnis Baby Strandzelt UV Schutz Pop up Strandmuschel',
    amazonProductUrl: 'https://www.amazon.de/dp/B083FPQ6YZ',
    affiliateUrl: 'https://www.amazon.de/dp/B083FPQ6YZ?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Pop-up-Sonnenschutz für Strand, Park oder Garten, wenn eine größere schattige Fläche gebraucht wird.',
    idealFor: 'Strandtage, Garten, Picknick, Campingplatz und Reisen mit Auto',
    whyItFits:
      'Ein separates UV-Zelt kann die Strandtasche sinnvoll ergänzen, wenn mehrere kurze Pausen im Schatten geplant sind.',
    whatToLookFor: ['Packmaß', 'Ventilation', 'Heringe oder Beschwerung für Wind'],
    benefits: ['Mehr Schattenfläche', 'Schneller Aufbau', 'Für Strand und Park nutzbar'],
    pros: ['Gut für geplante Pausen', 'Flexibler als ein fester Schirm', 'Kann auch im Garten dienen'],
    cons: ['Falten vorher üben', 'Bei Wind gut sichern', 'Kein vollständiger Sonnenschutz allein'],
    buttonText: 'Produkt ansehen',
    imageType: 'beach-tent',
    image: '/product-images/uv-schutz-zelt-baby.webp',
    icon: 'shade',
    legalNote: 'UV-Zelt ersetzt keine Aufsicht, passende Kleidung und Pausen außerhalb starker Sonne.'
  },
  {
    id: 'baby-sonnenbrille',
    title: 'Babiators Baby-Sonnenbrille UV400',
    category: 'strand-sonne',
    amazonSearchTerm: 'Babiators Baby Sonnenbrille UV400 Amazon.de',
    amazonProductUrl: 'https://www.amazon.de/dp/B0C37CVBK1',
    affiliateUrl: 'https://www.amazon.de/dp/B0C37CVBK1?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Flexible Sonnenbrille für helle Reisetage, wenn Baby oder Kleinkind sie akzeptiert und sie gut sitzt.',
    idealFor: 'Strand, Pool, Schnee, helle Promenaden und Buggy-Ausflüge',
    whyItFits:
      'Bei sehr hellem Licht kann eine passende Brille eine sinnvolle Ergänzung zu Hut und Schatten sein.',
    whatToLookFor: ['UV400-Kennzeichnung', 'Weicher Sitz', 'Altersgröße und Band prüfen'],
    benefits: ['Leicht im Gepäck', 'Ergänzt Hut und Schatten', 'Nützlich bei starkem Licht'],
    pros: ['Flexible Fassung', 'Für aktive Ausflüge gedacht', 'Kann am Strand praktisch sein'],
    cons: ['Nicht jedes Kind akzeptiert eine Brille', 'Passform ist entscheidend', 'Nicht als alleiniger Schutz verstehen'],
    buttonText: 'Produkt ansehen',
    imageType: 'beach-tent',
    image: '/product-images/baby-sonnenbrille.webp',
    icon: 'glasses',
    legalNote: 'Sonnenbrillen nur passend zur Altersangabe und ohne Druckstellen verwenden.'
  },
  {
    id: 'wetbag-nasse-kleidung',
    title: 'Wasserfeste Wetbag-Tasche für nasse Kleidung',
    category: 'strand-sonne',
    amazonSearchTerm: 'Wetbag nasse Kleidung Baby Strand Windeln wasserdicht',
    amazonProductUrl: 'https://www.amazon.de/dp/B0DL3CW8VL',
    affiliateUrl: 'https://www.amazon.de/dp/B0DL3CW8VL?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Wasserabweisende Tasche für nasse Badebekleidung, Spucktücher, Wickelunfälle oder sandige Kleidung.',
    idealFor: 'Strandtasche, Pool, Flugreise, Kita-Ausflug und Rückweg vom Badesee',
    whyItFits:
      'Eine Wetbag löst ein alltägliches Reiseproblem: nasse oder schmutzige Sachen getrennt transportieren.',
    whatToLookFor: ['Dichter Reißverschluss', 'Passende Größe', 'Nach Nutzung trocknen lassen'],
    benefits: ['Trennt nasse Kleidung', 'Wiederverwendbar', 'Klein faltbar'],
    pros: ['Sehr vielseitig', 'Hilft bei Wickel- und Strandpannen', 'Auch für Schwimmsachen nutzbar'],
    cons: ['Nicht für Flüssigkeitstransport gedacht', 'Muss ausgelüftet werden', 'Größe passend wählen'],
    buttonText: 'Produkt ansehen',
    imageType: 'packing-cubes',
    image: '/product-images/wetbag-nasse-kleidung.webp',
    icon: 'drop',
    legalNote: 'Nasse Textilien zeitnah waschen oder trocknen, um Gerüche und Feuchtigkeit zu vermeiden.'
  },
  {
    id: 'packing-cubes-baby-kleidung',
    title: 'CANBOX Packing Cubes für Baby-Kleidung',
    category: 'packlisten',
    amazonSearchTerm: 'Packing Cubes Baby Kleidung Koffer Organizer Set',
    amazonProductUrl: 'https://www.amazon.de/dp/B0DQNBG4F2',
    affiliateUrl: 'https://www.amazon.de/dp/B0DQNBG4F2?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Packwürfel, um Bodys, Schlafsachen, Windeln und Wechselkleidung im Koffer klar zu trennen.',
    idealFor: 'Familienkoffer, Handgepäck, Hotelwechsel und längere Packlisten',
    whyItFits:
      'Mit Baby ist Ordnung im Koffer besonders wertvoll, weil kleine Kleidung schnell durcheinandergerät.',
    whatToLookFor: ['Mehrere Größen', 'Leichte Reißverschlüsse', 'Nicht überkomprimieren'],
    benefits: ['Mehr Ordnung', 'Schneller Zugriff', 'Trennt Outfits nach Situation'],
    pros: ['Sehr hilfreich im Hotel', 'Erleichtert gemeinsames Packen', 'Auch für Elternkleidung nutzbar'],
    cons: ['Zu viele Beutel machen es unübersichtlich', 'Kompression kann Falten erzeugen', 'Qualität der Reißverschlüsse prüfen'],
    buttonText: 'Produkt ansehen',
    imageType: 'packing-cubes',
    image: '/product-images/packing-cubes-baby-kleidung.webp',
    icon: 'cube',
    legalNote: 'Nur als Organisationshilfe; Gepäckgewicht und Airline-Regeln separat prüfen.'
  },
  {
    id: 'thermosflasche',
    title: 'FJbottle isolierte Kinder-Thermosflasche',
    category: 'packlisten',
    amazonSearchTerm: 'FJbottle Kinder Thermosflasche 350ml Reise',
    amazonProductUrl: 'https://www.amazon.de/dp/B09DPMRZ19',
    affiliateUrl: 'https://www.amazon.de/dp/B09DPMRZ19?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleine isolierte Flasche für Wasser, Tee oder vorbereitetes warmes Wasser unterwegs.',
    idealFor: 'Flugreise, Transfer, Ausflug, Strandtasche und Hotelzimmer ohne schnelle Küche',
    whyItFits:
      'Eine dichte Thermosflasche macht Eltern unabhängiger von Shops, Wasserkochern und Wartezeiten.',
    whatToLookFor: ['Auslaufsicherheit testen', 'Reinigung des Trinkaufsatzes', 'Passende Größe für die Tasche'],
    benefits: ['Hält Getränke warm oder kühl', 'Robust für unterwegs', 'Auch nach der Babyzeit nutzbar'],
    pros: ['Vielseitig', 'Hilft bei langen Wegen', 'Kompakter als große Isolierkannen'],
    cons: ['Vor Reise auf Dichtigkeit prüfen', 'Nicht zu heiß befüllen', 'Regelmäßig gründlich reinigen'],
    buttonText: 'Produkt ansehen',
    imageType: 'thermos-bottle',
    image: '/product-images/thermosflasche.webp',
    icon: 'thermos',
    legalNote: 'Temperatur vor dem Füttern oder Trinken immer prüfen.'
  },
  {
    id: 'reisedokumententasche-familie',
    title: 'Hopeville Reisedokumententasche für Familien',
    category: 'packlisten',
    amazonSearchTerm: 'Hopeville Reisedokumententasche Familie Pässe Boardingpässe',
    amazonProductUrl: 'https://www.amazon.de/dp/B07BGH11MN',
    affiliateUrl: 'https://www.amazon.de/dp/B07BGH11MN?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Dokumentenorganizer für Reisepässe, Bordkarten, Versicherungskarten und wichtige Familienunterlagen.',
    idealFor: 'Flughafen, Hotel-Check-in, Mietwagen, Pauschalreise und Familienurlaub',
    whyItFits:
      'Mit Baby willst du am Schalter nicht nach Pässen, Buchungen oder Impfausweisen suchen.',
    whatToLookFor: ['Genug Passfächer', 'Reißverschluss', 'Schnellzugriff für Bordkarten'],
    benefits: ['Dokumente an einem Ort', 'Weniger Sucherei', 'Gut für Check-in und Boarding'],
    pros: ['Praktisch für Familien', 'Auch für Versicherungsunterlagen geeignet', 'Passt ins Handgepäck'],
    cons: ['Nicht offen liegen lassen', 'Zu voll gepackt wird sie unhandlich', 'Sensible Dokumente bewusst sichern'],
    buttonText: 'Produkt ansehen',
    imageType: 'document-organizer',
    image: '/product-images/reisedokumententasche-familie.webp',
    icon: 'document',
    legalNote: 'Wichtige Dokumente zusätzlich digital oder separat sichern, wenn sinnvoll.'
  },
  {
    id: 'feuchttuecher-spender-unterwegs',
    title: 'ULVBABI tragbarer Feuchttücher-Spender',
    category: 'packlisten',
    amazonSearchTerm: 'tragbarer Feuchttücher Spender unterwegs Baby Reise',
    amazonProductUrl: 'https://www.amazon.de/dp/B0GXY7CBMG',
    affiliateUrl: 'https://www.amazon.de/dp/B0GXY7CBMG?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleiner Spender für Feuchttücher, damit einzelne Tücher unterwegs nicht austrocknen oder in der Tasche verschwinden.',
    idealFor: 'Wickeltasche, Kinderwagen-Organizer, Flugzeug, Restaurant und Strand',
    whyItFits:
      'Feuchttücher gehören fast immer mit, aber eine kleine Hülle ist unterwegs oft handlicher als die ganze Packung.',
    whatToLookFor: ['Dichter Verschluss', 'Leicht nachfüllbar', 'Größe passend zur Tücherpackung'],
    benefits: ['Tücher griffbereit', 'Kleiner als Großpackungen', 'Hilft gegen Austrocknen'],
    pros: ['Praktisch im Handgepäck', 'Gut für kurze Wege', 'Kann im Organizer bleiben'],
    cons: ['Muss nachgefüllt werden', 'Nicht jede Tüchergröße passt', 'Regelmäßig reinigen'],
    buttonText: 'Produkt ansehen',
    imageType: 'changing-mat',
    image: '/product-images/feuchttuecher-spender-unterwegs.webp',
    icon: 'wipe',
    legalNote: 'Feuchttücher hautverträglich auswählen und Packung sauber verschließen.'
  },
  {
    id: 'kulturtasche-babyartikel',
    title: 'GRINSEZWERGE Kinder-Kulturtasche',
    category: 'packlisten',
    amazonSearchTerm: 'GRINSEZWERGE Kinder Kulturtasche Reise Organizer Babyartikel',
    amazonProductUrl: 'https://www.amazon.de/dp/B0BT4W7SQL',
    affiliateUrl: 'https://www.amazon.de/dp/B0BT4W7SQL?tag=epic05e-21',
    affiliateStatus: 'ready',
    shortDescription:
      'Kleine Kulturtasche für Baby-Pflegeartikel, Reisegrößen, Creme, Bürste und andere Bad-Basics.',
    idealFor: 'Hotelbad, Ferienwohnung, Wickelrucksack und Familienkoffer',
    whyItFits:
      'Pflegeartikel bleiben getrennt von Kleidung, Windeln und Dokumenten und sind im Hotelbad schneller griffbereit.',
    whatToLookFor: ['Abwischbares Innenfutter', 'Genug Fächer', 'Nicht zu groß für den Koffer'],
    benefits: ['Pflegeartikel gebündelt', 'Schneller Zugriff im Hotel', 'Gut für kleine Flaschen'],
    pros: ['Ordnet Bad-Basics', 'Passt zur Packliste', 'Auch für Elternartikel nutzbar'],
    cons: ['Flüssigkeiten zusätzlich sichern', 'Nicht überfüllen', 'Nach Auslaufen sofort reinigen'],
    buttonText: 'Produkt ansehen',
    imageType: 'packing-cubes',
    image: '/product-images/kulturtasche-babyartikel.webp',
    icon: 'toiletry',
    legalNote: 'Flüssigkeiten für Flugreisen nach aktuellen Sicherheitsregeln packen.'
  },
  {
    id: 'bindungsorientiert-durchschlafen-lernen',
    title: 'Bindungsorientiert durchschlafen lernen',
    category: 'babyschlaf',
    affiliateNetwork: 'babyschlummerland',
    amazonSearchTerm: 'Babyschlaf Ratgeber bindungsorientiert durchschlafen lernen',
    amazonProductUrl: 'https://www.babyschlummerland.de/durchschlafen-lernen-bindungsorientiert/',
    affiliateUrl: 'https://www.babyschlummerland.de/durchschlafen-lernen-bindungsorientiert/#aff=Benman8810',
    affiliateStatus: 'ready',
    shortDescription:
      'Digitaler Elternratgeber für Familien, die Babyschlaf ohne Druck und mit Blick auf Bindung besser verstehen möchten.',
    idealFor: 'Eltern, die nachts häufiger aufwachen und sich realistische, liebevolle Orientierung wünschen',
    whyItFits:
      'Der Ratgeber passt zu BabyReiseHelfer, weil Schlaf auch auf Reisen ein großes Thema ist und ruhige Routinen Eltern entlasten können.',
    whatToLookFor: [
      'Keine Schlafgarantie erwarten',
      'Inhalte mit eurem Bauchgefühl abgleichen',
      'Bei medizinischen Fragen fachlichen Rat einholen'
    ],
    benefits: ['Kann Schlafsituationen einordnen', 'Setzt auf bindungsorientierte Begleitung', 'Digital sofort verfügbar'],
    pros: ['Sanfter Ratgeber-Ton', 'Hilft beim Sortieren typischer Schlaffragen', 'Auch für Reise- und Hotelnächte mitdenkbar'],
    cons: ['Kein Ersatz für medizinische Beratung', 'Nicht jedes Baby reagiert gleich auf Routinen', 'Erfordert Geduld und Beobachtung'],
    buttonText: 'Ratgeber ansehen',
    imageType: 'sleep-guide',
    image: '/product-images/bindungsorientiert-durchschlafen-lernen.webp',
    icon: 'sleep',
    legalNote: 'Babyschlaf ist individuell. Der Ratgeber gibt Orientierung, aber keine Garantie für durchgeschlafene Nächte.'
  },
  {
    id: 'babys-tage-meistern',
    title: 'Babys Tage meistern',
    category: 'babyschlaf',
    affiliateNetwork: 'babyschlummerland',
    amazonSearchTerm: 'Babys Tagesschlaf Ratgeber Tagesstruktur Baby',
    amazonProductUrl: 'https://www.babyschlummerland.de/buch-tagesschlaf-baby/',
    affiliateUrl: 'https://www.babyschlummerland.de/buch-tagesschlaf-baby/#aff=Benman8810',
    affiliateStatus: 'ready',
    shortDescription:
      'Ratgeber rund um Tagesschlaf, Wachzeiten und ruhigere Tagesabläufe mit Baby.',
    idealFor: 'Eltern, deren Baby tagsüber schwer zur Ruhe findet oder sehr kurze Nickerchen macht',
    whyItFits:
      'Reisetage werden oft leichter, wenn Eltern Schlafdruck, Pausen und Wachfenster besser einschätzen können.',
    whatToLookFor: [
      'Wachzeiten altersgerecht betrachten',
      'Tagesstruktur flexibel halten',
      'Keine starren Pläne auf jedes Baby übertragen'
    ],
    benefits: ['Kann Tagesabläufe übersichtlicher machen', 'Gibt Impulse für Pausen und Routinen', 'Hilft beim Beobachten von Müdigkeitssignalen'],
    pros: ['Fokus auf den Alltag', 'Gut für Vorbereitung vor Reisen', 'Unterstützt ruhigeres Planen'],
    cons: ['Kein fixer Tagesplan für jedes Baby', 'Reisetage bleiben manchmal unvorhersehbar', 'Braucht konsequentes Beobachten statt schnelles Rezept'],
    buttonText: 'Ratgeber ansehen',
    imageType: 'day-naps',
    image: '/product-images/babys-tage-meistern.webp',
    icon: 'sleep',
    legalNote: 'Tagesrhythmen entwickeln sich individuell. Die Inhalte ersetzen keine persönliche Beratung.'
  },
  {
    id: 'schlummergeheimnisse-neugeborene',
    title: 'Schlummergeheimnisse für Neugeborene',
    category: 'babyschlaf',
    affiliateNetwork: 'babyschlummerland',
    amazonSearchTerm: 'Neugeborene Schlaf Ratgeber erste Wochen Baby',
    amazonProductUrl: 'https://www.babyschlummerland.de/ebook-schlummergeheimnisse-fuer-neugeborene/',
    affiliateUrl: 'https://www.babyschlummerland.de/ebook-schlummergeheimnisse-fuer-neugeborene/#aff=Benman8810',
    affiliateStatus: 'ready',
    shortDescription:
      'E-Book für die ersten Wochen mit Baby, wenn Schlaf, Nähe und neue Routinen sich erst einspielen.',
    idealFor: 'Schwangere, frisch gebackene Eltern und Familien in der Neugeborenenzeit',
    whyItFits:
      'Gerade vor der ersten Reise oder dem ersten Familienbesuch kann Grundwissen über Neugeborenenschlaf entlasten.',
    whatToLookFor: [
      'Normale Neugeborenenbedürfnisse berücksichtigen',
      'Sicheren Schlafplatz priorisieren',
      'Bei Unsicherheit Hebamme oder Kinderarzt fragen'
    ],
    benefits: ['Kann Erwartungen realistischer machen', 'Begleitet die ersten Wochen', 'Niedrige Einstiegshürde als E-Book'],
    pros: ['Sanfter Einstieg ins Thema Babyschlaf', 'Gut für die Vorbereitung', 'Kann Eltern Unsicherheit nehmen'],
    cons: ['Neugeborene schlafen selten planbar', 'Kein Programm zum schnellen Durchschlafen', 'Sichere Schlafumgebung bleibt immer wichtiger als Routinen'],
    buttonText: 'E-Book ansehen',
    imageType: 'newborn-sleep',
    image: '/product-images/schlummergeheimnisse-neugeborene.webp',
    icon: 'sleep',
    legalNote: 'Für Neugeborene gelten besondere Empfehlungen zu sicherem Schlaf. Bei Fragen bitte Hebamme oder Kinderarzt einbeziehen.'
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
