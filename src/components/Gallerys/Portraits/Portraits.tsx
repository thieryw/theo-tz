import React,{useEffect, useState} from "react";
import "./Portraits.scss";
import "../main.scss";
import {GalleryBanner, GalleryLinks} from "../GalleryHeading/GalleryHeading";
import {routes} from "../../../router";
import {createGroup, Route} from "type-route";
import {Gallery} from "../../FlexGallery/FlexGallery";
import {images as anna} from "./media/AnnaEtJonathan/annaJonatan";
import {images as claire} from "./media/Claire/claire";
import {images as confluence} from "./media/Confluence/confluence";
import {images as etienne} from "./media/Etienne/etienne";
import {images as melodie} from "./media/Melodie/melodie";

export const portraitRouteGroup = createGroup([
    routes.etienne,
    routes.melodie,
    routes.confluence,
    routes.annaAndJonathan,
    routes.claire
]);



export const Portraits: React.FunctionComponent<{
    route: Route<typeof portraitRouteGroup>;
}> = props=>{

    const {route} = props;

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    const subRoutes = [routes.etienne, routes.melodie, routes.confluence, routes.annaAndJonathan, routes.claire];

    const galleryNames=[
        "etienne",
        "mélodie",
        "quatuor confluence",
        "anna & jonatan",
        "claire"

    ]

    const [activeGallery, setActiveGallery] = useState<
        typeof portraitRouteGroup["routeNames"][number]
    >("etienne");

    useEffect(()=>{
        setActiveGallery(route.name);
    },[activeGallery, route.name]);


    




    return(
        <div className="gallery-main Portraits">
            <GalleryBanner galleryName="portraits"/>
            <section>
                <div>
                    <div className="gallery-links">
                        {
                            portraitRouteGroup.routeNames.map((name, index) => <GalleryLinks 
                                activeGallery={activeGallery}
                                route={subRoutes[index]}
                                key={index}
                                name={galleryNames[index]}
                                routeName={name}
                            />)

                        }
                    </div>

                    {route.name === "annaAndJonathan" && <Gallery imageUrls={anna} initialImageHeight={470}/>}
                    {route.name === "claire" && <Gallery imageUrls={claire} initialImageHeight={400} />}
                    {route.name === "confluence" && <Gallery imageUrls={confluence} initialImageHeight={400} />}
                    {route.name === "etienne" && <Gallery imageUrls={etienne} initialImageHeight={300} />}
                    {route.name === "melodie" && <Gallery imageUrls={melodie} initialImageHeight={335} />}

                </div>
            </section>
            
        </div>
    )

}