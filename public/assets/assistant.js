(function () {
  'use strict';

  // Assistant widget IIFE
  // Part 1: Inject floating Ask Piets button and chat panel markup

  // Create the floating button and panel elements
  const button = document.createElement('button');
  button.id = 'assistant-button';
  button.innerHTML = `
    <svg class="logo-mark" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>
    <span>Ask Piets</span>
  `;
  button.setAttribute('aria-label', 'Open Piets Assistant');
  button.setAttribute('data-open-assistant', '');

  const panel = document.createElement('div');
  panel.id = 'assistant-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'assistant-header');
  panel.innerHTML = `
    <div class="panel-content">
      <header id="assistant-header">
        <h2>Piets Assistant — Questions? We're here 24/7</h2>
        <button id="assistant-close" aria-label="Close assistant">
          <svg class="icon-close" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </header>
      
      <div id="assistant-messages" role="log" aria-live="polite"></div>
      
      <div id="assistant-chips" class="chip-group">
        <button type="button" class="chip" data-query="Cameras for my business">Cameras for my business</button>
        <button type="button" class="chip" data-query="Fix my Wi-Fi">Fix my Wi-Fi</button>
        <button type="button" class="chip" data-query="Remote help now">Remote help now</button>
        <button type="button" class="chip" data-query="Pricing">Pricing</button>
        <button type="button" class="chip" data-query="Talk to a person">Talk to a person</button>
      </div>
      
      <form id="assistant-form">
        <label for="assistant-input" class="visually-hidden">Message Piets Assistant</label>
        <input type="text" id="assistant-input" placeholder="Type your question..." />
        <button type="submit" id="assistant-send">Send</button>
      </form>
    </div>
  `;

  // Add elements to document
  document.body.appendChild(button);
  document.body.appendChild(panel);

  // State tracking
  let isOpen = false;
  let greetingShown = false;

  // Open/close functionality
  function openAssistant() {
    if (isOpen) return;
    isOpen = true;
    button.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.removeAttribute('inert');
    trapFocus(panel);
    const log = document.getElementById('assistant-messages');
    if (log && !log.children.length) {
      addMessage('assistant', "Hi! I'm the Piets automated assistant. Ask about cameras, Wi-Fi, POS or support \u2014 or call/text 631-871-5957 to reach a person. Questions? We're here 24/7.");
    }
    
    // Focus on input when opening
    setTimeout(() => {
      document.getElementById('assistant-input').focus();
    }, 100);
  }

  function closeAssistant() {
    if (!isOpen) return;
    isOpen = false;
    button.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('inert', '');
    releaseFocus();
    
    // Return focus to button when closing
    button.focus();
  }

  // Event listeners for opening/closing
  button.addEventListener('click', openAssistant);
  document.getElementById('assistant-close').addEventListener('click', closeAssistant);
  
  // Open from any [data-open-assistant] element
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-open-assistant]')) {
      e.preventDefault();
      openAssistant();
    }
  });
  
  // Escape key closes
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      closeAssistant();
    }
  });

  // Focus trap implementation
  function trapFocus(element) {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement = element.querySelectorAll(focusableElements)[0];
    const focusableContent = element.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    element.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) { // shift + tab
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else { // tab
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    });
    
    // Initial focus
    firstFocusableElement.focus();
  }

  function releaseFocus() {
    // Remove focus trapping listeners
    // Implementation would go here in a full version
  }

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Greeting bubble logic for home and commercial pages only
  function showGreetingIfNeeded() {
    const path = window.location.pathname;
    if (path !== '/' && path !== '/commercial.html') return;
    
    try {
      const lastVisit = sessionStorage.getItem('assistantLastVisit');
      const now = Date.now();
      
      if (!lastVisit || (now - parseInt(lastVisit, 10)) > 24 * 60 * 60 * 1000) {
        // New session or expired (24 hours)
        sessionStorage.setItem('assistantLastVisit', now.toString());
        
        setTimeout(() => {
          if (!greetingShown && !isOpen) {
            showGreetingBubble();
            greetingShown = true;
          }
        }, 25000); // 25 seconds
      }
    } catch (e) {
      // sessionStorage unavailable, continue without greeting
    }
  }

  function showGreetingBubble() {
    // Create greeting bubble element
    const bubble = document.createElement('div');
    bubble.id = 'assistant-greeting';
    bubble.setAttribute('role', 'status');
    bubble.setAttribute('aria-live', 'polite');
    bubble.innerHTML = `
      <div class="greeting-content">
        <img class="logo-mark-small" src="/assets/brand/logo-mark.svg" width="22" height="22" alt="">
        <span>Questions? We're here 24/7</span>
        <button id="greeting-close" aria-label="Close">
          <svg class="icon-close-small" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(bubble);
    
    // Position bubble near the button
    const buttonRect = button.getBoundingClientRect();
    bubble.style.bottom = (buttonRect.bottom + window.scrollY + 10) + 'px';
    bubble.style.right = (buttonRect.right + window.scrollX - 20) + 'px';
    
    // Close button functionality
    bubble.querySelector('#greeting-close').addEventListener('click', function() {
      bubble.remove();
    });
    
    // Click on bubble opens assistant
    bubble.addEventListener('click', function(e) {
      if (e.target !== bubble.querySelector('#greeting-close')) {
        openAssistant();
        bubble.remove();
      }
    });
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.remove();
      }
    }, 10000);
  }

   // Initialize
   showGreetingIfNeeded();
   
   // Part 2: Brain, fallback, typing, lead capture
   const API_CHAT_ENDPOINT = '/api/chat';
   const API_LEADS_ENDPOINT = '/api/leads';
   const MAX_HISTORY_FOR_LEADS = 10;
   const isTypingElement = document.createElement('div');
   isTypingElement.id = 'assistant-typing';
   isTypingElement.innerHTML = '<span>Piets Assistant is typing...</span>';
   isTypingElement.setAttribute('aria-live', 'polite');
   
   // Fallback answer bank - only using facts from FACTS.md
   const FALLBACK_ANSWERS = {
     cameras: 'We install InVid Tech Paramont IP camera systems with 4K options, night vision, and phone viewing. Every quote is tailored to your site — we offer free demos in person or by video call.',
     wifi: 'We provide business-grade access points, routers and switches to eliminate dead zones. We create clean, documented network closets and set up guest networks. Every quote is tailored to your site — we offer free demos.',
     cabling: 'We install Cat6/Cat6A and fiber structured cabling, labeled and tested for new builds and retrofits. We serve offices, warehouses, restaurants, and homes. Every quote is tailored to your site — we offer free demos.',
     'access control': 'We install keypads, fobs, mobile credentials, and video intercoms for offices, multi-family and commercial doors. Every quote is tailored to your site — we offer free demos.',
     phones: 'We provide business phone systems (VoIP) with auto-attendants, call routing, mobile apps, and voicemail-to-email. Every quote is tailored to your site — we offer free demos.',
     pos: 'We provide restaurant and retail POS systems, payment terminals, kitchen printers, and the network behind them. We have years of hands-on payment-processing experience. Every quote is tailored to your site — we offer free demos.',
     'smart home': 'We install local, private Home Assistant automation for lights, locks, thermostats, shades and cameras with no required cloud fees. Every quote is tailored to your site — we offer free demos.',
     'remote support': 'We provide secure screen-share help in minutes using RustDesk. You download RustDesk, read us your ID, and we connect with permission. Every quote is tailored to your site — we offer free demos.',
     areas: 'We serve Long Island (Suffolk & Nassau County), New York City (all five boroughs), Hudson Valley (Westchester, Putnam, Dutchess & Orange), and Johnstown & Capital Region (Johnstown, Gloversville, Amsterdam, Albany & Saratoga). Larger commercial projects anywhere in the US are available on request. Remote support is available anywhere.',
     payment: 'We accept Zelle, Venmo, Cash App, cash, or check at no extra charge. Credit/debit card payments are available via a secure payment link with a 4% card processing fee. Every quote is tailored to your site — we offer free demos.',
     pricing: 'Every quote is tailored to your site — we do not offer one-size packages. We provide free demos in person or by video call to give you a tailored quote. Questions? We\'re here 24/7.',
     'free demo': 'We offer free demos in person or by video call. This allows us to tailor our quote to your specific site and needs. Questions? We\'re here 24/7.',
     '24/7': 'We provide 24/7 support by phone and text. You can reach us anytime at 631-871-5957 or pietstechsolutions@gmail.com.',
     human: 'You deal directly with the installer — the person who quotes the job is the person who installs it. We\'re owner-operated. Questions? We\'re here 24/7.'
   };
   
   // Keywords for routing to fallback answers
   const FALLBACK_KEYWORDS = [
     { keywords: ['camera', 'cameras', 'security camera'], answerKey: 'cameras' },
     { keywords: ['wifi', 'wi-fi', 'wireless', 'internet', 'network'], answerKey: 'wifi' },
     { keywords: ['cable', 'cabling', 'cat6', 'cat6a', 'fiber', 'ethernet', 'structured cabling'], answerKey: 'cabling' },
     { keywords: ['access control', 'keypad', 'fob', 'mobile credential', 'video intercom', 'door'], answerKey: 'access control' },
     { keywords: ['phone', 'phones', 'voip', 'business phone'], answerKey: 'phones' },
     { keywords: ['pos', 'point of sale', 'payment terminal', 'kitchen printer', 'restaurant pos', 'retail pos'], answerKey: 'pos' },
     { keywords: ['smart home', 'home assistant', 'automation', 'lights', 'locks', 'thermostats'], answerKey: 'smart home' },
     { keywords: ['remote support', 'rustdesk', 'screen share', 'remote help'], answerKey: 'remote support' },
     { keywords: ['area', 'areas', 'service area', 'long island', 'new york city', 'hudson valley', 'johnstown'], answerKey: 'areas' },
     { keywords: ['payment', 'pay', 'zelle', 'venmo', 'cash app', 'credit card', 'debit card'], answerKey: 'payment' },
     { keywords: ['price', 'pricing', 'cost', 'quote', 'quotes', 'pricing'], answerKey: 'pricing' },
     { keywords: ['free demo', 'demo', 'consultation', 'walkthrough', 'video call'], answerKey: 'free demo' },
     { keywords: ['24/7', '24 hour', 'around the clock', 'always available'], answerKey: '24/7' },
     { keywords: ['human', 'person', 'talk to a person', 'speak with someone', 'owner', 'installer'], answerKey: 'human' }
   ];
   
   // Get fallback answer based on user message
   function getFallbackAnswer(message) {
     const lowerMessage = message.toLowerCase();
     
     // Check each keyword group
     for (const group of FALLBACK_KEYWORDS) {
       for (const keyword of group.keywords) {
         if (lowerMessage.includes(keyword)) {
           return FALLBACK_ANSWERS[group.answerKey];
         }
       }
     }
     
     // Default fallback if no keywords match
     return 'We provide tailored solutions for security cameras, networking, cabling, access control, phone systems, POS, smart home, and remote support. Every quote is tailored to your site — we offer free demos in person or by video call. Questions? We\'re here 24/7.';
   }
   
   // Show typing indicator
   function showTypingIndicator() {
     const messagesContainer = document.getElementById('assistant-messages');
     messagesContainer.appendChild(isTypingElement);
     messagesContainer.scrollTop = messagesContainer.scrollHeight;
   }
   
   // Hide typing indicator
   function hideTypingIndicator() {
     if (isTypingElement.parentNode) {
       isTypingElement.remove();
     }
   }
   
   // Add message to chat
   function addMessage(sender, content) {
     const messagesContainer = document.getElementById('assistant-messages');
     const messageDiv = document.createElement('div');
     messageDiv.classList.add('message', `message-${sender}`);
     messageDiv.textContent = content;
     messagesContainer.appendChild(messageDiv);
     messagesContainer.scrollTop = messagesContainer.scrollHeight;
   }
   
   // Get last N messages for lead capture
   function getLastMessages(count) {
     const messagesContainer = document.getElementById('assistant-messages');
     const messageElements = messagesContainer.querySelectorAll('.message');
     const messages = [];
     
     // Get last N messages (or fewer if not enough)
     const startIndex = Math.max(0, messageElements.length - count);
     for (let i = startIndex; i < messageElements.length; i++) {
       const sender = messageElements[i].classList.contains('message-user') ? 'user' : 'assistant';
       messages.push({ sender, content: messageElements[i].textContent });
     }
     
     return messages;
   }
   
   // Check if message indicates interest in pricing/quote/visit/person
   function isLeadIntent(message) {
     const lowerMessage = message.toLowerCase();
     const leadKeywords = ['price', 'pricing', 'cost', 'quote', 'quotes', 'visit', 'person', 'human'];
     
     for (const keyword of leadKeywords) {
       if (lowerMessage.includes(keyword)) {
         return true;
       }
     }
     
     return false;
   }
   
   // Show lead capture form
   function showLeadForm() {
     const messagesContainer = document.getElementById('assistant-messages');
     
     // Remove any existing lead form
     const existingForm = document.getElementById('assistant-lead-form');
     if (existingForm) {
       existingForm.remove();
     }
     
     const formDiv = document.createElement('div');
     formDiv.id = 'assistant-lead-form';
     formDiv.innerHTML = `
       <div class="lead-form-content">
         <h3>Let\'s get you a tailored quote</h3>
         <p>Questions? We\'re here 24/7</p>
         <form id="assistant-lead-form-inner">
           <label for="lead-name">Name*</label>
           <input type="text" id="lead-name" required placeholder="Your name" autocomplete="name" />
           
           <label for="lead-phone">Phone*</label>
           <input type="tel" id="lead-phone" required placeholder="Your phone number" autocomplete="tel" inputmode="tel" />
           
           <label for="lead-time">Best time to reach you*</label>
           <input type="text" id="lead-time" required placeholder="e.g., Weekday mornings" />
           
           <button type="submit">Send Request</button>
           <p class="form-note">*Required fields</p>
         </form>
       </div>
     `;
     
     messagesContainer.appendChild(formDiv);
     messagesContainer.scrollTop = messagesContainer.scrollHeight;
     
     // Handle form submission
     formDiv.querySelector('#assistant-lead-form-inner').addEventListener('submit', function(e) {
       e.preventDefault();
       
       const name = document.getElementById('lead-name').value.trim();
       const phone = document.getElementById('lead-phone').value.trim();
       const bestTime = document.getElementById('lead-time').value.trim();
       
       if (name && phone && bestTime) {
         // Get last 10 messages for transcript
         const recentMessages = getLastMessages(MAX_HISTORY_FOR_LEADS);
         const messageText = recentMessages.map(msg => 
           `${msg.sender === 'user' ? 'Visitor' : 'Assistant'}: ${msg.content}`
         ).join('\n');
         
         // Prepare lead data
         const leadData = {
           name: name,
           phone: phone,
           email: '',  // Not required for this form per instructions
           town: '',   // Not collected in this form
           service: '', // Not collected in this form
           message: 'ASSISTANT — Best time: ' + bestTime + '\n' + messageText,
           source: 'Assistant',
           page: location.pathname,
           website: ''   // Honeypot field
         };
         
         // Submit lead
         fetch(API_LEADS_ENDPOINT, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(leadData)
         })
         .then(response => {
           if (response.ok) {
             // Show confirmation
             formDiv.innerHTML = `
               <div class="lead-form-content">
                 <h3>Got it!</h3>
                 <p>We\'ll reach out shortly. Or call/text 631-871-5957.</p>
               </div>
             `;
           } else {
             throw new Error('Failed to submit lead');
           }
         })
         .catch(error => {
           console.error('Lead submission error:', error);
           formDiv.innerHTML = `
             <div class="lead-form-content">
               <h3>Something went wrong</h3>
               <p>Please try again or call/text 631-871-5957 directly.</p>
             </div>
           `;
         });
       }
     });
   }
   
   // Handle sending message to API or fallback
   async function handleUserMessage(message) {
     // Add user message to chat
     addMessage('user', message);
     
     // Show typing indicator
     showTypingIndicator();
     
     try {
       // Try API first
       const response = await fetch(API_CHAT_ENDPOINT, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           messages: [
             { role: 'user', content: message }
           ]
         })
       });
       
       if (response.ok) {
         const data = await response.json();
         if (data.ok && data.reply) {
           // Hide typing indicator and show reply
           hideTypingIndicator();
           addMessage('assistant', data.reply);
           
           // Check if this is a lead intent
           if (isLeadIntent(message)) {
             setTimeout(() => {
               showLeadForm();
             }, 1000);
           }
           
           return;
         }
       }
       
       // If we get here, API failed or didn't return valid data
       throw new Error('API request failed or invalid response');
     } catch (error) {
       // API failed, use fallback
       console.log('API failed, using fallback:', error.message);
       hideTypingIndicator();
       
       // Get fallback answer
       const fallbackAnswer = getFallbackAnswer(message);
       addMessage('assistant', fallbackAnswer);
       
       // Check if this is a lead intent
       if (isLeadIntent(message)) {
         setTimeout(() => {
           showLeadForm();
         }, 1000);
       }
     }
   }
   
   // Override form submission to use our handler
   document.getElementById('assistant-form').addEventListener('submit', function(e) {
     e.preventDefault();
     const input = document.getElementById('assistant-input');
     const value = input.value.trim();
     if (value) {
       input.value = '';
       handleUserMessage(value);
     }
   });
   
   // Also handle chip clicks
   document.getElementById('assistant-chips').addEventListener('click', function(e) {
     if (e.target.classList.contains('chip')) {
       const query = e.target.getAttribute('data-query');
       if (query) {
         // Close chip group and input
         document.getElementById('assistant-chips').style.display = 'none';
         document.getElementById('assistant-form').style.display = 'flex';
         
         // Process the query
         handleUserMessage(query);
       }
     }
   });
   
    // Initial chip display (in case it was hidden)
    setTimeout(() => {
      document.getElementById('assistant-chips').style.display = 'flex';
      document.getElementById('assistant-form').style.display = 'flex';
    }, 100);
})();
