'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FavoriteSongType, RecommendedSongType } from '@/types/types';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

const FavoriteSongForm = () => {
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [atmosphere, setAtmosphere] = useState('');
  const [song, setSong] = useState<string>('');
  const [songList, setSongList] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recommendedSongs, setRecommendedSongs] = useState<RecommendedSongType[]>([]);
  const [expandedSong, setExpandedSong] = useState(-1);

  const handleAddSong = () => {
    if (song.trim() !== '') {
      setSongList([...songList, song]);
      setSong('');
    }
  };

  const createParams = (): FavoriteSongType => {
    return {
      genre,
    };
  };

  const handleSearch = async () => {
    setIsSearching(true);
    const param = createParams();
    try {
      const response = await fetch(`/api/recommended-song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setRecommendedSongs(data.recommendedSongs);
    } catch (error) {
      console.error('Error fetching message:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedSong(expandedSong === index ? -1 : index);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <Card className='w-full max-w-md mx-auto'>
        <CardContent className='space-y-4 mt-4'>
          <div>
            <label htmlFor='genre' className='block text-sm font-medium text-gray-700'>
              好きなジャンル
            </label>
            <Input
              id='genre'
              type='text'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder='例: J-POP, ロック, アニメ'
              className='mt-1'
            />
          </div>
          <div>
            <label htmlFor='artist' className='block text-sm font-medium text-gray-700'>
              好きなアーティスト
            </label>
            <Input
              id='artist'
              type='text'
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder='例: 米津玄師, あいみょん'
              className='mt-1'
            />
          </div>
          <div>
            <label htmlFor='atmosphere' className='block text-sm font-medium text-gray-700'>
              カラオケの場の雰囲気
            </label>
            <Select value={atmosphere} onValueChange={setAtmosphere}>
              <SelectTrigger className='w-full mt-1'>
                <SelectValue placeholder='雰囲気を選択' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='energetic'>盛り上がり系</SelectItem>
                <SelectItem value='relaxed'>リラックス系</SelectItem>
                <SelectItem value='romantic'>ロマンチック</SelectItem>
                <SelectItem value='nostalgic'>懐かしい</SelectItem>
                <SelectItem value='party'>パーティー</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor='song' className='block text-sm font-medium text-gray-700'>
              今まで歌ってきた曲
            </label>
            <div className='flex mt-1'>
              <Input
                id='song'
                type='text'
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder='曲名を入力'
                className='flex-grow'
              />
              <Button onClick={handleAddSong} className='ml-2'>
                追加
              </Button>
            </div>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-700'>歌ってきた曲リスト:</h3>
            <ul className='mt-1 list-disc list-inside'>
              {songList.map((s, index) => (
                <li key={index}>{s}</li>
              ))}
            </ul>
          </div>
          <Button
            onClick={handleSearch}
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded'
          >
            おすすめ曲を検索
          </Button>
        </CardContent>
      </Card>
      <Card className='w-full'>
        <CardContent className='mt-4'>
          <h3 className='text-xl font-bold mb-4'>おすすめ曲</h3>
          {isSearching ? (
            <div className='text-center py-8'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto'></div>
              <p className='mt-4'>おすすめ曲を検索中...</p>
            </div>
          ) : recommendedSongs.length > 0 ? (
            <ul className='space-y-4'>
              {recommendedSongs.map((song, index) => (
                <li key={index} className=' bg-white p-3 rounded-lg shadow'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h4 className='font-semibold'>{song.title}</h4>
                      <p className='text-sm text-gray-600'>{song.artistName}</p>
                    </div>
                    <div className='flex items-center'>
                      <button
                        onClick={() => toggleExpand(index)}
                        className='ml-2 focus:outline-none'
                      >
                        {expandedSong === index ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedSong === index && (
                    <div className='mt-2 text-sm text-gray-700'>
                      <p>{song.description}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center py-8 text-gray-500'>おすすめ曲を検索してください</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoriteSongForm;
