const root = document.documentElement;
const colorQuestionBkgd = window.getComputedStyle(root).getPropertyValue("--question-background-color");

const arrTabButtons = document.querySelectorAll(".tab-button");
const arrSectionContents = document.querySelectorAll(".tab-content");
const arrFAQQuestions = document.querySelectorAll(".faq-question");

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

for (let question of arrFAQQuestions)
{
  question.addEventListener("click", (event)=>{
    // Since the last had a icon, need to get back the li item object
    const currentListItem = event.target.closest("li");
    const answer = currentListItem.nextElementSibling;

    if (answer.classList.contains("faq-answer-expand"))
    {
      answer.classList.remove("faq-answer-expand");
    }
    else
    {
      answer.classList.add("faq-answer-expand");
    }
  });

  question.addEventListener("mouseover", (event)=>{
    const currentListItem = event.target.closest("li");
    currentListItem.style.background = "#e2b68d";
  })

  question.addEventListener("mouseout", (event)=>{
    const currentListItem = event.target.closest("li");
    currentListItem.style.background = colorQuestionBkgd;
  })
}