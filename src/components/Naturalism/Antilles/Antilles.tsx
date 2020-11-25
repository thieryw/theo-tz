import React from "react";
import {images} from "./images";
import {Gallery} from "../../Gallery/Gallery";
/*import {fetchTextData} from "../../../logic";
import {useAsync} from "react-async-hook";*/


export const Antilles: React.FunctionComponent = ()=>{

    /*const asyncImageTitles = useAsync(fetchTextData, [imageTitles]);*/

    return(
        <Gallery imageUrls={images} />
    )
}
