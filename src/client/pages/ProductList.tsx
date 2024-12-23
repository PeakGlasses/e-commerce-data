import React from 'react';
import { useGetProductsQuery } from '../store/services/productsApi';

export const ProductList = () => {
    const { data: products, isLoading, error } = useGetProductsQuery('sort=price:desc');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products.</div>;

    return (
        <div>
            {products?.map((product: { id: string, name: string, price: number }) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
};
