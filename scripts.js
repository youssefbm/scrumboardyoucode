/* 
    In this file you can find all CRUD functions to manipulate Tasks.
    The variable tasks is an array of objects to store tasks values,
    this is a global variable declared and defined in the data.js file.
*/
let updateTaskButton = document.getElementById("task-update-btn");

function createTask()
{
    //Initalize Task Form
    initTaskForm();
    //Show Save Button
    document.getElementById('task-save-btn').style.display = 'block';
    //Open Modal Form
    $("#modal-task").modal("show");
}

function saveTask()
{
    //Get Task Attributes From Inputs
    let title           = document.getElementById('task-title').value;
    let type            = document.querySelector('input[name="task-type"]:checked').value;
    let priority        = document.getElementById('task-priority').value;
    let status          = document.getElementById('task-status').value;
    let date            = document.getElementById('task-date').value;
    let description     = document.getElementById('task-description').value;
    //Create Task Object
    let task = {
        'title'         :   title,
        'type'          :   type,
        'priority'      :   priority,
        'status'        :   status,
        'date'          :   date,
        'description'   :   description,
    }
    //Add Object To Array
    tasks.push(task);
    //Close Modal Form
    $("#modal-task").modal("hide");
    //Refresh Tasks
    reloadTasks();
    
}

function editTask(index)
{
    //Initialize Task Form
    initTaskForm();
    //Show Update & Delete Button
    document.getElementById('task-update-btn').style.display = 'block';
    document.getElementById('task-delete-btn').style.display = 'block';
    //Set Index In Hidden Input To Use It In Update And Delete
    document.getElementById('task-index').value = index;
    //Set Form Inputs
    document.getElementById('task-title').value                                     = tasks[index].title;
    document.getElementById("task-type-"+tasks[index].type.toLowerCase()).checked   = true;
    document.getElementById('task-priority').value                                  = tasks[index].priority;
    document.getElementById('task-status').value                                    = tasks[index].status;
    document.getElementById('task-date').value                                      = tasks[index].date;
    document.getElementById('task-description').value                               = tasks[index].description;
    //Open Modal Form
    $("#modal-task").modal("show");
}

updateTaskButton.addEventListener("click",() => {
    //Get Task Attributes From Inputs
    let index = document.getElementById('task-index').value;
    console.log(index);
    let title           = document.getElementById('task-title').value;
    let type            = document.querySelector('input[name="task-type"]:checked').value;
    let priority        = document.getElementById('task-priority').value;
    let status          = document.getElementById('task-status').value;
    let date            = document.getElementById('task-date').value;
    let description     = document.getElementById('task-description').value;
    //Create Task Object
    let task = {
        'title'         :   title,
        'type'          :   type,
        'priority'      :   priority,
        'status'        :   status,
        'date'          :   date,
        'description'   :   description,
    }
    //Replace The Old Task with the New One Using Index
    tasks[index] = task;
    //Close Modal Form
    $("#modal-task").modal("hide");
    //Refresh Tasks
    reloadTasks();
})

function deleteTask()
{
    //Get Index of Task In The Array
    let index = document.getElementById('task-index').value;
    //Remove Task From Array By Index Using Splice Function
    tasks.splice(index, 1);
    //Close Modal Form
    $("#modal-task").modal("hide");
    //Refresh Tasks
    reloadTasks();
}

function initTaskForm()
{
    //Clear Task Form From Data
    document.getElementById("form-task").reset();
    //Hide All Action Buttons
    for (let btn of document.querySelectorAll('.task-action-btn')) btn.style.display = 'none';
}

function reloadTasks()
{
    document.getElementById('to-do-tasks').innerHTML        = '';
    document.getElementById('in-progress-tasks').innerHTML  = '';
    document.getElementById('done-tasks').innerHTML         = '';
    let short_description;
    let task_id = 1;
    let current_task_selector;
    let current_task_icon;
    let toDo_tasks_counter          = 0;
    let inProgress_tasks_counter    = 0;
    let done_tasks_counter          = 0;

    for (let index = 0; index < tasks.length; index++)
    {
        switch (tasks[index].status) {
            case 'To Do':
            {
                current_task_selector   = 'to-do-tasks';
                current_task_icon       = 'far fa-question-circle';
                toDo_tasks_counter++;
            }       
            break;
            case 'In Progress':
            {
                current_task_selector   = 'in-progress-tasks';
                current_task_icon       = 'fas fa-circle-notch fa-spin';
                inProgress_tasks_counter++;
            }
            break;
            case 'Done':
            {
                current_task_selector   = 'done-tasks';
                current_task_icon       = 'far fa-circle-check';
                done_tasks_counter++;
            }
            break;
            default:
                break;
        }
        short_description = (tasks[index].description.length > 55) ? tasks[index].description.substring(0, 55)+'...' : tasks[index].description;
        document.getElementById(current_task_selector).innerHTML += `
            <button onclick="editTask(`+index+`)" class="list-group-item list-group-item-action d-flex">
                <div class="me-3 fs-16px">
                    <i class="`+current_task_icon+` text-green fa-fw"></i> 
                </div>
                <div class="flex-fill">
                    <div class="fs-14px lh-12 mb-2px fw-bold text-dark">`+tasks[index].title+`</div>
                    <div class="mb-1 fs-12px">
                        <div class="text-gray-600 flex-1">#`+task_id+' created in '+tasks[index].date+`</div>
                        <div class="text-gray-900 flex-1" title="`+tasks[index].description+`">`+short_description+`</div>
                    </div>
                    <div class="mb-1">
                        <span class="badge bg-primary">`+tasks[index].priority+`</span>
                        <span class="badge bg-gray-300 text-gray-900">`+tasks[index].type+`</span>
                    </div>
                </div>
            </button>
        `;
        task_id++;
    }
    document.getElementById('to-do-tasks-count').innerText        = toDo_tasks_counter;
    document.getElementById('in-progress-tasks-count').innerText  = inProgress_tasks_counter;
    document.getElementById('done-tasks-count').innerText         = done_tasks_counter;
}g