import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "../Button/Button";
import img from '../../Header/image/plus.png'


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
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        <div>
            <input type="text" value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error-input' : ''}/>
            <Button nameButton={'+'} callback={() => addTask()}
                    classes={''}
            img={img}
            />


            <div>
                {error && <span
                    className={error ? 'error-message' : ''}>{error}</span>}
            </div>
        </div>
    )

}

