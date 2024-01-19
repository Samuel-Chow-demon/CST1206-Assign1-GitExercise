
const arrTabButtons = document.querySelectorAll(".tab-button");
const arrSectionContents = document.querySelectorAll(".tab-content");
for (let tabButton of arrTabButtons)
{
  tabButton.addEventListener('click', (event)=>{

    const tabSectionId = event.target.getAttribute("tab-data");

    // Hide all section first
    arrSectionContents.forEach(section =>{
      section.classList.add("hidden");
    });

    // Cancel the Active color from the Nav button
    arrTabButtons.forEach(tab =>{
      tab.classList.remove("active");
    });

    // Display the Tab button related Section Content
    document.getElementById(tabSectionId).classList.remove("hidden");
    // The current pressed button set to active color
    event.target.classList.add("active");
  });
}
