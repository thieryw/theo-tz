
import type { DirectoryObject } from "./utils/arrayOfPathToDirectoryObject";
import { arrayOfImagePathToParsedImages } from "./arrayOfImagePathToParsedImages";
import type { ParsedImage } from "./arrayOfImagePathToParsedImages";
import { fromEntries } from "./utils/Object.fromEntries";

export type ParsedImagesDirectoryObject = {
    parsedImages: ParsedImage[];
    directories: Record<string, ParsedImagesDirectoryObject>;
};

export function directoryObjectOfParsedImagesDirectoryObjectRec(
    params: {
        directoryObject: DirectoryObject;
        arrOfImagesImportStatements: string[];
    }
): ParsedImagesDirectoryObject {

    const { directoryObject, arrOfImagesImportStatements } = params;

    const { files, directories } = directoryObject;

    const { imagesImportStatements, parsedImages } = arrayOfImagePathToParsedImages({
        "arrayOfImagePath": files
    });

    arrOfImagesImportStatements.push(imagesImportStatements);

    return {
        parsedImages,
        "directories":
            fromEntries(
                Object.entries(directories)
                    .map(([directoryBasename, directoryObject]) => [
                        directoryBasename,
                        directoryObjectOfParsedImagesDirectoryObjectRec({ directoryObject, arrOfImagesImportStatements })
                    ])
            )
    };

}


export function directoryObjectOfParsedImagesDirectoryObject(
    params: { directoryObject: DirectoryObject }
): {
    imagesImportStatements: string;
    parsedImagesDirectoryObject: ParsedImagesDirectoryObject;
} {

    const { directoryObject } = params;

    const arrOfImagesImportStatements: string[] = [];

    const parsedImagesDirectoryObject = directoryObjectOfParsedImagesDirectoryObjectRec({
        directoryObject,
        arrOfImagesImportStatements
    });

    return {
        "imagesImportStatements": arrOfImagesImportStatements.join("\n"),
        parsedImagesDirectoryObject
    };

}

