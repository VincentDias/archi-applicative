import { useContext, useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SocketContext } from "../../../../contexts/socket.context";
import Modal from "react-native-modal";
import NavigationButton from "../../../navigation-button.component";

const GameInfo = () => {
  const socket = useContext(SocketContext);
  const [gameInfos, setGameInfos] = useState({});
  const isGameInfosExist = Object.keys(gameInfos).length !== 0;
  const [isGameDraw, setIsGameDraw] = useState(false);

  useEffect(() => {
    socket.on("game.game-over", (data) => {
      setGameInfos(data["gameInfos"]);
      setIsGameDraw(data["gameInfos"].winner === "draw");
    });
  }, []);

  return (
    <View>
      <Text>Résumé de la partie</Text>
      <View>
        {isGameDraw && (
          <View>
            <Text style={[styles.gameInfoSemiTitle, { marginBottom: 10 }]}>galité</Text>
          </View>
        )}
        <View>
          {!isGameDraw && (
            <View>
              <Image style={{ width: 35, height: 35 }} />
              <Text>Vainqueur</Text>
            </View>
          )}
          <View>
            <Text>Joueur {gameInfos.winner === "draw" ? "1" : gameInfos.winner}</Text>
          </View>
          <View>
            <Text>Pion(s) utilisé(s)</Text>
            <Text>{gameInfos.winnerUsedTokens}</Text>
          </View>
          {gameInfos.winnerScore !== null && (
            <View>
              <Text>Score</Text>
              <Text>{gameInfos.winnerScore}</Text>
            </View>
          )}
        </View>
        <View style={styles.gameInfo}>
          {!isGameDraw && (
            <View>
              <Text>Perdant</Text>
            </View>
          )}
          <View>
            {gameInfos.gameType === "bot" ? (
              <View>
                <Text>Bot</Text>
              </View>
            ) : (
              <Text>Joueur {gameInfos.loser === "draw" ? "2" : gameInfos.loser}</Text>
            )}
          </View>
          <View>
            <Text>Token(s) utilisé(s)</Text>
            <Text>{gameInfos.loserUsedTokens}</Text>
          </View>
          {gameInfos.loserScore !== null && (
            <View>
              <Text>Score</Text>
              <Text>{gameInfos.loserScore}</Text>
            </View>
          )}
        </View>
      </View>
      <View>
        <View style={{ width: "50%" }}>
          <Text>Durée</Text>
          <Text>{gameInfos.gameDuration}</Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text>Type de victoire</Text>
          <Text>{isGameDraw ? "-" : gameInfos.victoryType}</Text>
        </View>
        <View>
          <Text>Type de jeu</Text>

          <Text>{gameInfos.gameType}</Text>
        </View>
      </View>
      <NavigationButton
        navigation={navigation}
        navigationMenu={"Yam Master"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gameInfoContainer: {},
  gameInfoModal: {
    borderRadius: 10,
  },
});

export default GameInfo;
