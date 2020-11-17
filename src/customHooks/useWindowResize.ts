import {useEvt} from "evt/hooks";
import {Evt} from "evt";



export function useWindowResize(
    callback: CallableFunction, 
){
    useEvt(
        ctx => Evt.from(ctx, window, "resize")
            .attach(
                () => callback()
            ),
        []
    );
}