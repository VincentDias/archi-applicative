// app/components/board/decks/player-deck.component.js

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import Dice from "./dice.component";
import { DiceContext } from "../../../contexts/dice.context";

const PlayerDeck = () => {
  const socket = useContext(SocketContext);
  const [displayPlayerDeck, setDisplayPlayerDeck] = useState(false);
  const [dices, setDices] = useState(Array(5).fill(false));
  const [displayRollButton, setDisplayRollButton] = useState(false);
  const [rollsCounter, setRollsCounter] = useState(1);
  const [rollsMaximum, setRollsMaximum] = useState(3);
  const [isDiceAnimated, setIsDiceAnimated] = useState(false);

  const { isDiceRolled, setIsDiceRolled } = useContext(DiceContext);

  useEffect(() => {
    socket.on("game.deck.view-state", (data) => {
      setDisplayPlayerDeck(data["displayPlayerDeck"]);
      if (data["displayPlayerDeck"]) {
        setDisplayRollButton(data["displayRollButton"]);
        setRollsMaximum(data["rollsMaximum"]);
        setDices(data["dices"]);
        setRollsCounter(data["rollsCounter"]);
      }
    });
  }, []);

  useEffect(() => {
    if (isDiceRolled) {
      setIsDiceAnimated(true);
    }
  }, [isDiceRolled]);

  const toggleDiceLock = (index) => {
    const newDices = [...dices];
    if (newDices[index].value !== "" && displayRollButton) {
      socket.emit("game.dices.lock", newDices[index].id);
      setIsDiceAnimated(false);
    }
  };

  const rollDices = () => {
    if (rollsCounter === 1) {
      socket.emit("game.dices.roll");
      setIsDiceAnimated(true);

      return;
    }

    if (rollsCounter <= rollsMaximum) {
      setTimeout(() => {
        socket.emit("game.dices.roll");
      }, 2500);
    }
    setIsDiceAnimated(true);
  };

  return (
    <View style={styles.deckPlayerContainer}>
      {displayPlayerDeck && (
        <>
          {displayRollButton && (
            <>
              <View style={styles.rollInfoContainer}>
                <Text style={styles.rollInfoText}>
                  Lancer {rollsCounter} / {rollsMaximum}
                </Text>
              </View>
            </>
          )}

          <View style={styles.diceContainer}>
            {dices.map((diceData, index) => (
              <Dice
                key={diceData.id}
                index={index}
                locked={diceData.locked}
                value={diceData.value}
                onPress={toggleDiceLock}
              />
            ))}
          </View>

          {displayRollButton && (
            <>
              <TouchableOpacity
                style={styles.rollButton}
                onPress={rollDices}>
                <Text style={styles.rollButtonText}>Roll</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  deckPlayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  rollInfoContainer: {
    marginBottom: 10,
  },
  rollInfoText: {
    fontSize: 14,
    fontStyle: "italic",
  },
  diceContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rollButton: {
    width: "30%",
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  rollButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default PlayerDeck;
