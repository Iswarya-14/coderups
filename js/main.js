// Load header
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

  document.addEventListener("DOMContentLoaded", () => {
  
    setTimeout(() => {
      const menuToggle = document.getElementById("menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");
  
      if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
          mobileMenu.classList.toggle("hidden");
        });
      } else {
        console.warn("Menu elements not found");
      }
    }, 300);
  });
  
  

// Load footer
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });


// Load popup.html into the container and set up functionality
document.addEventListener('DOMContentLoaded', function () {
  fetch('popup.html?v=' + Date.now())
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('popupContainer');
      if (!container) {
        console.error("Missing #popupContainer in HTML.");
        return;
      }

      container.innerHTML = data;
      

      // Scroll event to show popup only once
      function handleScroll() {
        const popup = document.getElementById('scrollPopup');
        if (popup && window.scrollY > 100) {
          if(sessionStorage.getItem('popupClosed') === "true"){
            popup.style.display = 'none';
          }
          else{
            popup.style.display = 'block';
          }
          
        }
      }

      window.addEventListener('scroll', handleScroll);

      // Close popup button
      const closeBtn = document.getElementById('closePopup');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          const popup = document.getElementById('scrollPopup');
          if (popup) {
            popup.style.display = 'none';
            sessionStorage.setItem('popupClosed', 'true'); // Store closed state for this session
          }
        });
      }

      // WhatsApp form submission
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

          const message = `Enquiry details:
Hello, my name is ${name}.
Email: ${email}
Phone: ${phone}
City: ${city}
Course Interested: ${course}
Specialization: ${specialization}`;

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
});