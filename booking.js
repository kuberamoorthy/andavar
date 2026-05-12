// ===== VEHICLE DATA & PRICING =====
const vehicles = [
  { id: 'swift-nonac', name: 'Swift / Etios', ac: 'nonac', seats: '4+1', type: 'Sedan', img: 'swift-etios.png', prices: { 3: 1000, 6: 1500, 9: 2400, 12: 3000 }, extraKm: 11, extraHr: 100 },
  { id: 'swift-ac', name: 'Swift / Etios', ac: 'ac', seats: '4+1', type: 'Sedan', img: 'Etios.png', prices: { 3: 1200, 6: 1800, 9: 2700, 12: 3500 }, extraKm: 12, extraHr: 100 },
  { id: 'xylo-nonac', name: 'Xylo / Tavera', ac: 'nonac', seats: '7+1', type: 'SUV', img: 'xylo-tavera.png', prices: { 3: 1400, 6: 2000, 9: 3200, 12: 4000 }, extraKm: 14, extraHr: 150 },
  { id: 'xylo-ac', name: 'Xylo / Tavera', ac: 'ac', seats: '7+1', type: 'SUV', img: 'Tavera.png', prices: { 3: 1800, 6: 2500, 9: 3700, 12: 4500 }, extraKm: 15, extraHr: 150 },
  { id: 'innova-ac', name: 'Innova', ac: 'ac', seats: '7+1', type: 'MPV', img: 'innova.png?v=2', prices: { 3: null, 6: 2500, 9: null, 12: 5000 }, extraKm: 16, extraHr: 200 },
  { id: 'crysta-ac', name: 'Crysta', ac: 'ac', seats: '7+1', type: 'Premium MPV', img: 'crysta.png', prices: { 3: null, 6: 3000, 9: null, 12: 6000 }, extraKm: 17, extraHr: 200 },
  { id: 'van17-nonac', name: 'Van (17 Seat)', ac: 'nonac', seats: '17', type: 'Van', img: 'van.png', prices: { 3: null, 6: 3000, 9: null, 12: 5500 }, extraKm: 20, extraHr: 250 },
  { id: 'van19-nonac', name: 'Van (19 Seat)', ac: 'nonac', seats: '19', type: 'Van', img: 'van.png', prices: { 3: null, 6: 4000, 9: null, 12: 6500 }, extraKm: 24, extraHr: 250 },
  { id: 'van19-ac', name: 'Van (19 Seat)', ac: 'ac', seats: '19', type: 'Van', img: 'van.png', prices: { 3: null, 6: null, 9: null, 12: 8000 }, extraKm: 28, extraHr: 280 },
  { id: 'urbania16-ac', name: 'Force Urbania (16 Seat)', ac: 'ac', seats: '16', type: 'Premium Van', img: 'urbania.png?v=4', prices: { 3: null, 6: null, 9: null, 12: 11000 }, extraKm: 40, extraHr: 300 },
  { id: 'tempo14-nonac', name: 'Tempo (14 Seat)', ac: 'nonac', seats: '14', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 3500, 9: null, 12: 6000 }, extraKm: 22, extraHr: 250 },
  { id: 'tempo14-ac', name: 'Tempo (14 Seat)', ac: 'ac', seats: '14', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 4000, 9: null, 12: 6500 }, extraKm: 24, extraHr: 250 },
  { id: 'tempo18-nonac', name: 'Tempo (18 Seat)', ac: 'nonac', seats: '18', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 4000, 9: null, 12: 7500 }, extraKm: 26, extraHr: 250 },
  { id: 'tempo18-ac', name: 'Tempo (18 Seat)', ac: 'ac', seats: '18', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 4500, 9: null, 12: 8000 }, extraKm: 28, extraHr: 250 },
  { id: 'coach22-nonac', name: 'Coach (21 Seat)', ac: 'nonac', seats: '21', type: 'Bus', img: 'coach.png', prices: { 3: null, 6: null, 9: null, 12: 7500 }, extraKm: 26, extraHr: 250 },
  { id: 'coach22-ac', name: 'Coach (21 Seat)', ac: 'ac', seats: '21', type: 'Bus', img: 'coach.png', prices: { 3: null, 6: null, 9: null, 12: 8500 }, extraKm: 30, extraHr: 250 },
  { id: 'coach25-nonac', name: 'Coach (25 Seat)', ac: 'nonac', seats: '25', type: 'Bus', img: 'coach.png', prices: { 3: null, 6: null, 9: null, 12: 8500 }, extraKm: 30, extraHr: 280 },
  { id: 'coach25-ac', name: 'Coach (25 Seat)', ac: 'ac', seats: '25', type: 'Bus', img: 'coach.png', prices: { 3: null, 6: null, 9: null, 12: 9500 }, extraKm: 32, extraHr: 250 },
];

