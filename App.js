import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SocketContext, socket } from "./app/contexts/socket.context";
import HomeScreen from "./app/screens/home.screen";
import OnlineGameScreen from "./app/screens/online-game-screen";
import VsBotGameScreen from "./app/screens/vs-bot-game-screen";

const Stack = createStackNavigator();

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
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
        </Stack.Navigator>
      </NavigationContainer>
    </SocketContext.Provider>
  );
}

export default App;
