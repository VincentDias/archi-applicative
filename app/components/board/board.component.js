// app/components/board/board.component.js
import { StyleSheet, View } from "react-native";
import { DiceState } from "../../contexts/dice.context";
import Choices from "./choices/choices.component";
import OpponentDeck from "./decks/opponent-deck.component";
import PlayerDeck from "./decks/player-deck.component";
import Grid from "./grid/grid.component";
import GameInfo from "./infos/game-info.component";
import OpponentScore from "./scores/opponent-score.component";
import OpponentInfos from "./infos/game/players/opponent-infos.component";
import PlayerInfos from "./infos/game/players/player-infos.component";
import PlayerScore from "./scores/player-score.component";
import OpponentTimer from "./timers/opponent-timer.component";
import PlayerTimer from "./timers/player-timer.component";
import OpponentTokens from "./tokens/opponent-tokens.component";
import PlayerTokens from "./tokens/player-tokens.component";

const Board = ({ gameViewState }) => {
  return (
    <DiceState>
      <GameInfo />
      <View style={[styles.row, { height: "8%" }]}>
        <OpponentInfos />
        <View style={styles.opponentTimerScoreTokenContainer}></View>
        <OpponentScore />
        <OpponentTokens />
        <OpponentTimer />
      </View>
      <View style={[styles.row, { height: "25%" }]}>
        <OpponentDeck />
      </View>
      <View style={[styles.row, { height: "34%" }]}>
        <Grid />
        <Choices />
      </View>
      <View style={[styles.row, { height: "25%" }]}>
        <PlayerDeck />
      </View>
      <View style={[styles.row, { height: "8%" }]}>
        <PlayerInfos />
        <View style={styles.playerTimerScoreTokenContainer}>
          <PlayerScore />
          <PlayerTokens />
          <PlayerTimer />
        </View>
      </View>
    </DiceState>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  opponentTimerScoreContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  playerTimerScoreContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
});

export default Board;
