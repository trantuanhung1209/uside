import { useEffect, useState, useMemo } from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  city: string;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // OpenWeatherMap API configuration
  const apiKey = "0a39e1b9ed009befb3622558c0cde1a2";
  const city = "Ho Chi Minh City";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},VN&appid=${apiKey}&units=metric&lang=vi`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

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
  }, [url]);

  // Get weather activity suggestion
  const getActivitySuggestion = (description: string, temperature: number) => {
    const desc = description.toLowerCase();

    // Rainy weather
    if (desc.includes("mưa") || desc.includes("rain")) {
      const rainSuggestions = [
        "☔ Ở nhà uống trà và đọc sách nhé!",
        "🏠 Thời tiết này thích hợp xem phim trong nhà",
        "☕ Hôm nay hoàn hảo để làm việc tại nhà",
        "� Mưa rồi, chơi game thôi!",
        "📚 Thời tiết lý tưởng để học tập",
      ];
      return rainSuggestions[
        Math.floor(Math.random() * rainSuggestions.length)
      ];
    }

    // Foggy/Misty weather
    if (
      desc.includes("sương") ||
      desc.includes("mist") ||
      desc.includes("fog")
    ) {
      const mistSuggestions = [
        "🌫️ Sương mù thơ mộng, thích hợp chụp ảnh",
        "☕ Thời tiết này uống cà phê ngon lắm",
        "🚗 Lái xe cẩn thận nhé, tầm nhìn hạn chế",
        "🏞️ Đi dạo công viên sẽ rất lãng mạn",
      ];
      return mistSuggestions[
        Math.floor(Math.random() * mistSuggestions.length)
      ];
    }

    // Hot weather
    if (temperature > 30) {
      const hotSuggestions = [
        "🏊 Nóng quá, đi bơi thôi!",
        "🧊 Thời tiết này cần kem lạnh",
        "🏢 Ở trong nhà có máy lạnh thôi",
        "🌴 Đi biển sẽ mát mẻ hơn",
        "🥤 Nhớ uống nhiều nước nhé!",
      ];
      return hotSuggestions[Math.floor(Math.random() * hotSuggestions.length)];
    }

    // Cool weather
    if (temperature < 20) {
      const coolSuggestions = [
        "🧥 Mát mẻ, nhớ mặc áo ấm",
        "☕ Thời tiết này thích hợp uống đồ nóng",
        "🚶 Đi dạo sẽ rất dễ chịu",
        "�️ Thích hợp đi trekking núi",
        "🔥 Quây quần bên lò sưởi ấm áp",
      ];
      return coolSuggestions[
        Math.floor(Math.random() * coolSuggestions.length)
      ];
    }

    // Cloudy weather
    if (desc.includes("mây") || desc.includes("cloud")) {
      const cloudySuggestions = [
        "☁️ Thời tiết mát mẻ, đi chơi thôi!",
        "📷 Ánh sáng mềm mại, thích hợp chụp ảnh",
        "🚴 Đạp xe sẽ rất dễ chịu",
        "🏃 Thời tiết lý tưởng để chạy bộ",
        "🌳 Đi dạo công viên sẽ tuyệt vời",
      ];
      return cloudySuggestions[
        Math.floor(Math.random() * cloudySuggestions.length)
      ];
    }

    // Clear/Sunny weather
    if (
      desc.includes("nắng") ||
      desc.includes("clear") ||
      desc.includes("sunny")
    ) {
      const sunnySuggestions = [
        "☀️ Nắng đẹp! Thích hợp đi picnic",
        "🏖️ Thời tiết hoàn hảo để đi biển",
        "🚵 Đạp xe dạo phố sẽ tuyệt vời",
        "🎾 Chơi thể thao ngoài trời thôi!",
        "🌻 Đi chụp ảnh thiên nhiên nào",
        "🏃 Chạy bộ buổi sáng rất tốt cho sức khỏe",
      ];
      return sunnySuggestions[
        Math.floor(Math.random() * sunnySuggestions.length)
      ];
    }

    // Stormy weather
    if (
      desc.includes("bão") ||
      desc.includes("storm") ||
      desc.includes("thunder")
    ) {
      const stormSuggestions = [
        "⛈️ Bão tố! Ở nhà an toàn nhất",
        "🏠 Thời tiết nguy hiểm, không nên ra ngoài",
        "📱 Kiểm tra tin tức thời tiết thường xuyên",
        "🔋 Chuẩn bị đèn pin phòng mất điện",
      ];
      return stormSuggestions[
        Math.floor(Math.random() * stormSuggestions.length)
      ];
    }

    // Default suggestions
    const defaultSuggestions = [
      "🌤️ Thời tiết ổn định, tận hưởng ngày mới!",
      "😊 Hôm nay là ngày tuyệt vời để làm điều mình thích",
      "🌈 Thời tiết dễ chịu, hãy ra ngoài thư giãn",
      "💫 Ngày đẹp trời, tâm trạng cũng vui vẻ hơn",
    ];
    return defaultSuggestions[
      Math.floor(Math.random() * defaultSuggestions.length)
    ];
  };

  // Get weather icon based on description
  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("mưa") || desc.includes("rain")) return "🌧️";
    if (desc.includes("sương") || desc.includes("mist")) return "🌫️";
    if (desc.includes("mây") || desc.includes("cloud")) return "☁️";
    if (desc.includes("nắng") || desc.includes("clear")) return "☀️";
    if (desc.includes("bão") || desc.includes("storm")) return "⛈️";
    return "🌤️";
  };

  // Cache activity suggestion để tránh thay đổi khi re-render
  const activitySuggestion = useMemo(() => {
    if (!weather) return "";
    return getActivitySuggestion(weather.description, weather.temperature);
  }, [weather]);

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

  return (
    <>
      <div className="weather-container absolute top-[40%] left-0">
        <div className="">
          {/* Weather Info */}
          <div className="flex items-center gap-[20px] ">
            {/* Weather Icon */}
            <div className="weather-icon inline-block">
              {getWeatherIcon(weather.description)}
            </div>
            <div className="weather-temp">{weather.temperature}°C</div>
            <div className="flex flex-col">
              <div className="weather-desc">{weather.description}</div>
              <div className="weather-desc">{activitySuggestion}</div>
            </div>
            <div className="weather-details">
              <span className="humidity">💧 {weather.humidity}%</span>
              <span className="city">📍 {weather.city}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
