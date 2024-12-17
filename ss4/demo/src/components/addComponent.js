import React, {useState} from "react";
import {addStudent, getAll} from "./service/student";

function AddComponent({handleIsLoading}) {
    const [student, setStudent] = useState({});
    const handleOnChange = (event) => {
        console.log(event.target.value);
        console.log(event.target.name);
        setStudent(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            })
        )

    }

    const handleOnSubmit = () => {
        addStudent(student)
        console.log(getAll())
        handleIsLoading()
    }

    return (
        <>
            <input name={'id'} onChange={(event) => {
                handleOnChange(event)
            }} placeholder={'nhập id'}/>
            <input name={'name'} onChange={(event) => {
                handleOnChange(event)
            }} placeholder={'nhập name'}/>
            <input name={'age'} onChange={(event) => {
                handleOnChange(event)
            }} placeholder={'nhập age'}/>
            <input name={'address'} onChange={(event) => {
                handleOnChange(event)
            }} placeholder={'nhập address'}/>


            <button onClick={handleOnSubmit}>Thêm</button>
        </>
    )

}

export default AddComponent