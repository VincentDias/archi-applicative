// <app/controller / online - game.controller.js

import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Board from "../components/board/board.component";
import { SocketContext } from "../contexts/socket.context";

export default function BotGameController() {
  const socket = useContext(SocketContext);
  const [inQueue, setInQueue] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [idOpponent, setIdOpponent] = useState(null);


    useEffect(() => {
      socket.emit("queue.join","bot");
      setInQueue(false);
      setInGame(false);

      socket.on("queue.added", (data) => {
        setInQueue(data["inQueue"]);
        setInGame(data["inGame"]);
      });
      socket.on("game.start", (data) => {
        setInQueue(data["inQueue"]);
        setInGame(data["inGame"]);
        setIdOpponent(data["idOpponent"]);
      });
    }, []);
  return (
    <View style={styles.container}>
      {!inQueue && !inGame && (
        <>
          <Text style={styles.waitingTitle}>Waiting for server datas...</Text>
        </>
      )}
      {inQueue && (
        <>
            <View style={styles.informationContainer}>
              <View></View>
              <View>
                <Text style={styles.waitingTitle}>
                  Waiting...
                </Text>
              </View>
            </View>
        </>
      )}
      {inGame && (
        <>
          <Board idOpponent={idOpponent} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});