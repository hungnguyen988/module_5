import React from "react";
import AddComponent from "./addComponent";
import {deleteToDo, getAll} from "./service/toDoService";
import DetailComponent from "./detailComponent";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listToDo: [],
            isLoading: true,
            selectToDo: null
        }
    }

    handleIsLoading = () => {
        this.setState(pre => ({
                ...pre,
                isLoading: !pre.isLoading
            })
        );
    }

    handleSubmitDelete = (index) => {
        console.log(index);
        deleteToDo(index);
        this.handleIsLoading();
        console.log(getAll());
    }

    handleSubmitDetail = (index) => {
        const list = getAll();
        console.log(list[index]);
        this.setState(pre => ({
            ...pre,
            selectToDo: list[index]
        }))
    }

    render() {
        const {selectToDo} = this.state;
        return (
            <>
                <h1>DANH SÁCH</h1>
                <AddComponent changeIsLoading={this.handleIsLoading}/>
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.props.toDoList.map((toDo, index) => (
                            <tr key={toDo.id}>
                                <td>{index + 1}</td>
                                <td>{toDo.name}</td>
                                <td>
                                    <button onClick={() => this.handleSubmitDelete(index)}>Xóa</button>
                                    <button onClick={() => this.handleSubmitDetail(index)}>Chi tết</button>
                                </td>

                            </tr>

                        ))
                    }
                    </tbody>
                </table>
                <DetailComponent selectToDo={selectToDo}/>

            </>
        )

    }

}

export default ToDoList;

