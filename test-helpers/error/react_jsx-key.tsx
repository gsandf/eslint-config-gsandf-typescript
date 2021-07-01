import React from 'react';

export function ElementWithoutKey() {
  const numbers = [1, 2, 3];
  return numbers.map(n => <div>{n}</div>);
}

export function FragmentWithoutKey() {
  const numbers = [1, 2, 3];
  return numbers.map(n => <>{n}</>);
}
