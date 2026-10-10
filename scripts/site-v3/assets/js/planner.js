/* 4-step Project Planner from BRIEF/FEATURES.md section E */
(function() {
  const plannerId = 'planner';
  const planner = document.getElementById(plannerId);
  if (!planner) return;

  const form = planner.querySelector('.planner-form');
  const steps = planner.querySelectorAll('.planner-step');
  const progressFill = planner.querySelector('.progress-fill');
  const stepIndicators = planner.querySelectorAll('.progress-steps .step');
  const prevBtn = planner.querySelector('.planner-prev');
  const nextBtn = planner.querySelector('.planner-next');
  const submitBtn = planner.querySelector('.planner-submit');
  const successScreen = planner.querySelector('.planner-success');
  const formMessages = planner.querySelectorAll('.form-msg');

  let currentStep = 1;
  const totalSteps = steps.length;

  // Pre-fill from URL parameters
  function preFillFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Pre-fill services
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      const services = serviceParam.split(',');
      services.forEach(service => {
        const checkbox = form.querySelector('input[name="service"][value="' + service + '"]');
        if (checkbox) checkbox.checked = true;
      });
    }
    
    // Pre-fill property
    const propertyParam = urlParams.get('property');
    if (propertyParam) {
      const propertySelect = form.querySelector('[name="property"]');
      if (propertySelect) propertySelect.value = propertyParam;
    }
    
    // Pre-fill size
    const sizeParam = urlParams.get('size');
    if (sizeParam) {
      const sizeSelect = form.querySelector('[name="size"]');
      if (sizeSelect) sizeSelect.value = sizeParam;
    }
    
    // Pre-fill town
    const townParam = urlParams.get('town');
    if (townParam) {
      const townInput = form.querySelector('[name="town"]');
      if (townInput) townInput.value = townParam;
    }
    
    // Pre-fill notes
    const notesParam = urlParams.get('notes');
    if (notesParam) {
      const notesInput = form.querySelector('[name="notes"]');
      if (notesInput) notesInput.value = decodeURIComponent(notesParam);
    }
  }

  // Validate current step
  function validateStep(stepNumber) {
    const step = steps[stepNumber - 1];
    if (!step) return true;
    
    const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    // Special validation for step 1 (services) - at least one must be checked
    if (stepNumber === 1) {
      const serviceCheckboxes = step.querySelectorAll('input[name="service"]:checked');
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
      const smsConsent = step.querySelector('[name="sms_consent"]');
      if (smsConsent && !smsConsent.checked) {
        isValid = false;
        showError(step, 'Please agree to the SMS consent');
      } else {
        clearError(step);
      }
    }
    
    // Standard validation for other fields
    inputs.forEach(input => {
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
    let errorEl = element.parentElement.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'error-message';
      errorEl.setAttribute('role', 'alert');
      element.parentElement.appendChild(errorEl);
    }
    
    errorEl.textContent = message;
    
    // Also update the form message for aria-live
    const formMsg = element.closest('.planner-step')?.querySelector('.form-msg');
    if (formMsg) {
      formMsg.textContent = message;
    }
  }

  // Clear error message
  function clearError(element) {
    element.classList.remove('error');
    const errorEl = element.parentElement.querySelector('.error-message');
    if (errorEl) {
      errorEl.remove();
    }
    
    // Clear the form message for aria-live
    const formMsg = element.closest('.planner-step')?.querySelector('.form-msg');
    if (formMsg) {
      formMsg.textContent = '';
    }
  }

  // Update progress bar
  function updateProgress() {
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = progressPercent + '%';
    
    // Update step indicators
    stepIndicators.forEach((indicator, index) => {
      const stepNum = index + 1;
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
  function showStep(stepNumber, moveFocus) {
    // Hide all steps
    steps.forEach(step => {
      step.style.display = 'none';
    });
    
    // Show current step
    const stepToShow = steps[stepNumber - 1];
    if (stepToShow) {
      stepToShow.style.display = 'block';
      
      // Focus on first input in step
      const firstInput = stepToShow.querySelector('input, select, textarea');
      if (firstInput && moveFocus !== false) {
        firstInput.focus({ preventScroll: true });
        stepToShow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    
    // Update navigation buttons
    prevBtn.style.display = currentStep > 1 ? 'inline-block' : 'none';
    nextBtn.style.display = stepNumber < totalSteps ? 'inline-block' : 'none';
    submitBtn.style.display = stepNumber === totalSteps ? 'inline-block' : 'none';
    
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
    const propertyValue = form.elements.property ? form.elements.property.value : '';
    const sizeValue = form.elements.size ? form.elements.size.value : '';
    const serviceValues = Array.from(form.elements.service)
      .filter(el => el.checked)
      .map(el => el.value)
      .join(', ');
    
    let message = `PLANNER — Services: ${serviceValues} | Property: ${propertyValue} | Town: ${form.elements.town?.value || ''} | Size: ${sizeValue} | Timeline: ${form.elements.timeline?.value || ''} | Best time: ${form.elements.best_time?.value || ''} | Notes: ${form.elements.notes?.value || ''}`;

    // Add [PRIORITY] prefix when property is Commercial building, Multi-site business or New construction/renovation, OR size is 25+
    const priorityProperties = ['commercial-building', 'multi-site-business', 'new-construction'];
    const prioritySizes = ['25-plus'];
    
    if (priorityProperties.includes(propertyValue) || prioritySizes.includes(sizeValue)) {
      message = '[PRIORITY] ' + message;
    }
    
    // Create hidden message input if it doesn't exist
    let messageInput = form.querySelector('[name="message"]');
    if (!messageInput) {
      messageInput = document.createElement('input');
      messageInput.type = 'hidden';
      messageInput.name = 'message';
      form.appendChild(messageInput);
    }
    
    // Set the message in the form
    messageInput.value = message;
    
      // Submit via fetch to /api/leads
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        town: formData.get('town'),
        service: (function (ids) { return ids.length === 1 ? ids[0] : (ids.length ? 'multiple' : ''); })(Array.from(formData.getAll('service'))),
        message: message,
        source: formData.get('source') || 'Planner',
        page: location.pathname,
        website: formData.get('website') || ''  // honeypot field
      };
      
      fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        // Hide the form and show success screen
        form.style.display = 'none';
        successScreen.style.display = 'block';
        if (window.ptsTrack) window.ptsTrack('generate_lead', { form_source: data.source, service: data.service });
        
        // Focus on the call button for accessibility
        const callButton = successScreen.querySelector('.call-button');
        if (callButton) {
          callButton.focus();
        }
      })
      .catch(error => {
        var msgs = form.querySelectorAll('.form-msg'); var m = msgs[msgs.length - 1];
        if (m) { m.className = 'form-msg err'; m.textContent = 'Hmm, that didn’t go through. Please call or text 631-871-5957 and we’ll take care of you.'; }
      });
  }

  // Initialize
  function init() {
    // Pre-fill from URL
    preFillFromUrl();
    
    // Show first step
    showStep(currentStep, false);
    
    // Add event listeners
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (validateStep(currentStep) && currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });
    
    submitBtn.addEventListener('click', handleSubmit);
    
    // Handle Enter key
    form.addEventListener('keydown', (e) => {
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
  }
  
  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
// @@MORE@@