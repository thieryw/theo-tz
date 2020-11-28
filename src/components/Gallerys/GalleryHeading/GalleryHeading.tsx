import React from "react";
import "./GalleryHeading.scss";
import logoUrl from "./media/signature.png";

export const GalleryBanner: React.FunctionComponent<{
    galleryName: string;
}> = props =>{
    const {galleryName} = props;

    return(
        <div className="gallery-header-wrapper">
            <header className="gallery-header">
                <img src={logoUrl} alt={galleryName}/>
                <h3>{galleryName}</h3>
                <div className="background">

                </div>
            </header>

        </div>
    )
}

export const GalleryLinks: React.FunctionComponent<{
    route: any;
    name: string;
    activeGallery: string;
    routeName: string;
    

}> = props =>{
    const {activeGallery, name, route, routeName} = props;

    return(
        <h3 className={activeGallery === routeName ? "active" : ""}
            {...route().link}
        >
            {
                name
            }

        </h3>
    )
}