const track = document.querySelector(".promo-track");
const pages = document.querySelectorAll(".promo-page");
const prev = document.querySelector("[data-prev]");
const next = document.querySelector("[data-next]");
const promoSection = document.querySelector(".container-contain");
const decorLeft = document.querySelector(".decor-left");
const decorRight = document.querySelector(".decor-right");

const btnMore = document.querySelector(".btn-more");
const cards = document.querySelectorAll(".suggest-card");

const STEP = 12;
let visibleCount = STEP;
/* ================= INSTALLMENT SLIDER (TGDD STYLE) ================= */

const installmentTrack = document.querySelector(".installment-track");
const installmentPages = document.querySelectorAll(".installment-page");
const installmentPrev = document.querySelector("[data-installment-prev]");
const installmentNext = document.querySelector("[data-installment-next]");

if (
  installmentTrack &&
  installmentPages.length &&
  installmentPrev &&
  installmentNext
) {
  let installmentIndex = 0;
  const maxIndex = installmentPages.length - 1;

  function updateInstallmentSlider() {
    installmentTrack.style.transform = `translateX(-${
      installmentIndex * 100
    }%)`;

    installmentPrev.classList.toggle("is-disabled", installmentIndex === 0);
    installmentNext.classList.toggle(
      "is-disabled",
      installmentIndex === maxIndex
    );
  }

  installmentPrev.addEventListener("click", () => {
    if (installmentIndex > 0) {
      installmentIndex--;
      updateInstallmentSlider();
    }
  });

  installmentNext.addEventListener("click", () => {
    if (installmentIndex < maxIndex) {
      installmentIndex++;
      updateInstallmentSlider();
    }
  });

  updateInstallmentSlider();
}

document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector("nav.main-nav");

  if (!mainNav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      mainNav.classList.add("show");
    } else {
      mainNav.classList.remove("show");
    }
  });
});

// hiển thị 12 card đầu
cards.forEach((card, i) => {
  if (i < STEP) card.classList.add("is-visible");
});

btnMore.addEventListener("click", () => {
  let shown = 0;

  for (let i = visibleCount; i < cards.length && shown < STEP; i++) {
    cards[i].classList.add("is-visible");
    shown++;
  }

  visibleCount += shown;
  btnMore.classList.add("is-open");

  // hết sản phẩm
  if (visibleCount >= cards.length) {
    btnMore.textContent = "Đã hiển thị tất cả sản phẩm";
    btnMore.disabled = true;
  }
});

window.addEventListener("scroll", () => {
  const triggerPoint = promoSection.offsetTop - 100;
  const scrollTop = window.scrollY;

  if (scrollTop > triggerPoint) {
    decorLeft.classList.add("is-fixed");
    decorRight.classList.add("is-fixed");
  } else {
    decorLeft.classList.remove("is-fixed");
    decorRight.classList.remove("is-fixed");
  }
});

let index = 0;
const max = pages.length - 1;

const topbarWrap = document.querySelector(".topbar-wrap");
const header = document.querySelector(".site-header");

const TOPBAR_HEIGHT = 64;

window.addEventListener("scroll", () => {
  if (window.scrollY > TOPBAR_HEIGHT) {
    topbarWrap.classList.add("is-fixed");
    header.style.paddingTop = TOPBAR_HEIGHT + "px";
  } else {
    topbarWrap.classList.remove("is-fixed");
    header.style.paddingTop = "0";
  }
});

function update() {
  track.style.transform = `translateX(-${index * 100}%)`;
  prev.classList.toggle("is-disabled", index === 0);
  next.classList.toggle("is-disabled", index === max);
}

prev.onclick = () => {
  if (index > 0) index--;
  update();
};

next.onclick = () => {
  if (index < max) index++;
  update();
};

update();
