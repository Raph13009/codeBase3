import React from 'react';
import { gsap } from 'gsap';

interface MenuItem {
  title: string;
  subtitle: string;
  icon: string;
  image: string;
}

interface BoostAIFlowingMenuProps {
  items: MenuItem[];
}

function BoostAIFlowingMenu({ items }: BoostAIFlowingMenuProps) {
  return (
    <div className="w-full h-full overflow-hidden bg-[#0F1115]">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} isLast={idx === items.length - 1} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ title, subtitle, icon, image, isLast }: MenuItem & { isLast: boolean }) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <div className="flex items-center gap-6">
        <span className="text-transparent bg-gradient-to-r from-[#4B49D1] to-[#8B5CF6] bg-clip-text uppercase font-bold text-[3vh] leading-[1.2] p-[1vh_1vw_0] drop-shadow-[0_0_10px_rgba(75,73,209,0.5)]">
          {title}
        </span>
        <img 
          src={image} 
          alt={title}
          className={`object-contain ${title.toLowerCase().includes('tarif') ? 'w-[100px] h-[100px]' : 'w-[60px] h-[60px]'}`}
        />
      </div>
      <div className="w-[350px] h-[5vh] my-[1.5em] mx-[2vw] p-[0.5em_0]">
        <p className="text-[#060010] text-[1.8vh] leading-relaxed font-light">
          {subtitle}
        </p>
      </div>
    </React.Fragment>
  ));

  return (
    <div className="flex-1 relative overflow-hidden text-center group" ref={itemRef}>
      {/* Flashy Gradient Divider */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4B49D1] via-[#8B5CF6] via-[#4B49D1] to-transparent opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(75,73,209,0.8)]"></div>
      )}
      
      <div
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-bold text-white text-[3vh] hover:text-white hover:scale-105 transition-all duration-300 ease-out group-hover:bg-gradient-to-r group-hover:from-[#4B49D1]/20 group-hover:to-[#8B5CF6]/20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="group-hover:drop-shadow-[0_0_20px_rgba(75,73,209,0.8)] transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#4B49D1] group-hover:to-[#8B5CF6] group-hover:bg-clip-text">
          {title}
        </span>
      </div>
      
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-gradient-to-br from-white via-gray-50 to-gray-100 translate-y-[101%] shadow-2xl"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoostAIFlowingMenu; 