import React, {useCallback, useState, useRef, useEffect} from "react";
import {makeStyles, createStyles} from "@material-ui/core";
import {Evt} from "evt";
import {useEvt} from "evt/hooks";

const evtActiveSubMenu = Evt.create<{index: number | undefined}>
    ({"index": undefined});

const evtClickedAway = Evt.create();


window.addEventListener("click", (event)=>{
    const menuElements = document.getElementsByClassName("menu-element");

    for(let i = 0; i < menuElements.length; i++){
        if(menuElements[i] === event.target){
            return;
        }
    }
        

    evtClickedAway.post();
})



const useStyle = makeStyles(

    (theme)=> createStyles<"item" | 
                      "menu" | 
                      "sub-menu" | 
                      "sub-menu-item" |
                      "menu-text" |
                      "sub-menu-text", {isSubMenuDisplayed?: boolean}
        >({

        "item": ()=>({
            listStyle: "none",
            margin: "0 35px 0 35px",
            marginBlockStart: "0",
            
        }),
        "menu": ()=>({
            display: "flex",
            color: "white",
            justifyContent: "center",
            position: "absolute",
            width: "100vw",
            zIndex: 3,
            paddingInlineStart: 0,
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                backgroundColor: "rgba(29,26,26,.87)"
            }
        }),
        "sub-menu": ({isSubMenuDisplayed})=>({
            opacity: `${isSubMenuDisplayed ? "1" : "0"}`,
            transition: "opacity 500ms",
            overflow: "hidden",
            paddingInlineStart: 0,
            backgroundColor: "rgba(63, 55, 55, .61)",
            borderRadius: "2px",
            marginTop: "30px",
            [theme.breakpoints.down("sm")]: {
                
                opacity: 1,
                height: "auto",
                transition: "max-height 300ms"

            }


        }),
        "sub-menu-item": ()=>({
            listStyle: "none",
            padding: "0 20px 0 10px"
        }),
        "menu-text": ()=>({
            cursor: "pointer",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "0.9em",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            "& div": {
                width: "100%",
                transform: "scaleX(0)",
                height: "1px",
                borderTop: "solid white 1px",
                pointerEvents: "none",
                transition: "transform 200ms",
                [theme.breakpoints.down("sm")]: {
                    display: "none"
                }

            },
            "&:hover": {
                "& div": {
                    transform: "scaleX(1)"
                }
            }
        }),
        "sub-menu-text": ()=>({
            cursor: "pointer",
            fontFamily: "'Open Sans', sans-serif",
            fontStyle: "italic",
            fontSize: "0.9em",
            letterSpacing: "0.1em"


        })

            

    })
)





type Item = {
    routeName: any;
    subMenu?: any[];
}

export type MenuProps = {
    menuItems: Item[];
}


export const NavMenu = (props: MenuProps) =>{
    const {menuItems} = props;

    const classes = useStyle({});


    return(
        <ul className={classes.menu}>
            {
                menuItems.map((item, index) => <MenuItem 
                    index={index} 
                    item={item}
                    key={item.subMenu === undefined ? 
                        item.routeName.name : item.routeName
                    }
                />) 
            }

        </ul>

    )
}

type ItemProps = {
    item: Item;
    index: number;
}




const MenuItem = (props: ItemProps)=>{

    const {item, index} = props;

    const [isSubMenuDisplayed, setIsSubMenuDisplayed] = 
    useState<boolean | undefined>(item.subMenu === undefined ? undefined : false);

    const subMenuRef = useRef<HTMLUListElement>(null);


    useEffect(()=>{
        if(!subMenuRef.current){
            return;
        }

        subMenuRef.current.style.pointerEvents = 
            `${!isSubMenuDisplayed ? "none" : "unset"}`;

        if(window.screen.width <= 959.95){
            subMenuRef.current.style.maxHeight = 
                `${!isSubMenuDisplayed ? "0" : "600px"}`;
        }
        

    })




    const toggleSubMenu = useCallback(()=>{

        if(isSubMenuDisplayed === undefined){
            return;
        }

        setIsSubMenuDisplayed(!isSubMenuDisplayed);
                
        evtActiveSubMenu.post({
            "index": index,
        });

    }, [index, isSubMenuDisplayed])

    useEvt(ctx=>{
        evtActiveSubMenu.attach(ctx, ()=>{
            if(evtActiveSubMenu.state.index !== index && isSubMenuDisplayed){
                setIsSubMenuDisplayed(false);
            }
        })
    },[isSubMenuDisplayed])


    useEvt(ctx =>{
        evtClickedAway.attach(ctx, ()=>{
            if(isSubMenuDisplayed){
                setIsSubMenuDisplayed(false);
            }
        })

    },[isSubMenuDisplayed])


    const classes = useStyle({
        isSubMenuDisplayed: isSubMenuDisplayed === undefined ?
        true : isSubMenuDisplayed
    })




    return (
            <li className={classes.item} >
                {
                    item.subMenu === undefined ? <div className={classes["menu-text"]}>
                        <p 

                            {...item.routeName().link}
                        >
                        {item.routeName.name}
                    </p>
                        <div></div>
                    </div> : 
                    <div className={classes["menu-text"]}>
                        <p className="menu-element" onClick={toggleSubMenu}>
                            {
                                item.routeName
                            }
                            <span style={{
                                position: "relative",
                                top: "-4px",
                                left: "15px"


                            }}>⌄</span>
                        </p>

                        <div></div>
                    </div>
                }

                
                {
                    item.subMenu === undefined ? "" : 
                    <ul ref={subMenuRef} className={classes["sub-menu"]}>
                        {
                            item.subMenu.map(subItem => <li className={classes["sub-menu-item"]} key={
                                subItem.name
                            }>
                                <p className={classes["sub-menu-text"]} {...subItem().link}>
                                    <span style={{textTransform: "uppercase"}}>
                                        {
                                            subItem.name.charAt(0)
                                        }
                                    </span>
                                    {
                                        subItem.name.substring(1)
                                    }
                                </p>
                            </li>)
                        }
                    </ul>
                }
            </li>
    )
}

