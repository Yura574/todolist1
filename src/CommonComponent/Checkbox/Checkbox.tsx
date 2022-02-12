import React, {ChangeEvent} from "react";

type CheckboxType ={
    id: string
    isDone: boolean
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
}

export function Checkbox(props:CheckboxType) {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, e.currentTarget.checked)
    }
    return(
        <input type="checkbox"
               checked={props.isDone}
               onChange={changeStatus}

        />
    )
}