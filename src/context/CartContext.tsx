import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types/Product';

interface CartContextValue {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

const STORAGE_KEY = 'sembark-cart';

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const savedCart = window.sessionStorage.getItem(STORAGE_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart) as CartItem[];
  } catch {
    return [];
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(readCartFromStorage);

  useEffect(() => {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);

      if (!existingProduct) {
        return [...currentCart, { ...product, quantity: 1 }];
      }

      return currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function removeFromCart(productId: number) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart, totalItems, totalPrice, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider.');
  }

  return context;
}
