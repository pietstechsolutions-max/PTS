(function() {
  // Floor plan templates as simple polygons/rects in 1000x700 coordinate space
  const templates = {
    house: {
      outer: [0, 0, 1000, 0, 1000, 700, 0, 700],
      rooms: [
        [200, 150, 800, 150, 800, 550, 200, 550], // Living room
        [200, 150, 400, 150, 400, 350, 200, 350], // Kitchen
        [600, 150, 800, 150, 800, 350, 600, 350], // Bedroom 1
        [600, 350, 800, 350, 800, 550, 600, 550]  // Bedroom 2
      ],
      doors: [
        [300, 0, 300, 20], // Front door
        [500, 700, 500, 680], // Back door
        [200, 250, 220, 250], // Interior door 1
        [600, 250, 620, 250]  // Interior door 2
      ],
      driveway: [800, 600, 950, 650] // Simple driveway rectangle
    },
    storefront: {
      outer: [0, 0, 1000, 0, 1000, 700, 0, 700],
      rooms: [
        [0, 150, 1000, 150, 1000, 550, 0, 550] // Main retail space
      ],
      doors: [
        [400, 0, 400, 30], // Front entrance
        [600, 0, 600, 30], // Side entrance
        [200, 350, 230, 350], // Back door
        [800, 350, 830, 350] // Service door
      ],
      parking: [
        [0, 600, 200, 700], // Parking spot 1
        [200, 600, 400, 700], // Parking spot 2
        [400, 600, 600, 700], // Parking spot 3
        [600, 600, 800, 700], // Parking spot 4
        [800, 600, 1000, 700] // Parking spot 5
      ]
    },
    office: {
      outer: [0, 0, 1000, 0, 1000, 700, 0, 700],
      rooms: [
        [0, 0, 500, 350, 500, 350, 0, 350], // Reception
        [500, 0, 1000, 0, 1000, 350, 500, 350], // Open office area
        [0, 350, 300, 350, 300, 700, 0, 700], // Office 1
        [300, 350, 600, 350, 600, 700, 300, 700], // Office 2
        [600, 350, 1000, 350, 1000, 700, 600, 700] // Conference room
      ],
      doors: [
        [250, 0, 250, 30], // Main entrance
        [750, 0, 750, 30], // Side entrance
        [150, 350, 180, 350], // Office 1 door
        [450, 350, 480, 350], // Office 2 door
        [800, 350, 830, 350], // Conference room door
        [150, 525, 180, 525], // Interior door
        [450, 525, 480, 525]  // Interior door
      ]
    },
    warehouse: {
      outer: [0, 0, 1000, 0, 1000, 700, 0, 700],
      rooms: [
        [0, 0, 1000, 0, 1000, 700, 0, 700] // Main warehouse space
      ],
      doors: [
        [400, 0, 400, 50], // Loading dock
        [600, 0, 600, 50], // Side door
        [200, 350, 250, 350], // Personnel door 1
        [800, 350, 850, 350] // Personnel door 2
      ],
      parking: [
        [0, 600, 300, 700], // Loading area
        [700, 600, 1000, 700] // Truck parking
      ]
    }
  };

  // State object
  const state = {
    template: 'house', // Default template
    cams: [] // Array of {x, y, angle, lens}
  };

  // Function to draw the selected template into the SVG #cov-stage
  function drawTemplate() {
    const svg = document.getElementById('cov-stage');
    if (!svg) return;

    // Clear existing content
    svg.innerHTML = '';

    const template = templates[state.template];
    if (!template) return;

    // Draw outer walls
    if (template.outer) {
      const outerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d = `M ${template.outer[0]},${template.outer[1]}`;
      for (let i = 2; i < template.outer.length; i += 2) {
        d += ` L ${template.outer[i]},${template.outer[i+1]}`;
      }
      d += ' Z';
      outerPath.setAttribute('d', d);
      outerPath.setAttribute('stroke', '#333');
      outerPath.setAttribute('stroke-width', '3');
      outerPath.setAttribute('fill', 'none');
      svg.appendChild(outerPath);
    }

    // Draw rooms
    if (template.rooms) {
      template.rooms.forEach(room => {
        const roomPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let d = `M ${room[0]},${room[1]}`;
        for (let i = 2; i < room.length; i += 2) {
          d += ` L ${room[i]},${room[i+1]}`;
        }
        d += ' Z';
        roomPath.setAttribute('d', d);
        roomPath.setAttribute('stroke', '#666');
        roomPath.setAttribute('stroke-width', '1');
        roomPath.setAttribute('fill', 'none');
        roomPath.setAttribute('stroke-dasharray', '4,2');
        svg.appendChild(roomPath);
      });
    }

    // Draw doors
    if (template.doors) {
      template.doors.forEach(door => {
        const doorLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        doorLine.setAttribute('x1', door[0]);
        doorLine.setAttribute('y1', door[1]);
        doorLine.setAttribute('x2', door[2]);
        doorLine.setAttribute('y2', door[3]);
        doorLine.setAttribute('stroke', '#0066cc');
        doorLine.setAttribute('stroke-width', '3');
        svg.appendChild(doorLine);
      });
    }

    // Draw driveway/parking
    if (template.driveway) {
      const drivewayRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      drivewayRect.setAttribute('x', template.driveway[0]);
      drivewayRect.setAttribute('y', template.driveway[1]);
      drivewayRect.setAttribute('width', template.driveway[2] - template.driveway[0]);
      drivewayRect.setAttribute('height', template.driveway[3] - template.driveway[1]);
      drivewayRect.setAttribute('stroke', '#999');
      drivewayRect.setAttribute('stroke-width', '2');
      drivewayRect.setAttribute('fill', '#f0f0f0');
      svg.appendChild(drivewayRect);
    }

    if (template.parking) {
      template.parking.forEach(spot => {
        const parkingRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        parkingRect.setAttribute('x', spot[0]);
        parkingRect.setAttribute('y', spot[1]);
        parkingRect.setAttribute('width', spot[2] - spot[0]);
        parkingRect.setAttribute('height', spot[3] - spot[1]);
        parkingRect.setAttribute('stroke', '#666');
        parkingRect.setAttribute('stroke-width', '1');
        parkingRect.setAttribute('fill', '#e6e6e6');
        svg.appendChild(parkingRect);
      });
    }

    // Draw cameras
    drawCameras();
  }

  // Function to draw cameras
  function drawCameras() {
    const svg = document.getElementById('cov-stage');
    if (!svg) return;

    // Remove existing camera elements
    svg.querySelectorAll('.camera').forEach(el => el.remove());
    svg.querySelectorAll('.fov').forEach(el => el.remove());

    // Draw each camera
    state.cams.forEach((cam, index) => {
      // Draw camera body
      const cameraCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      cameraCircle.setAttribute('cx', cam.x);
      cameraCircle.setAttribute('cy', cam.y);
      cameraCircle.setAttribute('r', '8');
      cameraCircle.setAttribute('fill', '#0066cc');
      cameraCircle.setAttribute('class', 'camera');
      cameraCircle.setAttribute('data-index', index);
      svg.appendChild(cameraCircle);

      // Draw camera direction indicator
      const dirX = cam.x + 15 * Math.cos(cam.angle * Math.PI / 180);
      const dirY = cam.y + 15 * Math.sin(cam.angle * Math.PI / 180);
      const dirLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      dirLine.setAttribute('x1', cam.x);
      dirLine.setAttribute('y1', cam.y);
      dirLine.setAttribute('x2', dirX);
      dirLine.setAttribute('y2', dirY);
      dirLine.setAttribute('stroke', '#ffffff');
      dirLine.setAttribute('stroke-width', '2');
      dirLine.setAttribute('class', 'camera');
      svg.appendChild(dirLine);

      // Draw field of view
      const fovPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const lensAngles = { wide: 90, standard: 60, long: 30 };
      const angle = lensAngles[cam.lens] || 60;
      const radius = 100; // Fixed FOV radius for simplicity
      
      const points = [];
      points.push(`${cam.x},${cam.y}`); // Center point
      
      // Create arc points
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const a = (cam.angle - angle/2) + (angle * i / steps);
        const rad = a * Math.PI / 180;
        const x = cam.x + radius * Math.cos(rad);
        const y = cam.y + radius * Math.sin(rad);
        points.push(`${x},${y}`);
      }
      points.push(`${cam.x},${cam.y}`); // Back to center
      
      const d = `M ${points[0]} L ${points[1]}`;
      for (let i = 2; i < points.length - 1; i++) {
        d += ` L ${points[i]}`;
      }
      d += ` Z`;
      
      fovPath.setAttribute('d', d);
      fovPath.setAttribute('fill', '#00ffff');
      fovPath.setAttribute('fill-opacity', '0.2');
      fovPath.setAttribute('stroke', '#00ffff');
      fovPath.setAttribute('stroke-width', '1');
      fovPath.setAttribute('class', 'fov');
      svg.appendChild(fovPath);
    });
  }

  // Template switching buttons functionality
  function setupTemplateButtons() {
    const buttons = document.querySelectorAll('.template-btn[data-template]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.template-btn[data-template]').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update state and redraw
        state.template = button.getAttribute('data-template');
        drawTemplate();
      });
    });
  }

  // Initialize the coverage planner
  function init() {
    // Draw initial template
    drawTemplate();
    
    // Setup template buttons
    setupTemplateButtons();
  }

  // Start initialization when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

