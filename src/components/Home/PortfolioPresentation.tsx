import React,{useReducer, useRef} from "react";
import birdUrl from "./media/PortfolioPresentation/bird.jpg";
import musicUrl from "./media/PortfolioPresentation/music.jpg";
import danceUrl from "./media/PortfolioPresentation/dance.jpg";
import {useAnimation} from "../../customHooks/useAnimation";
import fancyUnderlineUrl from "./media/PortfolioPresentation/fancy-underline.jpg";




const PortfolioPresentation: React.FunctionComponent = ()=>{

    const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const [, forceUpdate] = useReducer(x=>x+1, 0);

    type TitlePosition = "top" | "bottom";

    const imgUrls = [birdUrl, danceUrl, musicUrl];
    const offsets = [200, -200, 200];
    const imgAlts = ["bird", "dance", "music"];
    const titles = ["naturalisme", "portraits", "évènements"];

    const titlePositions: TitlePosition[]= ["top", "bottom", "top"];


    window.onscroll = ()=> forceUpdate();

    



    return(
        <div 
            ref={ref} 
            className="PortfolioPresentation" 

        >
            <div className="portfolio-heading">
                <h2>Portfolio</h2>
                <img src={fancyUnderlineUrl} alt="fancy underline"/>

            </div>
            
            <div className="wrapper">
                {
                    imgUrls.map((url, index) => {
                        return <div key={index}>
                            {
                                titlePositions[index] === "top" ? 
                                <Title parentRef={ref} title={titles[index]} titlePosition="bottom" /> : ""
                            }
                            <AnimatedImage 
                                imgSrc={url}
                                imgAlt={imgAlts[index]}
                                offset={offsets[index]}
                                parentRef={ref}
                            />

                            {
                                titlePositions[index] === "top" ?
                                "" : <Title parentRef={ref} title={titles[index]} titlePosition="top" />

                            }
                        </div>
                    })
                } 
            </div>

        </div>
    )
}

const Title: React.FunctionComponent<{
    title: string;
    titlePosition: "top" | "bottom";
    parentRef: React.RefObject<HTMLDivElement>;
}> = (props)=>{

    const {title, titlePosition, parentRef} = props

    const ref = useRef<HTMLDivElement>(null);

    useAnimation({
        parentRef,
        ref,
        "fadeDuration" : 800,
        "distanceFromViewPortToTrigger": -400
        

    })

    return(
        <div ref={ref}>
            {
                titlePosition === "top" ? 
                <div className="portfolio-divider"></div> : 
                ""
            }
            <h3>{title}</h3>
            {
                titlePosition === "bottom" ? 
                <div className="portfolio-divider"></div> : 
                ""
            }
        </div>
    )

}



const AnimatedImage: React.FunctionComponent<{
    imgSrc: string;
    imgAlt: string;
    offset: number;

    parentRef: React.RefObject<HTMLDivElement>;
}> = (props)=>{

    const {imgAlt, imgSrc, offset, parentRef} = props;
    const ref: React.RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);


    useAnimation({parentRef, ref, offset, distanceFromViewPortToTrigger: -400});


    return(
        <img 

            ref={ref}
            width="333px"
            height="500px"
            src={imgSrc} 
            alt={imgAlt}

        />
    )
}



export default PortfolioPresentation;




