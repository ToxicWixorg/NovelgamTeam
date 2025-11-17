document.addEventListener("DOMContentLoaded", initGames);

const MainMenu = document.getElementById("MainMenu");
const sugguest_games_box = document.getElementById("sugguest_games");
const GameSearchBox = document.getElementById("GameSearchBox");
const searchingprompt = document.getElementById("searchingprompt");
const GameSearchButt = document.getElementById("GameSearchButt");

function initGames() {
  document.title = "NovelGam - Games";
  fetch("https://toxicwixorg.github.io/NovelgamTeam/asset/game_data/GameData.json")
    .then((response) => response.json())
    .then((games) => {
      if (games.length > 0) {
        if (document.URL.split("#")[1]) {
          for (let i in games) {
            const game = games[i];

            const sugguest_a = document.createElement("a");
            sugguest_a.setAttribute("href", game.gamedownlink);
            sugguest_a.textContent = `${parseInt(i) + 1}.  ${game.enname}`;
            sugguest_games_box.append(sugguest_a);

            if (
              `${game.enname}`.trim().replaceAll(" ", "_") ==
              document.URL.split("#")[1]
            ) {
              createbox(i, game);
              document.title = game.enname;
            }
          }
          addscrollewent();
        } else {
          for (let i in games) {
            const game = games[i];

            const sugguest_a = document.createElement("a");
            sugguest_a.setAttribute(
              "href",
              `./Games.html#${game.enname.trim().replaceAll(" ", "_")}`
            );
            sugguest_a.textContent = `${parseInt(i) + 1}.  ${game.enname}`;
            sugguest_games_box.append(sugguest_a);

            createbox(i, game);
          }
          addscrollewent();
        }
      } else {
        searchingprompt.textContent = "در حال حاضر بازی برای ارائه وجود ندارد";
      }
    });
}

GameSearchBox.addEventListener("input", (event) => {
  document.title = "NovelGam - Games";
  const target = String(GameSearchBox.value).trim().toLowerCase();
  clearMainMenu();
  if (target == "") {
    searchingprompt.textContent = "";
    fetch("https://toxicwixorg.github.io/NovelgamTeam/asset/game_data/GameData.json")
      .then((response) => response.json())
      .then((games) => {
        if (games.length > 0) {
          for (let i in games) {
            const game = games[i];
            createbox(i, game);
          }
          addscrollewent();
        } else {
          searchingprompt.textContent =
            "در حال حاضر بازی برای ارائه وجود ندارد";
        }
      });
  } else {
    searchingprompt.textContent = `جست و جو...`;
    let results = [];
    fetch("https://toxicwixorg.github.io/NovelgamTeam/asset/game_data/GameData.json")
      .then((response) => response.json())
      .then((games) => {
        if (games.length > 0) {
          for (let i in games) {
            const game = games[i];
            if (
              target ==
                game.enname.trim().toLowerCase().slice(0, target.length) ||
              (game.pername !== undefined &&
                target ==
                  game.pername.trim().toLowerCase().slice(0, target.length))
            ) {
              results.push(game);
            }
          }
          if (results.length > 0) {
            searchingprompt.textContent = `${results.length} مورد یافت شد`;
            for (let i in results) {
              const game = results[i];
              createbox(i, game);
            }
            addscrollewent();
          } else {
            searchingprompt.textContent = `موردی یافت نشد`;
          }
        } else {
          searchingprompt.textContent =
            "در حال حاضر بازی برای ارائه وجود ندارد";
        }
      });
  }
});

function createbox(i, game) {
  const container = document.createElement("div");
  container.id = `${game.enname}`.trim().replaceAll(" ", "_");
  container.classList.add("GameContainer");
  if (i % 2 == 0) {
    container.classList.add("right");
  } else {
    container.classList.add("left");
  }
  const img = document.createElement("img");
  img.setAttribute("src", `asset/${game.slide}/1.webp`);
  img.classList.add("tumbnail");
  const detailsspan = document.createElement("span");
  detailsspan.classList.add("detailscontainer");
  const Gamename = document.createElement("h3");
  if (game.pername === undefined) {
    Gamename.textContent = `${game.enname}`;
  } else {
    Gamename.textContent = `${game.pername}  _  ${game.enname}`;
  }
  Gamename.setAttribute("dir", "rtl");
  const hr = document.createElement("hr");
  const description = document.createElement("p");
  description.textContent = `${game.description.slice(0, 400)}`;
  description.setAttribute("dir", "rtl");
  const seemore = document.createElement("button");
  seemore.textContent = `ادامه مطلب و دانلود...`;
  seemore.setAttribute("dir", "rtl");
  seemore.setAttribute("onclick", `showgame("${game.enname}")`);

  detailsspan.append(Gamename);
  detailsspan.append(hr);
  detailsspan.append(description);
  detailsspan.append(seemore);

  container.append(detailsspan);
  container.append(img);

  MainMenu.append(container);
}

function clearMainMenu() {
  const boxs = document.querySelectorAll(".GameContainer");
  boxs.forEach((box) => {
    box.remove();
  });
}

