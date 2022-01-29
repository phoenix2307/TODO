import {Checkbox} from "@material-ui/core";
import React, {ChangeEvent} from "react";

type CheckboxIndependentType = {
    callback: (isDone: boolean) => void
    isDone: boolean
}
export const CheckboxIndependent = (props: CheckboxIndependentType) => {
    const onChangeHand = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }

    return (
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHand}
        />
    )
}