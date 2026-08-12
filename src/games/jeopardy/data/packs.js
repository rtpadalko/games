/**
 * Реестр всех доступных паков «Своей игры».
 *
 * Чтобы добавить новый пак:
 *   1. Создайте файл `myPack.ts` рядом, экспортируйте `MY_PACK: JeopardyPack`
 *   2. Импортируйте его сюда
 *   3. Допишите строку в массив ALL_PACKS
 *
 * Подробная инструкция — в PACKS.md в этой же папке.
 */
import { STARTER_PACK } from './starterPack';
import { FILMS_PACK } from './filmsPack';
/** Все паки, доступные в селекторе на экране Setup. */
export const ALL_PACKS = [
    STARTER_PACK,
    FILMS_PACK,
    // Добавьте сюда свои паки:
    // MY_PACK,
];
/** Пак по умолчанию (первый в списке). */
export const DEFAULT_PACK_ID = ALL_PACKS[0].id;
/** Найти пак по id; если не найден — вернуть пак по умолчанию. */
export function findPack(id) {
    return ALL_PACKS.find((p) => p.id === id) ?? ALL_PACKS[0];
}
