import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const siteUrl = 'https://babyreisehelfer.pages.dev';
const outDir = 'public/pinterest/manual-pins';
const marketingDir = 'marketing/pinterest';

const palette = {
  cream: '#fbf4e8',
  paper: '#fffaf2',
  blue: '#8fb9cf',
  sage: '#8faa83',
  coral: '#ef805f',
  ink: '#243d43',
  muted: '#627577'
};

const pins = [
  {
    pinNumber: 1,
    file: '01-packliste-urlaub-mit-baby.png',
    boardName: 'Baby Packlisten',
    title: 'Packliste Urlaub mit Baby',
    overlayLines: ['Packliste', 'Urlaub mit', 'Baby'],
    description:
      'Urlaub mit Baby wird entspannter, wenn die wichtigsten Dinge gut vorbereitet sind. Diese Packliste hilft dir bei Kleidung, Wickeln, Schlafen, Reiseapotheke und praktischen Baby-Reisehelfern. #packliste #urlaubmitbaby #babyreise',
    targetUrl: `${siteUrl}/packlisten/`,
    keywords: ['Packliste Baby', 'Urlaub mit Baby', 'Baby Reise', 'Familienurlaub'],
    hashtags: ['#packliste', '#urlaubmitbaby', '#babyreise'],
    altText: 'Pinterest Pin zur Packliste Urlaub mit Baby mit heller Reise- und Baby-Pack-Szene',
    category: 'Baby Packlisten',
    primaryImage: 'public/category-images/packlisten.webp',
    secondaryImage: 'public/travel-product-images/packwuerfel-set-familien.webp',
    accent: palette.coral
  },
  {
    pinNumber: 2,
    file: '02-handgepaeck-mit-baby.png',
    boardName: 'Baby Packlisten',
    title: 'Handgepäck mit Baby: Was muss rein?',
    overlayLines: ['Handgepäck', 'mit Baby', 'richtig packen'],
    description:
      'Was gehört ins Handgepäck, wenn du mit Baby unterwegs bist? Diese Übersicht zeigt Wickelzeug, Wechselkleidung, kleine Helfer und Dinge, die du griffbereit haben solltest. #fliegenmitbaby #packliste #babyreise',
    targetUrl: `${siteUrl}/fliegen-mit-baby/`,
    keywords: ['Handgepäck Baby', 'Fliegen mit Baby', 'Wickeltasche Flugzeug', 'Baby Packliste'],
    hashtags: ['#fliegenmitbaby', '#packliste', '#babyreise'],
    altText: 'Pinterest Pin zum Handgepäck mit Baby mit Wickelrucksack und Reiseutensilien',
    category: 'Baby Packlisten',
    primaryImage: 'public/article-images/fliegen-mit-baby-dinge.webp',
    secondaryImage: 'public/travel-product-images/wickelrucksack-handgepaeck.webp',
    accent: palette.blue
  },
  {
    pinNumber: 3,
    file: '03-baby-reiseapotheke-packen.png',
    boardName: 'Baby Packlisten',
    title: 'Baby-Reiseapotheke: Was gehört in die Tasche?',
    overlayLines: ['Baby-', 'Reiseapotheke', 'packen'],
    description:
      'Eine Baby-Reiseapotheke ersetzt keine Beratung, kann Eltern aber unterwegs Orientierung geben. Hier findest du sinnvolle Basics für Flug, Hotel und Urlaub. #reiseapotheke #babyreise #urlaubmitbaby',
    targetUrl: `${siteUrl}/ratgeber/reiseapotheke-baby-kind/`,
    keywords: ['Baby Reiseapotheke', 'Reiseapotheke Kind', 'Urlaub mit Baby', 'Packliste Baby'],
    hashtags: ['#reiseapotheke', '#babyreise', '#urlaubmitbaby'],
    altText: 'Pinterest Pin zur Baby-Reiseapotheke mit kleiner Reiseapotheken-Box',
    category: 'Baby Packlisten',
    primaryImage: 'public/article-images/baby-reiseapotheke.webp',
    secondaryImage: 'public/travel-product-images/reiseapotheke-organizer-baby.webp',
    accent: palette.sage
  },
  {
    pinNumber: 4,
    file: '04-fliegen-mit-baby-7-dinge.png',
    boardName: 'Fliegen mit Baby',
    title: 'Fliegen mit Baby: 7 Dinge, die helfen',
    overlayLines: ['Fliegen mit', 'Baby:', '7 Dinge'],
    description:
      'Fliegen mit Baby muss nicht chaotisch sein. Der Ratgeber zeigt dir, welche Dinge im Handgepäck helfen können und worauf Eltern vor dem Flug achten sollten. #fliegenmitbaby #babyreise',
    targetUrl: `${siteUrl}/ratgeber/fliegen-mit-baby-dinge/`,
    keywords: ['Fliegen mit Baby', 'Baby im Flugzeug', 'Handgepäck Baby', 'Flugreise Baby'],
    hashtags: ['#fliegenmitbaby', '#babyreise'],
    altText: 'Pinterest Pin Fliegen mit Baby mit heller Reiseszene und Baby-Reisehelfern',
    category: 'Fliegen mit Baby',
    primaryImage: 'public/category-images/fliegen-mit-baby.webp',
    secondaryImage: 'public/product-images/baby-gehoerschutz.webp',
    accent: palette.coral
  },
  {
    pinNumber: 5,
    file: '05-baby-im-flugzeug-beschaeftigen.png',
    boardName: 'Fliegen mit Baby',
    title: 'Baby im Flugzeug beschäftigen',
    overlayLines: ['Baby im', 'Flugzeug', 'beschäftigen'],
    description:
      'Lange Wege, Wartezeiten und ein enger Sitzplatz können anstrengend sein. Diese Ideen helfen dir, Beschäftigung fürs Baby im Flugzeug ruhig und realistisch vorzubereiten. #fliegenmitbaby #reisenmitkind',
    targetUrl: `${siteUrl}/ratgeber/baby-im-flugzeug-beschaeftigen/`,
    keywords: ['Baby beschäftigen Flugzeug', 'Fliegen mit Kind', 'Reisen mit Baby', 'Flugreise Familie'],
    hashtags: ['#fliegenmitbaby', '#reisenmitkind'],
    altText: 'Pinterest Pin zu Beschäftigungsideen für Baby im Flugzeug mit Reisebuch und Kopfhörern',
    category: 'Fliegen mit Baby',
    primaryImage: 'public/travel-product-images/beschaeftigungsbuch-flugreise.webp',
    secondaryImage: 'public/travel-product-images/kinderkopfhoerer-lautstaerkebegrenzung.webp',
    accent: palette.blue
  },
  {
    pinNumber: 6,
    file: '06-wickeltasche-flugzeug-packen.png',
    boardName: 'Fliegen mit Baby',
    title: 'Wickeltasche fürs Flugzeug richtig packen',
    overlayLines: ['Wickeltasche', 'fürs Flugzeug', 'packen'],
    description:
      'Eine gut gepackte Wickeltasche spart unterwegs Nerven. Hier findest du praktische Ideen für Wickeln, Wechselkleidung und kleine Helfer im Flugzeug. #wickeltasche #fliegenmitbaby',
    targetUrl: `${siteUrl}/ratgeber/wickeln-unterwegs/`,
    keywords: ['Wickeltasche Flugzeug', 'Wickeln unterwegs', 'Baby Handgepäck', 'Fliegen mit Baby'],
    hashtags: ['#wickeltasche', '#fliegenmitbaby'],
    altText: 'Pinterest Pin zur Wickeltasche fürs Flugzeug mit Wickelrucksack und Wickelzubehör',
    category: 'Fliegen mit Baby',
    primaryImage: 'public/article-images/wickeln-unterwegs.webp',
    secondaryImage: 'public/product-images/faltbare-wickelunterlage.webp',
    accent: palette.sage
  },
  {
    pinNumber: 7,
    file: '07-urlaub-mit-baby-stressfrei-planen.png',
    boardName: 'Urlaub mit Baby',
    title: 'Urlaub mit Baby stressfrei planen',
    overlayLines: ['Urlaub mit', 'Baby', 'stressfrei'],
    description:
      'Urlaub mit Baby wird leichter, wenn Schlafen, Wickeln, Transport und Essen realistisch vorbereitet sind. Der Ratgeber hilft dir beim Planen ohne Druck. #urlaubmitbaby #familienurlaub',
    targetUrl: `${siteUrl}/urlaub/`,
    keywords: ['Urlaub mit Baby', 'Familienurlaub planen', 'Baby Reise', 'Reisen mit Baby'],
    hashtags: ['#urlaubmitbaby', '#familienurlaub'],
    altText: 'Pinterest Pin Urlaub mit Baby stressfrei planen mit warmer Familienreise-Atmosphäre',
    category: 'Urlaub mit Baby',
    primaryImage: 'public/article-images/packliste-mallorca-mit-baby.webp',
    secondaryImage: 'public/travel-product-images/reisebett-baby-kompakt.webp',
    accent: palette.coral
  },
  {
    pinNumber: 8,
    file: '08-familienurlaub-was-wichtig-ist.png',
    boardName: 'Urlaub mit Baby',
    title: 'Familienurlaub: Was wirklich wichtig ist',
    overlayLines: ['Familienurlaub:', 'was wirklich', 'wichtig ist'],
    description:
      'Nicht alles muss mit, aber ein paar gute Entscheidungen machen Familienurlaub deutlich entspannter. Hier findest du praktische Tipps für Reisen mit Baby und Kind. #familienurlaub #reisenmitkind',
    targetUrl: `${siteUrl}/familienurlaub/`,
    keywords: ['Familienurlaub', 'Reisen mit Kind', 'Urlaub mit Baby', 'Packliste Familie'],
    hashtags: ['#familienurlaub', '#reisenmitkind'],
    altText: 'Pinterest Pin zum Familienurlaub mit heller Urlaubsszene und Reiseorganisation',
    category: 'Urlaub mit Baby',
    primaryImage: 'public/category-images/packlisten.webp',
    secondaryImage: 'public/travel-product-images/familien-dokumententasche.webp',
    accent: palette.blue
  },
  {
    pinNumber: 9,
    file: '09-reiseprodukte-eltern-helfen.png',
    boardName: 'Urlaub mit Baby',
    title: 'Reiseprodukte, die Eltern wirklich helfen',
    overlayLines: ['Reiseprodukte', 'für Eltern', 'mit Baby'],
    description:
      'Welche Baby-Reiseprodukte können unterwegs wirklich praktisch sein? Diese Übersicht sortiert sinnvolle Helfer für Schlafen, Wickeln, Strand, Flug und Kinderwagen. #babyreise #reiseprodukte',
    targetUrl: `${siteUrl}/reiseprodukte/`,
    keywords: ['Baby Reiseprodukte', 'Reisen mit Baby', 'Urlaub mit Kind', 'Baby Reisehelfer'],
    hashtags: ['#babyreise', '#reiseprodukte'],
    altText: 'Pinterest Pin zu Baby-Reiseprodukten mit Produkt-Mockups und Magazin-Look',
    category: 'Urlaub mit Baby',
    primaryImage: 'public/travel-product-images/wickelrucksack-handgepaeck.webp',
    secondaryImage: 'public/travel-product-images/buggy-reisen-handgepaeck.webp',
    accent: palette.sage
  },
  {
    pinNumber: 10,
    file: '10-strandurlaub-mit-baby-mitnehmen.png',
    boardName: 'Baby Strandurlaub',
    title: 'Strandurlaub mit Baby: Was mitnehmen?',
    overlayLines: ['Strandurlaub', 'mit Baby:', 'was mit?'],
    description:
      'Schatten, UV-Schutz, Wickeln und Snacks: Diese Übersicht hilft dir, den Strandtag mit Baby einfacher zu planen. #strandurlaub #urlaubmitbaby',
    targetUrl: `${siteUrl}/ratgeber/urlaub-am-strand-mit-baby/`,
    keywords: ['Strandurlaub Baby', 'Baby Strand', 'Sonnenschutz Baby', 'Urlaub mit Baby'],
    hashtags: ['#strandurlaub', '#urlaubmitbaby'],
    altText: 'Pinterest Pin Strandurlaub mit Baby mit heller Strand- und Sonnenschutzszene',
    category: 'Baby Strandurlaub',
    primaryImage: 'public/article-images/urlaub-am-strand-mit-baby.webp',
    secondaryImage: 'public/product-images/baby-strandmuschel.webp',
    accent: palette.coral
  },
  {
    pinNumber: 11,
    file: '11-sonnenschutz-baby-kleinkind.png',
    boardName: 'Baby Strandurlaub',
    title: 'Sonnenschutz für Baby und Kleinkind',
    overlayLines: ['Sonnenschutz', 'für Baby &', 'Kleinkind'],
    description:
      'Beim Strandurlaub mit Baby geht es vor allem um Schatten, Kleidung und gute Vorbereitung. Dieser Ratgeber sammelt praktische, vorsichtige Tipps ohne falsche Versprechen. #sonnenschutz #babystrand',
    targetUrl: `${siteUrl}/strand-sonne/`,
    keywords: ['Sonnenschutz Baby', 'Baby Strandurlaub', 'UV Schutz Kind', 'Strand mit Baby'],
    hashtags: ['#sonnenschutz', '#babystrand'],
    altText: 'Pinterest Pin Sonnenschutz für Baby und Kleinkind mit UV-Hut und Strandhelfern',
    category: 'Baby Strandurlaub',
    primaryImage: 'public/category-images/strand-sonne.webp',
    secondaryImage: 'public/product-images/baby-uv-hut.webp',
    accent: palette.blue
  },
  {
    pinNumber: 12,
    file: '12-strandtasche-mit-baby-packen.png',
    boardName: 'Baby Strandurlaub',
    title: 'Strandtasche mit Baby richtig packen',
    overlayLines: ['Strandtasche', 'mit Baby', 'packen'],
    description:
      'Was gehört in die Strandtasche mit Baby? Hier findest du Ideen für Schatten, Kleidung, Wickeln, Trinken und nasse Sachen nach dem Strand. #strandurlaub #packliste',
    targetUrl: `${siteUrl}/ratgeber/strandurlaub-mit-baby-sonnenschutz-sicherheit/`,
    keywords: ['Strandtasche Baby', 'Baby Strand Packliste', 'Wetbag Baby', 'Sonnenschutz Baby'],
    hashtags: ['#strandurlaub', '#packliste'],
    altText: 'Pinterest Pin Strandtasche mit Baby richtig packen mit Strand- und Wetbag-Produkten',
    category: 'Baby Strandurlaub',
    primaryImage: 'public/travel-product-images/sandfreie-strandmatte-familie.webp',
    secondaryImage: 'public/travel-product-images/wetbag-windeln-reise.webp',
    accent: palette.sage
  },
  {
    pinNumber: 13,
    file: '13-kinderwagen-sommer-zubehoer.png',
    boardName: 'Kinderwagen Zubehör',
    title: 'Kinderwagen im Sommer: Sonnenschutz & Zubehör',
    overlayLines: ['Kinderwagen', 'im Sommer', 'gut ausstatten'],
    description:
      'Sonnensegel, Moskitonetz, Ventilator und Organizer können unterwegs praktisch sein. Hier findest du eine ruhige Übersicht für Kinderwagen-Zubehör im Sommer. #kinderwagen #sommerbaby',
    targetUrl: `${siteUrl}/ratgeber/kinderwagen-im-sommer/`,
    keywords: ['Kinderwagen Sommer', 'Kinderwagen Zubehör', 'Sonnenschutz Kinderwagen', 'Buggy Urlaub'],
    hashtags: ['#kinderwagen', '#sommerbaby'],
    altText: 'Pinterest Pin Kinderwagen im Sommer mit Sonnenschutz und Kinderwagen-Zubehör',
    category: 'Kinderwagen Zubehör',
    primaryImage: 'public/article-images/kinderwagen-im-sommer.webp',
    secondaryImage: 'public/product-images/kinderwagen-sonnenschutz.webp',
    accent: palette.coral
  },
  {
    pinNumber: 14,
    file: '14-buggy-zubehoer-urlaub.png',
    boardName: 'Kinderwagen Zubehör',
    title: 'Buggy-Zubehör für den Urlaub',
    overlayLines: ['Buggy-', 'Zubehör', 'für Urlaub'],
    description:
      'Für Ausflüge im Urlaub kann passendes Buggy-Zubehör helfen: Organizer, Sonnenschutz, Haken oder Getränkehalter. Der Ratgeber zeigt, worauf Eltern achten können. #buggy #familienurlaub',
    targetUrl: `${siteUrl}/ratgeber/buggy-fuer-den-urlaub-darauf-achten/`,
    keywords: ['Buggy Zubehör', 'Buggy Urlaub', 'Kinderwagen Zubehör', 'Reisen mit Kind'],
    hashtags: ['#buggy', '#familienurlaub'],
    altText: 'Pinterest Pin Buggy-Zubehör für den Urlaub mit Organizer und Buggy-Zubehör',
    category: 'Kinderwagen Zubehör',
    primaryImage: 'public/travel-product-images/buggy-reisen-liegefunktion.webp',
    secondaryImage: 'public/travel-product-images/buggy-organizer-getraenkehalter.webp',
    accent: palette.blue
  },
  {
    pinNumber: 15,
    file: '15-kinderwagen-organizer-packen.png',
    boardName: 'Kinderwagen Zubehör',
    title: 'Kinderwagen-Organizer: Was gehört rein?',
    overlayLines: ['Kinderwagen-', 'Organizer', 'packen'],
    description:
      'Ein Kinderwagen-Organizer kann kurze Wege im Urlaub leichter machen. Hier findest du Ideen für Feuchttücher, Trinkflasche, Snacks und kleine Dinge, die griffbereit sein sollen. #kinderwagenzubehör',
    targetUrl: `${siteUrl}/kinderwagen-zubehoer/`,
    keywords: ['Kinderwagen Organizer', 'Buggy Organizer', 'Kinderwagen Zubehör', 'Urlaub mit Baby'],
    hashtags: ['#kinderwagenzubehör'],
    altText: 'Pinterest Pin Kinderwagen-Organizer packen mit Organizer, Flasche und Feuchttüchern',
    category: 'Kinderwagen Zubehör',
    primaryImage: 'public/product-images/kinderwagen-organizer.webp',
    secondaryImage: 'public/travel-product-images/kinderwagen-getraenkehalter.webp',
    accent: palette.sage
  },
  {
    pinNumber: 16,
    file: '16-baby-im-hotel-schlafen-wickeln-flaeschchen.png',
    boardName: 'Baby im Hotel',
    title: 'Baby im Hotel: Schlafen, Wickeln, Fläschchen',
    overlayLines: ['Baby im', 'Hotel:', 'ruhiger starten'],
    description:
      'Hotelzimmer mit Baby brauchen oft nur ein paar gute Vorbereitungen. Der Ratgeber hilft bei Schlafplatz, Wickeln, Fläschchen und kleinen Nacht-Helfern. #babyimhotel #urlaubmitbaby',
    targetUrl: `${siteUrl}/hotel-mit-baby/`,
    keywords: ['Baby im Hotel', 'Hotel mit Baby', 'Reisebett Baby', 'Flaschenwärmer Reise'],
    hashtags: ['#babyimhotel', '#urlaubmitbaby'],
    altText: 'Pinterest Pin Baby im Hotel mit Reisebett, Nachtlicht und Flaschenwärmer',
    category: 'Baby im Hotel',
    primaryImage: 'public/category-images/hotel-mit-baby.webp',
    secondaryImage: 'public/product-images/reisebett.webp',
    accent: palette.coral
  },
  {
    pinNumber: 17,
    file: '17-hotelzimmer-mit-baby-vorbereiten.png',
    boardName: 'Baby im Hotel',
    title: 'Hotelzimmer mit Baby vorbereiten',
    overlayLines: ['Hotelzimmer', 'mit Baby', 'vorbereiten'],
    description:
      'Ein fremdes Zimmer kann mit Baby ungewohnt sein. Diese Tipps helfen dir, Schlafen, Wickeln und nächtliche Wege im Hotelzimmer einfacher zu organisieren. #babyimhotel #babyreise',
    targetUrl: `${siteUrl}/ratgeber/baby-im-hotel/`,
    keywords: ['Hotelzimmer mit Baby', 'Baby im Hotel', 'Reisen mit Baby', 'Nachtlicht Baby'],
    hashtags: ['#babyimhotel', '#babyreise'],
    altText: 'Pinterest Pin Hotelzimmer mit Baby vorbereiten mit ruhigem Hotel- und Babyzimmermotiv',
    category: 'Baby im Hotel',
    primaryImage: 'public/article-images/baby-im-hotel.webp',
    secondaryImage: 'public/product-images/nachtlicht-hotel.webp',
    accent: palette.blue
  },
  {
    pinNumber: 18,
    file: '18-reisebett-oder-hotelbett.png',
    boardName: 'Baby im Hotel',
    title: 'Reisebett oder Hotelbett?',
    overlayLines: ['Reisebett', 'oder', 'Hotelbett?'],
    description:
      'Reisebett oder Hotelbett: Was passt besser zu deiner Reise? Der Ratgeber zeigt Vor- und Nachteile, worauf du achten kannst und was Eltern vorab klären sollten. #babyimhotel #reisebett',
    targetUrl: `${siteUrl}/ratgeber/reisebett-oder-hotelbett-was-ist-besser/`,
    keywords: ['Reisebett Baby', 'Hotelbett Baby', 'Baby im Hotel', 'Schlafen im Urlaub'],
    hashtags: ['#babyimhotel', '#reisebett'],
    altText: 'Pinterest Pin Reisebett oder Hotelbett mit Baby-Reisebett auf hellem Hintergrund',
    category: 'Baby im Hotel',
    primaryImage: 'public/travel-product-images/reisebett-baby-kompakt.webp',
    secondaryImage: 'public/travel-product-images/reisebett-matratze-faltbar.webp',
    accent: palette.sage
  },
  {
    pinNumber: 19,
    file: '19-reiseapotheke-baby-basics.png',
    boardName: 'Reiseapotheke Baby',
    title: 'Reiseapotheke Baby: die wichtigsten Basics',
    overlayLines: ['Reiseapotheke', 'Baby:', 'Basics'],
    description:
      'Welche Basics können in die Baby-Reiseapotheke? Diese Übersicht gibt Eltern Orientierung für Urlaub und Flugreise, ohne medizinische Beratung zu ersetzen. #reiseapotheke #babyreise',
    targetUrl: `${siteUrl}/ratgeber/reiseapotheke-baby-kind/`,
    keywords: ['Reiseapotheke Baby', 'Baby Reiseapotheke', 'Urlaub mit Baby', 'Fieberthermometer Reise'],
    hashtags: ['#reiseapotheke', '#babyreise'],
    altText: 'Pinterest Pin Reiseapotheke Baby Basics mit Organizer und Thermometer',
    category: 'Reiseapotheke Baby',
    primaryImage: 'public/travel-product-images/reiseapotheke-organizer-baby.webp',
    secondaryImage: 'public/travel-product-images/fieberthermometer-reise.webp',
    accent: palette.coral
  },
  {
    pinNumber: 20,
    file: '20-fieber-pflaster-thermometer-einpacken.png',
    boardName: 'Reiseapotheke Baby',
    title: 'Fieber, Pflaster, Thermometer: was einpacken?',
    overlayLines: ['Fieber,', 'Pflaster,', 'Thermometer'],
    description:
      'Vor dem Urlaub lohnt sich ein Blick in die Reiseapotheke. Hier findest du praktische Basics wie Thermometer, Pflaster und Organizer sowie Hinweise, was du selbst prüfen solltest. #reiseapotheke',
    targetUrl: `${siteUrl}/ratgeber/baby-reiseapotheke/`,
    keywords: ['Fieberthermometer Reise', 'Pflaster Urlaub Baby', 'Reiseapotheke Kind', 'Baby Urlaub'],
    hashtags: ['#reiseapotheke'],
    altText: 'Pinterest Pin Fieber Pflaster Thermometer mit neutralem Reiseapotheken-Zubehör',
    category: 'Reiseapotheke Baby',
    primaryImage: 'public/article-images/baby-reiseapotheke.webp',
    secondaryImage: 'public/product-images/kleine-reiseapotheke-box.webp',
    accent: palette.blue
  },
  {
    pinNumber: 21,
    file: '21-baby-reiseapotheke-flug-urlaub.png',
    boardName: 'Reiseapotheke Baby',
    title: 'Baby-Reiseapotheke für Flug und Urlaub',
    overlayLines: ['Baby-', 'Reiseapotheke', 'für Urlaub'],
    description:
      'Für Flug und Urlaub kann eine kleine Baby-Reiseapotheke Sicherheit im Alltag geben. Der Ratgeber zeigt sinnvolle Kategorien und was Eltern vor Reisebeginn klären sollten. #babyreise #reiseapotheke',
    targetUrl: `${siteUrl}/ratgeber/reiseapotheke-baby-kind/`,
    keywords: ['Baby Reiseapotheke Flug', 'Urlaub mit Baby', 'Reiseapotheke Baby', 'Packliste Baby'],
    hashtags: ['#babyreise', '#reiseapotheke'],
    altText: 'Pinterest Pin Baby-Reiseapotheke für Flug und Urlaub mit Reiseapotheken-Organizer',
    category: 'Reiseapotheke Baby',
    primaryImage: 'public/product-images/kleine-reiseapotheke-box.webp',
    secondaryImage: 'public/travel-product-images/dokumentenhuelle-wasserdicht.webp',
    accent: palette.sage
  }
];

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

