

import  React from 'react'
import {deleteById} from "./service/student";


function DeleteComponent({isShowModal,deleteStudent,handleIsShowModal,handleIsLoading}) {

    const handleClickDelete = () => {
        deleteById(deleteStudent.id)
        handleIsLoading()
        handleIsShowModal()

    }
    return(

            isShowModal&&<div className="modal show" tabIndex="-1" style={{display:"block"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có muốn xóa {deleteStudent.name}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={handleIsShowModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClickDelete} className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default DeleteComponent