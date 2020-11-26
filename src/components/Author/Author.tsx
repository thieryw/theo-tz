import React,{useEffect} from "react";
import whiteBrushPng from "./media/white-brush.png";
import signaturePng from "./media/signature.png";
import whiteBrushVerticalPng from "./media/white-brush-vertical.png";
import "./Author.scss";

import {AuthorPresentation} from "./AuthorPresentation/AuthorPresentation";
import {PretentiousQuote} from "./PretentiousQuote/PretentiousQuote";
import {References} from "./References/References";


export const Author: React.FunctionComponent = ()=>{

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    return (
        <div className="Author">
            <header>

                <span className="background"></span>

                <div>
                    <h2>Qui suis-je ?</h2>
                    <img className="horizontal" src={whiteBrushPng} alt="white brush underline"/>
                    <img className="vertical" src={whiteBrushVerticalPng} alt="white brush vertical"/>
                </div>

                <img src={signaturePng} alt="logo"/>




            </header>

            <AuthorPresentation/>

            <PretentiousQuote/>

            <References/>





        </div>
    )

}