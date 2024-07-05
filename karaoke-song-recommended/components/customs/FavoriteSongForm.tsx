'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'

const FavoriteSongForm = () => {
  const [genre, setGenre] = useState('')
  const [song, setSong] = useState<string>('')
  const [songList, setSongList] = useState<string[]>([])

  const handleAddSong = () => {
    if (song.trim() !== '') {
      setSongList([...songList, song])
      setSong('')
    }
  }

  const handleSearch = () => {
    console.log('おすすめ曲を検索中...')
  }
  return (
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
  )
}

export default FavoriteSongForm
