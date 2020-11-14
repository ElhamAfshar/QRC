export type Merge<A, B> = Omit<A, keyof B> & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
