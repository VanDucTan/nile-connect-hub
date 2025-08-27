import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const LeadMagnetForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Send data to your Email Marketing service
    console.log('Gift Form Data:', formData);
    
    toast({
      title: "Cảm ơn bạn đã đăng ký! 🎉",
      description: "Món quà đang trên đường đến với email của bạn. Hãy kiểm tra hộp thư đến nhé!",
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-20 bg-nhile-gray">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-4">Cảm ơn bạn đã đăng ký! 🎉</h2>
            <p className="text-nhile-gray-text max-w-2xl mx-auto">
              Món quà đang trên đường đến với email của bạn. Hãy kiểm tra hộp thư đến (và cả mục quảng cáo/spam) nhé!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-nhile-gray">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Món Quà Đặc Biệt Dành Riêng Cho Bạn!</h2>
          <p className="text-nhile-gray-text mb-8 max-w-2xl mx-auto">
            Nhận ngay Ebook <strong>"5 Bước Xây Dựng Thói Quen Tích Cực"</strong> mà mình đã đúc kết để bắt đầu hành trình thay đổi bản thân nhé!
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Tên của bạn" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-nhile-pink transition-colors"
              />
              <input 
                type="email" 
                placeholder="Địa chỉ email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-nhile-pink transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="gradient-button text-white font-bold py-3 px-8 rounded-full w-full md:w-auto text-lg shadow-lg transition-transform duration-300"
            >
              💌 Gửi quà cho tôi ngay!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetForm;