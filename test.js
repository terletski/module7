const sum = (...args) => [...args].reduce((a, b) => console.log(a + b), 0);
sum(10+10+10);
