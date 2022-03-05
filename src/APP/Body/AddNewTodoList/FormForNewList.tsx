import {AddItemForm} from "../../../CommonComponent/AddItemForm/AddItemForm";
import React from "react";

type FormForNewListType = {
   addTodoList: (title: string) => void
    deactivate: ()=> void
}

export const FormForNewList = React.memo((props: FormForNewListType) =>  {
    console.log('render FormForNewList')
    return (
        <span ><AddItemForm addItem={props.addTodoList} deactivate={props.deactivate}/></span>
    )
})