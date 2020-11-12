import React, {useReducer} from "react";
import {useEvt} from "evt/hooks";
import {Evt} from "evt";



export function useScroll(ref: React.RefObject<HTMLElement>): Evt<Event>{
    const [, forceUpdate] = useReducer(x=>x+1, 0);
    return useEvt(
            ctx => Evt.from(ctx, window, "scroll")
                .attach(
                    () => {
                        if (!ref.current) {
                            return false;
                        }


                        return ref.current.getBoundingClientRect().y < 
                        window.innerHeight && 
                        ref.current.getBoundingClientRect().y > -ref.current.clientHeight;
                    },
                    () => forceUpdate()
                ),
            []
    );

}