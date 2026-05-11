import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;

export async function GET() {
  const dir = path.join(process.cwd(), 'public', 'images');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return NextResponse.json({ photos: [] });
  }

  const photos = files
    .filter(
      (name) =>
        IMAGE_EXT.test(name) &&
        !name.startsWith('.') &&
        name !== '.gitkeep'
    )
    .sort((a, b) => a.localeCompare(b, 'no'))
    .map((filename) => {
      const base = filename.replace(IMAGE_EXT, '');
      const alt = base.replace(/[-_]+/g, ' ').trim() || 'Bilde';
      return {
        src: `/images/${encodeURIComponent(filename)}`,
        alt,
      };
    });

  return NextResponse.json({ photos });
}
