import { Elysia, t } from "elysia";
import { plugin } from './plugin'
import { signinDTO } from './models'

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
.post('sign-up', ({body}) => body, {
  body: signinDTO,
  response: signinDTO
})
.post('sign-in', () => 'Sig In Route')
.post('profile', () => 'Profile Route')
);

app.group('/v1', app => app
.get('/', () => 'version 1')
.group('/products', app => app
.get('/:id', ({params: {id}}) => {
  return id
},
{
  params: t.Object({
    id: t.Numeric()
  })
})
)
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
