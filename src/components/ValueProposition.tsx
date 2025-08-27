import { Clock, Gift, HandHeart } from "lucide-react";

const ValueProposition = () => {
  const features = [
    {
      icon: Clock,
      title: "✨ Giải Đáp Tức Thì 24/7",
      description: "Trợ lý ảo luôn sẵn sàng trả lời các câu hỏi thường gặp về nội dung video, thiết bị, hay thông tin cá nhân của mình.",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-500"
    },
    {
      icon: Gift,
      title: "🎁 Nhận Quà Tặng Độc Quyền",
      description: "Trở thành người đầu tiên nhận tài liệu, checklist, hoặc thông báo đặc biệt mà mình chỉ chia sẻ tại đây.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500"
    },
    {
      icon: HandHeart,
      title: "🤝 Kết Nối Gần Hơn",
      description: "Những góp ý hay câu hỏi phức tạp sẽ được chuyển thẳng tới team mình và được phản hồi sớm nhất.",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-500"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Bạn nhận được gì khi ở đây?</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="p-6 rounded-lg">
                <div className={`flex items-center justify-center h-16 w-16 rounded-full ${feature.bgColor} ${feature.iconColor} mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-nhile-gray-text">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;