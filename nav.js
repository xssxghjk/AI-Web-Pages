/**
 * nav.js — Shared sidebar + hamburger navigation
 *
 * Include this script in <head> on every page. It will:
 *  - Skip all nav injection when the page is loaded inside an iframe
 *    (e.g. the calendar's iframe modal), so those views stay clean.
 *  - Otherwise inject the sidebar (desktop) and hamburger drawer (mobile)
 *    by wrapping the existing <body> children in the app-layout structure.
 */
(function () {
  'use strict';

  // ── Skip when running inside an iframe ──────────────────────────────────
  if (window.self !== window.top) return;

  // Capture script base path now, while currentScript is still available
  var NAV_BASE = (document.currentScript ? document.currentScript.src : '').replace(/\/[^\/]*$/, '/');

  // ── Inject Google Font ──────────────────────────────────────────────────
  var preconnect1 = document.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  document.head.insertBefore(preconnect1, document.head.firstChild);
  var preconnect2 = document.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.crossOrigin = '';
  document.head.insertBefore(preconnect2, document.head.firstChild);
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Serif+Text:ital@0;1&display=swap';
  document.head.insertBefore(fontLink, document.head.firstChild);

  // ── Inject CSS ──────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    /* variables */
    ':root{--nav-accent:#c4864a;--nav-bg:#1c1814;--nav-surface:#252018;--nav-border:#3a3025}' +

    /* app layout */
    '.app-layout{display:flex;min-height:100vh}' +
    '.page-content{flex:1;display:flex;flex-direction:column;min-width:0}' +

    /* sidebar */
    '.sidebar{width:220px;flex-shrink:0;' +
      'background:linear-gradient(175deg,#252018 0%,var(--nav-bg) 55%);' +
      'border-right:1px solid var(--nav-border);' +
      'display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto}' +
    '.sidebar-header{padding:0 1.25rem;height:60px;display:flex;align-items:center;gap:0.6rem;' +
      'border-bottom:1px solid var(--nav-border);flex-shrink:0}' +
    '.sidebar-logo{width:30px;height:30px;object-fit:contain;flex-shrink:0}' +
    '.sidebar-brand{font-family:"Playfair Display",Georgia,serif;font-size:0.78rem;font-weight:700;font-style:italic;' +
      'color:#e8dfd0;letter-spacing:0.04em}' +
    '.sidebar-nav{padding:1rem 0.5rem;overflow-y:auto;flex:1}' +
    '.sidebar-section{font-family:"DM Serif Text",Georgia,serif;font-size:0.57rem;font-weight:400;font-style:italic;' +
      'letter-spacing:0.16em;text-transform:uppercase;color:#5a4e40;padding:0.75rem 0.75rem 0.3rem}' +
    '.sidebar-link{display:flex;align-items:center;gap:0.6rem;padding:0.55rem 0.75rem;' +
      'border-radius:2px;text-decoration:none;color:#9a8a76;' +
      'font-family:"DM Serif Text",Georgia,serif;font-size:0.82rem;font-weight:400;' +
      'transition:color 0.18s,background 0.18s,border-color 0.18s;' +
      'border-left:2px solid transparent}' +
    '.sidebar-link:hover{color:#e8dfd0;background:rgba(232,223,208,0.05);border-left-color:rgba(196,134,74,0.35)}' +
    '.sidebar-link.active{color:var(--nav-accent);background:rgba(196,134,74,0.08);border-left-color:var(--nav-accent)}' +
    '.sidebar-link svg{flex-shrink:0;opacity:0.45;transition:opacity 0.18s}' +
    '.sidebar-link:hover svg,.sidebar-link.active svg{opacity:1}' +
    '@media(max-width:700px){.sidebar{display:none}}' +

    /* mobile header */
    '.mobile-header{display:none;align-items:center;gap:0.75rem;padding:0 1rem;height:52px;' +
      'background:var(--nav-bg);border-bottom:1px solid var(--nav-border);flex-shrink:0}' +
    '@media(max-width:700px){.mobile-header{display:flex}}' +
    '.hamburger-btn{display:flex;flex-direction:column;justify-content:center;gap:5px;' +
      'width:36px;height:36px;border:none;background:none;cursor:pointer;padding:6px;' +
      'border-radius:3px;transition:background 0.15s;flex-shrink:0}' +
    '.hamburger-btn:hover{background:rgba(255,255,252,0.06)}' +
    '.hamburger-btn .hb-bar{display:block;width:18px;height:1.5px;background:#58584e;' +
      'border-radius:1px;transition:background 0.15s}' +
    '.hamburger-btn:hover .hb-bar{background:#b5a48e}' +
    '.mobile-brand{font-family:"Playfair Display",Georgia,serif;font-size:0.82rem;font-weight:700;font-style:italic;' +
      'color:#e8dfd0;letter-spacing:0.02em}' +
    '.mobile-logo{width:26px;height:26px;object-fit:contain;flex-shrink:0}' +

    /* mobile nav overlay */
    '.mobile-nav-overlay{position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.72);' +
      'opacity:0;visibility:hidden;transition:opacity 0.25s ease,visibility 0s linear 0.25s}' +
    '.mobile-nav-overlay.open{opacity:1;visibility:visible;' +
      'transition:opacity 0.25s ease,visibility 0s linear 0s}' +

    /* mobile nav drawer */
    '.mobile-nav-drawer{position:fixed;top:0;left:0;bottom:0;width:260px;max-width:85vw;' +
      'z-index:900;background:var(--nav-bg);border-right:1px solid var(--nav-border);' +
      'display:flex;flex-direction:column;' +
      'transform:translateX(-100%);transition:transform 0.28s cubic-bezier(0.32,0.72,0,1);' +
      'overflow-y:auto}' +
    '.mobile-nav-drawer.open{transform:translateX(0)}' +
    '.mobile-nav-drawer-header{padding:0 1rem;height:52px;display:flex;align-items:center;' +
      'justify-content:space-between;border-bottom:1px solid var(--nav-border);flex-shrink:0}' +
    '.mobile-nav-close{display:flex;align-items:center;justify-content:center;' +
      'width:32px;height:32px;border:none;background:none;cursor:pointer;' +
      'border-radius:3px;color:#58584e;transition:background 0.15s,color 0.15s}' +
    '.mobile-nav-close:hover{background:rgba(255,255,252,0.06);color:#c8c4b4}' +

    /* legal disclaimer strip */
    '.nav-disclaimer{padding:0.85rem 1.5rem;font-size:0.67rem;font-style:italic;' +
      'color:#4a4035;border-top:1px solid #2a2318;text-align:center;' +
      'line-height:1.65;flex-shrink:0}' +
    '.nav-disclaimer a{color:#6a5e50;text-decoration:none;border-bottom:1px solid #3a3025}' +
    '.nav-disclaimer a:hover{color:#9a8a76}' +

    /* storage notice banner */
    '.nav-storage-notice{position:fixed;bottom:0;left:0;right:0;z-index:9000;' +
      'background:#181410;border-top:1px solid #2e2820;' +
      'padding:0.85rem 1.25rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;' +
      'font-size:0.72rem;color:#7a6e60;font-family:"DM Serif Text",Georgia,serif;' +
      'box-shadow:0 -4px 24px rgba(0,0,0,0.45)}' +
    '.nav-storage-notice p{margin:0;flex:1;min-width:180px;line-height:1.55}' +
    '.nav-storage-notice a{color:#8a7e6e;border-bottom:1px solid #3a3025;text-decoration:none}' +
    '.nav-storage-notice a:hover{color:#b5a48e}' +
    '.nav-storage-notice-btn{flex-shrink:0;padding:0.4rem 1rem;' +
      'background:rgba(196,134,74,0.12);border:1px solid rgba(196,134,74,0.3);' +
      'color:#c4864a;border-radius:2px;cursor:pointer;font-size:0.7rem;' +
      'font-family:"DM Serif Text",Georgia,serif;letter-spacing:0.04em;' +
      'transition:background 0.15s,border-color 0.15s}' +
    '.nav-storage-notice-btn:hover{background:rgba(196,134,74,0.22);border-color:rgba(196,134,74,0.5)}';
  document.head.appendChild(style);

  // ── Inject favicon ───────────────────────────────────────────────────────
  var faviconIco = document.createElement('link');
  faviconIco.rel = 'icon';
  faviconIco.href = NAV_BASE + 'assets/favicon.ico';
  document.head.appendChild(faviconIco);
  var favicon32 = document.createElement('link');
  favicon32.rel = 'icon';
  favicon32.type = 'image/png';
  favicon32.sizes = '32x32';
  favicon32.href = NAV_BASE + 'assets/favicon-32.png';
  document.head.appendChild(favicon32);
  var favicon16 = document.createElement('link');
  favicon16.rel = 'icon';
  favicon16.type = 'image/png';
  favicon16.sizes = '16x16';
  favicon16.href = NAV_BASE + 'assets/favicon-16.png';
  document.head.appendChild(favicon16);

  // ── Nav structure ────────────────────────────────────────────────────────
  var SECTIONS = [
    {
      label: 'Pages',
      links: [
        { key: 'calendar',  href: '../calendar/',               text: 'Calendar',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 5.5h11M4.5 1v3M9.5 1v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
        { key: 'trips',     href: '../trips/',                  text: 'Trips',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5C4.515 1.5 2.5 3.515 2.5 6c0 3.5 4.5 6.5 4.5 6.5s4.5-3 4.5-6.5c0-2.485-2.015-4.5-4.5-4.5z" stroke="currentColor" stroke-width="1.4"/><circle cx="7" cy="6" r="1.5" stroke="currentColor" stroke-width="1.4"/></svg>' },
        { key: 'reports',   href: '../tcg-tournament-reports/', text: 'Tournament Reports',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 2.5h9a1 1 0 011 1v7a1 1 0 01-1 1h-9a1 1 0 01-1-1v-7a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 6h5M4.5 8.5h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
        { key: 'prep',      href: '../tcg-tournament-prep/',    text: 'Tournament Prep',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>' },
      ]
    },
    {
      label: 'Tools',
      links: [
        { key: 'deck-viewer',      href: '../fab-deck-viewer/',    text: 'Deck Builder',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' },
{ key: 'marathon',         href: '../marathon-training/',  text: 'Marathon Training',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="3" r="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M4 12.5l1.5-4 1.5 2 1.5-2 1.5 4M7 5.5v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
      ]
    },
    {
      label: 'Meta',
      links: [
        { key: 'project-stats', href: '../project-stats/', text: 'Project Stats',
          icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="7.5" width="3" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="5.5" y="4.5" width="3" height="8" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="10" y="1.5" width="3" height="11" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>' },
      ]
    }
  ];

  function getActivePage() {
    var p = window.location.pathname;
    if (/\/calendar(\/|$)/.test(p))               return 'calendar';
    if (/\/tcg-tournament-reports(\/|$)/.test(p)) return 'reports';
    if (/\/tcg-tournament-prep(\/|$)/.test(p))    return 'prep';
    if (/\/trips(\/|$)/.test(p))                  return 'trips';
    if (/\/trip(\/|$)/.test(p))                   return 'trips';  // trip detail
    if (/\/fab-deck-viewer(\/|$)/.test(p))        return 'deck-viewer';
if (/\/marathon-training(\/|$)/.test(p))      return 'marathon';
    if (/\/project-stats(\/|$)/.test(p))          return 'project-stats';
    return null;
  }

  function buildLinks(activePage) {
    var html = '';
    SECTIONS.forEach(function (section, i) {
      html += '<div class="sidebar-section"' +
        (i > 0 ? ' style="margin-top:0.25rem"' : '') + '>' +
        section.label + '</div>';
      section.links.forEach(function (link) {
        var cls = 'sidebar-link' + (link.key === activePage ? ' active' : '');
        html += '<a class="' + cls + '" href="' + link.href + '">' +
          link.icon + link.text + '</a>';
      });
    });
    return html;
  }

  // ── DOM injection (runs after the page has parsed) ───────────────────────
  function init() {
    var activePage = getActivePage();
    var linksHtml  = buildLinks(activePage);

    // Sidebar (desktop)
    var sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML =
      '<div class="sidebar-header">' +
        '<img src="' + NAV_BASE + 'assets/logo-64.png" class="sidebar-logo" alt="">' +
        '<span class="sidebar-brand">xssxghjk</span>' +
      '</div>' +
      '<nav class="sidebar-nav">' + linksHtml + '</nav>';

    // Mobile header strip
    var mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    mobileHeader.innerHTML =
      '<button class="hamburger-btn" id="hamburger-btn"' +
        ' aria-label="Open navigation" aria-expanded="false"' +
        ' aria-controls="mobile-nav-drawer">' +
        '<span class="hb-bar"></span>' +
        '<span class="hb-bar"></span>' +
        '<span class="hb-bar"></span>' +
      '</button>' +
      '<img src="' + NAV_BASE + 'assets/logo-64.png" class="mobile-logo" alt="">' +
      '<span class="mobile-brand">xssxghjk</span>';

    // Wrap all current body children in .app-layout > .page-content
    var appLayout   = document.createElement('div');
    appLayout.className = 'app-layout';
    var pageContent = document.createElement('div');
    pageContent.className = 'page-content';
    while (document.body.firstChild) {
      pageContent.appendChild(document.body.firstChild);
    }
    pageContent.insertBefore(mobileHeader, pageContent.firstChild);
    var disclaimer = document.createElement('div');
    disclaimer.className = 'nav-disclaimer';
    disclaimer.innerHTML = 'This is an unofficial fan site. Not affiliated with, endorsed by, or sponsored by Legend Story Studios. ' +
      'Flesh and Blood and all related marks are trademarks of Legend Story Studios. &mdash; ' +
      '<a href="' + NAV_BASE + 'privacy/">Privacy Policy</a>';
    pageContent.appendChild(disclaimer);

    // Storage notice banner (dismissed state persisted in localStorage)
    if (!localStorage.getItem('nav_notice_v1')) {
      var notice = document.createElement('div');
      notice.className = 'nav-storage-notice';
      notice.innerHTML =
        '<p>This site stores data <strong style="color:#9a8a76;font-weight:normal">locally in your browser</strong> ' +
        '(localStorage) to save things like decks, training logs, and UI preferences. ' +
        'No cookies, no analytics, no data is ever sent to a server. ' +
        '<a href="' + NAV_BASE + 'privacy/">Learn more</a></p>' +
        '<button class="nav-storage-notice-btn" id="nav-notice-dismiss">Got it</button>';
      document.body.appendChild(notice);
      document.getElementById('nav-notice-dismiss').addEventListener('click', function () {
        localStorage.setItem('nav_notice_v1', '1');
        notice.remove();
      });
    }

    appLayout.appendChild(sidebar);
    appLayout.appendChild(pageContent);
    document.body.appendChild(appLayout);

    // Mobile nav overlay (backdrop)
    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.id = 'mobile-nav-overlay';
    document.body.appendChild(overlay);

    // Mobile nav drawer
    var drawer = document.createElement('nav');
    drawer.className = 'mobile-nav-drawer';
    drawer.id = 'mobile-nav-drawer';
    drawer.setAttribute('aria-label', 'Navigation menu');
    drawer.innerHTML =
      '<div class="mobile-nav-drawer-header">' +
        '<img src="' + NAV_BASE + 'assets/logo-64.png" class="mobile-logo" alt="">' +
        '<span class="sidebar-brand">xssxghjk</span>' +
        '<button class="mobile-nav-close" id="mobile-nav-close"' +
          ' aria-label="Close navigation">' +
          '<svg width="14" height="14" viewBox="0 0 14 14" fill="none">' +
            '<path d="M2 2l10 10M12 2L2 12" stroke="currentColor"' +
              ' stroke-width="1.5" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div class="sidebar-nav">' + linksHtml + '</div>';
    document.body.appendChild(drawer);

    // Wire up interactions
    var hamburgerBtn = document.getElementById('hamburger-btn');
    var closeBtn     = document.getElementById('mobile-nav-close');

    function openNav() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
