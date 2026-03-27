import { useEffect } from 'react';

export const useTelegram = () => {
  const tg = (window as any).Telegram?.WebApp;
  const initData = tg?.initData || '';
  const user = tg?.initDataUnsafe?.user;

  useEffect(() => {
    if (tg) {
      tg.expand();
      tg.ready(); 
    }
  }, [tg]);

  return { tg, initData, user };
};