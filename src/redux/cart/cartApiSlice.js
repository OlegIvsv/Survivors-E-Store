import { apiSlice } from "../auth/api";


export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        /* Get cart by customer id */
        cart: builder.query({
            query: params => ({
                url: `cart/${params.customerId}`,
                method: 'GET'
            }),
            providesTags:['Cart']    
        }),
        /* Removes item from cart */
        removeItem: builder.mutation({
            query: params => ({
                url: `cart/remove-item/${params.customerId}?productId=${params.productId}`,
                method: 'PUT',
                body: {}
            }),
            invalidatesTags:['Cart']
        }),
        /* Updates item */
        updateItem: builder.mutation({
            query: params => ({
                url: `cart/update-item/${params.customerId}`,
                method: 'PUT',
                body: {...params.item}
            }),
            invalidatesTags: ['Cart']
        })
    })
});

export const { 
    useCartQuery, 
    useRemoveItemMutation,
    useUpdateItemMutation,
} = cartApiSlice;