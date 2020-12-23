

import "minimal-polyfills/Object.fromEntries";

/**
 * Returns an object created by key-value entries for properties and methods
 * @param entries An iterable object that contains key-value entries for properties and methods.
 */
export type FromEntries<T = any> = (entries: Iterable<readonly [PropertyKey, T]>) => { [k: string]: T };

export const fromEntries: FromEntries = (Object as any).fromEntries.bind(Object);



