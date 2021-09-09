import React, {useRef, memo} from "react";
import "./References.scss";
import brushDivider from "../media/brush1.png";
import {useAnimation} from "../../../customHooks/useAnimation";
import {useScroll} from "../../../customHooks/useScroll";




export const References = memo(()=>{

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
                    <h2>Références et distinctions</h2>
                    <img src={brushDivider} alt="brush divider"/>
                </div>

                <div>
                    <ul>
                        <ListItem 
                            text="Portfolio d'articles"
                            link={{
                                "href": "https://ginkio.com/theo-tz"
                            }}
                        />
                        {
                            [
                                "Prix du public- Festival de l'oiseau et de la Nature 2021",
                                "Premier prix catégorie meilleure photo - concours Anticlichés 2021",
                                "Premier prix catégorie Golden Hour & Deuxième prix catégorie Invisible/Visible – Concours ANUMA 2020",
                                "Prix “coup de cœur” – Concours photo du Salon De l’Écologie 2018"
                            ].map(text => <ListItem key={text} text={text} className="awards"/>)
                        }
                    </ul>

                </div>



            </div>

            <span className="skew"></span>
        </section>
    )
});

const { ListItem } = (() => {

    type Props = {
        className?: string;
        text: string;
        link?: {
            href: string;
            onClick?: ()=> void;
        }
    }

    const ListItem = memo((props: Props) => {
        const { text, link, className } = props;
        return (
            <li className={className}><p 
                onClick={
                    link === undefined ? 
                    undefined : 
                    link.onClick ?? 
                    (()=>(window.location.href = link.href))
                }
                className={`general-text ${link !== undefined ? "referenceLink" : ""}`}
            >
                {
                    text
                }

            </p></li>
        )
    });

    return {ListItem};
})();