function addscrollewent() {
  const aboutBoxes = document.querySelectorAll(".GameContainer");
  function checkFadeUp() {
    const mainMenuRect = MainMenu.getBoundingClientRect();
    aboutBoxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();
      const distanceFromBottom = window.innerHeight - boxRect.top - 100;
      if (
        distanceFromBottom >= -32 &&
        distanceFromBottom <= window.innerHeight
      ) {
        box.classList.add("fadein");
      }
    });
  }
  window.addEventListener("scroll", checkFadeUp);
  checkFadeUp();
}

function showgame(gameenname) {
  clearMainMenu();
  document.title = gameenname;

  fetch("https://toxicwixorg.github.io/NovelgamTeam/asset/game_data/GameData.json")
    .then((response) => response.json())
    .then((games) => {
      for (let i in games) {
        const game = games[i];
        if (game.enname === gameenname) {
          create_game_details_box(game, i);
        }
      }
    });
}

function create_game_details_box(game, i) {
  if (game.hasimgs == "no") {
    const HTML = `
    <section id="GameDetailsContainer">
      <h2>${game.enname}</h2>
      <br>
      <h4 class="Game_Description" dir="rtl">${game.description}</h4>
      <br>
      <hr>
      <br>
      <p class="Game_Details" dir="rtl">${
        game.pername ? game.pername : game.enname
      }<br><br>ترجمه شده توسط تیم نولجم<br>این بازی را همین الان میتوانید به راحتی دانلود و با زبان فارسی تجربه کنید
      </p>
      <br>
      <hr>
      <br>
      <div class="Game_T_Container">
        <img class="tak_image" src="./asset/${
          game.slide
        }/1.webp" alt="thumbnail">
      </div>
      <button onclick="download_game('${
        game.enname
      }')" class="download_btn">دانلود</button>
    </section>
    `;
    MainMenu.innerHTML = HTML;
  } else {
    const HTML = `
  <section id="GameDetailsContainer">
    <h2>${game.enname}</h2>
    <br>
    <h4 class="Game_Description" dir="rtl">${game.description}</h4>
    <br>
    <hr>
    <br>
    <p class="Game_Details" dir="rtl">${
      game.pername ? game.pername : game.enname
    }<br><br>ترجمه شده توسط تیم نولجم<br>این بازی را همین الان میتوانید به راحتی دانلود و با زبان فارسی تجربه کنید
    </p>
    <br>
    <hr>
    <br>
    <div class="Game_T_Container">
      ${
        game.T === "yes"
          ? '<input class="Dis_None" type="radio" name="GameGallery" id="T">'
          : ""
      }
      <input class="Dis_None" type="radio" name="GameGallery" id="S1" checked>
      <input class="Dis_None" type="radio" name="GameGallery" id="S2">
      <input class="Dis_None" type="radio" name="GameGallery" id="S3">
      <input class="Dis_None" type="radio" name="GameGallery" id="S4">
      <input class="Dis_None" type="radio" name="GameGallery" id="S5">
      <div class="Gallery_slides">
        ${
          game.T === "yes"
            ? `<label for="T"><video class="Slide" src="./asset/${game.slide}/T.mp4" alt="trailer" controls></label>`
            : ""
        }
        <label for="S1">
          <img class="Slide" src="./asset/${game.slide}/1.webp" alt="thumbnail">
        </label>
        <label for="S2">
          <img class="Slide" src="./asset/${game.slide}/2.webp" alt="thumbnail">
        </label>
        <label for="S3">
          <img class="Slide" src="./asset/${game.slide}/3.webp" alt="thumbnail">
        </label>
        <label for="S4">
          <img class="Slide" src="./asset/${game.slide}/4.webp" alt="thumbnail">
        </label>
        <label for="S5">
          <img class="Slide" src="./asset/${game.slide}/5.webp" alt="thumbnail">
        </label>
      </div>
      <div class="dots">
        ${
          game.T === "yes"
            ? '<label for="T" style="background-image: url(./asset/TW.webp);"></label>'
            : ""
        }
        <label for="S1" style="background-image: url(./asset/${
          game.slide
        }/1.webp);"></label>
        <label for="S2" style="background-image: url(./asset/${
          game.slide
        }/2.webp);"></label>
        <label for="S3" style="background-image: url(./asset/${
          game.slide
        }/3.webp);"></label>
        <label for="S4" style="background-image: url(./asset/${
          game.slide
        }/4.webp);"></label>
        <label for="S5" style="background-image: url(./asset/${
          game.slide
        }/5.webp);"></label>
      </div>

    </div>
    <button onclick="download_game('${
      game.enname
    }')" class="download_btn">دانلود</button>
  </section>

`;
    MainMenu.innerHTML = HTML;
  }
}

function download_game(name) {
  text = `واقعا توقع داری از یه همچین سایتی که فقط ظاهر داره ${name} دانلود کنی؟ این سایت فقط یه نمونس اصلی از این  صد برابر بهتره و امنیت داره `;

  window.alert(text);
}



