import React from "react";
import signatureUrl from "../Home/media/signature.png";
import blackSignatureUrl from "./black-signature.png";
import {ReactComponent as Facebook} from "../../assets/SVG/facebook.svg";
import {ReactComponent as Instagram} from "../../assets/SVG/instagram.svg";
import {ReactComponent as Email} from "../../assets/SVG/email.svg";
import "./Footer.scss";



export const Footer: React.FunctionComponent<{
    routeName?: string;
}> = props=>{

    

    return(
        <footer className={props.routeName ? `${props.routeName}-footer` : ""}>
            <div className="background">

            </div>
            <div>
                <img className="white-signature" src={signatureUrl} alt="signature"/>
                <img className="black-signature" src={blackSignatureUrl} alt="black-signature"/>
                <div>
                    <a href="https://www.facebook.com/theotzelepoglouphotography/">
                        <Facebook />
                    </a>

                    <a href="https://www.instagram.com/theo_tzele/">
                        <Instagram />
                    </a>

                    <a href="mailto:theo.tzelepoglou@gmail.com">
                        <Email />
                    </a>

                </div>
                

            </div>

            <p><span>Mentions légales</span> - Théo Tzélépoglou © 2020 - Designed by Zerillo</p>

        </footer>
    )


}