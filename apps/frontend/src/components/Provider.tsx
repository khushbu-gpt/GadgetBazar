"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import PersistWrapper from "next-persist/lib/NextPersistWrapper";

const npConfig = {
  method: "localStorage",
  allowList: {
    Auth: ["auth", "loading", "error"],
  },
};
export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistWrapper wrapperConfig={npConfig}>{children}</PersistWrapper>
    </Provider>
  );
}
