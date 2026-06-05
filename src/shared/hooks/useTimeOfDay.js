import { useEffect, useState } from 'react';
/**
 * Возвращает текущую фазу суток по локальному времени.
 * Границы выбраны так, чтобы переходы ощущались естественно
 * и каждый из 4 этапов был заметен в течение дня.
 */
export function getTimeOfDay(date = new Date()) {
    const h = date.getHours();
    if (h >= 5 && h < 9)
        return 'dawn';
    if (h >= 9 && h < 17)
        return 'day';
    if (h >= 17 && h < 21)
        return 'sunset';
    return 'night';
}
/**
 * Реактивный хук: сам выставляет data-tod на <html>,
 * обновляется при смене часа.
 */
export function useTimeOfDay() {
    const [tod, setTod] = useState(() => getTimeOfDay());
    useEffect(() => {
        document.documentElement.setAttribute('data-tod', tod);
    }, [tod]);
    useEffect(() => {
        // Проверяем раз в минуту — этого достаточно для смены фазы.
        const id = setInterval(() => {
            const next = getTimeOfDay();
            setTod((cur) => (cur !== next ? next : cur));
        }, 60_000);
        // Учитываем уход во вкладку/обратно — может пройти много времени.
        const onVisible = () => {
            if (document.visibilityState === 'visible') {
                setTod(getTimeOfDay());
            }
        };
        document.addEventListener('visibilitychange', onVisible);
        return () => {
            clearInterval(id);
            document.removeEventListener('visibilitychange', onVisible);
        };
    }, []);
    return tod;
}
export const TOD_LABELS = {
    dawn: 'Рассвет',
    day: 'День',
    sunset: 'Закат',
    night: 'Ночь',
};
export const TOD_EMOJI = {
    dawn: '🌅',
    day: '☀️',
    sunset: '🌇',
    night: '🌙',
};
