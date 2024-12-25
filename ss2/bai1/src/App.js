
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const students = [
    {
        company: 'Alfreds Futterkiste',
        contact: 'Maria Anders',
        country: 'Germany'
    },
    {
        company: 'Centro comercial Moctezuma',
        contact: 'Francisco Chang',
        country: 'Mexico'
    },
    {
        company: 'Ernst Handel',
        contact: 'Roland Mendel',
        country: 'Austria'
    },
    {
        company: 'Island Trading',
        contact: 'Helen Bennett',
        country: 'UK'
    },
    {
        company: 'Laughing Bacchus Winecellars',
        contact: 'Yoshi Tannamuri',
        country: 'Canada'
    },
    {
        company: 'Magazzini Alimentari Riuniti',
        contact: 'Giovanni Rovelli',
        country: 'Italy'
    }
]

function App() {


    // const productElements = product.map((product) =>
    //     React.createElement(
    //         "div",
    //         { style: {border: "1px solid #ccc", margin: "10px", padding: "10px"}},
    //         React.createElement("h2", null, product.company),
    //         React.createElement("p", null, product.contact),
    //         React.createElement("p", null, product.country),
    //     )
    // );
    //
    // // Trả về danh sách các phần tử
    // return React.createElement("div", {className:"App"}, productElements);

    return (
        <>
            <h2>STUDENTS</h2>
            <table className={' table table-striped table-hover table-bordered '} >
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr>
                        <td>{student.company}</td>
                        <td>{student.contact}</td>
                        <td>{student.country}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )


}

export default App;
