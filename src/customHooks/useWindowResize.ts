import React, {useReducer} from "react";
import {useEvt} from "evt/hooks";
import {Evt} from "evt";



export function useWindowResize(
    callback: CallableFunction, 
){
    const [, forceUpdate] = useReducer(x=>x+1, 0);
    useEvt(
        ctx => Evt.from(ctx, window, "resize")
            .attach(
                () => callback()
            ),
        []
    );
}