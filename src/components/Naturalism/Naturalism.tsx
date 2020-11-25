import React, {useState, useEffect} from "react";
import logoUrl from "./media/signature.png";
import "./Naturalism.scss";
//@ts-ignore
import text from "./Texts/text.txt";
import brush from "./media/brush1.png";

import {fetchTextData} from "../../logic";
import {useAsync} from "react-async-hook";
import {France} from "./France/France";
import {routes} from "../../router";
import {createGroup, Route} from "type-route";

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
        <div className="Naturalism">
            <header>
                <img src={logoUrl} alt="logo"/>
                <h3>naturalism</h3>

            </header>

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
                    {route.name === "antilles" && <h1>Antilles</h1>}
                    {route.name === "canada" && <h1>Canada</h1>}
                    {route.name === "reunion" && <h1>Reunion</h1>}


                </div>
            </section>
        </div>
    )
}

const GalleryLinks: React.FunctionComponent<{
    route: any;
    name: string;
    activeGallery: Name;
    routeName: Name;
}> = props =>{
    const {route, name, activeGallery, routeName} = props;
    
    return(
        <h3 
           className={activeGallery === routeName ? "active" : ""} 
           {...route().link}>{name}
        </h3>
    )

}

