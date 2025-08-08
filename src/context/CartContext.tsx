"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type Size = {
    label: string;
    price: number;
};

type CartItem = {
    id: string; // from Sanity
    title: string;
    description: string;
    image: string;
    size: Size;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, sizeLabel: string) => void;
    incrementQuantity: (id: string, sizeLabel: string) => void;
    decrementQuantity: (id: string, sizeLabel: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.id === newItem.id && item.size.label === newItem.size.label
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id && item.size.label === newItem.size.label
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                return [...prevItems, newItem];
            }
        });
    };

    const removeItem = (id: string, sizeLabel: string) => {
        setItems((prevItems) =>
            prevItems.filter(
                (item) => !(item.id === id && item.size.label === sizeLabel)
            )
        );
    };

    const incrementQuantity = (id: string, sizeLabel: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.size.label === sizeLabel
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (id: string, sizeLabel: string) => {
        setItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id && item.size.label === sizeLabel
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                incrementQuantity,
                decrementQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used inside CartProvider');
    return context;
};
