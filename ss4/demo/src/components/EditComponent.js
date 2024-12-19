import React,{useState,useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {searchById,updateStudent} from "../service/student.js";

const EditComponent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fectchData = async () => {
            const studentSearch = await searchById(id);
            studentSearch.gender = studentSearch.gender === 1? "1" : "2"; // Chuyển giá trị gender sang dạng text
            console.log("gender trước khi đưa vào uodate "+studentSearch.gender)
            setStudent(studentSearch);
        }
        fectchData()
    },[])






    // student.gender = student.gender === 1? "1" : "2"; // Chuyển giá trị gender sang dạng text
    // console.log(student)

    // Schema xác thực bằng Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        age: Yup.number()
            .required("Tuổi không được để trống")
            .positive("Tuổi phải là số dương")
            .integer("Tuổi phải là số nguyên"),
        address: Yup.string().required("Địa chỉ không được để trống"),
    });

    const handleOnSubmit = async (values) => {
        values.gender = values.gender === "1"? 1 : 2; // Chuyển giá trị gender sang dạng số
        console.log("trước khi update" +values.gender)

       await  updateStudent(values);
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
    };

    if (!student) {
        return <p>Học sinh không tồn tại!</p>; // Xử lý khi đối tượng không tồn tại
    }

    return (
        <Formik
            initialValues={student} // Dữ liệu ban đầu của đối tượng
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <h2>Chỉnh sửa thông tin học sinh</h2>

                    <div>
                        <label htmlFor="name">Tên:</label>
                        <Field type="text" name="name" id="name"/>
                        <ErrorMessage name="name" component="div" style={{color: "red"}}/>
                    </div>

                    <div>
                        <label htmlFor="age">Tuổi:</label>
                        <Field type="number" name="age" id="age"/>
                        <ErrorMessage name="age" component="div" style={{color: "red"}}/>
                    </div>

                    <div>

                        <label>Giới tính:</label>
                        <Field
                            type="radio"
                            name="gender"
                            value="1"
                            as="input"
                        /> Nam
                        <Field
                            type="radio"
                            name="gender"
                            value="2"
                            as="input"
                        /> Nữ
                    </div>

                    <div>
                        <label htmlFor="address">Địa chỉ:</label>
                        <Field type="text" name="address" id="address"/>
                        <ErrorMessage name="address" component="div" style={{color: "red"}}/>
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        Cập nhật
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default EditComponent;
