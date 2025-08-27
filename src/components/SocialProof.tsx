const SocialProof = () => {
  const testimonials = [
    {
      text: "Từ ngày xem kênh của chị, em đã tự tin và yêu bản thân hơn rất nhiều. Nội dung rất giá trị và gần gũi. Cảm ơn chị!",
      author: "Bạn Minh Anh"
    },
    {
      text: "Video nào của chị cũng truyền cảm hứng và năng lượng tích cực. Em đã áp dụng được rất nhiều điều vào cuộc sống.",
      author: "Bạn Thuỳ Linh"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Cộng đồng nói gì về kênh?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-nhile-gray p-6 rounded-xl text-left shadow-sm">
              <p className="text-nhile-gray-text mb-4">"{testimonial.text}"</p>
              <p className="font-bold text-nhile-pink-deep">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;