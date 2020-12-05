import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts"

const app = new Application();
const router = new Router();

let tasks = [];
const columns = [{
    Title: "ToDo",
    Color: "darkorange"
}, {
    Title: "In Progress",
    Color: "lightskyblue"
}, {
    Title: "Done",
    Color: "lightgreen"
}]

router 
    .get("/", (context) => {
        return send(context, "web/index.html");
    })

    .get("/files/:fileName", (context) => {
        const fileName = context.params.fileName;
        return send(context, "web/" + fileName)
    })

    .get("/Tasks", (context) => {
        context.response.body = tasks;
    })

    .get("/Columns", (context) => {
        context.response.body = columns;
    })

app.use(router.routes());
app.listen({ port: 8000 });