async function roundedImageBuffer(file, width, height, radius = 36) {
  const image = await sharp(file).resize(width, height, { fit: 'cover', position: 'center' }).png().toBuffer();
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  );
  return sharp(image).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

function pinBackgroundSvg() {
  return Buffer.from(`
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#fff8ed"/>
        <stop offset="0.55" stop-color="#edf6f3"/>
        <stop offset="1" stop-color="#fbe8df"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="#23464a" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect width="1000" height="1500" fill="url(#bg)"/>
    <circle cx="870" cy="168" r="92" fill="#f2b19b" opacity=".34"/>
    <circle cx="112" cy="672" r="76" fill="#9fc6d8" opacity=".34"/>
    <rect x="70" y="66" width="860" height="666" rx="46" fill="#fffaf2" filter="url(#shadow)"/>
    <rect x="604" y="564" width="286" height="220" rx="34" fill="#fffaf2" filter="url(#shadow)"/>
    <rect x="70" y="810" width="860" height="520" rx="46" fill="#fffaf2" opacity=".97" filter="url(#shadow)"/>
  </svg>`);
}

function pinTextSvg(pin) {
  const lines = pin.overlayLines.map(escapeXml);
  const titleStart = lines.length === 3 ? 965 : 945;
  const lineHeight = lines.length === 3 ? 82 : 92;
  const fontSize = lines.length === 3 ? 70 : 76;
  const titleLines = lines
    .map(
      (line, index) =>
        `<text x="98" y="${titleStart + index * lineHeight}" class="headline">${line}</text>`
    )
    .join('');

  return Buffer.from(`
  <svg width="1000" height="1500" viewBox="0 0 1000 1500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .brand { font-family: Arial, Helvetica, sans-serif; font-size: 31px; font-weight: 700; letter-spacing: .06em; fill: #476469; }
        .eyebrow { font-family: Arial, Helvetica, sans-serif; font-size: 31px; font-weight: 700; letter-spacing: .08em; fill: ${pin.accent}; text-transform: uppercase; }
        .headline { font-family: Georgia, 'Times New Roman', serif; font-size: ${fontSize}px; font-weight: 700; fill: #243d43; }
        .sub { font-family: Arial, Helvetica, sans-serif; font-size: 31px; font-weight: 600; fill: #5d7275; }
      </style>
    </defs>
    <rect x="98" y="846" width="132" height="8" rx="4" fill="${pin.accent}"/>
    <text x="98" y="885" class="eyebrow">${escapeXml(pin.boardName)}</text>
    ${titleLines}
    <text x="98" y="1254" class="sub">Ratgeber &amp; Checklisten für Eltern</text>
    <text x="98" y="1410" class="brand">BabyReiseHelfer</text>
    <circle cx="857" cy="1397" r="39" fill="${pin.accent}" opacity=".92"/>
    <path d="M838 1397h38M858 1377v40" stroke="#fffaf2" stroke-width="8" stroke-linecap="round"/>
  </svg>`);
}

