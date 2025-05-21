import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";

const PlayerTokens = () => {
  const socket = useContext(SocketContext);
  const [playerTokens, setPlayerTokens] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setPlayerTokens(data["playerInfos"]["tokens"]);
    });
  }, []);
  return <View>{playerTokens} </View>;
};

const styles = StyleSheet.create({
  playerTokensContainer: {
    marginTop: 6,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default PlayerTokens;
