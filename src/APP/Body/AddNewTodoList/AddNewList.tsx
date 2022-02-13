import React, {useState} from "react";
import classes from "./AddNewTodoList.module.css";
import {FormForNewList} from "./FormForNewList";

type AddNewListType = {
    addTodoList: (title: string) => void
}

export function AddNewList(props: AddNewListType) {
    debugger
    const [edit, setEdit] = useState(false)

    const activate = () => setEdit(true)
    const deactivate = () => {
        debugger
        setEdit(false)

    }
    return (
        <div>

        <div className={classes.newListBody}  >
            {edit
                ? <FormForNewList addTodoList={props.addTodoList} deactivate={deactivate}/>
                :
                <span onClick={activate}>
                <span className={`${classes.icon_add} ${classes.icon}`}>+</span>
                Add new list
                </span>

            }
        </div>
        </div>

    )
}