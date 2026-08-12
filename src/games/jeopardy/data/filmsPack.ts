import devchata_poster from '@/assets/devchata_poster.jpg';
import devchata from '@/assets/devchata.jpg';
import dzhentlmeny_poster from '@/assets/dzhentlmeny_poster.jpg';
import dzhentlmeny from '@/assets/dzhentlmeny.jpg';
import ne_mozhet_byt_poster from '@/assets/ne_mozhet_byt_poster.jpg';
import ne_mozhet_byt from '@/assets/ne_mozhet_byt.jpg';
import neobyknovennye_pr_poster from '@/assets/neobyknovennye_pr_poster.jpg';
import neobyknovennye_pr from '@/assets/neobyknovennye_pr.jpg';
import sherlock_holmes_poster from '@/assets/sherlock_holmes_poster.jpg';
import sherlock_holmes from '@/assets/sherlock_holmes.jpg';
import skazka_o_tsare_poster from '@/assets/skazka_o_tsare_poster.jpg';
import skazka_o_tsare from '@/assets/skazka_o_tsare.jpg';
import svoi_sredi_chuzhikh_poster from '@/assets/svoi_sredi_chuzhikh_poster.jpg';
import svoi_sredi_chuzhikh from '@/assets/svoi_sredi_chuzhikh.jpg';
import vam_i_ne_snilos_poster from '@/assets/vam_i_ne_snilos_poster.jpg';
import vam_i_ne_snilos from '@/assets/vam_i_ne_snilos.jpg';
import vesna_poster from '@/assets/vesna_poster.jpg';
import vesna from '@/assets/vesna.jpg';
import zhenitba_b_poster from '@/assets/zhenitba_b_poster.jpg';
import zhenitba_b from '@/assets/zhenitba_b.jpg';
import brilliantovaya_ruka_poster from '@/assets/brilliantovaya_ruka_poster.jpg';
import ivan_vasilievich from '@/assets/ivan_vasilievich.jpg';
import lubov_i_golubi from '@/assets/lubov_i_golubi.jpg';
import odinokim_pr from '@/assets/odinokim_pr.jpg';
import pokrovskie_vorota from '@/assets/pokrovskie_vorota.jpg';
import polosatyi_reis from '@/assets/polosatyi_reis.jpg';
import priklyuchenia_electronika from '@/assets/priklyuchenia_electronika.jpg';
import skazka_o_poteryannom_vremeni from '@/assets/skazka_o_poteryannom_vremeni.jpg';
import sluzhebnyi_roman from '@/assets/sluzhebnyi_roman.jpg';
import starik_hottabych from '@/assets/starik_hottabych.jpg';
import vlyublen_po_sobstvennomy from '@/assets/vlyublen_po_sobstvennomy.jpg';
import ya_shagayu_po_moskve from '@/assets/ya_shagayu_po_moskve.jpg';
import zhestokii_romans from '@/assets/zhestokii_romans.jpg';
import zdravstvuyte from '@/assets/zdravstvuyte.jpg';
import kavkazskaya_plennitsa from '@/assets/kavkazskaya_plennitsa.jpg';
import ivan_vasilievich_person from '@/assets/ivan_vasilievich_person.jpg';
import zhestokii_romans_person from '@/assets/zhestokii_romans_person.jpg';
import zdravstvuyte_person from '@/assets/zdravstvuyte_person.jpg';
import skazka_o_poteryannom_vremeni_person from '@/assets/skazka_o_poteryannom_vremeni_person.jpg';
import sluzhebnyi_roman_person from '@/assets/sluzhebnyi_roman_person.jpg';
import song_brilliantovaya from '@/assets/song_brilliantovaya.mp3';
import song_priklyuchenia_electronika from '@/assets/song_priklyuchenia_electronika.mp3';
import song_lyubov_i_golubi from '@/assets/song_lyubov_i_golubi.mp3';
import song_polosatyi_reis from '@/assets/song_polosatyi_reis.mp3';
import song_shagayu_po_moskve from '@/assets/song_shagayu_po_moskve.mp3';

import { JeopardyPack } from './types';

