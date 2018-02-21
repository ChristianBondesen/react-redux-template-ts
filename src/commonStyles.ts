import { Platform, StyleSheet } from 'react-native';

import { Constants } from 'expo';
import { screenDimens, isIphoneX } from './utils/screenUtils';

export const COLORS = {
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

export const FONT_NORMAL = 'System';

export const GLOBAL_STYLES = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.TEXT_PRIMARY,
    fontFamily: FONT_NORMAL,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '300',
    fontFamily: FONT_NORMAL,
    color: COLORS.TEXT_PRIMARY,
  },
  breadText: {
    fontSize: 15,
    fontWeight: '100',
    fontFamily: FONT_NORMAL,
    color: COLORS.TEXT_PRIMARY,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: FONT_NORMAL,
    textAlign: 'center',
    marginVertical: 8,
  },
});
