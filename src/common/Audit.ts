import { Assignment } from "./Assignment";

export interface Audit {
    id: string|number;
    name: string;
    start_date: string;
    segment: string;
    categories: string;
    assignment: Assignment;
    createdAt: string;
    baseFile?: {
        contentUrl: string;
    } | string;
    resultFile?: {
        contentUrl: string;
    } | string;
    totalBaseFile?: {
        contentUrl: string;
    } | string;
}