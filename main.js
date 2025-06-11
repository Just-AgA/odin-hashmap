import { HashMap } from './hashMap.js';

const test = HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.entries());
test.set('lion', 'red');
console.log(test.length());
test.set('moon', 'silver');
console.log(test.length());
console.log(test.get('lion'));
console.log(test.has('lion'));
console.log(test.keys());
console.log(test.values());
test.remove('lion');
console.log(test.keys());
console.log(test.values());
console.log(test.length());
