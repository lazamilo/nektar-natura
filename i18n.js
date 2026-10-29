/* Nektar Natura — translations (SL lives in the HTML; EN/DE here) */
window.I18N = (() => {
  const LANGS = ['sl', 'en', 'de'];
  const KEY = 'nn-lang';

  /* ---------- Page text (keys match data-i18n in index.html) ---------- */
  const PAGE = {
    en: {
      'meta.title': 'Nektar Natura — Drinks that flow 24/7',
      'meta.desc': 'Complete beverage dispensing solutions for hotels, cruise ships, restaurants and casinos. Dispensing systems, 200+ flavours, 24/7 service. Since 1995.',
      'nav.aria': 'Main navigation', 'nav.lang': 'Language', 'nav.menu': 'Menu', 'nav.basketAria': 'Open inquiry',
      'nav.systems': 'Systems', 'nav.drinks': 'Drinks', 'nav.service': 'Service', 'nav.sustain': 'Sustainability', 'nav.about': 'About',
      'nav.basket': 'Inquiry',
      'menu.systems': 'Dispensing systems', 'menu.service': 'Service &amp; support', 'menu.contact': 'Contact',
      'hero.alt': 'Fresh orange juice pouring from a smart tap into a crystal glass',
      'hero.l1': '<span>Guests</span> <em>delighted.</em>',
      'hero.l2': '<span>Operations</span> <em>seamless.</em>',
      'hero.l3': '<span>Drinks flowing</span> <span class="hero__247">24/7</span>',
      'hero.lead': 'Smart dispensing systems, more than 200 flavours and technical support that never sleeps. For hotels, cruise ships, restaurants and casinos in more than 40 countries.',
      'hero.cta1': 'Request a quote', 'hero.cta2': 'Explore systems', 'hero.scroll': 'Scroll',
      'manifesto.eyebrow': 'A complete solution',
      'manifesto.text': 'Beverage management <span class="pill"><img src="assets/thumbs/iqtap.jpg" alt=""></span> should be simple. Quality <span class="pill"><img src="assets/thumbs/fruit.jpg" alt=""></span> consistent. Downtime minimal. Leaving you more time for what <span class="pill"><img src="assets/thumbs/granita.jpg" alt=""></span> matters <em>unforgettable moments for your guests.</em>',
      'pillars.aria': 'Four pillars', 'pillars.eyebrow': 'How we do it',
      'pillars.title': 'Four pillars.<br><em>One solution.</em>', 'pillars.prev': 'Previous pillar', 'pillars.next': 'Next pillar',
      'pf1': '10 models', 'pf2': '200+ flavours', 'pf3': '24/7 support', 'pf4': 'CDP rating B',
      'p1.text': 'Advanced systems built for busy hospitality venues. Cost control, less waste, a perfect drink in every glass.', 'p1.link': 'Systems <i>→</i>',
      'p2.text': 'More than 200 flavours — from 100% fruit juices to lemonades and cocktail bases. As fresh as if just squeezed.', 'p2.link': 'Flavours <i>→</i>',
      'p3.text': 'Forget about downtime. Fast support and regular maintenance — 24 hours a day, 7 days a week.', 'p3.link': 'Support <i>→</i>',
      'p4.text': 'Less packaging, less CO₂. Circularity, digital transformation and responsible practices at every step.', 'p4.link': 'Commitments <i>→</i>',
      'sys.eyebrow': 'Dispensing systems · 10 models', 'sys.title': 'The right system<br><em>for every counter.</em>',
      'sys.filterAria': 'Filter by venue', 'sys.listAria': 'List of systems', 'sys.all': 'All',
      'venue.hotel': 'Hotel', 'venue.restaurant': 'Restaurant', 'venue.cruise': 'Cruise ship', 'venue.casino': 'Casino', 'venue.event': 'Events',
      'sys.featEyebrow': 'New · Award-winning',
      'sys.featText': 'The smart dispensing system that won the Red Dot 2026 award for product design. Four sparkling and four still drinks, water and soda — from one elegant tap.',
      'sys.featDrinks': '4 + 4 + water',
      'spec.drinks': 'Drinks', 'spec.cooling': 'Cooling', 'spec.form': 'Installation', 'spec.support': 'Support', 'form.counter': 'Countertop',
      'btn.add': 'Add to inquiry', 'btn.specs': 'Specifications', 'btn.close': 'Close',
      'drinks.title': 'Pour <em>the best.</em>',
      'drinks.tabsAria': 'Drink categories', 'drinks.still': 'Still', 'drinks.sparkling': 'Sparkling', 'drinks.cocktail': 'Cocktail bases', 'drinks.frozen': 'Granitas',
      'drinks.add': 'Add category to inquiry',
      'stats.eyebrow': 'Thank you for believing in our global vision',
      'stats.clients': 'clients', 'stats.years': 'years in business', 'stats.countries': 'countries', 'stats.devices': 'installed devices',
      'stats.story': 'From a simple idea in 1995 to thirty years of continuous development. Family values, Slovenian roots, global reach — today among the <em>Ambassadors of the Slovenian economy.</em>',
      'venues.eyebrow': 'Where we pour', 'venues.title': 'From hotel breakfast<br>to <em>sunset at sea.</em>',
      'venues.hotel': '<span>Hotel</span> A breakfast that runs itself.',
      'venues.cruise': '<span>Cruise ship</span> Solutions for new waters.',
      'venues.bar': '<span>Restaurant &amp; casino</span> Fast, consistent, day and night.',
      'support.1': 'Technical support that always picks up.', 'support.2t': 'Smart assistant', 'support.2': 'Diagnostics and ordering a click away.',
      'support.3t': 'Regular maintenance', 'support.3': 'Preventive service, so downtime never happens.',
      'quotes.aria': 'Client testimonials', 'quotes.eyebrow': 'Testimonials', 'quotes.title': 'Don’t just take <em>our word for it.</em>', 'quotes.sub': 'What hoteliers and F&amp;B managers who pour with us every day have to say.',
      'q1h': 'Same taste in every glass.', 'q2h': 'More time for guests.',
      'q1': '“Consistent taste in every glass, fast order delivery, strong technical support and a design that meets today’s aesthetic standards.”',
      'q2': '“They reduced the time staff spend refilling and managing drink stock, so the team can focus on more important tasks.”',
      'q3': '“Introducing Silver Premium Orange was a real hit — guest feedback was outstanding.”', 'q3r': 'Head of Purchasing',
      'q4': '“We save storage space, costs and staff time — and we have a reliable partner with stable prices.”', 'q4r': 'General Manager',
      'sustain.eyebrow': 'Sustainability, tailored to you', 'sustain.title': 'Less packaging.<br>Less CO₂.<br><em>More nature.</em>',
      'sustain.cdp': 'Confirmation of our sustainability commitment',
      'sustain.lca': 'A lower carbon footprint for every drink served',
      'sustain.ifs': 'Certified food safety standard',
      'sustain.text': 'Our sustainability strategy prioritises circularity, digital transformation and responsible practices — for more advanced, greener solutions.',
      'sustain.link': 'Our commitments <i>→</i>',
      'sustain.cdpT': 'CDP rating', 'sustain.lcaT': 'Life-cycle assessment', 'sustain.ifsT': 'IFS Progress',
      'news.title': 'Discover <em>the latest</em>', 'news.all': 'All news <i>→</i>',
      'n1.meta': '05. 06. 26 · News', 'n1.title': 'IQ Tap wins the Red Dot 2026 award for product design',
      'n2.meta': '19. 09. 25 · News', 'n2.title': 'Summer in a glass: fresh Lemonade flavours',
      'n3.meta': '27. 06. 25 · News', 'n3.title': 'Setting sail: innovative solutions for cruise lines',
      'contact.title': 'Shall we pour<br><em>together?</em>',
      'contact.text': 'Tell us about your venue — within one working day we’ll propose a tailored system, flavours and service plan.',
      'contact.picked': 'Your selection',
      'f.name': 'Full name *', 'f.company': 'Company / venue *', 'f.email': 'Email *', 'f.phone': 'Phone', 'f.venue': 'Venue type',
      'f.guests': 'Guests per day:', 'f.message': 'Message', 'f.consent': 'I agree to the processing of my personal data for the purpose of preparing a quote. *',
      'f.submit': 'Send inquiry',
      'done.thanks': 'Thank you,', 'done.text': 'Your inquiry is ready. Our team will get back to you within one working day.', 'done.mail': 'Also send by email',
      'footer.tag': 'From a simple idea to 30 years of growth.<br>Slovenia → the world.', 'footer.aria': 'Footer',
      'footer.careers': 'Careers', 'footer.news': 'News', 'footer.privacy': 'Privacy &amp; cookies', 'footer.top': 'Back to top ↑',
      'basket.eyebrow': 'Your inquiry', 'basket.title': 'Selection', 'basket.empty': 'Nothing selected yet. Add systems or drink categories.', 'basket.cta': 'Continue to inquiry'
    },
    de: {
      'meta.title': 'Nektar Natura — Getränke, die rund um die Uhr fließen',
      'meta.desc': 'Ganzheitliche Getränke-Dosierlösungen für Hotels, Kreuzfahrtschiffe, Restaurants und Casinos. Dosiersysteme, über 200 Sorten, Service rund um die Uhr. Seit 1995.',
      'nav.aria': 'Hauptnavigation', 'nav.lang': 'Sprache', 'nav.menu': 'Menü', 'nav.basketAria': 'Anfrage öffnen',
      'nav.systems': 'Systeme', 'nav.drinks': 'Getränke', 'nav.service': 'Service', 'nav.sustain': 'Nachhaltigkeit', 'nav.about': 'Über uns',
      'nav.basket': 'Anfrage',
      'menu.systems': 'Dosiersysteme', 'menu.service': 'Service &amp; Support', 'menu.contact': 'Kontakt',
      'hero.alt': 'Frischer Orangensaft fließt aus einem smarten Zapfhahn in ein Kristallglas',
      'hero.l1': '<span>Gäste</span> <em>begeistert.</em>',
      'hero.l2': '<span>Betrieb</span> <em>reibungslos.</em>',
      'hero.l3': '<span>Getränke fließen</span> <span class="hero__247">24/7</span>',
      'hero.lead': 'Smarte Dosiersysteme, über 200 Sorten und ein technischer Support, der nie schläft. Für Hotels, Kreuzfahrtschiffe, Restaurants und Casinos in mehr als 40 Ländern.',
      'hero.cta1': 'Angebot anfordern', 'hero.cta2': 'Systeme entdecken', 'hero.scroll': 'Scrollen',
      'manifesto.eyebrow': 'Eine Gesamtlösung',
      'manifesto.text': 'Getränkemanagement <span class="pill"><img src="assets/thumbs/iqtap.jpg" alt=""></span> soll einfach sein. Die Qualität <span class="pill"><img src="assets/thumbs/fruit.jpg" alt=""></span> konstant. Ausfälle minimal. So bleibt mehr Zeit für das, was <span class="pill"><img src="assets/thumbs/granita.jpg" alt=""></span> zählt <em>unvergessliche Momente für Ihre Gäste.</em>',
      'pillars.aria': 'Vier Säulen', 'pillars.eyebrow': 'So erreichen wir das',
      'pillars.title': 'Vier Säulen.<br><em>Eine Lösung.</em>', 'pillars.prev': 'Vorherige Säule', 'pillars.next': 'Nächste Säule',
      'pf1': '10 Modelle', 'pf2': '200+ Sorten', 'pf3': 'Support rund um die Uhr', 'pf4': 'CDP-Rating B',
      'p1.text': 'Fortschrittliche Systeme für lebhafte Gastronomiebetriebe. Kostenkontrolle, weniger Abfall, ein perfektes Getränk in jedem Glas.', 'p1.link': 'Systeme <i>→</i>',
      'p2.text': 'Über 200 Sorten — von 100 % Fruchtsäften bis zu Limonaden und Cocktailbasen. So frisch, als wären sie gerade gepresst.', 'p2.link': 'Sorten <i>→</i>',
      'p3.text': 'Vergessen Sie Ausfälle. Schneller Support und regelmäßige Wartung — 24 Stunden am Tag, 7 Tage die Woche.', 'p3.link': 'Support <i>→</i>',
      'p4.text': 'Weniger Verpackung, weniger CO₂. Kreislaufwirtschaft, digitale Transformation und verantwortungsvolles Handeln bei jedem Schritt.', 'p4.link': 'Verpflichtungen <i>→</i>',
      'sys.eyebrow': 'Dosiersysteme · 10 Modelle', 'sys.title': 'Für jede Theke<br><em>das richtige System.</em>',
      'sys.filterAria': 'Nach Einsatzort filtern', 'sys.listAria': 'Liste der Systeme', 'sys.all': 'Alle',
      'venue.hotel': 'Hotel', 'venue.restaurant': 'Restaurant', 'venue.cruise': 'Kreuzfahrt', 'venue.casino': 'Casino', 'venue.event': 'Events',
      'sys.featEyebrow': 'Neu · Ausgezeichnet',
      'sys.featText': 'Das smarte Dosiersystem, ausgezeichnet mit dem Red Dot 2026 für Produktdesign. Vier kohlensäurehaltige und vier stille Getränke, Wasser und Soda — aus einem eleganten Zapfhahn.',
      'sys.featDrinks': '4 + 4 + Wasser',
      'spec.drinks': 'Getränke', 'spec.cooling': 'Kühlung', 'spec.form': 'Aufstellung', 'spec.support': 'Support', 'form.counter': 'Auftisch',
      'btn.add': 'Zur Anfrage hinzufügen', 'btn.specs': 'Technische Daten', 'btn.close': 'Schließen',
      'drinks.title': 'Schenken Sie <em>das Beste aus.</em>',
      'drinks.tabsAria': 'Getränkekategorien', 'drinks.still': 'Still', 'drinks.sparkling': 'Spritzig', 'drinks.cocktail': 'Cocktailbasen', 'drinks.frozen': 'Granita',
      'drinks.add': 'Kategorie zur Anfrage hinzufügen',
      'stats.eyebrow': 'Danke, dass Sie an unsere globale Vision glauben',
      'stats.clients': 'Kunden', 'stats.years': 'Jahre Erfahrung', 'stats.countries': 'Länder', 'stats.devices': 'installierte Geräte',
      'stats.story': 'Von einer einfachen Idee im Jahr 1995 zu dreißig Jahren kontinuierlicher Entwicklung. Familienwerte, slowenische Wurzeln, globale Reichweite — heute unter den <em>Botschaftern der slowenischen Wirtschaft.</em>',
      'venues.eyebrow': 'Wo wir ausschenken', 'venues.title': 'Vom Hotelfrühstück<br>bis zum <em>Sonnenuntergang auf See.</em>',
      'venues.hotel': '<span>Hotel</span> Ein Frühstück, das von selbst läuft.',
      'venues.cruise': '<span>Kreuzfahrt</span> Lösungen für neue Gewässer.',
      'venues.bar': '<span>Restaurant &amp; Casino</span> Schnell, konstant, Tag und Nacht.',
      'support.1': 'Technischer Support, der immer abnimmt.', 'support.2t': 'Smart-Assistent', 'support.2': 'Diagnose und Bestellung mit einem Klick.',
      'support.3t': 'Regelmäßige Wartung', 'support.3': 'Vorbeugender Service, damit es gar nicht erst zu Ausfällen kommt.',
      'quotes.aria': 'Kundenstimmen', 'quotes.eyebrow': 'Kundenstimmen', 'quotes.title': 'Glauben Sie <em>nicht nur uns.</em>', 'quotes.sub': 'Was Hoteliers und F&amp;B-Manager sagen, die jeden Tag mit uns ausschenken.',
      'q1h': 'Gleicher Geschmack in jedem Glas.', 'q2h': 'Mehr Zeit für Gäste.',
      'q1': '„Gleichbleibender Geschmack in jedem Glas, schnelle Lieferung, starker technischer Support und ein Design, das heutigen ästhetischen Ansprüchen entspricht.“',
      'q2': '„Sie haben die Zeit verkürzt, die das Personal für das Nachfüllen und die Lagerverwaltung aufwendet, sodass es sich auf Wichtigeres konzentrieren kann.“',
      'q3': '„Die Einführung von Silver Premium Orange war ein echter Hit — die Rückmeldungen der Gäste waren hervorragend.“', 'q3r': 'Leiter Einkauf',
      'q4': '„Wir sparen Lagerfläche, Kosten und Personalzeit — und haben einen zuverlässigen Partner mit stabilen Preisen.“', 'q4r': 'Geschäftsführer',
      'sustain.eyebrow': 'Nachhaltigkeit nach Maß', 'sustain.title': 'Weniger Verpackung.<br>Weniger CO₂.<br><em>Mehr Natur.</em>',
      'sustain.cdp': 'Bestätigung unseres Nachhaltigkeitsversprechens',
      'sustain.lca': 'Ein geringerer CO₂-Fußabdruck für jedes ausgeschenkte Getränk',
      'sustain.ifs': 'Zertifizierter Lebensmittelsicherheitsstandard',
      'sustain.text': 'Unsere Nachhaltigkeitsstrategie setzt auf Kreislaufwirtschaft, digitale Transformation und verantwortungsvolles Handeln — für fortschrittlichere, umweltfreundlichere Lösungen.',
      'sustain.link': 'Unsere Verpflichtungen <i>→</i>',
      'sustain.cdpT': 'CDP-Rating', 'sustain.lcaT': 'Ökobilanz', 'sustain.ifsT': 'IFS Progress',
      'news.title': 'Entdecken Sie <em>das Neueste</em>', 'news.all': 'Alle Neuigkeiten <i>→</i>',
      'n1.meta': '05. 06. 26 · Neuigkeiten', 'n1.title': 'IQ Tap erhält den Red Dot 2026 für Produktdesign',
      'n2.meta': '19. 09. 25 · Neuigkeiten', 'n2.title': 'Sommer im Glas: frische Lemonade-Sorten',
      'n3.meta': '27. 06. 25 · Neuigkeiten', 'n3.title': 'Neue Horizonte auf See: innovative Lösungen für Kreuzfahrtlinien',
      'contact.title': 'Schenken wir<br><em>gemeinsam ein?</em>',
      'contact.text': 'Erzählen Sie uns von Ihrem Betrieb — innerhalb eines Werktages schlagen wir System, Sorten und Service nach Maß vor.',
      'contact.picked': 'Ihre Auswahl',
      'f.name': 'Vor- und Nachname *', 'f.company': 'Unternehmen / Betrieb *', 'f.email': 'E-Mail *', 'f.phone': 'Telefon', 'f.venue': 'Art des Betriebs',
      'f.guests': 'Gäste pro Tag:', 'f.message': 'Nachricht', 'f.consent': 'Ich stimme der Verarbeitung meiner personenbezogenen Daten zur Erstellung eines Angebots zu. *',
      'f.submit': 'Anfrage senden',
      'done.thanks': 'Danke,', 'done.text': 'Ihre Anfrage ist bereit. Unser Team meldet sich innerhalb eines Werktages bei Ihnen.', 'done.mail': 'Auch per E-Mail senden',
      'footer.tag': 'Von einer einfachen Idee zu 30 Jahren Entwicklung.<br>Slowenien → die Welt.', 'footer.aria': 'Fußzeile',
      'footer.careers': 'Karriere', 'footer.news': 'Neuigkeiten', 'footer.privacy': 'Datenschutz &amp; Cookies', 'footer.top': 'Nach oben ↑',
      'basket.eyebrow': 'Ihre Anfrage', 'basket.title': 'Auswahl', 'basket.empty': 'Noch nichts ausgewählt. Fügen Sie Systeme oder Getränkekategorien hinzu.', 'basket.cta': 'Weiter zur Anfrage'
    }
  };

  /* ---------- Links to the matching language on the live site ---------- */
  const HREFS = {
    sl: { sustain: 'https://www.nektarnatura.com/sl/trajnost/', news: 'https://www.nektarnatura.com/sl/novice/', careers: 'https://www.nektarnatura.com/sl/careers/', privacy: 'https://www.nektarnatura.com/sl/pravilnik-o-zasebnosti-in-piskotki/' },
    en: { sustain: 'https://www.nektarnatura.com/sustainability/', news: 'https://www.nektarnatura.com/news/', careers: 'https://www.nektarnatura.com/careers/', privacy: 'https://www.nektarnatura.com/privacy-policy-and-cookies/' },
    de: { sustain: 'https://www.nektarnatura.com/de/nachhaltigkeit/', news: 'https://www.nektarnatura.com/de/nachricht/', careers: 'https://www.nektarnatura.com/de/careers/', privacy: 'https://www.nektarnatura.com/de/datenschutzerklaerung-und-cookies/' }
  };

  /* ---------- Strings used by app.js ---------- */
  const UI = {
    sl: {
      added: n => `${n} dodano v povpraševanje`, already: n => `${n} je že v povpraševanju`,
      kindSystem: 'Sistem', kindDrink: 'Pijače', remove: n => `Odstrani ${n}`, add: n => `Dodaj ${n} v povpraševanje`, details: n => `${n} — podrobnosti`,
      pickedEmpty: 'Še nič izbranega — dodajte sisteme ali pijače',
      errFields: 'Prosimo, izpolnite označena polja z veljavnimi podatki.', errConsent: 'Za pripravo ponudbe potrebujemo vaše soglasje.',
      errSend: 'Pošiljanje ni uspelo. Pišite nam na hello@nektarnatura.com.', sending: 'Pošiljam …',
      mailSubject: 'Povpraševanje', mail: { name: 'Ime', company: 'Podjetje', email: 'E-pošta', phone: 'Telefon', venue: 'Tip objekta', guests: 'Dnevno gostov', items: 'Izbor' },
      cursorOpen: 'Odpri', cursorRead: 'Beri', locale: 'sl-SI'
    },
    en: {
      added: n => `${n} added to inquiry`, already: n => `${n} is already in your inquiry`,
      kindSystem: 'System', kindDrink: 'Drinks', remove: n => `Remove ${n}`, add: n => `Add ${n} to inquiry`, details: n => `${n} — details`,
      pickedEmpty: 'Nothing selected yet — add systems or drinks',
      errFields: 'Please fill in the highlighted fields with valid details.', errConsent: 'We need your consent to prepare a quote.',
      errSend: 'Sending failed. Please email us at hello@nektarnatura.com.', sending: 'Sending …',
      mailSubject: 'Inquiry', mail: { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', venue: 'Venue type', guests: 'Guests per day', items: 'Selection' },
      cursorOpen: 'Open', cursorRead: 'Read', locale: 'en-GB'
    },
    de: {
      added: n => `${n} zur Anfrage hinzugefügt`, already: n => `${n} ist bereits in Ihrer Anfrage`,
      kindSystem: 'System', kindDrink: 'Getränke', remove: n => `${n} entfernen`, add: n => `${n} zur Anfrage hinzufügen`, details: n => `${n} — Details`,
      pickedEmpty: 'Noch nichts ausgewählt — fügen Sie Systeme oder Getränke hinzu',
      errFields: 'Bitte füllen Sie die markierten Felder mit gültigen Angaben aus.', errConsent: 'Für die Erstellung eines Angebots benötigen wir Ihre Zustimmung.',
      errSend: 'Senden fehlgeschlagen. Schreiben Sie uns an hello@nektarnatura.com.', sending: 'Wird gesendet …',
      mailSubject: 'Anfrage', mail: { name: 'Name', company: 'Unternehmen', email: 'E-Mail', phone: 'Telefon', venue: 'Art des Betriebs', guests: 'Gäste pro Tag', items: 'Auswahl' },
      cursorOpen: 'Öffnen', cursorRead: 'Lesen', locale: 'de-DE'
    }
  };

  const VENUES = {
    sl: { hotel: 'Hotel', restaurant: 'Restavracija', cruise: 'Križarka', casino: 'Igralnica', event: 'Prireditve' },
    en: { hotel: 'Hotel', restaurant: 'Restaurant', cruise: 'Cruise ship', casino: 'Casino', event: 'Events' },
    de: { hotel: 'Hotel', restaurant: 'Restaurant', cruise: 'Kreuzfahrt', casino: 'Casino', event: 'Events' }
  };

  const FORM = { sl: { counter: 'Na pult', floor: 'Prostostoječ' }, en: { counter: 'Countertop', floor: 'Freestanding' }, de: { counter: 'Auftisch', floor: 'Freistehend' } };

  /* ---------- Systems: type, description, drinks ---------- */
  const SYSTEMS = {
    sl: {
      'iq-tap': ['Pametni točilni sistem', 'Nagrajeni pametni sistem z zaslonom na dotik. Gazirane in negazirane pijače, voda in soda iz ene pipe.', '4 gazirane + 4 negazirane, voda, soda'],
      'tower-touch': ['Avtomatski koktajl sistem', 'Do 8 brezalkoholnih ali gaziranih pijač ter 40 alkoholnih pijač ali koktajl baz — na dotik.', 'do 8 + voda, soda, 40 koktajl baz'],
      'tower-simple': ['Večnamenski sistem', 'Večopravilni sistem z upravljanjem na dotik za hitre, natančne porcije.', '8+ pijač, voda, soda'],
      'bar-gun': ['Točilna pištola', 'Kompaktna enota za gazirane pijače — hitrost za najbolj obremenjene šanke.', '6–10 pijač, voda, soda'],
      'konzola': ['Visokozmogljiva enota', 'Za prostore z velikim pretokom gostov: do 12 gaziranih in negaziranih pijač.', '4–12 pijač'],
      'stojnica': ['Brezdotični sistem', 'Prostostoječi sistem za točenje brez dotika — higienično in elegantno na buffetu.', '5 negaziranih'],
      'jm-superior': ['Trookusni sistem', 'Trije okusi in voda v vrhunski izvedbi za hotelske zajtrke.', '3 negazirane + voda'],
      'jm': ['Back-office sistem', 'Zanesljiv delovni konj za zaledje — tri okusi in voda.', '3 negazirane + voda'],
      'autofill': ['Avtomatski sistem', 'Visoka zmogljivost s samodejnim polnjenjem za neprekinjen buffet.', '4 negazirane'],
      'ice': ['Sistem za granite', 'Večokusni sistem za ledene napitke — brez alergenov, odlična alternativa sladoledu.', '2 ali 3 okusi']
    },
    en: {
      'iq-tap': ['Smart dispensing system', 'Award-winning smart system with a touchscreen. Sparkling and still drinks, water and soda from a single tap.', '4 sparkling + 4 still, water, soda'],
      'tower-touch': ['Automatic cocktail dispenser', 'Up to 8 soft or sparkling drinks plus 40 alcoholic drinks or cocktail bases — at a touch.', 'up to 8 + water, soda, 40 cocktail bases'],
      'tower-simple': ['Multi-purpose dispenser', 'A multitasking touch-controlled system for fast, precise portions.', '8+ drinks, water, soda'],
      'bar-gun': ['Bar gun', 'A compact unit for sparkling drinks — speed for the busiest bars.', '6–10 drinks, water, soda'],
      'konzola': ['High-capacity unit', 'For high-traffic venues: up to 12 sparkling and still drinks.', '4–12 drinks'],
      'stojnica': ['Touch-free dispenser', 'A freestanding hands-free system — hygienic and elegant on the buffet.', '5 still drinks'],
      'jm-superior': ['Three-flavour dispenser', 'Three flavours and water in a premium finish for hotel breakfasts.', '3 still + water'],
      'jm': ['Back-office dispenser', 'A reliable workhorse for back of house — three flavours and water.', '3 still + water'],
      'autofill': ['Automatic dispenser', 'High capacity with automatic refilling for a non-stop buffet.', '4 still drinks'],
      'ice': ['Granita dispenser', 'Multi-flavour frozen drink system — allergen-free, a great alternative to ice cream.', '2 or 3 flavours']
    },
    de: {
      'iq-tap': ['Smartes Dosiersystem', 'Preisgekröntes smartes System mit Touchscreen. Spritzige und stille Getränke, Wasser und Soda aus einem Zapfhahn.', '4 spritzig + 4 still, Wasser, Soda'],
      'tower-touch': ['Automatischer Cocktail-Dispenser', 'Bis zu 8 alkoholfreie oder spritzige Getränke sowie 40 alkoholische Getränke oder Cocktailbasen — per Touch.', 'bis zu 8 + Wasser, Soda, 40 Cocktailbasen'],
      'tower-simple': ['Multifunktions-Dispenser', 'Ein vielseitiges System mit Touch-Bedienung für schnelle, präzise Portionen.', '8+ Getränke, Wasser, Soda'],
      'bar-gun': ['Barpistole', 'Kompakte Einheit für spritzige Getränke — Tempo für die vollsten Theken.', '6–10 Getränke, Wasser, Soda'],
      'konzola': ['Hochleistungseinheit', 'Für Betriebe mit hohem Gästeaufkommen: bis zu 12 spritzige und stille Getränke.', '4–12 Getränke'],
      'stojnica': ['Berührungsloser Dispenser', 'Freistehendes System für berührungsloses Zapfen — hygienisch und elegant am Buffet.', '5 stille Getränke'],
      'jm-superior': ['Drei-Sorten-Dispenser', 'Drei Sorten und Wasser in Premium-Ausführung fürs Hotelfrühstück.', '3 still + Wasser'],
      'jm': ['Back-Office-Dispenser', 'Ein zuverlässiges Arbeitstier für den Hintergrund — drei Sorten und Wasser.', '3 still + Wasser'],
      'autofill': ['Automatischer Dispenser', 'Hohe Kapazität mit automatischer Befüllung für ein durchgehendes Buffet.', '4 stille Getränke'],
      'ice': ['Granita-Dispenser', 'System für gefrorene Getränke in mehreren Sorten — allergenfrei, eine tolle Alternative zu Eis.', '2 oder 3 Sorten']
    }
  };

  /* ---------- Drink categories ---------- */
  const DRINKS = {
    sl: {
      still: { title: 'Negazirane pijače', desc: '100-odstotni sadni sokovi, ledeni čaji in limonade z manj kalorijami kot večina sokov.', flavors: ['Pomaranča', 'Jabolko', 'Črni ribez', 'Borovnica', 'Ananas', 'Mango', 'Zeliščni čaj', 'Limeta & bezeg', 'Jabolko & jagoda', 'Limonada limona-rabarbara'], compat: 'Združljivo z vsemi točilnimi sistemi' },
      sparkling: { title: 'Gazirane pijače', desc: 'Osvežujoči mehurčki — tudi v nizkokaloričnih in zero različicah.', flavors: ['Limona', 'Limeta', 'Klasična pomaranča', 'Bitter lemon', 'Tonik', 'Kola', 'Zero'] },
      cocktail: { title: 'Koktajl baze', desc: 'Brezalkoholne baze za neomejeno receptov. Brez alergenov in umetnih sladil.', flavors: ['Piña Colada', 'Sex on the Beach', 'Kokos', 'Meta', 'Banana', 'Limeta', 'Grenadina'] },
      frozen: { title: 'Granite', desc: 'Ledeni užitek za otroke in odrasle. Brez alergenov — idealno za goste z laktozno intoleranco.', flavors: ['Limona', 'Jagoda', 'Melona', 'Malina'] }
    },
    en: {
      still: { title: 'Still drinks', desc: '100% fruit juices, iced teas and lemonades with fewer calories than most juices.', flavors: ['Orange', 'Apple', 'Blackcurrant', 'Blueberry', 'Pineapple', 'Mango', 'Herbal tea', 'Lime & elderflower', 'Apple & strawberry', 'Lemon-rhubarb lemonade'], compat: 'Compatible with all dispensing systems' },
      sparkling: { title: 'Sparkling drinks', desc: 'Refreshing bubbles — also in low-calorie and zero versions.', flavors: ['Lemon', 'Lime', 'Classic orange', 'Bitter lemon', 'Tonic', 'Cola', 'Zero'] },
      cocktail: { title: 'Cocktail bases', desc: 'Alcohol-free bases for unlimited recipes. No allergens, no artificial sweeteners.', flavors: ['Piña Colada', 'Sex on the Beach', 'Coconut', 'Mint', 'Banana', 'Lime', 'Grenadine'] },
      frozen: { title: 'Granitas', desc: 'An icy treat for kids and adults. Allergen-free — ideal for lactose-intolerant guests.', flavors: ['Lemon', 'Strawberry', 'Melon', 'Raspberry'] }
    },
    de: {
      still: { title: 'Stille Getränke', desc: '100 % Fruchtsäfte, Eistees und Limonaden mit weniger Kalorien als die meisten Säfte.', flavors: ['Orange', 'Apfel', 'Schwarze Johannisbeere', 'Heidelbeere', 'Ananas', 'Mango', 'Kräutertee', 'Limette & Holunder', 'Apfel & Erdbeere', 'Zitronen-Rhabarber-Limonade'], compat: 'Mit allen Dosiersystemen kompatibel' },
      sparkling: { title: 'Spritzige Getränke', desc: 'Erfrischende Bläschen — auch kalorienarm und als Zero-Variante.', flavors: ['Zitrone', 'Limette', 'Klassische Orange', 'Bitter Lemon', 'Tonic', 'Cola', 'Zero'] },
      cocktail: { title: 'Cocktailbasen', desc: 'Alkoholfreie Basen für unbegrenzt viele Rezepte. Ohne Allergene und künstliche Süßstoffe.', flavors: ['Piña Colada', 'Sex on the Beach', 'Kokos', 'Minze', 'Banane', 'Limette', 'Grenadine'] },
      frozen: { title: 'Granita', desc: 'Eisiger Genuss für Kinder und Erwachsene. Allergenfrei — ideal für Gäste mit Laktoseintoleranz.', flavors: ['Zitrone', 'Erdbeere', 'Melone', 'Himbeere'] }
    }
  };

  /* ---------- Language detection ---------- */
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  };
  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    const saved = store.get();
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return nav === 'en' || nav === 'de' ? nav : 'sl';
  }

  let lang = detect();
  const originals = new WeakMap();   // element -> { html, attrs: {name: value} }

  function orig(el) {
    if (!originals.has(el)) originals.set(el, { html: el.innerHTML, attrs: {} });
    return originals.get(el);
  }
  const meta = document.querySelector('meta[name="description"]');
  const SL_META = { title: document.title, desc: meta ? meta.content : '' };

  function apply(next, { persist = true } = {}) {
    if (!LANGS.includes(next)) return;
    lang = next;
    const dict = PAGE[lang] || {};
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const o = orig(el);
      el.innerHTML = lang === 'sl' ? o.html : (dict[el.dataset.i18n] ?? o.html);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const o = orig(el);
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!(attr in o.attrs)) o.attrs[attr] = el.getAttribute(attr);
        const val = lang === 'sl' ? o.attrs[attr] : (dict[key] ?? o.attrs[attr]);
        val == null ? el.removeAttribute(attr) : el.setAttribute(attr, val);
      });
    });
    document.querySelectorAll('[data-i18n-href]').forEach(el => { el.href = HREFS[lang][el.dataset.i18nHref]; });

    document.title = lang === 'sl' ? SL_META.title : dict['meta.title'];
    if (meta) meta.content = lang === 'sl' ? SL_META.desc : dict['meta.desc'];

    document.querySelectorAll('.js-lang [data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));

    if (persist) {
      store.set(lang);
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(history.state, '', url);
    }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  // Snapshot the Slovenian source before app.js touches the DOM (e.g. word-splitting)
  document.querySelectorAll('[data-i18n]').forEach(orig);
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const o = orig(el);
    el.dataset.i18nAttr.split(';').forEach(pair => { const attr = pair.split(':')[0].trim(); o.attrs[attr] = el.getAttribute(attr); });
  });

  // Apply before app.js runs so animations see the final text
  if (lang !== 'sl') apply(lang, { persist: false });
  else document.querySelectorAll('.js-lang [data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === 'sl'));

  return {
    get lang() { return lang; },
    apply,
    ui: () => UI[lang],
    venue: v => VENUES[lang][v],
    form: f => FORM[lang][f],
    system: id => SYSTEMS[lang][id],
    drink: cat => DRINKS[lang][cat]
  };
})();
