type T = {
  a?: {
    b?: {
      c: string;
      method?: () => void;
    };
  };
};

// This is allowed but notifies that an easier, more readable method exists.
export function chaining(foo: T | null) {
  // Fixed version:
  // return foo?.a?.b?.c;
  return foo && foo.a && foo.a.b && foo.a.b.c;
}
