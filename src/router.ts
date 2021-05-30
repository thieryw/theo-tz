import { createRouter, defineRoute } from "type-route";
import { makeThisModuleAnExecutableRouteLister } from "github-pages-plugin-for-type-route";

/*
const root = defineRoute(process.env["PUBLIC_URL"]);
const naturalism = root.extend("/naturalisme");
const portraits = root.extend("/portraits");
const events = root.extend("/evenements");
*/

const naturalisme = defineRoute("/naturalisme");
const portraits = defineRoute("/portraits");
const evènements = defineRoute("/evenements");

export const routeDefs = {
    /*
    "home": root,
    "author": root.extend("/auteur"),
    */
    "accueil": defineRoute("/"),
    "auteur": defineRoute("/auteur"),
    portraits,
    /*"annaAndJonathan": portraits.extend("/anna-jonathan"),
    "claire": portraits.extend("/claire"),
    "melodie": portraits.extend("/melodie"),
    "confluence": portraits.extend("/confluence"),
    "etienne": portraits.extend("/etienne"),*/
    naturalisme,
    /*"antilles": naturalisme.extend("/antilles"),
    "reunion": naturalisme.extend("/reunion"),
    "canada": naturalisme.extend("/ouest-canadien"),
    "france": naturalisme.extend("/france"),*/
    evènements,
    /*"airStep": evènements.extend("/air-step"),
    "loveMe": evènements.extend("/love-me-tender")*/
};

makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, useRoute, routes } = createRouter(
    { "scrollToTop": false },
    routeDefs
);
