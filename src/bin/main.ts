
import { crawl } from "./utils/crawl";

import { arrayOfPathToDirectoryObject } from "./utils/arrayOfPathToDirectoryObject"
import { directoryObjectOfParsedImagesDirectoryObject } from "./directoryObjectOfParsedImagesDirectoryObject";
import { stringifyToSourceCodeParsedImageDirectoryObject } from "./stringifyToSourceCodeParsedImageDirectoryObject";
import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";

const srcDirectoryPath = "src";

const galleryDirectoryPath = pathJoin(srcDirectoryPath, "assets", "gallery");

const arrayOfPath = crawl(galleryDirectoryPath).filter(path => !path.includes(".DS_Store"));

const directoryObject = arrayOfPathToDirectoryObject({ arrayOfPath });

const {
    parsedImagesDirectoryObject,
    imagesImportStatements
} = directoryObjectOfParsedImagesDirectoryObject({ 
    directoryObject, 
    "importPathPrefix": pathRelative(srcDirectoryPath, galleryDirectoryPath) 
});

const { sourceCode } = stringifyToSourceCodeParsedImageDirectoryObject({
    parsedImagesDirectoryObject,
    imagesImportStatements
});

const generatedDirPath = pathJoin("src", "generated");

if (!fs.existsSync(generatedDirPath)) {
    fs.mkdirSync(generatedDirPath);
}

fs.writeFileSync(
    pathJoin(generatedDirPath, "galleryAssets.ts"),
    Buffer.from(
        [
            `// This file have been automatically generated do not edit manually`,
            `/* cSpell:disable */`,
            sourceCode,
        ].join("\n"),
        "utf8"
    )
);








