// ===== NAVBAR SCROLL & MOBILE MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const backTop = document.querySelector('.back-top');

  // Scroll effects
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    if (backTop) {
      if (window.scrollY > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }
  });

  // Mobile menu
  const overlay = document.getElementById('navOverlay');

  function openMenu() {
    hamburger?.classList.add('active');
    navLinks?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on overlay click
  overlay?.addEventListener('click', closeMenu);

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Back to top
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll animations
  const animElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  animElements.forEach(el => observer.observe(el));
});

// ===== NAVBAR COMPONENT =====
function renderNavbar(activePage) {
  return `
  <div class="nav-overlay" id="navOverlay"></div>
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" style="text-decoration: none;">
        <div class="css-logo">
          <div class="text-wrap">
            <div class="main-text"><span class="red-a">A</span><span class="white-text">NDAVAR</span></div>
            <div class="sub-text">TRAVELS</div>
          </div>
        </div>
      </a>
      <div class="nav-links" id="navLinks">
        <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a>
        <a href="about.html" class="${activePage === 'about' ? 'active' : ''}">About Us</a>
        <a href="services.html" class="${activePage === 'services' ? 'active' : ''}">Services</a>
        <a href="vehicles.html" class="${activePage === 'vehicles' ? 'active' : ''}">Our Vehicles</a>
        <a href="contact.html" class="${activePage === 'contact' ? 'active' : ''}">Contact</a>
        <a href="booking.html" class="nav-cta ${activePage === 'booking' ? 'active' : ''}">Book Now</a>
      </div>
      <div class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>`;
}

// ===== FOOTER COMPONENT =====
function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="css-logo" style="margin-bottom: 16px;">
            <div class="text-wrap">
              <div class="main-text"><span class="red-a">A</span><span class="white-text">NDAVAR</span></div>
              <div class="sub-text">TRAVELS</div>
            </div>
          </div>
          <p>848, Karaikal Main Road, Muthupillaimandapam, Kumbakonam. Your trusted travel partner for all your journey needs.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="vehicles.html">Our Vehicles</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="booking.html?type=local">Local Trips</a></li>
            <li><a href="booking.html?type=days">Days Package</a></li>
            <li><a href="booking.html?type=airport">Airport Transfer</a></li>
            <li><a href="booking.html?type=long">Long Trips</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <ul>
            <li><a href="tel:8610890499">📞 86108 90499</a></li>
            <li><a href="tel:8489574003">📞 84895 74003</a></li>
            <li><a href="mailto:andavarcab123@gmail.com">✉️ andavarcab123@gmail.com</a></li>
            <li><a href="contact.html">📍 Kumbakonam</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Andavar Travels. All rights reserved.</p>
      </div>
    </div>
  </footer>
  
  <!-- WhatsApp Float -->
  <a href="https://wa.me/918610890499?text=Hi%20Andavar%20Travels,%20I%20would%20like%20to%20book%20a%20vehicle." class="whatsapp-float" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    <span>Chat with us</span>
  </a>
  
  <!-- Phone Float -->
  <a href="tel:8610890499" class="phone-float">
    <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
    <span>Call Now</span>
  </a>
  
  <div class="back-top" id="backTop">↑</div>`;
}
