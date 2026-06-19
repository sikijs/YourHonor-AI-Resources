(function() {
  var SIDEBAR_KEY = 'sidebarCollapsed';
  var SIDEBAR_CLASS = 'sidebar-collapsed';
  var TOC_KEY = 'tocCollapsed';
  var TOC_CLASS = 'toc-collapsed';

  function createToggle() {
    var btn = document.createElement('button');
    btn.id = 'sidebar-toggle';
    btn.setAttribute('aria-label', 'Toggle navigation sidebar');
    btn.textContent = '\u00AB';

    function positionButton() {
      var sidebar = document.querySelector('.md-sidebar--primary');
      if (!sidebar) return;
      var rect = sidebar.getBoundingClientRect();
      var collapsed = document.body.classList.contains(SIDEBAR_CLASS);
      btn.style.left = collapsed ? '0px' : (rect.right - 20) + 'px';
      var top = rect.top + rect.height / 2 - btn.offsetHeight / 2;
      btn.style.top = Math.max(top, 48) + 'px';
    }

    btn.addEventListener('click', function() {
      document.body.classList.toggle(SIDEBAR_CLASS);
      var collapsed = document.body.classList.contains(SIDEBAR_CLASS);
      btn.textContent = collapsed ? '\u00BB' : '\u00AB';
      try { localStorage.setItem(SIDEBAR_KEY, collapsed); } catch(e) {}
      positionButton();
    });

    document.body.appendChild(btn);
    positionButton();
    window.addEventListener('resize', positionButton);
    document.addEventListener('DOMContentSwitch', positionButton);
  }

  function restoreSidebarState() {
    var collapsed = false;
    try { collapsed = localStorage.getItem(SIDEBAR_KEY) === 'true'; } catch(e) {}
    if (collapsed) {
      document.body.classList.add(SIDEBAR_CLASS);
      var btn = document.getElementById('sidebar-toggle');
      if (btn) btn.textContent = '\u00BB';
    }
  }

  function createRightToggle() {
    var btn = document.createElement('button');
    btn.id = 'toc-toggle';
    btn.setAttribute('aria-label', 'Toggle table of contents');
    btn.textContent = '\u00BB';

    function positionButton() {
      var toc = document.querySelector('.md-sidebar--secondary');
      if (!toc) return;
      var rect = toc.getBoundingClientRect();
      var collapsed = document.body.classList.contains(TOC_CLASS);
      if (collapsed) {
        btn.style.right = '0px';
        btn.style.left = 'auto';
      } else {
        btn.style.left = (rect.left - btn.offsetWidth) + 'px';
        btn.style.right = 'auto';
      }
      var top = rect.top + rect.height / 2 - btn.offsetHeight / 2;
      btn.style.top = Math.max(top, 48) + 'px';
    }

    btn.addEventListener('click', function() {
      document.body.classList.toggle(TOC_CLASS);
      var collapsed = document.body.classList.contains(TOC_CLASS);
      btn.textContent = collapsed ? '\u00AB' : '\u00BB';
      try { localStorage.setItem(TOC_KEY, collapsed); } catch(e) {}
      positionButton();
    });

    document.body.appendChild(btn);
    positionButton();
    window.addEventListener('resize', positionButton);
    document.addEventListener('DOMContentSwitch', positionButton);
  }

  function restoreTocState() {
    var collapsed = false;
    try { collapsed = localStorage.getItem(TOC_KEY) === 'true'; } catch(e) {}
    if (collapsed) {
      document.body.classList.add(TOC_CLASS);
      var btn = document.getElementById('toc-toggle');
      if (btn) btn.textContent = '\u00AB';
    }
  }

  function init() {
    createToggle();
    restoreSidebarState();
    createRightToggle();
    restoreTocState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
