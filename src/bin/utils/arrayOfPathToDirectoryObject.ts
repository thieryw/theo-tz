


import { sep as pathSep, relative as pathRelative, join as pathJoin } from "path";
import { arrPartition } from "evt/tools/reducers/partition";
import { removeDuplicates } from "evt/tools/reducers/removeDuplicates";

export type DirectoryObject = {
    files: string[];
    directories: Record<string, DirectoryObject>;
};

function arrayOfPathToNodeRec(
    params: { arrayOfPath: string[]; currPath: string; }
): DirectoryObject {

    const { arrayOfPath, currPath } = params;

    const [
        relativeFiles,
        filesInSubdirectories
    ] = arrPartition(arrayOfPath, filePath => filePath.split(pathSep).length === 1);

    /*

    "a/b/c/foo.txt",
    "a/b/c/bar.txt",
    "a/b/baz.txt",
    "a/test.js",
    "zoro/file.txt",

    ["a", "zoro"]
    */

    const directories: Record<string, DirectoryObject> = {};

    filesInSubdirectories
        .map(fileInSubdirectory => fileInSubdirectory.split(pathSep)[0])
        .reduce(...removeDuplicates<string>())
        .forEach(directoryName =>
            directories[directoryName] = arrayOfPathToNodeRec({
                "arrayOfPath":
                    filesInSubdirectories
                        .filter(fileInSubdirectory => fileInSubdirectory.startsWith(directoryName))
                        .map(fileInSubdirectory => pathRelative(directoryName, fileInSubdirectory)),
                "currPath": pathJoin(currPath, directoryName)
            })
        );


    const node: DirectoryObject = {
        "files": relativeFiles.map(relativeFile => pathJoin(currPath, relativeFile)),
        directories
        /*
        "directories": {
            "a": pathArrayToObject([
                "b/c/foo.txt",
                "b/c/bar.txt",
                "b/baz.txt",
                "test.js",
            ]),
            "zoro": pathArrayToObject([
                "file.txt"
            ])
        }
        */
    };


    return node;

}

export function arrayOfPathToDirectoryObject(
    params: { arrayOfPath: string[]; }
) {

    const { arrayOfPath } = params;

    return arrayOfPathToNodeRec({ arrayOfPath, "currPath": "." });

}


/*fs.writeFileSync(
    pathJoin("src", "generated", "myScript.ts"),
    Buffer.from(
        `export const myObject=${JSON.stringify(obj, null, 2)}`,
        "utf8"
    )
)*/




/*
const out = pathArrayToObject({
    "pathArray": [
        "a/b/c/foo.txt",
        "a/b/c/bar.txt",
        "a/b/baz.txt",
        "a/test.js",
        "zoro/file.txt",
        "zizi.txt"
    ]
});

console.log(JSON.stringify(out, null, 2));
*/


/*
[
    "a/b/c/foo.txt",
    "a/b/c/bar.txt",
    "a/b/baz.txt",
    "a/test.js",
    "zoro/file.txt",
    "zizi.txt"
]

{
    "files":[],
    "directories": {
    "a":{
        "files": [ "a/test.js" ],
        "directories": {
            "b": {
                "files": ["a/b/baz.txt"],
                "directories": { 
                    "c": {
                        "files": [ "a/b/c/bar.txt", "a/b/c/foo.txt"],
                        "directories": []
                    }
                }

            }

        }

    },
    "zoro": {...}
}

}
*/
