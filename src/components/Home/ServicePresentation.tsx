import React, {useRef} from "react";
import {ReactComponent as Camera} from "../../assets/SVG/camera.svg";
import {ReactComponent as Printing} from "../../assets/SVG/printing.svg";
import {ReactComponent as Portraits} from "../../assets/SVG/portraits.svg";
import {ReactComponent as PenTool} from "../../assets/SVG/pen-tool.svg";

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
                        offset={index < icons.length / 2 ? -200 : 200}
                    />)
                }

               

            </div>

            <a href="mailto:theo.tzelepoglou@gmail.com">
                <input className="button" type="button" value="contact"/>
            </a>

            <div className="skew-1"></div>



        </div>
    )
}


const ServiceBox: React.FunctionComponent<{
    SvgLike: React.FunctionComponent;
    title: string;
    description: string;
    offset: number;

}> = (props)=>{

    const {SvgLike, title, description, offset} = props;
    const ref = useRef<HTMLDivElement>(null);

    useAnimation({
        ref,
        "direction": "horizontal",
        "offset": offset,
        "distanceFromViewPortToTrigger": -150,
        /*"extraTransitions": ["border 300ms", "box-shadow 300ms"]*/
    })

    return(
        <div ref={ref} className="ServiceBox">
            <SvgLike />
            <h3>{title}</h3>
            <p className="general-text">{description}</p>
        </div>

    )

}