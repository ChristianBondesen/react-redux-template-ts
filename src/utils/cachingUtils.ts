import { AppLoading, Asset, Font } from 'expo';
import { View, Text, Image } from 'react-native';
import {
  FontAwesome,
  Foundation,
  Ionicons,
  SimpleLineIcons,
  Octicons,
  Entypo,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
};

export const loadAndCacheAssets = async () => {
  // const imageAssets = cacheImages([
  //   'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  //   require('./assets/images/circle.jpg'),
  // ]);

  const fontAssets = cacheFonts([
    FontAwesome.font,
    Foundation.font,
    Ionicons.font,
    SimpleLineIcons.font,
    Octicons.font,
    Entypo.font,
    EvilIcons.font,
    MaterialIcons.font,
    MaterialCommunityIcons.font,
  ]);

  await Promise.all([
    // ...imageAssets,
    ...fontAssets,
  ]);
};
