// Baby Names Data (Top 50 Boy/Girl 2022)
// Baby Center (babycenter.com)
// https://www.babycenter.com/baby-names/most-popular/top-baby-names#popularNameList

// Variables for html elements
let goBtn = document.getElementById("go-btn");
let menuSelect = document.getElementById("menu-select");
let container = document.getElementById("container");
let nameCountSpan = document.getElementById("name-count");
let number = document.getElementById("name-number");
// Initialize Array of Character Objects from json file
let babyData = [];
fetch("baby-names-data.json")
  .then((res) => res.json())
  .then((data) => (babyData = data));

// Event Listener on Go Button
goBtn.addEventListener("click", goBtnClicked);

// Process Go Button Click
function goBtnClicked() {
  // Get Menu Selection
  let selection = menuSelect.value;

  // Process Menu Selection
  if (selection === "display-all") {
    displayAll();
  } else if (selection === "gender") {
    searchGender();
  } else if (selection === "rank") {
    searchRank();
  } else if (selection === "starting-letter") {
    searchStartingLetter();
  } else if (selection === "length") {
    searchLength();
  }
}

// Display All Baby Names
function displayAll() {
  let allnameStr = "";
  for (let i = 0; i < babyData.length; i++) {
    allnameStr += nameHTML(babyData[i]);
    nameCountSpan.innerHTML = allnameStr;
    number.innerHTML = i;
    console.log("Display All");
    // Confirm data load
    console.log(babyData);
  }
}

// Display Names by Gender
function searchGender() {
  count = 0;
  genderprompt = prompt("Please enter gender(Boy/Girl)");
  let genderStr = "";
  for (let i = 0; i < babyData.length; i++) {
    if (babyData[i].gender === genderprompt) {
      count++;
      genderStr += nameHTML(babyData[i]);
    }
    number.innerHTML = count;
  }
  container.innerHTML = genderStr;
  console.log("Search By Gender");
}

// Display Names within a Range of Ranks
function searchRank() {
  let RankStr = "";
  count = 0;
  minprompt = prompt("Please enter minimum rank");
  maxprompt = prompt("PLease enter maximum rank");
  for (let i = 0; i < babyData.length; i++) {
    ranks = babyData[i].rank;
    if (ranks <= maxprompt && ranks >= minprompt) {
      count++;
      RankStr += nameHTML(babyData[i]);
    }
    number.innerHTML = count;
  }
  container.innerHTML = RankStr;
  console.log("Search By Rank");
}

// Display Names with Starting Letter
function searchStartingLetter() {
  count = 0;
  let htmlStr = "";
  typeprompt = prompt("Please enter starting letter");
  for (let i = 0; i < babyData.length; i++) {
    Names = babyData[i].name;
    if (Names[0] === typeprompt) {
      count++;
      htmlStr += nameHTML(babyData[i]);
    }
    number.innerHTML = count;
  }
  container.innerHTML = htmlStr;
  console.log("Search by Starting Letter");
}

// Display Names with a Specific Length
function searchLength() {
  count = 0;
  let searchlengthStr = "";
  nameprompt = prompt("Please enter name length");
  for (let i = 0; i < babyData.length; i++) {
    namelength = babyData[i].name.length;
    if (namelength == nameprompt) {
      count++;
      searchlengthStr += nameHTML(babyData[i]);
    }
    number.innerHTML = count;
  }
  container.innerHTML = searchlengthStr;
  console.log("Search by Name Length");
}

function nameHTML(x) {
  return `
<div>
  <p>
  <strong>${x.name}</strong> (Gender:${x.gender}, Rank:${x.rank})
  </p>
</div>`;
}
