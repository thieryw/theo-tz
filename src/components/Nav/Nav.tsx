import React, {useState, useRef, useCallback, useEffect} from "react";
import {useWindowResize} from "../../customHooks/useWindowResize";
import {Menu} from "../../iconComponents/index";
import "./Nav.scss";
import {routes} from "../../router";


export const Nav: React.FunctionComponent<{
    routeName: string | boolean;
}> = props=>{

    const {routeName} = props;

    const [isMenuUnrolled, setIsMenuUnrolled] = useState(false);

    const menuRef = useRef<HTMLUListElement>(null);

    useWindowResize(()=>{
        if(!menuRef.current){
            return;
        }

        setIsMenuUnrolled(false);

        if(window.innerWidth > 500){
            menuRef.current.style.opacity = "1";
            menuRef.current.style.pointerEvents = "stroke";

            return;

        }


        menuRef.current.style.opacity = "0";
        menuRef.current.style.pointerEvents = "none";

        


    });

    const toggleMenu = useCallback(()=>{

        if(!menuRef.current){
            return;
        }

        menuRef.current.style.opacity = isMenuUnrolled ? "0" : "100";
        menuRef.current.style.pointerEvents = isMenuUnrolled ? "none" : "stroke";
        setIsMenuUnrolled(!isMenuUnrolled);

    },[isMenuUnrolled]);


    useEffect(()=>{
        if(!menuRef.current){
            return;
        }

        if(window.innerWidth > 500){
            return;
        }

        menuRef.current.style.opacity = "0";
        menuRef.current.style.pointerEvents = "none";

    },[])


    return (
        <nav className={`${routeName ? routeName : ""}-nav`} style={{
            zIndex: 3
        }}>
            <div onClick={toggleMenu}><Menu /></div>

            <ul ref={menuRef}>
                <ListElement route={routes.home} name="ACCUEIL"/>
                <ListElement name="PORTFOLIO" subListElements={
                    ["Naturalisme", "Portraits", "Evènements"]

                }
                />
                <ListElement route={routes.author} name="AUTEUR"/>

                
            </ul>
        </nav>
    )
}


const ListElement: React.FunctionComponent<{
    name: string
    subListElements?: string[];
    route?: any;
}> = (props)=>{

    const {name, subListElements, route} = props;
    const [isSubListExpanded, setIsSubListExpanded] = useState(false);

    const subRoutes = [
        routes.france,
        routes.portraits,
        routes.events
    ]

    const subListRef = useRef<HTMLUListElement>(null);

    useWindowResize(()=>{
        if(!subListRef.current){
            return;
        }


        subListRef.current.style.opacity = "0";
        setIsSubListExpanded(false);

        if(window.innerWidth <= 500){
            subListRef.current.style.height = "0";
            return;
        }

        subListRef.current.style.height = "120px";



    })

    const toggleSubList = useCallback(()=>{
        if(!subListRef.current){
            return;
        }


        subListRef.current.style.opacity = isSubListExpanded ? "0" : "100";
        subListRef.current.style.pointerEvents = isSubListExpanded ? "none" : "stroke";

        if(window.innerWidth <= 500){
            subListRef.current.style.height = isSubListExpanded ? "0" : "120px";
        }

        setIsSubListExpanded(!isSubListExpanded);


    },[isSubListExpanded]);

    useEffect(()=>{
        if(!subListRef.current){
            return;
        }

        subListRef.current.style.pointerEvents = "none";

        if(window.innerWidth <= 500){
            subListRef.current.style.opacity = "0";
            subListRef.current.style.height = "0";
        }
    },[])

    

    



    return(

        subListElements === undefined ? 
        <li {...route().link}>
            <div>
                <p>{name}</p>
                <div className="underline"></div>
            </div>
        </li> : 
        <li onClick={toggleSubList} className="elem-with-subList">
            <div>
                <p
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
                    subListElements.map((elem, index) => <li 
                    {...subRoutes[index]().link}
                    key={index}>
                        <p>{elem}</p>
                    </li>)
                }
            </ul>
            
        </li>
    )




}