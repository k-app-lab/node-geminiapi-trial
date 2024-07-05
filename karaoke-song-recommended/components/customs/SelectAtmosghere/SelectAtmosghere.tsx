import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react';

type SelectAtmosghereProps = {
  handleSelectAtmosghere: (selected: string) => void;
};

const SelectAtmosghere = ({ handleSelectAtmosghere }: SelectAtmosghereProps) => {
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string>('');

  const atmosphereOptions = [
    { id: '', label: '選択無し', icon: '', color: '' },
    { id: 'energetic', label: '盛り上がる', icon: '🎉', color: 'from-yellow-400 to-red-500' },
    { id: 'relaxed', label: 'リラックス', icon: '🌿', color: 'from-green-400 to-blue-500' },
    { id: 'romantic', label: 'ロマンチック', icon: '💖', color: 'from-pink-400 to-purple-500' },
    { id: 'nostalgic', label: 'ノスタルジック', icon: '🕰️', color: 'from-amber-400 to-orange-500' },
    { id: 'party', label: 'パーティー', icon: '🎊', color: 'from-indigo-400 to-blue-500' },
    { id: 'melancholy', label: '切ない', icon: '🌙', color: 'from-blue-400 to-indigo-500' },
    { id: 'cheerful', label: '明るい', icon: '☀️', color: 'from-yellow-300 to-orange-500' },
    { id: 'dramatic', label: 'ドラマチック', icon: '🎭', color: 'from-purple-400 to-pink-500' },
    { id: 'cool', label: 'クール', icon: '😎', color: 'from-cyan-400 to-blue-500' },
    { id: 'passionate', label: '情熱的', icon: '🔥', color: 'from-red-500 to-orange-500' },
    { id: 'peaceful', label: '穏やか', icon: '🍃', color: 'from-green-300 to-teal-500' },
  ];

  const handleAtmosphereSelect = (atmosphereId: string) => {
    setSelectedAtmosphere(atmosphereId);
    const foundAtmosghere = atmosphereOptions.find((value) => value.id === atmosphereId);
    handleSelectAtmosghere(foundAtmosghere?.label ?? '');
  };
  return (
    <Card className='w-full max-w-4xl bg-white/90 backdrop-blur-sm'>
      <CardContent className='p-3'>
        <h5 className='font-bold mb-1 text-gray-800'>カラオケの雰囲気</h5>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {atmosphereOptions.map((atmosphere) => (
            <Button
              key={atmosphere.id}
              onClick={() => handleAtmosphereSelect(atmosphere.id)}
              className={`
                  rounded-lg text-center transition-all duration-300 ease-in-out
                  ${
                    selectedAtmosphere === atmosphere.id
                      ? `bg-gradient-to-r ${atmosphere.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }
                `}
            >
              <div className='flex flex-col items-center'>
                <span className='text-sm'>{atmosphere.icon}</span>
                <span className='font-bold text-xs'>{atmosphere.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectAtmosghere;
