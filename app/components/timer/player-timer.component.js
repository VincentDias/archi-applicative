// app/components/board/timers/player-timer.component.js

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../../contexts/socket.context";

const PlayerTimer = () => {
  const socket = useContext(SocketContext);
  const [playerTimer, setPlayerTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setPlayerTimer(data["playerTimer"]);
    });
  }, []);

  return (
    <View style={style.playerTimerContainer}>
      <Text>Timer: {playerTimer}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  playerTimerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
});

export default PlayerTimer;
