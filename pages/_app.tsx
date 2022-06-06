import "../styles/globals.css";
import type { AppProps } from "next/app";
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className="p-10 h-screen text-gray-700"
      style={{
        backgroundImage: "url(/static/mesh-gradient.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "50%",
        height: "100%",
      }}
    >
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}

export default MyApp;