// Part 3: Live counters and form submission

// Geometry helper functions
function pointInPolygon(point, polygon) {
  // Ray casting algorithm
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > point[1]) !== (yj > point[1])) &&
                      (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInCone(point, camera) {
  const dx = point[0] - camera.x;
  const dy = point[1] - camera.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Check if within lens length
  const lensLengths = { wide: 220, standard: 320, long: 480 };
  if (distance > lensLengths[camera.lens]) return false;
  
  // Check if within field of view angle
  const lensAngles = { wide: 110, standard: 85, long: 45 };
  const angle = lensAngles[camera.lens];
  
  // Calculate angle from camera to point
  const cameraAngleRad = camera.angle * Math.PI / 180;
  const toPointAngleRad = Math.atan2(dy, dx);
  
  // Normalize angle difference
  let angleDiff = toPointAngleRad - cameraAngleRad;
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  
  return Math.abs(angleDiff) <= angle / 2 * Math.PI / 180;
}

// Calculate approximate coverage using grid sampling
function calculateCoverage() {
  if (state.cams.length === 0) return 0;
  
  const template = templates[state.template];
  if (!template || !template.outer) return 0;
  
  // Convert outer boundary to array of points
  const outerPoints = [];
  for (let i = 0; i < template.outer.length; i += 2) {
    outerPoints.push([template.outer[i], template.outer[i + 1]]);
  }
  
  // Grid sampling every 20 units
  const step = 20;
  let coveredPoints = 0;
  let totalPoints = 0;
  
  // Sample points within bounding box
  for (let x = 0; x <= 1000; x += step) {
    for (let y = 0; y <= 700; y += step) {
      const point = [x, y];
      
      // Check if point is inside the building outline
      if (pointInPolygon(point, outerPoints)) {
        totalPoints++;
        
        // Check if point is covered by any camera
        let isCovered = false;
        for (const cam of state.cams) {
          if (pointInCone(point, cam)) {
            isCovered = true;
            break;
          }
        }
        
        if (isCovered) coveredPoints++;
      }
    }
  }
  
  return totalPoints > 0 ? Math.round((coveredPoints / totalPoints) * 100) : 0;
}

// Update counters with real calculations
function updateCounters() {
  const cameraCount = document.getElementById('camera-count');
  const percentCovered = document.getElementById('coverage-percent');
  const lensMix = document.getElementById('lens-mix');
  
  if (cameraCount) {
    cameraCount.textContent = state.cams.length;
  }
  
  if (percentCovered) {
    const coverage = calculateCoverage();
    percentCovered.textContent = coverage + '%';
  }
  
  if (lensMix) {
    const counts = { wide: 0, standard: 0, long: 0 };
    state.cams.forEach(cam => {
      if (counts[cam.lens] !== undefined) {
        counts[cam.lens]++;
      }
    });
    lensMix.textContent = `Wide: ${counts.wide}, Standard: ${counts.standard}, Long: ${counts.long}`;
  }
}

// Form submission handler
function handleFormSubmit() {
  const form = document.querySelector('[data-cov-form]');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('coverage-name').value.trim();
    const phone = document.getElementById('coverage-phone').value.trim();
    const email = document.getElementById('coverage-email').value.trim();
    const town = document.getElementById('coverage-town').value.trim();
    
    // Validate required fields
    if (!name || !phone || !town) {
      showFormMessage('Please fill in all required fields', 'error');
      return;
    }
    
    // Validate phone (10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      showFormMessage('Please enter a valid 10-digit phone number', 'error');
      return;
    }
    
    // Prepare message with layout details
    const templateName = state.template.charAt(0).toUpperCase() + state.template.slice(1);
    const cameraDetails = state.cams.map((cam, index) => 
      `Camera ${index + 1}: ${Math.round(cam.x/1000*100)}%, ${Math.round(cam.y/700*100)}%, ${Math.round(cam.angle)}°`
    ).join(', ');
    
    const message = `Template: ${templateName}\n` +
                   `Cameras: ${state.cams.length}\n` +
                   `Lens Mix: Wide: ${state.cams.filter(c => c.lens === 'wide').length}, ` +
                   `Standard: ${state.cams.filter(c => c.lens === 'standard').length}, ` +
                   `Long: ${state.cams.filter(c => c.lens === 'long').length}\n` +
                   `Camera Positions: ${cameraDetails}\n` +
                   `Coverage: ${calculateCoverage()}%\n` +
                   `Submitted via Coverage Planner`;
    
    // Prepare form data
    const formData = {
      name: name,
      phone: phone,
      email: email,
      town: town,
      service: 'security-cameras',
      message: message,
      source: 'Coverage Planner',
      website: '' // honeypot field
    };
    
    // Submit via fetch
    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      showFormMessage('Layout sent successfully!', 'success');
      form.reset();
      // Hide form after success
      setTimeout(() => {
        const formContainer = document.getElementById('coverage-form-container');
        if (formContainer) {
          formContainer.style.display = 'none';
        }
      }, 1500);
    })
    .catch(error => {
      console.error('Error:', error);
      showFormMessage('Failed to send layout. Please try again.', 'error');
    });
  });
}

