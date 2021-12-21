import { Status } from "./status";

export interface StatusGroup{
    id: number;
    index: number;
    name: string;
    statuses: Status[] | undefined;
}