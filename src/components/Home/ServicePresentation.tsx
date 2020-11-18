import React, {useRef} from "react";
import {Camera, Portraits, Printing, PenTool} from "../../iconComponents/index";
import {portrait, photoReport, journalism, impression} from "./texts";
import {useAnimation} from "../../customHooks/useAnimation";
import {useScroll} from "../../customHooks/useScroll";
import brush from "./media/brush.png";

export const ServicePresentation: React.FunctionComponent = ()=>{

    const icons = [Portraits, Camera, PenTool, Printing];
    const texts = [portrait, photoReport, journalism, impression];
    const ref = useRef<HTMLDivElement>(null);
    const titles = [
        "portrait",
        "reportage photo",
        "journalisme",
        "tirage"
    ];

    useScroll(ref);



    return(
        <div ref={ref} className="ServicePresentation">
            <div className="skew"></div>
            <div className="title">
                <h2>Prestations</h2>
                <img src={brush} alt="brush divider"/>
            </div>

            <div className="wrapper">

                {
                    icons.map((icon, index) => <ServiceBox 
                        key={index}
                        SvgLike={icon}
                        description={texts[index]}
                        title={titles[index]}
                        parentRef={ref}
                        offset={index < icons.length / 2 ? -200 : 200}
                    />)
                }

               

            </div>

            <input className="button" type="button" value="contact"/>

            <div className="skew-1"></div>



        </div>
    )
}


const ServiceBox: React.FunctionComponent<{
    SvgLike: React.FunctionComponent;
    title: string;
    description: string;
    parentRef: React.RefObject<HTMLElement>;
    offset: number;

}> = (props)=>{

    const {SvgLike, title, description, parentRef, offset} = props;
    const ref = useRef<HTMLDivElement>(null);

    useAnimation({
        ref,
        parentRef,
        "direction": "horizontal",
        "offset": offset,
        "distanceFromViewPortToTrigger": -300,
        "extraTransitions": ["border 300ms", "box-shadow 300ms"]
    })

    return(
        <div ref={ref} className="ServiceBox">
            <SvgLike />
            <h3>{title}</h3>
            <p className="general-text">{description}</p>
        </div>

    )

}