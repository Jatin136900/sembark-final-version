import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types/Product';
import { CartContext } from './cart-context';

const STORAGE_KEY = 'sembark-cart';

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

  function addToCart(product: Product, quantity = 1) {
    const nextQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);

      if (!existingProduct) {
        return [...currentCart, { ...product, quantity: nextQuantity }];
      }

      return currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + nextQuantity }
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
