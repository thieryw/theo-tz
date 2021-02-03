import React, {useCallback, useState} from "react";
import {makeStyles, createStyles} from "@material-ui/core";
import {Evt} from "evt";
import {useEvt} from "evt/hooks"


const evtActiveSubMenu = Evt.create<{index: number | undefined}>
    ({"index": undefined});


const useStyle = makeStyles(

    ()=> createStyles<"item" | "menu" | "sub-menu", {isSubMenuDisplayed?: boolean}>({
        "item": ()=>({

        }),
        "menu": ()=>({
            display: "flex",
            backgroundColor: "black",
            color: "white"

        }),
        "sub-menu": ({isSubMenuDisplayed})=>({
            height: `${isSubMenuDisplayed ? "unset" : "0"}`,
            overflow: "hidden"

        })
    })
)





type Item = {
    routeName: string;
    subMenu?: string[];
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
                menuItems.map((item, index) => <MenuItem key={item.routeName} index={index} item={item}/>) 
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


    const toggleSubMenu = useCallback(()=>{


        
        evtActiveSubMenu.post({
            "index": index,
        });

    }, [index])

    useEvt(ctx =>{
        evtActiveSubMenu.attach(
            ctx,
            ()=> {

                
                if(index !== evtActiveSubMenu.state.index){
                    setIsSubMenuDisplayed(false);
                    return;
                }

               

                setIsSubMenuDisplayed(true);

            }
        )

    },[isSubMenuDisplayed, index])

    const classes = useStyle({
        isSubMenuDisplayed: isSubMenuDisplayed === undefined ?
        true : isSubMenuDisplayed
    })


    return (
        <li>
            <p onClick={toggleSubMenu}>
                {
                    item.routeName
                }
            </p>
            {
                item.subMenu === undefined ? "" : 
                <ul className={classes["sub-menu"]}>
                    {
                        item.subMenu.map(subItem => <li key={subItem}>
                            <p>
                                {
                                    subItem
                                }
                            </p>
                        </li>)
                    }
                </ul>
            }
        </li>
    )
}

