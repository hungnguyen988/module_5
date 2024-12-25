import logo from './logo.svg';

import HeaderComponent from "./component/HeaderComponent";
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import HomeComponent from "./component/HomeComponent";
import AddComponent from "./component/AddComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify";
function App() {
  return (
    <>
      <HeaderComponent/>
        <ToastContainer/>

      <Routes>
        <Route path="/" element={<HomeComponent/>}/>
        <Route path="/list" element={<ListComponent/>}/>
        <Route path="/add" element={<AddComponent/>}/>

      </Routes>

    </>
  );
}

export default App;
