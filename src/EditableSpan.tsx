import React, {ChangeEvent, useState, KeyboardEvent} from "react";

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const activeMode = () => setEditMode(true)
    const diactivateMode = () => {
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
                ? <input
                    value={title}
                    onChange={onChangeTitleHandler}
                    onBlur={diactivateMode}
                    autoFocus
                    onKeyPress={onKeyPressHandler}
                />
                : <span onDoubleClick={activeMode}>{props.title}</span>

        }
        </>
    )
}