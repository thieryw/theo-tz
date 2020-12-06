import React, {useRef, useState, useEffect, useCallback} from "react";
import "./Home.scss";
import background1 from "./media/acceuil-1-min.jpg";
import background2 from "./media/acceuil-2-min.jpg";
import background3 from "./media/acceuil-3-min.jpg";
import smallBackground from "./media/small-device-background.jpg";
import lizardImg from "./media/lezard-min.jpg";
import signature from "./media/signature.png";
import {BackgroundParallax} from "./BackgroundParallax";
import {AuthorPresentation} from "./AuthorPresentation";
import {ServicePresentation} from "./ServicePresentation";
import {useWindowResize} from "../../customHooks/useWindowResize";
import {BackgroundSlideShow} from "./BackgroundSlideShow";
import PortfolioPresentation from "./PortfolioPresentation";




export const Home: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLDivElement>(null);
    const [deviceSize, setDeviceSize] = useState<"small" | "medium" | "large">("large");

    const handleResize = useCallback(()=>{
        if(window.innerWidth <= 500){
            setDeviceSize("small");
            return;
        }

        if(window.innerWidth <= 1020 && window.innerWidth > 500){
            setDeviceSize("medium");
            return;
            
        }

        setDeviceSize("large");



    },[]);

    useWindowResize(handleResize);

    useEffect(handleResize, [handleResize]);


    return(
        <div ref={ref} className="Home">
            
            <header>

                <img src={`${signature}`} alt="signature logo Théo Tzélépoglou"/>

                {
                    deviceSize === "small" ? <div style={{
                        backgroundImage: `url("${smallBackground}")`,
                        backgroundSize: "cover",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        zIndex: -1


                    }}></div> :
                    <BackgroundSlideShow 
                        animationDuration={9000}
                        backgroundImageUrls={[background1, background3, background2]}
                    />

                }

             

            </header>


            <PortfolioPresentation deviceSize={deviceSize} />

            <BackgroundParallax 
                imageUrl={lizardImg}
            />

            <AuthorPresentation />

            <ServicePresentation />




        </div>
    )

}




