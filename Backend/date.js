'use strict';
// const myinfo={
//     name:"Tayyab SAJJAD",
//     cp:"SkillRise",
//     des:"MD"
// }

// const getDate = () =>{
//     const date = new Date();
//     console.log(date)
// }

// const hiring =() => {
//     console.log("SkillRise is coming");
//     const date=new Date();
//     console.log(`SkillRise is launching at ${date}`);
// };

const getTime =() => {
    const date=new Date();
    const time=date.toLocaleTimeString();
    console.log(date);
    console.log(time);
};

export default getTime;
