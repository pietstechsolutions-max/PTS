(function () {
  'use strict';

  // Hero smart box functionality
  (function () {
    const promptBox = document.querySelector('[data-smartbox]');
    if (!promptBox) return;

    const textarea = promptBox.querySelector('#hero-textarea');
    const buildBtn = promptBox.querySelector('[data-build-plan]');
    const recoDiv = promptBox.querySelector('[data-reco]');
    const exampleChips = promptBox.querySelectorAll('.example-chip');

    // Keywords for matching
    const serviceKeywords = {
      'security-cameras': ['camera', 'cameras', 'cctv', 'nvr', 'dvr', 'surveillance'],
      'networking-wifi': ['wifi', 'wi-fi', 'wireless', 'internet', 'network', 'router', 'dead zone'],
      'structured-cabling': ['cable', 'cabling', 'cat5', 'cat6', 'fiber', 'ethernet', 'wiring', 'pre-wire'],
      'access-control': ['door', 'doors', 'access control', 'fob', 'fobs', 'keycard', 'intercom', 'keypad'],
      'ip-phones': ['phone system', 'phones', 'voip', 'business phone'],
      'pos': ['pos', 'point of sale', 'register', 'payment terminal', 'kitchen printer'],
      'menu-boards': ['menu board', 'menu boards', 'tv menu'],
      'ghost-kitchen': ['ghost kitchen', 'delivery kitchen'],
      'smart-home': ['smart home', 'home assistant', 'alexa', 'google home', 'smart light', 'automation', 'thermostat', 'smart lock'],
      'lighting': ['holiday light', 'christmas light', 'permanent light', 'holiday lighting', 'permanent lighting', 'outdoor lighting', 'roofline', 'string light'],
      'it-support': ['computer', 'computers', 'printer', 'printers', 'laptop', 'email', 'it support', 'virus', 'malware'],
      'remote-support': ['remote support', 'rustdesk', 'remote help']
    };

    const propertyKeywords = {
      'home': ['home', 'house', 'apartment', 'condo', 'residential'],
      'small-business': ['office', 'offices', 'retail', 'store', 'shop', 'restaurant', 'cafe'],
      'commercial-building': ['building', 'commercial building', 'office building', 'warehouse'],
      'multi-site-business': ['multi-site', 'multiple locations', 'chain', 'franchise'],
      'new-construction': ['new construction', 'new build', 'construction', 'renovation', 'remodel']
    };

    // Example chip click handlers
    exampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        textarea.value = chip.textContent;
        textarea.focus();
        // Trigger input event to update recommendations
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
      });
    });

    // Build plan button click handler
    buildBtn.addEventListener('click', () => {
      if (textarea.value.trim() === '') {
        // Show friendly suggestion if empty
        showRecommendation({ services: [], properties: [], size: null, town: null });
        return;
      }

      // Build recommendation card
      const recommendation = analyzeProject(textarea.value);
      showRecommendation(recommendation);
    });

    // Analyze project text and return recommendation data
    function analyzeProject(text) {
      const lowerText = text.toLowerCase();
      const detectedServices = [];
      const detectedProperties = [];
      let detectedSize = null;
      let detectedTown = null;

      // Detect services
      for (const [service, keywords] of Object.entries(serviceKeywords)) {
        for (const keyword of keywords) {
          if (lowerText.includes(keyword)) {
            detectedServices.push(service);
            break; // Only count each service once
          }
        }
      }

      // Detect property type
      for (const [property, keywords] of Object.entries(propertyKeywords)) {
        for (const keyword of keywords) {
          if (lowerText.includes(keyword)) {
            detectedProperties.push(property);
            break; // Only count each property once
          }
        }
      }

      // Detect size (look for numbers)
      const sizeMatch = text.match(/(\d+)\s*(?:cameras?|devices?|points?)/i);
      if (sizeMatch) {
        const num = parseInt(sizeMatch[1]);
        if (num <= 4) detectedSize = '1-4';
        else if (num <= 10) detectedSize = '5-10';
        else if (num <= 25) detectedSize = '11-25';
        else detectedSize = '25-plus';
      }

      // Detect town/ZIP (look for capitalized words or common patterns)
      const townMatch = text.match(/\b(?:in|at|near)\s+((?:[A-Z][a-zA-Z'.-]+)(?:\s+[A-Z][a-zA-Z'.-]+){0,2})/);
      if (townMatch) {
        detectedTown = townMatch[1];
      } else {
        // Try to find ZIP code pattern
        const zipMatch = text.match(/\b\d{5}(?:[-\s]\d{4})?\b/);
        if (zipMatch) {
          detectedTown = zipMatch[0];
        }
      }

      return {
        services: [...new Set(detectedServices)], // Remove duplicates
        properties: [...new Set(detectedProperties)], // Remove duplicates
        size: detectedSize,
        town: detectedTown,
        originalText: text
      };
    }

    // Show recommendation card
    function showRecommendation(data) {
      // Clear previous content
      recoDiv.innerHTML = '';

      if (data.services.length === 0 && !data.properties.length && !data.size && !data.town) {
        // Show friendly suggestions
        recoDiv.innerHTML = `
          <div class="reco-card">
            <div class="reco-card-header">
              <h3>Let's build your plan</h3>
            </div>
            <div class="reco-steps">
              <div class="reco-step">
                <div class="reco-step-number">1</div>
                <div class="reco-step-content">
                  <h4>Tell us what you need</h4>
                  <p>Try describing your project with details like:</p>
                  <ul style="margin: 0.5rem 0 0 1.5rem; padding: 0;">
                    <li>Number of cameras or devices</li>
                    <li>Type of property (home, office, restaurant, etc.)</li>
                    <li>Your town or area</li>
                    <li>Specific services you're interested in</li>
                  </ul>
                </div>
              </div>
              <div class="reco-step">
                <div class="reco-step-number">2</div>
                <div class="reco-step-content">
                  <h4>Example:</h4>
                  <p>"8 cameras and new Wi-Fi for my restaurant in Hauppauge"</p>
                </div>
              </div>
            </div>
            <div class="reco-actions">
              <button type="button" class="btn btn-outline edit">Edit</button>
            </div>
          </div>
        `;
        return;
      }

      // Build services text for display
      const serviceLabels = {
        'security-cameras': 'Security cameras',
        'networking-wifi': 'Networking & Wi-Fi',
        'structured-cabling': 'Structured cabling',
        'access-control': 'Access control & intercoms',
        'ip-phones': 'Business phones (VoIP)',
        'pos': 'POS & merchant',
        'menu-boards': 'TV menu boards',
        'ghost-kitchen': 'Ghost kitchen setup',
        'smart-home': 'Smart home (Home Assistant)',
        'lighting': 'Holiday & permanent lighting',
        'it-support': 'IT support & repair',
        'remote-support': 'Remote support'
      };

      const propertyLabels = {
        'home': 'Home',
        'small-business': 'Small Business',
        'commercial-building': 'Commercial Building',
        'multi-site-business': 'Multi-site Business',
        'new-construction': 'New Construction or Renovation'
      };

      const serviceChips = data.services.map(service => 
        `<span class="reco-chip">${serviceLabels[service] || service}</span>`).join('');

      const propertyChips = data.properties.map(property => 
        `<span class="reco-chip">${propertyLabels[property] || property}</span>`).join('');

      // Build plan URL with parameters
      let planUrl = '/plan';
      const params = new URLSearchParams();

      if (data.services.length > 0) {
        params.set('service', data.services.join(','));
      }
      if (data.properties.length > 0) {
        params.set('property', data.properties[0]); // Take first property
      }
      if (data.size) {
        params.set('size', data.size);
      }
      if (data.town) {
        params.set('town', data.town);
      }
      if (data.originalText) {
        params.set('notes', data.originalText);
      }

      if (params.toString()) {
        planUrl += '?' + params.toString();
      }

      // Create recommendation card
      recoDiv.innerHTML = `
        <div class="reco-card">
          <div class="reco-card-header">
            <h3>Your Piets plan</h3>
          </div>
          ${serviceChips ? `<div style="margin: 1rem 0;">${serviceChips}</div>` : ''}
          ${propertyChips ? `<div style="margin: 1rem 0;">${propertyChips}</div>` : ''}
          ${data.size ? `<div style="margin: 1rem 0;"><span class="reco-chip">Size: ${data.size}</span></div>` : ''}
          ${data.town ? `<div style="margin: 1rem 0;"><span class="reco-chip">Location: ${data.town}</span></div>` : ''}
          
          <div class="reco-steps">
            <div class="reco-step">
              <div class="reco-step-number">1</div>
              <div class="reco-step-content">
                <h4>Free walkthrough or video demo</h4>
                <p>We assess your property and discuss your goals.</p>
              </div>
            </div>
            <div class="reco-step">
              <div class="reco-step-number">2</div>
              <div class="reco-step-content">
                <h4>Tailored design & quote</h4>
                <p>You get a custom plan showing exactly what we'll install.</p>
              </div>
            </div>
            <div class="reco-step">
              <div class="reco-step-number">3</div>
              <div class="reco-step-content">
                <h4>Clean, labeled install</h4>
                <p>We run the cables, mount the equipment and label everything clearly.</p>
              </div>
            </div>
            <div class="reco-step">
              <div class="reco-step-number">4</div>
              <div class="reco-step-content">
                <h4>Training & 24/7 support</h4>
                <p>We show you how to use your new system and remain available for help.</p>
              </div>
            </div>
          </div>
          
          <div class="reco-actions">
            <a href="${planUrl}" class="btn btn-primary send">Send this to Piets</a>
            <button type="button" class="btn btn-outline edit">Edit</button>
          </div>
        </div>
      `;

      // Add event listener to edit button
      const editButton = recoDiv.querySelector('.edit');
      if (editButton) {
        editButton.addEventListener('click', () => {
          recoDiv.innerHTML = '';
          textarea.value = '';
          textarea.focus();
        });
      }
    }

    // Auto-analyze on input with debounce
    let timeoutId;
    textarea.addEventListener('input', () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (textarea.value.trim() !== '') {
          const recommendation = analyzeProject(textarea.value);
          // Only show recommendation if we detected something meaningful
          if (recommendation.services.length > 0 || 
              recommendation.properties.length > 0 || 
              recommendation.size || 
              recommendation.town) {
            showRecommendation(recommendation);
          } else {
            // Clear recommendation if nothing detected
            recoDiv.innerHTML = '';
          }
        } else {
          recoDiv.innerHTML = '';
        }
      }, 500);
    });
  })();
})();