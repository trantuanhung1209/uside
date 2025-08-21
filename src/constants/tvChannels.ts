export interface TvChannel {
  id: number;
  name: string;
  video: string;
  music: string;
  description?: string;
}

export const TV_CHANNELS: TvChannel[] = [
  {
    id: 1,
    name: "USide Pet Dark",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music1.mp3",
    description: "Thế giới thú cưng USide trong không gian tối"
  },
  {
    id: 2,
    name: "Cloud Loading",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music2.mp3",
    description: "Đám mây đang tải trong không gian USide"
  },
  {
    id: 3,
    name: "USide Space",
    video: "/images_uside/cloud_loadding.mp4", // Sử dụng video tạm
    music: "/music_uside/music3.mp3",
    description: "Không gian tương lai của USide"
  }
];

export const getChannelById = (id: number): TvChannel | undefined => {
  return TV_CHANNELS.find(channel => channel.id === id);
};

export const getNextChannel = (currentId: number): TvChannel => {
  const currentIndex = TV_CHANNELS.findIndex(channel => channel.id === currentId);
  const nextIndex = (currentIndex + 1) % TV_CHANNELS.length;
  return TV_CHANNELS[nextIndex];
};

export const getPreviousChannel = (currentId: number): TvChannel => {
  const currentIndex = TV_CHANNELS.findIndex(channel => channel.id === currentId);
  const previousIndex = currentIndex === 0 ? TV_CHANNELS.length - 1 : currentIndex - 1;
  return TV_CHANNELS[previousIndex];
};
