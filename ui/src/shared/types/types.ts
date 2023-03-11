import { CSSProperties } from "react";

export namespace Utils {
  export type Params<T extends (...args: any[]) => unknown> = Parameters<T>[0];
  export type Return<T extends (...args: any) => any> = ReturnType<T>;
  // Делает ключи в объекте обязательными
  export type RequiredProperty<T> = { [P in keyof T]: Required<NonNullable<T[P]>> };
  // Меняет ключ K в объекте O на значение V и возвращает модифицированный O
  export type ChangeObjKey<O extends Record<string, any>, K extends keyof O, V> = {
    [Key in keyof O]: Key extends K ? V : O[Key];
  };
  // Делает ключ необязательным
  export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export namespace SharedTypes {
  export type Styles = { [key in keyof CSSProperties]: CSSProperties[key] };
  export type ShortStyles = {
    view?: CSSProperties["display"];
    w?: CSSProperties["width"];
    h?: CSSProperties["height"];
    min?: CSSProperties["minWidth"];
    max?: CSSProperties["maxWidth"];
    grow?: CSSProperties["flexGrow"];
    flow?: CSSProperties["flexFlow"];
    align?: CSSProperties["alignItems"];
    justify?: CSSProperties["justifyContent"];
    padding?: CSSProperties["padding"];
    margin?: CSSProperties["margin"];
    mt?: CSSProperties["marginTop"];
    mb?: CSSProperties["marginBottom"];
    mr?: CSSProperties["marginRight"];
    ml?: CSSProperties["marginLeft"];
    gap?: CSSProperties["gap"];
    radius?: CSSProperties["borderRadius"];
    bg?: CSSProperties["backgroundColor"];
    lh?: CSSProperties["lineHeight"];
    direction?: CSSProperties["flexDirection"];
    wrap?: CSSProperties["flexWrap"];
  };

  export type Status = "idle" | "loading" | "error" | "success" | "notFound";
}
