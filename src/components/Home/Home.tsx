import React, {lazy, Suspense, useRef} from "react";
import {Nav} from "../Nav/Nav";
import "./Home.scss";
import background1 from "./media/acceuil-1-min.jpg";
import background2 from "./media/acceuil-2-min.jpg";
import background3 from "./media/acceuil-3-min.jpg";
import signature from "./media/signature.png";
import {Loader} from "../../Loader";


const BackgroundSlideShow = lazy(()=> import("./BackgroundSlideShow"));

const PortfolioPresentation = lazy(()=> import("./PortfolioPresentation"));



export const Home: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLDivElement>(null);



    return(
        <div ref={ref} className="Home">
            
            <header>
                <Nav parentRef={ref}/>

                <img src={`${signature}`} alt="signature logo Théo Tzélépoglou"/>

                <Suspense fallback={<div className="temp-background"></div>}>
                    <BackgroundSlideShow 
                        animationDuration={9000}
                        backgroundImageUrls={[background1, background2, background3]}
                    />

                </Suspense>



                   







             

            </header>



            <Suspense fallback={<Loader />}>

                <PortfolioPresentation />
            </Suspense>




        </div>
    )

}




