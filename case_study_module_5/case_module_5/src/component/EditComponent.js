import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {getById, getLastContractId, updateContract} from "../service/contract/ContractService";
import * as Yup from "yup";
import {getAllCustomers, getCustomerById} from "../service/customer/CustomerService";
import {toast} from "react-toastify";

function EditComponent() {

    const {id} = useParams();
    const [contract, setContract] = useState(null);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fectchData = async () => {
            const contractSearch = await getById(id);

            const newContract = {
                ...contractSearch,
                customer: JSON.stringify(contractSearch.customer), // Parse customer từ string thành object
            };
            console.log("trước khi a vào forrm")

            console.log(newContract);

            setContract(newContract);
        }
        fectchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllCustomers();
            setCustomers(list);
        }
        fetchData()
    }, [])

    const validationSchema = Yup.object({
        createAt: Yup.string()
            .matches(
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
                "Ngày bắt đầu phải có định dạng dd/mm/yyyy"
            )
            .required("Ngày bắt đầu không được để trống"),
        endAt: Yup.string()
            .matches(
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
                "Ngày kết thúc phải có định dạng dd/mm/yyyy"
            )
            .required("Ngày kết thúc không được để trống"),
        serviceType: Yup.string().required("Loại dịch vụ không được để trống"),
        deposit: Yup.number().required("Tiền cọc không được để trống").min(0, "Tiền cọc phải là số dương"),
        totalCost: Yup.number().required("Tổng tiền không được để trống").min(0, "Tổng tiền phải là số dương"),
        customer: Yup.string().required("Vui lòng chọn khách hàng"),
    });


    const handleOnSubmit = async (values) => {
        // let customerUpdate = await getCustomerById(values.customer);
        //
        // setContract({...values, customer: customerUpdate});


        const newContract = {
            ...values,
            customer: JSON.parse(values.customer) // Chuyển chu��i JSON về đối tượng JavaScript
        };

        console.log(newContract);

        await updateContract(newContract);
        console.log(newContract)
        toast.success("Cập nhật học sinh thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate("/list"); // Quay về danh sách
    }

    if (!contract) {
        return <div>Loading...</div>
    }

    return (
        <>


            <Formik
                enableReinitialize
                initialValues={contract}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}

            >
                {({isSubmitting}) => (
                    <Form className="mt-4">
                        <h1 className="text-primary">Chỉnh sửa hợp đồng</h1>

                        <div className="form-group">
                            <label>Mã hợp đồng:</label>
                            <Field className="form-control" type="text" name="code" disabled/>
                        </div>

                        <div className="form-group">
                            <label>Ngày bắt đầu:</label>
                            <Field className="form-control" type="text" name="createAt"/>
                            <ErrorMessage name="createAt" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label>Ngày kết thúc:</label>
                            <Field className="form-control" type="text" name="endAt"/>
                            <ErrorMessage name="endAt" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label>Dịch vụ thuê:</label>
                            <Field className="form-control" as="select" name="serviceType">
                                <option value="">-------Chọn dịch vụ-------</option>
                                <option value="villa">Villa</option>
                                <option value="house">Nhà</option>
                                <option value="room">Phòng</option>

                            </Field>
                            <ErrorMessage name="serviceType" component="div" className="error"/>
                        </div>


                        <div className="form-group">
                            <label>Tiền cọc trước:</label>
                            <Field className="form-control" type="number" name="deposit"/>
                            <ErrorMessage name="deposit" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label>Tổng tiền:</label>
                            <Field className="form-control" type="number" name="totalCost"/>
                            <ErrorMessage name="totalCost" component="div" className="error"/>
                        </div>


                        <div className="form-group">
                            <label>Tên khách hàng:</label>
                            <Field className="form-control" as="select" name="customer">
                                <option value=''>-------Chọn khách hàng-------</option>
                                {
                                    customers.map(c => (
                                        <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
                                    ))
                                }
                            </Field>

                            <ErrorMessage name="customer" component="div" className="error"/>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Câp nhật
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditComponent;