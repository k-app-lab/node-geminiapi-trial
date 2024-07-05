import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const genreOptions = [
  { id: 'jpop', label: 'J-POP', icon: '🎵' },
  { id: 'rock', label: 'ロック', icon: '🎸' },
  { id: 'anime', label: 'アニメソング', icon: '🦸' },
  { id: 'ballad', label: 'バラード', icon: '🎻' },
  { id: 'edm', label: 'EDM', icon: '🎧' },
  { id: 'hiphop', label: 'ヒップホップ', icon: '🎤' },
  { id: 'jazz', label: 'ジャズ', icon: '🎷' },
  { id: 'classical', label: 'クラシック', icon: '🎹' },
  { id: 'folk', label: '民謡', icon: '🪕' },
  { id: 'reggae', label: 'レゲエ', icon: '🏝️' },
  { id: 'rnb', label: 'R&B', icon: '🎶' },
  { id: 'kpop', label: 'K-POP', icon: '🇰🇷' },
];

type SelectGenreProps = {
  handleSelectGenre: (selected: string[]) => void;
};

const SelectGenre = ({ handleSelectGenre }: SelectGenreProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genreId: string) => {
    const updatedSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    setSelectedGenres(updatedSelectedGenres);
    handleSelectGenre(
      updatedSelectedGenres.map((id) => {
        const foundGenre = genreOptions.find((value) => value.id === id);
        return foundGenre == null ? '' : foundGenre.label;
      }),
    );
  };

  return (
    <Card className='w-full max-w-4xl bg-white/90 backdrop-blur-sm'>
      <CardContent className='p-3'>
        <h5 className='font-bold mb-1 text-gray-800'>好きな音楽ジャンルを選んで！</h5>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {genreOptions.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`
                  p-1 rounded-lg text-center transition-all duration-200 ease-in-out
                  ${
                    selectedGenres.includes(genre.id)
                      ? 'bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }
                `}
            >
              <div className='text-sm'>{genre.icon}</div>
              <div className='font-bold text-xs'>{genre.label}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectGenre;
