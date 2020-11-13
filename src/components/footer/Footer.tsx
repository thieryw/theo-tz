import React from "react";
import signatureUrl from "../Home/media/signature.png";
import {Facebook, Instagram} from "../../iconComponents/index";
import "./Footer.scss";



export const Footer: React.FunctionComponent<{
    backgroundImageUrl?: string;
}> = (props)=>{

    const {backgroundImageUrl} = props;

    console.log(backgroundImageUrl);


    return(
        <footer style={{
            position: "relative"

        }}>
            <div className="background" style={
                {
                    backgroundImage: backgroundImageUrl ? `url("${backgroundImageUrl}")` : "",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top:"0",
                    left:"0",
                    filter:"brightness(60%)",
                    zIndex: -200
          
                }
            }>

            </div>
            <div>
                <img src={signatureUrl} alt="signature"/>
                <div>
                    <a href="https://www.facebook.com/theotzelepoglouphotography/">
                        <Facebook />
                    </a>

                    <a href="https://www.instagram.com/theo_tzele/">
                        <Instagram />
                    </a>

                </div>

                <form>

                    <input type="text" placeholder="Prénom/nom"/>
                    <input type="text" placeholder="email"/>
                    <textarea placeholder="Votre message"></textarea>

                    <input className="submit" type="submit" value="envoyer"/>

                </form>


            </div>

            <p><span>Mentions légales</span> - Théo Tzélépoglou © 2020 - Designed by Zerillo</p>

        </footer>
    )


}