import {AddItemForm} from "../../../CommonComponent/AddItemForm/AddItemForm";
import React from "react";

type FormForNewListType = {
   addTodoList: (title: string) => void
    deactivate: ()=> void
}

export function FormForNewList(props: FormForNewListType) {
    return (
        <span ><AddItemForm addItem={props.addTodoList} deactivate={props.deactivate}/></span>
    )
}