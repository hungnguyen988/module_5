import React, {useEffect, useRef, useState} from "react";

import { getAll, searchByName} from "../service/student";

import DeleteComponent from "./DeleteComponent";
import {Link} from "react-router-dom";

import '../css/list.css'



function ListComponent() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({});
    const searchNameRef = useRef();

    useEffect(() => {
        console.log('-------effect run -------')
        setStudents(prevState => [
            ...getAll()
        ])
    }, [isLoading])

    const handleOnClickDelete = (student) => {
        setDeleteStudent(() => ({
            ...student
        }))
        handleIsShowModal()
    }

    const handleIsShowModal = () => {
        setIsShowModal(prevState => !prevState);
    }

    const handleOnClickSearch = () => {
        let name = (searchNameRef.current.value)
        let listSearch = searchByName(name);
        setStudents(() => [
            ...listSearch
        ])

    }

    const handleIsLoading = () => {
        setIsLoading(pre => !pre)
    }

    return (
        <>
            {console.log('------list run--------')}
            <h1>DANH SÁCH HỌC SINH</h1>
            <Link   to="/addForm">Thêm mới học sinh</Link>

            <form>
                <input ref={searchNameRef} placeholder={'nhập tên cần tìm'}/>
                <button type={"button"} onClick={handleOnClickSearch}>Search</button>
            </form>
            <table className={' table table-striped table-hover table-bordered '}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Tuổi</th>
                    <th>Địa chỉ</th>
                    <th></th>
                    <th></th>
                    <th></th>
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
                            <td>
                                <button onClick={() => handleOnClickDelete(student)}>Xóa</button>

                            </td>
                            <td>
                                <Link to={`/student/detail/${student.id}`}>
                                    <button>Xem chi tiết</button>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/student/edit/${student.id}`}>
                                    <button>Sửa</button>
                                </Link>
                            </td>

                        </tr>
                    ))
                }
                </tbody>
            </table>
            <DeleteComponent  deleteStudent={deleteStudent} isShowModal={isShowModal} handleIsShowModal = {handleIsShowModal} handleIsLoading={handleIsLoading}/>
        </>
    );
}

export default ListComponent;