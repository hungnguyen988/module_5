import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAll, searchById} from "../service/student";

function DetailComponent() {
    const {id} = useParams();
    const studentId = parseInt(id);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fectchData = async () => {
            const studentSearch = await searchById(studentId);
            setStudent(studentSearch);
        }
        fectchData()
    },[studentId])


    if (!student) {
        return <div>Loading...</div>;
    }



    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Address</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.gender === 1 ? 'Nam' : 'Nữ'}
                </td>
                <td>{student.address}</td>
            </tr>
            </tbody>
        </table>
    )
}

export default DetailComponent;