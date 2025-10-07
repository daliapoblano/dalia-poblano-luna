//Getting the body element 
const body = document.body;

//Adding and creating the Footer 
let footer = document.createElement("footer");
//Appending the footer to the body 
body.appendChild(footer);

//Creating a data object 
const today = new Date();

//Getting current year 
const thisYear = today.getFullYear();

//Getting the current footer element 
footer = document.querySelector("footer");

//Creating a new paragraph element 
const copyright = document.createElement("p");

//Set the inner HTML with copyright symbol, my name, and the year 
copyright.innerHTML = `\u00A9 Dalia Poblano ${thisYear}`

//Appending <p> to the footer and centering the footer  
footer.appendChild(copyright);
footer.style.textAlign = "center";

// ------------ Skills --------------
const skills = ["JavaScript", "HTML", "CSS", "GitHub", "Python", "C++", "Figma"];

//Selecting the Skills section by ID
const skillsSelection = document.getElementById("Skills");

//Selecting the empty <ul> inside the skills section 
const skillsList = skillsSelection.querySelector("ul");

// For loop that iterates through the skills array 
for(let i=0; i < skills.length; i++)
{
    //creating a new <li> element
    const skill = document.createElement("li")
    //set the text of each <li> to the current skill
    skill.innerText = skills[i];
    //append the <li> to the skills list 
    skillsList.appendChild(skill);
}
