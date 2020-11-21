import React, {useRef} from "react";
import "./References.scss";
import brushDivider from "../media/brush1.png";
import {useAnimation} from "../../../customHooks/useAnimation";
import {useScroll} from "../../../customHooks/useScroll";
import {useAsync, UseAsyncReturn} from "react-async-hook";
import {fetchTextData} from "../../../logic";
//@ts-ignore
import text from "./texts/references.txt";

fetch("https://docs.google.com/document/d/1xgbu0xTOB_BcM2e9zpC6R8zum2TmON3494GZxG4tbus/edit").then(
    response =>{
        return response.text();

    }
).then(
    data =>{
        console.log(data);
    }
)


export const References: React.FunctionComponent = ()=>{

    const ref = useRef<HTMLElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const asyncExtractText = useAsync(fetchTextData, [text]);

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
                        {
                            [0,1,2].map(
                                textNumber => 
                                <ListItem 
                                    asyncFunction={asyncExtractText}
                                    textNumber={textNumber}
                                    key={textNumber}
                                />
                            )
                        }
                    </ul>

                    <ul>
                        {
                            [3,4].map(
                                textNumber => 
                                <ListItem 
                                    asyncFunction={asyncExtractText}
                                    textNumber={textNumber}
                                    key={textNumber}
                                />
                            )
                        }

                        <img src={brushDivider} alt="brush divider"/>
                 
                        {
                            [5,6].map(
                                textNumber => 
                                <ListItem 
                                    asyncFunction={asyncExtractText}
                                    textNumber={textNumber}
                                    key={textNumber}
                                />
                            )
                        }
                    </ul>
                </div>



            </div>

            <span className="skew"></span>
        </section>
    )
}


const ListItem: React.FunctionComponent<{
    textNumber: number;
    asyncFunction: UseAsyncReturn<string[], [url: any]>;

}> = props =>{
    const {asyncFunction, textNumber} = props;
    return(
        <li><p className="general-text">
            {
                asyncFunction.loading || !asyncFunction.result ?
                "Chargement..." : asyncFunction.result[textNumber]
            }

        </p></li>
    )
}