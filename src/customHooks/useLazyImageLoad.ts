import {useEffect} from "react";


export const useLazyImageLoad = (params: {
    threshold?: number;
    rootMargin?: string;
})=>{

    const {threshold, rootMargin} = params;

    

    useEffect(()=>{
        const images = document.querySelectorAll("[data-src]");

        const imgOptions = {
            threshold: threshold === undefined ? 0 : threshold,
            rootMargin: rootMargin === undefined ? "0px 0px 200px 0px" : rootMargin
        };

        const preloadImage = (image: any) =>{
            const src = image.getAttribute("data-src");
            if(!src){
                return;
            }

            image.src = src

        }

        const imageObserver = new IntersectionObserver((entries, imageObserver)=>{
            entries.forEach(entry =>{
                if(!entry.isIntersecting){
                    return;
                }

                preloadImage(entry.target);
                imageObserver.unobserve(entry.target);
            })

        }, imgOptions)

        images.forEach(image=>{
            imageObserver.observe(image);
        })

    },[rootMargin, threshold]);



}