let selectedVehicleId = null;
let currentTripType = 'local';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Read URL params
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  const vehicleParam = params.get('vehicle');

  if (typeParam) {
    currentTripType = typeParam;
    document.querySelectorAll('.booking-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.type === typeParam);
    });
  }

  if (vehicleParam) {
    selectedVehicleId = vehicleParam;
    // Auto-set AC based on vehicle
    const v = vehicles.find(v => v.id === vehicleParam);
    if (v) {
      document.getElementById('b-ac').value = v.ac;
    }
  }

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('b-date').setAttribute('min', today);

  updateDynamicInputs();
  renderVehicleGrid();
  setupListeners();
});

// ===== TOGGLE INPUTS BASED ON TRIP TYPE =====
function updateDynamicInputs() {
  const groupHours = document.getElementById('group-hours');
  const groupKm = document.getElementById('group-km');
  const groupAirport = document.getElementById('group-airport');
  const groupPersons = document.getElementById('group-persons');
  const extraInputs = document.getElementById('extraInputs');
  const airportBanner = document.getElementById('airportBanner');
  const navagrahaBanner = document.getElementById('navagrahaBanner');
  const navagrahaTemples = document.getElementById('navagrahaTemples');
  const groupTime = document.getElementById('group-time');
  const groupFixedTime = document.getElementById('group-fixed-time');
  const groupVehicle = document.getElementById('group-vehicle');
  const groupHillsDiesel = document.getElementById('group-hills-diesel');
  const groupLongDates = document.getElementById('group-long-dates');
  const groupLocalKm = document.getElementById('group-local-km');
  const groupPermits = document.getElementById('group-permits');
  const groupNightDriver = document.getElementById('group-night-driver');
  const groupNightHalt = document.getElementById('group-night-halt');

  // Reset displays
  groupHours.style.display = 'none';
  groupKm.style.display = 'none';
  if (groupLocalKm) groupLocalKm.style.display = 'none';
  if (groupAirport) groupAirport.style.display = 'none';
  if (groupPersons) groupPersons.style.display = 'none';
  if (groupHillsDiesel) groupHillsDiesel.style.display = 'none';
  if (groupLongDates) groupLongDates.style.display = 'none';
  if (groupPermits) groupPermits.style.display = 'none';
  if (groupNightDriver) groupNightDriver.style.display = 'none';
  if (groupNightHalt) groupNightHalt.style.display = 'none';
  extraInputs.style.display = 'none';
  if (airportBanner) airportBanner.style.display = 'none';
  if (navagrahaBanner) navagrahaBanner.style.display = 'none';
  if (navagrahaTemples) navagrahaTemples.style.display = 'none';
  if (groupTime) groupTime.style.display = 'block';
  if (groupFixedTime) groupFixedTime.style.display = 'none';
  if (groupVehicle) groupVehicle.style.display = 'block';

  // Uncheck night options if not on long/tour trips
  if (currentTripType !== 'long' && currentTripType !== 'tour') {
    const bNight = document.getElementById('b-night');
    const bHalt = document.getElementById('b-halt');
    if (bNight) bNight.checked = false;
    if (bHalt) bHalt.checked = false;
  }

  // Reset required
  document.getElementById('b-hours').required = false;
  document.getElementById('b-totalkm').required = false;
  if (document.getElementById('b-localkm')) document.getElementById('b-localkm').required = false;
  if (document.getElementById('b-time')) document.getElementById('b-time').required = true;
  if (document.getElementById('b-airport')) document.getElementById('b-airport').required = false;
  if (document.getElementById('b-persons')) document.getElementById('b-persons').required = false;
  if (groupLongDates) {
    document.getElementById('b-dropdate').required = false;
    document.getElementById('b-days').required = false;
  }

  if (currentTripType === 'days') {
    groupHours.style.display = 'block';
    extraInputs.style.display = 'grid';
    document.getElementById('b-hours').required = true;
  } else if (currentTripType === 'airport') {
    if (airportBanner) airportBanner.style.display = 'block';
    if (groupAirport) groupAirport.style.display = 'block';
    if (document.getElementById('b-airport')) document.getElementById('b-airport').required = true;
    
    // Show KM if 'other' is selected
    if (document.getElementById('b-airport') && document.getElementById('b-airport').value === 'other') {
      groupKm.style.display = 'block';
      document.getElementById('b-totalkm').required = true;
      document.getElementById('label-km').textContent = 'Estimated KM *';
    }
  } else if (currentTripType === 'navagraha') {
    if (navagrahaBanner) navagrahaBanner.style.display = 'block';
    if (navagrahaTemples) navagrahaTemples.style.display = 'block';
    if (groupTime) groupTime.style.display = 'none';
    if (groupFixedTime) groupFixedTime.style.display = 'block';
    if (document.getElementById('b-time')) document.getElementById('b-time').required = false;
    if (groupPersons) groupPersons.style.display = 'block';
    if (document.getElementById('b-persons')) document.getElementById('b-persons').required = true;
    if (groupVehicle) {
      // Show vehicle grid by default, do not hide it
    }
  } else if (currentTripType === 'local') {
    // Local trips: just select vehicle and book, no KM or price
  } else {
    // Long trip or other
    groupKm.style.display = 'block';
    document.getElementById('b-totalkm').required = true;
    document.getElementById('label-km').textContent = 'Estimated KM *';
    if (groupLongDates && (currentTripType === 'long' || currentTripType === 'tour')) {
      groupLongDates.style.display = 'grid';
      document.getElementById('b-dropdate').required = true;
      document.getElementById('b-days').required = true;
    }
    if (groupHillsDiesel && (currentTripType === 'long' || currentTripType === 'tour')) {
      groupHillsDiesel.style.display = 'block';
    }
    if (groupPermits && (currentTripType === 'long' || currentTripType === 'tour')) {
      groupPermits.style.display = 'block';
    }
    if (groupNightDriver && (currentTripType === 'long' || currentTripType === 'tour')) {
      groupNightDriver.style.display = 'block';
    }
    if (groupNightHalt && (currentTripType === 'long' || currentTripType === 'tour')) {
      groupNightHalt.style.display = 'block';
    }
  }

  // Change Drop Location to Vacation Location for Long and Tour trips
  const dropLabel = document.getElementById('label-drop');
  const dropInput = document.getElementById('b-drop');
  if (dropLabel && dropInput) {
    if (currentTripType === 'long' || currentTripType === 'tour') {
      dropLabel.textContent = 'Vacation Location *';
      dropInput.placeholder = 'Enter vacation location';
    } else {
      dropLabel.textContent = 'Drop Location *';
      dropInput.placeholder = 'Enter drop address';
    }
  }
}

