import { Constants } from 'expo';

import * as devConfig from './../../config.dev.json';
import * as prodConfig from './../../config.prod.json';

interface IConfig {
  urls: {
    baseAPIURL: string;
    termsURL: string;
  };
}

const getConfig = (): IConfig => {
  if (Constants.manifest.releaseChannel) {
    const { releaseChannel } = Constants.manifest;
    if (releaseChannel.indexOf('prod') !== -1) {
      // @ts-ignore
      return prodConfig; // this would pick up prod-v1, prod-v2, prod-v3
    }
    if (releaseChannel.indexOf('stage') !== -1) {
      // @ts-ignore
      return prodConfig; // return staging environment variables
    }
  }
  // @ts-ignore
  return devConfig; // releaseChannel does not exist in dev mode
};

export { getConfig, IConfig };
