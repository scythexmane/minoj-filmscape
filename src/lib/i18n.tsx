import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGS = ["ru", "en", "uz"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = {
  ru: "RU",
  en: "EN",
  uz: "UZ",
};

type MenuItem = { name: string; note: string; price: string };
type MenuGroup = { title: string; sub: string; items: MenuItem[] };
type Quote = { text: string; author: string; meta: string };
type Reel = { caption: string; time: string };

export type Dict = {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { about: string; menu: string; reels: string; location: string };
  navMenu: string;
  navClose: string;
  hero: {
    eyebrow: string;
    since: string;
    line1: string;
    line2: string;
    italic: string;
    lead: string;
    cta: string;
    ctaAlt: string;
    scroll: string;
    marquee: string[];
    stats: { k: string; v: string }[];
  };
  about: {
    index: string;
    kicker: string;
    title1: string;
    titleItalic: string;
    body: string;
    facts: [string, string][];
  };
  menu: {
    index: string;
    kicker: string;
    title: string;
    titleItalic: string;
    groups: MenuGroup[];
    footnote: string;
  };
  reels: {
    index: string;
    kicker: string;
    title: string;
    titleItalic: string;
    note: string;
    hint: string;
    captions: Reel[];
  };
  reviews: { index: string; kicker: string; quotes: Quote[] };
  location: {
    index: string;
    kicker: string;
    title: string;
    addressLabel: string;
    address: string;
    addressNote: string;
    hoursLabel: string;
    hours: [string, string][];
    mapCta: string;
    igCta: string;
    caption: string;
  };
  footer: { line1: string; line2: string; tag: string; top: string; rights: string };
};

const ru: Dict = {
  htmlLang: "ru",
  meta: {
    title: "MINOJ by Rumayso — ресторан в Ташкенте",
    description:
      "Minoj by Rumayso — ресторан в Ташкенте: открытый огонь, авторская кухня и вечерний свет. Меню, часы, адрес.",
  },
  nav: { about: "Место", menu: "Меню", reels: "Кадры", location: "Как найти" },
  navMenu: "Меню",
  navClose: "Закрыть",
  hero: {
    eyebrow: "Ташкент — ресторан",
    since: "с 2023",
    line1: "Вечер,",
    line2: "который",
    italic: "длится",
    lead:
      "Открытый огонь, тёмное дерево и золото на стенах. Мы не торопим гостей — здесь ужин занимает столько, сколько нужно разговору.",
    cta: "Забронировать стол",
    ctaAlt: "Смотреть меню",
    scroll: "Листайте",
    marquee: ["Открытый огонь", "Авторская кухня", "Вечерний свет", "Ташкент", "Minoj by Rumayso"],
    stats: [
      { k: "Кухня", v: "до 23:30" },
      { k: "Мангал", v: "уголь, дуб" },
      { k: "Зал", v: "64 места" },
    ],
  },
  about: {
    index: "02",
    kicker: "Место",
    title1: "Не спешить —",
    titleItalic: "это вкус",
    body:
      "Minoj начинался с одного мангала и упрямства: не разбавлять, не подслащивать, не делать вид. Сегодня это зал в Ташкенте, где вечер делится на до ужина и после.",
    facts: [
      ["Огонь", "уголь и дуб, каждый день"],
      ["Кухня", "сезонно, малыми партиями"],
      ["Правило", "второй чай — за разговор"],
    ],
  },
  menu: {
    index: "03",
    kicker: "Меню",
    title: "Что подать",
    titleItalic: "к вечеру",
    groups: [
      {
        title: "С огня",
        sub: "мангал, уголь",
        items: [
          { name: "Каре ягнёнка", note: "розмарин, чеснок, соль", price: "180 000" },
          { name: "Тандыр-кебаб", note: "рубленый, курдюк, зира", price: "78 000" },
          { name: "Дорадо на угле", note: "лимон, тимьян", price: "165 000" },
          { name: "Овощи с дымком", note: "перец, баклажан, лук", price: "48 000" },
        ],
      },
      {
        title: "Кухня",
        sub: "весь день",
        items: [
          { name: "Плов Minoj", note: "девзира, казы, айва", price: "95 000" },
          { name: "Шакшука", note: "хлеб отдельно, не спорим", price: "58 000" },
          { name: "Салат с гранатом", note: "зелень, нават, орех", price: "52 000" },
          { name: "Хлеб из тандыра", note: "печём каждые два часа", price: "16 000" },
        ],
      },
      {
        title: "Кофе и чай",
        sub: "до закрытия",
        items: [
          { name: "Эспрессо", note: "плотный, без сахара по умолчанию", price: "22 000" },
          { name: "Флэт уайт", note: "180 мл, две порции", price: "32 000" },
          { name: "Чай с кардамоном", note: "местная привычка", price: "24 000" },
        ],
      },
    ],
    footnote:
      "Полное меню и доставка — в Taplink. Что-то заканчивается раньше времени: это не баг, это вечерний мангал.",
  },
  reels: {
    index: "04",
    kicker: "Кадры",
    title: "Снято",
    titleItalic: "здесь",
    note: "без ретуши",
    hint: "звук выключен",
    captions: [
      { caption: "Мангал", time: "20:10" },
      { caption: "Подача", time: "21:35" },
      { caption: "Зал", time: "18:40" },
      { caption: "Кофе", time: "23:05" },
    ],
  },
  reviews: {
    index: "05",
    kicker: "Говорят",
    quotes: [
      {
        text: "Пришли на час, остались до закрытия и половину разговора не успели.",
        author: "Камила",
        meta: "постоянный гость",
      },
      {
        text: "Единственное место, где мне не задают вопрос «вам поострее?».",
        author: "Тимур",
        meta: "по пятницам, 20:30",
      },
      { text: "Тут не громко. Это уже редкость.", author: "Дилноза", meta: "Яндекс.Карты" },
    ],
  },
  location: {
    index: "06",
    kicker: "Как найти",
    title: "Ташкент",
    addressLabel: "Адрес",
    address: "Ташкент, Учтепинский район",
    addressNote: "точная точка и вход — в карте и Taplink",
    hoursLabel: "Часы",
    hours: [
      ["Пн — Пт", "11:00 — 23:30"],
      ["Сб — Вс", "11:00 — 00:30"],
    ],
    mapCta: "Открыть на карте",
    igCta: "Instagram",
    caption: "Ориентир — вечерний свет с запада",
  },
  footer: {
    line1: "Заходите вечером.",
    line2: "Или не вечером.",
    tag: "Огонь / Кухня / Люди",
    top: "Наверх",
    rights: "Minoj by Rumayso",
  },
};

const en: Dict = {
  htmlLang: "en",
  meta: {
    title: "MINOJ by Rumayso — restaurant in Tashkent",
    description:
      "Minoj by Rumayso — a Tashkent restaurant built on open fire, chef's cooking and evening light. Menu, hours, address.",
  },
  nav: { about: "Place", menu: "Menu", reels: "Frames", location: "Find us" },
  navMenu: "Menu",
  navClose: "Close",
  hero: {
    eyebrow: "Tashkent — restaurant",
    since: "since 2023",
    line1: "An evening",
    line2: "that keeps",
    italic: "going",
    lead:
      "Open fire, dark timber and gold on the walls. We never rush a table — here dinner lasts exactly as long as the conversation does.",
    cta: "Reserve a table",
    ctaAlt: "See the menu",
    scroll: "Scroll",
    marquee: ["Open fire", "Chef's kitchen", "Evening light", "Tashkent", "Minoj by Rumayso"],
    stats: [
      { k: "Kitchen", v: "till 23:30" },
      { k: "Grill", v: "charcoal, oak" },
      { k: "Room", v: "64 seats" },
    ],
  },
  about: {
    index: "02",
    kicker: "Place",
    title1: "Slowness is",
    titleItalic: "a flavour",
    body:
      "Minoj started with one grill and a stubborn idea: never dilute, never sweeten, never pretend. Today it is a room in Tashkent where the evening splits into before dinner and after.",
    facts: [
      ["Fire", "charcoal and oak, every day"],
      ["Kitchen", "seasonal, small batches"],
      ["House rule", "the second tea is for talking"],
    ],
  },
  menu: {
    index: "03",
    kicker: "Menu",
    title: "What we serve",
    titleItalic: "after dark",
    groups: [
      {
        title: "From the fire",
        sub: "charcoal grill",
        items: [
          { name: "Rack of lamb", note: "rosemary, garlic, salt", price: "180 000" },
          { name: "Tandyr kebab", note: "hand-chopped, cumin", price: "78 000" },
          { name: "Charcoal dorado", note: "lemon, thyme", price: "165 000" },
          { name: "Smoked vegetables", note: "pepper, aubergine, onion", price: "48 000" },
        ],
      },
      {
        title: "Kitchen",
        sub: "all day",
        items: [
          { name: "Minoj plov", note: "devzira rice, quince", price: "95 000" },
          { name: "Shakshuka", note: "bread on the side, no debate", price: "58 000" },
          { name: "Pomegranate salad", note: "herbs, walnut, navat", price: "52 000" },
          { name: "Tandyr bread", note: "baked every two hours", price: "16 000" },
        ],
      },
      {
        title: "Coffee & tea",
        sub: "till close",
        items: [
          { name: "Espresso", note: "dense, unsweetened by default", price: "22 000" },
          { name: "Flat white", note: "180 ml, double shot", price: "32 000" },
          { name: "Cardamom tea", note: "a local habit", price: "24 000" },
        ],
      },
    ],
    footnote:
      "Full menu and delivery live in Taplink. Some dishes run out early — that is not a bug, that is the evening grill.",
  },
  reels: {
    index: "04",
    kicker: "Frames",
    title: "Shot",
    titleItalic: "here",
    note: "unretouched",
    hint: "sound off",
    captions: [
      { caption: "Grill", time: "20:10" },
      { caption: "Plating", time: "21:35" },
      { caption: "Room", time: "18:40" },
      { caption: "Coffee", time: "23:05" },
    ],
  },
  reviews: {
    index: "05",
    kicker: "They say",
    quotes: [
      {
        text: "We came for an hour, stayed till closing and still did not finish the conversation.",
        author: "Kamila",
        meta: "regular guest",
      },
      {
        text: "The only place that never asks me whether I want it milder.",
        author: "Timur",
        meta: "Fridays, 20:30",
      },
      { text: "It is not loud here. That is rare now.", author: "Dilnoza", meta: "Yandex Maps" },
    ],
  },
  location: {
    index: "06",
    kicker: "Find us",
    title: "Tashkent",
    addressLabel: "Address",
    address: "Tashkent, Uchtepa district",
    addressNote: "exact pin and entrance — in the map and Taplink",
    hoursLabel: "Hours",
    hours: [
      ["Mon — Fri", "11:00 — 23:30"],
      ["Sat — Sun", "11:00 — 00:30"],
    ],
    mapCta: "Open in maps",
    igCta: "Instagram",
    caption: "Landmark — the evening light from the west",
  },
  footer: {
    line1: "Come in the evening.",
    line2: "Or not in the evening.",
    tag: "Fire / Kitchen / People",
    top: "Back to top",
    rights: "Minoj by Rumayso",
  },
};

const uz: Dict = {
  htmlLang: "uz",
  meta: {
    title: "MINOJ by Rumayso — Toshkentdagi restoran",
    description:
      "Minoj by Rumayso — Toshkentdagi restoran: ochiq olov, muallif oshxonasi va oqshom yorugʻligi. Menyu, ish vaqti, manzil.",
  },
  nav: { about: "Joy", menu: "Menyu", reels: "Kadrlar", location: "Manzil" },
  navMenu: "Menyu",
  navClose: "Yopish",
  hero: {
    eyebrow: "Toshkent — restoran",
    since: "2023-dan",
    line1: "Oqshom",
    line2: "davom",
    italic: "etadi",
    lead:
      "Ochiq olov, toʻq yogʻoch va devorlardagi tilla. Biz mehmonni shoshirmaymiz — bu yerda kechki ovqat suhbat qancha davom etsa, shuncha davom etadi.",
    cta: "Stol band qilish",
    ctaAlt: "Menyuni koʻrish",
    scroll: "Pastga",
    marquee: ["Ochiq olov", "Muallif oshxonasi", "Oqshom yorugʻligi", "Toshkent", "Minoj by Rumayso"],
    stats: [
      { k: "Oshxona", v: "23:30 gacha" },
      { k: "Mangal", v: "koʻmir, eman" },
      { k: "Zal", v: "64 oʻrin" },
    ],
  },
  about: {
    index: "02",
    kicker: "Joy",
    title1: "Shoshmaslik —",
    titleItalic: "bu ta'm",
    body:
      "Minoj bitta mangal va bir qat'iy qarordan boshlandi: suyultirmaslik, shirin qilmaslik, oʻzini koʻrsatmaslik. Bugun bu — Toshkentdagi zal, unda oqshom ovqatdan oldin va keyinga boʻlinadi.",
    facts: [
      ["Olov", "koʻmir va eman, har kuni"],
      ["Oshxona", "mavsumiy, kichik partiyalarda"],
      ["Qoida", "ikkinchi choy — suhbat uchun"],
    ],
  },
  menu: {
    index: "03",
    kicker: "Menyu",
    title: "Oqshomga",
    titleItalic: "nima bor",
    groups: [
      {
        title: "Olovdan",
        sub: "mangal, koʻmir",
        items: [
          { name: "Qoʻzi qovurgʻasi", note: "rozmarin, sarimsoq, tuz", price: "180 000" },
          { name: "Tandir kabob", note: "maydalangan, zira", price: "78 000" },
          { name: "Koʻmirda dorado", note: "limon, kiyik oʻt", price: "165 000" },
          { name: "Tutunli sabzavot", note: "qalampir, baqlajon, piyoz", price: "48 000" },
        ],
      },
      {
        title: "Oshxona",
        sub: "kun boʻyi",
        items: [
          { name: "Minoj oshi", note: "devzira, qazi, behi", price: "95 000" },
          { name: "Shakshuka", note: "non alohida, bahslashmaymiz", price: "58 000" },
          { name: "Anorli salat", note: "koʻkat, novvot, yongʻoq", price: "52 000" },
          { name: "Tandir non", note: "har ikki soatda yopamiz", price: "16 000" },
        ],
      },
      {
        title: "Qahva va choy",
        sub: "yopilishgacha",
        items: [
          { name: "Espresso", note: "quyuq, shakarsiz", price: "22 000" },
          { name: "Flat white", note: "180 ml, ikki porsiya", price: "32 000" },
          { name: "Kardamonli choy", note: "mahalliy odat", price: "24 000" },
        ],
      },
    ],
    footnote:
      "Toʻliq menyu va yetkazib berish — Taplinkda. Ba'zi taomlar erta tugaydi: bu xato emas, bu oqshom mangali.",
  },
  reels: {
    index: "04",
    kicker: "Kadrlar",
    title: "Shu yerda",
    titleItalic: "olindi",
    note: "retushsiz",
    hint: "ovoz oʻchirilgan",
    captions: [
      { caption: "Mangal", time: "20:10" },
      { caption: "Taqdimot", time: "21:35" },
      { caption: "Zal", time: "18:40" },
      { caption: "Qahva", time: "23:05" },
    ],
  },
  reviews: {
    index: "05",
    kicker: "Aytishadi",
    quotes: [
      {
        text: "Bir soatga kelib, yopilishgacha qoldik va suhbatning yarmini ham tugatmadik.",
        author: "Kamila",
        meta: "doimiy mehmon",
      },
      {
        text: "Menga «achchiqroq qilaymi?» degan savolni bermaydigan yagona joy.",
        author: "Timur",
        meta: "juma, 20:30",
      },
      { text: "Bu yerda shovqin yoʻq. Bu endi kamdan-kam.", author: "Dilnoza", meta: "Yandex Xaritalar" },
    ],
  },
  location: {
    index: "06",
    kicker: "Manzil",
    title: "Toshkent",
    addressLabel: "Manzil",
    address: "Toshkent, Uchtepa tumani",
    addressNote: "aniq nuqta va kirish — xaritada va Taplinkda",
    hoursLabel: "Ish vaqti",
    hours: [
      ["Du — Ju", "11:00 — 23:30"],
      ["Sha — Ya", "11:00 — 00:30"],
    ],
    mapCta: "Xaritada ochish",
    igCta: "Instagram",
    caption: "Mo'ljal — gʻarbdan tushgan oqshom yorugʻligi",
  },
  footer: {
    line1: "Oqshomda keling.",
    line2: "Yoki oqshomda emas.",
    tag: "Olov / Oshxona / Odamlar",
    top: "Yuqoriga",
    rights: "Minoj by Rumayso",
  },
};

const DICTS: Record<Lang, Dict> = { ru, en, uz };

const STORAGE_KEY = "minoj-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const I18nContext = createContext<Ctx>({ lang: "ru", setLang: () => {}, t: ru });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as readonly string[]).includes(stored)) {
      setLangState(stored as Lang);
      return;
    }
    const nav = window.navigator.language.slice(0, 2).toLowerCase();
    if (nav === "uz") setLangState("uz");
    else if (nav === "ru") setLangState("ru");
    else setLangState("en");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = DICTS[lang].htmlLang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: DICTS[lang] }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
