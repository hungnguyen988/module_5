let courses = [
    {
        id: 1,
        title: "ReactJS Tutorial",
        rating: 4.2,
    },
    {
        id: 2,
        title: "Angular Tutorial",
        rating: 2.5,
    },
    {
        id: 3,
        title: "VueJS Tutorial",
        rating: 3.8,
    },
    {
        id: 4,
        title: "Java Tutorial",
        rating: 4,
    },
    {
        id: 5,
        title: "JavaScript Tutorial",
        rating: 3.5,
    },
];

let addedCourses = [
    {
        id: 6,
        title: "PHP Tutorial",
        rating: 3,
    },
    {
        id: 7,
        title: "C# Tutorial",
        rating: 2,
    },
    {
        id: 8,
        title: "Docker Tutorial",
        rating: 3.8,
    }
];

const  result = courses.filter(value =>value.rating >= 4);
console.log(result);
//format giá trị trả về
const  result2 = courses.filter(value =>value.rating < 4);

const format = result2.map(value =>`${value.id}-${value.title}-${value.rating}`);
console.log(format);

// Kết hợp filter và map thành một hành động
const formatNew = courses.reduce((accumulator, value) => {
    if (value.rating < 4) {
        accumulator.push(`${value.id}-${value.title}-${value.rating}`);
    }
    return accumulator;
}, []);
console.log(formatNew);

//gộp mảng
const arrayNew = [...courses,...addedCourses]
console.log(arrayNew);


const newFunction = (array)=>{
    return  array.map(value =>`${value.id}-${value.title}-${value.rating}`)
}
const test = [...newFunction(courses),...newFunction(addedCourses)]
console.log(test);