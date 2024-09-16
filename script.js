/* Access html element & declare variables */
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer= document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

/*  
Create an array that will
store all the tasks along with their associated data,
including title, due date, and description.
*/

const taskData = [];
let currentTask = {};

const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

   if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML =  "" ;
  taskData.forEach(
     ({ id, title, date, description }) => {
         tasksContainer.innerHTML += `
         <div class="task" id="${id}">
           <p><strong>Title:</strong> ${title}</p>
           <p><strong>Date:</strong> ${date}</p>
           <p><strong>Description:</strong> ${description}</p>
           <button onclick ="editTask(this)" type="button" class="btn">Edit</button>
           <button onclick ="deleteTask(this)" type="button" class="btn">Delete</button>
         </div>
       `
     }
   ); 
 };

 const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex((item) => 
    item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
 };

 const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id);
    currentTask = taskData[dataArrIndex];
    currentTask.value = taskData[dataArrIndex];
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description; 

    addOrUpdateTaskBtn.innerText = "Update Task";
    taskForm.classList.toggle("hidden"); 
 };


/* Create a function that handles clearing the input fields. */

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value ="";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

/* Opening and closing the modal */

openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
  });

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value ||
   dateInput.value || descriptionInput.value !== "";

   const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

   if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
    } else {
      reset();
    }; 
   });

cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
  });

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close()
    reset();
  });

  /* Get the values from the input fields; save them into the taskData array, and display them on the page. */
  
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    addOrUpdateTask();
    
   });

   const myTaskArr = [
    { task: "Walk the Dog", date: "22-04-2022" },
    { task: "Read some books", date: "02-11-2023" },
    { task: "Watch football", date: "10-08-2021" },
  ];
  
  localStorage.setItem("data", myTaskArr);

   