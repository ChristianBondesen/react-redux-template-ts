import { Platform, StyleSheet } from 'react-native';

import { Constants } from 'expo';
import { screenDimens, isIphoneX } from './utils/screenUtils';

export const colors = {
  PRIMARY: '#fff',
  PRIMARY_DARK: '#E1BEE7',
  SECONDARY: '#84356b',
  TEXT_PRIMARY: '#212121',
  TEXT_SECONDARY: 'grey',
  CONTAINER_BACKGROUND_COLOR: '#ffffff',
};

export const dimensions = {
  VIEW_PADDING: 8,
};

export const NAVBAR_HEIGHT = isIphoneX() ? 88 : 64;
export const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

export const FONT_NORMAL = 'System'; // on iOS, System = San Fransisco

export const globalSheet = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.TEXT_PRIMARY,
    fontFamily: FONT_NORMAL,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '300',
    fontFamily: FONT_NORMAL,
    color: colors.TEXT_PRIMARY,
  },
  breadText: {
    fontSize: 15,
    fontWeight: '100',
    fontFamily: FONT_NORMAL,
    color: colors.TEXT_PRIMARY,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: FONT_NORMAL,
    textAlign: 'center',
    marginVertical: 8,
  },
  containerView: {
    flex: 1,
    // paddingTop:
    //   Platform.OS === 'ios'
    //     ? dimens.STATUS_BAR_HEIGHT + dimens.VIEW_PADDING * 2
    //     : dimens.VIEW_PADDING,
    paddingTop: NAVBAR_HEIGHT,
    backgroundColor: colors.CONTAINER_BACKGROUND_COLOR,
  },
});
