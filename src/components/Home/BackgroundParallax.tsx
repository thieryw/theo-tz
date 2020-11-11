import React, {useRef, useEffect, useReducer} from "react";
import {useEvt} from "evt/hooks";
import {evtScrolled} from "./Home";



export const BackgroundParallax: React.FunctionComponent<{
    imageUrl: string;
}> = (props)=>{
    
    const {imageUrl} = props;

    const [, forceUpdate] = useReducer(x=>x+1, 0);
    const ref = useRef<HTMLDivElement>(null);
    let bounding = (ref && ref.current) && ref.current.getBoundingClientRect();

    useEvt(ctx =>{
        evtScrolled.attach(
            ()=> {
                if(!ref || !ref.current){
                    return false;
                }

                return ref.current.getBoundingClientRect().y < window.innerHeight;
            },
            ctx,
            ()=> forceUpdate()
        );


    },[])


    useEffect(()=>{


        if(!ref || !ref.current || !bounding){
            return;
        }

        if(bounding.y < window.innerHeight){
            ref.current.style.backgroundPositionY = `${
                (-(window.innerHeight - bounding.y) / 10) + 50}px`;
            
        console.log(evtScrolled.postCount);

        };

        
        

    })

    return(

        <div 
            className="background-with-parallax"
            ref={ref}
            style={{
                backgroundImage: `url("${imageUrl}")`,
                backgroundSize: "cover",
                backgroundRepeat:"no-repeat",
                backgroundAttachment: "fixed",
                backgroundPositionX: "center",
                backgroundPositionY: "50px",
                width: "100vw",
                height: "400px"

            }}
        >

        </div>

    )

}

