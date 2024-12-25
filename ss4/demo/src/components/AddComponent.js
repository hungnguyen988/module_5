import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {addStudent, getAll} from "../service/student";
import {data, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/add.css'
import {getAllClasses} from "../service/classes";

const AddComponent = () => {

    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);

    useEffect( () => {
        const fectchData = async () => {
            const list = await getAllClasses();
            setClasses(list);
        }
        fectchData()
    },[])



    const handleOnSubmit = async (values) => {

        const newStudent = {
           ...values,
            class: JSON.parse(values.class) // Chuyển chu��i JSON về đối tượng JavaScript
        };

        newStudent.gender = values.gender === "1"? 1 : 2;
        await addStudent(newStudent);
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
                onSubmit={(values, {resetForm}) => {
                    handleOnSubmit(values); // Gọi hàm xử lý khi submit form
                    resetForm(); // Reset form sau khi submit
                }}
            >
                {({isSubmitting}) => (

                    <Form className="mt-4">
                        <h2 className="text-primary">Thêm mới học sinh</h2>

                        <div className="form-group">
                            <label htmlFor="name">Tên:</label>
                            <Field className="form-control" type="text" name="name" id="name"/>
                            <ErrorMessage name="name" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Tuổi:</label>
                            <Field className="form-control" type="number" name="age" id="age"/>
                            <ErrorMessage name="age" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label>Giới tính:</label>
                            <div>
                                <Field type="radio" name="gender" value="1" id="male"/>
                                <label htmlFor="male" className="mr-3">Nam</label>

                                <Field type="radio" name="gender" value="2" id="female"/>
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ:</label>
                            <Field className="form-control" type="text" name="address" id="address"/>
                            <ErrorMessage name="address" component="div" className="error"/>
                        </div>

                        <div className="form-group">
                            <label >Tên lớp:</label>
                            <Field className="form-control" as = "select" name="class" >
                            {/*<option value=''>-------select-------</option>*/}
                            {
                                classes.map(c => (
                                    <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>
                                ))
                            }
                            </Field>
                            <ErrorMessage name="class" component="div" className="error"/>
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