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
        let div = document.createElement("div");
        div.className = "column";
        div.id = "Column_" + columns[i].Title.replace(" ", "");
        div.style.height = "100vh";
        div.style.width = (100 / columns.length).toFixed(1) + "%";
        if (i % 2 == 1) {
            div.style.backgroundColor = "ghostwhite";
        }

        let divtitle = document.createElement("div");
        divtitle.className = "column_title";
        divtitle.style.backgroundColor = columns[i].Color;
        let title = document.createElement("label");
        title.innerText = columns[i].Title;
        divtitle.appendChild(title);

        let divcontent = document.createElement("div");
        divcontent.className = "column_content";
        divcontent.id = "Column_Content_" + i;
        divcontent.style.height = "100vh";

        div.appendChild(divtitle);
        div.appendChild(divcontent);

        document.getElementById("tasks").appendChild(div);
    }
}