async function createPin(pin) {
  const width = 1000;
  const height = 1500;
  const base = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: palette.cream
    }
  });

  const primary = await roundedImageBuffer(pin.primaryImage, 860, 666, 46);
  const secondary = await roundedImageBuffer(pin.secondaryImage, 286, 220, 34);
  const background = pinBackgroundSvg();
  const text = pinTextSvg(pin);

  await base
    .composite([
      { input: background, left: 0, top: 0 },
      { input: primary, left: 70, top: 66 },
      { input: secondary, left: 604, top: 564 },
      { input: text, left: 0, top: 0 }
    ])
    .png({ quality: 96, compressionLevel: 9 })
    .toFile(path.join(outDir, pin.file));
}

function createMarkdown() {
  return [
    '# Manuelle Pinterest-Pins für BabyReiseHelfer',
    '',
    'Status: ready_for_manual_upload',
    '',
    ...pins.map((pin) =>
      [
        `## ${pin.pinNumber}. ${pin.title}`,
        '',
        `- Bild: \`public/pinterest/manual-pins/${pin.file}\``,
        `- Pinnwand: ${pin.boardName}`,
        `- Ziel-URL: ${pin.targetUrl}`,
        `- Beschreibung: ${pin.description}`,
        `- Keywords: ${pin.keywords.join(', ')}`,
        `- Hashtags: ${pin.hashtags.join(' ')}`,
        `- Alt-Text: ${pin.altText}`,
        '- Status: ready_for_manual_upload',
        ''
      ].join('\n')
    )
  ].join('\n');
}

