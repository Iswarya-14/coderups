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

  
// // Inside header fetch block
// document.addEventListener('click', async (e) => {
//   if (e.target.id === 'openEnquiryPopup') {
//     e.preventDefault();

//     const container = document.getElementById('popupContainerEnquiry');

//     // Load popup only once
//     if (!document.getElementById('scrollPopup')) {
//       try {
//         const res = await fetch('popup.html');
//         const html = await res.text();
//         container.innerHTML = html;

//         // Add close button logic
//         document.addEventListener('click', (e) => {
//           if (e.target.classList.contains('close-popup-enquiry')) {
//             const popup = document.getElementById('scrollPopup');
//             if (popup) popup.style.display = 'none';
//             document.body.style.overflow = ''; // Re-enable scroll
//           }
//         });

//         // WhatsApp form submission
//         const form = document.getElementById('contactForm');
//         if (form) {
//           form.addEventListener('submit', function (e) {
//             e.preventDefault();
//             const name = form.querySelector('input[name="name"]').value;
//             const email = form.querySelector('input[name="email"]').value;
//             const phone = form.querySelector('input[name="phone"]').value;
//             const city = form.querySelector('input[name="city"]').value;
//             const course = form.querySelector('select[name="course"]').value;
//             const specialization = form.querySelector('input[name="specialization"]').value;

//             const message = `Enquiry details:\nHello, my name is ${name}.\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nCourse Interested: ${course}\nSpecialization: ${specialization}`;
//             const phoneNumber = "919092752610";
//             const whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

//             const popupWindow = window.open(whatsappUrl, "_blank");

//             if (popupWindow) {
//               alert('WhatsApp popup opened. Please confirm if the message was sent.');
//             } else {
//               alert('Popup blocked. Please allow popups for this site.');
//             }
//           });
//         }

//         // Show popup after loading
//         const popup = document.getElementById('scrollPopup');
//         if (popup) {
//           popup.style.display = 'flex';
//           document.body.style.overflow = 'hidden'; // Prevent background scroll on mobile
//         }

//       } catch (err) {
//         console.error('Failed to load popup.html:', err);
//       }
//     } else {
//       // Already loaded — just show
//       const popup = document.getElementById('scrollPopup');
//       if (popup) {
//         popup.style.display = 'flex';
//         document.body.style.overflow = 'hidden';
//       }
//     }
//   }
// });

// === POPUP HANDLER ===
document.addEventListener('click', async (e) => {
  if (e.target.id === 'openEnquiryPopup') {
    e.preventDefault();

    const container = document.getElementById('popupContainerEnquiry');

    // Load popup only once
    if (!document.getElementById('scrollPopup')) {
      try {
        const res = await fetch('popup.html');
        const html = await res.text();
        container.innerHTML = html;

        // Close button logic
        document.addEventListener('click', (e) => {
          if (e.target.classList.contains('close-popup-enquiry')) {
            const popup = document.getElementById('scrollPopup');
            if (popup) popup.style.display = 'none';
            document.body.style.overflow = '';
          }
        });

        // === FORM SUBMISSION (send to backend) ===
        // const form = document.getElementById('contactForm');
        // if (form) {
        //   form.addEventListener('submit', async function (e) {
        //     e.preventDefault();

        //     const formData = new FormData(form);
        //     const data = Object.fromEntries(formData.entries());

        //     try {
        //       const res = await fetch("http://localhost:3000/send", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(data)
        //       });

        //       if (res.ok) {
        //         alert("✅ Your enquiry has been sent successfully!");
        //         form.reset();
        //         const popup = document.getElementById('scrollPopup');
        //         if (popup) popup.style.display = 'none';
        //         document.body.style.overflow = '';
        //       } else {
        //         alert("❌ Failed to send enquiry. Please try again later.");
        //       }
        //     } catch (error) {
        //       console.error("Error:", error);
        //       alert("⚠️ Error sending enquiry. Check console for details.");
        //     }
        //   });
        // }
        const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("✅ Your enquiry has been sent successfully!");
        form.reset();
      } else {
        alert("❌ Failed to send enquiry. Please try again later.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Error sending enquiry.");
    }
  });
}


        // Show popup
        const popup = document.getElementById('scrollPopup');
        if (popup) {
          popup.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }

      } catch (err) {
        console.error('Failed to load popup.html:', err);
      }
    } else {
      // Already loaded
      const popup = document.getElementById('scrollPopup');
      if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    }
  }
});

// Offer popup
document.addEventListener('DOMContentLoaded', () => {

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

  // Scroll-based offer popup display only
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    const offerPopup = document.getElementById('offerPopup');

    // Show offer popup if not already closed
    if (offerPopup && sessionStorage.getItem('offerClosed') !== 'true') {
      offerPopup.style.display = 'block';
    }
  }
});
});