// ===== RENDER VEHICLE GRID =====
function renderVehicleGrid() {
  const acFilter = document.getElementById('b-ac').value;
  const grid = document.getElementById('vehicleGrid');

  let filtered = vehicles;

  if (currentTripType === 'navagraha') {
    const navagrahaPrices = {
      'swift-nonac': 5000, 'swift-ac': 5500,
      'xylo-nonac': 6600, 'xylo-ac': 7200,
      'innova-ac': 7600, 'crysta-ac': 8700,
      'van17-nonac': 9500, 'van19-nonac': 10800,
      'van19-ac': 13000, 'urbania16-ac': 16000,
      'tempo14-nonac': 10000, 'tempo14-ac': 11000,
      'tempo18-nonac': 12000, 'tempo18-ac': 13000,
      'coach22-nonac': 12000, 'coach22-ac': 13500,
      'coach25-ac': 15000
    };
    filtered = filtered.filter(v => navagrahaPrices[v.id] !== undefined);
    
    // Show all vehicles, no capacity hiding filter
    // Let the user select any vehicle and show warn indicators instead of hiding them
  }

  if (acFilter) {
    filtered = filtered.filter(v => v.ac === acFilter);
  }

  grid.innerHTML = filtered.map(v => `
    <div class="vehicle-option ${selectedVehicleId === v.id ? 'selected' : ''}" data-id="${v.id}">
      <img src="${v.img}" alt="${v.name}">
      <div class="v-name">${v.name}</div>
      <div class="v-type">${v.ac === 'ac' ? 'AC' : 'Non AC'} · ${v.seats} Person</div>
    </div>
  `).join('');

  // Click handlers
  grid.querySelectorAll('.vehicle-option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectedVehicleId = opt.dataset.id;
      document.getElementById('b-vehicle').value = selectedVehicleId;
      grid.querySelectorAll('.vehicle-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      // Auto set AC
      const v = vehicles.find(x => x.id === selectedVehicleId);
      if (v) document.getElementById('b-ac').value = v.ac;
    });
  });

  // Keep selection
  if (selectedVehicleId && filtered.find(v => v.id === selectedVehicleId)) {
    document.getElementById('b-vehicle').value = selectedVehicleId;
  } else {
    selectedVehicleId = null;
    document.getElementById('b-vehicle').value = '';
  }
}

