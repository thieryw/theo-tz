import React from "react";
import "./PretentiousQuote.scss";


export const PretentiousQuote: React.FunctionComponent = ()=>{

    return(
        <section className="PretentiousQuote">
            <div className="background"></div>
            <div>
                <p className="general-text">
                    The ultimate aim in life should be to fulfill to the 
                    utmost all that within our ability and to share 
                    that which is good and beautiful.
                </p>
                <h3>yehudi menuhin</h3>
            </div>
        </section>
    )

}