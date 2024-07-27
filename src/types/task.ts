import type { ITag } from "./tag";

export enum TaskStatus {
    completed = 'completed',
    active = 'active',
}
export interface ITask {
    pk?: string;
    name: string;
    description: string;
    tags: ITag[];
    datetime: string;
    status: TaskStatus;
}

export interface ITaskList {
    items: ITask[];
    total: number;
}