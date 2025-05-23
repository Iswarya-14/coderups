// Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // Now header is loaded, we can safely attach toggle logic
      const menuToggle = document.getElementById("menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");

      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });
      } else {
        console.warn("Menu elements not found");
      }
    })
    .catch(error => {
      console.error("Failed to load header:", error);
    });
  

// Load footer
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

document.addEventListener('DOMContentLoaded', () => {
  // Load Enquiry Popup
  fetch('popup.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('popupContainerEnquiry').innerHTML = html;

      // WhatsApp form submit
      const form = document.getElementById('contactForm');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const name = form.querySelector('input[name="name"]').value;
          const email = form.querySelector('input[name="email"]').value;
          const phone = form.querySelector('input[name="phone"]').value;
          const city = form.querySelector('input[name="city"]').value;
          const course = form.querySelector('select[name="course"]').value;
          const specialization = form.querySelector('input[name="specialization"]').value;

          const message = `Enquiry details:\nHello, my name is ${name}.\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nCourse Interested: ${course}\nSpecialization: ${specialization}`;
          const phoneNumber = "919092752610";
          const whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

          const popupWindow = window.open(whatsappUrl, "_blank");

          if (popupWindow) {
            alert('WhatsApp popup opened. Please confirm if the message was sent.');
          } else {
            alert('Popup blocked. Please allow popups for this site.');
          }
        });
      }
    })
    .catch(error => console.error('Failed to load popup.html:', error));

  // Load Offer Popup
  fetch('offers.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('popupContainerOffer').innerHTML = html;
    })
    .catch(error => console.error('Failed to load offers.html:', error));

  // Global close button logic
  document.addEventListener('click', (e) => {
    // Enquiry popup close
    if (e.target.classList.contains('close-popup-enquiry')) {
      const popup = e.target.closest('.scroll-popup-enquiry');
      if (popup) {
        popup.style.display = 'none';
        sessionStorage.setItem('popupClosed', 'true');

        // On mobile, show offer popup after enquiry is closed
        if (window.innerWidth < 768) {
          const offerPopup = document.getElementById('offerPopup');
          if (offerPopup && sessionStorage.getItem('offerClosed') !== 'true') {
            offerPopup.style.display = 'block';
          }
        }
      }
    }

    // Offer popup close
    if (e.target.classList.contains('close-popup-offer')) {
      const popup = e.target.closest('.scroll-popup-offer');
      if (popup) {
        popup.style.display = 'none';
        sessionStorage.setItem('offerClosed', 'true');
      }
    }
  });

  // Scroll-based popup display
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      const isMobile = window.innerWidth < 768;
      const enquiryPopup = document.getElementById('scrollPopup');
      const offerPopup = document.getElementById('offerPopup');

      if (!isMobile) {
        // Desktop: Show both if not closed
        if (enquiryPopup && sessionStorage.getItem('popupClosed') !== 'true') {
          enquiryPopup.style.display = 'block';
        }
        if (offerPopup && sessionStorage.getItem('offerClosed') !== 'true') {
          offerPopup.style.display = 'block';
        }
      } else {
        // Mobile: Show enquiry first, then offer after closing enquiry
        if (enquiryPopup && sessionStorage.getItem('popupClosed') !== 'true') {
          enquiryPopup.style.display = 'block';
        } else if (offerPopup && sessionStorage.getItem('offerClosed') !== 'true') {
          offerPopup.style.display = 'block';
        }
      }
    }
  });
});