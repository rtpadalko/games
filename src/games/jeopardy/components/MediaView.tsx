import { Media } from '../data/types';

/**
 * Универсальный рендер медиа в вопросе: image / video / audio.
 * Растягивается по ширине родителя, ограничивает высоту,
 * использует мягкие скруглённые рамки в стиле игры.
 */
export default function MediaView({ media }: { media: Media }) {
  switch (media.kind) {
    case 'image':
      return (
        <figure className="mb-5">
          <img
            src={media.src}
            alt={media.alt ?? ''}
            //className="w-full max-h-[44vh] object-cover rounded-3xl shadow-soft"
            className="w-full max-h-[44vh] object-contain rounded-3xl shadow-soft"
          />
          {media.caption && (
            <figcaption className="text-center text-ink/60 text-sm mt-2">
              {media.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <div className="mb-5 rounded-3xl overflow-hidden shadow-soft bg-ink/5">
          <video
            src={media.src}
            poster={media.poster}
            controls
            preload="metadata"
            className="w-full max-h-[44vh]"
          />
        </div>
      );

    case 'audio':
      return (
        <div className="mb-5 glass rounded-3xl px-5 py-4 shadow-soft flex items-center gap-3">
      <span className="text-3xl">🎧</span>
      <audio 
        src={media.src} 
        controls 
        preload="metadata" 
        className="flex-1"
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          if (audio.currentTime > 30) {
            audio.pause();
            audio.currentTime = 30;
          }
        }}
      />
    </div>
      );
  }
}



/*case 'audio':
      return (
        <div className="mb-5 glass rounded-3xl px-5 py-4 shadow-soft flex items-center gap-3">
          <span className="text-3xl">🎧</span>
          <audio src={media.src} controls preload="metadata" className="flex-1" />
        </div>
      ); */