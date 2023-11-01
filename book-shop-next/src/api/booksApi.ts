import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IBook} from "@/data/types";


export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/books"
    }),
    endpoints: (builder) => ({
        getBooksBySubject: builder.query<IBook[], { subject: string, pageIndex: number }>({
            query({subject, pageIndex}): string {
                const params = new URLSearchParams();
                params.append("subject", `"subject:${subject}"`);
                params.append("pageIndex", pageIndex.toString());
                return `?${params.toString()}`
            }
        }),
    }),
});

export type GetBooksBySubjectQueryResult = {
    isSuccess: boolean;
    data?: IBook[]; // Specify the type of the `data` property
};

export type GetBooksBySubjectQueryArgs = {
    subject: string;
    pageIndex: number;
};
export const {useGetBooksBySubjectQuery, useLazyGetBooksBySubjectQuery} = booksApi;

// https://redux-toolkit.js.org/rtk-query/overview