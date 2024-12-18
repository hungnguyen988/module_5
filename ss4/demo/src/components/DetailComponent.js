import React from "react";
import {useParams} from "react-router-dom";
import {getAll, searchById} from "../service/student";

function DetailComponent() {
    const {id} = useParams();
    const productId = parseInt(id, 10);
    const student = searchById(productId);

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