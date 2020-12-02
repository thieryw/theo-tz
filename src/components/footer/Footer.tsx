import React, {useRef, useCallback} from "react";
import signatureUrl from "../Home/media/signature.png";
import blackSignatureUrl from "./black-signature.png";
import {Facebook, Instagram} from "../../iconComponents/index";
import "./Footer.scss";



export const Footer: React.FunctionComponent<{
    routeName?: string;
}> = props=>{

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