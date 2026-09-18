export type Verification = "confirmed" | "family-archive" | "probable" | "inferred";
export type Branch = "sharf" | "fot" | "join";
export type Gender = "m" | "f";

export type LifeEvent = {
  year: number;
  month?: number;
  day?: number;
  title: string;
  detail?: string;
};

export type SourceRef = {
  label: string;
  url?: string;
  note?: string;
};

export type Person = {
  id: string;
  name: string;
  years: string;
  gender: Gender;
  branch: Branch;
  role: string;
  birthYear?: number;
  deathYear?: number;
  birthPlace?: string;
  deathPlace?: string;
  occupation?: string;
  nationality?: string;
  verification: Verification;
  summary: string;
  events: LifeEvent[];
  sources: SourceRef[];
  notes?: string[];
  parentIds: string[];
  spouseIds: string[];
  highlight?: boolean;
};

export const verificationLabel: Record<Verification, string> = {
  confirmed: "Подтверждено в открытых источниках",
  "family-archive": "Семейный архив + книги памяти / списки",
  probable: "Вероятный родственник (то же село, отчество, 1931)",
  inferred: "Восстановлено по отчеству, прямых документов нет",
};

export const people: Person[] = [
  {
    id: "ivan-sharf",
    name: "Иван Шарф",
    years: "XIX в.",
    gender: "m",
    branch: "sharf",
    role: "прапрадед (линия Иосифа)",
    verification: "inferred",
    summary:
      "Имя восстановлено по отчествам сыновей: Иосиф, Христиан, Яков и, вероятно, Фёдор — все Ивановичи, жители Усть-Заостровского сельсовета Омского района. Личных дел на него в открытых базах не найдено.",
    events: [],
    sources: [],
    notes: [
      "Не путать с другими Иванами Шарф из открытых списков (другие регионы).",
    ],
    parentIds: [],
    spouseIds: [],
  },
  {
    id: "ivan-fot",
    name: "Иван Фот",
    years: "XIX в.",
    gender: "m",
    branch: "fot",
    role: "прапрадед (линия Фот)",
    verification: "inferred",
    summary:
      "Имя восстановлено по отчеству Франца Ивановича Фота (1871–1931). Открытых карточек на него нет.",
    events: [],
    sources: [],
    parentIds: [],
    spouseIds: [],
  },
  {
    id: "yakov",
    name: "Шарф Яков Иванович",
    years: "ок. 1885",
    gender: "m",
    branch: "sharf",
    role: "дядя Иосифа (не прапрадед)",
    birthYear: 1885,
    birthPlace: "Усть-Заостровский с/с, Омский р-н",
    verification: "family-archive",
    summary:
      "В списках 1931 года указан как 46 лет, житель Усть-Заостровского сельсовета. Выслан с большой семьёй. По отчеству и селу — одного поколения с Иосифом Ивановичем, а не его отец: оба Ивановичи. В семейных записях иногда назван «прапрадедом» — это, скорее всего, ошибка счёта поколений.",
    events: [{ year: 1931, month: 5, title: "Высылка в Нарымский край" }],
    sources: [
      {
        label: "ГАОО. Ф. 235. Оп. 7. Д. 42; Оп. 8. Д. 4794; Ф. 1120. Оп. 1. Д. 21. Т. 1",
      },
      { label: "Крестьянская Голгофа. Книга памяти крестьянства Омской области" },
    ],
    notes: [
      "Семья на 1931: жена Христина, 44 г.; Иван 21; Берта 20; Бернардина 18; Христиан 16; Яков 13; Эмилия 11; Ольга 10; Матвей 5; Антон 2.",
    ],
    parentIds: ["ivan-sharf"],
    spouseIds: ["christina-yakov"],
  },
  {
    id: "christina-yakov",
    name: "Шарф Христина",
    years: "ок. 1887",
    gender: "f",
    branch: "sharf",
    role: "жена Якова",
    birthYear: 1887,
    verification: "family-archive",
    summary: "Указана в составе семьи Якова Ивановича при высылке 1931 года (44 года).",
    events: [{ year: 1931, title: "Высылка вместе с семьёй" }],
    sources: [{ label: "ГАОО. Ф. 235. Оп. 7. Д. 42; Оп. 8. Д. 4794" }],
    parentIds: [],
    spouseIds: ["yakov"],
  },
  {
    id: "iosif",
    name: "Шарф Иосиф (Осип) Иванович",
    years: "1896–1938",
    gender: "m",
    branch: "sharf",
    role: "прадед",
    birthYear: 1896,
    deathYear: 1938,
    birthPlace: "колония Ольгинфельд, Александровский р-н, Донская обл.",
    deathPlace: "Томская обл. (расстрелян)",
    occupation: "счетовод неуставной сельхозартели «1 Мая»",
    nationality: "немец",
    verification: "family-archive",
    highlight: true,
    summary:
      "Родился в немецкой колонии Ольгинфельд (Донская область). С семьёй жил в Омском районе. В мае 1931 года выслан как «кулак» в Средне-Васюганскую комендатуру Нарымского края, пос. Майск. Арестован 17 февраля 1938 в ходе «немецкой операции» НКВД, приговорён 23 апреля к ВМН, расстрелян 28 мая 1938. Реабилитирован в сентябре 1957.",
    events: [
      { year: 1896, title: "Рождение", detail: "колония Ольгинфельд" },
      { year: 1917, title: "Брак с Екатериной Богер" },
      { year: 1931, month: 5, title: "Раскулачивание и высылка в Нарым" },
      { year: 1938, month: 2, day: 17, title: "Арест НКВД" },
      {
        year: 1938,
        month: 4,
        day: 23,
        title: "Приговор",
        detail: "к-р нац. шпионско-диверсионно-повстанческая немецкая организация",
      },
      { year: 1938, month: 5, day: 28, title: "Расстрел" },
      { year: 1957, month: 9, title: "Реабилитация" },
    ],
    sources: [
      { label: "Книга памяти Томской области" },
      {
        label: "ГАОО. Ф. 1120. Оп. 1. Д. 21. Т. 1; Ф. 235. Оп. 7. Д. 18, 42, 51; Оп. 8. Д. 4791",
      },
      { label: "ИЦ УВД по Томской обл.; ИЦ УВД по Омской обл." },
      {
        label: "Мемориальный музей «Следственная тюрьма НКВД», Томск",
        url: "https://nkvd.tomsk.ru/",
      },
    ],
    notes: [
      "В списках 1931 года записан как Осип (Иосиф).",
      "Отдельной карточки в Открытом списке под точным ФИО в открытом поиске не всплыло; данные совпадают с формуляром Книги памяти Томской области, который вы процитировали.",
    ],
    parentIds: ["ivan-sharf"],
    spouseIds: ["ekaterina"],
  },
  {
    id: "ekaterina",
    name: "Богер Екатерина Лукьяновна",
    years: "1893/1899",
    gender: "f",
    branch: "sharf",
    role: "прабабушка",
    birthYear: 1899,
    birthPlace: "с. Балобановка, затем Омская область",
    nationality: "немка",
    verification: "family-archive",
    highlight: true,
    summary:
      "По семейной традиции родилась в 1899 в селе Балобановка, подростком переехала в Омскую область, в 1917 вышла замуж. В списках высылки указан 1893 год рождения — расхождение в источниках. После расстрела мужа одна поднимала детей на спецпоселении в Майске. Реабилитирована УВД Томской области 8 октября 1994.",
    events: [
      { year: 1917, title: "Брак с Иосифом Шарфом" },
      { year: 1931, month: 5, title: "Высылка в пос. Майск" },
      { year: 1938, title: "Овдовела: муж расстрелян" },
      { year: 1994, month: 10, day: 8, title: "Реабилитация УВД Томской обл." },
    ],
    sources: [
      { label: "ГАОО; ИЦ УВД Томской и Омской областей" },
      { label: "Семейные генеалогические разыскания" },
    ],
    notes: ["Год рождения: 1899 (семья) vs 1893 (список 1931)."],
    parentIds: [],
    spouseIds: ["iosif"],
  },
  {
    id: "fedor",
    name: "Шарф Фёдор Иванович",
    years: "1896",
    gender: "m",
    branch: "sharf",
    role: "вероятный брат Иосифа",
    birthYear: 1896,
    birthPlace: "Усть-Заостровский с/с, Омский р-н",
    verification: "probable",
    summary:
      "Тот же год рождения, то же отчество, тот же Усть-Заостровский сельсовет, высылка 1931 в Колпашевскую комендатуру. С высокой вероятностью брат или двоюродный брат Иосифа. В прямых семейных списках Иосифа не назван.",
    events: [
      { year: 1931, title: "Высылка в Колпашевскую комендатуру" },
      { year: 1993, month: 6, day: 30, title: "Реабилитация УВД Омской обл." },
    ],
    sources: [
      {
        label: "Открытый список: Шарф Фёдор Иванович (1896)",
        url: "https://ru.openlist.wiki/Шарф_Федор_Иванович_(1896)",
      },
      { label: "Крестьянская Голгофа; ИЦ УВД Омской обл. Ф. 8. Оп. 1. Д. 415" },
    ],
    notes: [
      "Семья: жена Луиза Исаевна 1900; сын Иван 1919; дочь Регина 1923; на спецпоселении сын Адольф (Анатолий) 1936.",
    ],
    parentIds: ["ivan-sharf"],
    spouseIds: [],
  },
  {
    id: "christian",
    name: "Шарф Христиан Иванович",
    years: "1903",
    gender: "m",
    branch: "sharf",
    role: "брат прадеда",
    birthYear: 1903,
    birthPlace: "Усть-Заостровский с/с, Омский р-н",
    verification: "family-archive",
    summary:
      "Указан в составе семьи брата Иосифа при высылке 1931 года. С собственной семьёй выслан в Нарымский край.",
    events: [{ year: 1931, title: "Высылка в Нарымский край" }],
    sources: [
      { label: "ГАОО. Ф. 235. Оп. 7. Д. 42; Оп. 8. Д. 4793; Ф. 1120. Оп. 1. Д. 21. Т. 1" },
      { label: "Крестьянская Голгофа" },
    ],
    notes: ["Семья: жена Елизавета 1903; дочь Фрида, 3 года; сын Гавриил, 1 год (на 1931)."],
    parentIds: ["ivan-sharf"],
    spouseIds: ["elizaveta"],
  },
  {
    id: "elizaveta",
    name: "Шарф Елизавета",
    years: "1903",
    gender: "f",
    branch: "sharf",
    role: "сноха / жена Христиана",
    birthYear: 1903,
    verification: "family-archive",
    summary: "Указана в списках 1931 как сноха в хозяйстве Иосифа и как жена Христиана.",
    events: [{ year: 1931, title: "Высылка" }],
    sources: [{ label: "ГАОО. Ф. 235. Оп. 7. Д. 42" }],
    parentIds: [],
    spouseIds: ["christian"],
  },
  {
    id: "nina",
    name: "Шульц Нина Иосифовна",
    years: "1922",
    gender: "f",
    branch: "sharf",
    role: "тётя деда",
    birthYear: 1922,
    verification: "family-archive",
    summary:
      "Старшая дочь Иосифа и Екатерины. Выслана с родителями в 1931 (9 лет). Реабилитирована 8.10.1994 как Шульц Нина Иосифовна.",
    events: [
      { year: 1931, title: "Высылка с семьёй" },
      { year: 1994, month: 10, day: 8, title: "Реабилитация" },
    ],
    sources: [{ label: "ИЦ УВД Томской обл." }],
    parentIds: ["iosif", "ekaterina"],
    spouseIds: [],
  },
  {
    id: "olga",
    name: "Лазуткина Ольга Иосифовна",
    years: "1924",
    gender: "f",
    branch: "sharf",
    role: "тётя деда",
    birthYear: 1924,
    verification: "family-archive",
    summary:
      "Дочь Иосифа и Екатерины. Реабилитирована 8.10.1994. На спецпоселении родились её дети Лазуткины: Николай (1949), Зоя (1950), Дмитрий (1953) — реабилитированы 13.12.1995.",
    events: [
      { year: 1931, title: "Высылка" },
      { year: 1994, month: 10, day: 8, title: "Реабилитация" },
    ],
    sources: [{ label: "ГАОО; ИЦ УВД Томской обл." }],
    parentIds: ["iosif", "ekaterina"],
    spouseIds: [],
  },
  {
    id: "emma",
    name: "Шарф Эмма Иосифовна",
    years: "ок. 1927",
    gender: "f",
    branch: "sharf",
    role: "тётя деда",
    birthYear: 1927,
    verification: "family-archive",
    summary: "В списке 1931 указана как дочь Эмма, 4 года. Дальнейшая судьба в открытых источниках не прослежена.",
    events: [{ year: 1931, title: "Высылка (ребёнком)" }],
    sources: [{ label: "ГАОО. Ф. 1120. Оп. 1. Д. 21. Т. 1" }],
    parentIds: ["iosif", "ekaterina"],
    spouseIds: [],
  },
  {
    id: "ivan-iosifovich",
    name: "Шарф Иван Иосифович",
    years: "1934",
    gender: "m",
    branch: "join",
    role: "дедушка",
    birthYear: 1934,
    birthPlace: "пос. Майск (Майский), Каргасокский р-н, Нарымский округ",
    nationality: "немец",
    verification: "family-archive",
    highlight: true,
    summary:
      "Родился на спецпоселении через три года после высылки семьи. С рождения состоял на учёте спецкомендатуры как член семьи «кулаков». В 4 года потерял отца. Спецучёт с российских немцев снят в 1954–1955. Женился на Маргарите Петровне Фот, тоже уроженке спецпоселения. Реабилитирован УВД Томской области 8.10.1994 как пострадавший по рождению.",
    events: [
      { year: 1934, title: "Рождение в пос. Майск" },
      { year: 1938, title: "Гибель отца" },
      { year: 1955, title: "Снятие спецучёта с российских немцев" },
      { year: 1994, month: 10, day: 8, title: "Реабилитация УВД Томской обл." },
    ],
    sources: [
      { label: "УВД Томской области; база «Открытый список» (семейная ссылка)" },
      { label: "Мемориальный музей «Следственная тюрьма НКВД»" },
    ],
    parentIds: ["iosif", "ekaterina"],
    spouseIds: ["margarita"],
  },
  {
    id: "lazutkin-n",
    name: "Лазуткин Николай Дмитриевич",
    years: "1949",
    gender: "m",
    branch: "sharf",
    role: "двоюродный брат отца",
    birthYear: 1949,
    verification: "family-archive",
    summary: "Родился на спецпоселении. Внук Иосифа по линии Ольги. Реабилитирован 13.12.1995.",
    events: [{ year: 1995, month: 12, day: 13, title: "Реабилитация" }],
    sources: [{ label: "ИЦ УВД Томской обл." }],
    parentIds: ["olga"],
    spouseIds: [],
  },
  {
    id: "lazutkina-z",
    name: "Лазуткина Зоя Дмитриевна",
    years: "1950",
    gender: "f",
    branch: "sharf",
    role: "двоюродная сестра отца",
    birthYear: 1950,
    verification: "family-archive",
    summary: "Родилась на спецпоселении. Реабилитирована 13.12.1995.",
    events: [{ year: 1995, month: 12, day: 13, title: "Реабилитация" }],
    sources: [{ label: "ИЦ УВД Томской обл." }],
    parentIds: ["olga"],
    spouseIds: [],
  },
  {
    id: "lazutkin-d",
    name: "Лазуткин Дмитрий Дмитриевич",
    years: "1953",
    gender: "m",
    branch: "sharf",
    role: "двоюродный брат отца",
    birthYear: 1953,
    verification: "family-archive",
    summary: "Родился на спецпоселении. Реабилитирован 13.12.1995.",
    events: [{ year: 1995, month: 12, day: 13, title: "Реабилитация" }],
    sources: [{ label: "ИЦ УВД Томской обл." }],
    parentIds: ["olga"],
    spouseIds: [],
  },
  {
    id: "frida",
    name: "Шарф Фрида Христиановна",
    years: "ок. 1928",
    gender: "f",
    branch: "sharf",
    role: "двоюродная сестра деда",
    birthYear: 1928,
    verification: "family-archive",
    summary: "Дочь Христиана, 3 года на момент высылки 1931.",
    events: [{ year: 1931, title: "Высылка" }],
    sources: [{ label: "ГАОО. Ф. 235. Оп. 7. Д. 42" }],
    parentIds: ["christian", "elizaveta"],
    spouseIds: [],
  },
  {
    id: "gavriil",
    name: "Шарф Гавриил Христианович",
    years: "ок. 1930",
    gender: "m",
    branch: "sharf",
    role: "двоюродный брат деда",
    birthYear: 1930,
    verification: "family-archive",
    summary: "Сын Христиана, 1 год на момент высылки 1931.",
    events: [{ year: 1931, title: "Высылка" }],
    sources: [{ label: "ГАОО. Ф. 235. Оп. 7. Д. 42" }],
    parentIds: ["christian", "elizaveta"],
    spouseIds: [],
  },
  {
    id: "franz",
    name: "Фот Франц Иванович",
    years: "1871–1931",
    gender: "m",
    branch: "fot",
    role: "прадед Маргариты",
    birthYear: 1871,
    deathYear: 1931,
    birthPlace: "с. Корнеевка, Ольгинский с/с, Исилькульский р-н, Омский окр.",
    deathPlace: "Нарымский округ, спецпоселение",
    occupation: "крупный крестьянин-предприниматель",
    nationality: "немец",
    verification: "confirmed",
    highlight: true,
    summary:
      "Житель Исилькульского района Омской области. В мае 1931 выслан как «лишенец» с женой и тремя детьми в Нарым. Вёл ежедневный дневник пути (11 мая — 1 декабря 1931) на немецком языке. Заболел и умер 18 декабря 1931. Дневник сохранён Агатой Генриховной Матис (сестра первой жены) и опубликован в «Сибирской старине», № 25, 2006.",
    events: [
      { year: 1871, title: "Рождение" },
      { year: 1931, month: 5, day: 11, title: "Начало дневника ссылки" },
      { year: 1931, month: 12, day: 1, title: "Последняя запись дневника" },
      { year: 1931, month: 12, day: 18, title: "Смерть на спецпоселении" },
      { year: 1994, month: 6, day: 16, title: "Реабилитация" },
      { year: 2006, title: "Публикация дневника" },
    ],
    sources: [
      {
        label: "Открытый список: Фот Франц Иванович (1871)",
        url: "https://ru.openlist.wiki/Фот_Франц_Иванович_(1871)",
      },
      {
        label: "Мемориальный музей НКВД, Томск — дневник",
        url: "https://nkvd.tomsk.ru/projects/posledniysvidetel/writings/letter-f/FotFI/",
      },
      { label: "Крестьянская Голгофа; ГАОО. Ф. 474. Оп. 6. Д. 4, 7" },
    ],
    parentIds: ["ivan-fot"],
    spouseIds: ["maria-fot"],
  },
  {
    id: "maria-fot",
    name: "Фот Мария",
    years: "ум. 1944",
    gender: "f",
    branch: "fot",
    role: "вероятно жена Франца",
    deathYear: 1944,
    verification: "probable",
    summary:
      "В карточке Франца среди умерших на спецпоселении названа Мария (1944). Франц выслан с женой и тремя детьми. Идентификация как жены — вероятная, не стопроцентная.",
    events: [{ year: 1944, title: "Смерть на спецпоселении" }],
    sources: [{ label: "Открытый список — карточка Франца Ивановича Фота" }],
    parentIds: [],
    spouseIds: ["franz"],
  },
  {
    id: "petr",
    name: "Фот Пётр Францевич",
    years: "1908",
    gender: "m",
    branch: "fot",
    role: "дед Маргариты",
    birthYear: 1908,
    verification: "confirmed",
    highlight: true,
    summary:
      "Сын Франца. Выслан с отцом в 1931. На спецпоселении женился на Смала Зельме-Эльфриде Петровне (1917). Отец Маргариты и ещё семерых детей, родившихся в ссылке.",
    events: [
      { year: 1931, title: "Высылка с семьёй отца" },
      { year: 1935, title: "Рождение дочери Нины (уже на спецпоселении)" },
    ],
    sources: [
      {
        label: "Открытый список — семья Франца Фота",
        url: "https://ru.openlist.wiki/Фот_Франц_Иванович_(1871)",
      },
    ],
    parentIds: ["franz", "maria-fot"],
    spouseIds: ["zelma"],
  },
  {
    id: "zelma",
    name: "Смала Зельма-Эльфриде Петровна",
    years: "1917",
    gender: "f",
    branch: "fot",
    role: "бабушка Маргариты",
    birthYear: 1917,
    nationality: "немка",
    verification: "confirmed",
    highlight: true,
    summary: "Вышла замуж за Петра Фота на спецпоселении. Мать Маргариты (1937) и её братьев и сестёр.",
    events: [],
    sources: [{ label: "Открытый список — карточка Франца Фота" }],
    parentIds: [],
    spouseIds: ["petr"],
  },
  {
    id: "nina-fot",
    name: "Фот Нина Петровна",
    years: "1935",
    gender: "f",
    branch: "fot",
    role: "тётя по линии Фот",
    birthYear: 1935,
    verification: "confirmed",
    summary: "Родилась на спецпоселении.",
    events: [],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "margarita",
    name: "Фот Маргарита Петровна",
    years: "1937",
    gender: "f",
    branch: "join",
    role: "бабушка",
    birthYear: 1937,
    birthPlace: "спецпоселение Усть-Чижапка, Каргасокский р-н, Томская обл.",
    nationality: "немка",
    verification: "confirmed",
    highlight: true,
    summary:
      "Родилась на спецпоселении в семье высланных. Соседний с Майском посёлок Усть-Чижапка. В учёте: «немцы», распоряжение МВД СССР № 1/10169, 1931 (семья). Жена Ивана Иосифовича Шарфа, мать Андрея Ивановича.",
    events: [
      { year: 1931, title: "Семья на спецучёте (до её рождения)" },
      { year: 1937, title: "Рождение в Усть-Чижапке" },
    ],
    sources: [
      { label: "УВД Томской области" },
      {
        label: "Открытый список — дети Петра Фота",
        url: "https://ru.openlist.wiki/Фот_Франц_Иванович_(1871)",
      },
    ],
    parentIds: ["petr", "zelma"],
    spouseIds: ["ivan-iosifovich"],
  },
  {
    id: "yuri-fot",
    name: "Фот Юрий Петрович",
    years: "1939",
    gender: "m",
    branch: "fot",
    role: "дядя по линии Фот",
    birthYear: 1939,
    verification: "confirmed",
    summary: "Родился на спецпоселении.",
    events: [],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "arthur-fot",
    name: "Фот Артур Петрович",
    years: "1939–1939",
    gender: "m",
    branch: "fot",
    role: "дядя по линии Фот",
    birthYear: 1939,
    deathYear: 1939,
    verification: "confirmed",
    summary: "Родился и умер на спецпоселении в 1939 году.",
    events: [{ year: 1939, title: "Смерть в младенчестве на спецпоселении" }],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "vera-fot",
    name: "Фот Вера Петровна",
    years: "1942",
    gender: "f",
    branch: "fot",
    role: "тётя по линии Фот",
    birthYear: 1942,
    verification: "confirmed",
    summary: "Родилась на спецпоселении.",
    events: [],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "valentin-fot",
    name: "Фот Валентин Петрович",
    years: "1948",
    gender: "m",
    branch: "fot",
    role: "дядя по линии Фот",
    birthYear: 1948,
    verification: "confirmed",
    summary: "Родился на спецпоселении.",
    events: [],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "vilma-fot",
    name: "Фот Вильма Петровна",
    years: "1948",
    gender: "f",
    branch: "fot",
    role: "тётя по линии Фот",
    birthYear: 1948,
    verification: "confirmed",
    summary: "Родилась на спецпоселении.",
    events: [],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "konstantin-fot",
    name: "Фот Константин Петрович",
    years: "1952",
    gender: "m",
    branch: "fot",
    role: "дядя по линии Фот",
    birthYear: 1952,
    verification: "confirmed",
    summary: "Родился на спецпоселении.",
    events: [],
    sources: [{ label: "Открытый список" }],
    parentIds: ["petr", "zelma"],
    spouseIds: [],
  },
  {
    id: "andrey",
    name: "Шарф Андрей Иванович",
    years: "",
    gender: "m",
    branch: "join",
    role: "отец",
    verification: "family-archive",
    highlight: true,
    summary:
      "Сын Ивана Иосифовича Шарфа и Маргариты Петровны Фот. Точка, ради которой собрано это древо: две немецкие семьи, высланные в 1931 из Омского округа в Нарым, соединились в следующем поколении.",
    events: [],
    sources: [{ label: "Семейные сведения" }],
    parentIds: ["ivan-iosifovich", "margarita"],
    spouseIds: [],
  },
];

