export const SITE_ID = "njkw746jhs$jhe8";
export const TABLE_HEADERS = ["Event", "Visitor", "MetaData", "Created At"]
export const AVATAR = "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
export const SCRIPT = `
(function () {
  const siteId = 'njkw746jhs$jhe8'
  // Get or generate a visitor ID
  const visitorId = localStorage.getItem('visitorId') || Date.now().toString();
  localStorage.setItem('visitorId', visitorId);

  // Function to track script initialization
  function trackInit() {
      sendEvent('script_initialized');
  }

  // Function to track page views
  function trackPageView() {
      sendEvent('page_view', { path: window.location.pathname });
  }

  // Function to track input blur events
  function trackInput(inputElement) {
      const inputName = inputElement.name;
      const inputValue = inputElement.value;
      if (!inputName || !inputValue) return;
      sendEvent('input_blurred', { [inputName]: inputValue });
  }

  // Function to track clicks on elements
  function trackClick(elementId) {
      if (!elementId) return;
      sendEvent('element_clicked', { elementId });
  }

  // Function to send event data to the backend
  function sendEvent(eventType, data = {}) {
      fetch('/api/events', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventType, visitorId, siteId, data }),
      }).catch(error => console.error('Error sending event:', error));
  }

  // Initialize tracking
  trackInit();

  //listener for page view
  window.addEventListener('load', trackPageView);

  //lister for button clicks
  window.addEventListener('load', function () {
      document.querySelectorAll('button').forEach(button => {
          button.addEventListener('click', function () {
              trackClick(button.id);
          });
      });

      //lister for input blur events
      document.querySelectorAll('input').forEach(input => {
          input.addEventListener('blur', function () {
              trackInput(input);
          });
      });

      //lister for select onChange event
      document.querySelectorAll('select').forEach(select => {
          select.addEventListener('change', function () {
              trackInput(select);
          })
      })
  });
})();
`