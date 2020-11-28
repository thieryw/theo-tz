import React from "react";
import {images} from "./images";
import {Gallery} from "../../../FlexGallery/FlexGallery";
import {fetchTextData} from "../../../../logic";
import {useAsync} from "react-async-hook";
//@ts-ignore
import imageTitles from "./imageTitles.txt";


export const France: React.FunctionComponent = ()=>{

    const asyncImageTitles = useAsync(fetchTextData, [imageTitles]);

    return(
        <Gallery imageTitles={asyncImageTitles.loading || !asyncImageTitles.result ? "" : asyncImageTitles.result} imageUrls={images} />
    )
}

