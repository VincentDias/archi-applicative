import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";
const OpponentInfos = () => {
  const socket = useContext(SocketContext);
  const [opponentInfos, setOpponentInfos] = useState({});
  const [gameType, setGameType] = useState("");

  useEffect(() => {
    socket.on("game.players-infos.view-state", (data) => {
      setOpponentInfos(data["opponentInfos"]);
      setGameType(data["opponentInfos"]["gameType"]);
    });
  }, []);

  return (
    <View>
      {gameType === "bot" ? (
        <></>
      ) : (
        <>{opponentInfos.playerKey && replaceString(opponentInfos.playerKey, "player:", "joueur ")}</>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  opponentInfosContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.ZELDA_SECONDARY,
  },
  opponentImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  opponentInfosText: {
    color: COLOR.WHITE,
    fontFamily: "Hylia-Serif",
    fontSize: 20,
  },
});

export default OpponentInfos;
