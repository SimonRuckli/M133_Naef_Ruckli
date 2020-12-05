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
        switch (i) {
            case 0:
                divColumn.id = "columnToDo";
                break;
            case 1:
                divColumn.id = "columnInProgress";
                break;
            case 2:
                divColumn.id = "columnDone";
                break;
        }
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
        switch (i) {
            case 0:
                divContent.id = "columnContentToDo";
                break;
            case 1:
                divContent.id = "columnContentInProgress";
                break;
            case 2:
                divContent.id = "columnContentDone";
                break;
        }
        divContent.style.height = "90vh";

        divColumn.appendChild(divTitle);
        divColumn.appendChild(divContent);

        document.getElementById("tasks").appendChild(divColumn);
    }
}




