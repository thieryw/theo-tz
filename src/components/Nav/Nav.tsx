import React, {useState, useRef, useCallback, useEffect, useReducer} from "react";
import "./Nav.scss";



export const Nav: React.FunctionComponent<{
    parentRef?: React.RefObject<HTMLElement>;
}> = (props)=>{

    const {parentRef} = props

    return (
        <nav style={{
            zIndex: 3
        }}>
            <ul>
                <ListElement name="ACCUEIL"/>
                <ListElement name="PORTFOLIO" subListElements={
                    ["Naturalisme", "Portraits", "Evènements"]

                }
                parentRef={parentRef}
                />
                <ListElement name="AUTEUR"/>

                
            </ul>
        </nav>
    )
}


const ListElement: React.FunctionComponent<{
    name: string
    subListElements?: string[];
    parentRef?: React.RefObject<HTMLElement>;
}> = (props)=>{

    const {name, subListElements, parentRef} = props;
    const [isSubListDisplayed, setIsSubListDisplayed] = useState(false);
    const subListRef = useRef<HTMLUListElement>(null);
    const [, forceUpdate] = useReducer(x=>x+1, 0);


    const hideSubList = useCallback(async ()=>{
        if(!subListRef || !subListRef.current){
            return;
        }

        if(!isSubListDisplayed){
            return;
        }

        subListRef.current.style.opacity = "0";
        
        await new Promise<void>(resolve => setTimeout(resolve, 300));

        subListRef.current.style.display = "none";

        setIsSubListDisplayed(!isSubListDisplayed);






    },[isSubListDisplayed])



    const toggleSubList = useCallback(async ()=>{

        if(!subListRef || !subListRef.current){
            return;
        }


        if(isSubListDisplayed){

            hideSubList();
            return;


        }

        subListRef.current.style.display = "block";

        await new Promise<void>(resolve => setTimeout(resolve, 1));

        subListRef.current.style.opacity = "1";

        setIsSubListDisplayed(!isSubListDisplayed);

       

    },[hideSubList, isSubListDisplayed]);

/*    useEffect(()=>{
        if(!parentRef || !parentRef.current || !isSubListDisplayed){
            return;
        }

        parentRef.current.onclick = ()=>{
            hideSubList();
        }
    }, [isSubListDisplayed, hideSubList])*/

    

    



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
                    onClick={toggleSubList}
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