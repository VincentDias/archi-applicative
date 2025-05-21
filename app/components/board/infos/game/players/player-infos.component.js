import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";

const PlayerInfos = () => {
  const socket = useContext(SocketContext);
  const [playerInfos, setPlayerInfos] = useState({});

  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerInfos(data["playerInfos"]);
    });
  }, []);
  return (
    <View style={styles.playerInfosContainer}>
          {playerInfos.playerKey &&
            replaceString(playerInfos.playerKey, "player:", "joueur ")}
    </View>
  );
};

const styles = StyleSheet.create({
  playerInfosContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default PlayerInfos;