import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderComponent from "./component/HeaderComponent.js";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./component/HomeComponent.js";
import ListComponent from "./component/ListComponent.js";
import AddComponent from "./component/AddComponent";
import {ToastContainer} from "react-toastify";
import DetailComponent from "./component/DetailComponent";
import EditComponent from "./component/EditComponent";
import LoginComponent from "./component/LoginComponent";

function App() {
    return (
        <div className="App">
            <HeaderComponent/>
            <ToastContainer/>
            <Routes>
                <Route path={'/'} element={<HomeComponent/>}/>
                <Route path={'/list'} element={<ListComponent/>}/>
                <Route path={'/add-form'} element={<AddComponent/>}/>
                <Route path={'/login'} element={<LoginComponent/>}/>
                <Route path={'/contract/detail/:id'} element={<DetailComponent/>}/>
                <Route path={'/contract/edit/:id'} element={<EditComponent/>}/>
            </Routes>
        </div>
    );
}

export default App;
