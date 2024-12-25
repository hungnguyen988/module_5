
import React from'react';
import Link from "next/link";

export default function List(){
    return (
        <div>
            <h1>List Component</h1>
            <Link href="/student/addForm">add</Link>
        </div>
    )
}