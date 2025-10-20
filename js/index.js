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

// ======================= Message Form ==========================

//Helper function to toggle messages section visability 
function toggleMessagesSection(){
    const messageSection = document.getElementById("Messages");
    const messageList = messageSection.querySelector("ul");
    if(messageList.children.length === 0){
        messageSection.style.display = "none";
    } else {
        messageSection.style.display = "block";
    }
}
// Initially hiding the messages section 
toggleMessagesSection();

//Selecting the leave message form by name 
const messageForm = document.querySelector("form[name=leave_messages]");

//Adding event listener to the messageForm to handle "submit" button 
messageForm.addEventListener("submit", function(event){
    
    //Prevent the page refresh 
    event.preventDefault();

    //Retrieve form field values 
    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    //Logging field values to log 
    console.log("Name: ", userName);
    console.log("Email: ", userEmail);
    console.log("Message: ", userMessage);

    //Select the #Messages section
    const messageSection = document.getElementById("Messages")

    //Select the <ul> inside the #Messages section 
    const messageList = messageSection.querySelector("ul");

    //Create a new list item 
    const newMessage = document.createElement("li");

    //Set the inner html 
    newMessage.innerHTML = `<a href="mailto: ${userEmail}">${userName}</a>: <span>${userMessage}</span>`

    //Creating an edit button 
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.className = "edit-btn";
    editButton.type = "button";

    //Addiing click event listener to edit the message 
    editButton.addEventListener("click", function(){

        //Finding the message portion 
        const messageSpan = newMessage.querySelector("span");

        //Prompt the user for a new message 
        const newText = prompt("Edit your message: ", messageSpan.innerText);

        //Update the message 
        if (newText !== null) {
            messageSapn.innerText = newText;
        }
    });

    //Appending the edit button to new message 
    newMessage.appendChild(editButton);

    //Creating a remove button 
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.className = "remove-btn";
    removeButton.type = "button";

    //Adding click event listener for the remove button to remove the message
    removeButton.addEventListener("click", function(){

        //Finding the <li>
        const entry = removeButton.parentNode;

        //Remove it 
        entry.remove();

        //Toggle if there's no more messages 
        toggleMessagesSection();
    })

    //Appending the remove button to the new message 
    newMessage.appendChild(removeButton);

    //Appending the new message to the message list 
    messageList.appendChild(newMessage);
    
    //Toggle if exists a new message
    toggleMessagesSection();

    //Clear form after submission 
    messageForm.reset();

});

// ================ Project Section ===============

//Fetching my GitHub repositories 
fetch("https://api.github.com/users/daliapoblano/repos")
    .then((response) => {
        //error fetching data
        if(!response.ok){
            //throw an error message
            throw new Error("Failed to fetch data from GitHub. Please try again later");
        }

        //return the response 
        return response.json();
    })
    .then((repositories) => {
        //repositories = JSON.parse(this.respositories);
        console.log("Repositories: ", repositories);
        //get project section
        const projectSection = document.getElementById("Projects");
        //selecting the list within the Projects section
        const projectList = projectSection.querySelector("ul");
        //clear the content just in case 
        projectList.innerHTML = " ";
        //iterate through all the public repositories
        for(let i = 0; i < repositories.length;i++){
            //create a new list item 
            const project = document.createElement("li");
            //create a link for the list item 
            const link = document.createElement("a");
            //set the link url
            link.href = repositories[i].html_url;
            //set the text for the link 
            link.textContent = repositories[i].name;
            //append the link to the list item
            project.appendChild(link);
            //append the list item to the list of projects
            projectList.appendChild(project);
        }
    })

    .catch((error) => {
        //logging the error
        console.error("Error fetching repos:", error);
        //get project section 
        const projectSection = document.getElementById("Projects");
        //add an error message on the user interface 
        const errorMessage = document.createElement("p");
        errorMessage.innerHTML = 'Unable to load projects. Please try again later.';
        projectSection.appendChild(errorMessage);
    });


