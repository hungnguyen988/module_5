import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {addStudent, getAll} from "../service/student";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/add.css'

const AddComponent=()=>{

    const  students = getAll();
    const getNextId = () => {
        console.log('-------getId run -------')
        if (students.length === 0) {
            return 1; // Nếu danh sách rỗng, bắt đầu từ 1
        }
        const maxId = Math.max(...students.map((student) => student.id)); // Tìm `id` lớn nhất
        return maxId + 1;
    };

    const navigate = useNavigate();
    const handleOnSubmit = (values) => {


        const newStudent = { ...values, id: getNextId() }; // Gán `id` tự động
        addStudent(newStudent);
        toast.success("Thêm học sinh thành công!", {
            position: "top-right",
            autoClose: 3000, // Thời gian tự đóng (3 giây)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate('/list');

    }


    // Schema xác thực bằng Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        age: Yup.number()
            .required("Tuổi không được để trống")
            .positive("Tuổi phải là số dương")
            .integer("Tuổi phải là số nguyên"),
        address: Yup.string().required("Địa chỉ không được để trống"),
    });

    const initialValues = {
        name: '',
        age: '',
        gender: "1",
        address: '',
    };

    return (
        <>
            {console.log('-----add run-------')}



            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleOnSubmit(values); // Gọi hàm xử lý khi submit form
                    resetForm(); // Reset form sau khi submit
                }}
            >
                {({ isSubmitting }) => (
                    // <Form>
                    //     <h2>Thêm mới học sinh</h2>
                    //
                    //     {/*<div>*/}
                    //     {/*    <label htmlFor="id">Id:</label>*/}
                    //     {/*    <Field type="number" name="id" id="id"/>*/}
                    //     {/*    <ErrorMessage name="id" component="div" style={{color: "red"}}/>*/}
                    //     {/*</div>*/}
                    //
                    //     <div>
                    //         <label htmlFor="name">Tên:</label>
                    //         <Field type="text" name="name" id="name"/>
                    //         <ErrorMessage name="name" component="div" style={{color: "red"}}/>
                    //     </div>
                    //
                    //     <div>
                    //         <label htmlFor="age">Tuổi:</label>
                    //         <Field type="number" name="age" id="age"/>
                    //         <ErrorMessage name="age" component="div" style={{color: "red"}}/>
                    //     </div>
                    //
                    //     <div>
                    //
                    //         <label >Giới tính:</label>
                    //         <Field type={'radio'} name="gender"  value="1"/>Nam
                    //         <Field type={'radio'} name="gender"  value="2"/>Nữ
                    //     </div>
                    //
                    //     <div>
                    //         <label htmlFor="address">Địa chỉ:</label>
                    //         <Field type="text" name="address" id="address"/>
                    //         <ErrorMessage
                    //             name="address"
                    //             component="div"
                    //             style={{color: "red"}}
                    //         />
                    //     </div>
                    //
                    //
                    //
                    //     <button type="submit" disabled={isSubmitting}>
                    //         Thêm học sinh
                    //     </button>
                    // </Form>



                    <Form className="mt-4">
                        <h2 className="text-primary">Thêm mới học sinh</h2>

                        <div className="form-group">
                            <label htmlFor="name">Tên:</label>
                            <Field className="form-control" type="text" name="name" id="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Tuổi:</label>
                            <Field className="form-control" type="number" name="age" id="age" />
                            <ErrorMessage name="age" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label>Giới tính:</label>
                            <div>
                                <Field type="radio" name="gender" value="1" id="male" />
                                <label htmlFor="male" className="mr-3">Nam</label>

                                <Field type="radio" name="gender" value="2" id="female" />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ:</label>
                            <Field className="form-control" type="text" name="address" id="address" />
                            <ErrorMessage name="address" component="div" className="error" />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            Thêm học sinh
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )

}


export default AddComponent