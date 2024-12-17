
import React, {useEffect, useState} from "react";
import {getAll} from "./service/student";
import AddComponent from "./addComponent";


function ListComponent() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setStudents(prevState => [
            ...getAll()
        ])
    },[isLoading])

    const handleIsLoading = () => {
        setIsLoading(pre=> !pre)
    }

    return (
        <>
            <h1>DANH SÁCH HỌC SINH</h1>
            <AddComponent handleIsLoading= {handleIsLoading}/>
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Tuổi</th>
                    <th>Địa chỉ</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}

export default ListComponent;