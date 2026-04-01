// =========================
// Utility Functions
// =========================
function openPopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closePopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }
}

function toggleMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) {
    mobileMenu.classList.add("hidden");
  }
}

function buildEnquiryMessage(data) {
  return `Hello, my name is ${data.name}.
Email: ${data.email}
Phone: ${data.phone}
City: ${data.city}
Course Interested: ${data.course}${data.specialization ? `\nSpecialization: ${data.specialization}` : ""}`;
}

function openWhatsAppFallback(data) {
  const phoneNumber = "919384271412";
  const whatsappUrl =
    "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(buildEnquiryMessage(data));
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

function handleFormSubmission(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (form.querySelector("#sendWhatsApp")?.checked) {
      openWhatsAppFallback(data);
      return;
    }

    try {
      const res = await fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Your enquiry has been sent successfully.");
        form.reset();
        closePopup("scrollPopup");
      } else {
        openWhatsAppFallback(data);
      }
    } catch (err) {
      console.error("Error:", err);
      openWhatsAppFallback(data);
    }
  });
}

// =========================
// Header & Footer Load
// =========================
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    const headerTarget = document.getElementById("header");
    if (!headerTarget) return;

    headerTarget.innerHTML = data;

    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (
          mobileMenu &&
          !mobileMenu.contains(e.target) &&
          !menuToggle.contains(e.target)
        ) {
          mobileMenu.classList.add("hidden");
        }
      });
    }
  })
  .catch((err) => console.error("Failed to load header:", err));

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    const footerTarget = document.getElementById("footer-placeholder");
    if (footerTarget) {
      footerTarget.innerHTML = data;
    }
  })
  .catch((err) => console.error("Failed to load footer:", err));

const demoForm = document.getElementById("demoForm");
if (demoForm) {
  handleFormSubmission(demoForm);
}

const enquiryForm = document.getElementById("contactForm");
if (enquiryForm) {
  handleFormSubmission(enquiryForm);
}

// =========================
// Enquiry Popup
// =========================
document.addEventListener("click", async (e) => {
  if (e.target.id === "openEnquiryPopup") {
    e.preventDefault();

    const container = document.getElementById("popupContainerEnquiry");
    if (!container) return;

    if (!document.getElementById("scrollPopup")) {
      try {
        const res = await fetch("popup.html");
        const html = await res.text();
        container.innerHTML = html;

        document.addEventListener("click", (event) => {
          if (event.target.classList.contains("close-popup-enquiry")) {
            closePopup("scrollPopup");
            sessionStorage.setItem("popupClosed", "true");
          }
        });

        const form = document.getElementById("contactForm");
        if (form) handleFormSubmission(form);

        openPopup("scrollPopup");
      } catch (err) {
        console.error("Failed to load popup.html:", err);
      }
    } else {
      openPopup("scrollPopup");
    }
  }
});

// =========================
// Offer Popup
// =========================
document.addEventListener("DOMContentLoaded", () => {
  fetch("offers.html")
    .then((res) => res.text())
    .then((html) => {
      const offerContainer = document.getElementById("popupContainerOffer");
      if (offerContainer) {
        offerContainer.innerHTML = html;
      }
    })
    .catch((err) => console.error("Failed to load offers.html:", err));

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close-popup-offer")) {
      closePopup("offerPopup");
      sessionStorage.setItem("offerClosed", "true");
    }
  });

  let offerShown = false;
  setTimeout(() => {
    window.addEventListener("scroll", () => {
      if (!offerShown && window.scrollY > 150) {
        const offerPopup = document.getElementById("offerPopup");
        if (offerPopup && sessionStorage.getItem("offerClosed") !== "true") {
          openPopup("offerPopup");
          offerShown = true;
        }
      }
    });
  }, 15000);
});
