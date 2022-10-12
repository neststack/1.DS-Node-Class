const fs = require('fs');

const files = {
    name: 'test',
    age: '22',
};

fs.writeFileSync('test.txt', JSON.stringify(files));
const fileData = fs.readFileSync('test.txt');
console.log(JSON.parse(fileData.toString()));
const jsonData = JSON.parse(fileData.toString());

fs.renameSync('test.txt', 'text.txt');