// ===== SETUP EVENT LISTENERS =====
function setupListeners() {
  // Tab clicks
  document.querySelectorAll('.booking-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.booking-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTripType = tab.dataset.type;
      updateDynamicInputs();
      renderVehicleGrid();
      calculatePrice();
    });
  });

  // AC filter change
  document.getElementById('b-ac').addEventListener('change', () => {
    selectedVehicleId = null;
    document.getElementById('b-vehicle').value = '';
    renderVehicleGrid();
  });

  // Calculate button
  document.getElementById('calcBtn').addEventListener('click', calculatePrice);

  // Auto calculate on field change
  ['b-hours', 'b-totalkm', 'b-localkm', 'b-extrakm', 'b-night', 'b-halt', 'b-hills-diesel', 'b-permit-kerala', 'b-permit-pondicherry', 'b-airport', 'b-persons'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      if (id === 'b-airport') updateDynamicInputs();
      if (id === 'b-persons') {
        updateDynamicInputs();
        renderVehicleGrid();
      }
      calculatePrice();
    });
  });

  // Form submit
  document.getElementById('bookingForm').addEventListener('submit', handleBooking);
}

// ===== CALCULATE PRICE =====
function calculatePrice(e) {
  const isClick = e && e.type === 'click';
  const priceDisplay = document.getElementById('priceDisplay');

  if (!selectedVehicleId) {
    if (isClick) alert('Please select a vehicle.');
    priceDisplay.style.display = 'none';
    return;
  }

  const vehicle = vehicles.find(v => v.id === selectedVehicleId);
  if (!vehicle) return;

  const nightBata = document.getElementById('b-night').checked;
  const nightHalt = document.getElementById('b-halt').checked;
  let total = 0;
  let breakdown = '';

  if (currentTripType === 'days') {
    const duration = parseInt(document.getElementById('b-hours').value);
    if (!duration) {
      if (isClick) alert('Please select a duration package.');
      priceDisplay.style.display = 'none';
      return;
    }

    const basePrice = vehicle.prices[duration];
    if (!basePrice) {
      if (isClick) alert(`${vehicle.name} is not available for ${duration} hour package. Please select another duration.`);
      priceDisplay.style.display = 'none';
      return;
    }

    const extraKm = parseInt(document.getElementById('b-extrakm').value) || 0;
    const extraKmCost = extraKm * vehicle.extraKm;

    total = basePrice + extraKmCost;

    const durationKm = { 3: 50, 6: 100, 9: 150, 12: 200 };
    breakdown += `<div class="price-row"><span>${vehicle.name} (${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}) — ${duration} hrs / ${durationKm[duration]} km</span><span>₹${basePrice.toLocaleString('en-IN')}</span></div>`;
    if (extraKmCost > 0) breakdown += `<div class="price-row"><span>Extra ${extraKm} KM × ₹${vehicle.extraKm}/km</span><span>₹${extraKmCost.toLocaleString('en-IN')}</span></div>`;
    breakdown += `<div style="color: #d97706; font-size: 0.8rem; margin-top: 8px; font-weight: 600; line-height: 1.4; border-top: 1px dashed #eee; padding-top: 8px;">⚠️ Only up to 2 extra hours can be added to any package (charged extra). Exceeding 2 hours will charge the next higher package rate.</div>`;
  } else if (currentTripType === 'airport' && document.getElementById('b-airport').value !== 'other') {
    const airport = document.getElementById('b-airport').value;
    if (!airport) {
      if (isClick) alert('Please select an airport destination.');
      priceDisplay.style.display = 'none';
      return;
    }

    const airportPrices = {
      trichy: { 'swift-nonac': 3000, 'swift-ac': 3500, 'xylo-nonac': 4000, 'xylo-ac': 4500, 'innova-ac': 5000 },
      chennai: { 'swift-nonac': 7000, 'swift-ac': 7500, 'xylo-nonac': 9000, 'xylo-ac': 9500, 'innova-ac': 10000 }
    };

    const basePrice = airportPrices[airport] && airportPrices[airport][selectedVehicleId];

    if (!basePrice) {
      if (isClick) alert(`${vehicle.name} (${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}) is not available for fixed pricing to this airport. Please select a different vehicle or choose 'Other Airport (Calculate by KM)'.`);
      priceDisplay.style.display = 'none';
      return;
    }

    const airportName = airport === 'trichy' ? 'Trichy Airport' : 'Chennai Airport';
    total = basePrice;

    breakdown += `<div class="price-row"><span>Kumbakonam ⇄ ${airportName} (${vehicle.name} ${vehicle.ac === 'ac' ? 'AC' : 'Non AC'})</span><span>₹${basePrice.toLocaleString('en-IN')}</span></div>`;
  } else if (currentTripType === 'navagraha') {
    const navagrahaPrices = {
      'swift-nonac': 5000, 'swift-ac': 5500,
      'xylo-nonac': 6600, 'xylo-ac': 7200,
      'innova-ac': 7600, 'crysta-ac': 8700,
      'van17-nonac': 9500, 'van19-nonac': 10800,
      'van19-ac': 13000, 'urbania16-ac': 16000,
      'tempo14-nonac': 10000, 'tempo14-ac': 11000,
      'tempo18-nonac': 12000, 'tempo18-ac': 13000,
      'coach22-nonac': 12000, 'coach22-ac': 13500,
      'coach25-ac': 15000
    };

    const basePrice = navagrahaPrices[selectedVehicleId];

    if (!basePrice) {
      if (isClick) alert(`${vehicle.name} (${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}) is not available for the Navagraha Trip.`);
      priceDisplay.style.display = 'none';
      return;
    }

    total = basePrice;

    breakdown += `<div class="price-row"><span>1 Day Navagraha Trip (5 AM - 10 PM) — ${vehicle.name} ${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}</span><span>₹${basePrice.toLocaleString('en-IN')}</span></div>`;
    
    // Warn if selected vehicle capacity is less than the entered persons count
    const personCount = parseInt(document.getElementById('b-persons')?.value);
    if (personCount && personCount > 0) {
      const capacityMatch = vehicle.seats.match(/(\d+)/);
      const capacity = capacityMatch ? parseInt(capacityMatch[1]) : 0;
      if (personCount > capacity) {
        breakdown += `<div style="color: #ef4444; font-size: 0.82rem; margin-top: 10px; font-weight: 600; line-height: 1.4; border: 1px solid rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); padding: 10px; border-radius: 8px;">⚠️ Warning: You entered ${personCount} persons, but ${vehicle.name}'s seating capacity is only ${vehicle.seats}. Please select a larger vehicle or proceed if you are booking multiple vehicles.</div>`;
      }
    }
    
    breakdown += `<div class="price-note" style="color:var(--text-light); font-size:0.85rem; margin-top:8px;">* Temple parking, driver food, and police charges (if any) are separate.</div>`;
  } else if (currentTripType === 'local') {
    // Local trip: no price display, just booking
    priceDisplay.style.display = 'none';
    return;
  } else {
    const totalKm = parseInt(document.getElementById('b-totalkm').value);
    if (!totalKm || totalKm <= 0) {
      if (isClick) alert('Please enter estimated KM.');
      priceDisplay.style.display = 'none';
      return;
    }

    const kmCost = totalKm * vehicle.extraKm;
    const hillsDiesel = document.getElementById('b-hills-diesel') && document.getElementById('b-hills-diesel').checked;
    const permitKerala = document.getElementById('b-permit-kerala') && document.getElementById('b-permit-kerala').checked;
    const permitPondi = document.getElementById('b-permit-pondicherry') && document.getElementById('b-permit-pondicherry').checked;
    total = kmCost;

    breakdown += `<div class="price-row"><span>${vehicle.name} (${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}) — ${totalKm} KM × ₹${vehicle.extraKm}/km</span><span>₹${kmCost.toLocaleString('en-IN')}</span></div>`;
    if (hillsDiesel) breakdown += `<div class="price-row"><span>Hills Station Diesel Allowance</span><span>Charges separate</span></div>`;
    if (permitKerala) breakdown += `<div class="price-row"><span>Kerala State Permit</span><span>Charges separate</span></div>`;
    if (permitPondi) breakdown += `<div class="price-row"><span>Pondicherry State Permit</span><span>Charges separate</span></div>`;
  }

  if (nightBata) {
    breakdown += `<div class="price-row"><span>Night Driver Bata</span><span>Charges separate</span></div>`;
  }
  if (nightHalt) {
    breakdown += `<div class="price-row"><span>Night Halt Charges</span><span>Charges separate</span></div>`;
  }

  breakdown += `<div class="price-row"><span>Total Estimated Cost</span><span>₹${total.toLocaleString('en-IN')}</span></div>`;

  priceDisplay.style.display = 'block';
  document.getElementById('priceAmount').textContent = `₹${total.toLocaleString('en-IN')}`;
  document.getElementById('priceBreakdown').innerHTML = breakdown;

  if (isClick) {
    // Smooth scroll to price only on button click
    priceDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ===== HANDLE BOOKING — SEND TO WHATSAPP =====
function handleBooking(e) {
  e.preventDefault();

  const name = document.getElementById('b-name').value.trim();
  const mobile = document.getElementById('b-mobile').value.trim();
  const date = document.getElementById('b-date').value;
  const time = document.getElementById('b-time').value;
  const pickup = document.getElementById('b-pickup').value.trim();
  const drop = document.getElementById('b-drop').value.trim();
  const acType = document.getElementById('b-ac').value;
  const nightBata = document.getElementById('b-night').checked;
  const nightHalt = document.getElementById('b-halt').checked;
  const hillsDiesel = document.getElementById('b-hills-diesel') && document.getElementById('b-hills-diesel').checked;
  const permitKerala = document.getElementById('b-permit-kerala') && document.getElementById('b-permit-kerala').checked;
  const permitPondi = document.getElementById('b-permit-pondicherry') && document.getElementById('b-permit-pondicherry').checked;
  const dropDate = document.getElementById('b-dropdate') ? document.getElementById('b-dropdate').value : '';
  const travelDays = document.getElementById('b-days') ? document.getElementById('b-days').value : '';

  if (!selectedVehicleId) {
    alert('Please select a vehicle.');
    return;
  }

  const vehicle = vehicles.find(v => v.id === selectedVehicleId);
  if (!vehicle) return;

  // Warn if selected vehicle capacity is less than entered persons count (only for Navagraha Trip)
  const personsInput = document.getElementById('b-persons');
  if (currentTripType === 'navagraha' && personsInput) {
    const personCount = parseInt(personsInput.value);
    if (personCount && personCount > 0) {
      const capacityMatch = vehicle.seats.match(/(\d+)/);
      const capacity = capacityMatch ? parseInt(capacityMatch[1]) : 0;
      if (personCount > capacity) {
        if (!confirm(`Warning: You entered ${personCount} persons, but ${vehicle.name} only fits up to ${vehicle.seats} persons.\n\nDo you want to proceed anyway?`)) {
          return;
        }
      }
    }
  }

  let total = 0;
  let packageInfo = '';
  let priceInfo = '';

  if (currentTripType === 'days') {
    const duration = document.getElementById('b-hours').value;
    const extraKm = parseInt(document.getElementById('b-extrakm').value) || 0;
    
    if (!duration) {
      alert('Please select a duration package.');
      return;
    }

    const basePrice = vehicle.prices[parseInt(duration)];
    if (!basePrice) {
      alert('Selected vehicle is not available for this duration.');
      return;
    }

    const extraKmCost = extraKm * vehicle.extraKm;
    total = basePrice + extraKmCost;

    const durationKm = { 3: 50, 6: 100, 9: 150, 12: 200 };
    packageInfo = `⏱️ *Package:* ${duration} Hours / ${durationKm[parseInt(duration)]} KM\n`;
    
    priceInfo = `Base Package: ₹${basePrice.toLocaleString('en-IN')}\n`;
    if (extraKmCost > 0) priceInfo += `Extra ${extraKm} KM: ₹${extraKmCost.toLocaleString('en-IN')}\n`;
    priceInfo += `*(⚠️ Only up to 2 extra hours can be added; otherwise, next higher package is charged.)*\n`;
  } else if (currentTripType === 'airport' && document.getElementById('b-airport').value !== 'other') {
    const airport = document.getElementById('b-airport').value;
    if (!airport) {
      alert('Please select an airport destination.');
      return;
    }

    const airportPrices = {
      trichy: { 'swift-nonac': 3000, 'swift-ac': 3500, 'xylo-nonac': 4000, 'xylo-ac': 4500, 'innova-ac': 5000 },
      chennai: { 'swift-nonac': 7000, 'swift-ac': 7500, 'xylo-nonac': 9000, 'xylo-ac': 9500, 'innova-ac': 10000 }
    };

    const basePrice = airportPrices[airport] && airportPrices[airport][selectedVehicleId];

    if (!basePrice) {
      alert('Selected vehicle is not available for fixed pricing. Please select another vehicle or choose by KM.');
      return;
    }

    const airportName = airport === 'trichy' ? 'Trichy Airport' : 'Chennai Airport';
    total = basePrice;

    packageInfo = `✈️ *Airport Transfer:* Kumbakonam ⇄ ${airportName}\n`;
    priceInfo = `Fixed Trip Fare: ₹${basePrice.toLocaleString('en-IN')}\n`;
  } else if (currentTripType === 'navagraha') {
    const navagrahaPrices = {
      'swift-nonac': 5000, 'swift-ac': 5500,
      'xylo-nonac': 6600, 'xylo-ac': 7200,
      'innova-ac': 7600, 'crysta-ac': 8700,
      'van17-nonac': 9500, 'van19-nonac': 10800,
      'van19-ac': 13000, 'urbania16-ac': 16000,
      'tempo14-nonac': 10000, 'tempo14-ac': 11000,
      'tempo18-nonac': 12000, 'tempo18-ac': 13000,
      'coach22-nonac': 12000, 'coach22-ac': 13500,
      'coach25-ac': 15000
    };

    const basePrice = navagrahaPrices[selectedVehicleId];

    if (!basePrice) {
      alert('Selected vehicle is not available for Navagraha Trip.');
      return;
    }

    total = basePrice;

    packageInfo = `🕉️ *Package:* 1 Day Navagraha Trip (5 AM - 10 PM)\n`;
    priceInfo = `Fixed Trip Fare: ₹${basePrice.toLocaleString('en-IN')}\n`;
    priceInfo += `(Temple parking, driver food, and police charges separate)\n`;
  } else if (currentTripType === 'local') {
    // Local trip: simple booking, no price
    packageInfo = `🏙️ *Local Trip*\n`;
    priceInfo = `Price will be discussed separately.\n`;
  } else {
    const totalKm = document.getElementById('b-totalkm').value;
    if (!totalKm) {
      alert('Please enter estimated KM.');
      return;
    }

    const kmCost = parseInt(totalKm) * vehicle.extraKm;
    total = kmCost;

    packageInfo = `📏 *Estimated KM:* ${totalKm} KM\n`;
    if (hillsDiesel) {
      packageInfo += `🏔️ *Hills Station Trip:* Yes\n`;
    }
    if (permitKerala) {
      packageInfo += `🌴 *Kerala Permit:* Yes\n`;
    }
    if (permitPondi) {
      packageInfo += `🏖️ *Pondicherry Permit:* Yes\n`;
    }
    priceInfo = `${totalKm} KM × ₹${vehicle.extraKm}/km: ₹${kmCost.toLocaleString('en-IN')}\n`;
    if (hillsDiesel) priceInfo += `Hills Allowance: Charges separate\n`;
    if (permitKerala) priceInfo += `Kerala Permit: Charges separate\n`;
    if (permitPondi) priceInfo += `Pondicherry Permit: Charges separate\n`;
  }

  if (nightBata) {
    packageInfo += `🌙 *Night Driver Bata:* Yes (Charges separate)\n`;
    priceInfo += `Night Driver Bata: Charges separate\n`;
  }
  if (nightHalt) {
    packageInfo += `🏨 *Night Halt:* Yes (Charges separate)\n`;
    priceInfo += `Night Halt Charges: Charges separate\n`;
  }

  const tripTypes = { local: 'Local Trip', days: 'Days Package', airport: 'Airport Transfer', long: 'Long Trip', tour: 'Tour Package', navagraha: 'Navagraha Trip' };

  let msg = `🚗 *NEW BOOKING - Andavar Travels*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `📋 *Trip Type:* ${tripTypes[currentTripType] || 'Local Trip'}\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📞 *Mobile:* ${mobile}\n`;
  msg += `📅 *Pickup Date:* ${date}\n`;
  if ((currentTripType === 'long' || currentTripType === 'tour') && dropDate) {
    msg += `📅 *Return Date:* ${dropDate}\n`;
    msg += `⏱️ *Travel Duration:* ${travelDays} Days\n`;
  }
  if (currentTripType === 'navagraha') {
    msg += `⏰ *Time:* 5:00 AM to 10:00 PM (Fixed)\n`;
  } else {
    msg += `⏰ *Time:* ${time}\n`;
  }
  msg += `📍 *Pickup:* ${pickup}\n`;
  let dropLocationText = (currentTripType === 'long' || currentTripType === 'tour') ? 'Vacation Location' : 'Drop';
  msg += `📍 *${dropLocationText}:* ${drop}\n\n`;
  msg += `🚗 *Vehicle:* ${vehicle.name} (${acType === 'ac' ? 'AC' : 'Non AC'})\n`;
  
  const persons = document.getElementById('b-persons') ? document.getElementById('b-persons').value : '';
  if (currentTripType === 'navagraha' && persons) {
    msg += `👤 *Total Persons:* ${persons} (Vehicle Capacity: ${vehicle.seats})\n`;
  } else {
    msg += `👤 *Persons Capacity:* ${vehicle.seats}\n`;
  }
  
  msg += packageInfo + `\n`;
  if (currentTripType === 'local') {
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `_Toll, parking & driver food extra_`;
  } else {
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *PRICE BREAKDOWN*\n\n`;
    msg += priceInfo;
    msg += `\n*💵 TOTAL: ₹${total.toLocaleString('en-IN')}*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `_Toll, parking & driver food extra_`;
  }

  const whatsappUrl = `https://wa.me/918610890499?text=${encodeURIComponent(msg)}`;
  
  // 1. Open WhatsApp immediately (synchronous to prevent popup blockers)
  window.open(whatsappUrl, '_blank');

  // 2. Automatically send Email Notification in the background via FormSubmit
  fetch("https://formsubmit.co/ajax/andavarcab123@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          _subject: `New Booking Request: ${tripTypes[currentTripType] || 'Local Trip'} - ${name}`,
          _template: "table",
          Name: name,
          Mobile: mobile,
          Date: date,
          Time: currentTripType === 'navagraha' ? '5:00 AM to 10:00 PM' : time,
          Pickup_Location: pickup,
          Drop_Location: drop,
          Vehicle: `${vehicle.name} (${acType === 'ac' ? 'AC' : 'Non AC'})`,
          Total_Estimated_Price: `₹${total.toLocaleString('en-IN')}`,
          Full_Booking_Details: msg
      })
  }).catch(err => console.error("Email notification failed", err));
}
