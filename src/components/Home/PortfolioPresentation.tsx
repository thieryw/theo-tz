import React,{useState, useEffect, useCallback, useReducer} from "react";
import birdUrl from "./media/PortfolioPresentation/bird.jpg";
import musicUrl from "./media/PortfolioPresentation/music.jpg";
import danceUrl from "./media/PortfolioPresentation/dance.jpg";
import {evtScrolling} from "../../index";
import {useEvt} from "evt/hooks";
import {useAnimation} from "../../customHooks/useAnimation";
import fancyUnderlineUrl from "./media/PortfolioPresentation/fancy-underline.jpg";


export const PortfolioPresentation: React.FunctionComponent = ()=>{

    const [, forceUpdate] = useReducer(x=>x+1,0);
    const ref: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

    type TitlePosition = "top" | "bottom";

    const imgUrls = [birdUrl, danceUrl, musicUrl];
    const offsets = [200, -200, 200];
    const imgAlts = ["bird", "dance", "music"];
    const titles = ["naturalisme", "portraits", "évènements"];

    const titlePositions: TitlePosition[]= ["top", "bottom", "top"];

    useEvt(ctx =>{
        evtScrolling.attach(
            ctx,
            () => forceUpdate()
        );

    }, []);



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
                                <Title title={titles[index]} titlePosition="bottom" /> : ""
                            }
                            <AnimatedDiv 
                                imgSrc={url}
                                imgAlt={imgAlts[index]}
                                offset={offsets[index]}
                                opacity="0"
                                orientation="vertical"
                                parentRef={ref}
                            />

                            {
                                titlePositions[index] === "top" ?
                                "" : <Title title={titles[index]} titlePosition="top" />

                            }
                        </div>
                    })
                } 
            </div>

        </div>
    )
}

const Title: React.FunctionComponent<{
    title: string
    titlePosition: "top" | "bottom"
}> = (props)=>{

    const {title, titlePosition} = props

    return(
        <div>
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



const AnimatedDiv: React.FunctionComponent<{
    imgSrc: string;
    imgAlt: string;
    opacity: string;
    offset: number;
    orientation: "vertical" | "horizontal"

    parentRef: React.RefObject<HTMLDivElement>;
}> = (props)=>{

    const {imgAlt, imgSrc, offset, orientation, opacity, parentRef} = props;
    const ref: React.RefObject<HTMLImageElement> = React.createRef<HTMLImageElement>();

    const translate = orientation === "horizontal" ? `translateX(${offset}px)` :
                `translateY(${offset}px)`;




    useAnimation({parentRef, ref, offset, orientation});


    return(
        <img 

            ref={ref}
            src={imgSrc} 
            alt={imgAlt}
            style={{
                transform: translate,
                opacity: opacity,
                transition: "transform 800ms, opacity 300ms"
            }}
        />
    )
}







