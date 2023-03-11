import postgres from "postgres";

export namespace Utils {
	export type Nullable<T> = { [K in keyof T]: T[K] | null };
	export type Undefinable<T> = { [K in keyof T]: T[K] | undefined };
	export type Nillable<T> = { [K in keyof T]: T[K] | null | undefined };

	export type DeepTypable<T, Type extends null | undefined> = {
		[K in keyof T]: DeepTypable<T[K], Type> | Type;
	};

	export type Params<T extends (...args: any) => any> = Parameters<T>[0];

	export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
	export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export namespace SharedTypes {
	export type DB = postgres.Sql;
	export interface Dto<RTo = Record<string, any>> {
		to(): RTo;
	}
}
