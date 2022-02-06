import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const activeMode = () => setEditMode(true)
    const deactivateMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            setEditMode(false)
            props.changeTitle(title)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <>{
            editMode
                ? <TextField
                variant={'outlined'}
                    value={title}
                    onChange={onChangeTitleHandler}
                    onBlur={deactivateMode}
                    autoFocus
                    onKeyPress={onKeyPressHandler}
                />
                : <span onDoubleClick={activeMode}>{props.title}</span>

        }
        </>
    )
}