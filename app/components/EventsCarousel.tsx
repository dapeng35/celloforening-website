'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './EventsCarousel.module.css';

type Photo = { src: string; alt: string };

const FALLBACK_PHOTOS: Photo[] = [
  { src: '/images/122026.jpg', alt: 'Bergen Celloforeningen' },
];

const TILE_COUNT = 4;

function backgroundPositionForTile(tileIndex: number) {
  const positions = ['22% 32%', '78% 28%', '28% 72%', '72% 68%'];
  return positions[tileIndex % positions.length];
}

export default function EventsCarousel() {
  const [photos, setPhotos] = useState<Photo[]>(FALLBACK_PHOTOS);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  const initialIndices = useMemo(
    () => Array.from({ length: TILE_COUNT }, (_, i) => i % Math.max(FALLBACK_PHOTOS.length, 1)),
    []
  );
  const [photoIndices, setPhotoIndices] = useState<number[]>(initialIndices);
  const [flipped, setFlipped] = useState<boolean[]>(
    () => Array.from({ length: TILE_COUNT }, () => false)
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/gallery-images', { cache: 'no-store' });
        if (!res.ok) return;
        const data = (await res.json()) as { photos?: Photo[] };
        if (cancelled || !data.photos?.length) return;
        setPhotos(data.photos);
      } catch {
        /* keep fallback */
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const len = Math.max(photos.length, 1);
    setPhotoIndices((prev) =>
      prev.map((idx) => (Number.isFinite(idx) ? idx % len : 0))
    );
  }, [photos]);

  const cancelledRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    cancelledRef.current = false;
    const flipDurationMs = 650;

    const scheduleNextFlip = () => {
      if (cancelledRef.current) return;
      const delayMs = 2000 + Math.floor(Math.random() * 3500);
      timeoutRef.current = window.setTimeout(() => {
        if (cancelledRef.current) return;
        const tileIndex = Math.floor(Math.random() * TILE_COUNT);
        const len = Math.max(photosRef.current.length, 1);

        setFlipped((prev) => {
          const next = [...prev];
          next[tileIndex] = !next[tileIndex];
          return next;
        });

        window.setTimeout(() => {
          if (cancelledRef.current) return;
          setPhotoIndices((prev) => {
            const next = [...prev];
            next[tileIndex] = (next[tileIndex] + 1) % len;
            return next;
          });
        }, flipDurationMs / 2);

        scheduleNextFlip();
      }, delayMs);
    };

    scheduleNextFlip();

    return () => {
      cancelledRef.current = true;
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const len = Math.max(photos.length, 1);

  return (
    <section id="aktiviteter" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.galleryGrid} aria-label="Bildegalleri">
          {Array.from({ length: TILE_COUNT }, (_, tileIndex) => {
            const photo = photos[photoIndices[tileIndex] % len] ?? photos[0];
            const backPhoto = photos[(photoIndices[tileIndex] + 1) % len] ?? photos[0];
            const position = backgroundPositionForTile(tileIndex);

            return (
              <div key={tileIndex} className={styles.tile}>
                <div
                  className={`${styles.tileInner} ${flipped[tileIndex] ? styles.isFlipped : ''}`}
                >
                  <div
                    className={`${styles.face} ${styles.front}`}
                    style={{
                      backgroundImage: `url('${photo.src}')`,
                      backgroundPosition: position,
                    }}
                    role="img"
                    aria-label={photo.alt}
                  >
                    <span className={styles.posterLabel} aria-hidden>
                      Poster
                    </span>
                  </div>
                  <div
                    className={`${styles.face} ${styles.back}`}
                    style={{
                      backgroundImage: `url('${backPhoto.src}')`,
                      backgroundPosition: position,
                    }}
                    role="img"
                    aria-label={backPhoto.alt}
                  >
                    <span className={styles.posterLabel} aria-hidden>
                      Poster
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
