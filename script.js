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

/* Opening and closing the modal */

openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
  });

closeTaskFormBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal()
   });

cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
  });

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close()
    taskForm.classList.toggle("hidden")
  });

  /* Get the values from the input fields; save them into the taskData array, and display them on the page. */
  
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const dataArrIndex = taskData.findIndex((item)  => 
      item.id === currentTask.id); 
     const taskObj = {
     id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`
     };
     if (dataArrIndex === -1) {
      taskData.unshift(taskObj);
    };     
   });