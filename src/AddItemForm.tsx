import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <div>
            <TextField
                variant={'outlined'}
                type="text"
                value={title}
                label={"text type"}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                // className={error ? 'error-input' : ''}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask}  size={"small"}><AddBox/></IconButton>

            {/*{error && <div*/}
            {/*    className={error ? 'error-message' : ''}>{error}</div>}*/}
        </div>
    )
}