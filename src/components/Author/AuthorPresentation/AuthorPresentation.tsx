import React, {useRef} from "react";
import "./AuthorPresentation.scss";
import authorJpg from "../media/author-portrait-min.jpg";
import miniSignaturePng from "../media/mini-signature.png";
import {useAnimation} from "../../../customHooks/useAnimation";
import {useScroll} from "../../../customHooks/useScroll";



export const AuthorPresentation: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const paragraphRef = useRef<HTMLDivElement>(null);

    useScroll(ref);

    useAnimation({
        "ref": imgRef,
        "distanceFromViewPortToTrigger": -100,
        "offset": -200
    });

    useAnimation({
        "ref": paragraphRef,
        "distanceFromViewPortToTrigger": -300,
        "fadeDuration": 1000,
        "animationDelay": 1000
    })

    return(
        <section ref={ref} className="AuthorPresentation">

            <span className="skew"></span>

            <img ref={imgRef} src={authorJpg} alt="author portrait"/>
            <div>
                <p className="general-text">
                    J’ai toujours été émerveillé par la nature, 
                    une des seules choses sur terre qui me 
                    parait vraie, universelle et sans artifices. 
                    Nous vivons dans un monde ultra-connecté où 
                    contempler et vivre l’instant présent est 
                    devenu un privilège. C’est pourtant, à mon 
                    sens, la base même de la vie. S’imprégner 
                    du vivant, randonner en pleine nature est 
                    pour moi une formidable bouteille d’oxygène, 
                    un ré-enracinement profond à la vie.
                </p>

                <p className="general-text">
                    Durant mon Master d’ingénierie écologique, 
                    j’ai commencé à réaliser un rêve : Photographier 
                    la faune sauvage. Ce fut une véritable révélation 
                    et depuis ce jour je tente d’immortaliser des scènes 
                    qui m’ont fait vivre des instants magiques.  
                    A travers mon travail, je souhaite vous 
                    partager cette passion qui me rappelle que nous 
                    faisons partie de ce tout, de cet environnement 
                    naturel à qui nous devons respect et modestie.
                </p>
            </div>

            <div ref={paragraphRef}>
                <p className="general-text">
                    Je suis d’avantage à la recherche de rencontre 
                    qu’un chasseur d’image. La photo est une 
                    motivation supplémentaire afin de me lever 
                    avant l’aurore, marcher des kilomètres avec 
                    de forts dénivelés et attendre des heures. 
                    Ces moments hors du temps ainsi que mon 
                    émerveillement pour le vivant constituent 
                    le véritable message que je cherche à 
                    transmettre à travers mes clichés.
                </p>

                <p className="general-text">
                    La passion pour l’image m’a naturellement poussé 
                    vers de nouvelles perspectives. Ainsi, portraits 
                    et reportages sont venus compléter mon approche 
                    photographique. Mon attrait pour sensibiliser et 
                    transmettre m’a conduit au métier de journaliste, 
                    avec une affinité pour les sujets scientifiques 
                    et sociétaux.
                </p>

                <img src={miniSignaturePng} alt="mini signature"/>
            </div>

        </section>
    )
}