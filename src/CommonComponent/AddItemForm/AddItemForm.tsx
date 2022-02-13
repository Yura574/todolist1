import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "../Button/MyButton/Button";
import addPlusIcon from '../../APP/Header/image/addPlus.svg'
import classes from "./AddItemForm.module.css";


type AddItemFormType = {
    addItem: (title: string) => void
    deactivate?: () => void
}

export function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {

        if (title.trim() !== '') {

            if (title.trim() !== '' && props.deactivate) {
                debugger
                props.deactivate()
                props.addItem(title.trim())
                setTitle('')

            } else {
                props.addItem(title.trim())
                setTitle('')
            }
        } else {
            setError('Title is required')
        }
    }


    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <div >
            <input type="text" value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error-input' : ''} autoFocus />
            <Button nameButton={'+'} callback={addTask}
                    classes={classes.addButton}
                    img={addPlusIcon} deactivate={props.deactivate}
            />


            <div>
                {error && <span
                    className={error ? 'error-message' : ''}>{error}</span>}
            </div>
        </div>
    )

}