// Show form message
function showFormMessage(message, type) {
  const msgDiv = document.querySelector('[data-cov-form] .form-msg');
  if (!msgDiv) return;
  
  msgDiv.textContent = message;
  msgDiv.className = `form-msg ${type}`;
  
  // Auto-clear after 5 seconds
  setTimeout(() => {
    msgDiv.textContent = '';
    msgDiv.className = 'form-msg';
  }, 5000);
}

// Initialize form functionality
function initFormFeatures() {
  handleFormSubmit();
}

// Update init function to include form features
const originalInitInteractiveFeatures = window.initInteractiveFeatures || function() {};
window.initInteractiveFeatures = function() {
  originalInitInteractiveFeatures();
  initFormFeatures();
};

// Re-initialize if already loaded
if (document.readyState !== 'loading') {
  initFormFeatures();
}
// Part 2: Interactive camera placement and manipulation

// Camera lenses configuration
const lensConfig = {
  wide: { angle: 110, length: 220 },
  standard: { angle: 85, length: 320 },
  long: { angle: 45, length: 480 }
};

// Current selected lens for new cameras
let currentLens = 'standard';

// Undo stack
const undoStack = [];

// Save state for undo
function saveState() {
  undoStack.push(JSON.parse(JSON.stringify(state)));
}

