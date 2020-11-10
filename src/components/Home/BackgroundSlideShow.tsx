import React from "react";


const BackgroundSlideShow: React.FunctionComponent<{
    animationDuration: number;
    backgroundImageUrls: string[];

}> = (props)=>{

    const {animationDuration, backgroundImageUrls} = props;

    const refs: React.RefObject<HTMLDivElement>[] = [];


    for(let i = 0; i < backgroundImageUrls.length; i++){
        refs.push(React.createRef<HTMLDivElement>());
    }




    let index = backgroundImageUrls.length - 1;

    setInterval(()=>{

        let ref = refs[index];

        if(!ref || ! ref.current){
            return;
        }

        ref.current.style.opacity = "0";

        if(index === 0){
            index = backgroundImageUrls.length - 1;
            refs.forEach(ref =>{
                if(!ref || !ref.current){
                    return;
                }
                ref.current.style.opacity = "1";
            })
        }else{
            index--;
            ref = refs[index];

        }

    }, animationDuration)




    return(
        <div style={
            {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: -1
            }
        }>

            {
                backgroundImageUrls.map((url, index) =>{
                    return <div 
                        key={index} 
                        className={`background`}
                        id={`background${index}`}
                        ref={refs[index]}
                        style={{
                            backgroundImage: `url("${url}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            transition: `opacity 1500ms`
                        }}
                    >

                    </div>
                })
            }

        </div>
            


    )

}

export default BackgroundSlideShow;
