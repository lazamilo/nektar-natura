/* Nektar Natura — interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const L = window.I18N;
  const ui = () => L.ui();

  /* ---------------- Pointer hit-testing ----------------
     Hover state must follow what is *under* the pointer. With smooth scrolling the page
     moves under a still mouse, and mouseover/mouseleave don't fire, so re-test on scroll too. */
  const pointer = { x: 0, y: 0, inside: false };
  const hoverHandlers = [];
  let hitQueued = false;
  function hitTest() {
    if (hitQueued) return;
    hitQueued = true;
    requestAnimationFrame(() => {
      hitQueued = false;
      const el = pointer.inside ? document.elementFromPoint(pointer.x, pointer.y) : null;
      hoverHandlers.forEach(fn => fn(el));
    });
  }
  if (finePointer) {
    addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.inside = true; hitTest(); }, { passive: true });
    let lastScrollTest = 0;            // each test forces a layout read, so don't run it every scroll frame
    let trailing = 0;
    addEventListener('scroll', () => {
      if (!pointer.inside) return;
      const t = performance.now();
      clearTimeout(trailing); trailing = setTimeout(hitTest, 120);   // and once more when scrolling settles
      if (t - lastScrollTest > 100) { lastScrollTest = t; hitTest(); }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => { pointer.inside = false; hitTest(); });
    addEventListener('blur', () => { pointer.inside = false; hitTest(); });
  }

  /* ---------------- Data (language-neutral; text comes from i18n.js) ---------------- */
  const SYSTEMS = [
    { id: 'iq-tap', name: 'IQ Tap', cooling: '42 L/h', form: 'counter', venues: ['hotel', 'restaurant', 'cruise', 'casino', 'event'], img: 'assets/iqtap.jpg' },
    { id: 'tower-touch', name: 'Tower Touch', cooling: '78 L/h', form: 'counter', venues: ['hotel', 'cruise', 'restaurant', 'event', 'casino'], img: 'assets/bar.jpg' },
    { id: 'tower-simple', name: 'Tower Simple', cooling: '78 L/h', form: 'counter', venues: ['hotel', 'restaurant', 'event'], img: 'assets/bar.jpg' },
    { id: 'bar-gun', name: 'Bar Gun', cooling: '78 L/h', form: 'counter', venues: ['hotel', 'cruise', 'restaurant', 'event', 'casino'], img: 'assets/bar.jpg' },
    { id: 'konzola', name: 'Konzola', cooling: '78 L/h', form: 'counter', venues: ['hotel', 'cruise', 'restaurant', 'casino'], img: 'assets/cruise.jpg' },
    { id: 'stojnica', name: 'Stojnica', cooling: '34 L/h', form: 'floor', venues: ['hotel', 'event'], img: 'assets/hotel.jpg' },
    { id: 'jm-superior', name: 'JM Superior', cooling: '46 L/h', form: 'floor', venues: ['hotel', 'restaurant'], img: 'assets/hotel.jpg' },
    { id: 'jm', name: 'JM', cooling: '35 L/h', form: 'floor', venues: ['hotel', 'restaurant'], img: 'assets/service.jpg' },
    { id: 'autofill', name: 'Autofill', cooling: '42 L/h', form: 'floor', venues: ['hotel', 'event'], img: 'assets/hotel.jpg' },
    { id: 'ice', name: 'Ice', cooling: '2×10 / 3×10 L/h', form: 'floor', venues: ['hotel', 'cruise', 'restaurant'], img: 'assets/granita.jpg' }
  ];
  const DRINKS = {
    still: { img: 'assets/fruit.jpg' },
    sparkling: { img: 'assets/lemonade.jpg', compat: 'IQ Tap · Konzola · Tower Touch · Tower Simple · Bar Gun' },
    cocktail: { img: 'assets/cruise.jpg', compat: 'Tower Touch' },
    frozen: { img: 'assets/granita.jpg', compat: 'Ice' }
  };

  const sysById = id => SYSTEMS.find(s => s.id === id);
  // Merge the static system data with the current language's copy
  const sysText = s => { const [type, desc, drinks] = L.system(s.id); return { ...s, type, desc, drinks, formLabel: L.form(s.form) }; };
  const drinkText = cat => ({ ...DRINKS[cat], ...L.drink(cat), compat: DRINKS[cat].compat || L.drink(cat).compat });

  /* ---------------- Storage-safe basket ---------------- */
  const KEY = 'nn-inquiry';
  let basket = [];
  try { basket = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { basket = []; }
  // Items are stored by id only, so names follow the active language
  basket = basket.filter(b => b && b.id).map(b => ({ id: b.id, type: b.type || (b.id.startsWith('drink-') ? 'drink' : 'system') }))
    .filter(b => b.type === 'drink' ? DRINKS[b.id.slice(6)] : sysById(b.id));
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(basket)); } catch (e) {} };
  const inBasket = id => basket.some(b => b.id === id);
  const nameOf = b => b.type === 'drink' ? L.drink(b.id.slice(6)).title : sysById(b.id).name;
  const kindOf = b => b.type === 'drink' ? ui().kindDrink : ui().kindSystem;

  function addItem(item) {
    if (inBasket(item.id)) { toast(ui().already(nameOf(item))); return; }
    basket.push(item); save(); renderBasket();
    const badge = $('.js-basket-count');
    badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
    toast(ui().added(nameOf(item)));
  }
  function removeItem(id) { basket = basket.filter(b => b.id !== id); save(); renderBasket(); }

  function renderBasket() {
    $('.js-basket-count').textContent = basket.length;
    $('.js-basket').classList.toggle('has-items', basket.length > 0);
    $('.js-basket-list').innerHTML = basket.map(b =>
      `<li><div><small>${kindOf(b)}</small><b>${nameOf(b)}</b></div><button data-remove="${b.id}" aria-label="${ui().remove(nameOf(b))}">✕</button></li>`).join('');
    $('.js-picked').innerHTML = basket.length
      ? basket.map(b => `<li>${nameOf(b)}<button type="button" data-remove="${b.id}" aria-label="${ui().remove(nameOf(b))}">✕</button></li>`).join('')
      : `<li class="is-empty">${ui().pickedEmpty}</li>`;
    $$('.sysrow__add').forEach(btn => {
      const on = inBasket(btn.dataset.id);
      btn.classList.toggle('is-in', on);
      btn.textContent = on ? '✓' : '+';
    });
  }
  document.addEventListener('click', e => {
    const r = e.target.closest('[data-remove]');
    if (r) { e.stopPropagation(); removeItem(r.dataset.remove); }
  });

  let toastTimer;
  function toast(msg) {
    const t = $('.toast');
    t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('is-on'), 2600);
  }

  /* ---------------- Systems list ---------------- */
  const list = $('.js-syslist');
  let activeFilter = 'all';
  function renderSystems() {
    list.innerHTML = SYSTEMS.map(sysText).map((s, i) => `
      <li class="sysrow${activeFilter !== 'all' && !s.venues.includes(activeFilter) ? ' is-dim' : ''}" data-id="${s.id}" data-venues="${s.venues.join(' ')}" data-cursor="${ui().cursorOpen}" tabindex="0" role="button" aria-label="${ui().details(s.name)}">
        <span class="sysrow__n">${String(i + 1).padStart(2, '0')}</span>
        <span class="sysrow__name">${s.name}</span>
        <span class="sysrow__desc">${s.type}. ${s.drinks}.</span>
        <span class="sysrow__spec">${s.cooling} · ${s.formLabel}</span>
        <button class="sysrow__add" data-id="${s.id}" aria-label="${ui().add(s.name)}">+</button>
      </li>`).join('');
    renderBasket();
  }

  const addSystem = id => addItem({ id, type: 'system' });

  list.addEventListener('click', e => {
    const add = e.target.closest('.sysrow__add');
    const row = e.target.closest('.sysrow');
    if (add) { e.stopPropagation(); inBasket(add.dataset.id) ? removeItem(add.dataset.id) : addSystem(add.dataset.id); return; }
    if (row) openDrawer(row.dataset.id);
  });
  list.addEventListener('keydown', e => {
    const row = e.target.closest('.sysrow');
    if (row && e.target === row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openDrawer(row.dataset.id); }
  });
  $$('.js-add').forEach(b => b.addEventListener('click', () => addSystem(b.dataset.id)));
  $$('.js-open-system').forEach(b => b.addEventListener('click', () => openDrawer(b.dataset.id)));

  // Filters
  $$('.filters .chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.filters .chip').forEach(c => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-selected', c === chip); });
    activeFilter = chip.dataset.filter;
    $$('.sysrow').forEach(r => r.classList.toggle('is-dim', activeFilter !== 'all' && !r.dataset.venues.split(' ').includes(activeFilter)));
  }));

  // Floating preview: visible only while the pointer is really over a (non-dimmed) row
  const float = $('.sysfloat'), floatImg = $('.sysfloat img');
  if (hasGsap && finePointer) {
    const fx = gsap.quickTo(float, 'x', { duration: .6, ease: 'power3' });
    const fy = gsap.quickTo(float, 'y', { duration: .6, ease: 'power3' });
    let hovered = null;
    hoverHandlers.push(el => {
      const row = el && el.closest('.sysrow:not(.is-dim)');
      if (!row) {
        if (hovered) { hovered = null; gsap.to(float, { opacity: 0, scale: .6, duration: .3, overwrite: 'auto' }); }
        return;
      }
      if (!hovered) gsap.set(float, { x: pointer.x + 30, y: pointer.y - 190 });   // appear at the pointer, not fly in
      fx(pointer.x + 30); fy(pointer.y - 190);
      if (row === hovered) return;
      hovered = row;
      floatImg.src = sysById(row.dataset.id).img;
      gsap.to(float, { opacity: 1, scale: 1, rotate: gsap.utils.random(-6, 6), duration: .5, ease: 'power3', overwrite: 'auto' });
    });
  }

  /* ---------------- Drawers ---------------- */
  const drawer = $('.js-drawer'), basketEl = $('.js-basket');
  let lastFocus = null, currentSysId = null, lenis = null;
  function openPanel(el) {
    lastFocus = document.activeElement;
    el.classList.add('is-open'); el.setAttribute('aria-hidden', 'false');
    lenis && lenis.stop();
    setTimeout(() => $('.drawer__close', el).focus(), 50);
  }
  function closePanel(el) {
    if (!el.classList.contains('is-open')) return;
    el.classList.remove('is-open'); el.setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  function fillDrawer() {
    const s = sysText(sysById(currentSysId));
    const img = $('.drawer__img img', drawer);
    img.src = s.img; img.alt = s.name;
    $('.js-dr-type').textContent = s.type;
    $('.js-dr-title').textContent = s.name;
    $('.js-dr-desc').textContent = s.desc;
    const d = PAGE_LABELS();
    $('.js-dr-specs').innerHTML = `<div><dt>${d.drinks}</dt><dd>${s.drinks}</dd></div><div><dt>${d.cooling}</dt><dd>${s.cooling}</dd></div><div><dt>${d.form}</dt><dd>${s.formLabel}</dd></div><div><dt>${d.support}</dt><dd>24/7</dd></div>`;
    $('.js-dr-venues').innerHTML = s.venues.map(v => `<span>${L.venue(v)}</span>`).join('');
  }
  // Spec labels are already translated in the page; read them from the feature block
  const PAGE_LABELS = () => ({
    drinks: $('[data-i18n="spec.drinks"]').textContent,
    cooling: $('[data-i18n="spec.cooling"]').textContent,
    form: $('[data-i18n="spec.form"]').textContent,
    support: { sl: 'Podpora', en: 'Support', de: 'Support' }[L.lang]
  });
  function openDrawer(id) { currentSysId = id; fillDrawer(); openPanel(drawer); }
  $('.js-dr-add').addEventListener('click', () => { addSystem(currentSysId); closePanel(drawer); });
  $$('.js-close-drawer').forEach(b => b.addEventListener('click', () => closePanel(drawer)));
  $$('.js-open-basket').forEach(b => b.addEventListener('click', () => openPanel(basketEl)));
  $$('.js-close-basket').forEach(b => b.addEventListener('click', e => {
    closePanel(basketEl);
    if (b.getAttribute('href')) { e.preventDefault(); scrollToEl($(b.getAttribute('href'))); }
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePanel(drawer); closePanel(basketEl); toggleMenu(false); }
  });

  /* ---------------- Drinks ---------------- */
  const drinksSec = $('.drinks');
  const CATS = ['still', 'sparkling', 'cocktail', 'frozen'];
  const layers = $$('.drinks__layer');
  let currentCat = 'still';
  let scrollMode = false;            // true while the pinned, scroll-driven showcase is active
  let scrollToCat = null;            // set by the scroll timeline; tabs jump to a category with it
  const showLayer = cat => layers.forEach(l => l.classList.toggle('is-active', l.dataset.cat === cat));

  function setDrink(cat, animate = true) {
    const d = drinkText(cat); currentCat = cat;
    drinksSec.dataset.theme = cat;
    $$('.dtab').forEach(t => { const on = t.dataset.cat === cat; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
    if (!scrollMode) showLayer(cat);
    const apply = () => {
      $('.js-dtitle').textContent = d.title;
      $('.js-ddesc').textContent = d.desc;
      $('.js-flavors').innerHTML = d.flavors.map(f => `<li>${f}</li>`).join('');
      $('.js-dcompat').textContent = '↳ ' + d.compat;
    };
    if (!animate || !hasGsap || reduced) return apply();
    gsap.killTweensOf(['.drinks__info > *', '.js-flavors li']);
    gsap.timeline()
      .to('.drinks__info > *', { opacity: 0, y: -14, duration: .2, stagger: .015, ease: 'power2.in' })
      .add(apply)
      .fromTo('.drinks__info > *', { y: 22 }, { opacity: 1, y: 0, duration: .6, stagger: .045, ease: 'expo.out' })
      .from('.js-flavors li', { scale: .6, opacity: 0, duration: .45, stagger: .025, ease: 'back.out(2)' }, '<.12');
  }
  $$('.dtab').forEach(t => t.addEventListener('click', () => {
    if (scrollMode && scrollToCat) scrollToCat(CATS.indexOf(t.dataset.cat));
    else setDrink(t.dataset.cat);
  }));
  $('.js-add-drink').addEventListener('click', () => addItem({ id: 'drink-' + currentCat, type: 'drink' }));

  /* ---------------- Venues: expanding panels ---------------- */
  const vPanels = $$('.vpanel');
  const openVenue = p => vPanels.forEach(x => x.classList.toggle('is-active', x === p));
  vPanels.forEach(p => {
    p.addEventListener('click', () => openVenue(p));
    p.addEventListener('keydown', e => { if (e.target === p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openVenue(p); } });
    if (finePointer) p.addEventListener('mouseenter', () => openVenue(p));
  });
  // "Show systems": jump to the list, filtered to this venue
  $$('.js-venue-filter').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const chip = $(`.filters .chip[data-filter="${b.dataset.filter}"]`);
    chip && chip.click();
    const el = $('#sistemi');
    lenis ? lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }));
  $$('.vtag').forEach(t => t.addEventListener('click', e => e.stopPropagation()));

  /* ---------------- Form ---------------- */
  const form = $('.js-form');
  const guests = $('#f-guests'), guestsOut = $('.js-guests-out');
  const syncGuests = () => { guestsOut.textContent = Number(guests.value).toLocaleString(ui().locale); };
  guests.addEventListener('input', syncGuests);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const err = $('.form__error');
    let ok = true;
    $$('.field', form).forEach(f => f.classList.remove('is-invalid'));
    ['name', 'company', 'email'].forEach(n => {
      const input = form.elements[n];
      const valid = input.value.trim() && (n !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
      if (!valid) { ok = false; input.closest('.field').classList.add('is-invalid'); }
    });
    if (!ok) { err.textContent = ui().errFields; return; }
    if (!form.elements.consent.checked) { err.textContent = ui().errConsent; return; }
    err.textContent = '';

    const data = Object.fromEntries(new FormData(form));
    data.items = basket.map(nameOf);
    data.lang = L.lang;
    const endpoint = form.dataset.endpoint;
    const btn = $('button[type=submit]', form), label = $('.js-submit-label', form);
    const idle = label.textContent;
    btn.disabled = true; label.textContent = ui().sending;
    if (endpoint) {
      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
      } catch (ex) {
        err.textContent = ui().errSend;
        btn.disabled = false; label.textContent = idle;
        return;
      }
    }
    const m = ui().mail;
    const body = [
      `${m.name}: ${data.name}`, `${m.company}: ${data.company}`, `${m.email}: ${data.email}`, `${m.phone}: ${data.phone || '-'}`,
      `${m.venue}: ${L.venue(data.venue)}`, `${m.guests}: ${data.guests}`,
      `${m.items}: ${data.items.length ? data.items.join(', ') : '-'}`, '', data.message || ''
    ].join('\n');
    $('.js-mailto').href = `mailto:hello@nektarnatura.com?subject=${encodeURIComponent(ui().mailSubject + ' — ' + data.company)}&body=${encodeURIComponent(body)}`;
    $('.js-done-name').textContent = data.name.split(' ')[0] + '.';
    form.hidden = true; $('.form__done').hidden = false;
  });

  /* ---------------- Menu ---------------- */
  function toggleMenu(force) {
    const open = force ?? !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    $('.js-burger').setAttribute('aria-expanded', open);
    $('.menu').setAttribute('aria-hidden', !open);
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  $('.js-burger').addEventListener('click', () => toggleMenu());

  /* ---------------- Language switch ---------------- */
  $$('.js-lang [data-lang]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang !== L.lang) L.apply(b.dataset.lang);
  }));

  /* ---------------- Smooth scroll ---------------- */
  if (!reduced && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: .09, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
    }
  }
  function scrollToEl(el) {
    if (!el) return;
    lenis ? lenis.scrollTo(el, { offset: 0, duration: 1.6 }) : el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains('js-close-basket')) return;
    const href = a.getAttribute('href');
    if (href === '#') { e.preventDefault(); return; }
    const el = $(href);
    if (el) { e.preventDefault(); toggleMenu(false); scrollToEl(el); }
  });

  /* ---------------- Initial render ---------------- */
  renderSystems();
  setDrink('still', false);
  syncGuests();
  $$('.ncard').forEach(r => r.dataset.cursor = ui().cursorRead);

  // Hooks that run whenever the language changes (filled in below when GSAP is present)
  const onLang = [];
  document.addEventListener('langchange', () => {
    renderSystems();
    setDrink(currentCat, false);
    syncGuests();
    $$('.ncard').forEach(r => r.dataset.cursor = ui().cursorRead);
    if (drawer.classList.contains('is-open')) fillDrawer();
    // Transient messages were written in the previous language
    $('.form__error').textContent = '';
    $('.toast').classList.remove('is-on');
    onLang.forEach(fn => fn());
  });

  /* ---------------- Without GSAP: show everything ---------------- */
  if (!hasGsap) { $('.loader').remove(); document.body.classList.remove('is-loading'); return; }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });   // mobile toolbar show/hide must not re-measure (and jump) the pins

  /* ---------------- Cursor & magnetic ---------------- */
  if (finePointer && !reduced) {
    const cur = $('.cursor'), label = $('.cursor__label');
    const cx = gsap.quickTo(cur, 'x', { duration: .25, ease: 'power3' });
    const cy = gsap.quickTo(cur, 'y', { duration: .25, ease: 'power3' });
    addEventListener('mousemove', e => { cx(e.clientX); cy(e.clientY); });
    hoverHandlers.push(el => {
      const lab = el && el.closest('[data-cursor]');
      const hov = el && el.closest('a, button, .sysrow, .dtab, label');
      cur.classList.toggle('is-label', !!lab);
      cur.classList.toggle('is-hover', !lab && !!hov);
      label.textContent = lab ? lab.dataset.cursor : '';
    });

    $$('.magnetic').forEach(el => {
      const mx = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * .25); my((e.clientY - r.top - r.height / 2) * .35);
      });
      el.addEventListener('mouseleave', () => { mx(0); my(0); });
    });
  }

  /* ---------------- Loader + hero intro ---------------- */
  const heroLines = $$('.hero__title .line > *');
  const intro = gsap.timeline({ paused: true });
  intro
    .from('.hero__media img', { scale: 1.35, duration: 2.2, ease: 'expo.out' }, 0)
    .from(heroLines, { yPercent: 115, rotate: 3, duration: 1.4, stagger: .08, ease: 'expo.out' }, .15)
    .from(['.hero__lead', '.hero__ctas', '.hero__scroll'], { opacity: 0, y: 30, duration: 1, stagger: .08, ease: 'expo.out' }, .6)
    .from('.nav > *', { opacity: 0, y: -20, duration: 1, stagger: .08, ease: 'expo.out' }, .7);

  const loader = $('.loader');
  const finishLoad = () => {
    gsap.timeline({ onComplete: () => { loader.remove(); document.body.classList.remove('is-loading'); ScrollTrigger.refresh(); } })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' })   // the logo stays put; the screen lifts off it
      .add(() => intro.play(), '-=.6');
  };
  if (reduced) { loader.remove(); document.body.classList.remove('is-loading'); }
  else {
    gsap.set(loader, { clipPath: 'inset(0 0 0% 0)' });
    gsap.from('.loader__word > *', { yPercent: 110, duration: 1, stagger: .08, ease: 'expo.out' });
    const counter = { v: 0 }; let loaded = false, counted = false, finished = false;
    const tryFinish = () => { if (loaded && counted && !finished) { finished = true; finishLoad(); } };
    gsap.to(counter, {
      v: 100, duration: 1.8, ease: 'power2.inOut',
      onUpdate: () => { $('.js-count').textContent = Math.round(counter.v); $('.loader__fill').style.height = counter.v + '%'; },
      onComplete: () => { counted = true; tryFinish(); }
    });
    const heroImg = $('.hero__media img');
    const markLoaded = () => { loaded = true; tryFinish(); };
    heroImg.complete ? markLoaded() : (heroImg.addEventListener('load', markLoaded), heroImg.addEventListener('error', markLoaded));
    setTimeout(markLoaded, 4000);
    // Never trap the visitor behind the loader on slow/throttled devices
    setTimeout(() => {
      if (!document.contains(loader)) return;
      loader.remove(); document.body.classList.remove('is-loading');
      intro.progress(1); ScrollTrigger.refresh();
    }, 6500);
  }

  if (reduced) return;

  /* ---------------- Hero scroll ---------------- */
  gsap.to('.hero__media', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__inner', { yPercent: -18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------------- Nav state ---------------- */
  const nav = $('.nav');
  let navY = 0, navRun = 0;          // distance travelled in the current direction
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const y = self.scroll(), d = y - navY; navY = y;
      navRun = Math.sign(d) === Math.sign(navRun) ? navRun + d : d;
      if (y < 600 || document.body.classList.contains('menu-open')) nav.classList.remove('is-hidden');
      else if (navRun > 40) nav.classList.add('is-hidden');
      else if (navRun < -40) nav.classList.remove('is-hidden');
    }
  });
  $$('.manifesto, .systems, .drinks, .venues, .quotes, .news').forEach(sec => {
    ScrollTrigger.create({ trigger: sec, start: 'top 40', end: 'bottom 40', toggleClass: { targets: nav, className: 'is-light' } });
  });
  $$('.nav__pill a').forEach(a => {
    const sec = $(a.getAttribute('href'));
    sec && ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', toggleClass: { targets: a, className: 'is-active' } });
  });

  /* ---------------- Manifesto word reveal (rebuilt per language) ---------------- */
  const mt = $('.js-words');
  const wrapWords = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.append(part);
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
        });
        n.replaceWith(frag);
      } else if (n.classList && n.classList.contains('pill')) n.classList.add('w'); // reveal pills like words
      else wrapWords(n);
    });
  };
  let wordTween = null;
  function buildManifesto() {
    if (wordTween) { wordTween.scrollTrigger.kill(); wordTween.kill(); }
    wrapWords(mt);
    wordTween = gsap.to($$('.w', mt), { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: mt, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  }
  buildManifesto();
  onLang.push(() => { buildManifesto(); ScrollTrigger.refresh(); });

  /* ---------------- Pillars: full-bleed slider ---------------- */
  const mm = gsap.matchMedia();
  const pSlides = $$('.pslide'), pTexts = $$('.ptext'), pDigits = $('.js-pdigits'), pFill = $('.js-pfill');
  const PN = pSlides.length;
  let pi = 0, pScrollTo = null, pAuto = null;
  // Nova-style change: the incoming pillar's "up next" card grows out of the row to fill the screen,
  // the remaining cards slide along, and the text and counter swap through a blur.
  // Without a visible card (going back, or on narrow screens) the new photo wipes in instead.
  let pFinish = null;                // completes the running transition at once, so fast scrolling never stacks them
  function showPillar(i, dir) {
    if (i === pi) return;
    pFinish && pFinish();
    const from = pi; pi = i;
    const stage = $('.pillars__stage'), inS = pSlides[i], outT = pTexts[from], inT = pTexts[i];
    const card = [...pNext.children].find(c => +c.dataset.k === i);
    const cr = card && card.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    const grow = !reduced && dir > 0 && cr && cr.width > 0;

    pDigits.style.transform = `translateY(${-i}em)`;
    pTexts.forEach((t, k) => t.classList.toggle('is-active', k === i));
    renderNext(!reduced);
    const setSlides = () => pSlides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.classList.toggle('is-prev', false); });
    if (reduced) return setSlides();

    // text and counter: blur out, blur in
    gsap.killTweensOf([inS, inS.firstElementChild, inT.children, outT.children, pDigits]);
    outT.classList.add('is-leaving');
    gsap.to(outT.children, { y: -20, opacity: 0, filter: 'blur(10px)', duration: .4, stagger: .03, ease: 'power2.in',
      onComplete: () => { outT.classList.remove('is-leaving'); gsap.set(outT.children, { clearProps: 'opacity,transform,filter' }); } });
    gsap.fromTo(inT.children, { y: 30, opacity: 0, filter: 'blur(12px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: .07, ease: 'expo.out', delay: .4 });
    gsap.fromTo(pDigits, { filter: 'blur(10px)' }, { filter: 'blur(0px)', duration: .9, ease: 'power2.out' });

    if (!grow) {
      pSlides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.classList.toggle('is-prev', k === from); });
      const tw = gsap.fromTo(inS, { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut',
        onComplete: () => { setSlides(); gsap.set(inS, { clearProps: 'clipPath' }); pFinish = null; }
      });
      gsap.fromTo(inS.firstElementChild, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' });
      pFinish = () => tw.progress(1);
      return;
    }

    // the card becomes the new background
    const ghost = document.createElement('div');
    ghost.className = 'pgrow';
    ghost.innerHTML = `<img src="${inS.querySelector('img').getAttribute('src')}" alt="">`;
    $('.pslides').appendChild(ghost);
    gsap.set(ghost, { left: cr.left - sr.left, top: cr.top - sr.top, width: cr.width, height: cr.height, borderRadius: 22 });
    const done = () => { setSlides(); ghost.remove(); pFinish = null; };
    const tw = gsap.timeline({ onComplete: done })
      .to(ghost, { left: 0, top: 0, width: sr.width, height: sr.height, borderRadius: 0, duration: 1.15, ease: 'expo.inOut' })
      .to(ghost, { boxShadow: '0 30px 80px rgba(0,0,0,.4)', duration: .4, ease: 'power2.out' }, 0)
      .fromTo(ghost.firstElementChild, { scale: 1.15 }, { scale: 1, duration: 1.15, ease: 'expo.inOut' }, 0);
    pFinish = () => tw.progress(1);
  }
  function goPillar(i) {
    if (pScrollTo) return pScrollTo(Math.max(0, Math.min(PN - 1, i)));
    const n = (i + PN) % PN;
    showPillar(n, i > pi ? 1 : -1);
    pAuto && pAuto();
  }
  // "Up next" cards: the following pillars, in order, built from the slides so they follow the language
  const pNext = $('.js-pnextcards');
  function renderNext(animate) {
    pNext.innerHTML = '';
    for (let n = 1; n < PN; n++) {
      const k = (pi + n) % PN, t = pTexts[k];
      const b = document.createElement('button');
      b.className = 'pcard'; b.type = 'button'; b.dataset.k = k;
      b.innerHTML = `<img src="${pSlides[k].querySelector('img').getAttribute('src')}" alt=""><span class="pcard__label">${t.querySelector('.ptext__label').textContent}</span><span class="pcard__title">${t.querySelector('h3').textContent}</span>`;
      b.addEventListener('click', () => goPillar(k > pi || pScrollTo ? k : k + PN));
      pNext.appendChild(b);
    }
    if (!animate) return;
    const cs = [...pNext.children], slot = cs[0].offsetWidth + 12;
    gsap.from(cs, { x: slot, duration: 1.05, ease: 'expo.inOut', stagger: .04 });
    gsap.from(cs[cs.length - 1], { opacity: 0, duration: .6, delay: .55, ease: 'power2.out' });
  }
  renderNext(false);
  onLang.push(() => renderNext(false));

  // Desktop: the section pins and scrolling walks through the pillars
  mm.add('(min-width: 821px)', () => {
    const st = ScrollTrigger.create({
      trigger: '.pillars', start: 'top top', end: () => '+=' + innerHeight * (PN - 1), pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: self => {
        gsap.set(pFill, { scaleX: Math.max(.03, self.progress) });
        const k = Math.min(PN - 1, Math.floor(self.progress * PN));
        if (k !== pi) showPillar(k, k > pi ? 1 : -1);
      }
    });
    pScrollTo = i => {
      const y = st.start + (st.end - st.start) * (i + .5) / PN;
      lenis ? lenis.scrollTo(y, { duration: 1.4 }) : window.scrollTo({ top: y, behavior: 'smooth' });
    };
    return () => { pScrollTo = null; };
  });

  // Mobile: swipe and autoplay
  mm.add('(max-width: 820px)', () => {
    let timer;
    const stage = $('.pillars__stage');
    pAuto = () => {
      clearTimeout(timer);
      gsap.fromTo(pFill, { scaleX: pi / PN }, { scaleX: (pi + 1) / PN, duration: reduced ? 0 : 6, ease: 'none', overwrite: true });
      timer = setTimeout(() => goPillar(pi + 1), 6000);
    };
    let x0 = null;
    const ts = e => { x0 = e.touches[0].clientX; };
    const te = e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) goPillar(pi + (dx < 0 ? 1 : -1)); };
    stage.addEventListener('touchstart', ts, { passive: true });
    stage.addEventListener('touchend', te);
    const vis = ScrollTrigger.create({ trigger: '.pillars', start: 'top bottom', end: 'bottom top',
      onToggle: self => self.isActive ? pAuto() : (clearTimeout(timer), gsap.killTweensOf(pFill)) });
    return () => { vis.kill(); clearTimeout(timer); pAuto = null; stage.removeEventListener('touchstart', ts); stage.removeEventListener('touchend', te); };
  });

  /* ---------------- Drinks: pinned scroll showcase (desktop) ---------------- */
  mm.add('(min-width: 821px)', () => {
    scrollMode = true;
    drinksSec.classList.add('is-scroll');
    const COLORS = { still: '#FFB25B', sparkling: '#CDF789', cocktail: '#F49AB8', frozen: '#9FD8E8' };
    const bg = $('.drinks__bg'), visual = $('.drinks__visual');
    const imgs = layers.map(l => $('img', l));
    const HOLD = .7, SEG = 1;          // timeline units: rest on each drink, then wipe to the next
    const switchAt = [0];              // timeline time at which each category becomes "current"
    const stopAt = [0];                // timeline time where each category sits fully revealed

    gsap.set(layers, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(layers[0], { clipPath: 'inset(0% 0% 0% 0%)' });
    gsap.set(bg, { backgroundColor: COLORS.still });

    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.to({}, { duration: HOLD });
    for (let i = 1; i < CATS.length; i++) {
      const at = tl.duration();
      tl.fromTo(layers[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: SEG, ease: 'power2.inOut' }, at)
        .fromTo(imgs[i], { scale: 1.35, yPercent: 14 }, { scale: 1, yPercent: 0, duration: SEG, ease: 'power2.out' }, at)
        .to(imgs[i - 1], { scale: 1.15, yPercent: -12, duration: SEG, ease: 'power1.in' }, at)
        .to(bg, { backgroundColor: COLORS[CATS[i]], duration: SEG }, at)
        .to(visual, { rotate: i % 2 ? 2.5 : -2.5, duration: SEG / 2, ease: 'power1.out' }, at)
        .to(visual, { rotate: 0, duration: SEG / 2, ease: 'power1.in' }, at + SEG / 2);
      switchAt.push(at + SEG * .5);
      stopAt.push(at + SEG + HOLD * .4);
      tl.to({}, { duration: HOLD });
    }
    const total = tl.duration();
    tl.fromTo('.drinks__rail span', { scaleY: 0 }, { scaleY: 1, duration: total }, 0);

    // Swap copy in step with the image wipe (follows the smoothed timeline, not raw scroll)
    tl.eventCallback('onUpdate', () => {
      const t = tl.time();
      let idx = 0;
      switchAt.forEach((s, i) => { if (t >= s) idx = i; });
      if (CATS[idx] !== currentCat) setDrink(CATS[idx]);
    });

    const st = ScrollTrigger.create({
      trigger: drinksSec, start: 'top top',
      end: () => '+=' + innerHeight * (CATS.length - 1) * 1.15,
      pin: true, anticipatePin: 1, scrub: .8, animation: tl, invalidateOnRefresh: true
    });

    scrollToCat = i => {
      const y = st.start + (stopAt[i] / total) * (st.end - st.start);
      lenis ? lenis.scrollTo(y, { duration: 1.4 }) : window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return () => {
      scrollMode = false; scrollToCat = null;
      drinksSec.classList.remove('is-scroll');
      gsap.set([...layers, ...imgs, bg, visual], { clearProps: 'all' });
      showLayer(currentCat);
    };
  });

  /* ---------------- Generic reveals ---------------- */
  $$('.display, .feature__title').forEach(el => {
    gsap.from(el, { y: 70, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  // Rows are re-rendered on language change, so reveal only the first render
  ScrollTrigger.batch('.sysrow', {
    start: 'top 92%', once: true,
    onEnter: els => gsap.from(els, { y: 50, opacity: 0, duration: 1, stagger: .07, ease: 'expo.out', clearProps: 'transform,opacity' })
  });
  ScrollTrigger.batch('.support__item, .tcard, .eco-card, .eco-lead, .ncard, .stat, .vpanel, .systems__feature, .field, .contact__direct a', {
    start: 'top 92%', once: true,
    onEnter: els => gsap.from(els, { y: 50, opacity: 0, duration: 1, stagger: .07, ease: 'expo.out' })
  });

  /* ---------------- Parallax media ---------------- */
  gsap.fromTo('.eco-media img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.eco-media', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.eco-media', { clipPath: 'inset(16% 12% 16% 12% round 28px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.eco-media', start: 'top 85%' } });
  gsap.from('.drinks__visual', { y: 90, scale: .92, ease: 'none', scrollTrigger: { trigger: '.drinks', start: 'top bottom', end: 'top top', scrub: true } });
  gsap.from('.feature__img', { yPercent: 6, scale: .9, ease: 'none', scrollTrigger: { trigger: '.systems__feature', start: 'top bottom', end: 'center center', scrub: true } });

  /* ---------------- Counters ---------------- */
  $$('.js-counter').forEach(el => {
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.to, duration: 2.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true }, onUpdate: () => el.textContent = Math.round(o.v) });
  });

  /* ---------------- Footer wordmark ---------------- */
  gsap.from('.footer__word', { yPercent: 60, opacity: 0, ease: 'expo.out', duration: 1.6, scrollTrigger: { trigger: '.footer', start: 'top 80%' } });

  // Pins were created out of page order; let ScrollTrigger refresh them top-to-bottom
  ScrollTrigger.sort();
  addEventListener('load', () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
  // Web fonts change text heights; re-measure once they're in so pins start where they should
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