// Restore state from undo
function undo() {
  if (undoStack.length > 0) {
    state = undoStack.pop();
    drawTemplate();
    updateCounters();
  }
}

// Clear all cameras
function clearCameras() {
  saveState();
  state.cams = [];
  drawTemplate();
  updateCounters();
}

// Add camera at position
function addCamera(x, y) {
  saveState();
  state.cams.push({ x, y, angle: 0, lens: currentLens });
  drawTemplate();
  updateCounters();
}

// Update camera position
function updateCameraPosition(index, x, y) {
  saveState();
  if (state.cams[index]) {
    state.cams[index].x = x;
    state.cams[index].y = y;
    drawTemplate();
    updateCounters();
  }
}

// Update camera angle
function updateCameraAngle(index, angle) {
  saveState();
  if (state.cams[index]) {
    state.cams[index].angle = angle;
    drawTemplate();
    updateCounters();
  }
}

// Remove camera
function removeCamera(index) {
  saveState();
  if (state.cams[index]) {
    state.cams.splice(index, 1);
    drawTemplate();
    updateCounters();
  }
}

// Keyboard event handler
function handleKeyDown(e) {
  const focusedElem = document.activeElement;
  // Only handle keys if we're not in an input field
  if (focusedElem.tagName === 'INPUT' || focusedElem.tagName === 'TEXTAREA' || focusedElem.isContentEditable) {
    return;
  }

  switch (e.key) {
    case 'Delete':
    case 'Backspace':
      // Remove focused camera
      const focusedCamera = document.querySelector('.camera:focus');
      if (focusedCamera) {
        const index = parseInt(focusedCamera.getAttribute('data-index'));
        removeCamera(index);
      }
      e.preventDefault();
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowDown':
      // Rotate focused camera
      const cameraToRotate = document.querySelector('.camera:focus');
      if (cameraToRotate) {
        const index = parseInt(cameraToRotate.getAttribute('data-index'));
        const cam = state.cams[index];
        if (cam) {
          let delta = 5; // degrees
          if (e.key === 'ArrowLeft') delta = -5;
          else if (e.key === 'ArrowRight') delta = 5;
          else if (e.key === 'ArrowUp') delta = -5;
          else if (e.key === 'ArrowDown') delta = 5;
          
          updateCameraAngle(index, (cam.angle + delta + 360) % 360);
        }
      }
      e.preventDefault();
      break;
    case 'Tab':
      // Tab navigation handled by browser, just ensure cameras are focusable
      break;
  }
}

