console.log("1");

var tag = document.createElement("div");
console.log("2");

var text = document.createTextNode("implementieren");
console.log("3");

tag.appendChild(text);
console.log("4");

var element = document.getElementById("taskToDo");
console.log("5");

element.appendChild(tag);
console.log("6");