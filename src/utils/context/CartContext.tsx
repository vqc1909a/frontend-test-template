'use client';
import {createContext} from "react";
import { Game } from "../endpoint";
import { CartItem } from "../hooks/useCart";

export interface CartContextProps {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  isInCart: (gameId: string) => boolean;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

