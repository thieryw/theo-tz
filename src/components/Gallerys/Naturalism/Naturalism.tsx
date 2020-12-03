import React, {useState, useEffect} from "react";
import "./Naturalism.scss";
//@ts-ignore
import text from "./Texts/text.txt";
import brush from "./media/brush1.png";
import {GalleryLinks, GalleryBanner} from "../GalleryHeading/GalleryHeading";
import {fetchTextData} from "../../../logic";
import {useAsync} from "react-async-hook";
import {France} from "./France/France";
import {routes} from "../../../router";
import {createGroup, Route} from "type-route";
import {Antilles} from "./Antilles/Antilles"
import {Reunion} from "./Reunion/Reunion";
import {Canada} from "./Canada/Canada";
import "../main.scss";

export const natureRouteGroup = createGroup([
    routes.naturalism,
    routes.antilles,
    routes.canada,
    routes.reunion,
    routes.france
]);

type Name = "naturalism" | "antilles" | "reunion" | "canada" | "france";

export const Naturalism: React.FunctionComponent<{
    route: Route<typeof natureRouteGroup>;
}> = props=>{

    const {route} = props;

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])



    const asyncGetText = useAsync(fetchTextData, [text]);
    const subRoutes = [routes.france, routes.antilles, routes.reunion, routes.canada];
    const galleryNames =[
        "france",
        "antilles",
        "réunion & maurice",
        "ouest canadien"
    ];

    const routeNames: Name[] = [
        "france",
        "antilles",
        "reunion",
        "canada"
    ]

    const [activeGallery, setActiveGallery] = useState<Name>("france");

    

    useEffect(()=>{
        setActiveGallery(route.name)
    },[activeGallery, route.name])


    return(

        <div className="gallery-main Naturalism">

            <GalleryBanner galleryName="naturalisme" />

            <section>
                <div>
                    <p className="general-text">
                        <span>L</span>
                        {
                            asyncGetText.loading || !asyncGetText.result ?
                            "Chargement..." :  asyncGetText.result[0].substring(1)
                        }
                    </p>

                    <img src={brush} alt="brush divider"/>

                    <div className="gallery-links">

                        {
                            subRoutes.map((route, index) => <GalleryLinks 
                                key={index}
                                route={route}
                                name={galleryNames[index]}
                                activeGallery={activeGallery}
                                routeName={routeNames[index]}

                            />)
                        }
                        
                    </div>
                    
                    {route.name === "france" && <France />}
                    {route.name === "antilles" && <Antilles />}
                    {route.name === "canada" && <Canada />}
                    {route.name === "reunion" && <Reunion />}


                </div>
            </section>
        </div>
    )
}



