# Simple Logger

This is a super simple logger. It is implemented as a Higher Order Function. Give it a function and it will return a new function that logs the original functions inputs and outputs.

For example:

```typescript
function add(one: number, two: number){
  return one + two;
}

useLogger(add)(1, 2)

/*
 will log:
 
Array [
  "Executing add with args: {
  \\"0\\": 1,
  \\"1\\": 2
}",
]

Array [
  "Function add returned: {
  \\"result\\": 3
}",
]

 */
```

