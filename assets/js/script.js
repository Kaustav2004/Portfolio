'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  // Function to remove active class from all links
  const removeActiveClass = () => {
    navbarLinks.forEach(link => link.classList.remove('active'));
  };

  // Function to add active class to the clicked link
  const setActiveLink = (link) => {
    link.classList.add('active');
  };

  // Click event listener for each navbar item
  navbarLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove active class from all navbar links
      removeActiveClass();

      // Add active class to clicked link
      setActiveLink(this);

      // Scroll to the corresponding section (if you have sections with matching IDs)
      const sectionId = this.textContent.trim().toLowerCase();  // Adjust this according to your actual section IDs
      const section = document.getElementById(sectionId);

      if (section) {
        window.scrollTo({
          top: section.offsetTop - 50,  // Adjust the offset for header if needed
          behavior: 'smooth'
        });
      }
    });
  });
});

// email send
const sendButton = document.getElementById('sendButton');
const loadingSpinner = sendButton.querySelector('.loading');

const form1 = document.getElementById("contactForm");
form1.addEventListener('submit', (event) => {
  event.preventDefault();

});
document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");

  sendButton.addEventListener("click", () => {
      sendEmail();
  });
});

function sendEmail() {

    // Disable the button and show the loading spinner
    sendButton.disabled = true;
    loadingSpinner.style.display = 'block';

  // Fetch input values from the form
  const recipientEmail = document.getElementById("recipient").value;
  const recipientName = document.getElementById("recipientname").value;
  const subject = `Message from ${recipientName} From Your Portfolio`;
  const message = document.getElementById("message").value;

  // Validate the input fields
  if (!recipientEmail || !subject || !message) {
      alert("Please fill out all fields before sending.");
      return;
  }

  console.log(recipientName, recipientEmail,message);

  let params = {
    name:recipientName,
    emailId:recipientEmail,
    message:message
  }

  emailjs.send("service_gyvfvni","template_o0swjwd", params) .then(() => {
    // Show success popup
    document.getElementById('popup').innerHTML = 'Message Send Successfully';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup').style.backgroundColor = '#4CAF50';
    // Clear the form fields after sending the email
    document.getElementById('recipient').value = '';
    document.getElementById('recipientname').value = '';
    document.getElementById('message').value = '';
    

    

    // Hide the popup after 3 seconds
    setTimeout(() => {
      document.getElementById('popup').style.display = 'none';
    }, 3000);
  })
  .catch((error) =>  {
    document.getElementById('popup').innerHTML = 'Message can not Send';
    document.getElementById('popup').style.backgroundColor = 'red';
    setTimeout(() => {
      document.getElementById('popup').style.display = 'none';
    }, 3000);
  })
  .then(()=>{
    sendButton.disabled = false;
    loadingSpinner.style.display = 'none';
  });;
}
