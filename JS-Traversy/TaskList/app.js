//Define UI vars    

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all eventlisteners
loadEventListeners();

function loadEventListeners() {
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove Task Event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    
    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);

    //DOM content loaded
    document.addEventListener('DOMContentLoaded', getTasks);
}

//Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }

    //Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create a new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //Add icon HTML
    link.innerHTML = '<i class="fas fa-minus-square"></i>';
    //Apped the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';
    console.log(li);

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        console.log(tasks);
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target);
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
        if(localStorage.getItem('tasks') ===  null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task, index){
            if(taskItem.textContent === task){
                task.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(taskItem);
}

//Clear tasks
function clearTasks() {
    //one way
    // taskList.innerHTML = '';

    //or do with while loop - faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

//Clear tasks form local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

    console.log(text);

    e.preventDefault();
    }


    //Get Tasks form LS
    function getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') ===  null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(tasks){
            //Create li element
            const li = document.createElement('li');
            li.className = 'collection-item';

            //Create text node and append to the li
            li.appendChild(document.createTextNode(taskInput.value));

            //Create a new link element
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            //Add icon HTML
            link.innerHTML = '<i class="fas fa-minus-square"></i>';
            //Apped the link to li
            li.appendChild(link);

            //Append li to ul
            taskList.appendChild(li);
        });


    
    }