function createCsv() {
  const header = [
    'pinNumber',
    'imageFile',
    'title',
    'description',
    'targetUrl',
    'boardName',
    'keywords',
    'hashtags',
    'altText',
    'status'
  ];
  const rows = pins.map((pin) => [
    pin.pinNumber,
    `public/pinterest/manual-pins/${pin.file}`,
    pin.title,
    pin.description,
    pin.targetUrl,
    pin.boardName,
    pin.keywords.join('; '),
    pin.hashtags.join(' '),
    pin.altText,
    'ready_for_manual_upload'
  ]);
  return [header, ...rows].map((row) => row.map(csvEscape).join(',')).join('\n') + '\n';
}

function createGuide() {
  return `# Manuelle Pinterest-Uploads

Diese Pins sind für das Pinterest-Profil **BabyReiseHelfer** vorbereitet. Es wird nichts automatisch veröffentlicht und es werden keine API-Tokens benötigt.

## So lädst du einen Pin hoch

1. Öffne Pinterest und melde dich im Profil **BabyReiseHelfer** an.
2. Klicke auf **Erstellen** und dann auf **Pin**.
3. Lade das passende Bild aus \`public/pinterest/manual-pins/\` hoch.
4. Kopiere den Titel aus \`marketing/pinterest/manual-upload-pins.md\`.
5. Kopiere die Beschreibung.
6. Füge den Ziel-Link ein.
7. Wähle die vorgeschlagene Pinnwand aus.
8. Prüfe das Bild noch einmal in der Vorschau und veröffentliche den Pin.
9. Optional: Setze den Status in CSV oder Markdown von \`ready_for_manual_upload\` auf \`uploaded\`.

## Wichtige Regeln

- Keine direkten Amazon-Affiliate-Links pinnen.
- Nur BabyReiseHelfer-Seiten als Ziel-URL nutzen.
- Keine Amazon-Bilder, Preise, Sternebewertungen oder Rezensionen übernehmen.
- Pins vor dem Veröffentlichen kurz manuell prüfen.
- Pro Tag lieber wenige gute Pins veröffentlichen als viele ähnliche Pins auf einmal.
`;
}

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(marketingDir, { recursive: true });

for (const pin of pins) {
  await createPin(pin);
}

await fs.writeFile(path.join(marketingDir, 'manual-upload-pins.csv'), createCsv());
await fs.writeFile(path.join(marketingDir, 'manual-upload-pins.md'), createMarkdown());
await fs.writeFile(path.join(marketingDir, 'manual-upload-anleitung.md'), createGuide());

console.log(`Generated ${pins.length} manual Pinterest pins.`);
