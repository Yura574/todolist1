import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormType ={
    addItem: (title: string) => void

}
export function AddItemForm (props: AddItemFormType) {
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
    return(
        <div>
            <input type="text" value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error-input' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div
                className={error ? 'error-message' : ''}>{error}</div>}
        </div>
    )
}