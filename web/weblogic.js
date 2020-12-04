function addTaskToDo(name) {
    var tag = document.createElement("div");
    var text = document.createTextNode(name);
    tag.appendChild(text);
    var element = document.getElementById("taskToDo");
    element.appendChild(tag);

}

function addTaskInProgress(name) {
    var tag = document.createElement("div");
    var text = document.createTextNode(name);
    tag.appendChild(text);
    var element = document.getElementById("taskInProgress");
    element.appendChild(tag);

}

function addTaskDone(name) {
    var tag = document.createElement("div");
    var text = document.createTextNode(name);
    tag.appendChild(text);
    var element = document.getElementById("taskDone");
    element.appendChild(tag);

}