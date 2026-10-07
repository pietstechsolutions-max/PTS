(function () {
  'use strict';

  /* ---- Conversion tracking hooks ----
   * TODO (owner): add your GA4 Measurement ID and/or Meta Pixel ID.
   * Example GA4:  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
   * Example Meta: fbq('init','XXXXXXXXXXXXXXX');
   * Events are pushed to window.dataLayer so any tag manager can pick them up.
   */
  window.dataLayer = window.dataLayer || [];
  function track(event, data) {
    try { window.dataLayer.push(Object.assign({ event: event }, data || {})); } catch (e) { /* noop */ }
  }

  /* ---- Click-to-call / SMS tracking ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"],a[href^="sms:"]');
    if (!a) return;
    track(a.getAttribute('href').indexOf('tel:') === 0 ? 'click_to_call' : 'click_to_text', { link_url: a.getAttribute('href') });
  });

  /* ---- Lead forms: POST JSON to /api/leads, fall back to native POST ---- */
  var forms = document.querySelectorAll('form[data-lead-form]:not([data-planner])');
  Array.prototype.forEach.call(forms, function (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return; // native POST fallback
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      if (data.website) { return; } // honeypot filled → silently drop
      data.page = location.pathname;
      data.referrer = document.referrer || '';
      if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
      if (msg) { msg.className = 'form-msg'; msg.textContent = ''; }
      fetch(form.getAttribute('action') || '/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { return {}; });
      }).then(function () {
        form.reset();
        if (msg) { msg.className = 'form-msg ok'; msg.textContent = 'Thanks! Your request is in. We’ll reach out shortly — or call us now at 631-871-5957.'; }
        track('generate_lead', { form_source: data.source || '', service: data.service || '' });
      }).catch(function () {
        if (msg) { msg.className = 'form-msg err'; msg.textContent = 'Hmm, that didn’t go through. Please call or text 631-871-5957 and we’ll take care of you.'; }
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }

    });
  });

  /* ---- Mobile menu toggle (aria-expanded, Esc closes, body scroll lock) ---- */
  (function () {
    var btn = document.querySelector('[aria-controls="primary-menu"]');
    var menu = document.getElementById('primary-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.style.overflow = '';
        btn.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') === 'true' && 
          !btn.contains(e.target) && 
          !menu.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  })();

  /* ---- Announcement bar close (sessionStorage in try/catch) ---- */
  (function () {
    var bar = document.querySelector('[data-announcement]');
    if (!bar) return;

    var closeBtn = bar.querySelector('[data-close-announcement]');
    if (!closeBtn) return;

    // Check if already closed in sessionStorage
    try {
      if (sessionStorage.getItem('pietsAnnouncementClosed') === 'true') {
        bar.style.display = 'none';
      }
    } catch (e) {
      // sessionStorage unavailable, continue without it
    }

    closeBtn.addEventListener('click', function () {
      bar.style.display = 'none';
      try {
        sessionStorage.setItem('pietsAnnouncementClosed', 'true');
      } catch (e) {
        // sessionStorage unavailable, continue without it
      }
    });
  })();

  /* ---- Reveal-on-scroll with IntersectionObserver (adds is-visible) ---- */
  (function () {
    var elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only run once
        }

    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ---- Count-up for elements with data-count (runs once when visible, respects reduced motion) ---- */
  (function () {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    // Check for reduced motion preference
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          if (isNaN(target)) return;

          // Start from 0 or current value if already set
          var start = parseInt(el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
          var duration = 2000; // 2 seconds
          var startTime = null;

          function updateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            var percent = Math.min(progress / duration, 1);
            
            var current = Math.floor(start + (target - start) * percent);
            el.textContent = current.toLocaleString();
            
            if (percent < 1) {
              requestAnimationFrame(updateCount);
            }
          }

          if (reducedMotion) {
            // Skip animation if reduced motion is preferred
            el.textContent = target.toLocaleString();
          } else {
            requestAnimationFrame(updateCount);
          }
          
          observer.unobserve(el); // Only run once
        }

    }, {
      threshold: 0.2
    });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ---- Accessible tabs for [data-tabs] (click + arrow keys) ---- */
  (function () {
    var tabContainers = document.querySelectorAll('[data-tabs]');
    if (!tabContainers.length) return;

    tabContainers.forEach(function (container) {
      var tabs = container.querySelectorAll('[role="tab"]');
      var panels = container.querySelectorAll('[role="tabpanel"]');
      
      if (!tabs.length || !panels.length || tabs.length !== panels.length) return;

      // Initialize first tab as active
      tabs[0].setAttribute('aria-selected', 'true');
      panels[0].hidden = false;

      tabs.forEach(function (tab, index) {
        // Click handler
        tab.addEventListener('click', function () {
          activateTab(index);
  

        // Keyboard navigation
        tab.addEventListener('keydown', function (e) {
          switch (e.key) {
            case 'ArrowLeft':
              e.preventDefault();
              var prevIndex = (index - 1 + tabs.length) % tabs.length;
              tabs[prevIndex].focus();
              activateTab(prevIndex);
              break;
            case 'ArrowRight':
              e.preventDefault();
              var nextIndex = (index + 1) % tabs.length;
              tabs[nextIndex].focus();
              activateTab(nextIndex);
              break;
            case 'Home':
              e.preventDefault();
              tabs[0].focus();
              activateTab(0);
              break;
            case 'End':
              e.preventDefault();
              tabs[tabs.length - 1].focus();
              activateTab(tabs.length - 1);
              break;
          }
  


      function activateTab(index) {
        tabs.forEach(function (tab, i) {
          var isActive = i === index;
          tab.setAttribute('aria-selected', String(isActive));
          tab.setAttribute('tabindex', isActive ? '0' : '-1');
  
        
        panels.forEach(function (panel, i) {
           panel.hidden = i !== index;
       
     
   tabs[index].focus();
   });
     });
   };
  })();

    /* ---- Copyright year ---- */
    (function () {
      var y = document.querySelector('[data-year]');
      if (y) y.textContent = new Date().getFullYear();
    })();

    /* ---- Hub diagram tooltips for Issue Group 1 ---- */
    (function () {
      var hubNodes = document.querySelectorAll('.hub-svg .hub-node, .hub-svg .sat-node');
      var tooltips = document.querySelectorAll('.hub-tooltip');
      
      if (!hubNodes.length || !tooltips.length) return;

      // Map nodes to their corresponding tooltips
      var nodeToTooltipMap = {
        'hub-node': document.getElementById('tooltip-hub'),
        'sat-node Cameras': document.getElementById('tooltip-cameras'),
        'sat-node Wi-Fi': document.getElementById('tooltip-wifi'),
        'sat-node Doors': document.getElementById('tooltip-doors'),
        'sat-node Phones': document.getElementById('tooltip-phones'),
        'sat-node POS': document.getElementById('tooltip-pos'),
        'sat-node Smart-home': document.getElementById('tooltip-smart-home')
      };

       function showTooltip(node, tooltip) {
         // Hide all tooltips first
         tooltips.forEach(function(t) {
           t.classList.remove('show');
         });
   
         // Show the tooltip for this node
        if (tooltip) {
          tooltip.classList.add('show');
          
          // Position the tooltip near the node
          var rect = node.getBoundingClientRect();
          var svgRect = node.closest('.hub-svg').getBoundingClientRect();
          
          tooltip.style.top = (rect.top - svgRect.top + rect.height + 8) + 'px';
          tooltip.style.left = (rect.left - svgRect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
        }
      }

       function hideTooltip() {
         tooltips.forEach(function(t) {
           t.classList.remove('show');
         });
   
       }

      hubNodes.forEach(function(node) {
        // Determine which tooltip to show based on node classes
        var tooltipId = null;
        var classList = node.classList;
        
        if (classList.contains('hub-node')) {
          tooltipId = 'tooltip-hub';
        } else if (classList.contains('Cameras')) {
          tooltipId = 'tooltip-cameras';
        } else if (classList.contains('Wi-Fi')) {
          tooltipId = 'tooltip-wifi';
        } else if (classList.contains('Doors')) {
          tooltipId = 'tooltip-doors';
        } else if (classList.contains('Phones')) {
          tooltipId = 'tooltip-phones';
        } else if (classList.contains('POS')) {
          tooltipId = 'tooltip-pos';
        } else if (classList.contains('Smart-home')) {
          tooltipId = 'tooltip-smart-home';
        }
        
        var tooltip = document.getElementById(tooltipId);
        
        // Add hover listeners
        node.addEventListener('mouseenter', function() {
          showTooltip(node, tooltip);
  
        
        node.addEventListener('mouseleave', function() {
          hideTooltip();
  
        
        // Add focus listeners for keyboard accessibility
        node.addEventListener('focus', function() {
          showTooltip(node, tooltip);
  
        
        node.addEventListener('blur', function() {
          hideTooltip();
  

    })();

   /* ---- Hero smart box: "Build my plan" keyword matcher & recommendation card ---- */
    (function () {
      var textarea = document.querySelector('[data-smartbox] textarea');
      var buildBtn = document.querySelector('[data-smartbox] button');
      var recoContainer = document.querySelector('[data-reco]');
      
      if (!textarea || !buildBtn || !recoContainer) return;

      // Keyword lists for matching
      var serviceKeywords = {
        'cameras': ['camera', 'cam', 'nvr'],
        'wifi': ['wifi', 'wi-fi', 'internet', 'network', 'cable', 'cat6', 'fiber'],
        'access': ['door', 'access', 'fob', 'intercom'],
        'phones': ['phone', 'voip', 'pos', 'register', 'menu'],
        'tv': ['tv'],
        'smart-home': ['smart home', 'alexa', 'lights', 'printer', 'computer', 'remote']
      };
      
      var propertyKeywords = ['restaurant', 'office', 'warehouse', 'building', 'home', 'house', 'apartment', 'store', 'dental'];
      
      function extractInfo(text) {
        text = text.toLowerCase().trim();
        
        // Extract services
        var services = [];
        for (var service in serviceKeywords) {
          var keywords = serviceKeywords[service];
          for (var i = 0; i < keywords.length; i++) {
            if (text.includes(keywords[i])) {
              services.push(service);
              break;
            }
          }
        }
        
        // Extract property type
        var property = '';
        for (var i = 0; i < propertyKeywords.length; i++) {
          if (text.includes(propertyKeywords[i])) {
            property = propertyKeywords[i];
            break;
          }
        }
        
        // Extract size (look for numbers followed by camera/wifi/etc)
        var sizeMatch = text.match(/(\d+)\s*(camera|cam|wifi|wi-fi|internet|network|door|access|fob|phone|voip)/i);
        var size = sizeMatch ? parseInt(sizeMatch[1]) : '';
        
        // Extract ZIP code (5 digits)
        var zipMatch = text.match(/\b\d{5}\b/);
        var zip = zipMatch ? zipMatch[0] : '';
        
        // Extract town (word after "in" or ZIP-related patterns)
        var townMatch = text.match(/(?:in|at|for)\s+([a-zA-Z\s]+?)(?:\s|$|\.|,)/);
        var town = townMatch ? townMatch[1].trim() : '';
        
        // If we have a ZIP but no town, use ZIP as town fallback
        if (!town && zip) {
          town = zip;
        }
        
        return {
          services: services,
          property: property,
          size: size,
          zip: zip,
          town: town,
          notes: text
        };
      }
      
      function renderRecommendation(info) {
        // Clear previous content
        recoContainer.innerHTML = '';
        
        if (info.services.length === 0 && !info.property && !info.size && !info.town) {
          // Friendly message when nothing detected
          recoContainer.innerHTML = `
            <div class="reco-card">
              <p>Tell us more about your project so we can build your custom plan!</p>
              <p class="reco-tips">Try mentioning: cameras, Wi-Fi, door access, phones, or your property type like restaurant or office.</p>
            </div>
          `;
          return;
        }
        
        // Build service chips HTML
        var serviceChips = '';
         if (info.services.length > 0) {
           serviceChips = '<div class="reco-services"><strong>Services:</strong> ';
           info.services.forEach(function(service) {
             serviceChips += '<span class="pill">' + service + '</span> ';
           });
           serviceChips += '</div>';
        }
        
        // Build property/size info
        var propertySize = '';
        if (info.property || info.size) {
          propertySize = '<div class="reco-property-size">';
          if (info.property) propertySize += '<span class="pill">Property: ' + info.property + '</span> ';
          if (info.size) propertySize += '<span class="pill">Size: ' + info.size + (info.size === 1 ? ' unit' : ' units') + '</span> ';
          propertySize += '</div>';
        }
        
        // Build location info
        var locationInfo = '';
        if (info.town) {
          locationInfo = '<div class="reco-location"><span class="pill">Location: ' + info.town + '</span></div>';
        }
        
        // Build plan URL with parameters
        var planUrl = '/plan.html?';
        var params = [];
        if (info.services.length > 0) {
          params.push('service=' + info.services.join(','));
        }
        if (info.property) {
          params.push('property=' + info.property);
        }
        if (info.size) {
          params.push('size=' + info.size);
        }
        if (info.town) {
          params.push('town=' + encodeURIComponent(info.town));
        }
        if (info.notes && info.notes.trim() !== '') {
          params.push('notes=' + encodeURIComponent(info.notes));
        }
        planUrl += params.join('&');
        
        // Build recommendation card
        recoContainer.innerHTML = `
          <div class="reco-card">
            <h3>Your Piets plan</h3>
            ${serviceChips}
            ${propertySize}
            ${locationInfo}
            <div class="reco-steps">
              <strong>Next steps:</strong>
              <ol>
                <li>Free walkthrough or video demo</li>
                <li>Tailored design &amp; quote</li>
                <li>Clean labeled install</li>
                <li>Training &amp; 24/7 support</li>
              </ol>
            </div>
            <a href="${planUrl}" class="btn btn-primary">Send this to Piets</a>
          </div>
        `;
        
         // Track the event
         try {
           window.dataLayer = window.dataLayer || [];
           window.dataLayer.push({
             event: 'hero_plan_built',
             services: info.services.join(','),
             property: info.property,
             size: info.size,
             town: info.town
           });
         } catch (e) {
          // Silently fail if dataLayer not available
        }
      }
      
      // Event listener for build button
      buildBtn.addEventListener('click', function () {
        var info = extractInfo(textarea.value);
        renderRecommendation(info);

      
      // Also respond to Enter key in textarea
      textarea.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          buildBtn.click();
         }
    
    /* ---- Project Planner logic for form[data-planner] ---- */
    (function () {
      var plannerForms = document.querySelectorAll('form[data-planner]');
      if (!plannerForms.length) return;
      
      Array.prototype.forEach.call(plannerForms, function (form) {
        var steps = form.querySelectorAll('[data-step]');
        var progressFill = form.querySelector('.progress-fill');
        var stepIndicators = form.querySelectorAll('.progress-steps .step');
        var prevBtn = form.querySelector('[data-back]');
        var nextBtn = form.querySelector('[data-next]');
        var submitBtn = form.querySelector('[data-submit]');
        var successScreen = form.querySelector('[data-done]');
        var formMessages = form.querySelectorAll('.form-msg');
        
        if (!steps.length) return;
        
        var currentStep = 1;
        var totalSteps = steps.length;
        
        // Pre-fill from URL parameters
        function preFillFromUrl() {
          var urlParams = new URLSearchParams(window.location.search);
          
           // Pre-fill services (comma-separated list)
           var serviceParam = urlParams.get('service');
           if (serviceParam) {
             var services = serviceParam.split(',');
             services.forEach(function(service) {
               var checkbox = form.querySelector('input[name="service"][value="' + service + '"]');
               if (checkbox) checkbox.checked = true;
             });
          
          // Pre-fill property
          var propertyParam = urlParams.get('property');
          if (propertyParam) {
            var propertySelect = form.querySelector('[name="property"]');
            if (propertySelect) propertySelect.value = propertyParam;
          }
          
          // Pre-fill size
          var sizeParam = urlParams.get('size');
          if (sizeParam) {
            var sizeSelect = form.querySelector('[name="size"]');
            if (sizeSelect) sizeSelect.value = sizeParam;
          }
          
          // Pre-fill town
          var townParam = urlParams.get('town');
          if (townParam) {
            var townInput = form.querySelector('[name="town"]');
            if (townInput) townInput.value = townParam;
          }
          
          // Pre-fill notes
          var notesParam = urlParams.get('notes');
          if (notesParam) {
            var notesInput = form.querySelector('[name="notes"]');
            if (notesInput) notesInput.value = decodeURIComponent(notesParam);
          }
        }
        
        // Validate current step
        function validateStep(stepNumber) {
          var step = steps[stepNumber - 1];
          if (!step) return true;
          
          var inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
          var isValid = true;
          
          // Special validation for step 1 (services) - at least one must be checked
          if (stepNumber === 1) {
            var serviceCheckboxes = step.querySelectorAll('input[name="service"]:checked');
            if (serviceCheckboxes.length === 0) {
              isValid = false;
              showError(step, 'Please select at least one service');
            } else {
              clearError(step);
            }
            return isValid;
          }
          
          // Special validation for step 4 (SMS consent must be checked)
          if (stepNumber === 4) {
            var smsConsent = step.querySelector('[name="sms_consent"]');
            if (smsConsent && !smsConsent.checked) {
              isValid = false;
              showError(step, 'Please agree to the SMS consent');
            } else {
              clearError(step);
            }
          }
          
           // Standard validation for other fields
           inputs.forEach(function(input) {
             if (!input.checkValidity()) {
               isValid = false;
               showError(input, input.validationMessage || 'Please fill out this field');
             } else {
               clearError(input);
             }
           });
     
           return isValid;
        }
        
        // Show error message
        function showError(element, message) {
          // Remove any existing error
          clearError(element);
          
          // Add error class
          element.classList.add('error');
          
          // Create error message if it doesn't exist
          var errorEl = element.parentElement.querySelector('.error-message');
          if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.setAttribute('role', 'alert');
            element.parentElement.appendChild(errorEl);
          }
          
          errorEl.textContent = message;
          
          // Also update aria-live message if present
          var ariaLiveEl = form.querySelector('[aria-live]');
          if (ariaLiveEl) {
            ariaLiveEl.textContent = message;
          }
        }
        
        // Clear error message
        function clearError(element) {
          element.classList.remove('error');
          var errorEl = element.parentElement.querySelector('.error-message');
          if (errorEl) {
            errorEl.remove();
          }
          
          // Also clear aria-live message if no errors in step
          var ariaLiveEl = form.querySelector('[aria-live]');
          if (ariaLiveEl) {
            var hasErrors = element.parentElement.querySelector('.error-message');
            if (!hasErrors) {
              ariaLiveEl.textContent = '';
            }
          }
        }
        
        // Update progress bar
        function updateProgress() {
          var progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
          progressFill.style.width = progressPercent + '%';
          
           // Update step indicators
           stepIndicators.forEach(function(indicator, index) {
             var stepNum = index + 1;
             if (stepNum < currentStep) {
               indicator.classList.remove('current');
               indicator.classList.add('done');
             } else if (stepNum === currentStep) {
               indicator.classList.add('current');
               indicator.classList.remove('done');
             } else {
               indicator.classList.remove('current');
               indicator.classList.remove('done');
             }
           });
     
         }
        
         // Show step
         function showStep(stepNumber) {
           // Hide all steps
           steps.forEach(function(step) {
             step.style.display = 'none';
           });
     
           // Show current step
          var stepToShow = steps[stepNumber - 1];
          if (stepToShow) {
            stepToShow.style.display = 'block';
            
            // Focus on first input in step or step legend
            var firstInput = stepToShow.querySelector('input, select, textarea');
            if (firstInput) {
              firstInput.focus();
            } else {
              // Fallback to step legend if no inputs found
              var stepLegend = stepToShow.querySelector('legend');
              if (stepLegend) {
                stepLegend.focus();
              }
            }
          }
          
          // Update navigation buttons
          if (prevBtn) prevBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
          if (nextBtn) nextBtn.style.display = stepNumber < totalSteps ? 'inline-block' : 'none';
          if (submitBtn) submitBtn.style.display = stepNumber === totalSteps ? 'inline-block' : 'none';
          
          // Update progress
          updateProgress();
        }
        
        // Handle form submission
        function handleSubmit(e) {
          e.preventDefault();
          
          // Validate final step
          if (!validateStep(currentStep)) {
            return;
          }
          
          // Build message with [PRIORITY] prefix if needed
          var propertyValue = form.elements.property ? form.elements.property.value : '';
          var sizeValue = form.elements.size ? form.elements.size.value : '';
          var serviceValues = Array.prototype.filter.call(form.elements.service, function(el) {
            return el.checked;
          }).map(function(el) {
            return el.value;
          }).join(', ');
          
          var message = 'PLANNER — Services: ' + serviceValues + ' | Property: ' + propertyValue + ' | Town: ' + (form.elements.town ? form.elements.town.value : '') + ' | Size: ' + sizeValue + ' | Timeline: ' + (form.elements.timeline ? form.elements.timeline.value : '') + ' | Best time: ' + (form.elements.best_time ? form.elements.best_time.value : '') + ' | Notes: ' + (form.elements.notes ? form.elements.notes.value : '');
          
          // Add [PRIORITY] prefix when property is Commercial building, Multi-site business or New construction/renovation, OR size is 25+
          var priorityProperties = ['commercial-building', 'multi-site-business', 'new-construction'];
          var prioritySizes = ['25-plus'];
          
          if (priorityProperties.indexOf(propertyValue) !== -1 || prioritySizes.indexOf(sizeValue) !== -1) {
            message = '[PRIORITY] ' + message;
          }
          
          // Set service field (single id or 'multiple')
          var serviceField = form.elements.service;
          if (serviceField) {
            if (serviceValues.split(', ').length > 1) {
              serviceField.value = 'multiple';
            } else if (serviceValues.split(', ').length === 1) {
              serviceField.value = serviceValues.split(', ')[0];
            } else {
              serviceField.value = '';
            }
          }
          
          // Set the message in the form
          if (form.elements.message) {
            form.elements.message.value = message;
          }
          
          // Track event
           try {
             window.dataLayer = window.dataLayer || [];
             window.dataLayer.push({
               event: 'generate_lead',
               form_source: form.elements.source ? form.elements.source.value : '',
               service: serviceValues
             });
           } catch (e) {
            // Silently fail if dataLayer not available
          }
          
          // Show success screen
          form.style.display = 'none';
          if (successScreen) successScreen.style.display = 'block';
          
          // Prevent actual form submission since we'll handle it via fetch
          return false;
        }
        
        // Initialize
        function init() {
          // Pre-fill from URL
          preFillFromUrl();
          
          // Show first step
          showStep(currentStep);
          
           // Add event listeners
           if (prevBtn) {
             prevBtn.addEventListener('click', function () {
               if (currentStep > 1) {
                 currentStep--;
                 showStep(currentStep);
               }
             });
          
           if (nextBtn) {
             nextBtn.addEventListener('click', function () {
               if (validateStep(currentStep) && currentStep < totalSteps) {
                 currentStep++;
                 showStep(currentStep);
               }
             });
          
          if (submitBtn) {
            submitBtn.addEventListener('click', handleSubmit);
          }
          
         // Handle Enter key
         form.addEventListener('keydown', function (e) {
           if (e.key === 'Enter') {
             e.preventDefault();
             if (document.activeElement.tagName === 'TEXTAREA') {
               // Don't submit on Enter in textarea
               return;
             }
             
             if (currentStep < totalSteps) {
               if (validateStep(currentStep)) {
                 currentStep++;
                 showStep(currentStep);
               }
             } else {
               handleSubmit(e);
             }
           }
         });
        
        // START INITIALIZATION
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
        } else {
           init();
         }

     });
     

     
     })();