import FavoriteSongForm from '@/components/customs/FavoriteSongForm'

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-bold text-center mb-8'>
        あなたにぴったりの曲を見つけましょう！
      </h2>
      <FavoriteSongForm />
    </main>
  )
}
