import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './services/productsApi';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer, // RTK Query slice
        cart: cartReducer, // Global cart state
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware), // Add middleware for RTK Query
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
