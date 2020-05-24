import { HomeController } from './apps/home/controllers.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";

export var router = new Router();

router
    .get('', (context) => new HomeController().get(context))
    .post('', (context) => new HomeController().post(context))
    .post('/api', (context) => new HomeController().postJson(context));