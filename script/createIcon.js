const gszStarColor = "#f3d877";

const infoDivIDName = "info-div-id";
const pinIconOffsetratio = 0.2;
const pinIconOffsetVert = 25;

const gszPinIconColor = "#ed12a8";
const gszPinIconHoverColor = "#7e155d";
const gszPinInconSize = "7vw";

const gszPinInfoDivW = "30%";
const gszPinInfoDivH = "25%";
const gszPinInfoDivSize = "4vw";
const gszPinInfoRateTextSize = "2.5vw";

const gszOtherIconSize = "5vw";
const gszOtherIconHoverColor = "#3b3f4e";

const arrAll5Stars = new Array(5).fill(1);

// const root = document.documentElement;
// const mFontSize = window.getComputedStyle(root).getPropertyValue("--m-font-size");
// const subHeadFontSize = window.getComputedStyle(root).getPropertyValue("--sub-header-font-size");

function create5StarRateArr(numRate){
  arrStarRate = [...arrAll5Stars];
  for (let i = 0; i < (arrStarRate.length - numRate); i++)
  {
    arrStarRate[arrStarRate.length - (i + 1)] = 0;
  }
  return arrStarRate;
}

function createStar(bIsSolidStar = true, fontSize = "") {
  const icon = document.createElement("i");
  icon.className = bIsSolidStar ? "fa-solid fa-star" : "fa-regular fa-star";
  if (fontSize)
  {
    icon.style.fontSize = fontSize;
  }
  icon.style.color = gszStarColor;
  return icon;
}

// Enter List of Star [1] means solid, [0] means empty
// e.g. [1,1,1,0,0] means three solid then two empty stars
function createStarSeries(arrStar, toElementId, fontSize = "") {
  const iconList = document.getElementById(toElementId);

  for (let i of arrStar)
  {
    // i - 1 is true, 0 is false
    iconList.appendChild(createStar(i ? true : false, fontSize))
  }
}

function createStarSeriesToObj(arrStar, toElementObj, fontSize) {

  for (let i of arrStar)
  {
    toElementObj.appendChild(createStar(i ? true : false, fontSize))
  }
}

// Function to create info div
function createMapInfoDiv(iconObj, mapLocationDescription, ratePopular = -1, bDispLeft = false) {
  let infoDiv = document.createElement('div');
  // All belong to "info-div" class
  infoDiv.classList.add('info-div'); 
  infoDiv.id = infoDivIDName;
  infoDiv.textContent = mapLocationDescription;
  infoDiv.style.textAlign = "center";
  infoDiv.style.width = gszPinInfoDivW;
  infoDiv.style.height = gszPinInfoDivH;
  infoDiv.style.fontSize = gszPinInfoDivSize;
  infoDiv.style.position = 'absolute';

  const currentViewPortWidth = window.innerWidth;
  const offsetHorizon = (currentViewPortWidth * pinIconOffsetratio) * (bDispLeft ? -1.4 : 0.25);
  infoDiv.style.top = iconObj.offsetTop + pinIconOffsetVert + 'px';
  infoDiv.style.left = iconObj.offsetLeft + offsetHorizon + 'px';

  infoDiv.style.backgroundColor = 'rgba(250, 250, 250, 0.9)';
  infoDiv.style.padding = "5px";
  infoDiv.style.border = '1px solid #000';
  infoDiv.style.borderRadius = '6px';
  // Set z-index to make sure it's above the map
  infoDiv.style.zIndex = '999';

  if (ratePopular >= 0)
  {
    let textPopular = document.createElement('span');
    textPopular.textContent = "Rating :";
    textPopular.style.textAlign = "left";
    textPopular.style.fontSize = gszPinInfoRateTextSize;
    textPopular.style.display = "block";
    textPopular.style.margin = "2px";
    infoDiv.appendChild(textPopular);
    createStarSeriesToObj(create5StarRateArr(ratePopular), infoDiv, "3vw");
  }

  return infoDiv;
}

function createIconToObj(toElementId, strIconClassName, posFromTopPercent, posFromLeftPercent,
                        fontSize, color, hoverColor, infoDescription, ratePopular, bDispLeft) {
  const icon = document.createElement("i");
  icon.className = strIconClassName;
  icon.style.fontSize = fontSize;
  icon.style.color = color;

  icon.style.position = 'absolute';
  icon.style.top = posFromTopPercent;
  icon.style.left = posFromLeftPercent;

  const Obj = document.getElementById(toElementId);
  Obj.appendChild(icon);

  icon.addEventListener('mouseover', ()=>{
    const infoDiv = createMapInfoDiv(icon, infoDescription, ratePopular, bDispLeft);
    icon.style.color = hoverColor;
    Obj.appendChild(infoDiv);
  });
  
  icon.addEventListener('mouseout', ()=>{
    const infoDiv = Obj.querySelector('.info-div');
    if (infoDiv) {
      icon.style.color = color;
      Obj.removeChild(infoDiv);
    }
  });
}

function createLocationPin(mapId, posFromTopPercent, posFromLeftPercent, infoDescription, ratePopular, bDispLeft = false){

  createIconToObj(mapId, "fa-solid fa-location-dot", posFromTopPercent, posFromLeftPercent,
                  gszPinInconSize, gszPinIconColor, gszPinIconHoverColor, infoDescription, ratePopular, bDispLeft);
}


// Creat Section - News Star Rating
createStarSeries(arrAll5Stars, "section-news-star");

// Create Map Location Pin of Each Place
createLocationPin("map-container", "45%", "60%", "Big Wheel", 4);
createLocationPin("map-container", "10%", "40%", "Twist Coaster", 5);
createLocationPin("map-container", "25%", "10%", "Go Kart", 5);
createLocationPin("map-container", "5%", "90%", "Magic Show", 2, true);
createLocationPin("map-container", "45%", "5%", "Merry-Round", 3);
createLocationPin("map-container", "6%", "65%", "Dragon-Boat", 3, true);

// Create Map Location Other Icon
createIconToObj("map-container", "fa-solid fa-circle-info", "65%", "80%",
                gszOtherIconSize, "#d73c4c", gszOtherIconHoverColor, "Information Center, Locker", -1, true); // red - info
createIconToObj("map-container", "fa-solid fa-utensils", "5%", "15%",
                gszOtherIconSize, "#f39b20", gszOtherIconHoverColor, "Food, Drinks, Burger, Ices", -1); // yellow - food
createIconToObj("map-container", "fa-solid fa-gift", "63%", "22%",
                gszOtherIconSize, "#6c1494", gszOtherIconHoverColor, "Gifts, Toys, Souvenirs", -1); // purple - gift
