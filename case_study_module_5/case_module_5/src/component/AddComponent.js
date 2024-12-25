// import React, {useEffect} from "react";
// import {ErrorMessage, Field, Form, Formik} from "formik";
// import * as Yup from "yup";
// import {getAllCustomers} from "../service/customer/CustomerService";
//
// function AddComponent() {
//
//     const [customers, setCustomers] = React.useState([]);
//
//     useEffect(() => {
//         const fectchData = async () => {
//             const list = await getAllCustomers();
//             setCustomers(list);
//         }
//         fectchData()
//     },[])
//
//
//     const validationSchema = Yup.object({
//         name: Yup.string().required("Tên không được để trống"),
//         age: Yup.number()
//             .required("Tuổi không được để trống")
//             .positive("Tuổi phải là số dương")
//             .integer("Tuổi phải là số nguyên"),
//         address: Yup.string().required("Địa chỉ không được để trống"),
//     });
//
//     const initialValues = {
//         createAt: "",
//         endAt: "",
//         serviceType: "",
//         deposit: 0,
//         totalCost: 0,
//         customer: {}
//     };
//
//     const handleOnSubmit = (values) => {
//
//     }
//
//
//     if(!customers){
//         return <p>Loading...</p>
//     }
//
//     return (
//         <>
//             <h1>Add Page</h1>
//
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, {resetForm}) => {
//                     handleOnSubmit(values); // Gọi hàm xử lý khi submit form
//                     resetForm(); // Reset form sau khi submit
//                 }}
//             >
//                 {({isSubmitting}) => (
//
//                     <Form className="mt-4">
//                         <h2 className="text-primary">Thêm mới học sinh</h2>
//
//                         <div className="form-group">
//                             <label>Ngày bắt đầu:</label>
//                             <Field className="form-control" type="text" name="createAt"/>
//                             <ErrorMessage name="createAt" component="div" className="error"/>
//                         </div>
//
//                         <div className="form-group">
//                             <label>Ngày kết thúc:</label>
//                             <Field className="form-control" type="text" name="endAt"/>
//                             <ErrorMessage name="endAt" component="div" className="error"/>
//                         </div>
//
//                         <div className="form-group">
//                             <label>Dịch vụ thuê:</label>
//                             <Field className="form-control" as="select" name="serviceType">
//                                 <option value="villa">Villa</option>
//                                 <option value="house">Nhà</option>
//                                 <option value="room">Phòng</option>
//
//                             </Field>
//                             <ErrorMessage name="serviceType" component="div" className="error"/>
//                         </div>
//
//
//                         <div className="form-group">
//                             <label>Tiền cọc trước:</label>
//                             <Field className="form-control" type="number" name="deposit"/>
//                             <ErrorMessage name="deposit" component="div" className="error"/>
//                         </div>
//
//                         <div className="form-group">
//                             <label>Tổng tiền:</label>
//                             <Field className="form-control" type="number" name="totalCost"/>
//                             <ErrorMessage name="totalCost" component="div" className="error"/>
//                         </div>
//
//
//
//
//                         <div className="form-group">
//                             <label>Tên khách hàng:</label>
//                             <Field className="form-control" as="select" name="class">
//                                 {/*<option value=''>-------select-------</option>*/}
//                                 {
//                                     customers.map(c => (
//                                         <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
//                                     ))
//                                 }
//                             </Field>
//                             <ErrorMessage name="class" component="div" className="error"/>
//                         </div>
//
//                         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                             Thêm học sinh
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//
//         </>
//     )
// }
//
// export default AddComponent;


import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getAllCustomers} from "../service/customer/CustomerService";
import {createContract, getLastContractId} from "../service/contract/ContractService";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import '../css/addComponent.css'

function AddComponent() {
    const [customers, setCustomers] = useState([]);
    const [lastId, setLastId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllCustomers();
            setCustomers(list);
            const lastContractId = await getLastContractId(); // Lấy ID cuối cùng
            setLastId(lastContractId);
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

    const initialValues = {
        code: `MHD${lastId + 1}`, // Tạo code tự động
        createAt: "",
        endAt: "",
        serviceType: "",
        deposit: 0,
        totalCost: 0,
        customer: ""
    };



    const handleOnSubmit = async (values, {setSubmitting, resetForm}) => {

        // Tạo đối tượng contract mới
        const newContract = {
            ...values,
            customer: JSON.parse(values.customer), // Parse customer từ string thành object
        };

        // Gọi API để tạo contract mới
        await createContract(newContract);

        toast.success("Thêm hợp đồng thành công!");
        navigate("/list")

        // Cập nhật lastId và reset form
        setLastId(prevId => prevId + 1);
        resetForm({
            values: {
                ...initialValues,
                code: `mhd${lastId + 2}` // Cập nhật code cho lần thêm tiếp theo
            }
        });

        setSubmitting(false);

    }

    if (!customers) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
                enableReinitialize={true} // Cho phép Formik reinitialize khi initialValues thay đổi
            >
                {({isSubmitting}) => (
                    <Form className="mt-4">
                        <h2 className="text-primary">Thêm mới hợp đồng</h2>

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

                        <button type="submit" className="btn btn-primary"   disabled={isSubmitting}>
                            Thêm hợp đồng
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AddComponent;