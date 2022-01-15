import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.title)
    const onDoubleClickHandler = () => {
        setEdit(true)
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callback(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={title} autoFocus onBlur={onBlurHandler} onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
