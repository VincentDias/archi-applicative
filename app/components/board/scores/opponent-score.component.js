import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SocketContext } from '../../../../contexts/socket.context';

const OpponentScore = () => {
  const socket = useContext(SocketContext);
  const [opponentScore, setOpponentScore] = useState(0);
  useEffect(() => {
    socket.on('game.players-infos.view-state', data => {
      setOpponentScore(data['opponentInfos']['score']);
    });
  }, []);
  return (
    <View style={styles.opponentScoreContainer}>{opponentScore}
    </View>
  );
};

const styles = StyleSheet.create({
  opponentScoreContainer: {
    marginTop: 4,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OpponentScore;
