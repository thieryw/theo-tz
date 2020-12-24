
import { basename as pathBasename } from "path";
import { getCount } from "./utils/getCount";
import { assert } from "evt/tools/typeSafety/assert";
import { join as pathJoin } from "path";

export type ParsedImage = { title: string; urlToken: string; };

/** 
 
Job of the function:
-sort
-generate import source code for the images,
-extract the title from the image basename.

arrIn: 
[
"naturalism/antilles/1.5-Title 2.jpg",
"naturalism/antilles/1-Title 1.jpg",
"naturalism/antilles/2-Title 3.jpg",
"naturalism/antilles/3-Title 4.jpg",
]

Output: 

importsStr: 
`
import _2 from "naturalism/antilles/1.5-Title 2.jpg";
import _1 from "naturalism/antilles/1-Title 1.jpg";
import _3 from "naturalism/antilles/2-Title 3.jpg";
import _4 from "naturalism/antilles/3-Title quatre.jpg";
`

arrOut
[
    { "title": "Title 1", urlToken: "_1" },
    { "title": "Title 2", urlToken: "_2" },
    { "title": "Title 3", urlToken: "_3" },
    { "title": "Title quatre", urlToken: "_4" },
]
*/
export function arrayOfImagePathToParsedImages(
    params: {
        arrayOfImagePath: string[];
        importPathPrefix: string;
    }
): {
    imagesImportStatements: string;
    parsedImages: ParsedImage[];
} {

    const { arrayOfImagePath, importPathPrefix } = params;

    const urlTokenByPath = new Map<string, string>();

    return {
        "parsedImages": arrayOfImagePath
            .map(imagePath => {

                const basename = pathBasename(imagePath);

                const match = basename.match(/^([^-]+)-(.*)\.[^.]+$/);

                assert(match !== null, `${basename} is not a valid image name, expected <number>-<image title>.(jpg|png|...)`);

                const [,orderStr, title] = match;

                const order= Number.parseFloat(orderStr);

                assert(!isNaN(order), `${orderStr} in ${basename} is supposed to be a number`);

                const urlToken = `_${getCount()}`

                urlTokenByPath.set(imagePath, urlToken);

                return {
                    title,
                    order,
                    urlToken
                };

            })
            .sort(({ order: a }, { order: b }) => a - b)
            .map(({ order, ...rest }) => rest),
        "imagesImportStatements": arrayOfImagePath
            .map(imagePath => `import ${urlTokenByPath.get(imagePath)} from "${pathJoin(importPathPrefix, imagePath)}";`)
            .join("\n"),

    };

}


/*
const { parsedImages, imagesImportStatements } = arrayOfImagePathToParsedImages({
    "arrayOfImagePath": [
        "naturalism/antilles/1.2-aaTitle 2.jpg",
        "naturalism/antilles/1.5-Title 2.jpg",
        "naturalism/antilles/1-Title 1.jpg",
        "naturalism/antilles/2-Title 3.jpg",
        "naturalism/antilles/3-Title 4.jpg",
    ]
})
*/

/*console.log(
    importsStr
)

console.log(
    JSON.stringify(arrOut, null, 2)
)*/