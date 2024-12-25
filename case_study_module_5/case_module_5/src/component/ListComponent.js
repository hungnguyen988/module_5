import React, {useState, useEffect, createRef} from "react";
import {Pagination} from "react-bootstrap";
import {searchByNameAndServiceType} from "../service/contract/ContractService";
import {Link} from "react-router-dom";
import DeleteComponent from "./DeleteComponent";
import '../css/listComponent.css';
import {useSelector} from "react-redux";


function ListComponent() {

    const searchCustomerNameRef = createRef();
    const searchServiceTypeRef = createRef();

    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [deleteContract, setDeleteContract] = useState({});
    const [isShowModal, setIsShowModal] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchCustomerName, setSearchCustomerName] = useState('');
    const [searchServiceType, setSearchServiceType] = useState('');
    const pageSize = 2;

    const user = useSelector(state => state.user);
    const account = user ? user.account : null;


    const fetchContracts = async () => {
        const response = await searchByNameAndServiceType(searchCustomerName, searchServiceType, currentPage, pageSize);
        let list = response.list;
        const total = response.total;
        setTotalPage(total);
        setContracts(list);
    }


    useEffect(() => {
        fetchContracts();
    }, [searchCustomerName, searchServiceType, currentPage, isLoading]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleOnClickSearch = () => {
        setSearchCustomerName(searchCustomerNameRef.current.value);
        setSearchServiceType(searchServiceTypeRef.current.value);
        setCurrentPage(1);
    }


    const handleOnClickDelete = (contract) => {
        setDeleteContract(() => ({...contract}));
        setIsShowModal(true);
    }

    const handleIsShowModal = () => {
        setIsShowModal(prevState => !prevState);
    }

    const handleIsLoading = () => {
        setIsLoading(pre => !pre);
    }

    return (
        <div>
            <h1>DANH SÁCH HỢP ĐỒNG</h1>

            <Link className="btn" to="/add-form">Thêm mới học sinh</Link>

            <input ref={searchCustomerNameRef} placeholder={'nhập tên cần tìm'}/>
            <select ref={searchServiceTypeRef}>
                <option value="">Tất cả</option>
                <option value="villa">Villa</option>
                <option value="house">Nhà</option>
                <option value="room">Phòng</option>

            </select>
            <button type="button" onClick={handleOnClickSearch}>Tìm</button>




            <table className={' table table-striped table-hover table-bordered '}>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã hợp đồng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Tn khách hàng</th>
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
                    contracts.map((contract, index) => (
                        <tr key={contract.id}>
                            <td>{index + 1}</td>
                            <td>{contract.code}</td>
                            <td>{contract.createAt}</td>
                            <td>{contract.endAt}</td>
                            <td>{contract.customer.name}</td>

                            {account && account.role === "ADMIN" && (
                                <>
                                    <td>
                                        <button onClick={() => handleOnClickDelete(contract)}>Xóa</button>
                                    </td>
                                    <td>
                                        <Link to={`/contract/edit/${contract.id}`}>
                                            <button>Sửa</button>
                                        </Link>
                                    </td>
                                </>
                            )

                            }

                            <td>
                                <Link to={`/contract/detail/${contract.id}`}>
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


            <DeleteComponent deleteContract={deleteContract} isShowModal={isShowModal}
                             handleIsShowModal={handleIsShowModal} handleIsLoading={handleIsLoading}/>

        </div>




    )
}

export default ListComponent;