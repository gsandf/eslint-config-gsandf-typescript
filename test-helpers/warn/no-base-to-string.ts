export const a = {} as const;

// This is likely an error, and would log:
// a is [object Object]
console.log(`a is ${a}`);
