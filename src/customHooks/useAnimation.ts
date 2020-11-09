import React, {useEffect} from "react";

export function useAnimation(params: {
    parentRef: React.RefObject<HTMLElement>;
    ref: React.RefObject<HTMLElement>;
    orientation: "horizontal" | "vertical"
    offset: number;
}){

    const {parentRef, ref, orientation, offset} = params;

    const translate = orientation === "horizontal" ? `translateX(${offset}px)` :
                `translateY(${offset}px)`;


    useEffect(()=>{

        if(!parentRef || !parentRef.current || !ref || !ref.current){
            return;
        }

        const bounding = parentRef.current.getBoundingClientRect();
        if(bounding.y < window.innerHeight){
            ref.current.style.opacity = "1";
            ref.current.style.transform = 
                orientation === "horizontal" ? "translateX(0)" : "translateY(0)";

            return;
        }

        ref.current.style.opacity = "0";
        ref.current.style.transform = translate;

    })

}