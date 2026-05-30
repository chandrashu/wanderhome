// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

let adults = 1;
let children = 0;

const guestField = document.getElementById("guestField");
const guestBox = document.getElementById("guestBox");
const guestInput = document.getElementById("guestInput");

if (guestField && guestBox) {
  guestField.addEventListener("click", () => {
    guestBox.classList.toggle("show");
  });
}

function changeGuest(type, value) {
  if (!guestInput) {
    return;
  }

  if (type === "adult") {
    adults = Math.max(1, adults + value);
    const adultCount = document.getElementById("adultCount");
    if (adultCount) adultCount.innerText = adults;
  }

  if (type === "child") {
    children = Math.max(0, children + value);
    const childCount = document.getElementById("childCount");
    if (childCount) childCount.innerText = children;
  }

  // 👉 Reset to placeholder when default
  if (adults === 1 && children === 0) {
    guestInput.value = "";
    guestInput.placeholder = "Add guests";
    return;
  }

  let text = adults + " adult" + (adults > 1 ? "s" : "");

  if (children > 0) {
    text += ", " + children + " child" + (children > 1 ? "ren" : "");
  }

  guestInput.value = text;
}


// Close on outside click
document.addEventListener("click", (e) => {
  if (!guestField || !guestBox) {
    return;
  }

  if (!guestField.contains(e.target) && !guestBox.contains(e.target)) {
    guestBox.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".category-item");

  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

function toggleMenu() {
  const menu = document.getElementById("hamburgerDropdown");
  if (!menu) return;

  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", (e) => {
  const menu = document.getElementById("hamburgerDropdown");
  const btn = document.querySelector(".hamburger-btn");

  if (!menu || !btn) {
    return;
  }

  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = "none";
  }
});

const flashMessage = document.getElementById("flashMessage");

if(flashMessage){

    setTimeout(() => {

        flashMessage.style.transition = "0.3s";

        flashMessage.style.opacity = "0";

        flashMessage.style.transform = "translateY(-20px)";

        setTimeout(() => {
            flashMessage.remove();
        }, 3000);

    }, 3000);
}




