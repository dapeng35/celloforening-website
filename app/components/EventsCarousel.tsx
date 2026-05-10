'use client';

import { useState, useEffect } from 'react';
import styles from './EventsCarousel.module.css';

interface Event {
  id: number;
  title: string;
  date: Date;
  description: string;
  location: string;
  icon: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Musikalsk Lekedag",
    date: new Date(2026, 4, 15),
    description: "Vi spiller morsomme sanger og leker musikalske leker sammen!",
    location: "Kulturhuset, Bergen",
    icon: "🎪"
  },
  {
    id: 2,
    title: "Mini Konsert & Kaker",
    date: new Date(2026, 4, 22),
    description: "Spill for vennene dine og nyt deilige kaker etterpå!",
    location: "Musikk-rommet",
    icon: "🧁"
  },
  {
    id: 3,
    title: "Eventyr med Cello",
    date: new Date(2026, 4, 28),
    description: "Vi spiller musikk fra Disney og Harry Potter!",
    location: "Skolen",
    icon: "🦄"
  },
  {
    id: 4,
    title: "Sommer-konsert i Parken",
    date: new Date(2026, 5, 5),
    description: "Utendørs konsert med is og brus for alle!",
    location: "Byparken",
    icon: "🍦"
  },
  {
    id: 5,
    title: "Cello-workshop for Nybegynnere",
    date: new Date(2026, 5, 12),
    description: "Prøv cello for første gang - ingen erfaring nødvendig!",
    location: "Musikkonservatoriet",
    icon: "🎨"
  },
  {
    id: 6,
    title: "Film Musikk Spesial",
    date: new Date(2026, 5, 19),
    description: "Lær å spille musikk fra dine favoritt filmer!",
    location: "Kulturhuset",
    icon: "🎬"
  }
];

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('no-NO', options);
}

export default function EventsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="aktiviteter" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Kommende Aktiviteter</h2>
          <p className={styles.sectionSubtitle}>
            Utforsk våre spennende aktiviteter og bli med på gøye musikalske opplevelser!
          </p>
        </div>
        <div className={styles.eventsCarousel}>
          <div className={styles.carouselContainer}>
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {events.map((event, index) => (
                <div key={event.id} className={styles.eventCard}>
                  <div className={`${styles.eventImage} ${styles[`eventImage${index + 1}`]}`}>
                    {event.icon}
                  </div>
                  <div className={styles.eventContent}>
                    <span className={styles.eventDate}>{formatDate(event.date)}</span>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.eventDescription}>{event.description}</p>
                    <p className={styles.eventLocation}>📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.carouselControls}>
            <button className={styles.carouselBtn} onClick={previousSlide}>‹</button>
            <div className={styles.carouselDots}>
              {events.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.carouselDot} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <button className={styles.carouselBtn} onClick={nextSlide}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
