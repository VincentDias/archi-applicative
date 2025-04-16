// app/components/board/timers/player-timer.component.js

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";

const OpponentTimer = () => {
  const socket = useContext(SocketContext);
  const [opponentTimer, setOpponentTimer] = useState(0);

  useEffect(() => {
    socket.on("game.timer", (data) => {
      setOpponentTimer(data["opponentTimer"]);
    });
  }, []);

  return (
    <View style={style.opponentTimerContainer}>
      <Text>Timer: {opponentTimer}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  opponentScoreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OpponentTimer;
