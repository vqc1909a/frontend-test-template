import { allGames } from "@/utils/endpoint";
import { useCart } from "@/utils/hooks/useCart";
import { cleanup, renderHook } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";


describe("Tests on useCart hook", () => {
  beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

  test("should return the default values", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.addToCart).toEqual(expect.any(Function));
    expect(result.current.removeFromCart).toEqual(expect.any(Function));
    expect(result.current.isInCart).toEqual(expect.any(Function));
  })

  test("should add an item to the cart", () => {
    const { result } = renderHook(() => useCart());
    const game = allGames[0];
    const cartItems = [
      { product: game, quantity: 1 }
    ]

    act(() => {
      result.current.addToCart(game);
    })
    expect(result.current.cartItems).toEqual(cartItems);
    expect(result.current.totalPrice).toBe(cartItems[0].product.price * cartItems[0].quantity);
  });

  test("should remove an item from the cart", () => {
    const { result } = renderHook(() => useCart());
    const game1 = allGames[0];
    const game2 = allGames[1];

    let cartItems = [
      { product: game1, quantity: 1 },
      { product: game2, quantity: 1 }
    ]
    act(() => {
      result.current.addToCart(game1);
      result.current.addToCart(game2);
    });
    expect(result.current.cartItems).toHaveLength(2);
    expect(result.current.cartItems).toEqual(cartItems);
    expect(result.current.totalPrice).toBe(cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0));

    act(() => {
      result.current.removeFromCart("1");
    });
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems).toEqual(cartItems.slice(1));
    expect(result.current.totalPrice).toBe(cartItems.slice(1).reduce((acc, item) => acc + item.product.price * item.quantity, 0));
  });

  test("should verify if an item is in the cart", () => {
    const { result } = renderHook(() => useCart());
    const game1 = allGames[0];
    const game2 = allGames[1];

    act(() => {
      result.current.addToCart(game1);
    });
    expect(result.current.isInCart("1")).toBe(true);
    expect(result.current.isInCart("2")).toBe(false);

    act(() => {
      result.current.addToCart(game2);
    });
    expect(result.current.isInCart("2")).toBe(true);

    act(() => {
      result.current.removeFromCart("2");
    });
    expect(result.current.isInCart("2")).toBe(false);
  });
  
  test("should load cart from localStorage", () => {
    const game1 = allGames[0];
    const game2 = allGames[1];
    const cartItems = [
      { product: game1, quantity: 1 },
      { product: game2, quantity: 2 }
    ];
    const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify({ cartItems, totalPrice }));

    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toEqual(JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}').cartItems);
    expect(result.current.totalPrice).toBe(JSON.parse(localStorage.getItem("cart") || '{"cartItems": [], "totalPrice": 0}').totalPrice);
  });
});