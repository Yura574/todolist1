import React from "react";
import {FilterValueType} from "../../AppTodolist";



type ButtonType ={
    filter?: FilterValueType
    nameButton: string
    callback: ()=> void
    classes: string
    img?:string
}

export function Button(props: ButtonType){
    const setFilter = () =>{
        props.callback()
    }
    const filterClass = props.filter === props.nameButton ? `isDone ${props.classes}` : ''
    return(
        <button
            className={props.filter? filterClass : props.classes}
            onClick={setFilter}>{props.img ? <img src={props.img}  alt={''}/> : props.nameButton}
        </button>
    )
}