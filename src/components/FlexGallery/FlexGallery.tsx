import React, { useRef, useEffect, useCallback, useState } from "react";
import { ReactComponent as Cancel } from "../../assets/SVG/cancel.svg";
import { ReactComponent as Next } from "../../assets/SVG/next.svg";

import "./FlexGallery.scss";
import { useLazyImageLoad } from "../../customHooks/useLazyImageLoad";

import type { Props as PortfolioProps } from "components/Portfolio";


export const Gallery: React.FunctionComponent<{
    
    images: PortfolioProps["assets"][string]["parsedImages"];
    initialImageHeight?: number;

}> = props => {

    const { images, initialImageHeight } = props;
    const [zoomedImageNumber, setZoomedImageNumber] = useState<number | undefined>(undefined);


    useLazyImageLoad({});




    return (
        <div className="Gallery">
            {

                images.map((image, index) => <Image
                    imgUrl={image.url}
                    imageTitle={image.title ? image.title : ""}
                    imgIndex={index}
                    initialImageHeight={initialImageHeight ? initialImageHeight : undefined}
                    handleClick={setZoomedImageNumber}
                    key={image.url}
                />)
            }

            {
                zoomedImageNumber === undefined ?
                    "" : <LightBox
                        imgIndex={zoomedImageNumber}
                        galleryLength={images.length}
                        setImageIndex={setZoomedImageNumber}
                        images={images}
                       
                    />
            }


        </div>
    )
}


const Image: React.FunctionComponent<{
    imgUrl: string;
    imageTitle?: string;
    imgIndex?: number;
    handleClick?: React.Dispatch<React.SetStateAction<number | undefined>>;
    initialImageHeight?: number;
}> = props => {

    const { imgUrl, imageTitle, handleClick, imgIndex, initialImageHeight } = props;

    const imgRef = useRef<HTMLImageElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);




    const __handleClick = useCallback(() => {
        if (!handleClick || imgIndex === undefined) {
            return;
        }

        handleClick(imgIndex);


    }, [handleClick, imgIndex])

    const handleImgLoad = useCallback(() => {
        if (!imgRef.current || !wrapperRef.current) {
            return;
        }


        const imgStyle = imgRef.current.style;
        const wrapperStyle = wrapperRef.current.style;

        imgStyle.height = `${initialImageHeight ? initialImageHeight : 250}px`;
        imgStyle.width = "auto";

        wrapperStyle.width = `${imgRef.current.clientWidth}px`;

        imgStyle.objectFit = "cover";
        imgStyle.width = "100%";
        imgStyle.height = "100%";
        imgStyle.verticalAlign = "middle";

    }, [initialImageHeight]);


    return (


        <div onClick={__handleClick} ref={wrapperRef} className="image-wrapper">
            <img
                onLoad={handleImgLoad}
                width="300"
                height="200"
                ref={imgRef}
                data-src={imgUrl}
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
    images: PortfolioProps["assets"][string]["parsedImages"];
    setImageIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
    galleryLength: number;
    imgIndex: number;

}> = props => {
    const {setImageIndex, imgIndex, galleryLength, images } = props
    const lightBoxRef = useRef<HTMLDivElement>(null);





    useEffect(() => {

        (async () => {
            if (!lightBoxRef.current) {
                return;
            }

            await new Promise<void>(resolve => setTimeout(resolve, 100));



            lightBoxRef.current.style.opacity = "1";
        })();






    }, [])

    const quitLightBox = useCallback(async () => {
        if (!lightBoxRef.current) {
            return;
        }
        lightBoxRef.current.style.opacity = "0";

        await new Promise<void>(resolve => setTimeout(resolve, 500));


        setImageIndex(undefined);


    }, [setImageIndex]);

    const prevNextImage = useCallback((direction: "prev" | "next") => {
        if (direction === "next") {
            if (imgIndex === galleryLength - 1) {
                setImageIndex(0);
                return;
            }

            setImageIndex(imgIndex + 1);
            return;
        }

        if (imgIndex === 0) {
            setImageIndex(galleryLength - 1);
            return;
        }

        setImageIndex(imgIndex - 1);

    }, [galleryLength, imgIndex, setImageIndex]);

    const prevNextImageWithKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {


        if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
            return;
        }


        if (e.key === "Escape") {
            quitLightBox();
            return;
        }

        if (e.key === "ArrowRight") {
            prevNextImage("next");
            return;
        }


        prevNextImage("prev");




    }, [prevNextImage, quitLightBox]);



    return (
        <div onLoad={() => lightBoxRef.current?.focus()} tabIndex={0} onKeyDown={e => prevNextImageWithKey(e)} ref={lightBoxRef} className="LightBox">
            <div onClick={quitLightBox} className="close-button">
                <Cancel />
            </div>

            <div onClick={() => prevNextImage("prev")} className="prev-button">
                <Next />
            </div>
            <div onClick={() => prevNextImage("next")} className="next-button">
                <Next />
            </div>

            <div className="image-wrapper">
                {
         
                    images.map((image, index)=> <LightBoxImg
                        imgUrl={image.url}
                        imgTitle={image.title ? image.title : undefined}
                        isCurrentlyForShow={index === imgIndex}
                        key={image.url}

                    />)
                }
            </div>





        </div>
    )

}



const LightBoxImg: React.FunctionComponent<{
    imgUrl: string;
    imgTitle?: string;
    isCurrentlyForShow: boolean;
}> = props => {
    const { imgUrl, imgTitle, isCurrentlyForShow } = props;
    const ref = useRef<HTMLImageElement>(null);
    const LoadingRef = useRef<HTMLDivElement>(null);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {



        (async () => {
            if (!ref.current || !LoadingRef.current) {
                return;
            }

            const { style: imgStyle } = ref.current;
            const { style: loadingStyle } = LoadingRef.current;

            if (!isCurrentlyForShow) {
                imgStyle.display = "none";
                imgStyle.opacity = "0.2";
                loadingStyle.display = "none";

                return;
            }

            if (isImageLoading) {
                loadingStyle.display = "block";
                imgStyle.display = "none";
                return;
            }

            loadingStyle.display = "none";

            imgStyle.display = "block";

            await new Promise<void>(resolve => setTimeout(resolve, 20));



            imgStyle.opacity = "1";


        })();






    }, [isCurrentlyForShow, isImageLoading]);



    return (
        <>
            <div ref={LoadingRef} className="loader">...loading</div>
            <img
                ref={ref}
                src={imgUrl}
                alt={imgTitle ? imgTitle : "non descried"}
                onLoad={() => setIsImageLoading(false)}
            />
        </>

    )
}