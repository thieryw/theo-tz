import React, {useState, useEffect} from "react";
import "./main.scss";
import brush from "./media/brush1.png";

import {Gallery} from "../FlexGallery/FlexGallery";




export type Props = {
    description?: string;
    title?: string;
    backgroundImageUrl: string;
    logoUrl?: string;
    backgroundPosition?: string;
    bannerHeight?: number;
    initialImageHeights?: (number | undefined)[];
    backgroundBrightness?: number;
    assets: { 
        [galleryName: string]: { 
            parsedImages: readonly { title?: string; url: string }[]; 
        } 
    };
}



export const Portfolio = (props: Props)=>{

    const {
       
        assets,
        description,
        title,
        bannerHeight,
        backgroundImageUrl,
        initialImageHeights,
        backgroundBrightness,
        backgroundPosition,
        logoUrl
    } = props;

    const [
        activeGalleryName, 
        setActiveGalleryName
    ] = useState(Object.keys(assets)[0]);

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
  

    return(
        <div className="gallery-main">
            <div className="gallery-header-wrapper">
                <header style={{
                    height: `${bannerHeight ? bannerHeight : 100}vh`
                }} className="gallery-header">
                    {
                        logoUrl ? <img src={logoUrl} alt="logo"/> : ""
                    }
                   
                    <h3>{title}</h3>
                    <div style={{
                        background: `url("${backgroundImageUrl}")`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundPosition: `${backgroundPosition ? backgroundPosition : ""}`,
                        filter: `brightness(${backgroundBrightness ? backgroundBrightness : 1})`
                        

                    }} className="background">

                    </div>
                 

                </header>
            </div>

            <section>
                <div className={description ? "with-description" : ""}>
                    {
                        description ? <p className="general-text">
                            <span>{description[0]}</span>
                            {
                                description.slice(1)
                            }
                        </p> :
                        ""
                    }
                    {
                        description ? <img src={brush} alt="brush divider"/> : ""
                    }
                    <div className="gallery-links">
                        {
                            
                            Object.keys(assets).map(galleryName => 
                                <h3
                                    className={galleryName === activeGalleryName ? "active" : ""}
                                    onClick={()=> setActiveGalleryName(galleryName)}
                                    key={galleryName}
                                >
                                    {
                                        galleryName
                                    }

                                </h3>
                            )
                        }
                    </div>
                    

                    {
                        Object.keys(assets).map((galleryName, index)=>{
                            if(galleryName === activeGalleryName){
                                return <Gallery
                                    images={assets[galleryName]["parsedImages"]}
                                    key={galleryName}
                                    initialImageHeight={initialImageHeights ? initialImageHeights[index] : undefined}

                                />
                            }

                            return "";
                        })

                     
                    }


                </div>
            </section>

        </div>
    )

}