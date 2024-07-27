import type { ITask } from "./task";

export interface IFormState extends ITask { }
export interface IInputEvent extends Event {
    target: HTMLInputElement;
}
export type TFilter = {
    tag: string; 
    status: string;
}