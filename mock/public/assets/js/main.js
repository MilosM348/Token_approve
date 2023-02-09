window.onload = () => {
  // Nav Responsive
  const btnNavResponsive = document.querySelector(".top-header-btn-nav"),
    navResponsive = document.querySelector(".nav-responsive"),
    backdropNavResponsive = document.querySelector(".nav-responsive-backdrop");

  if (btnNavResponsive) {
    btnNavResponsive.addEventListener("click", () => {
      navResponsive.classList.add("opened");
    });

    backdropNavResponsive.addEventListener("click", () => {
      navResponsive.classList.remove("opened");
    });
  }

  // Modal
  const btnOpenModal = document.querySelectorAll('[data-toggle="modal"]');

  if (btnOpenModal.length > 0) {
    btnOpenModal.forEach((item) => {
      item.addEventListener("click", (ev) => {
        const el = ev.currentTarget,
          { target } = el.dataset,
          modal = document.getElementById(target);

        if (modal) {
          const backdrop = document.createElement("div");
          backdrop.classList.add("modal-backdrop");
          document.body.appendChild(backdrop);

          modal.classList.add("opened");
        }
      });
    });

    window.addEventListener("click", (ev) => {
      const el = ev.target;

      if (
        el.classList.contains("modal-close") ||
        el.parentElement.classList.contains("modal-close") ||
        el.classList.contains("modal-dialog")
      ) {
        document.querySelector(".modal.opened").classList.remove("opened");
        document.querySelector(".modal-backdrop").remove();
      }
    });
  }

  // Copy Text
  const btnCopy = document.querySelector("[data-copy]");

  if (btnCopy) {
    btnCopy.addEventListener("click", (ev) => {
      const el = ev.currentTarget,
        text = el.dataset.copy;

      window.navigator.clipboard.writeText(text);
      el.classList.add("copied");

      setTimeout(() => {
        el.classList.remove("copied");
      }, 1000);
    });
  }

  // Dropdown Wallet
  const btnDropdownWallet = document.querySelector(".top-header-wallet > .btn"),
    dropdownWallet = document.querySelector(".dropdown-wallet"),
    closeDropdownWallet = document.querySelector(".dropdown-wallet .close");

  if (btnDropdownWallet && dropdownWallet) {
    btnDropdownWallet.addEventListener("click", () => {
      dropdownWallet.classList.toggle("opened");
    });

    closeDropdownWallet.addEventListener('click', () => {
      dropdownWallet.classList.remove("opened");
    })
  }
};
