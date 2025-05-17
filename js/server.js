  // Load popup.html into the container and set up functionality
  document.addEventListener('DOMContentLoaded', function () {
    fetch('popup.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('popupContainer').innerHTML = data;
  
        // Scroll event to show popup
        window.addEventListener('scroll', function () {
          const popup = document.getElementById('scrollPopup');
          if (popup && window.scrollY > 100) {
            popup.style.display = 'block';
          }
        });
  
        // Close popup button
        document.addEventListener('click', function (e) {
          if (e.target.id === 'closePopup') {
            const popup = document.getElementById('scrollPopup');
            if (popup) {
              popup.style.display = 'none';
            }
          }
        });
  
        // WhatsApp form submission
        const form = document.getElementById('contactForm');
        if (form) {
          form.addEventListener('submit', function (e) {
            e.preventDefault();
  
            const name = document.querySelector('input[name="name"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const phone = document.querySelector('input[name="phone"]').value;
            const city = document.querySelector('input[name="city"]').value;
            const course = document.querySelector('select[name="course"]').value;
            const specialization = document.querySelector('input[name="specialization"]').value;
  
            const message = `Hello, my name is ${name}.
  Email: ${email}
  Phone: ${phone}
  City: ${city}
  Course Interested: ${course}
  Specialization: ${specialization}`;
  
            const phoneNumber = "917010978915"; // Add your full WhatsApp number here
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

// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'iswaryagvsi99@gmail.com', // your Gmail
    pass: 'lzdt newp xzst gzpf'     // 16-digit app password
  }
});

const mailOptions = {
  from: 'your_email@gmail.com',
  to: 'receiver_email@example.com',
  subject: 'Test Email from Node.js',
  text: 'This is a test email sent using Node.js and Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log('Email sent: ' + info.response);
});

