import { Elysia } from "elysia";

export const plugin = new Elysia()
.state('plugin-version', 2)
.get("/form-plugin", () => "Hi")
.get("/greet", () => "Hello Dev");