import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia")
.get("/post/:id",({params: {id}}) => {return {id: id, title: "Learn Bun"}})
.post("/post", ({body ,set}) => { 
  set.status = 201;
  return body;
})
.get("/track/*", () => {return 'Track Route'})
.get("/tracks", () => {
  return new Response(JSON.stringify({
    "tracks" : [
      'Dancing Feat',
      'Sam I',
      'Animals'
    ]
  }), {
    headers:  {
      'Content-Type': 'application/json'
    }
  })
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
