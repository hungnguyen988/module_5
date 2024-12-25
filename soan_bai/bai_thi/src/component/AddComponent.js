

import React, {useEffect} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getAllCategories} from "../service/category/CategoryService";
import '../css/addComponent.css'
import {addProduct} from "../service/product/ProductService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function AddComponent() {
    const [categories, setCategories] = React.useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllCategories();
            setCategories(list);
        }
        fetchData()
    },[])
    const handleOnSubmit =  async (product) =>{
        const newProduct = {
            ...product,
            category: JSON.parse(product.category) // Chuyển chu��i JSON về đối tượng JavaScript
        }
        await addProduct(newProduct);
        toast.success("Thêm sản phẩm thành công!")
        navigate("/list")
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        price: Yup.number()
            .required("Gía không được để trống")
            .positive("Gía phải là số dương"),
        code:Yup.string()
            .required("Mã không được để trống")
            .matches(/^PROD-\d{4}$/, "Mã phải bắt đầu bằng 'PROD-' và có 4 số"),
        category: Yup.string().required("Loại sản phẩm không được để trống"),
        quantity: Yup.number().required("Số lượng không được để trống").positive("Số lượng phải là số dương"),
        createAt: Yup.date().required("Ngày tạo không được để trống").max(new Date(), "Ngày tạo không được lớn hơn ngày hiện tại"),
    });
    const initialValues = {
        name: '',
        code:'',
        price: 0,
        quantity: 0,
        createAt: '',
        category: ''
    };

    const handleReset = () => {
        navigate("/list");
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleOnSubmit(values);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="mt-4 p-4 border rounded shadow-lg bg-light">
                        <h2 className="text-primary text-center mb-4">Thêm mới</h2>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Mã sản phẩm:</label>
                            <Field className="form-control" type="text" name="code" id="code" />
                            <ErrorMessage name="code" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Tên:</label>
                            <Field className="form-control" type="text" name="name" id="name" />
                            <ErrorMessage name="name" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Gía:</label>
                            <Field className="form-control" type="number" name="price" id="price" />
                            <ErrorMessage name="price" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Số lượng:</label>
                            <Field className="form-control" type="number" name="quantity" id="quantity" />
                            <ErrorMessage name="quantity" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createAt" className="form-label">Ngày nhập:</label>
                            <Field className="form-control" type="date" name="createAt" id="createAt" />
                            <ErrorMessage name="createAt" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Loại sản phẩm:</label>
                            <Field className="form-select" as="select" name="category">
                                <option value="">------- Chọn -------</option>
                                {categories.map(c => (
                                    <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger mt-1" />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                                Thêm sản phẩm
                            </button>
                            <button type="button" className="btn btn-secondary px-4" onClick={handleReset} disabled={isSubmitting}>
                                Hủy
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

        </>
    )
}