// Pointer event handler for dragging cameras
let draggingCamera = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function handlePointerDown(e) {
  // Check if clicking on a camera
  const cameraElem = e.target.closest('.camera');
  if (cameraElem) {
    const index = parseInt(cameraElem.getAttribute('data-index'));
    draggingCamera = index;
    
    // Get camera position
    const cam = state.cams[index];
    if (cam) {
      // Calculate offset from pointer to camera center
      const svg = document.getElementById('cov-stage');
      const rect = svg.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left - cam.x;
      dragOffsetY = e.clientY - rect.top - cam.y;
      
      // Focus the camera for keyboard controls
      cameraElem.focus();
    }
    
    e.preventDefault();
  } else {
    // Click on empty space to add camera
    const svg = document.getElementById('cov-stage');
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only add if within stage bounds
      if (x >= 0 && x <= 1000 && y >= 0 && y <= 700) {
        addCamera(x, y);
      }
    }
  }
}

function handlePointerMove(e) {
  if (draggingCamera !== null) {
    const svg = document.getElementById('cov-stage');
    if (svg) {
      const rect = svg.getBoundingClientRect();
      let x = e.clientX - rect.left - dragOffsetX;
      let y = e.clientY - rect.top - dragOffsetY;
      
      // Keep within bounds
      x = Math.max(0, Math.min(1000, x));
      y = Math.max(0, Math.min(700, y));
      
      updateCameraPosition(draggingCamera, x, y);
    }
  }
}

function handlePointerUp() {
  draggingCamera = null;
}

// Setup event listeners
function setupEventListeners() {
  const svg = document.getElementById('cov-stage');
  if (!svg) return;
  
  // Pointer events for adding/moving cameras
  svg.addEventListener('pointerdown', handlePointerDown);
  svg.addEventListener('pointermove', handlePointerMove);
  svg.addEventListener('pointerup', handlePointerUp);
  svg.addEventListener('pointerleave', handlePointerUp);
  
  // Keyboard events
  document.addEventListener('keydown', handleKeyDown);
  
  // Make SVG container focusable for keyboard navigation
  svg.setAttribute('tabindex', '0');
  
  // Focus management for cameras
  svg.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('camera')) {
      // Already focused via tabindex
    }
  });
}

