import {createRouter, defineRoute} from "type-route";






const publicUrl = process.env["PUBLIC_URL"];

const root = publicUrl ? defineRoute(publicUrl) : {"extend": defineRoute};


export const {RouteProvider, useRoute, routes} = createRouter({


    home: root.extend("/"),

    author: root.extend("/auteur"),

    portraits: root.extend("/portraits"),
    
    naturalism: root.extend("/naturalisme"),

    events: root.extend("/evenements")





})