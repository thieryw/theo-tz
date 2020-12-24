
import type { ParsedImagesDirectoryObject } from "./directoryObjectOfParsedImagesDirectoryObject";

export function stringifyToSourceCodeParsedImageDirectoryObject(
    params: {
        imagesImportStatements: string;
        parsedImagesDirectoryObject: ParsedImagesDirectoryObject;
    }
): { sourceCode: string; } {

    const {
        imagesImportStatements,
        parsedImagesDirectoryObject
    } = params;

    let sourceCode = JSON.stringify(
        parsedImagesDirectoryObject,
        (key, value) => {

            if (
                key === "parsedImages" &&
                value.length === 0
            ) {
                return undefined;
            }

            if (
                key === "directories" &&
                Object.keys(value).length === 0
            ) {
                return undefined;
            }

            if (
                key === "title" &&
                value === ""
            ) {
                return undefined;
            }

            return value;

        },
        2
    )
        .replace(/"urlToken":/g, `"url":`);

    while (true) {

        const match = sourceCode.match(/"url": ("_\d+")/);

        if (!match) {
            break;
        }

        const [, group] = match;

        sourceCode = sourceCode.replace(group, group.replace(/"/g, ""))

    }

    sourceCode = sourceCode
        .split("\n")
        .map(line => {

            if (!/^\s*"title": /.test(line)) {
                return line;
            }

            return line.replace(/,$/, " as const,");

        })
        .join("\n");

    sourceCode = [
        imagesImportStatements,
        `export const generatedGalleryAsset = ${sourceCode} as const;`
    ].join("\n\n");

    return { sourceCode };

}


