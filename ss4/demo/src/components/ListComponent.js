import React, {useEffect, useRef, useState} from "react";
import {searchByNameAndClassId} from "../service/student";
import DeleteComponent from "./DeleteComponent";
import {Link} from "react-router-dom";
import {Pagination} from "react-bootstrap";
import '../css/list.css'
import {getAllClasses} from "../service/classes";
import {useSelector} from "react-redux";

function ListComponent() {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({});
    const searchNameRef = useRef();
    const searchClassIdRef = useRef();
    const [classes, setClasses] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchName, setSearchName] = useState('');
    const [searchClassId, setSearchClassId] = useState('');
    const pageSize = 2; // Số lượng mục trên mỗi trang


    const user = useSelector(state => state.user);
    const account = user ? user.account : null;

    // Gọi API lấy dữ liệu
    const fetchStudents = async () => {
        const response = await searchByNameAndClassId(searchName, searchClassId, currentPage, pageSize);
        const list = response.list;
        const total = response.total;
        console.log("Total product from API:", total);
        setTotalPage(total);
        setStudents(list);
    };

    useEffect(() => {
        fetchStudents();
    }, [searchName, searchClassId, currentPage]);

    useEffect(() => {
        const fetchClasses = async () => {
            const list = await getAllClasses();
            setClasses(list);
        }
        fetchClasses();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOnClickDelete = (student) => {
        setDeleteStudent(() => ({
            ...student
        }));
        handleIsShowModal();
    }

    const handleIsShowModal = () => {
        setIsShowModal(prevState => !prevState);
    }

    const handleOnClickSearch = () => {
        const name = searchNameRef.current.value;
        const classId = searchClassIdRef.current.value;
        setSearchName(name);
        setSearchClassId(classId);
        setCurrentPage(1); // Reset to first page when searching
    }

    const handleIsLoading = () => {
        setIsLoading(pre => !pre);
    }

    if (!Array.isArray(students)) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <h1>DANH SÁCH HỌC SINH</h1>
            <Link to="/addForm">Thêm mới học sinh</Link>

            <input ref={searchNameRef} placeholder={'nhập tên cần tìm'}/>
            <select ref={searchClassIdRef}>
                <option value="">Tất cả</option>
                {
                    classes.map((classs, index) => (
                        <option key={index} value={classs.id}>{classs.name}</option>
                    ))
                }
            </select>
            <button type="button" onClick={handleOnClickSearch}>Tìm</button>

            <table className={' table table-striped table-hover table-bordered '}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Id</th>
                    <th>Tên</th>
                    <th>Tuổi</th>
                    <th>Địa chỉ</th>
                    <th>Tên lớp</th>
                    <th></th>
                    {account && account.role === "ADMIN" && (
                        <>
                            <th></th>
                            <th></th>
                        </>
                    )
                    }

                </tr>
                </thead>
                <tbody>
                {
                    students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                            <td>{student.class.name}</td>
                            {account && account.role === "ADMIN" && (
                                <>
                                    <td>
                                        <button onClick={() => handleOnClickDelete(student)}>Xóa</button>
                                    </td>
                                    <td>
                                        <Link to={`/student/edit/${student.id}`}>
                                            <button>Sửa</button>
                                        </Link>
                                    </td>
                                </>
                            )
                            }

                            <td>
                                <Link to={`/student/detail/${student.id}`}>
                                    <button>Xem chi tiết</button>
                                </Link>
                            </td>

                        </tr>
                    ))
                }
                </tbody>
            </table>


            <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}/>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}/>
                {Array.from({length: totalPage}, (_, index) => index + 1).map(number => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)}
                                 disabled={currentPage === totalPage}/>
                <Pagination.Last onClick={() => handlePageChange(totalPage)} disabled={currentPage === totalPage}/>
            </Pagination>


            <DeleteComponent deleteStudent={deleteStudent} isShowModal={isShowModal}
                             handleIsShowModal={handleIsShowModal} handleIsLoading={handleIsLoading}/>
        </>
    );
}

export default ListComponent;