export const peopleById = Object.fromEntries(people.map((p) => [p.id, p]));

export function childrenOf(id: string): Person[] {
  return people.filter((p) => p.parentIds.includes(id));
}

export const yakovChildrenMeta = [
  { name: "Шарф Иван Яковлевич", years: "ок. 1910" },
  { name: "Шарф Берта Яковлевна", years: "ок. 1911" },
  { name: "Шарф Бернардина Яковлевна", years: "ок. 1913" },
  { name: "Шарф Христиан Яковлевич", years: "ок. 1915" },
  { name: "Шарф Яков Яковлевич", years: "ок. 1918" },
  { name: "Шарф Эмилия Яковлевна", years: "ок. 1920" },
  { name: "Шарф Ольга Яковлевна", years: "ок. 1921" },
  { name: "Шарф Матвей Яковлевич", years: "ок. 1926" },
  { name: "Шарф Антон Яковлевич", years: "ок. 1929" },
];

export const timeline = [
  {
    year: 1871,
    title: "Рождение Франца Фота",
    body: "Исилькульский район, будущая Омская область.",
  },
  {
    year: 1896,
    title: "Рождение Иосифа Шарфа",
    body: "Колония Ольгинфельд, Донская область. Немецкие колонии этого имени основаны выходцами из старых поселений в конце XIX века.",
  },
  {
    year: 1917,
    title: "Брак Иосифа и Екатерины",
    body: "Омская область.",
  },
  {
    year: 1931,
    title: "Массовая высылка",
    body: "Май. Раскулачивание: семьи Шарф из Усть-Заостровского и Фот из Корнеевки отправлены в Нарымский край (Майск, Усть-Чижапка и др.). Франц Фот начинает дневник 11 мая.",
  },
  {
    year: 1931,
    title: "Смерть Франца Фота",
    body: "18 декабря, на спецпоселении, через 17 дней после последней записи дневника.",
  },
  {
    year: 1934,
    title: "Рождение Ивана Иосифовича",
    body: "Посёлок Майск. Спецпоселенец по рождению.",
  },
  {
    year: 1937,
    title: "Рождение Маргариты Фот",
    body: "Усть-Чижапка. В декабре 1931 в этом посёлке уже было 114 семей — 479 спецпоселенцев.",
  },
  {
    year: 1938,
    title: "«Немецкая операция» НКВД",
    body: "17 февраля — арест Иосифа, 23 апреля — приговор, 28 мая — расстрел. Ивану 4 года.",
  },
  {
    year: 1955,
    title: "Снятие спецучёта",
    body: "С российских немцев спецучёт снят в 1954–1955 годах.",
  },
  {
    year: 1957,
    title: "Реабилитация Иосифа",
    body: "Сентябрь 1957, Книга памяти Томской области.",
  },
  {
    year: 1994,
    title: "Реабилитация семьи Шарф",
    body: "8 октября — Екатерина, Нина, Ольга, Иван. 16 июня — Франц Фот.",
  },
  {
    year: 1995,
    title: "Реабилитация внуков Лазуткиных",
    body: "13 декабря.",
  },
  {
    year: 2006,
    title: "Дневник Франца опубликован",
    body: "«Сибирская старина», № 25. Полный текст хранится в музее НКВД, Томск.",
  },
];

