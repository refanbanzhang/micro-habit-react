import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import language from '@/hooks/useLanguage';

const { getLanguage } = language();

// zh-cn/en-us是什么意思
// 语言-国家
// zh代表中文
// cn代表中国

// en代表英文
// us代表美国

export const langs = {
  en: { nativeName: 'English', name: 'en' },
  zh: { nativeName: '简体中文', name: 'zh' },
  ja: { nativeName: '日本語', name: 'ja' },
};


const resources = {
  zh: {
    translation: {
      time: '时间',
      checklist: '检查清单',
      belief: '信条'
    }
  },
  en: {
    translation: {
      time: 'Time',
      checklist: 'Checklist',
      belief: 'Belief'
    }
  },
  ja: {
    translation: {
      time: 'じかん',
      checklist: 'チェックリスト',
      belief: 'しんねん'
    }
  }
}

i18n.use(initReactI18next).init({
  fallbackLng: getLanguage(),
  interpolation: {
    // not needed for react as it escapes by default
    escapeValue: false,
  },
  resources
});

export default i18n;
