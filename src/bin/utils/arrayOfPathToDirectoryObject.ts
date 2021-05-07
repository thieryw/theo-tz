


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
  
    };


    return node;

}

export function arrayOfPathToDirectoryObject(
    params: { arrayOfPath: string[]; }
) {

    const { arrayOfPath } = params;

    return arrayOfPathToNodeRec({ arrayOfPath, "currPath": "." });

}


