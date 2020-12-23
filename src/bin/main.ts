
import { crawl } from "./utils/crawl";

import { arrayOfPathToDirectoryObject } from "./utils/arrayOfPathToDirectoryObject"
import { directoryObjectOfParsedImagesDirectoryObject } from "./directoryObjectOfParsedImagesDirectoryObject";
import { stringifyToSourceCodeParsedImageDirectoryObject } from "./stringifyToSourceCodeParsedImageDirectoryObject";
import * as fs from "fs";



import { join as pathJoin } from "path";

const directoryPath = pathJoin("src", "assets", "gallery");

const arrayOfPath = crawl(directoryPath);

console.log(arrayOfPath);

const directoryObject = arrayOfPathToDirectoryObject({ arrayOfPath });

const { 
    parsedImagesDirectoryObject, 
    imagesImportStatements 
} = directoryObjectOfParsedImagesDirectoryObject({ directoryObject });

const { sourceCode } = stringifyToSourceCodeParsedImageDirectoryObject({ 
    parsedImagesDirectoryObject, 
    imagesImportStatements 
});

fs.writeFileSync(
    pathJoin("src", "generatedGalleryAsset.ts"),
    Buffer.from(sourceCode, "utf8")
);








