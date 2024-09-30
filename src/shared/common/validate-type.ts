export function validateType<T>(v: never): never {
  throw new Error()
}
