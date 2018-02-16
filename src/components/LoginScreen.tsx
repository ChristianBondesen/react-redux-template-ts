import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TAG = 'LoginScreen';

export interface ILoginScreenProps {
  label: string;
}

class LoginScreen extends React.Component<ILoginScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
