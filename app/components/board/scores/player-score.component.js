import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SocketContext } from '../../../../contexts/socket.context';

const PlayerScore = () => {
  const socket = useContext(SocketContext);
  const [playerScore, setPlayerScore] = useState(0);
  useEffect(() => {
    socket.on('game.players-infos.view-state', data => {
      setPlayerScore(data['playerInfos']['score']);
    });
  }, []);
  return (
    <View style={styles.playerScoreContainer}>
      Score: {playerScore}
    </View>
  );
};

const styles = StyleSheet.create({
  playerScoreContainer: {
    marginTop: 4,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PlayerScore;
