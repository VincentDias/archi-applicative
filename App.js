import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { SocketContext, socket } from "./app/contexts/socket.context";
import { AuthProvider, useAuth } from "./app/contexts/auth.context";
import HomeScreen from "./app/screens/home.screen";
import OnlineGameScreen from "./app/screens/online-game-screen";
import VsBotGameScreen from "./app/screens/vs-bot-game-screen";
import { AuthScreen } from "./app/screens/AuthScreen";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);

const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="OnlineGameScreen"
            component={OnlineGameScreen}
          />
          <Stack.Screen
            name="VsBotGameScreen"
            component={VsBotGameScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <SocketContext.Provider value={socket}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </SocketContext.Provider>
    </AuthProvider>
  );
}

export default App;
