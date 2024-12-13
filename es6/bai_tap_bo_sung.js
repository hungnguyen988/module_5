
//bài tập 1

export const prime = (value) => {
    if (value < 2) return false;
    if (value ===2) return true;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return true;
}

const  array = [2,3,4,5,6,7,8,9]
const result = array.filter(value => prime(value));
console.log(result);

//bài tập 2
const person ={
    firstName: "John",
    lastName: "Docker",
    age: 4,
    gender: "Male",
    occupation: "developer",
    nationality: "American",
    city: "New York",
    hobbies: ["reading","travelling","photography"],
    languages: ["English", "Spanish"],
    education: {
        degree: "bachelor",
        major: "Computer Science",
        university: "DaNang University",
    }
}

const {firstName, gender, education:{degree},languages:[english]} = person;
const student = {
    firstName,
    gender,
    degree,
    english
}

console.log(student);

//bài tập 3
const student1 = {
    firstName:"hung",
    gender:"Female"

}

const student2 = {
    name:"hung",
    gender:"Male",
    degree:"bachelor"
}

const studentFunction = ({firstName = "quan", degree= "NA"}) =>{
    const studentInfor = {
        firstName,
        degree
    }
    console.log(studentInfor);
}

studentFunction(student1);
studentFunction(student2);

