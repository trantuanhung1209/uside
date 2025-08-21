import { useState, useEffect } from 'react';

const SearchInput = () => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = chưa vào danh sách món
  const [showedQuestion, setShowedQuestion] = useState(false);

  // Danh sách món ăn (50 Việt, 50 Tây)
const foodItems = [
  // Món Việt Nam
  "Phở bò Hà Nội 🍜", "Phở gà nóng hổi 🍲", "Bún chả Hà Nội 🍢", "Bún bò Huế cay cay 🌶️", "Cơm tấm sườn bì chả 🍖", "Bánh mì thịt Việt 🥖", "Bánh cuốn nóng hổi 🥟", "Chả cá Lã Vọng 🐟", "Bún riêu cua đồng 🦀", "Miến lươn giòn giòn 🐍", "Bánh đa cua Hải Phòng 🍜", "Nem rán Hà Nội 🥢", "Bún đậu mắm tôm 😋", "Bánh xèo miền Tây 🥞", "Gỏi cuốn tôm thịt 🥗", "Cao lầu Hội An 🍜", "Mì Quảng đậm vị 🌾", "Hủ tiếu Nam Vang 🍲", "Bánh canh cua 🦀", "Cháo lòng nóng hổi 🍵", "Cơm hến Huế 🥄", "Bánh bèo chấm nước mắm 🥟", "Bánh bột lọc dẻo dẻo 🍘", "Bánh ít lá gai 🌿", "Bánh chưng xanh Tết 🎋", "Bánh tét miền Nam 🎍", "Chè ba màu ngọt mát 🍧", "Bánh flan béo béo 🍮", "Xôi xéo hành phi 🍚", "Xôi gấc đỏ may mắn 🍊", "Nem nướng Nha Trang 🍢", "Chả giò giòn rụm 🥠", "Gà nướng lá chanh 🍗", "Tôm chua Huế 🦐", "Bánh khọt Vũng Tàu 🥞", "Bánh căn Ninh Thuận 🥟", "Bánh tráng nướng Đà Lạt 🍕", "Cơm gà Hội An 🍗", "Cơm gà Hải Nam 🐔", "Lẩu cá kèo nóng hổi 🍲", "Lẩu mắm miền Tây 🌶️", "Ốc len xào dừa 🐚🥥", "Cá kho tộ ngon cơm 🐟", "Thịt kho tàu béo mềm 🍖", "Bún mắm đậm vị miền Tây 🍜", "Bún cá Nha Trang 🐟", "Canh chua cá lóc 🍋🐟", "Cháo gà xé 🐔", "Mì hoành thánh nước 🥟🍜",

  // Món quốc tế thêm
  "Pizza phô mai tan chảy 🍕", "Spaghetti Carbonara 🍝", "Hamburger bò Mỹ 🍔", "Fish and Chips giòn tan 🐟🍟", "Beef Steak mọng nước 🥩", "Grilled Salmon cháy cạnh 🐟", "Caesar Salad xanh mát 🥗", "Lasagna Ý béo ngậy 🧀", "Chicken Nuggets giòn vui 🐔", "Hotdog xúc xích Mỹ 🌭", "Sushi cá hồi tươi 🍣", "Tempura tôm giòn 🦐", "Ramen Nhật nóng hổi 🍜", "Takoyaki bạch tuộc 🐙", "Udon Nhật bản 🍲", "Okonomiyaki pancake Nhật 🥞", "Cơm cà ri Nhật 🍛", "Kimchi Hàn chua cay 🌶️", "Bibimbap cơm trộn Hàn 🍲", "Kimbap cuộn rong biển 🍙", "Tokbokki bánh gạo cay 🔥", "Fried Chicken Hàn giòn 🍗", "Lẩu kimchi Hàn Quốc 🍲", "Mandu há cảo Hàn 🥟", "Samgyeopsal thịt nướng 🥓", "Gimbap trứng cuộn 🍳", "Dimsum Trung Hoa 🥢", "Há cảo tôm dimsum 🦐", "Xiao Long Bao nước lèo 🥟", "Cơm chiên Dương Châu 🍚", "Vịt quay Bắc Kinh 🦆", "Hoành thánh chiên giòn 🥟", "Chow Mein mì xào Trung 🍜", "Mapo Tofu Tứ Xuyên 🌶️", "Kung Pao Chicken gà Tứ Xuyên 🐔", "Sườn xào chua ngọt 🍖", "Gà xào hạt điều 🥜🐔", "Pad Thái chua ngọt 🍤", "Tom Yum Thái cay nồng 🍲", "Green Curry Thái xanh 🌿", "Satay xiên nướng 🥓", "Bánh bao Thái ngọt 🥮", "Bánh crepe Pháp 🇫🇷🍰", "Croissant bơ thơm 🥐", "Macaron ngọt ngào 🍬", "Paella hải sản Tây Ban Nha 🦑", "Burrito Mexico 🌯", "Tacos bò Mexico 🌮", "Quesadilla phô mai 🧀", "Churros ngọt ngào 🍩", "Falafel Trung Đông 🧆", "Shawarma cuốn thịt 🥙", "Couscous Bắc Phi 🍲"
];



  // Hàm typing
  const typeWriter = (text: string, callback?: () => void) => {
    let i = 0;
    setCurrentPlaceholder('');
    setIsTyping(true);

    const typing = () => {
      if (i < text.length) {
        setCurrentPlaceholder(text.slice(0, i + 1));
        i++;
        setTimeout(typing, 100);
      } else {
        setIsTyping(false);
        if (callback) callback();
      }
    };

    typing();
  };

  // Hàm xóa text
  const eraseText = (callback?: () => void) => {
    setIsTyping(true);
    let currentText = currentPlaceholder;

    const erasing = () => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setCurrentPlaceholder(currentText);
        setTimeout(erasing, 50);
      } else {
        setIsTyping(false);
        if (callback) callback();
      }
    };

    erasing();
  };

  // Effect chạy typing
  useEffect(() => {
    if (!showedQuestion) {
      // Gõ câu hỏi lần đầu
      typeWriter('Hôm nay ăn gì?', () => {
        setShowedQuestion(true);
        setTimeout(() => setCurrentIndex(0), 5000); // Sau 5s thì bắt đầu danh sách món
      });
    } else if (currentIndex >= 0) {
      // Chạy danh sách món ăn
      typeWriter(foodItems[currentIndex], () => {
        setTimeout(() => {
          eraseText(() => {
            const nextIndex = (currentIndex + 1) % foodItems.length;
            setCurrentIndex(nextIndex);
          });
        }, 1500); // Giữ text 1.5s rồi xóa
      });
    }
  }, [currentIndex, showedQuestion]);

  return (
    <input
      type="text"
      placeholder={currentPlaceholder + (isTyping ? '|' : '')}
      className="search-input w-full px-5 py-3 bg-transparent rounded-xl focus:outline-none transition-all duration-300 max-w-xs sm:max-w-sm"
      style={{
        color: "var(--color-text-primary)",
        boxShadow:
          "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.8)",
      }}
    />
  );
};

export default SearchInput;
