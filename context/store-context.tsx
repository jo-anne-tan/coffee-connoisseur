import { createContext, Dispatch, useReducer } from "react";
import { CoffeeStore } from "../data/coffee_store";

type StoreContextType = {
  latLong: string;
  coffeeStores: CoffeeStore[];
};

type Action =
  | { type: "SET_LAT_LONG"; payload: { latLong: string } }
  | { type: "SET_COFFEE_STORES"; payload: { coffeeStores: CoffeeStore[] } };

const initialState: StoreContextType = {
  latLong: "",
  coffeeStores: [],
};

export const StoreContext = createContext<{
  state: StoreContextType;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const StoreProvider = ({ children }) => {
  const initValue = { ...initialState };

  const storeReducer = (
    state: StoreContextType,
    action: Action
  ): StoreContextType => {
    console.log(action);
    switch (action.type) {
      case "SET_LAT_LONG": {
        return { ...state, latLong: action.payload.latLong };
      }
      case "SET_COFFEE_STORES": {
        return { ...state, coffeeStores: [...action.payload.coffeeStores] };
      }
      default:
        throw new Error(`Unhandled action type`);
    }
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
