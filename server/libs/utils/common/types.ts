export type RequiredKeys<T> = { [K in keyof T]-?: object extends Pick<T, K> ? never : K }[keyof T];
export type OptionalKeys<T> = { [K in keyof T]-?: object extends Pick<T, K> ? K : never }[keyof T];
export type RequiredFields<T> = Pick<T, RequiredKeys<T>>;
export type PartialFilter<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
