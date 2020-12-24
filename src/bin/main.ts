
import { crawl } from "./utils/crawl";

import { arrayOfPathToDirectoryObject } from "./utils/arrayOfPathToDirectoryObject"
import { directoryObjectOfParsedImagesDirectoryObject } from "./directoryObjectOfParsedImagesDirectoryObject";
import { stringifyToSourceCodeParsedImageDirectoryObject } from "./stringifyToSourceCodeParsedImageDirectoryObject";
import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";

const srcDirectoryPath = "src";

const galleryDirectoryPath = pathJoin(srcDirectoryPath, "assets", "gallery");

const arrayOfPath = crawl(galleryDirectoryPath)
    .map(pathRelativeToGalleryDirectory => pathJoin(
        pathRelative(srcDirectoryPath, galleryDirectoryPath),
        pathRelativeToGalleryDirectory
    ));

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
    Buffer.from(
        [
            `// This file have been automatically generated do not edit manually`,
            sourceCode,
        ].join("\n"),
        "utf8"
    )
);








