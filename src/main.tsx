import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles.css';
<<<<<<< HEAD
import { isPushSupported, registerServiceWorker } from './pushClient';
=======
import { initAppStorage } from './storage/appStorage';
import { loadAppearanceTheme } from './appearance/appearanceTheme';
import { applyAppearanceTheme } from './appearance/applyAppearanceTheme';
>>>>>>> b41cdaf (update)

const rootEl = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootEl);

<<<<<<< HEAD
// 页面加载后尝试注册 Service Worker，用于 Web Push
if (isPushSupported()) {
  // 不阻塞首屏渲染，异步注册
  registerServiceWorker().catch((err) => {
    console.error('Service Worker 注册失败:', err);
  });
}
=======
// 启动时先初始化（并迁移）本地持久化存储：localStorage -> IndexedDB KV
// 这样后续所有 getItem 都是同步读内存缓存，不会出现首屏读不到数据的问题。
(async () => {
  try {
    await initAppStorage({ migrateFromLocalStorage: true });
  } catch {
    // ignore
  }
  try {
    applyAppearanceTheme(loadAppearanceTheme());
  } catch {
    // ignore
  }
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
>>>>>>> b41cdaf (update)


