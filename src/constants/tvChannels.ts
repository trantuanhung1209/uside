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
    description: "Khám phá thế giới thú cưng của USide trong không gian tối huyền bí."
  },
  {
    id: 2,
    name: "Cloud Loading",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music2.mp3",
    description: "Đám mây bay lơ lửng, mang lại cảm giác chờ đợi thú vị."
  },
  {
    id: 3,
    name: "USide Space",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music3.mp3",
    description: "Du hành vào vũ trụ USide, nơi mọi thứ đều là tương lai."
  },
  {
    id: 4,
    name: "USide Retro",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music4.mp3",
    description: "Trải nghiệm không gian retro với gam màu hoài niệm."
  },
  {
    id: 5,
    name: "USide Chill",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music5.mp3",
    description: "Kênh thư giãn, âm nhạc chill trong không gian yên bình."
  },
  {
    id: 6,
    name: "USide Adventure",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music6.mp3",
    description: "Cuộc phiêu lưu đầy bất ngờ trong thế giới USide."
  },
  {
    id: 7,
    name: "USide Neon",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music7.mp3",
    description: "Thế giới ánh sáng neon rực rỡ và âm nhạc sôi động."
  },
  {
    id: 8,
    name: "USide Fantasy",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music8.mp3",
    description: "Không gian viễn tưởng với màu sắc huyền ảo."
  },
  {
    id: 9,
    name: "USide Nature",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music9.mp3",
    description: "Thế giới thiên nhiên kết hợp với nhạc nhẹ nhàng."
  },
  {
    id: 10,
    name: "USide Dark Room",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music10.mp3",
    description: "Một căn phòng tối nơi âm nhạc vang vọng trong im lặng."
  },
  {
    id: 11,
    name: "USide Future Beats",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music11.mp3",
    description: "Âm nhạc tương lai với giai điệu điện tử cuốn hút."
  },
  {
    id: 12,
    name: "USide Dream",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music12.mp3",
    description: "Không gian mơ mộng, nơi giấc mơ hòa cùng âm nhạc."
  },
  {
    id: 13,
    name: "USide Mystery",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music13.mp3",
    description: "Không gian bí ẩn, khiến bạn muốn khám phá nhiều hơn."
  },
  {
    id: 14,
    name: "USide Succession",
    video: "/images_uside/cloud_loadding.mp4",
    music: "/music_uside/music14.mp3",
    description: "Không gian kế thừa, nơi những giấc mơ tiếp nối nhau."
  },
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
