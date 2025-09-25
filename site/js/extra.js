// Simple in-page filter for definition lists of abbreviations
(function() {
  function setupFilter() {
    var input = document.getElementById('abbrev-filter');
    if (!input) return;
    var sections = document.querySelectorAll('dl.abbr-list');
    if (!sections.length) return;

    function normalize(s) {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function filter() {
      var q = normalize(input.value || '');
      sections.forEach(function(dl) {
        var pairs = dl.querySelectorAll('dt, dd');
        var showAll = q.length === 0;
        var currentDT = null;
        for (var i = 0; i < pairs.length; i++) {
          var el = pairs[i];
          if (el.tagName.toLowerCase() === 'dt') currentDT = el;
          var text = normalize(el.textContent);
          var match = showAll || text.indexOf(q) !== -1;
          // hide/show both dt and its following dd
          if (el.tagName.toLowerCase() === 'dt') {
            // decide based on dt or next dd content
            var dd = el.nextElementSibling;
            var ddText = dd ? normalize(dd.textContent) : '';
            match = showAll || text.indexOf(q) !== -1 || ddText.indexOf(q) !== -1;
            el.style.display = match ? '' : 'none';
            if (dd) dd.style.display = match ? '' : 'none';
          }
        }
      });
    }
    input.addEventListener('input', filter);
  }
  // Material loads content dynamically; wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', setupFilter);
  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') setupFilter();
  });
})();
