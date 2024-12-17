import React, { Component } from "react";

class DetailComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectToDo } = this.props;

        // Kiểm tra nếu không có công việc nào được chọn
        if (!selectToDo) return null;

        return (
            <div>
                <h3>Chi tiết công việc</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{selectToDo.id}</td>
                        <td>{selectToDo.name}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DetailComponent;

