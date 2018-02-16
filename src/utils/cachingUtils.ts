import { FontAwesome } from '@expo/vector-icons';
import { Asset, Font } from 'expo';
import { Image } from 'react-native';
import { Images } from '../Images';

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
  const imageAssets = cacheImages([
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    Images.icon,
  ]);

  const fontAssets = cacheFonts([FontAwesome.font]);

  await Promise.all([...imageAssets, ...fontAssets]);
};