export const sourceChecks = [
  {
    status: "ok" as const,
    title: "Фот Франц Иванович (1871–1931)",
    detail:
      "Карточка в Открытом списке, музей НКВД Томска, «Крестьянская Голгофа». Дневник, смерть 18.12.1931, дети Петра включая Маргариту 1937 — совпадают.",
  },
  {
    status: "ok" as const,
    title: "Фот Пётр, Смала Зельма, дети",
    detail:
      "Перечислены в той же карточке Франца: Нина 1935, Маргарита 1937, Юрий и Артур 1939, Вера 1942, Валентин и Вильма 1948, Константин 1952. Артур умер в 1939, Мария — в 1944.",
  },
  {
    status: "ok" as const,
    title: "Усть-Чижапка и Майск",
    detail:
      "Оба — посёлки Каргасокского района, спецкомендатуры Нарыма. Усть-Чижапка: 114 семей / 479 человек на декабрь 1931.",
  },
  {
    status: "ok" as const,
    title: "Ольгинфельд",
    detail:
      "Немецкая колония на Дону (ныне район пос. Южный, Азовский р-н Ростовской обл.). Основана в конце XIX века. Совпадает с местом рождения Иосифа.",
  },
  {
    status: "warn" as const,
    title: "Шарф Иосиф / Осип Иванович (1896)",
    detail:
      "Формуляр, который вы привели, типичен для Книги памяти Томской области (арест 17.02.1938, расстрел 28.05.1938, реаб. 1957). В быстром поиске Открытого списка отдельная страница не открылась — данные опираются на ваш архивный текст и параллельные дела ГАОО.",
  },
  {
    status: "ok" as const,
    title: "Шарф Христиан Иванович (1903) и Яков Иванович",
    detail:
      "Те же фонды ГАОО и «Крестьянская Голгофа». Яков — ровесник-брат, не отец Иосифа: оба Ивановичи.",
  },
  {
    status: "warn" as const,
    title: "Шарф Фёдор Иванович (1896)",
    detail:
      "Открытый список подтверждает высылку 1931 из того же сельсовета в Колпашево. Включён как вероятный брат, не как доказанный.",
  },
  {
    status: "info" as const,
    title: "Поколение «Иван Шарф» / «Иван Фот»",
    detail:
      "Имена отцов восстановлены только по отчествам. Дальше XVIII–XIX вв. в открытых репрессивных базах нет — нужны метрики колоний и церковные книги.",
  },
];
