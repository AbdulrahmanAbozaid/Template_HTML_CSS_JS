/* ========================== Funcrions For All =========================== */
const $ = (x) => document.querySelector(x);
const _$ = (x) => document.querySelectorAll(x);

/* ========================== HOVER EFFECT ========================== */

const links = _$(".navbar_link a");

Array.from(links).forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    e.target.classList.add("active");
  });
  link.addEventListener("mouseleave", (e) => {
    e.target.classList.remove("active");
  });
});

/* ========================== TOGGLE SETTINGs ========================== */

const settings = $(".settings_box");
const cogIcon = $(".settings_box-icon");
const cog = $(".settings_box-toggle");

cog.addEventListener("click", (e) => {
  settings.classList.toggle("left-0");
  cogIcon.classList.toggle("fa-spin");
});

$(".settings__reset").addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
});

/* ========================== RANDOMLY CHANGING BACKGROUND-IMAGE ========================== */

// Elements
const packs = _$(".backgroun__option");
let packsActive = $(".backgroun__option.activate");
const landing = $(".landing_page");
// options
const sources = [
  "assets/images/bg-1.jpg",
  "assets/images/bg-2.jpg",
  "assets/images/bg-3.jpg",
  "assets/images/bg-4.jpg",
];
let backsRandom;

if (localStorage.randomBackground) {
  let activeEle = $("[data-perm=" + localStorage.randomBackground + "]");
  packs.forEach((color) => color.classList.remove("activate"));
  activeEle.classList.add("activate");
  packsActive = activeEle;
}

// Functions
if (packsActive.dataset.perm === "true") {
  randomBackground();
} else {
  clearInterval(backsRandom);
  if (localStorage.lastBack) {
    landing.style.backgroundImage = localStorage.lastBack;
  }
}

Array.from(packs).forEach((pack) => {
  pack.addEventListener("click", (e) => {
    packs.forEach((color) => color.classList.remove("activate"));
    e.target.classList.add("activate");
    packsActive = $(".backgroun__option.activate");
    localStorage.randomBackground = packsActive.dataset.perm;

    if (packsActive.dataset.perm === "true") {
      randomBackground();
    } else {
      clearInterval(backsRandom);
      localStorage.lastBack = landing.style.backgroundImage;
    }
  });
});

function randomBackground() {
  backsRandom = setInterval(() => {
    let currentBack = Math.floor(Math.random() * sources.length);
    landing.style.backgroundImage = "url(" + sources[currentBack] + ")";
  }, 5000);
}

/* ========================== COLORS ========================== */

const colors = _$(".color_list-item");

if (localStorage.theme) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.theme
  );
  colors.forEach((color) => color.classList.remove("color_active"));
  document
    .querySelector("[data-color='" + localStorage.theme + "']")
    .classList.add("color_active");
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", (e) => {
    // modifing .active class
    document.documentElement.style.setProperty(
      "--main-color",
      color.dataset.color
    );
    window.localStorage.theme = color.dataset.color;
    colors.forEach((color) => color.classList.remove("color_active"));
    e.target.classList.add("color_active");
  });
});

/* ========================== OUR SKILLA ========================== */

const skills = $(".oursills");

window.addEventListener("scroll", () => {
  let screenHeight = this.innerHeight;
  let sectionScroll = skills.offsetTop;
  let sectionHeight = skills.offsetHeight;
  let scrolled = this.scrollY;
  let bars = _$(".skill__bar");
  if (scrolled >= sectionScroll - 150) {
    bars.forEach((bar) => {
      bar.style.width = bar.dataset.progress;
    });
  } else {
    bars.forEach((bar) => {
      bar.style.width = "0";
    });
  }
});

/* ========================== OUR GALLERY ========================== */

const images = _$(".gallery__img");

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    // creating body overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.prepend(overlay);

    // creating box for image
    let imageBox = document.createElement("div");
    imageBox.className = "popup-image-box";
    document.body.appendChild(imageBox);

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-toggle";
    imageBox.appendChild(closeBtn);

    let currentImage = document.createElement("img");
    currentImage.src = e.target.src;
    if (e.target.alt !== "") {
      let header = document.createElement("h3");
      let text = document.createTextNode(e.target.alt);
      header.append(text);
      imageBox.prepend(header);
      header.style.cssText =
        "padding-block: 10px;text-transform: capitalize;font-size:20px;text-align: center;color: var(--main-color)";
    }
    currentImage.className = "gallery__img";

    imageBox.appendChild(currentImage);

    // creating box close
    overlay.addEventListener("click", removePopup);
    closeBtn.addEventListener("click", removePopup);

    function removePopup(e) {
      overlay.remove();
      imageBox.remove();
    }
  });
});

