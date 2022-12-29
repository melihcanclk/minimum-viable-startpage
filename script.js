const NAME = "Melihcan";
const WELCOME_MESSAGE_TEMPLATE = ["Geceler", "Sabahlar", "Günler", "Akşamlar"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format.
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = "tab";

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
let MASTER_MAP = [
  {
    groupName: "Sosyal Medya",
    items: [
      {
        name: "Youtube",
        color: "#FF0000",
        shortcutKey: "y",
        url: "https://www.youtube.com",
      },
      {
        name: "Twitch",
        shortcutKey: "t",
        color: "#6441A5",
        url: "https://www.twitch.tv/",
      },
      {
        name: "Twitter",
        shortcutKey: "e",
        color: "#1DA1F2",
        url: "https://twitter.com/",
      },
      {
        name: "Instagram",
        shortcutKey: "i",
        color:
          "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);",
        url: "https://twitter.com/",
      },
      {
        name: "Linkedin",
        shortcutKey: "l",
        color: "#0077B5",
        url: "https://www.linkedin.com/",
      },
      {
        name: "Whatsapp",
        shortcutKey: "w",
        color: "#25D366",
        url: "https://web.whatsapp.com/",
      },
    ],
  },
  {
    groupName: "İş",
    items: [
      {
        name: "Medium",
        shortcutKey: "m",
        color: "white",
        url: "https://medium.com/",
      },
      {
        name: "Slack",
        shortcutKey: "l",
        color: "#4A154B",
        url: "https://app.slack.com/client/T0130E85VR6/C045UBQA1SA",
      },
      {
        name: "GitLab",
        shortcutKey: "g",
        color: "#FCA121",
        url: "https://gitlab.com/",
      },
      {
        name: "Github",
        shortcutKey: "h",
        color: "#24292e",
        url: "https://github.com/",
      },
    ],
  },
  {
    groupName: "Kişisel",
    items: [
      {
        name: "ICloud",
        shortcutKey: "c",
        color: "grey",
        url: "https://beta.icloud.com/",
      },
      {
        name: "Sahibinden",
        shortcutKey: "s",
        color: "#FF0",
        url: "https://www.sahibinden.com/",
      },

    ],
  },
];

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage() {
  let curHours = new Date().getHours();
  curHours = Math.floor(curHours / 6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
  if (curHours == 4) curHours = 3;
  let welcome = "İyi " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
  document.getElementById("welcome-string").innerHTML = welcome;
}


// this function make google search and bring first link of the first logo of the first result
// async function searchGoogle() {
//   for (let i = 0; i < MASTER_MAP.length; i++) {
//     let curGroupData = MASTER_MAP[i];
//     for (let j = 0; j < curGroupData.items.length; j++) {
//       fetch("https://www.googleapis.com/books/v1/volumes?q=" + curGroupData.items[j].name)
//         .then(function (res) {
//           return res.json();
//         })
//         .then(function (result) {
//           //get the DOM element named 'text-' + i + '-' + j and set thumbnail to it
//           MASTER_MAP[i].items[j].logo = result.items[0].volumeInfo.imageLinks.smallThumbnail;
//         }),
//         function (error) {
//           console.log(error);
//         };

//     }

//   }
// }

function setupGroups() {
  for (let i = 0; i < MASTER_MAP.length; i++) {
    let curGroupData = MASTER_MAP[i];

    let group = document.createElement("div");
    group.className = "group";
    $container.appendChild(group);

    let header = document.createElement("h1");
    header.innerHTML = curGroupData.groupName;
    group.appendChild(header);

    for (let j = 0; j < curGroupData.items.length; j++) {
      let curItemData = curGroupData.items[j];

      let pContainer = document.createElement("a");
      pContainer.style.color = curItemData.color;
      pContainer.className = "item";
      pContainer.setAttribute("href", curItemData.url);
      pContainer.target = "_blank";
      group.appendChild(pContainer);

      let logo = document.createElement("img");
      //logo.src = MASTER_MAP[i].items[j].logo;
      logo.className = "logo";
      pContainer.appendChild(logo);

      let text = document.createElement("p");
      text.innerHTML = curItemData.name;
      text.id = "text-" + i + '-' + j;
      pContainer.appendChild(text);

      let shortcutDisplay = document.createElement("span");
      shortcutDisplay.innerHTML = curItemData.shortcutKey;
      shortcutDisplay.className = "shortcut";
      shortcutDisplay.style.animation = "none";
      pContainer.appendChild(shortcutDisplay);

      getUrl[curItemData.shortcutKey] = curItemData.url;
    }
  }
}

function shortcutListener(e) {
  let key = e.key.toLowerCase();

  if (listeningForShortcut && getUrl.hasOwnProperty(key)) {
    window.location = getUrl[key];
  }

  if (key === SHORTCUT_STARTER) {
    clearTimeout(listenerTimeout);
    listeningForShortcut = true;

    // Animation reset
    for (let i = 0; i < $shortcutDisplayList.length; i++) {
      $shortcutDisplayList[i].style.animation = "none";
      setTimeout(function () {
        $shortcutDisplayList[i].style.animation = "";
      }, 10);
    }

    listenerTimeout = setTimeout(function () {
      listeningForShortcut = false;
    }, SHORTCUT_TIMEOUT);
  }
}

function main() {
  setupWelcomeMessage();
  //searchGoogle();
  setupGroups();
  document.addEventListener("keyup", shortcutListener, false);
}

main();
