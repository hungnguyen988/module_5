import {Routes, Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import './App.css';
import ListComponent from "./components/ListComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "./components/HeaderComponent";
import HomeComponent from "./components/HomeComponent";
import AddComponent from "./components/AddComponent.js";
import DetailComponent from "./components/DetailComponent.js";
import EditComponent from "./components/EditComponent.js";
import LoginComponent from "./components/LoginComponent";

function App() {
    return (
        <div className="App">
            <HeaderComponent/>
            <ToastContainer/>

            <Routes>
                <Route path={'/'} element={<HomeComponent/>}/>
                <Route path={'/list'} element={<ListComponent/>}/>
                <Route path={'/addForm'} element={<AddComponent/>}/>
                <Route path={'/login'} element={<LoginComponent/>}/>
                <Route path={'/student/detail/:id'} element={<DetailComponent/>}/>
                <Route path={'/student/edit/:id'} element={<EditComponent/>}/>

            </Routes>

        </div>
    );
}

export default App;
