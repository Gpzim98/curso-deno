import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { urls } from './myroutes.ts';
import { PermissionMiddleware } from './permission_middleware.ts';

export class RouterResolver
{
    permissionMiddleware : PermissionMiddleware = new PermissionMiddleware();

    urlMatches(pattern: string, url: string) : boolean
    {
        var regexp = new RegExp(pattern);
        return regexp.test(url);
    }

    getUrlController(request : ServerRequest)
    {       
        for (let set of urls)
        {
            if(this.urlMatches(set.reg, request.url))
            {
                if(this.permissionMiddleware.isAllowed(request))
                    set.controller.returnResponse(request);
                else
                    request.respond({ body: 'Not allowed'});
            }
        }
    }
}