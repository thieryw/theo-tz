import React, {useRef, useCallback} from "react";
import signatureUrl from "../Home/media/signature.png";
import {Facebook, Instagram} from "../../iconComponents/index";
import "./Footer.scss";



export const Footer: React.FunctionComponent<{
    backgroundImageUrl?: string;
}> = (props)=>{

    const {backgroundImageUrl} = props;
    const emailRef= useRef<HTMLParagraphElement>(null);
    const copyMessageRef = useRef<HTMLElement>(null);

    const handleEmailClick = useCallback(()=>{

        if(!emailRef.current || !copyMessageRef.current){
            return;
        }

        const range = document.createRange();
        range.selectNode(emailRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        document.execCommand("copy");
        window.getSelection()?.removeAllRanges();

        copyMessageRef.current.style.opacity = "100";

        setTimeout(()=>{
            if(!copyMessageRef.current){
                return;
            }

            copyMessageRef.current.style.opacity = "0";
        },5000)



    },[]);



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

                <span>
                    <p 
                        className="general-text"
                        ref={emailRef}
                        onClick={handleEmailClick}
                    >
                        theo.tzelepoglou@gmail.com
                    </p>

                    <em ref={copyMessageRef}>
                        Email copié dans le press papier !
                    </em>

                </span>

            </div>

            <p><span>Mentions légales</span> - Théo Tzélépoglou © 2020 - Designed by Zerillo</p>

        </footer>
    )


}