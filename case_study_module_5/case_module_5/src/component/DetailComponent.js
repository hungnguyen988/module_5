

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getById} from "../service/contract/ContractService";

function DetailComponent() {

    const {id} = useParams();
    let contractId = parseInt(id);
    const [contract,setContract] = useState(null);

    useEffect( () => {

        const fetchData = async () => {
            const contractDetail = await getById(contractId);

            setContract(contractDetail);
        }
        fetchData();

    }, [contractId])
    console.log(contract+" Contract Detail");

    if (!contract) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>CHI TIẾT HÓA ĐƠN</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Mã</th>
                    <th>Tên khách hàng</th>
                    <th>Ngày bắt đầu </th>
                    <th>Ngày kết thúc </th>
                    <th>Loại dịch vụ </th>
                    <th>Tiền đặt cọc</th>
                    <th>Tổng tiền</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{contract.id}</td>
                    <td>{contract.code}</td>
                    <td>{contract.customer.name}</td>
                    <td>{contract.createAt}</td>
                    <td>{contract.endAt}</td>
                    <td>{contract.serviceType}</td>
                    <td>{contract.deposit}</td>
                    <td>{contract.totalCost}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default DetailComponent;