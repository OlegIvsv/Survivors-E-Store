import { apiSlice } from "./api";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.query({
            query: params => ({
                url: 'auth',
                method: 'POST',
                body: {...params}
            })
        })
    })
});

export const { useLoginQuery } = authApiSlice;