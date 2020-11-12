import React, {useRef} from "react";
import authorImageUrl from "./media/theo-min.jpg";
import brush from "./media/brush1.png";
import {useAnimation} from "../../customHooks/useAnimation";
import {useScroll} from "../../customHooks/useScroll";



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
                    <p className="general-text">J'ai toujours été émerveillé par la nature, 
                        une des seules choses sur terre qui me 
                        parait vraie, universelle et sans artifices. 
                        Nous vivons dans un monde ultra connecté, où 
                        contempler et vivre l’instant présent est devenu 
                        un privilège. C’est pourtant, à mon sens, 
                        la base même de la vie ; s’imprégner du vivant, 
                        randonner en pleine nature est pour moi une formidable 
                        bouteille d'oxygène, un ré-enracinement profond à la vie...
                    </p>
                </div>

                <img ref={imgRef} src={authorImageUrl} alt="author"/>

            </div>

        </div>

    )
}