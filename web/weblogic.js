let column = 0;
let dragedtaskid = "";
loadPage();

async function loadPage() {
    document.getElementById("tasks").innerHTML = "";

    let columns;
    let tasks;

    try {
        let columns_response = await fetch("/Columns");
        columns = await columns_response.json();
        let tasks_response = await fetch("/Tasks");
        tasks = await tasks_response.json();  
    } catch(err) {
        console.log(err);
        return;
    }

    for (i = 0; i < columns.length; i++) {
        // columns
        let divColumn = document.createElement("div");
        divColumn.className = "column";
        divColumn.id = "Column_" + columns[i].Title.replace(" ", "");
        divColumn.style.height = "100vh";
        divColumn.style.width = "33.3%";
        if (i == 0 || i == 2) {
            divColumn.style.backgroundColor = "ghostwhite";
        }

        // column titles
        let divTitle = document.createElement("div");
        divTitle.className = "columnTitle";
        divTitle.style.backgroundColor = columns[i].Color;
        let valTitle = document.createElement("label");
        valTitle.innerText = columns[i].Title;
        divTitle.appendChild(valTitle);

        // column content
        let divContent = document.createElement("div");
        divContent.className = "columnContent";
        divContent.id = "ColumnContent" + i;
        divContent.style.height = "90vh";
        divColumn.appendChild(divTitle);
        divColumn.appendChild(divContent);

        // add the content
        document.getElementById("tasks").appendChild(divColumn);
    }

    for (const task of tasks) {
        document.getElementById("Column_" + columns[task.Column].Title.replace(" ", "")).lastChild.appendChild(createTaskHTML(task.Id, task.Title));
    }

    for (i = 0; i < columns.length; i++) {
        let button = document.createElement("button");
        button.innerText = "+";
        button.id = "NewTask" + i;
        button.className = "NewTask";
        button.style.width = "100%";
        button.style.height = "3vh"
        button.addEventListener("click", newTask);
        document.getElementById("Column_" + columns[i].Title.replace(" ", "")).lastChild.appendChild(button);
    }

    document.getElementById("ButtonCreate").addEventListener("click", addTask);
    document.getElementById("closeDialog").addEventListener("click", function() {
        document.getElementById("Dialog").style.display = "none";
    })
    document.getElementById("Dialog").style.display = "none";
}

function newTask(button) {
    column = button.path[0].id.slice(-1);
    document.getElementById("Dialog").style.display = "block";
}

async function addTask() {
    const response = await fetch("/tasks");
    let id = 0;
    try {
        const tasks = await response.json();
        id = tasks.length;
    } catch {}

    let task = {
        Id: id,
        Title: document.getElementById("inputTask").value,
        Column: column
    }
        
    document.getElementById("inputTask").value = "";

    await fetch(
        "/tasks",
        {
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
    });

    await loadPage();
}

function createTaskHTML(id, title) {
    let div = document.createElement("div");
    div.className = "Task";
    div.id = "task_" + id;
    div.draggable = true;

    let p = document.createElement("p");
    p.innerText = title;
    
    let back = document.createElement("button");
    back.className = "buttonTasks";
    back.id = "Button_Back_Task_" + id;
    back.addEventListener("click", editTask)
    back.innerText = "←";
    
    let del = document.createElement("button");
    del.className = "buttonTasks";
    del.id = "Button_Delete_Task_" + id;
    del.addEventListener("click", deleteTask);
    del.innerText = "Delete";
    
    let forward = document.createElement("button");
    forward.className = "buttonTasks";
    forward.id = "Button_Forward_Task_" + id;
    forward.addEventListener("click", editTask)
    forward.innerText = "→";

    div.appendChild(p);
    div.appendChild(back);
    div.appendChild(del);
    div.appendChild(forward);

    return div;
}

async function deleteTask(button) {
    let id = button.path[0].id.slice(-1);
    
    await fetch(
        "/tasks:" + id,
        {
            method: "DELETE"
    });

    await loadPage();
}

async function editTask(button) {
    let task;
    let isForward = false;
    let id = button.path[0].id.slice(-1);
    if (button.path[0].id.includes("Forward")) isForward = true;

    const response = await fetch("/Tasks");
    let tasks = await response.json();
    tasks.forEach(element => {
            if (element.Id == id) {
                task = element;
            }
        }
    );
    
    if (isForward) if (task.Column != 2) task.Column++;
    if (!isForward) if (task.Column != 0) task.Column--;
    
    await fetch(
        "/Tasks:" + id,
        {
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT"
    });

    await loadPage();
}