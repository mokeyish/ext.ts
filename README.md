# ext.ts
language extensions  for typescript

## IterableIterator
1. skip
```ts
const v = ['a', 'b', 'c'];
const v1 = v.values().skip(2).toArray();
console.log(v1.length); // 1
console.log(v1[0]); // 'c'
```
2. skipWhile
```ts
const v = ['a', 'b', 'c'];
const v1 = v.values().skipWhile((s) => s === 'b').toArray();
console.log(v1.length); // 1
console.log(v1[0]); // 'c'
```

## Array

1. sequenceEqual
```ts
import '@tszone/ext';

const a = [1, 2, 4];
const b = [1, 2, 5];
console.log(a.sequenceEqual(b)) // false
```

## Promise
1. yield
```ts
import '@tszone/ext';

async function abc(): Promise<void> {
     // some work.
     await Promise.yield();
     // do your work.
     await Promise.yield(20); // wait for 20ms.
     // do your other work.
}
```
## Math
1. randint

```ts
const a = Math.randint(3);
console.log(a); // [0, 3);
const b = Math.randint(3, 6);
console.log(b); // [3, 6);
```
