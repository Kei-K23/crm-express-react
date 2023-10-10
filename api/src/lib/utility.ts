export function _merge(
  target: { [key: string]: any },
  ...sources: Array<{ [key: string]: any }>
): object {
  if (typeof target !== "object" || target === null) {
    throw new Error("Target must be object");
  }
  for (const source of sources) {
    if (typeof source !== "object" || source === null) {
      continue;
    }
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

export function _get(
  obj: { [key: string]: any },
  path: string,
  defaultValue?: string
) {
  const keys =
    typeof path === "string"
      ? path.split(".")
      : Array.isArray(path)
      ? path
      : [path];

  for (let key of keys) {
    if (!obj || typeof obj !== "object") {
      return defaultValue;
    }
    obj = obj[key];
  }
  return obj !== undefined ? obj : defaultValue;
}
