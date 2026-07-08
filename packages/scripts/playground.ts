import { add } from "./math";

const greet = (name: string): string => `Hello, ${name}`;

const result = greet("yzb");

console.log(result);

function sum(a: number, b: number): number {
  return a + b;
}

console.log(add(3, 4));
