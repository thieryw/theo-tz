import React, {useEffect} from "react";


export function useAnimation(params: {
    parentRef?: React.RefObject<HTMLElement>;
    ref: React.RefObject<HTMLElement>;
    offset?: number;
    direction? : "vertical" | "horizontal";
    animationDuration? : number;
    fadeDuration?: number;
    animationDelay?: number;
    distanceFromViewPortToTrigger?: number;

}){

    const {
        parentRef, 
        ref, 
        offset, 
        direction, 
        animationDuration, 
        fadeDuration,
        animationDelay,
        distanceFromViewPortToTrigger
    } = params;

    let translate: string | undefined = (()=>{
        if(!offset){
            return undefined;
        }
        return direction === "horizontal" ? `translateX(${offset}px)` :
                    `translateY(${offset}px)`;
    })();


    const distanceToTrigger = distanceFromViewPortToTrigger ?
    distanceFromViewPortToTrigger : 0;
       

    useEffect(()=>{
        if(!ref || !ref.current){
            return;
        }

        const bounding = !parentRef || !parentRef.current ?
        ref.current.getBoundingClientRect() : 
        parentRef.current.getBoundingClientRect();

        


        ref.current.style.transition = 
        `transform ${animationDuration ? animationDuration : 800}ms, 
        opacity ${fadeDuration ? fadeDuration : 300}ms`;
        
        if(bounding.y < window.innerHeight + distanceToTrigger){
            return;
        }

        ref.current.style.opacity = "0";

        if(!translate){
            return;
        }

        ref.current.style.transform = translate;
        
    },[
        animationDuration, 
        distanceToTrigger, 
        fadeDuration, 
        parentRef, 
        ref, 
        translate
    ]);


    useEffect(() => {
        

        const triggerAnimation = async ()=>{

            if(animationDelay){
                await new Promise<void>(resolve => setTimeout(resolve, animationDelay));
            }

            if(!ref || !ref.current){

                return;
            }

            const bounding = !parentRef || !parentRef.current ? ref.current.getBoundingClientRect() :
            parentRef.current.getBoundingClientRect();

            if(bounding.y < window.innerHeight + distanceToTrigger){

                ref.current.style.opacity = "1";


                if(translate){
                    ref.current.style.transform = direction === "horizontal" ?
                    "translateX(0)" : "translateY(0)";

                }



                return;
            }

            ref.current.style.opacity = "0";

            if(!translate){
                return;
            }

            ref.current.style.transform = translate;


        }

        triggerAnimation();

    });




}