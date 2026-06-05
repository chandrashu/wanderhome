// Example starter JavaScript for disabling form submissions if there are invalid fields
const listingImageFallback = "/images/listing-fallback.jpg";

document.addEventListener(
  "error",
  (event) => {
    const image = event.target;

    if (image.tagName !== "IMG" || image.dataset.fallbackApplied === "true") {
      return;
    }

    image.dataset.fallbackApplied = "true";
    image.src = listingImageFallback;
  },
  true
);

(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

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

document.addEventListener("click", (event) => {
  if (!guestField || !guestBox) {
    return;
  }

  if (!guestField.contains(event.target) && !guestBox.contains(event.target)) {
    guestBox.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".category-item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((category) => category.classList.remove("active"));
      item.classList.add("active");
    });
  });

  const panelToggles = document.querySelectorAll("[data-mobile-panel-toggle]");
  const panels = document.querySelectorAll("[data-mobile-panel]");
  const closeButtons = document.querySelectorAll("[data-mobile-panel-close]");
  const searchForm = document.getElementById("searchForm");
  const searchButton = searchForm?.querySelector(".search-btn");
  const locationInput = document.getElementById("navLocation");
  const mobileSearchQuery = window.matchMedia("(max-width: 768px)");

  const closeMobilePanels = () => {
    panels.forEach((panel) => {
      panel.classList.remove("show");
      panel.setAttribute("aria-hidden", "true");
    });

    panelToggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
    });
  };

  const closeMobileSearch = () => {
    if (!searchForm || !searchButton) {
      return;
    }

    searchForm.classList.remove("mobile-search-open");
    searchButton.setAttribute("aria-label", "Search listings");
  };

  if (searchForm && searchButton) {
    searchButton.addEventListener("click", (event) => {
      if (!mobileSearchQuery.matches) {
        return;
      }

      if (!searchForm.classList.contains("mobile-search-open")) {
        event.preventDefault();
        event.stopPropagation();
        closeMobilePanels();

        const menu = document.getElementById("hamburgerDropdown");
        const menuButton = document.querySelector(".hamburger-btn");

        if (menu) {
          menu.classList.remove("show");
        }

        if (menuButton) {
          menuButton.setAttribute("aria-expanded", "false");
        }

        searchForm.classList.add("mobile-search-open");
        searchButton.setAttribute("aria-label", "Submit search");
        window.requestAnimationFrame(() => locationInput?.focus());
      }
    });

    searchForm.addEventListener("click", (event) => {
      if (searchForm.classList.contains("mobile-search-open")) {
        event.stopPropagation();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        mobileSearchQuery.matches &&
        searchForm.classList.contains("mobile-search-open") &&
        !searchForm.contains(event.target)
      ) {
        closeMobileSearch();
      }
    });

    mobileSearchQuery.addEventListener("change", (event) => {
      if (!event.matches) {
        closeMobileSearch();
      }
    });
  }

  panelToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      closeMobileSearch();

      const targetPanel = document.querySelector(
        `[data-mobile-panel="${toggle.dataset.mobilePanelToggle}"]`
      );

      if (!targetPanel) {
        return;
      }

      const shouldOpen = !targetPanel.classList.contains("show");
      closeMobilePanels();

      if (shouldOpen) {
        targetPanel.classList.add("show");
        targetPanel.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeMobilePanels);
  });

  panels.forEach((panel) => {
    panel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", closeMobilePanels);
});

function toggleMenu() {
  const menu = document.getElementById("hamburgerDropdown");
  const button = document.querySelector(".hamburger-btn");

  if (!menu || !button) {
    return;
  }

  const isOpen = menu.classList.toggle("show");
  button.setAttribute("aria-expanded", String(isOpen));
}

document.addEventListener("click", (event) => {
  const menu = document.getElementById("hamburgerDropdown");
  const button = document.querySelector(".hamburger-btn");

  if (!menu || !button) {
    return;
  }

  if (!button.contains(event.target) && !menu.contains(event.target)) {
    menu.classList.remove("show");
    button.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const menu = document.getElementById("hamburgerDropdown");
  const button = document.querySelector(".hamburger-btn");

  if (menu) {
    menu.classList.remove("show");
  }

  if (button) {
    button.setAttribute("aria-expanded", "false");
  }

  if (guestBox) {
    guestBox.classList.remove("show");
  }

  const searchForm = document.getElementById("searchForm");
  const searchButton = searchForm?.querySelector(".search-btn");

  if (searchForm) {
    searchForm.classList.remove("mobile-search-open");
  }

  if (searchButton) {
    searchButton.setAttribute("aria-label", "Search listings");
  }

  document.querySelectorAll("[data-mobile-panel]").forEach((panel) => {
    panel.classList.remove("show");
    panel.setAttribute("aria-hidden", "true");
  });

  document.querySelectorAll("[data-mobile-panel-toggle]").forEach((toggle) => {
    toggle.setAttribute("aria-expanded", "false");
  });
});

const flashMessage = document.getElementById("flashMessage");

if (flashMessage) {
  setTimeout(() => {
    flashMessage.style.transition = "0.3s";
    flashMessage.style.opacity = "0";
    flashMessage.style.transform = "translateY(-20px)";

    setTimeout(() => {
      flashMessage.remove();
    }, 3000);
  }, 3000);
}
