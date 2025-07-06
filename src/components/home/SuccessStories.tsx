import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const baseTestimonials = [
  {
    quote: "Huge thanks for the OCR tool, I used to waste over 30 minutes manually entering data. Now it's done in seconds. Thanks a lot.",
    name: "Sophie",
    role: "Head of Accounting",
    company: "Codig",
    illustration: "/images/CodigLogo.png"
  },
  {
    quote: "The site is exactly what I had in mind. Clean, modern and perfectly aligned with Blue Garden's spirit. I'm proud to share it with my clients.",
    name: "Nacia",
    role: "Director",
    company: "Blue Garden",
    illustration: "/images/bluegarden.png"
  },
  {
    quote: "Raphaël helped me build the MVP of MusicLinks. He delivered a clean and functional marketplace with a well-structured database. It was exactly what I needed to launch.",    
    name: "Nicolas",
    role: "CEO",
    company: "MusicLinks",
    illustration: "/images/musicLinks.png"
  }
];

const testimonials = [...baseTestimonials, ...baseTestimonials];

const SuccessStories: React.FC = () => (
  <section className="py-24 relative z-10 bg-[rgba(11,13,20,0.8)] backdrop-blur-md w-full max-w-none px-0 overflow-x-visible">
    <style>{`
      .swiper {
        width: 100vw !important;
        max-width: 100vw !important;
        padding-bottom: 60px !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .swiper-slide {
        width: 600px !important;
        max-width: 95vw;
        display: flex;
        align-items: stretch;
        justify-content: center;
      }
      @media (max-width: 640px) {
        .swiper-slide {
          width: 60vw !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      }
    `}</style>
    <div className="w-full max-w-none px-0 relative">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">They Trusted Us</h2>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        navigation
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="pb-16"
        style={{ paddingBottom: '5rem' }}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-[#18191c] border border-white/10 rounded-3xl shadow-2xl p-12 md:p-16 flex flex-col justify-between min-h-[220px] h-full w-full
              sm:p-12 sm:min-h-[220px] p-6 min-h-[160px]">
              {t.illustration && (
                <div className="flex justify-center mb-6 sm:mb-6 mb-4">
                  <img src={t.illustration} alt={t.company} className="sm:h-16 h-10 object-contain" style={{ maxWidth: '180px' }} />
                </div>
              )}
              <blockquote className="text-white sm:text-2xl text-base md:text-3xl font-light leading-snug sm:mb-8 mb-4 text-center">
                « {t.quote} »
              </blockquote>
              <div className="flex flex-col items-center mt-auto">
                <div className="text-white font-semibold sm:text-lg text-base">{t.name}</div>
                <div className="text-gray-400 sm:text-base text-sm">{t.role} {t.company && <span className="text-gray-500">{t.company}</span>}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default SuccessStories; 