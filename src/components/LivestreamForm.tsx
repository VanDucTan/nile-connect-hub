import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const LivestreamForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.consent) {
    setConsentError(true);
    return;
  } else {
    setConsentError(false);
  }

  // Lấy token và chat_id từ .env
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing Telegram Bot Token or Chat ID in environment variables");
    toast({
      title: "Lỗi cấu hình",
      description: "Không thể gửi câu hỏi do thiếu thông tin Telegram. Vui lòng kiểm tra lại.",
      variant: "destructive",
    });
    return;
  }

  // Tạo nội dung tin nhắn
  const message = `
📩 <b>CÂU HỎI LIVESTREAM MỚI</b>
    
👤 <b>Tên:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
📱 <b>SĐT:</b> ${formData.phone}
💬 <b>Câu hỏi:</b> 
${formData.question}

✅ <i>Đồng ý nhận thông tin</i>
📅 ${new Date().toLocaleString("vi-VN")}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML", // Để in đậm bằng <b>, <i>
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description);
    }

    // Gửi thành công
    toast({
      title: "Đã gửi câu hỏi thành công! ✅",
      description: "Cảm ơn bạn rất nhiều! Nhi sẽ xem qua và chọn những câu hỏi hay nhất cho buổi livestream sắp tới.",
    });

    setIsSubmitted(true);
  } catch (error) {
    console.error("Lỗi gửi Telegram:", error);
    toast({
      title: "Gửi thất bại ❌",
      description: "Có lỗi xảy ra khi gửi câu hỏi. Vui lòng thử lại sau.",
      variant: "destructive",
    });
  }
};

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-20 bg-pink-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-4">Đã gửi câu hỏi thành công! ✅</h2>
            <p className="text-nhile-gray-text max-w-2xl mx-auto">
              Cảm ơn bạn rất nhiều! Nhi sẽ xem qua và chọn những câu hỏi hay nhất cho buổi livestream sắp tới. Hẹn gặp lại bạn nhé!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-pink-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Đặt Câu Hỏi Livestream Cho Nhi Lê</h2>
          <p className="text-nhile-gray-text mb-8 max-w-2xl mx-auto">
            Có điều gì bạn luôn muốn hỏi Nhi trong buổi livestream sắp tới? Hãy để lại câu hỏi ở đây. Những câu hỏi hay nhất sẽ được chọn để trả lời trực tiếp!
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left">
            <div className="mb-4">
              <label htmlFor="ls_name" className="block text-gray-700 font-medium mb-2">Họ và tên</label>
              <input 
                type="text" 
                id="ls_name" 
                placeholder="Nguyễn Văn A" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-nhile-pink transition-colors"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ls_email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input 
                type="email" 
                id="ls_email" 
                placeholder="bancua@email.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-nhile-pink transition-colors"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ls_phone" className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
              <input 
                type="tel" 
                id="ls_phone" 
                placeholder="090..." 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-nhile-pink transition-colors"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ls_question" className="block text-gray-700 font-medium mb-2">Câu hỏi của bạn</label>
              <textarea 
                id="ls_question" 
                rows={4} 
                placeholder="Chị Nhi ơi, cho em hỏi..." 
                required 
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-nhile-pink transition-colors"
              />
            </div>
            <div className="mb-6 flex items-start">
              <input 
                type="checkbox" 
                id="ls_consent" 
                required 
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                className="h-5 w-5 mt-1 rounded border-gray-300 text-nhile-pink focus:ring-nhile-pink cursor-pointer"
              />
              <label htmlFor="ls_consent" className="ml-3 text-sm text-nhile-gray-text">
                Tôi đồng ý nhận thông tin, tin tức và các ưu đãi từ team Nhi Lê qua email và SĐT đã cung cấp.
              </label>
            </div>
            {consentError && (
              <div className="text-red-500 text-sm mb-4 text-center">
                Bạn cần đồng ý với điều khoản để tiếp tục.
              </div>
            )}
            <button 
              type="submit" 
              className="gradient-button text-white font-bold py-3 px-8 rounded-full w-full text-lg shadow-lg transition-transform duration-300 text-center"
            >
              Gửi câu hỏi ngay
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LivestreamForm;