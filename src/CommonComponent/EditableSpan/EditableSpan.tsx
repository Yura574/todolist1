import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type EditableSpan = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpan) =>  {
    console.log('render EditableSpan')
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activate = () => setEdit(true)
    const deactivate = () => {
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            deactivate()
        }

    }

    return (
        <span>
            {
                edit
                    ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={deactivate}
                             onKeyPress={onKeyPressHandler}/>
                    : <span onDoubleClick={activate}>{props.title}</span>
            }
</span>

    )
})