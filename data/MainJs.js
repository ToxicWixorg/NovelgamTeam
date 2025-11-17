const header = document.getElementById("Header");
const headerbutts = document.getElementsByClassName("header_butt");
const SlidesContainer = document.getElementById("slides");
const sugguest_games_box = document.getElementById("sugguest_games");

let slidedescription = [];
let slideInterval = null;
let slideindex = 0;
let slides = [];

let currentSlide = 3;
const totalSlides = 5;
let autoSlideInterval = null;

function initgamedatas() {
  fetch("https://toxicwixorg.github.io/NovelgamTeam/asset/game_data/GameData.json")
    .then((response) => response.json())
    .then((games) => {
      if (games.length > 0) {
        for (let i in games) {
          const game = games[i];
          const sugguest_a = document.createElement("a");
          sugguest_a.setAttribute(
            "href",
            `./Games.html#${game.enname.trim().replaceAll(" ", "_")}`
          );
          sugguest_a.textContent = `${parseInt(i) + 1}.  ${game.enname}`;
          sugguest_games_box.append(sugguest_a);
        }
        console.log(CreateSlideLabelHTML(games));
        SlidesContainer.innerHTML = CreateSlideLabelHTML(games);
        initAutoSlide();
      }
    });
}

function CreateSlideLabelHTML(games) {
  return `
    <label class="slide" for="S1">
        <img class="slide_thumbnail" src="asset/${
          games[0].slide
        }/1.webp" alt="${games[0].slide}">
        <span class="slide_decription">
            <a href="./Games.html#${games[0].enname.replaceAll(" ", "_")}">${
    games[0].enname
  }</a>
        </span>
    </label>
    <label class="slide" for="S2">
        <img class="slide_thumbnail" src="asset/${
          games[1].slide
        }/1.webp" alt="${games[1].slide}">
        <span class="slide_decription">
            <a href="./Games.html#${games[1].enname.replaceAll(" ", "_")}">${
    games[1].enname
  }</a>
        </span>
    </label>
    <label class="slide" for="S3">
        <img class="slide_thumbnail" src="asset/${
          games[2].slide
        }/1.webp" alt="${games[2].slide}">
        <span class="slide_decription">
            <a href="./Games.html#${games[2].enname.replaceAll(" ", "_")}">${
    games[2].enname
  }</a>
        </span>
    </label>
    <label class="slide" for="S4">
        <img class="slide_thumbnail" src="asset/${
          games[3].slide
        }/1.webp" alt="${games[3].slide}">
        <span class="slide_decription">
            <a href="./Games.html#${games[3].enname.replaceAll(" ", "_")}">${
    games[3].enname
  }</a>
        </span>
    </label>
    <label class="slide" for="S5">
        <img class="slide_thumbnail" src="asset/TW.webp">
        <span class="slide_decription">
            <a href="./Games.html">All Games</a>
        </span>
    </label>
    `;
}

function startAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }

  autoSlideInterval = setInterval(() => {
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    const slideElement = document.getElementById(`S${currentSlide}`);
    if (slideElement) {
      slideElement.checked = true;
    }
  }, 4000);
}

function initAutoSlide() {
  startAutoSlide();

  const slider = document.getElementById("pup_game_slider");
  if (slider) {
    slider.addEventListener("mouseenter", () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    });

    slider.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }

  const radioButtons = document.querySelectorAll('input[name="slidesradios"]');
  radioButtons.forEach((radio, index) => {
    radio.addEventListener("change", () => {
      currentSlide = index + 1;
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
      }
      startAutoSlide();
    });
  });
}

function randintnum(a, b) {
  b++;
  return Math.floor(Math.random() * (b - a) + a);
}

// فقط یک DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function () {
  initgamedatas();

  const mainMenu = document.getElementById("MainMenu");
  const aboutBoxes = document.querySelectorAll(".aboutuscontent");

  function checkFadeUp() {
    const mainMenuRect = mainMenu.getBoundingClientRect();
    aboutBoxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();
      const distanceFromBottom = window.innerHeight - boxRect.top - 100;
      if (
        distanceFromBottom >= -32 &&
        distanceFromBottom <= window.innerHeight
      ) {
        box.classList.add("fade-up");
      }
    });
  }

  mainMenu.addEventListener("scroll", checkFadeUp);
  window.addEventListener("scroll", checkFadeUp);
  checkFadeUp();
});

