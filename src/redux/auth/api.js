import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    /* Test base url */
    baseUrl: 'https://localhost:7015/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        /* Set JWT-token if there is one (for each request based on apiSlice)*/
        const token = getState().auth.token;
        if(!token)
            return headers;
        headers.append('Authorization', `Bearer ${token}`)
    }
});

export const apiSlice = createApi({
    tagTypes:['Cart'],
    baseQuery: baseQuery,
    endpoints: builder => ({})
});