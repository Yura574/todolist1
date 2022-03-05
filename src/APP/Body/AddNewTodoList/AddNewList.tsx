import React, {useCallback, useState} from "react";
import classes from "./AddNewTodoList.module.css";
import {AddItemForm} from "../../../CommonComponent/AddItemForm/AddItemForm";

type AddNewListType = {
    addTodoList: (title: string) => void
}

export const AddNewList = React.memo((props: AddNewListType) => {
    console.log('render AddNewList')
    const [edit, setEdit] = useState(false)

    const activate = useCallback(() => setEdit(true), [])
    const deactivate = useCallback(() => {
        setEdit(false)

    }, [])
    return (
        <div>

            <div className={classes.newListBody}>
                {edit
                    ? <span><AddItemForm addItem={props.addTodoList} deactivate={deactivate}/></span>
                    : <span onClick={activate}>
                <span className={`${classes.icon_add} ${classes.icon}`}>+</span>
                Add new list
                </span>
                }
            </div>
        </div>

    )
})