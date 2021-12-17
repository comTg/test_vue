let sd = [
    {id:2,value:3},
    {id:3,value:6},
    {id:6,value:8},
];
let sy = [
    {id:3,value:5},
    {id:4,value:5},
];
sy.forEach(item => {
    let flag = sd.some(item2 => {
        if (item2.id === item.id) {
           item2  = Object.assign(item2, item);
           return true;
        }  else {
            return false;
        }
    });
    if (flag === false) {
        sd.push(item);
    }
});

console.log(sd);