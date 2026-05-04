// ===== VEHICLE DATA & PRICING =====
const vehicles = [
  { id: 'swift-nonac', name: 'Swift / Etios', ac: 'nonac', seats: '4+1', type: 'Sedan', img: 'swift-etios.png', prices: { 3: 1000, 6: 1500, 9: 2400, 12: 3000 }, extraKm: 11, extraHr: 100 },
  { id: 'swift-ac', name: 'Swift / Etios', ac: 'ac', seats: '4+1', type: 'Sedan', img: 'swift-etios.png', prices: { 3: 1200, 6: 1800, 9: 2700, 12: 3500 }, extraKm: 12, extraHr: 100 },
  { id: 'xylo-nonac', name: 'Xylo / Tavera', ac: 'nonac', seats: '6+1', type: 'SUV', img: 'xylo-tavera.png', prices: { 3: 1400, 6: 2000, 9: 3200, 12: 4000 }, extraKm: 14, extraHr: 150 },
  { id: 'xylo-ac', name: 'Xylo / Tavera', ac: 'ac', seats: '6+1', type: 'SUV', img: 'xylo-tavera.png', prices: { 3: 1800, 6: 2500, 9: 3700, 12: 4500 }, extraKm: 15, extraHr: 150 },
  { id: 'innova-ac', name: 'Innova', ac: 'ac', seats: '7+1', type: 'MPV', img: 'innova.png', prices: { 3: null, 6: 2500, 9: null, 12: 5000 }, extraKm: 16, extraHr: 200 },
  { id: 'crysta-ac', name: 'Crysta', ac: 'ac', seats: '7+1', type: 'Premium MPV', img: 'crysta.png', prices: { 3: null, 6: 3000, 9: null, 12: 6000 }, extraKm: 17, extraHr: 200 },
  { id: 'van16-nonac', name: 'Van (16 Seat)', ac: 'nonac', seats: '16', type: 'Van', img: 'van.png', prices: { 3: null, 6: 3000, 9: null, 12: 5500 }, extraKm: 20, extraHr: 250 },
  { id: 'van21-nonac', name: 'Van (21 Seat)', ac: 'nonac', seats: '21', type: 'Van', img: 'van.png', prices: { 3: null, 6: 4000, 9: null, 12: 6500 }, extraKm: 24, extraHr: 250 },
  { id: 'tempo14-nonac', name: 'Tempo (14 Seat)', ac: 'nonac', seats: '14', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 3500, 9: null, 12: 6000 }, extraKm: 22, extraHr: 250 },
  { id: 'tempo14-ac', name: 'Tempo (14 Seat)', ac: 'ac', seats: '14', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 4000, 9: null, 12: 6500 }, extraKm: 24, extraHr: 250 },
  { id: 'tempo18-nonac', name: 'Tempo (18 Seat)', ac: 'nonac', seats: '18', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 4000, 9: null, 12: 7500 }, extraKm: 26, extraHr: 250 },
  { id: 'tempo18-ac', name: 'Tempo (18 Seat)', ac: 'ac', seats: '18', type: 'Mini Bus', img: 'tempo-traveller.png', prices: { 3: null, 6: 4500, 9: null, 12: 8000 }, extraKm: 28, extraHr: 250 },
  { id: 'coach22-nonac', name: 'Coach (22 Seat)', ac: 'nonac', seats: '22', type: 'Bus', img: 'coach.png', prices: { 3: null, 6: null, 9: null, 12: 7500 }, extraKm: 26, extraHr: 250 },
  { id: 'coach22-ac', name: 'Coach (22 Seat)', ac: 'ac', seats: '22', type: 'Bus', img: 'coach.png', prices: { 3: null, 6: null, 9: null, 12: 8500 }, extraKm: 30, extraHr: 250 },
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

  // Reset displays
  groupHours.style.display = 'none';
  groupKm.style.display = 'none';
  if (groupAirport) groupAirport.style.display = 'none';
  if (groupPersons) groupPersons.style.display = 'none';
  extraInputs.style.display = 'none';
  if (airportBanner) airportBanner.style.display = 'none';
  if (navagrahaBanner) navagrahaBanner.style.display = 'none';
  if (navagrahaTemples) navagrahaTemples.style.display = 'none';
  if (groupTime) groupTime.style.display = 'block';
  if (groupFixedTime) groupFixedTime.style.display = 'none';
  if (groupVehicle) groupVehicle.style.display = 'block';

  // Reset required
  document.getElementById('b-hours').required = false;
  document.getElementById('b-totalkm').required = false;
  if (document.getElementById('b-time')) document.getElementById('b-time').required = true;
  if (document.getElementById('b-airport')) document.getElementById('b-airport').required = false;
  if (document.getElementById('b-persons')) document.getElementById('b-persons').required = false;

  if (currentTripType === 'days') {
    groupHours.style.display = 'block';
    extraInputs.style.display = 'flex';
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
      const persons = document.getElementById('b-persons')?.value;
      if (!persons || parseInt(persons) <= 0) {
        groupVehicle.style.display = 'none';
      }
    }
  } else {
    groupKm.style.display = 'block';
    document.getElementById('b-totalkm').required = true;
    document.getElementById('label-km').textContent = 'Estimated KM *';
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
      'van16-nonac': 9500, 'van21-nonac': 10800,
      'tempo14-nonac': 10000, 'tempo14-ac': 11000,
      'tempo18-nonac': 12000, 'tempo18-ac': 13000,
      'coach22-nonac': 12000, 'coach22-ac': 13500,
      'coach25-ac': 15000
    };
    filtered = filtered.filter(v => navagrahaPrices[v.id] !== undefined);
    
    const personCount = parseInt(document.getElementById('b-persons')?.value);
    if (personCount && personCount > 0) {
      filtered = filtered.filter(v => {
        const capacityMatch = v.seats.match(/(\d+)/);
        const capacity = capacityMatch ? parseInt(capacityMatch[1]) : 0;
        return capacity >= personCount;
      });
    }
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
  ['b-hours', 'b-totalkm', 'b-extrakm', 'b-extrahrs', 'b-night', 'b-airport', 'b-persons'].forEach(id => {
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
    const extraHrs = parseInt(document.getElementById('b-extrahrs').value) || 0;
    const extraKmCost = extraKm * vehicle.extraKm;
    const extraHrCost = extraHrs * vehicle.extraHr;
    const nightCost = nightBata ? 500 : 0;

    total = basePrice + extraKmCost + extraHrCost + nightCost;

    const durationKm = { 3: 50, 6: 100, 9: 150, 12: 200 };
    breakdown += `<div class="price-row"><span>${vehicle.name} (${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}) — ${duration} hrs / ${durationKm[duration]} km</span><span>₹${basePrice.toLocaleString('en-IN')}</span></div>`;
    if (extraKmCost > 0) breakdown += `<div class="price-row"><span>Extra ${extraKm} KM × ₹${vehicle.extraKm}/km</span><span>₹${extraKmCost.toLocaleString('en-IN')}</span></div>`;
    if (extraHrCost > 0) breakdown += `<div class="price-row"><span>Extra ${extraHrs} Hours × ₹${vehicle.extraHr}/hr</span><span>₹${extraHrCost.toLocaleString('en-IN')}</span></div>`;
    if (nightCost > 0) breakdown += `<div class="price-row"><span>Night Driver Bata</span><span>₹500</span></div>`;
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
    const nightCost = nightBata ? 500 : 0;
    total = basePrice + nightCost;

    breakdown += `<div class="price-row"><span>Kumbakonam ⇄ ${airportName} (${vehicle.name} ${vehicle.ac === 'ac' ? 'AC' : 'Non AC'})</span><span>₹${basePrice.toLocaleString('en-IN')}</span></div>`;
    if (nightCost > 0) breakdown += `<div class="price-row"><span>Night Driver Bata</span><span>₹500</span></div>`;
  } else if (currentTripType === 'navagraha') {
    const navagrahaPrices = {
      'swift-nonac': 5000, 'swift-ac': 5500,
      'xylo-nonac': 6600, 'xylo-ac': 7200,
      'innova-ac': 7600, 'crysta-ac': 8700,
      'van16-nonac': 9500, 'van21-nonac': 10800,
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

    const nightCost = nightBata ? 500 : 0;
    total = basePrice + nightCost;

    breakdown += `<div class="price-row"><span>1 Day Navagraha Trip (5 AM - 10 PM) — ${vehicle.name} ${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}</span><span>₹${basePrice.toLocaleString('en-IN')}</span></div>`;
    if (nightCost > 0) breakdown += `<div class="price-row"><span>Night Driver Bata</span><span>₹500</span></div>`;
    breakdown += `<div class="price-note" style="color:var(--text-light); font-size:0.85rem; margin-top:8px;">* Temple parking, driver food, and police charges (if any) are separate.</div>`;
  } else {
    const totalKm = parseInt(document.getElementById('b-totalkm').value);
    if (!totalKm || totalKm <= 0) {
      if (isClick) alert('Please enter estimated KM.');
      priceDisplay.style.display = 'none';
      return;
    }

    const kmCost = totalKm * vehicle.extraKm;
    const nightCost = nightBata ? 500 : 0;
    total = kmCost + nightCost;

    breakdown += `<div class="price-row"><span>${vehicle.name} (${vehicle.ac === 'ac' ? 'AC' : 'Non AC'}) — ${totalKm} KM × ₹${vehicle.extraKm}/km</span><span>₹${kmCost.toLocaleString('en-IN')}</span></div>`;
    if (nightCost > 0) breakdown += `<div class="price-row"><span>Night Driver Bata</span><span>₹500</span></div>`;
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

  if (!selectedVehicleId) {
    alert('Please select a vehicle.');
    return;
  }

  const vehicle = vehicles.find(v => v.id === selectedVehicleId);
  if (!vehicle) return;

  let total = 0;
  let packageInfo = '';
  let priceInfo = '';

  if (currentTripType === 'days') {
    const duration = document.getElementById('b-hours').value;
    const extraKm = parseInt(document.getElementById('b-extrakm').value) || 0;
    const extraHrs = parseInt(document.getElementById('b-extrahrs').value) || 0;
    
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
    const extraHrCost = extraHrs * vehicle.extraHr;
    const nightCost = nightBata ? 500 : 0;
    total = basePrice + extraKmCost + extraHrCost + nightCost;

    const durationKm = { 3: 50, 6: 100, 9: 150, 12: 200 };
    packageInfo = `⏱️ *Package:* ${duration} Hours / ${durationKm[parseInt(duration)]} KM\n`;
    
    priceInfo = `Base Package: ₹${basePrice.toLocaleString('en-IN')}\n`;
    if (extraKmCost > 0) priceInfo += `Extra ${extraKm} KM: ₹${extraKmCost.toLocaleString('en-IN')}\n`;
    if (extraHrCost > 0) priceInfo += `Extra ${extraHrs} Hrs: ₹${extraHrCost.toLocaleString('en-IN')}\n`;
    if (nightCost > 0) priceInfo += `Night Bata: ₹500\n`;
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
    const nightCost = nightBata ? 500 : 0;
    total = basePrice + nightCost;

    packageInfo = `✈️ *Airport Transfer:* Kumbakonam ⇄ ${airportName}\n`;
    priceInfo = `Fixed Trip Fare: ₹${basePrice.toLocaleString('en-IN')}\n`;
    if (nightCost > 0) priceInfo += `Night Bata: ₹500\n`;
  } else if (currentTripType === 'navagraha') {
    const navagrahaPrices = {
      'swift-nonac': 5000, 'swift-ac': 5500,
      'xylo-nonac': 6600, 'xylo-ac': 7200,
      'innova-ac': 7600, 'crysta-ac': 8700,
      'van16-nonac': 9500, 'van21-nonac': 10800,
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

    const nightCost = nightBata ? 500 : 0;
    total = basePrice + nightCost;

    packageInfo = `🕉️ *Package:* 1 Day Navagraha Trip (5 AM - 10 PM)\n`;
    priceInfo = `Fixed Trip Fare: ₹${basePrice.toLocaleString('en-IN')}\n`;
    priceInfo += `(Temple parking, driver food, and police charges separate)\n`;
    if (nightCost > 0) priceInfo += `Night Bata: ₹500\n`;
  } else {
    const totalKm = document.getElementById('b-totalkm').value;
    if (!totalKm) {
      alert('Please enter estimated KM.');
      return;
    }

    const kmCost = parseInt(totalKm) * vehicle.extraKm;
    const nightCost = nightBata ? 500 : 0;
    total = kmCost + nightCost;

    packageInfo = `📏 *Estimated KM:* ${totalKm} KM\n`;
    priceInfo = `${totalKm} KM × ₹${vehicle.extraKm}/km: ₹${kmCost.toLocaleString('en-IN')}\n`;
    if (nightCost > 0) priceInfo += `Night Bata: ₹500\n`;
  }

  const tripTypes = { local: 'Local Trip', days: 'Days Package', airport: 'Airport Transfer', long: 'Long Trip', tour: 'Tour Package', navagraha: 'Navagraha Trip' };

  let msg = `🚗 *NEW BOOKING - Andavar Travels*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `📋 *Trip Type:* ${tripTypes[currentTripType] || 'Local Trip'}\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📞 *Mobile:* ${mobile}\n`;
  msg += `📅 *Date:* ${date}\n`;
  if (currentTripType === 'navagraha') {
    msg += `⏰ *Time:* 5:00 AM to 10:00 PM (Fixed)\n`;
  } else {
    msg += `⏰ *Time:* ${time}\n`;
  }
  msg += `📍 *Pickup:* ${pickup}\n`;
  msg += `📍 *Drop:* ${drop}\n\n`;
  msg += `🚗 *Vehicle:* ${vehicle.name} (${acType === 'ac' ? 'AC' : 'Non AC'})\n`;
  
  const persons = document.getElementById('b-persons') ? document.getElementById('b-persons').value : '';
  if (currentTripType === 'navagraha' && persons) {
    msg += `👤 *Total Persons:* ${persons} (Vehicle Capacity: ${vehicle.seats})\n`;
  } else {
    msg += `👤 *Persons Capacity:* ${vehicle.seats}\n`;
  }
  
  msg += packageInfo + `\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *PRICE BREAKDOWN*\n\n`;
  msg += priceInfo;
  msg += `\n*💵 TOTAL: ₹${total.toLocaleString('en-IN')}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `_Toll, parking & driver food extra_`;

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
