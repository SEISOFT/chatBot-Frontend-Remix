import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import { useBreakpointValue } from "@chakra-ui/react";

interface MarqueeSwiperProps {
  children: React.ReactNode;
}

const MarqueeSwiper: React.FC<MarqueeSwiperProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const isMobile = useBreakpointValue({ base: true, xl: false });

  return (
    <Swiper
      slidesPerView="auto"
      loop={true}
      spaceBetween={12}
      modules={[Autoplay, FreeMode]}
      grabCursor={true}
      autoplay={{
        delay: 0, // Movimiento continuo
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={6000} // Ajusta este valor para controlar la velocidad (mayor = más lento)
      allowTouchMove={true} // Opcional: deshabilita la interacción táctil
      style={{ overflow: "auto", width: "100%" ,    scrollbarWidth: "none", }}
    >
      {childrenArray.map((child, index) => (
        <SwiperSlide key={`slide-${index}`} style={{ width: isMobile ? "300px" : "330px" }}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MarqueeSwiper;
