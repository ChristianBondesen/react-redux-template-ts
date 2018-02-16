import { Dimensions, Platform } from 'react-native';

const TAG = 'screenUtils.ts';

const screenDimens = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

const isIphoneX = () => {
  const dimensions = Dimensions.get('window');
  const { height, width } = dimensions;

  const result =
    // This has to be iOS duh
    Platform.OS === 'ios' &&
    // Accounting for the height in either orientation
    (height === 812 || width === 812);

  return result;
};

export { screenDimens, isIphoneX };
