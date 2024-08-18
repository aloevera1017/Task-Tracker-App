// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array calle
// TODO: Call the render function to update the table with the new tasks.

// Section 2: App State Variables
let tasks = [];

const taskForm = document.getElementById("taskForm")
const taskTable = document.getElementById("taskTable")



console.log(taskForm)
console.log(taskTable)

function loadData() {
  // use JSON parse if you saved a JSON string 
  // we turned the localStorage string into a JS object
  tasks = JSON.parse(localStorage.getItem("savedTasks"))
  console.log(tasks)

  let taskTableHTML = tasks.map((task, index) => `
      <tr>
          <td>${task.name}</td>
          <td>${task.description}</td>
          <td>${task.deadline}</td>
          <td><button id="completed" onclick="markTaskComplete(${index})">Complete</button></td>
          <td><button id="removed" onclick="removeTask(${index})">Remove</button></td>
      </tr>
    `).join('');

  console.log(taskTableHTML)

  let myTasks = document.getElementById("taskTable")
  myTasks.innerHTML = taskTableHTML
}

// Function to handle form submissions
function handleSubmission(event) {
  event.preventDefault(); // this function stops our form from reloading the page
  // TODO: Get form input values
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const taskDeadline = document.getElementById("taskDeadline").value;

  // TODO: Validate input fields
  if (taskName == "" || taskDeadline == "") {
    alert('Task name and deadline are required!')
  }

  // TODO: Update the tasks array
  tasks.push({ name: taskName, description: taskDescription, deadline: taskDeadline })

  render();

  // save the list of tasks to local storage
  localStorage.setItem('savedTasks', JSON.stringify(tasks));

  // we have to use JSON.stringify for anything that's not a string i.e. Arrays, or Objects
}



// Function to render tasks in the table
function render() {
  // TODO: Use array methods to create a new table row of data for each item in the arr
  taskTable.innerHTML = tasks.map((task, index) => `
    <tr>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.deadline}</td>
        <td><button id="completed" onclick="markTaskComplete(${index})">Complete</button></td>
        <td><button id="removed" onclick="removeTask(${index})">Remove</button></td>
    </tr>
  `).join('');
}


function markTaskComplete(index) {
  console.log(index)
  // taskTable.rows[taskTable.rowIndex].cells.item[4].innerHTML = ''
  var button1 = document.getElementById("completed")
  var button2 = document.getElementById("removed")
  // button1.parentNode.removeChild(button1);
  // button2.parentNode.removeChild(button2);
  button1.addEventListener('click', function() {
    this.remove();
  });
  button2.addEventListener('click', function() {
    this.remove();
  });
  console.log(taskTable.rows[index].cells[3].innerHTML)
  taskTable.rows[index].cells[3].innerHTML = "Completed! ✅";
  taskTable.rows[index].cells[4].innerHTML = "";
}

function removeTask(index) {
  taskTable.deleteRow(index)
}

// Function to initialize the table
function init() {
  taskTable.innerHTML = ''; // Clear the table
  tasks = []; // Reset the tasks array
  render(); // Call the render function
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();

// Call the loadData function to load tasks from local storage
loadData()