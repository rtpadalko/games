/**
 * Типы паков «Своей игры».
 * Все паки (встроенные и пользовательские) импортируют типы отсюда —
 * это гарантирует, что они совместимы с движком игры.
 */

/** Любое медиа, прикреплённое к вопросу или ответу. */
export type Media =
  | { kind: 'image'; src: string; alt?: string; caption?: string }
  | { kind: 'video'; src: string; poster?: string }
  | { kind: 'audio'; src: string };

/** Особый тип вопроса. По умолчанию — обычный, без поля special. */
export type Special =
  | { kind: 'cat'; overrideValue?: number } // Кот в мешке
  | { kind: 'auction' }                       // Аукцион
  | { kind: 'noRisk' };                       // Без риска

export interface JeopardyQuestion {
  value: number;
  text: string;
  answer: string;
  media?: Media;
  answerMedia?: Media;
  special?: Special;
}

export interface JeopardyTheme {
  name: string;
  emoji: string;
  questions: JeopardyQuestion[];
}

export interface JeopardyRound {
  name: string;
  themes: JeopardyTheme[];
}

export interface JeopardyPack {
  /** Уникальный идентификатор (kebab-case). Используется в селекторе. */
  id: string;
  /** Отображаемое название пака */
  title: string;
  /** Короткое описание для селектора (1–2 предложения) */
  description?: string;
  /** Эмодзи-иконка пака */
  emoji?: string;
  /** Раунды (минимум 1) */
  rounds: JeopardyRound[];
}
