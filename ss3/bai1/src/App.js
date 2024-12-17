
import './App.css';
import {getAll} from './component/service/student'

import List from "./component/List";

function App() {
    const list = getAll();
  return (
      <div className="App">

        <List  listStudent = {list}/>
      </div>
  );
}

export default App;
