const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskDueDate = document.getElementById('task-due-date');
const taskCategory = document.getElementById('task-category');
const taskList = document.getElementById('task-list');

const tasks = JSON.parse(localStorage.getItem("tasks"))||[];

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = {
    title: taskTitle.value,
    description: taskDescription.value,
    dueDate: taskDueDate.value,
    category: taskCategory.value,
    completed: false
  };
  tasks.push(newTask);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  renderTaskList();
  taskForm.reset();
});

function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate}</p>
      <p> ${task.category}</p>
      <button onclick="markAsCompleted(${index})">Completed</button>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

function markAsCompleted(index) {
  tasks[index].completed = true;
  let taskitems=document.querySelectorAll(".task-item");
  taskitems[index].classList.add("completed");
  taskitems.classList.add('completed');
  renderTaskList();
}

function editTask(index) {
  const taskToEdit = tasks[index];
  taskTitle.value = taskToEdit.title;
  taskDescription.value = taskToEdit.description;
  taskDueDate.value = taskToEdit.dueDate;
  taskCategory.value = taskToEdit.category;
  tasks.splice(index, 1);
  renderTaskList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  renderTaskList();
}

renderTaskList();


const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("keyup", function() {
  const searchText=searchInput.value.toLowerCase();
  
  const filtertasks=tasks.filter(function(item){
    return item.title.toLowerCase().includes(searchText);
  });
  
  const result=document.getElementById("resultList");
  resultList.innerHTML= "";
  filtertasks.forEach(function(item){
    const li=document.createElement("li");
    li.textContent=item.title;
    resultList.appendChild(li);
  });
  
});