// Update counters display
function updateCounters() {
  const cameraCount = document.querySelector('[data-camera-count]');
  const percentCovered = document.querySelector('[data-percent-covered]');
  const lensMix = document.querySelector('[data-lens-mix]');
  
  if (cameraCount) {
    cameraCount.textContent = state.cams.length;
  }
  
  if (percentCovered) {
    // Simple coverage calculation - just show placeholder for now
    percentCovered.textContent = '0';
  }
  
  if (lensMix) {
    const counts = { wide: 0, standard: 0, long: 0 };
    state.cams.forEach(cam => {
      if (counts[cam.lens] !== undefined) {
        counts[cam.lens]++;
      }
    });
    lensMix.textContent = `W:${counts.wide} S:${counts.standard} L:${counts.long}`;
  }
}

// Setup lens buttons
function setupLensButtons() {
  const buttons = document.querySelectorAll('.lens-btn[data-lens]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      document.querySelectorAll('.lens-btn[data-lens]').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      
      // Update current lens
      currentLens = button.getAttribute('data-lens');
    });
  });
}

// Setup toolbar buttons
function setupToolbarButtons() {
  const undoBtn = document.querySelector('[data-undo]');
  const clearBtn = document.querySelector('[data-clear]');
  const sendBtn = document.querySelector('[data-send]');
  
  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      undo();
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearCameras();
    });
  }
  
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      // Show the form
      const form = document.querySelector('[data-cov-form]');
      if (form) {
        form.style.display = 'block';
      }
    });
  }
}

// Initialize additional functionality
function initInteractiveFeatures() {
  setupEventListeners();
  setupLensButtons();
  setupToolbarButtons();
  updateCounters();
}

// Update init function to include interactive features
const originalInit = window.init || function() {};
window.init = function() {
  originalInit();
  initInteractiveFeatures();
};

// Re-initialize if already loaded
if (document.readyState !== 'loading') {
  initFormFeatures();
}
})();

// Part 3: Live counters and form submission

