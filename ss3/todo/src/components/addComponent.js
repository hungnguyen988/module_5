import React from "react";
import {addToDo, getAll} from "./service/toDoService";

class AddComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDo: {
                id: "",
                name: ""
            }
        }
    }

    handleOnChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState(pre => ({
            ...pre,
            toDo: {
                ...this.state.toDo,
                [e.target.name]: e.target.value
            }

        }))
    }

    handleSubmit = () => {
        console.log(this.state.toDo);
        addToDo(this.state.toDo);
        this.props.changeIsLoading();

    }

    render() {
        return (
            <>
                <input name={'id'} onChange={this.handleOnChange} placeholder={'nhập id'}/>
                <input name={'name'} onChange={this.handleOnChange} placeholder={'nhập name'}/>
                <button onClick={this.handleSubmit}>Thêm</button>
            </>
        )
    }
}

export default AddComponent;