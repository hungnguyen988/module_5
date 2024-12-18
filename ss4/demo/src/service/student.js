const students = [
    {
        id: 1,
        name: 'Lưu',
        age: 30,
        gender: 1,
        address: 'Quảng Nam'
    },
    {
        id: 2,
        name: 'Hưng',
        age: 30,
        gender: 1,
        address: 'Quảng Nam'
    },
    {
        id: 3,
        name: 'Minh',
        age: 30,
        gender: 1,
        address: 'Quảng Nam'
    }
]

export function getAll() {
    return students;
}

export function addStudent(student) {
    students.push(student);
}

export function deleteById(id) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            students.splice(i, 1);
            break;
        }
    }
}

export function searchByName(name) {
    const lowerCaseName = name.toLowerCase();
    return students.filter(student =>
        student.name.toLowerCase().includes(lowerCaseName)
    );
}

export function searchById(id) {
    return students.find(student => student.id === id);
}


export function updateStudent(student) {
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
        students[index] = student;
    }
}