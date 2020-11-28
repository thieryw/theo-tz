import React from "react";
import "./Portraits.scss";
import "../main.scss";
import {GalleryBanner, GalleryLinks} from "../GalleryHeading/GalleryHeading";


export const Portraits: React.FunctionComponent = ()=>{


    return(
        <div className="gallery-main Portraits">
            <GalleryBanner galleryName="portraits"/>
            
        </div>
    )

}