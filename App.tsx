import Navigation from "@/navigation";
import store from "@/store/store";
import theme from "@/utils/theme";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Provider store={store}>
          <SWRConfig
            value={{
              provider: () => new Map(),
              isVisible: () => {
                return true;
              },
              initFocus(callback) {
                let appState = AppState.currentState;

                const onAppStateChange = (nextAppState: any) => {
                  /* If it's resuming from background or inactive mode to active one */
                  if (
                    appState.match(/inactive|background/) &&
                    nextAppState === "active"
                  ) {
                    callback();
                  }
                  appState = nextAppState;
                };

                // Subscribe to the app state change events
                const subscription = AppState.addEventListener(
                  "change",
                  onAppStateChange
                );

                return () => {
                  subscription.remove();
                };
              },
            }}
          >
            <Navigation />
          </SWRConfig>
          <StatusBar translucent />
        </Provider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
