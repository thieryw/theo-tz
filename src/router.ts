import {createRouter, defineRoute, RouterOpts} from "type-route";




const opts: RouterOpts = {
    scrollToTop: false
}



const root = defineRoute(process.env["PUBLIC_URL"]);

const naturalism = root.extend("/naturalisme");


export const {RouteProvider, useRoute, routes} = createRouter(opts,{


    home: root,

    author: root.extend("/auteur"),

    portraits: root.extend("/portraits"),

    naturalism,
    antilles: naturalism.extend("/antilles"),
    reunion: naturalism.extend("/reunion"),
    canada: naturalism.extend("/ouest-canadien"),
    france: naturalism.extend("/france"),



    events: root.extend("/evenements")





});