export const FILMS_PACK: JeopardyPack = {
  id: 'films',                          // ← уникальный, kebab-case
  title: 'Фильмы',
  emoji: '🎥',
  description: 'Кадры, песни, цитаты, герои фильмов СССР.',
  rounds: [
    {
      name: 'Раунд 1',
      themes: [
        {
          name: 'Кадр',
          emoji: '',
          questions: [
            {
              value: 100,
              text: 'Кадр из какого фильма?',
              answer: 'Не может быть!',
              media: { kind: 'image', src: ne_mozhet_byt, alt: '' },
              answerMedia: { kind: 'image', src: ne_mozhet_byt_poster, alt: 'Не может быть!' },
            },
            { value: 200, 
              text: 'Кадр из какого фильма?', 
              answer: 'Джентльмены удачи',
              media: { kind: 'image', src: dzhentlmeny, alt: ' ' },
              answerMedia: { kind: 'image', src: dzhentlmeny_poster, alt: 'Джентльмены удачи' },
            },
            {
              value: 300,
              text: 'Кадр из какого фильма?',
              answer: 'Девчата',
              media: { kind: 'image', src: devchata, alt: ' ' },
              answerMedia: { kind: 'image', src: devchata_poster, alt: 'Девчата' },
              special: { kind: 'auction' },
            },
            { value: 400, 
              text: 'Кадр из какого фильма?', 
              answer: 'Весна на Заречной улице',
              media: { kind: 'image', src: vesna, alt: ' ' },
              answerMedia: { kind: 'image', src: vesna_poster, alt: 'Весна на Заречной улице' },
            },
            { value: 500, 
              text: 'Кадр из какого фильма?', 
              answer: 'Необыкновенные приключения Карика и Вали',
              media: { kind: 'image', src: neobyknovennye_pr, alt: ' ' },
              answerMedia: { kind: 'image', src: neobyknovennye_pr_poster, alt: 'Необыкновенные приключения Карика и Вали' },
            },
          ],
        },
        {
          name: 'Актеры',
          emoji: '',
          questions: [
            { value: 100, 
              text: 'В каком фильме снимались эти актеры?', 
              answer: 'Женитьба Бальзаминова',
              media: { kind: 'image', src: zhenitba_b, alt: ' ' },
              answerMedia: { kind: 'image', src: zhenitba_b_poster, alt: 'Женитьба Бальзаминова' },
            },
            { value: 200, 
              text: 'В каком фильме снимались эти актеры?', 
              answer: 'Свой среди чужих, чужой среди своих',
              media: { kind: 'image', src: svoi_sredi_chuzhikh, alt: ' ' },
              answerMedia: { kind: 'image', src: svoi_sredi_chuzhikh_poster, alt: 'Свой среди чужих, чужой среди своих' },
            },
            { value: 300, 
              text: 'В каком фильме снимались эти актеры?', 
              answer: 'Сказка о царе Салтане',
              media: { kind: 'image', src: skazka_o_tsare, alt: ' ' },
              answerMedia: { kind: 'image', src: skazka_o_tsare_poster, alt: 'Сказка о царе Салтане' },
            },
            { value: 400, 
              text: 'В каком фильме снимались эти актеры?', 
              answer: 'Шерлок Холмс и доктор Ватсон',
              media: { kind: 'image', src: sherlock_holmes, alt: ' ' },
              answerMedia: { kind: 'image', src: sherlock_holmes_poster, alt: 'Шерлок Холмс и доктор Ватсон' },
            },
            { value: 500, 
              text: 'В каком фильме снимались эти актеры?', 
              answer: 'Вам и не снилось...',
              media: { kind: 'image', src: vam_i_ne_snilos, alt: ' ' },
              answerMedia: { kind: 'image', src: vam_i_ne_snilos_poster, alt: 'Вам и не снилось...' },
            },
            // ...
          ],
        },
        {
          name: 'Песня',
          emoji: '',
          questions: [
            { value: 100, 
              text: 'В каком фильме исполнялась эта песня?', 
              answer: 'Бриллиантовая рука',
              media: { kind: 'audio', src: song_brilliantovaya },
              answerMedia: { kind: 'image', src: brilliantovaya_ruka_poster, alt: 'Бриллиантовая рука' },
            },
            { value: 200, 
              text: 'В каком фильме исполнялась эта песня?', 
              answer: 'Я шагаю по Москве',
              media: { kind: 'audio', src: song_shagayu_po_moskve },
              answerMedia: { kind: 'image', src: ya_shagayu_po_moskve, alt: 'Я шагаю по Москве' },
            },
            { value: 300, 
              text: 'В каком фильме исполнялась эта песня?', 
              answer: 'Любовь и голуби',
              media: { kind: 'audio', src: song_lyubov_i_golubi },
              answerMedia: { kind: 'image', src: lubov_i_golubi, alt: 'Любовь и голуби' },
            },
            { value: 400, 
              text: 'В каком фильме исполнялась эта песня?', 
              answer: 'Полосатый рейс',
              media: { kind: 'audio', src: song_polosatyi_reis },
              answerMedia: { kind: 'image', src: polosatyi_reis, alt: 'Полосатый рейс' },
            },
            { value: 500, 
              text: 'В каком фильме исполнялась эта песня?', 
              answer: 'Приключения электроника',
              media: { kind: 'audio', src: song_priklyuchenia_electronika },
              answerMedia: { kind: 'image', src: priklyuchenia_electronika, alt: 'Приключения электроника' },
            },
            // ...
          ],
        },
        {
          name: 'Персонаж',
          emoji: '',
          questions: [
            { value: 100, 
              text: 'Из какого фильма этот персонаж?', 
              answer: 'Жестокий романс',
              media: { kind: 'image', src: zhestokii_romans_person, alt: ' ' },
              answerMedia: { kind: 'image', src: zhestokii_romans, alt: 'Жестокий романс' },
            },
            { value: 200, 
              text: 'Из какого фильма этот персонаж?', 
              answer: 'Здравствуйте, я ваша тетя!',
              media: { kind: 'image', src: zdravstvuyte_person, alt: ' ' },
              answerMedia: { kind: 'image', src: zdravstvuyte, alt: 'Здравствуйте, я ваша тетя!' },
            },
            { value: 300, 
              text: 'Из какого фильма этот персонаж?', 
              answer: 'Иван Васильевич меняет профессию',
              media: { kind: 'image', src: ivan_vasilievich_person, alt: ' ' },
              answerMedia: { kind: 'image', src: ivan_vasilievich, alt: 'Иван Васильевич меняет профессию' },
            },
            { value: 400, 
              text: 'Из какого фильма этот персонаж?', 
              answer: 'Служебный роман',
              media: { kind: 'image', src: sluzhebnyi_roman_person, alt: ' ' },
              answerMedia: { kind: 'image', src: sluzhebnyi_roman, alt: 'Служебный роман' },
            },
            { value: 500, 
              text: 'Из какого фильма этот персонаж?', 
              answer: 'Сказка о потерянном времени',
              media: { kind: 'image', src: skazka_o_poteryannom_vremeni_person, alt: ' ' },
              answerMedia: { kind: 'image', src: skazka_o_poteryannom_vremeni, alt: 'Сказка о потерянном времени' },
            },
            // ...
          ],
        },
        {
          name: 'Цитата',
          emoji: '',
          questions: [
            { value: 100, text: 'А не хлопнуть ли нам по рюмашке? \nЗаметьте, не я это предложил!', 
              answer: 'Покровские ворота',
              answerMedia: { kind: 'image', src: pokrovskie_vorota, alt: 'Покровские ворота' },
            },
            {
              value: 200,
              text: 'Или я ее веду в ЗАГС, либо она меня ведет к прокурору.',
              answer: 'Кавказская пленница',
              answerMedia: { kind: 'image', src: kavkazskaya_plennitsa, alt: 'Кавказская пленница' },
              special: { kind: 'cat' },
            },
            { value: 300, text: 'Кто работает, тот и султан.', 
              answer: 'Старик Хоттабыч',
              answerMedia: { kind: 'image', src: starik_hottabych, alt: 'Старик Хоттабыч' },
            },
            { value: 400, text: 'Я умею готовить, умею!\nА я не умею есть то, что ты умеешь готовить!', 
              answer: 'Одиноким предоставляется общежитие',
              answerMedia: { kind: 'image', src: odinokim_pr, alt: 'Одиноким предоставляется общежитие' }, 
            },
            { value: 500, text: 'Интересная работа нравится и без самовнушения', 
              answer: 'Влюблен по собственному желанию',
              answerMedia: { kind: 'image', src: vlyublen_po_sobstvennomy, alt: 'Влюблен по собственному желанию' }, 
            }
          ],
        },
      ],
    },
  ],
};