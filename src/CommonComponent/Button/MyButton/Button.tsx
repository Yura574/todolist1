import React from "react";
import {FilterValueType} from "../../../APP/Body/AppTodolist";
import classes from "./Button.module.css";



type ButtonType ={
    filter?: FilterValueType
    nameButton: string
    callback: ()=> void
    classes: string
    img?:string
    deactivate?:()=> void
}

export function Button(props: ButtonType){
    const setFilter = () =>{
        if(props.deactivate){
            props.callback()
            // props.deactivate()
        }   else {
            props.callback()
        }
    }
    // const filterClass = props.filter === props.nameButton ? `${classes.isDone} ${props.classes}` : ''
    return(
        <button
            className={props.filter === props.nameButton ? `${props.classes} ${classes.isDone} ` : props.classes}
            onClick={setFilter}>{props.img ? <img src={props.img}  alt={''}/> : props.nameButton}
        </button>
    )
}