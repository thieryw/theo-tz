import React, {useRef, useEffect, useCallback, useState} from "react";
import {Cancel} from "../../iconComponents";
import "./Gallery.scss";



export const Gallery: React.FunctionComponent<{
    imageUrls: string[];
    imageTitles?: any;

}> = props =>{

    const {imageUrls, imageTitles} = props;
    const [zoomedImageNumber, setZoomedImageNumber] = useState<number | undefined>(undefined);




    return(
        <div className="Gallery">
            {
                imageUrls.map((url, index) => <Image handleClick={setZoomedImageNumber} imageTitle={
                    imageTitles ? imageTitles[index] : ""
                } imgIndex={index} key={index} imgUrl={url}/>)
            }

            {
                zoomedImageNumber === undefined ? 
                "" : <LightBox quitLightBox={setZoomedImageNumber} imgUrl={imageUrls[zoomedImageNumber]} />
            }


        </div>
    )
}


const Image: React.FunctionComponent<{
    imgUrl: string;
    imageTitle?: string;
    imgIndex?: number;
    handleClick?: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = props =>{

    const {imgUrl, imageTitle, handleClick, imgIndex} = props;

    const imgRef = useRef<HTMLImageElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    


    const __handleClick = useCallback(()=>{
        if(!handleClick || imgIndex === undefined){
            return;
        }

        handleClick(imgIndex);


    },[handleClick, imgIndex])

    const handleImgLoad = useCallback(()=>{
        if(!imgRef.current || !wrapperRef.current){
            return;
        }


        const imgStyle = imgRef.current.style;
        const wrapperStyle = wrapperRef.current.style;

        imgStyle.height = "250px";
        imgStyle.width = "auto";

        wrapperStyle.width = `${imgRef.current.clientWidth}px`;

        imgStyle.objectFit = "cover";
        imgStyle.width = "100%";
        imgStyle.height = "100%";
        imgStyle.verticalAlign = "middle";

    },[])





    return (
        

        <div onClick={__handleClick} ref={wrapperRef} className="image-wrapper">
            <img 
                onLoad={handleImgLoad} 
                width="300" 
                height="200" 
                ref={imgRef} 
                src={imgUrl} 
                alt={imageTitle ? imageTitle : "non descried"}
            />
            <div className="title">
                <p className="general-text">
                    {
                        imageTitle ? imageTitle : ""

                    }
                </p>
            </div>
        </div>
    )

}

const LightBox: React.FunctionComponent<{
    imgUrl: string;
    imgTitle?: string;
    quitLightBox: React.Dispatch<React.SetStateAction<number | undefined>>;

}> = props =>{
    const {imgUrl, imgTitle, quitLightBox} = props
    const lightBoxRef = useRef<HTMLDivElement>(null);


    useEffect(()=>{

        const displayLightBox = async ()=>{
            if(!lightBoxRef.current){
                return;
            }



            lightBoxRef.current.style.opacity = "1";


        }

        displayLightBox();


    })

    const __quitLightBox = useCallback(async()=>{
        if(!lightBoxRef.current){
            return;
        }
        lightBoxRef.current.style.opacity = "0";

        await new Promise<void>(resolve => setTimeout(resolve, 500));


        quitLightBox(undefined);


    },[quitLightBox]);


    return (
        <div ref={lightBoxRef} className="LightBox">
            <div onClick={__quitLightBox} className="close-button">
                <Cancel />
            </div>

            <div className="image-wrapper">
                <img src={imgUrl} alt={imgTitle ? imgTitle : "non descried"}/>
            </div>


        </div>
    )

}