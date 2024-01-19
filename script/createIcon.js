const gszStarColor = "#f3d877";


const arrAll5Stars = new Array(5).fill(1);


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


// Creat Section - News Star Rating
createStarSeries(arrAll5Stars, "section-news-star");

