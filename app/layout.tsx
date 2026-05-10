import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EventsCarousel from './components/EventsCarousel';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: 'Bergen Cello-klubb for Barn',
  description: 'Bli med i Bergen Cello-klubb for barn 6-15 år. Lær av de beste, spill med venner, og ha det gøy med musikk!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
