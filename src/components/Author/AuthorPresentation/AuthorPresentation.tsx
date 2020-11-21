import React, {useRef} from "react";
import {fetchTextData} from "../../../logic";
import {useAsync, UseAsyncReturn} from "react-async-hook";
import "./AuthorPresentation.scss";
import authorJpg from "../media/author-portrait-min.jpg";
import miniSignaturePng from "../media/mini-signature.png";
import {useAnimation} from "../../../customHooks/useAnimation";
import {useScroll} from "../../../customHooks/useScroll";
//@ts-ignore
import text from  "./texts/authorPresentation.txt";


export const AuthorPresentation: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const paragraphRef = useRef<HTMLDivElement>(null);
    const asyncExtractText = useAsync(fetchTextData, [text]);
   

    useScroll(ref);

    useAnimation({
        "ref": imgRef,
        "distanceFromViewPortToTrigger": -100,
        "offset": 200
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
                {
                    [0,1].map(
                        textNumber => 
                        <Paragraph 
                            key={textNumber}
                            textNumber={textNumber} 
                            asyncFunction={asyncExtractText} 
                        />
                    )
                }
            </div>

            <div ref={paragraphRef}>

                {
                    [2,3].map(
                        textNumber => 
                        <Paragraph 
                            key={textNumber}
                            textNumber={textNumber} 
                            asyncFunction={asyncExtractText}
                        />
                    )
                }

                <img src={miniSignaturePng} alt="mini signature"/>
            </div>

        </section>
    )
}


const Paragraph: React.FunctionComponent<{
    textNumber: number;
    asyncFunction: UseAsyncReturn<string[], [url: any]>;

}> = props =>{
    const {textNumber, asyncFunction} = props;

    return(
        <p className="general-text">
            {

                asyncFunction.loading || !asyncFunction.result ? 
                "Chargement..." : asyncFunction.result[textNumber]

            }
        </p>
    )

}