import React,{useEffect, useState} from "react";
import "./Events.scss";
import "../main.scss";
import {GalleryBanner, GalleryLinks} from "../GalleryHeading/GalleryHeading";
import {routes} from "../../../router";
import {createGroup, Route} from "type-route";
import {Gallery} from "../../FlexGallery/FlexGallery";
import {images as airStep} from "./media/airstep/airStep";
import {images as loveMe} from "./media/loveMe/loveMe";

export const eventsRouteGroup = createGroup([
    routes.airStep,
    routes.loveMe 
]);



export const Events: React.FunctionComponent<{
    route: Route<typeof eventsRouteGroup>;
}> = props=>{

    const {route} = props;

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    const subRoutes = [routes.airStep, routes.loveMe];

    const galleryNames=[
        "airsteps & classic routine",
        "love me tender"
        

    ]

    const [activeGallery, setActiveGallery] = useState<
        typeof eventsRouteGroup["routeNames"][number]
    >("airStep");

    useEffect(()=>{
        setActiveGallery(route.name);
    },[activeGallery, route.name]);


    




    return(
        <div className="gallery-main Events">
            <GalleryBanner galleryName="évènements"/>
            <section>
                <div>
                    <div className="gallery-links">
                        {
                            eventsRouteGroup.routeNames.map((name, index) => <GalleryLinks 
                                activeGallery={activeGallery}
                                route={subRoutes[index]}
                                key={index}
                                name={galleryNames[index]}
                                routeName={name}
                            />)

                        }
                    </div>

                    {route.name === "airStep" && <Gallery imageUrls={airStep} initialImageHeight={300}/>}
                    {route.name === "loveMe" && <Gallery imageUrls={loveMe} initialImageHeight={451}/>}

                </div>
            </section>
            
        </div>
    )

}