import { createRouter, defineRoute } from "type-route";
import { makeThisModuleAnExecutableRouteLister } from "github-pages-plugin-for-type-route";

const root = defineRoute(process.env["PUBLIC_URL"]);
const naturalism = root.extend("/naturalisme");
const portraits = root.extend("/portraits");

export const routeDefs = {
    "home": root,
    "author": root.extend("/auteur"),
    portraits,
    "annaAndJonathan": portraits.extend("/anna-jonathan"),
    "claire": portraits.extend("/claire"),
    "melodie": portraits.extend("/melodie"),
    "confluence": portraits.extend("/confluence"),
    "etienne": portraits.extend("/etienne"),
    naturalism,
    "antilles": naturalism.extend("/antilles"),
    "reunion": naturalism.extend("/reunion"),
    "canada": naturalism.extend("/ouest-canadien"),
    "france": naturalism.extend("/france"),
    "events": root.extend("/evenements")
};

makeThisModuleAnExecutableRouteLister(routeDefs);

export const { RouteProvider, useRoute, routes } = createRouter(
    { "scrollToTop": false },
    routeDefs
);