// Geometry helper functions
function pointInPolygon(point, polygon) {
  // Ray casting algorithm
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > point[1]) !== (yj > point[1])) &&
                      (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInCone(point, camera) {
  const dx = point[0] - camera.x;
  const dy = point[1] - camera.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Check if within lens length
  const lensLengths = { wide: 220, standard: 320, long: 480 };
  if (distance > lensLengths[camera.lens]) return false;
  
  // Check if within field of view angle
  const lensAngles = { wide: 110, standard: 85, long: 45 };
  const angle = lensAngles[camera.lens];
  
  // Calculate angle from camera to point
  const cameraAngleRad = camera.angle * Math.PI / 180;
  const toPointAngleRad = Math.atan2(dy, dx);
  
  // Normalize angle difference
  let angleDiff = toPointAngleRad - cameraAngleRad;
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  
  return Math.abs(angleDiff) <= angle / 2 * Math.PI / 180;
}

// Calculate approximate coverage using grid sampling
function calculateCoverage() {
  if (state.cams.length === 0) return 0;
  
  const template = templates[state.template];
  if (!template || !template.outer) return 0;
  
  // Convert outer boundary to array of points
  const outerPoints = [];
  for (let i = 0; i < template.outer.length; i += 2) {
    outerPoints.push([template.outer[i], template.outer[i + 1]]);
  }
  
  // Grid sampling every 20 units
  const step = 20;
  let coveredPoints = 0;
  let totalPoints = 0;
  
  // Sample points within bounding box
  for (let x = 0; x <= 1000; x += step) {
    for (let y = 0; y <= 700; y += step) {
      const point = [x, y];
      
      // Check if point is inside the building outline
      if (pointInPolygon(point, outerPoints)) {
        totalPoints++;
        
        // Check if point is covered by any camera
        let isCovered = false;
        for (const cam of state.cams) {
          if (pointInCone(point, cam)) {
            isCovered = true;
            break;
          }
        }
        
        if (isCovered) coveredPoints++;
      }
    }
  }
  
  return totalPoints > 0 ? Math.round((coveredPoints / totalPoints) * 100) : 0;
}

// Update counters with real calculations
function updateCounters() {
  const cameraCount = document.getElementById('camera-count');
  const percentCovered = document.getElementById('coverage-percent');
  const lensMix = document.getElementById('lens-mix');
  
  if (cameraCount) {
    cameraCount.textContent = state.cams.length;
  }
  
  if (percentCovered) {
    const coverage = calculateCoverage();
    percentCovered.textContent = coverage + '%';
  }
  
  if (lensMix) {
    const counts = { wide: 0, standard: 0, long: 0 };
    state.cams.forEach(cam => {
      if (counts[cam.lens] !== undefined) {
        counts[cam.lens]++;
      }
    });
    lensMix.textContent = `Wide: ${counts.wide}, Standard: ${counts.standard}, Long: ${counts.long}`;
  }
}

// Form submission handler
function handleFormSubmit() {
  const form = document.querySelector('[data-cov-form]');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('coverage-name').value.trim();
    const phone = document.getElementById('coverage-phone').value.trim();
    const email = document.getElementById('coverage-email').value.trim();
    const town = document.getElementById('coverage-town').value.trim();
    
    // Validate required fields
    if (!name || !phone || !town) {
      showFormMessage('Please fill in all required fields', 'error');
      return;
    }
    
    // Validate phone (10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      showFormMessage('Please enter a valid 10-digit phone number', 'error');
      return;
    }
    
    // Prepare message with layout details
    const templateName = state.template.charAt(0).toUpperCase() + state.template.slice(1);
    const cameraDetails = state.cams.map((cam, index) => 
      `Camera ${index + 1}: ${Math.round(cam.x/1000*100)}%, ${Math.round(cam.y/700*100)}%, ${Math.round(cam.angle)}°`
    ).join(', ');
    
    const message = `Template: ${templateName}\n` +
                   `Cameras: ${state.cams.length}\n` +
                   `Lens Mix: Wide: ${state.cams.filter(c => c.lens === 'wide').length}, ` +
                   `Standard: ${state.cams.filter(c => c.lens === 'standard').length}, ` +
                   `Long: ${state.cams.filter(c => c.lens === 'long').length}\n` +
                   `Camera Positions: ${cameraDetails}\n` +
                   `Coverage: ${calculateCoverage()}%\n` +
                   `Submitted via Coverage Planner`;
    
    // Prepare form data
    const formData = {
      name: name,
      phone: phone,
      email: email,
      town: town,
      service: 'security-cameras',
      message: message,
      source: 'Coverage Planner',
      website: '' // honeypot field
    };
    
    // Submit via fetch
    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok');
    })
    .then(data => {
      showFormMessage('Layout sent successfully!', 'success');
      form.reset();
      // Hide form after success
      setTimeout(() => {
        const formContainer = document.getElementById('coverage-form-container');
        if (formContainer) {
          formContainer.style.display = 'none';
        }
      }, 1500);
    })
    .catch(error => {
      console.error('Error:', error);
      showFormMessage('Failed to send layout. Please try again.', 'error');
    });
  });
}

// Show form message
function showFormMessage(message, type) {
  const msgDiv = document.querySelector('[data-cov-form] .form-msg');
  if (!msgDiv) return;
  
  msgDiv.textContent = message;
  msgDiv.className = `form-msg ${type}`;
  
  // Auto-clear after 5 seconds
  setTimeout(() => {
    msgDiv.textContent = '';
    msgDiv.className = 'form-msg';
  }, 5000);
}

// Initialize form functionality
function initFormFeatures() {
  handleFormSubmit();
}

// Update init function to include form features
const originalInitInteractiveFeatures2 = window.initInteractiveFeatures || function() {};
window.initInteractiveFeatures = function() {
  originalInitInteractiveFeatures2();
  initFormFeatures();
};

// Re-initialize if already loaded
if (document.readyState !== 'loading') {
  initFormFeatures();
}