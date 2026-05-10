'use client';

import { useState } from 'react';
import styles from './Calendar.module.css';

interface Event {
  id: number;
  title: string;
  date: Date;
  icon: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Musikalsk Lekedag",
    date: new Date(2026, 4, 15),
    icon: "🎪"
  },
  {
    id: 2,
    title: "Mini Konsert & Kaker",
    date: new Date(2026, 4, 22),
    icon: "🧁"
  },
  {
    id: 3,
    title: "Eventyr med Cello",
    date: new Date(2026, 4, 28),
    icon: "🦄"
  },
  {
    id: 4,
    title: "Sommer-konsert i Parken",
    date: new Date(2026, 5, 5),
    icon: "🍦"
  },
  {
    id: 5,
    title: "Cello-workshop for Nybegynnere",
    date: new Date(2026, 5, 12),
    icon: "🎨"
  },
  {
    id: 6,
    title: "Film Musikk Spesial",
    date: new Date(2026, 5, 19),
    icon: "🎬"
  }
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 
                      'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];
  const dayNames = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const adjustedStart = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDayEvents = (day: number) => {
    return events.filter(event => 
      event.date.getDate() === day && 
      event.date.getMonth() === month && 
      event.date.getFullYear() === year
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Previous month days
    for (let i = adjustedStart - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className={`${styles.calendarDay} ${styles.otherMonth}`}>
          <div className={styles.dayNumber}>{prevMonthDays - i}</div>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getDayEvents(day);
      days.push(
        <div key={`current-${day}`} className={styles.calendarDay}>
          <div className={styles.dayNumber}>{day}</div>
          {dayEvents.map(event => (
            <div key={event.id} className={styles.calendarEvent}>
              {event.icon} {event.title}
            </div>
          ))}
        </div>
      );
    }

    // Next month days
    const totalCells = adjustedStart + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let day = 1; day <= remainingCells; day++) {
        days.push(
          <div key={`next-${day}`} className={`${styles.calendarDay} ${styles.otherMonth}`}>
            <div className={styles.dayNumber}>{day}</div>
          </div>
        );
      }
    }

    return days;
  };

  return (
    <section id="kalender" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Aktivitetskalender</h2>
          <p className={styles.sectionSubtitle}>Hold deg oppdatert på alle våre arrangementer</p>
        </div>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarHeader}>
            <h3 className={styles.calendarMonth}>{monthNames[month]} {year}</h3>
            <div className={styles.calendarNav}>
              <button className={styles.calendarBtn} onClick={previousMonth}>← Forrige</button>
              <button className={styles.calendarBtn} onClick={nextMonth}>Neste →</button>
            </div>
          </div>
          <div className={styles.calendarGrid}>
            {dayNames.map(day => (
              <div key={day} className={styles.calendarDayHeader}>{day}</div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </section>
  );
}
