export type FavoriteSongType = {
  genre: string;
  artists: string;
  atmosphere: string;
  songHistory: string;
};

export type RecommendedSongList = {
  recommendedSongs: RecommendedSongType[];
};

export type RecommendedSongType = {
  title: string;
  artistName: string;
  description: string;
  referenceURL: string;
};
