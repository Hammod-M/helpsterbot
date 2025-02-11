export interface ApiResponse<T> {
   data: T;
   status: number;
   statusText: string;
}

export type PaginatedResponse<T> = {
   results: T[];
   count: number;
   next: string | null;
   previous: string | null;
};
