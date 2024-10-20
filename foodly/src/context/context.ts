import { IPlate } from "@/components/Hero";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
let InitialState: boolean = false;
if (typeof window !== "undefined") {
  InitialState = window.localStorage.getItem("isLoggedIn") === "true";
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: InitialState,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
export interface IOrderItem {
  plat: IPlate;
  quantity: number;
}

export interface IOrder {
  name?: string;
  phone?: string;
  location?: string;
  isConfirmed?: boolean;
  order: IOrderItem[];
  addQuantity: (plat: IPlate) => void;
  subQuantity: (platId: string) => void;
  getTotalAmount: () => number;
}

export const useOrderStore = create<IOrder>((set, get) => ({
  order: [],

  // Add quantity to an existing plate or add it if it doesn't exist
  addQuantity: (plat) =>
    set((state) => {
      const existingPlate = state.order.find(
        (item) => item.plat._id === plat._id
      );

      if (existingPlate) {
        return {
          order: state.order.map((item) =>
            item.plat._id === plat._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        order: [...state.order, { plat, quantity: 1 }],
      };
    }),

  // Decrease the quantity of a plate, and remove it if quantity becomes 0
  subQuantity: (platId) =>
    set((state) => ({
      order: state.order
        .map((item) =>
          item.plat._id === platId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Calculate the total amount of the order
  getTotalAmount: () => {
    const state = get(); // Access the state using `get()`
    return state.order.reduce(
      (total, item) => total + (item.plat.price as number) * item.quantity,
      0
    );
  },
}));
