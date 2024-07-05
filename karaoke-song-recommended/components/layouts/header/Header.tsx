import { Music, Search, User } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <Music size={32} />
            <h1 className='text-2xl font-bold'>カラオケマスター</h1>
          </div>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <a href='#' className='hover:text-gray-200'>
                  ホーム
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-200'>
                  ランキング
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-200'>
                  新着曲
                </a>
              </li>
            </ul>
          </nav>
          <div className='flex items-center space-x-2'>
            <Search size={24} />
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
