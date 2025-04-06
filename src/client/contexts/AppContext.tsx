import React, { createContext, useState, ReactNode } from "react";

// Define types for the context
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface CartItem extends Product {
    quantity: number; // Include quantity for cart items
}

interface AppContextType {
    products: Product[];
    setProducts: (products: Product[]) => void;
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateCartItemQuantity: (productId: number, quantity: number) => void;
}

// Default values for context
const defaultValue: AppContextType = {
    products: [],
    setProducts: () => {return},
    cart: [],
    addToCart: () => {return},
    removeFromCart: () => {return},
    updateCartItemQuantity: () => {return},
};

// Create the context
export const AppContext = createContext<AppContextType>(defaultValue);

// Define the provider's props
interface AppProviderProps {
    children: ReactNode;
}

// Create the context provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    // Add product to cart
    const addToCart = (product: Product) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find((item) => item.id === product.id);
            if (existingItem) {
                // Update the quantity of the existing product
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add a new item to the cart
                return [...currentCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove product from cart
    const removeFromCart = (productId: number) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== productId)
        );
    };

    // Update the quantity of a cart item
    const updateCartItemQuantity = (productId: number, quantity: number) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(0, quantity) }
                    : item
            )
        );
    };

    return (
        <AppContext.Provider
            value={{
                products,
                setProducts,
                cart,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};