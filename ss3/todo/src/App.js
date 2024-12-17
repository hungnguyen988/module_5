import logo from './logo.svg';
import './App.css';
import './components/listComponent.js'
import ListComponent from "./components/listComponent";
import {getAll} from './components/service/toDoService.js'
import ToDoList from "./components/listComponent";

function App() {
    const list = getAll();
  return (
    <div className="App">
      <ToDoList toDoList={list} />
    </div>
  );
}

export default App;
