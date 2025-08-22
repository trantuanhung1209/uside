import { useState } from "react";

const SearchInput = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [randomSuggestions, setRandomSuggestions] = useState<string[]>([]);

  // Danh sách món ăn (50 Việt, 50 Tây)
  const foodItems = [
    // Món Việt Nam
    "Phở bò Hà Nội 🍜",
    "Phở gà nóng hổi 🍲",
    "Bún chả Hà Nội 🍢",
    "Bún bò Huế cay cay 🌶️",
    "Cơm tấm sườn bì chả 🍖",
    "Bánh mì thịt Việt 🥖",
    "Bánh cuốn nóng hổi 🥟",
    "Chả cá Lã Vọng 🐟",
    "Bún riêu cua đồng 🦀",
    "Miến lươn giòn giòn 🐍",
    "Bánh đa cua Hải Phòng 🍜",
    "Nem rán Hà Nội 🥢",
    "Bún đậu mắm tôm 😋",
    "Bánh xèo miền Tây 🥞",
    "Gỏi cuốn tôm thịt 🥗",
    "Cao lầu Hội An 🍜",
    "Mì Quảng đậm vị 🌾",
    "Hủ tiếu Nam Vang 🍲",
    "Bánh canh cua 🦀",
    "Cháo lòng nóng hổi 🍵",
    "Cơm hến Huế 🥄",
    "Bánh bèo chấm nước mắm 🥟",
    "Bánh bột lọc dẻo dẻo 🍘",
    "Bánh ít lá gai 🌿",
    "Bánh chưng xanh Tết 🎋",
    "Bánh tét miền Nam 🎍",
    "Chè ba màu ngọt mát 🍧",
    "Bánh flan béo béo 🍮",
    "Xôi xéo hành phi 🍚",
    "Xôi gấc đỏ may mắn 🍊",
    "Nem nướng Nha Trang 🍢",
    "Chả giò giòn rụm 🥠",
    "Gà nướng lá chanh 🍗",
    "Tôm chua Huế 🦐",
    "Bánh khọt Vũng Tàu 🥞",
    "Bánh căn Ninh Thuận 🥟",
    "Bánh tráng nướng Đà Lạt 🍕",
    "Cơm gà Hội An 🍗",
    "Cơm gà Hải Nam 🐔",
    "Lẩu cá kèo nóng hổi 🍲",
    "Lẩu mắm miền Tây 🌶️",
    "Ốc len xào dừa 🐚🥥",
    "Cá kho tộ ngon cơm 🐟",
    "Thịt kho tàu béo mềm 🍖",
    "Bún mắm đậm vị miền Tây 🍜",
    "Bún cá Nha Trang 🐟",
    "Canh chua cá lóc 🍋🐟",
    "Cháo gà xé 🐔",
    "Mì hoành thánh nước 🥟🍜",

    // Món quốc tế thêm
    "Pizza phô mai tan chảy 🍕",
    "Spaghetti Carbonara 🍝",
    "Hamburger bò Mỹ 🍔",
    "Fish and Chips giòn tan 🐟🍟",
    "Beef Steak mọng nước 🥩",
    "Grilled Salmon cháy cạnh 🐟",
    "Caesar Salad xanh mát 🥗",
    "Lasagna Ý béo ngậy 🧀",
    "Chicken Nuggets giòn vui 🐔",
    "Hotdog xúc xích Mỹ 🌭",
    "Sushi cá hồi tươi 🍣",
    "Tempura tôm giòn 🦐",
    "Ramen Nhật nóng hổi 🍜",
    "Takoyaki bạch tuộc 🐙",
    "Udon Nhật bản 🍲",
    "Okonomiyaki pancake Nhật 🥞",
    "Cơm cà ri Nhật 🍛",
    "Kimchi Hàn chua cay 🌶️",
    "Bibimbap cơm trộn Hàn 🍲",
    "Kimbap cuộn rong biển 🍙",
    "Tokbokki bánh gạo cay 🔥",
    "Fried Chicken Hàn giòn 🍗",
    "Lẩu kimchi Hàn Quốc 🍲",
    "Mandu há cảo Hàn 🥟",
    "Samgyeopsal thịt nướng 🥓",
    "Gimbap trứng cuộn 🍳",
    "Dimsum Trung Hoa 🥢",
    "Há cảo tôm dimsum 🦐",
    "Xiao Long Bao nước lèo 🥟",
    "Cơm chiên Dương Châu 🍚",
    "Vịt quay Bắc Kinh 🦆",
    "Hoành thánh chiên giòn 🥟",
    "Chow Mein mì xào Trung 🍜",
    "Mapo Tofu Tứ Xuyên 🌶️",
    "Kung Pao Chicken gà Tứ Xuyên 🐔",
    "Sườn xào chua ngọt 🍖",
    "Gà xào hạt điều 🥜🐔",
    "Pad Thái chua ngọt 🍤",
    "Tom Yum Thái cay nồng 🍲",
    "Green Curry Thái xanh 🌿",
    "Satay xiên nướng 🥓",
    "Bánh bao Thái ngọt 🥮",
    "Bánh crepe Pháp 🇫🇷🍰",
    "Croissant bơ thơm 🥐",
    "Macaron ngọt ngào 🍬",
    "Paella hải sản Tây Ban Nha 🦑",
    "Burrito Mexico 🌯",
    "Tacos bò Mexico 🌮",
    "Quesadilla phô mai 🧀",
    "Churros ngọt ngào 🍩",
    "Falafel Trung Đông 🧆",
    "Shawarma cuốn thịt 🥙",
    "Couscous Bắc Phi 🍲",

    // Đồ uống Việt Nam
    "Trà đá vỉa hè 🧊🍵",
    "Cà phê sữa đá Việt Nam ☕🧊",
    "Cà phê đen đá ☕❄️",
    "Nước mía ngọt lịm 🍹",
    "Nước dừa tươi 🥥",
    "Sữa đậu nành ấm nóng 🥛",
    "Sữa bắp thơm ngọt 🌽🥤",
    "Trà chanh Hà Nội 🍋🍵",
    "Trà đào cam sả 🍑🍊",
    "Sinh tố xoài 🥭🍹",
    "Sinh tố bơ 🥑🥤",
    "Sinh tố dâu 🍓🥛",
    "Nước ép cam 🍊🥤",
    "Nước ép dưa hấu 🍉🍹",
    "Nước ép ổi 🍐🥤",
    "Nước ép táo 🍏🍎",
    "Sâm bí đao mát lạnh 🍵🧊",
    "Trà sữa trân châu 🧋",
    "Sữa tươi trân châu đường đen 🥛🧋",
    "Trà gừng mật ong 🍯🍵",
    "Trà sen vàng 🌸🍵",
    "Trà ô long thanh mát 🍵",
    "Trà xanh matcha đá xay 🍵🧊",
    "Yaourt đá mát lạnh 🍦🥤",
    "Chè đậu xanh đánh 🫘🍵",

    // Đồ uống quốc tế
    "Cappuccino Ý ☕🍶",
    "Espresso Ý ☕",
    "Latte Macchiato ☕🥛",
    "Mocha Chocolate ☕🍫",
    "Americano ☕🧊",
    "Irish Coffee ☘️☕",
    "Matcha Latte 🍵🥛",
    "Chocolate nóng 🍫☕",
    "Milkshake dâu 🍓🥤",
    "Milkshake socola 🍫🥛",
    "Smoothie blueberry 🫐🍹",
    "Smoothie kiwi 🥝🍹",
    "Lemonade đá chanh tươi 🍋🥤",
    "Mojito bạc hà 🍃🍸",
    "Pina Colada dứa dừa 🍍🥥",
    "Margarita Mexico 🍸",
    "Sangria Tây Ban Nha 🍷🍇",
    "Rượu vang đỏ 🍷",
    "Rượu vang trắng 🍷🥂",
    "Champagne sủi tăm 🥂✨",
    "Bia tươi 🍺",
    "Bia thủ công 🍻",
    "Cocktail Blue Lagoon 🌊🍸",
    "Cocktail Tequila Sunrise 🌅🍹",
    "Whiskey on the rocks 🥃🧊",
    "Gin Tonic 🍸🍋",
    "Vodka chanh muối 🍋🥃",
  ];

  // Lọc món ăn theo searchValue
  const filteredSuggestions =
    searchValue.trim() === ""
      ? randomSuggestions
      : foodItems
          .filter((item) =>
            item.toLowerCase().includes(searchValue.toLowerCase())
          )
          .slice(0, 5);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm flex items-center gap-2">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          // Random 5 món ăn khi focus
          const shuffled = [...foodItems].sort(() => Math.random() - 0.5);
          setRandomSuggestions(shuffled.slice(0, 5));
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Hôm nay ăn gì?"
        className="search-input w-full px-5 py-3 bg-transparent rounded-xl focus:outline-none transition-all duration-300"
        style={{
          color: "var(--color-text-primary)",
          boxShadow:
            "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchValue.trim()) {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                searchValue
              )}`,
              "_blank"
            );
          }
        }}
      />
      <div
        className="search-icon-wrapper absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg group-hover:shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent) 0%, var(--color-text-accent) 100%)",
        }}
        onClick={() => {
          if (searchValue.trim()) {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                searchValue
              )}`,
              "_blank"
            );
          }
        }}
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
          }}
        ></div>
      </div>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul
          className="absolute left-[-10px] top-full mt-2 w-full z-100 bg-background rounded-2xl shadow-lg p-2 flex flex-col gap-2"
          style={{
            boxShadow:
              "-4px -4px 12px #FAFBFF, 4px 4px 12px var(--color-shadow), 0 0 10px rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          {filteredSuggestions.map((item) => (
            <li
              key={item}
              className="px-4 py-2 rounded-xl cursor-pointer xs:text-sm lg:text-base font-medium text-text-primary bg-background hover:bg-accent transition-all duration-200 neumorphic-suggestion"
              style={{
                boxShadow:
                  "inset -2px -2px 6px #FAFBFF, inset 2px 2px 6px var(--color-shadow)",
              }}
              onMouseDown={() => {
                setSearchValue(item);
                setShowSuggestions(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
