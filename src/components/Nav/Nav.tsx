import React, {useState, useRef, useCallback} from "react";
import "./Nav.scss";



export const Nav: React.FunctionComponent = ()=>{


    return (
        <nav>
            <ul>
                <ListElement name="ACCUEIL" subListElements={undefined}/>
                <ListElement name="PORTFOLIO" subListElements={
                    ["Naturalisme", "Portraits", "Evènements"]
                }/>
                <ListElement name="AUTEUR" subListElements={undefined}/>

                
            </ul>
        </nav>
    )
}


const ListElement: React.FunctionComponent<{
    name: string
    subListElements: undefined | string[];
}> = (props)=>{

    const {name, subListElements} = props;
    const [isSubListDisplayed, setIsSubListDisplayed] = useState(false);
    const subListRef = useRef<HTMLUListElement>(null);

    const styleSubList = useCallback(async ()=>{

        if(!subListRef || !subListRef.current){
            return;
        }
        setIsSubListDisplayed(!isSubListDisplayed);

        if(isSubListDisplayed){

            subListRef.current.style.display = "block";

            await new Promise<void>(resolve => setTimeout(resolve, 1));

            subListRef.current.style.opacity = "1";

            return;

        }

        subListRef.current.style.opacity = "0";
        
        await new Promise<void>(resolve => setTimeout(resolve, 300));

        subListRef.current.style.display = "none";


       

    },[isSubListDisplayed]);




    return(

        subListElements === undefined ? 
        <li>
            <div>
                <p>{name}</p>
                <div className="underline"></div>
            </div>
        </li> : 
        <li className="elem-with-subList">
            <div>
                <p
                    onClick={styleSubList}
                >
                    {name} <span style={{
                        position: "relative",
                        top: "-5px",
                        left: "10px"


                    }}>⌄</span>
                </p>

                <div className="underline"></div>

            </div>


            <ul ref={subListRef}>
                {
                    subListElements.map((elem, index) => <li key={index}><p>{elem}</p></li>)
                }
            </ul>
            
        </li>
    )




}