/* ========================== Generate ToolTips ========================== */

const secs = _$("#section");
const asideBulletsContainer = $(".aside_bullets");

secs.forEach((sec) => {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.dataset.target = sec.className;

  let tooltip = document.createElement("div");
  let tootipText = document.createTextNode(sec.dataset.title);
  tooltip.appendChild(tootipText);
  tooltip.className = "tooltip";

  bullet.appendChild(tooltip);

  asideBulletsContainer.appendChild(bullet);
});

/* ========================== ToolTip ========================== */

function scrollToView(ele) {
  $(ele).scrollIntoView({
    behavior: "smooth",
  });
}

const tooltips = _$(".aside_bullets .bullet");

tooltips.forEach((tooltip) => {
  tooltip.addEventListener("click", (e) => {
    scrollToView("." + e.target.dataset.target);
  });
});

window.addEventListener("scroll", (e) => {
  let scrolled = this.scrollY;
  Array.from(secs).forEach((sec) => {
    if (scrolled > sec.offsetTop - 20) {
      tooltips.forEach((tool) => tool.classList.remove("active"));
      $(".bullet[data-target=" + sec.className + "]").classList.add("active");
    }
  });
});

/* ========================== ToolTip Options ========================== */

const tooltipOptions = _$(".bullets_option");
const asideNav = $(".aside_bullets");

if (localStorage.tooltipSettings) {
  Array.from(tooltipOptions).forEach((opt) => opt.classList.remove("activate"));
  $("[data-display=" + localStorage.tooltipSettings + "]").classList.add(
    "activate"
  );
  asideNav.style.display = localStorage.tooltipSettings;
}

Array.from(tooltipOptions).forEach((option) => {
  option.addEventListener("click", (e) => {
    asideNav.style.display = e.target.dataset.display;
    tooltipOptions.forEach((opt) => opt.classList.remove("activate"));
    e.target.classList.add("activate");
    localStorage.tooltipSettings = e.target.dataset.display;
  });
});

/* ========================== SCROLL TO NAV ========================== */

const navLinks = _$(".navbar_link a");

Array.from(navLinks).forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToView("." + e.target.dataset.target);
  });
});

/* ========================== TOGGLE MENU ========================== */

const toggleIcon = $(".toggle-menu");
const toggleMenu = $(".navbar");

toggleIcon.addEventListener("click", (ec) => {
  ec.stopPropagation();
  toggleMenu.classList.toggle("show");
  toggleIcon.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (toggleMenu.classList.contains("show")) {
    if (
      !e.target.closest("ul") &&
      !e.target.classList.contains("toggle-menu")
    ) {
      toggleMenu.classList.remove("show");
      toggleIcon.classList.remove("active");
    }
  }
});

/* ============================== Show Header On Scrolling Up HeadRome.JS =========================== */

const onUpOption = _$(".onup_option");
const hydra = $(".hydra");
let defaultOption = true;
let firstScrollY = 0;

// detect scrolling Direction
let detectDirect = (e) => {
  let clientY = this.scrollY;
  if (firstScrollY > clientY) {
    hydra.classList.add("scrolledUp");
  } else {
    hydra.classList.remove("scrolledUp");
  }
  if (clientY === 0) {
    hydra.classList.remove("scrolledUp");
  }
  firstScrollY = clientY;
};

function onUpOptionIf(b) {
  if (b) {
    window.addEventListener("scroll", detectDirect, false);
  } else {
    window.removeEventListener("scroll", detectDirect, false);
  }
}

if (localStorage.defaultOption) {
  defaultOption = +localStorage.defaultOption;
  Array.from(onUpOption).forEach((option) =>
    option.classList.remove("activate")
  );
  $(
    ".onup_option[data-onup='" + localStorage.defaultOption + "']"
  ).classList.add("activate");
}

onUpOptionIf(defaultOption);

onUpOption.forEach((option) => {
  option.addEventListener("click", (e) => {
    onUpOptionIf(e.target.dataset.onup === "1");

    localStorage.defaultOption = e.target.dataset.onup;

    Array.from(onUpOption).forEach((option) =>
      option.classList.remove("activate")
    );
    e.target.classList.add("activate");
  });
});
