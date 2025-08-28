// src/pages/api/submit-livestream.ts
import { NextApiRequest, NextApiResponse } from 'next';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Chỉ hỗ trợ POST' });
  }

  const { name, email, phone, question } = req.body;

  if (!name || !email || !phone || !question) {
    return res.status(400).json({ success: false, message: 'Thiếu dữ liệu bắt buộc' });
  }

  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  try {
    // Tạo tin nhắn đẹp cho Telegram
    const message = `
📌 *Câu Hỏi Mới Từ Livestream!*

*Họ tên:* ${name}
*Email:* ${email}
*SĐT:* ${phone}
*Câu hỏi:* ${question}
*Thời gian:* ${timestamp}
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error('Telegram API error:', result);
      return res.status(500).json({ success: false, message: 'Gửi Telegram thất bại' });
    }

    return res.status(200).json({
      success: true,
      message: 'Gửi thành công',
    });
  } catch (error: any) {
    console.error('Lỗi gửi form:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống',
    });
  }
}