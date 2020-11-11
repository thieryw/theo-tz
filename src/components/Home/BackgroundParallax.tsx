import React, { useRef, useEffect, useReducer } from "react";
import { useEvt } from "evt/hooks";
import { Evt } from "evt";
import { assert } from "evt/tools/typeSafety/assert";


export const BackgroundParallax: React.FunctionComponent<{
    imageUrl: string;
}> = (props) => {

    const { imageUrl } = props;

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const ref = useRef<HTMLDivElement>(null);

    const evtScrolled = useEvt(
        ctx => Evt.from(ctx, window, "scroll")
            .attach(
                () => {
                    if (!ref || !ref.current) {
                        return false;
                    }

                    return ref.current.getBoundingClientRect().y < window.innerHeight;
                },
                () => forceUpdate()
            ),
        []
    );



    useEffect(() => {

        assert(ref.current !== null);

        const bounding = ref.current?.getBoundingClientRect();

        if (bounding.y >= window.innerHeight) {
            return;
        };

        ref.current.style.backgroundPositionY = 
            `${(bounding.y - window.innerHeight) / 10 + 50}px`;

        console.log(evtScrolled.postCount);

    }, [evtScrolled.postCount])

    return (

        <div
            className="background-with-parallax"
            ref={ref}
            style={{
                backgroundImage: `url("${imageUrl}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
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

