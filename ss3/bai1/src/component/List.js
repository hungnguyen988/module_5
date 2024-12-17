import React from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>DANH SÁCH HỌC SINH</h1>
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Tuổi</th>
                        <th>Địa chỉ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.listStudent.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.address}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>
        )
    }
}


export default List;
