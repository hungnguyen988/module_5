import React, {useEffect, useRef, useState,useCallback} from "react";
import {deleteById, getAll, searchByName} from "./service/student";
import AddComponent from "./addComponent";
import DeleteComponent from "./deleteComponent";


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

    // const handleIsLoading = () => {
    //     setIsLoading(pre => !pre)
    // }

    const handleIsLoading = useCallback(() => {
        setIsLoading(pre => !pre);
    }, []);

    return (
        <>
            {console.log('------list run--------')}
            <h1>DANH SÁCH HỌC SINH</h1>
            <AddComponent handleIsLoading={handleIsLoading}/>
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
                    <th>Hành động</th>
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