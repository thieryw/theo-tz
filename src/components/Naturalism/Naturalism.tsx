import React from "react";
import logoUrl from "./media/signature.png";
import "./Naturalism.scss";
//@ts-ignore
import text from "./Texts/text.txt";
import brush from "./media/brush1.png";

import {fetchTextData} from "../../logic";
import {useAsync} from "react-async-hook";
import {France} from "./France/France";

export const Naturalism: React.FunctionComponent = ()=>{

    const asyncGetText = useAsync(fetchTextData, [text]);

    return(
        <div className="Naturalism">
            <header>
                <img src={logoUrl} alt="logo"/>
                <h3>naturalism</h3>

            </header>

            <section>
                <div>
                    <p className="general-text">
                        {
                            asyncGetText.loading || !asyncGetText.result ?
                            "Chargement..." :  asyncGetText.result
                        }
                    </p>

                    <img src={brush} alt="brush divider"/>

                    <France />

                </div>
            </section>
        </div>


        
    )
}


