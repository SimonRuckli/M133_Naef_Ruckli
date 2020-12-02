import { Application, Router, send } from "https://deno.land/x/oak@v6.3.1/mod.ts"

const app = new Application();
const router = new Router();

router
    .get("/", (context) => {
        return send(context, "web/index.html");
    })
    .get("/files/:fileName", (context) => {
        const fileName = context.params.fileName;
        return send(context, "web/" + fileName)
    })

app.use(router.routes());
app.listen({ port: 8000 });



/*import { Application, Router, send, } from "https://deno.land/x/oak@v6.3.1/mod.ts";
const app = new Application();
const router = new Router();
router
  .get("/directText", (context) => {
    context.response.body = "some text";
  })
  .get("/file", (context) => {
    return send(context, "index.html");
  });
app.use(router.routes());
app.listen( { port: 8080 } );*/