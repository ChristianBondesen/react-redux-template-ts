import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { IAppState } from '../state/ducks';
import { ICommonOperations } from '../state/ducks/common/operations';
import { commonOperations } from './../state/ducks/common';
import { getCommonViewState } from '../state/ducks/common/selectors';

const TAG = 'LoginScreen';

export interface ILoginScreenProps {
  commonOperations: ICommonOperations;
  networkCalls: number;
}

class LoginScreen extends React.Component<ILoginScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>You have made {this.props.networkCalls} network calls</Text>
        <Button
          title="Make call"
          onPress={this.props.commonOperations.asyncOperation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: IAppState, ownProps) => {
  return {
    networkCalls: getCommonViewState(state.common).numberOfCalls,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    commonOperations: bindActionCreators(commonOperations, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
