/* Google Analytics 4 for fynnect.com.
   Stays off until GA_ID holds the property's Measurement ID (looks like "G-XXXXXXXXXX").
   Conversion events sent: generate_lead, get_started_click, whatsapp_click,
   invest_online_click, email_click. */
(function () {
  var GA_ID = 'G-DCLQPWHQ1E';

  var host = location.hostname.replace(/^www\./, '');
  if (!GA_ID || host !== 'fynnect.com' || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var ev = null;
    if (href.indexOf('wa.me/') !== -1) ev = 'whatsapp_click';
    else if (href.indexOf('wealthy.in') !== -1) ev = 'invest_online_click';
    else if (href.indexOf('mailto:') === 0) ev = 'email_click';
    else if (/#consult$/.test(href)) ev = 'get_started_click';
    if (ev) gtag('event', ev, { link_text: (a.textContent || '').trim().slice(0, 60) });
  }, true);

  document.addEventListener('fynnect:lead', function (e) {
    gtag('event', 'generate_lead', { goal: (e.detail && e.detail.goal) || 'not specified', method: (e.detail && e.detail.method) || 'email' });
  });
})();
