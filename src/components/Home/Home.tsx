import React, {useRef} from "react";
import {Nav} from "../Nav/Nav";
import "./Home.scss";
import background1 from "./media/acceuil-1-min.jpg";
import background2 from "./media/acceuil-2-min.jpg";
import background3 from "./media/acceuil-3-min.jpg";
import lizardImg from "./media/lezard-min.jpg";
import signature from "./media/signature.png";
import {Loader} from "../../Loader";
import {BackgroundParallax} from "./BackgroundParallax";
//@ts-ignore
import loadable from "@loadable/component";
import {AuthorPresentation} from "./AuthorPresentation";
import {ServicePresentation} from "./ServicePresentation";

const BackgroundSlideShow = loadable(()=> import("./BackgroundSlideShow"), {
    fallback: <div className="temp-background"></div>
});


const PortfolioPresentation = loadable(()=> import("./PortfolioPresentation"),{
    fallback: <Loader />
});


export const Home: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLDivElement>(null);

    return(
        <div ref={ref} className="Home">
            
            <header>
                <Nav parentRef={ref}/>

                <img src={`${signature}`} alt="signature logo Théo Tzélépoglou"/>

                    <BackgroundSlideShow 
                        animationDuration={9000}
                        backgroundImageUrls={[background1, background2, background3]}
                    />
             

            </header>


            <PortfolioPresentation />

            <BackgroundParallax 
                imageUrl={lizardImg}
            />

            <AuthorPresentation />

            <ServicePresentation />




        </div>
    )

}




