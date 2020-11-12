import React, {useRef} from "react";
import authorImageUrl from "./media/theo-min.jpg";
import brush from "./media/brush1.png";
import {useAnimation} from "../../customHooks/useAnimation";
import {useScroll} from "../../customHooks/useScroll";
import {authorText} from "./texts"



export const AuthorPresentation:React.FunctionComponent = ()=>{

    const authorRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useScroll(authorRef);

    useAnimation({
        "ref": imgRef,
        "parentRef": authorRef,
        "offset": 100,
        "direction": "vertical",
        "distanceFromViewPortToTrigger": -400
    });

    useAnimation({
        "parentRef": authorRef,
        "ref": titleRef,
        "distanceFromViewPortToTrigger": -400,
        "fadeDuration": 1000
    });




    return (
        <div ref={authorRef} className="AuthorPresentation">
            <div>

                <div>
                    <div>
                        <h2 ref={titleRef}>Qui suis-je ?</h2>
                        <img src={brush} alt="brush divider"/>

                    </div>
                    <p className="general-text">                        
                        {authorText}


                    <span>Lire la suite</span>
                    </p>
                </div>

                <img ref={imgRef} src={authorImageUrl} alt="author"/>

            </div>

        </div>

    )
}