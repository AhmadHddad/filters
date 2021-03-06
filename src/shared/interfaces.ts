export interface IKeyValueDictionary<T> {
   [key: string]: T;
}

export type IButtonClickEvent = React.MouseEventHandler<HTMLButtonElement> | (() => void);
export type IDivClickEvent = React.MouseEventHandler<HTMLButtonElement>;
