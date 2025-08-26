import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  city: string;
  feelsLike: number;
  windSpeed: number;
  pressure: number;
}

interface ActivitySuggestion {
  icon: string;
  activity: string;
  reason: string;
  color: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tạo gợi ý hoạt động dựa trên thời tiết và thời gian
  const getActivitySuggestion = (
    weatherData: WeatherData
  ): ActivitySuggestion => {
    const currentHour = new Date().getHours();
    const temp = weatherData.temperature;
    const description = weatherData.description.toLowerCase();
    const humidity = weatherData.humidity;

    // Xác định thời gian trong ngày
    const getTimeOfDay = () => {
      if (currentHour >= 6 && currentHour < 12) return "morning";
      if (currentHour >= 12 && currentHour < 17) return "afternoon";
      if (currentHour >= 17 && currentHour < 21) return "evening";
      return "night";
    };

    const timeOfDay = getTimeOfDay();

    // Tạo mảng gợi ý đa dạng cho từng trường hợp
    const getRandomSuggestion = (suggestions: ActivitySuggestion[]) => {
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    };

    // Logic gợi ý dựa trên nhiệt độ, thời tiết và thời gian
    if (description.includes("mưa") || description.includes("rain")) {
      if (timeOfDay === "morning") {
        const morningSuggestions = [
          {
            icon: "☕",
            activity: "Uống cà phê ấm và ôn bài",
            reason: "Trời mưa sáng, không gian yên tĩnh để học tập",
            color: "text-amber-600",
          },
          {
            icon: "📚",
            activity: "Đọc sách và ghi chú",
            reason: "Mưa sáng tạo không khí tập trung hoàn hảo",
            color: "text-emerald-600",
          },
          {
            icon: "💻",
            activity: "Code dự án cá nhân",
            reason: "Thời tiết mát mẻ, lý tưởng để lập trình",
            color: "text-blue-600",
          },
          {
            icon: "🎨",
            activity: "Vẽ hoặc thiết kế",
            reason: "Mưa sáng kích thích cảm hứng sáng tạo",
            color: "text-purple-600",
          },
        ];
        return getRandomSuggestion(morningSuggestions);
      } else if (timeOfDay === "afternoon") {
        const afternoonSuggestions = [
          {
            icon: "🎬",
            activity: "Xem webinar/khóa học online",
            reason: "Mưa chiều, thời gian vàng để học kỹ năng mới",
            color: "text-blue-600",
          },
          {
            icon: "📝",
            activity: "Viết báo cáo/assignment",
            reason: "Không khí yên tĩnh giúp tập trung viết lách",
            color: "text-green-600",
          },
          {
            icon: "🎮",
            activity: "Chơi game cùng bạn online",
            reason: "Mưa chiều, thư giãn với bạn bè qua mạng",
            color: "text-cyan-600",
          },
          {
            icon: "🧘",
            activity: "Yoga/meditation trong phòng",
            reason: "Tiếng mưa giúp thư giãn và tĩnh tâm",
            color: "text-indigo-600",
          },
        ];
        return getRandomSuggestion(afternoonSuggestions);
      } else {
        const eveningSuggestions = [
          {
            icon: "🎵",
            activity: "Học guitar/nhạc cụ",
            reason: "Tối mưa, âm thanh hoà quyện với tiếng mưa",
            color: "text-purple-600",
          },
          {
            icon: "📞",
            activity: "Video call với gia đình",
            reason: "Thời gian ấm cúng để kết nối với người thân",
            color: "text-pink-600",
          },
          {
            icon: "📖",
            activity: "Đọc novel/truyện tranh",
            reason: "Mưa tối tạo không khí lãng mạn cho văn chương",
            color: "text-amber-600",
          },
          {
            icon: "🍳",
            activity: "Nấu ăn/thử món mới",
            reason: "Thời gian rảnh để thử nghiệm ẩm thực",
            color: "text-orange-600",
          },
        ];
        return getRandomSuggestion(eveningSuggestions);
      }
    }

    if (temp >= 30) {
      if (timeOfDay === "morning") {
        const hotMorningSuggestions = [
          {
            icon: "🧊",
            activity: "Học bài trong thư viện có AC",
            reason: "Sáng nóng, thư viện mát mẻ và yên tĩnh",
            color: "text-blue-600",
          },
          {
            icon: "�",
            activity: "Đi bể bơi/gym có AC",
            reason: "Tập thể dục trong môi trường mát mẻ",
            color: "text-cyan-600",
          },
          {
            icon: "🛒",
            activity: "Đi siêu thị/mall có điều hòa",
            reason: "Mua sắm trong không gian mát mẻ",
            color: "text-green-600",
          },
          {
            icon: "☕",
            activity: "Cafe học bài có AC",
            reason: "Không gian mát mẻ để học và socializing",
            color: "text-amber-600",
          },
        ];
        return getRandomSuggestion(hotMorningSuggestions);
      } else if (timeOfDay === "afternoon") {
        const hotAfternoonSuggestions = [
          {
            icon: "🏢",
            activity: "Ở ký túc xá/nhà trọ có AC",
            reason: "Trưa quá nóng, tránh ra ngoài không cần thiết",
            color: "text-red-600",
          },
          {
            icon: "💻",
            activity: "Học online trong phòng mát",
            reason: "Thời gian lý tưởng cho e-learning",
            color: "text-blue-600",
          },
          {
            icon: "🥤",
            activity: "Uống trà sữa/smoothie",
            reason: "Cần bù nước và giải nhiệt",
            color: "text-pink-600",
          },
          {
            icon: "🎮",
            activity: "Chơi game trong phòng mát",
            reason: "Tránh nóng bằng hoạt động trong nhà",
            color: "text-purple-600",
          },
        ];
        return getRandomSuggestion(hotAfternoonSuggestions);
      } else {
        const hotEveningSuggestions = [
          {
            icon: "🍹",
            activity: "Uống nước ép/sinh tố",
            reason: "Tối vẫn nóng, cần bổ sung nước",
            color: "text-cyan-600",
          },
          {
            icon: "🌃",
            activity: "Dạo phố/night market",
            reason: "Tối mát hơn, thích hợp đi chơi nhẹ",
            color: "text-orange-600",
          },
          {
            icon: "🏪",
            activity: "Đi convenience store",
            reason: "Mua đồ ăn nhẹ trong không gian mát",
            color: "text-green-600",
          },
          {
            icon: "📱",
            activity: "Chat/call bạn bè",
            reason: "Thư giãn và kết nối trong phòng mát",
            color: "text-blue-600",
          },
        ];
        return getRandomSuggestion(hotEveningSuggestions);
      }
    }

    if (temp <= 20) {
      if (timeOfDay === "morning") {
        const coolMorningSuggestions = [
          {
            icon: "🏃",
            activity: "Jogging quanh trường/khu phố",
            reason: "Sáng mát mẻ, lý tưởng cho cardio",
            color: "text-green-600",
          },
          {
            icon: "🚲",
            activity: "Đạp xe đi học/thư viện",
            reason: "Thời tiết dễ chịu để di chuyển",
            color: "text-blue-600",
          },
          {
            icon: "☕",
            activity: "Cafe sáng với bạn bè",
            reason: "Thời tiết mát mẻ để meet-up",
            color: "text-amber-600",
          },
          {
            icon: "📸",
            activity: "Chụp ảnh/check-in",
            reason: "Ánh sáng đẹp và không khí trong lành",
            color: "text-pink-600",
          },
        ];
        return getRandomSuggestion(coolMorningSuggestions);
      } else if (timeOfDay === "afternoon") {
        const coolAfternoonSuggestions = [
          {
            icon: "🎾",
            activity: "Chơi thể thao ngoài trời",
            reason: "Chiều mát, thời gian vàng cho thể thao",
            color: "text-green-600",
          },
          {
            icon: "🌳",
            activity: "Dã ngoại trong công viên",
            reason: "Thời tiết dễ chịu để outdoor activities",
            color: "text-emerald-600",
          },
          {
            icon: "📚",
            activity: "Học nhóm ngoài trời",
            reason: "Không khí trong lành giúp tập trung",
            color: "text-blue-600",
          },
          {
            icon: "🛍️",
            activity: "Shopping và window shopping",
            reason: "Thời tiết dễ chịu để đi chơi",
            color: "text-purple-600",
          },
        ];
        return getRandomSuggestion(coolAfternoonSuggestions);
      } else {
        const coolEveningSuggestions = [
          {
            icon: "🍜",
            activity: "Đi ăn phở/bún bò huế",
            reason: "Tối mát, thích hợp cho món ấm",
            color: "text-orange-600",
          },
          {
            icon: "🎬",
            activity: "Đi xem phim với bạn",
            reason: "Thời tiết dễ chịu để ra ngoài",
            color: "text-red-600",
          },
          {
            icon: "🎤",
            activity: "Karaoke cùng hội bạn",
            reason: "Tối mát mẻ, thời gian vui chơi lý tưởng",
            color: "text-cyan-600",
          },
          {
            icon: "🔥",
            activity: "Tụ tập BBQ/lẩu",
            reason: "Thời tiết mát, thích hợp cho món nóng",
            color: "text-amber-600",
          },
        ];
        return getRandomSuggestion(coolEveningSuggestions);
      }
    }

    // Nhiệt độ trung bình (21-29°C)
    if (timeOfDay === "morning") {
      const moderateMorningSuggestions = [
        {
          icon: "🏃",
          activity: "Chạy bộ hoặc tập gym",
          reason: "Sáng mát mẻ, năng lượng cao cho thể thao",
          color: "text-green-600",
        },
        {
          icon: "📖",
          activity: "Đi thư viện học bài",
          reason: "Thời tiết dễ chịu, tập trung cao",
          color: "text-blue-600",
        },
        {
          icon: "🚌",
          activity: "Đi thực tập/part-time job",
          reason: "Thời tiết lý tưởng để di chuyển",
          color: "text-purple-600",
        },
        {
          icon: "🌱",
          activity: "Volunteer/hoạt động xã hội",
          reason: "Sáng tươi mới, thích hợp cho hoạt động ý nghĩa",
          color: "text-emerald-600",
        },
      ];
      return getRandomSuggestion(moderateMorningSuggestions);
    } else if (timeOfDay === "afternoon") {
      if (humidity > 80) {
        const humidAfternoonSuggestions = [
          {
            icon: "🏢",
            activity: "Học bài trong phòng có quạt",
            reason: "Độ ẩm cao, cần không gian thoáng mát",
            color: "text-blue-600",
          },
          {
            icon: "🥤",
            activity: "Uống trà đá/nước mát",
            reason: "Giải nhiệt và bù nước do độ ẩm cao",
            color: "text-cyan-600",
          },
          {
            icon: "�",
            activity: "Code/design trong nhà",
            reason: "Tránh độ ẩm cao bằng việc ở trong nhà",
            color: "text-indigo-600",
          },
        ];
        return getRandomSuggestion(humidAfternoonSuggestions);
      }
      const moderateAfternoonSuggestions = [
        {
          icon: "🚶",
          activity: "Dạo phố/đi chợ với bạn",
          reason: "Chiều dễ chịu, thích hợp dạo chơi",
          color: "text-green-600",
        },
        {
          icon: "⚽",
          activity: "Chơi bóng đá/cầu lông",
          reason: "Thời tiết lý tưởng cho thể thao nhóm",
          color: "text-orange-600",
        },
        {
          icon: "📝",
          activity: "Họp nhóm làm project",
          reason: "Thời tiết dễ chịu để collaborate",
          color: "text-purple-600",
        },
        {
          icon: "🎨",
          activity: "Workshop/seminar",
          reason: "Chiều thoải mái để học kỹ năng mới",
          color: "text-pink-600",
        },
      ];
      return getRandomSuggestion(moderateAfternoonSuggestions);
    } else if (timeOfDay === "evening") {
      const moderateEveningSuggestions = [
        {
          icon: "🍽️",
          activity: "Ăn tối với crush/bạn bè",
          reason: "Tối mát mẻ, thích hợp để date",
          color: "text-amber-600",
        },
        {
          icon: "🎪",
          activity: "Tham gia event/festival",
          reason: "Thời tiết lý tưởng cho outdoor events",
          color: "text-red-600",
        },
        {
          icon: "🎵",
          activity: "Đi concert/live music",
          reason: "Tối dễ chịu cho entertainment",
          color: "text-purple-600",
        },
        {
          icon: "🌉",
          activity: "Ngắm cảnh/chụp ảnh sunset",
          reason: "Golden hour với thời tiết đẹp",
          color: "text-orange-600",
        },
      ];
      return getRandomSuggestion(moderateEveningSuggestions);
    } else {
      const nightSuggestions = [
        {
          icon: "💤",
          activity: "Skincare và ngủ sớm",
          reason: "Đêm muộn, cần nghỉ ngơi để mai tỉnh táo",
          color: "text-indigo-600",
        },
        {
          icon: "📚",
          activity: "Ôn bài cho ngày mai",
          reason: "Đêm yên tĩnh, thích hợp để học",
          color: "text-blue-600",
        },
        {
          icon: "📱",
          activity: "Video call với người yêu",
          reason: "Thời gian riêng tư để kết nối",
          color: "text-pink-600",
        },
        {
          icon: "🧘",
          activity: "Meditation/reflection",
          reason: "Kết thúc ngày với tâm trạng peaceful",
          color: "text-purple-600",
        },
      ];
      return getRandomSuggestion(nightSuggestions);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        // OpenWeatherMap API configuration
        const apiKey =
          import.meta.env.VITE_WEATHER_API_KEY ||
          "0a39e1b9ed009befb3622558c0cde1a2";
        const city = "Ho Chi Minh City";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )},VN&appid=${apiKey}&units=metric&lang=vi`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu thời tiết");
        }

        const data = await response.json();

        setWeather({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
          feelsLike: Math.round(data.main.feels_like),
          windSpeed: data.wind?.speed || 0,
          pressure: data.main.pressure,
        });
      } catch (err) {
        console.error("Weather API Error:", err);
        // Fallback to demo data if API fails
        setWeather({
          temperature: 28,
          humidity: 75,
          description: "Có mây",
          icon: "02d",
          city: "TP.HCM",
          feelsLike: 30,
          windSpeed: 2.5,
          pressure: 1013,
        });
        setError(err instanceof Error ? err.message : "Sử dụng dữ liệu mẫu");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Update weather every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []); // Remove url dependency

  if (loading) {
    return (
      <div className="weather-container absolute top-[0px] right-[190px]">
        <div className="weather-wrapper">
          <div className="weather-loading">
            <div className="loading-spinner"></div>
            <span>Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container absolute top-[0px] right-[0]">
        <div className="weather-wrapper">
          <div className="weather-error">
            <span>⚠️ {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const suggestion = getActivitySuggestion(weather);

  // Function to get weather icon based on description
  const getWeatherIcon = (description: string, iconCode: string) => {
    const desc = description.toLowerCase();

    // Check OpenWeatherMap icon code first
    if (iconCode.includes("01")) return "☀️"; // clear sky
    if (iconCode.includes("02")) return "⛅"; // few clouds
    if (iconCode.includes("03")) return "☁️"; // scattered clouds
    if (iconCode.includes("04")) return "☁️"; // broken clouds
    if (iconCode.includes("09")) return "🌧️"; // shower rain
    if (iconCode.includes("10")) return "🌦️"; // rain
    if (iconCode.includes("11")) return "⛈️"; // thunderstorm
    if (iconCode.includes("13")) return "❄️"; // snow
    if (iconCode.includes("50")) return "🌫️"; // mist

    // Fallback to description matching in Vietnamese
    if (desc.includes("nắng") || desc.includes("quang đãng")) return "☀️";
    if (desc.includes("mây ít") || desc.includes("có mây")) return "⛅";
    if (desc.includes("mây") || desc.includes("âm u")) return "☁️";
    if (desc.includes("mưa rào") || desc.includes("mưa nhỏ")) return "🌧️";
    if (desc.includes("mưa") || desc.includes("mưa vừa")) return "🌦️";
    if (desc.includes("dông") || desc.includes("sấm sét")) return "⛈️";
    if (desc.includes("tuyết")) return "❄️";
    if (desc.includes("sương mù") || desc.includes("khói")) return "🌫️";
    if (desc.includes("gió")) return "🌬️";

    // Default fallback
    return "🌤️";
  };

  return (
    <div className="flex items-center justify-between gap-[40px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="weather-icon text-2xl">
            {getWeatherIcon(weather.description, weather.icon)}
          </div>
          <div className="time-digit text-base font-bold">
            {weather.temperature}°
          </div>
        </div>
        <div className="text-[12px] capitalize pt-[4px]">
          {" "}
          {weather.description}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-text-secondary">
        <div className="text-right text-text-secondary">
          <div className="text-xs font-medium">💧 {weather.humidity}%</div>
          <div className="text-xs">📍 {weather.city}</div>
        </div>

        {/* Activity Suggestion - Compact */}
        <div className="weather-suggestion">
          <div className="flex items-center justify-end lg:gap-2">
            <div className="text-base flex-shrink-0">{suggestion.icon}</div>
            <div className="text-xs font-semibold line-clamp-1">
              {suggestion.activity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
