import type { TravelProduct } from './travelProducts';

export type AmazonImageSource = 'pa-api' | 'sitestripe';

/**
 * Editorial Amazon cards may only use a URL returned by the Product
 * Advertising API or an official Amazon SiteStripe image link. Local product
 * images intentionally are not used as a fallback in the article.
 */
export type AmazonArticleProduct = {
  productId: string;
  asin: string;
  title: string;
  affiliateUrl: string;
  amazonImageUrl?: string;
  amazonImageSource?: AmazonImageSource;
  benefit: string;
  idealFor: string;
  caution: string;
};

export type AmazonArticleCardProduct = TravelProduct & {
  amazonImageUrl?: string;
  amazonImageSource?: AmazonImageSource;
};

const affiliateUrl = (asin: string) => `https://www.amazon.de/dp/${asin}?tag=epic05e-21`;

// Add only an official SiteStripe or PA-API image URL to amazonImageUrl.
// Never derive image URLs from an Amazon product page or save Amazon images locally.
export const amazonArticleProducts: AmazonArticleProduct[] = [
  {
    productId: 'wickelrucksack-reise-handgepaeck',
    asin: 'B08T7VKR2R',
    title: 'Wickelrucksack als Handgepäck',
    affiliateUrl: affiliateUrl('B08T7VKR2R'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Hält Wickelsachen, Snacks und Dokumente übersichtlich zusammen.',
    idealFor: 'Flugreisen und Tagesausflüge',
    caution: 'Fächeraufteilung und Packmaß vorher prüfen.'
  },
  {
    productId: 'orzbow-wickelunterlage-reise',
    asin: 'B097D8BPZG',
    title: 'Orzbow faltbare Wickelunterlage',
    affiliateUrl: affiliateUrl('B097D8BPZG'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Bündelt das Nötigste für kurze Wickelpausen.',
    idealFor: 'Handgepäck und Buggy',
    caution: 'Material und Fächeraufteilung müssen zu eurem Alltag passen.'
  },
  {
    productId: 'packwuerfel-familienurlaub-set',
    asin: 'B0DQNBG4F2',
    title: 'CANBOX Kompressions-Packwürfel',
    affiliateUrl: affiliateUrl('B0DQNBG4F2'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Macht Kleidung und Reise-Basics im Koffer leichter auffindbar.',
    idealFor: 'Familienurlaub mit Koffer',
    caution: 'Maße sollten zum eigenen Koffer passen.'
  },
  {
    productId: 'dokumententasche-familie-rfid',
    asin: 'B0H5VQSPQ4',
    title: 'NEWIROVE Reisedokumententasche',
    affiliateUrl: affiliateUrl('B0H5VQSPQ4'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Bewahrt wichtige Reisedokumente an einem festen Ort auf.',
    idealFor: 'Flughafen und Hotel-Check-in',
    caution: 'Nur wirklich benötigte Dokumente mitnehmen.'
  },
  {
    productId: 'reisebett-baby-kompakt',
    asin: 'B0CT8Z1C43',
    title: 'hauck Dream N Play Plus',
    affiliateUrl: affiliateUrl('B0CT8Z1C43'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Schafft einen eigenen Schlafplatz in Hotel oder Ferienwohnung.',
    idealFor: 'Mehrere Nächte am selben Ort',
    caution: 'Aufbau, Matratze und Sicherheit vor Ort prüfen.'
  },
  {
    productId: 'verdunkelungsrollo-reise-baby',
    asin: 'B08ZNW1GWB',
    title: 'Amazon Basics Reise-Verdunkelungsvorhang',
    affiliateUrl: affiliateUrl('B08ZNW1GWB'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Kann helle Schlafumgebungen unterwegs angenehmer machen.',
    idealFor: 'Helle Hotelzimmer',
    caution: 'Fenstermaß und sichere Befestigung vorher prüfen.'
  },
  {
    productId: 'zamboo-reisebett-moskitonetz',
    asin: 'B0779WZVWD',
    title: 'Zamboo Reisebett-Moskitonetz',
    affiliateUrl: affiliateUrl('B0779WZVWD'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Kann den Schlafbereich an warmen Reisezielen ergänzen.',
    idealFor: 'Hotelzimmer und Ferienwohnungen',
    caution: 'Passform und Luftzirkulation beachten.'
  },
  {
    productId: 'babymoov-babyphone-expert-care',
    asin: 'B07NGR3ZFD',
    title: 'Babymoov Babyphone Expert Care',
    affiliateUrl: affiliateUrl('B07NGR3ZFD'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Kann bei kurzen Wegen in einer Unterkunft Orientierung geben.',
    idealFor: 'Hotelzimmer und Ferienwohnungen',
    caution: 'Reichweite und Lautstärke vor Ort testen.'
  },
  {
    productId: 'trinkflasche-kind-auslaufsicher',
    asin: 'B0C1H3MGJ7',
    title: 'Auslaufsichere Trinkflasche für Kinder',
    affiliateUrl: affiliateUrl('B0C1H3MGJ7'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Hält eine Trinkmöglichkeit für unterwegs griffbereit.',
    idealFor: 'Auto, Flugzeug und Ausflüge',
    caution: 'Verschluss und Reinigung vor der Reise testen.'
  },
  {
    productId: 'snackbox-kind-faecher',
    asin: 'B07C275388',
    title: 'Snackbox mit Fächern',
    affiliateUrl: affiliateUrl('B07C275388'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Trennt kleine Snackportionen übersichtlich voneinander.',
    idealFor: 'Wartezeiten und lange Transfers',
    caution: 'Fächergröße an die üblichen Portionen anpassen.'
  },
  {
    productId: 'silikon-laetzchen-reise',
    asin: 'B08GFCX964',
    title: 'Silikon-Lätzchen für unterwegs',
    affiliateUrl: affiliateUrl('B08GFCX964'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Lässt sich nach einer Mahlzeit unterwegs schnell abwischen.',
    idealFor: 'Restaurant und Hotel',
    caution: 'Material und Verschluss sollten sich gut anfühlen.'
  },
  {
    productId: 'feuchttuecherbox-reise',
    asin: 'B0C77Y3QGM',
    title: 'Feuchttücherbox für unterwegs',
    affiliateUrl: affiliateUrl('B0C77Y3QGM'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Hält Feuchttücher im Tagesrucksack kompakt griffbereit.',
    idealFor: 'Wickeln und kleine Pannen',
    caution: 'Vor der Abreise prüfen, ob sie sauber schließt.'
  },
  {
    productId: 'babymoov-aquani-3in1',
    asin: 'B0CWPMY35L',
    title: 'Babymoov Aquani 3-in-1',
    affiliateUrl: affiliateUrl('B0CWPMY35L'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Bietet einen schattigen Ruhebereich für Strandpausen.',
    idealFor: 'Strand, Garten und Badesee',
    caution: 'Aufbau, Schattenplatz und Aufsicht einplanen.'
  },
  {
    productId: 'alpine-muffy-baby-classic',
    asin: 'B0DG3T5CNR',
    title: 'Alpine Muffy Baby Classic',
    affiliateUrl: affiliateUrl('B0DG3T5CNR'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Ist für geplante laute Situationen unterwegs gedacht.',
    idealFor: 'Flugreisen und Bahnsteige',
    caution: 'Passform und geeignete Einsatzdauer beachten.'
  },
  {
    productId: 'baby-sonnenhut-uv',
    asin: 'B0CQ243X1M',
    title: 'FURTALK Baby-Sonnenhut mit Nackenschutz',
    affiliateUrl: affiliateUrl('B0CQ243X1M'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Ergänzt Schatten und leichte Kleidung an sonnigen Tagen.',
    idealFor: 'Strand und Stadtbummel',
    caution: 'Größe und sicheren Sitz vor dem Ausflug prüfen.'
  },
  {
    productId: 'laessig-buggy-organizer',
    asin: 'B0CT91SRQM',
    title: 'LÄSSIG Kinderwagen-Organizer',
    affiliateUrl: affiliateUrl('B0CT91SRQM'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Hält Tücher, Getränke und Kleinigkeiten am Griff erreichbar.',
    idealFor: 'Ausflüge mit Kinderwagen',
    caution: 'Beladung und Befestigung am eigenen Buggy testen.'
  },
  {
    productId: 'reiseapotheke-organizer-baby',
    asin: 'B0B698Z6N6',
    title: 'Reiseapotheke-Organizer für Baby und Kind',
    affiliateUrl: affiliateUrl('B0B698Z6N6'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Bündelt individuell abgestimmte Reise-Basics an einem Ort.',
    idealFor: 'Handgepäck und Tagesausflüge',
    caution: 'Inhalt und Lagerung individuell fachlich abstimmen.'
  },
  {
    productId: 'buggy-reisen-handgepaeck',
    asin: 'B0FXWGMBRD',
    title: 'Reisebuggy mit kleinem Faltmaß',
    affiliateUrl: affiliateUrl('B0FXWGMBRD'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Kann Wege am Flughafen und im Urlaub flexibler machen.',
    idealFor: 'Städtetrips und Umstiege',
    caution: 'Faltmaß und Fluglinienregeln vorher prüfen.'
  },
  {
    productId: 'babytrage-urlaub-luftig',
    asin: 'B09F3Q46Z6',
    title: 'Luftige Babytrage für warme Reiseziele',
    affiliateUrl: affiliateUrl('B09F3Q46Z6'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Lässt die Hände bei Treppen und Altstadtwegen frei.',
    idealFor: 'Ausflüge ohne Buggy',
    caution: 'Passform und altersgerechte Nutzung beachten.'
  },
  {
    productId: 'kofferwaage-digital',
    asin: 'B0186K8T9O',
    title: 'Digitale Kofferwaage',
    affiliateUrl: affiliateUrl('B0186K8T9O'),
    amazonImageUrl: undefined,
    amazonImageSource: undefined,
    benefit: 'Hilft, das Gepäckgewicht vor Rückflug oder Check-in zu prüfen.',
    idealFor: 'Flugreisen mit Familiengepäck',
    caution: 'Batteriestand rechtzeitig kontrollieren.'
  }
];

const amazonArticleProductsById = new Map(
  amazonArticleProducts.map((product) => [product.productId, product])
);

export function toAmazonArticleCardProduct(product: TravelProduct): AmazonArticleCardProduct {
  const amazonProduct = amazonArticleProductsById.get(product.id);
  const amazonImageSource = amazonProduct?.amazonImageSource;

  return {
    ...product,
    amazonImageUrl: amazonImageSource ? amazonProduct?.amazonImageUrl?.trim() || undefined : undefined,
    amazonImageSource
  };
}
