// Basic code
export let example = 42;

// Allows an empty interface if it extends something. An empty interface isn't
// allowed because it basically means `any`; it does not mean an empty object.
export interface MyStorage extends Storage {}

// Return type isn't required
export function hello(name: string) {
  return `Hello, ${name}!`;
}

// Allow both nullish coalescing operator and logical OR chaining
const emptyString = '' as string | null;
export const nullish1 = emptyString ?? 'unsafe';
export const logical1 = emptyString || 'unsafe';

export function myFuncOR(foo: string | null) {
  return foo || 'a string';
}

export function myFuncNC(foo: string | null) {
  return foo ?? 'a string';
}
