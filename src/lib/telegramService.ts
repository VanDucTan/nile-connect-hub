// src/lib/telegramService.ts
interface TelegramMessage {
  name: string;
  email: string;
  phone: string;
  question: string;
}

export const sendQuestionToTelegram = async (
  messageData: TelegramMessage
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Lấy token và chat_id từ environment variables
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      throw new Error("Thiếu cấu hình Telegram Bot Token hoặc Chat ID");
    }

    // Tạo nội dung tin nhắn
    const message = `
📩 <b>CÂU HỎI LIVESTREAM MỚI</b>
    
👤 <b>Tên:</b> ${messageData.name}
📧 <b>Email:</b> ${messageData.email}
📱 <b>SĐT:</b> ${messageData.phone}
💬 <b>Câu hỏi:</b> 
${messageData.question}

✅ <i>Đồng ý nhận thông tin</i>
📅 ${new Date().toLocaleString("vi-VN")}
    `.trim();

    // Gọi Telegram API
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description || "Không thể gửi tin nhắn đến Telegram");
    }

    return { success: true };
  } catch (error) {
    console.error("Lỗi gửi Telegram:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định" 
    };
  }
};