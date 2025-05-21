import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";

const OpponentTokens = () => {
  const socket = useContext(SocketContext);
  const [opponentTokens, setOpponentTokens] = useState(0);
  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentTokens(data["opponentInfos"]["tokens"]);
    });
  }, []);
  return (
    <View >{opponentTokens}</View>
  );
};

const styles = StyleSheet.create({
  opponentTokensContainer: {
    marginTop: 6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default OpponentTokens;