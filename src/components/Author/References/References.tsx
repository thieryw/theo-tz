import React, {useRef} from "react";
import "./References.scss";
import brushDivider from "../media/brush1.png";

import {useAnimation} from "../../../customHooks/useAnimation";
import {useScroll} from "../../../customHooks/useScroll";


export const References: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    useScroll(ref);

    useAnimation({
        "ref": childRef,
        "distanceFromViewPortToTrigger": -200,
        "fadeDuration": 800
    })


    return(
        <section ref={ref} className="References">
            <div ref={childRef}>
                <div>
                    <h2>Références</h2>
                    <img src={brushDivider} alt="brush divider"/>
                </div>

                <div>
                    <ul>
                        <li><p className="general-text">
                            Tzélépoglou, T. (2019). La Martinique : écrin de 
                            biodiversité riche et fragile. 
                            L’oiseau Mag n°134, Rubrique Ballade, 78-83.

                        </p></li>

                        <li><p className="general-text">
                            Marechal, P. Tzélépoglou, T. Dewynter, M. (2019). 
                            Définition de périmètres d’habitat favorables 
                            au Matoutou falaise (Caribena versicolor). 
                            48p. Biotope, DEAL Martinique.
                        </p></li>

                        <li><p className="general-text">
                            Marechal, P. Tzélépoglou, T. Dewynter, M. (2019). 
                            Définition de périmètres d’habitat favorables au 
                            Matoutou falaise (Caribena versicolor). 48p. 
                            Biotope, DEAL Martinique. 
                        </p></li>
                    </ul>

                    <ul>
                        <li><p className="general-text">
                            Dewynter M. & Tzélépoglou T. (2018). 
                            Le rocher de la Caravelle en Martinique : 
                            un important reposoir pour les oiseaux marins 
                            et un site de nidification de la Sterne bridée 
                            (Onychoprion anaethetus). Les cahiers de la 
                            fondation Biotope 20 : 1- 13.
                        </p></li>

                        <li><p className="general-text">
                            Tzélépoglou, T. Connen de Kerillis, T. (2018). 
                            Recherche d’une population d’Allobates chalcopis 
                            sur les Pitons du Carbet. 20p. Biotope, ONF, 
                            Deal Martinique. 
                        </p></li>

                        <img src={brushDivider} alt="brush divider"/>
                        <li><p className="general-text">
                            Prix “coup de cœur” – Concours photo du Salon De l’Écologie 2018
                        </p></li>

                        <li><p className="general-text">
                            1er prix catégorie Golden Hour & 2ème prix catégorie Invisible/Visible – Concours ANUMA 2020
                        </p></li>
                    </ul>
                </div>



            </div>

            <span className="skew"></span>
        </section>
    )
}