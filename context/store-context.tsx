import { createContext, Dispatch, useReducer } from "react";
import { CoffeeStore, CoffeeStoreAirtable } from "../data/coffee_store";
import { CoffeeStoreAirtableFormatter } from "../lib/coffee-stores";

type StoreContextType = {
  latLong: string;
  coffeeStores: CoffeeStoreAirtable[];
};

type Action =
  | { type: "SET_LAT_LONG"; payload: { latLong: string } }
  | {
      type: "SET_COFFEE_STORES";
      payload: { coffeeStores: CoffeeStoreAirtable[] };
    };

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

type Props = {
  children?: React.ReactNode;
};
const StoreProvider: React.FC<Props> = ({ children }) => {
  const initValue = { ...initialState };

  const storeReducer = (
    state: StoreContextType,
    action: Action
  ): StoreContextType => {
    // console.log(action);
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

  const [state, dispatch] = useReducer(storeReducer, initValue);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
