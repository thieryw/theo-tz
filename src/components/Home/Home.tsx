import React, {ReactDOM} from "react";
import {Nav} from "../Nav/Nav";
import "./Home.scss";
import background1 from "./media/acceuil-1-min.jpg";
import background2 from "./media/acceuil-2-min.jpg";
import background3 from "./media/acceuil-3-min.jpg";
import {BackgroundSlideShow} from "./BackgroundSlideShow";
import signature from "./media/signature.png";
import {PortfolioPresentation} from "./PortfolioPresentation";


export const Home: React.FunctionComponent = ()=>{

    return(
        <div className="Home">
            
            <header>
                <Nav />

                    <BackgroundSlideShow 
                        animationDuration={9000}
                        backgroundImageUrls={[background1, background2, background3]}
                    />
                    




                <img src={`${signature}`} alt="signature logo Théo Tzélépoglou"/>


             

            </header>


                <PortfolioPresentation />


        </div>
    )

}




