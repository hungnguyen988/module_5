const toDoList = [
    {
        id: 1,
        name: "học lý thuyết"
    },
    {
        id: 2,
        name: "học thực hành"
    },
    {
        id: 3,
        name: "nghỉ trưa"
    }
]

export function getAll() {
    return toDoList;
}

export function addToDo(toDO) {
    toDoList.push(toDO);
}

export function deleteToDo(index) {
    toDoList.splice(index, 1);
}