// src/lib/emailService.ts
import emailjs from '@emailjs/browser';

// Khởi tạo EmailJS với Public Key
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

interface EmailData {
  name: string;
  email: string;
}

// Hàm gửi email gift thông qua EmailJS
export const sendGiftEmail = async (emailData: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Kiểm tra environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      throw new Error('Thiếu cấu hình EmailJS. Vui lòng kiểm tra .env file');
    }

    // Dữ liệu template
    const templateParams = {
      to_name: emailData.name,
      to_email: emailData.email,
      user_name: emailData.name,
      // Nếu có thêm biến khác trong template, thêm ở đây
    };

    // Gửi email
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);

    console.log('Email sent successfully!', response);
    return { success: true };
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi gửi email' 
    };
  }
};

// Hàm mở email client
export const openEmailClient = (email: string) => {
  window.open(`https://mail.google.com/mail/?authuser=${email}`, '_blank');
};