import { Elysia } from "elysia";
import { plugin } from './plugin'

const app = new Elysia().get("/", () => "Hello Elysia")
.use(plugin)
.state({'version': 1})
.decorate('getData', () => Date.now())
.get("/post/:id",({params: {id}}) => {return {id: id, title: "Learn Bun"}})
.post("/post", ({body ,set}) => { 
  set.status = 201;
  return body;
})
.get("/track/*", () => {return 'Track Route'})
.get("/tracks", ({store, getData}) => {
  console.log(store);
  console.log(getData());
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
});

app.group('/user', app => app
.post('sign-up', () => 'Sig In Route')
.post('sign-up', () => 'Sig Up Route')
.post('profile', () => 'Profile Route')
);


app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
