import React, {useCallback, useState, useRef} from "react";
import {makeStyles, createStyles} from "@material-ui/core";
import {Evt} from "evt";
import {useEvt} from "evt/hooks";
import {ReactComponent as Menu} from "./assets/menu.svg";
import {useWindowResize} from "../../customHooks/index";

type Item = {
    routeName: any;
    subMenu?: any[];
}

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
                      "sub-menu-text" |
                      "menu-icon", {
                          isSubMenuDisplayed?: boolean;
                          item?: Item;
                          isMenuDisplayed?: boolean;
                          mobileMenuButtonPosition?: MenuProps["mobileMenuButtonPosition"];
                        }
        >({

        "item": ()=>({
            listStyle: "none",
            margin: "0 35px 0 35px",
            marginBlockStart: "0",
            [theme.breakpoints.down("xs")]: {
                margin:"0"

            }



            
        }),
        "menu": ({isMenuDisplayed})=>({
            display: "flex",
            color: "white",
            justifyContent: "center",
            position: "absolute",
            width: "100vw",
            zIndex: 3,
            paddingInlineStart: 0,
            opacity: window.innerWidth > 600 ? 1 : isMenuDisplayed ? "1" : "0",
            transition: "opacity 500ms",
            pointerEvents: window.innerWidth > 600 || isMenuDisplayed ? "unset" : 
            "none",
            [theme.breakpoints.down("xs")]: {
                flexDirection: "column",
                backgroundColor: "rgba(29,26,26,.87)",
                top: "57px",
            },
        }),
        "sub-menu": ({isSubMenuDisplayed, item})=>({
            opacity: isSubMenuDisplayed ? "1" : "0",
            height: (()=>{

                if(!isSubMenuDisplayed || 
                    item === undefined || 
                    item.subMenu === undefined
                ){
                    return "0";
                }

                return `${item.subMenu.length * 30}px`;

            })(),
            pointerEvents: isSubMenuDisplayed ? "unset" : "none",
            transition: "opacity 500ms, height 300ms",
            overflow: "hidden",
            paddingInlineStart: 0,
            backgroundColor: "rgba(63, 55, 55, .61)",
            borderRadius: "2px",
            marginTop: "30px",
            paddingTop: "10px",
            [theme.breakpoints.down("xs")]: {
                backgroundColor: "rgba(0, 0, 0, 0.89)",
                width: "100vw",
                borderRadius: "0",
                marginTop: "0",
                position: "relative",
                top: "5px"
            }


        }),
        "sub-menu-item": ()=>({
            listStyle: "none",
            padding: "0 20px 0 10px",
            [theme.breakpoints.down("xs")]: {
                padding: "0"
            }
        }),
        "menu-text": ({item})=>({
            cursor: "pointer",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "0.9em",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            [theme.breakpoints.down("xs")]: {
                textAlign: "center",
                "& p": {
                    marginBlockEnd: 
                        item === undefined ? "10px" : 
                        item.subMenu === undefined ? "10px" : "0"
                    ,

                    marginBlockStart: "10px"
                }


            },
            "& div": {
                width: "100%",
                transform: "scaleX(0)",
                height: "1px",
                borderTop: "solid white 1px",
                pointerEvents: "none",
                transition: "transform 200ms",
                [theme.breakpoints.down("xs")]: {
                    display: "none", 
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
            letterSpacing: "0.1em",
            marginBlock: "0",
            height: "30px",
            [theme.breakpoints.down("xs")]:{
                textAlign: "center"
            }


        }),
        "menu-icon": ({mobileMenuButtonPosition})=>({
            position: "absolute",
            left: (()=>{
                if(mobileMenuButtonPosition === undefined || mobileMenuButtonPosition === "center"){
                    return "50%";
                }

                switch(mobileMenuButtonPosition){
                    case "left" : return "0";
                    default : return "100%";
                };

            })(),
            marginLeft: (()=>{
                if(mobileMenuButtonPosition === undefined || mobileMenuButtonPosition === "center"){
                    return "-27px";
                }

                switch(mobileMenuButtonPosition){
                    case "left" : return "15px";
                    default : return "-65px";
                }

            })(),
            top: "15px",
            zIndex: 4,
            borderRadius: "5px",
            backgroundColor: "black",
            padding: "0 10px 5px 10px",
            "& svg": {
                width: "32px",
                height: "30px",
                fill: "white",
                marginTop: "7px",
                pointerEvents: "none"

            },
            "@media (min-width: 600px)": {
                display: "none",
            }
        })
            

    })
)


export type MenuProps = {
    menuItems: Item[];
    mobileMenuButtonPosition?: "left" | "right" | "center";
}


export const NavMenu = (props: MenuProps) =>{
    const {menuItems, mobileMenuButtonPosition} = props;

    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);

    const classes = useStyle({isMenuDisplayed, mobileMenuButtonPosition});

    /*useEffect(()=>{
        if(!menuRef.current){
            return;
        }

        menuRef.current.style.pointerEvents = window.innerWidth > 600 ? "unset" :
            !isMenuDisplayed ? "none" : "unset";
        

    });*/

    useEvt(ctx=>{
        evtClickedAway.attach(ctx, ()=>{

            if(!isMenuDisplayed){
                console.log("ok1");
                return;
            }

            setIsMenuDisplayed(false);
        })

    },[isMenuDisplayed]);

    

    useWindowResize(()=>{

        if(window.innerWidth > 600){
            setIsMenuDisplayed(true);
            return;
        }

        setIsMenuDisplayed(false);
    });


    return(
        <>
            <div onClick={
                useCallback(()=>{
                    setIsMenuDisplayed(!isMenuDisplayed);
                },[isMenuDisplayed])
            } className={`${classes["menu-icon"]} menu-element`}><Menu /></div>
            <ul ref={menuRef} className={classes.menu}>
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
        </>

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
            if(!isSubMenuDisplayed){
                return;
            }
            setIsSubMenuDisplayed(false);
        })

    },[isSubMenuDisplayed])


    const classes = useStyle({
        "isSubMenuDisplayed": isSubMenuDisplayed === undefined ?
        true : isSubMenuDisplayed,

        "item": item
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
                    <ul className={classes["sub-menu"]}>
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

