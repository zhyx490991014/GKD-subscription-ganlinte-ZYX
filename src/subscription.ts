import { defineGkdSubscription } from '@gkd-kit/define';
import { RawApp, RawAppGroup } from '@gkd-kit/api';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups, { OPEN_AD_ORDER } from './globalGroups';

const apps = await batchImportApps(`${import.meta.dirname}/apps`);
const rawApps: RawApp[] = [];
apps.forEach((appConfig) => {
  appConfig.groups?.forEach((g: RawAppGroup) => {
    if (!g.name.startsWith('开屏广告')) {
      g.enable = false;
    } else {
      g.order = OPEN_AD_ORDER;
    }
  });
  rawApps.push(appConfig);
});

export default defineGkdSubscription({
  id: 1996001,
  name: 'ZYX 的 GKD 订阅',
  version: 0,
  author: 'zhyx1996',
  supportUri: 'https://github.com/zhyx1996/GKD-subscription-ganlinte-ZYX',
  checkUpdateUrl: './zhyx1996_gkd.version.json5',
  categories,
  globalGroups,
  apps: rawApps,
});
