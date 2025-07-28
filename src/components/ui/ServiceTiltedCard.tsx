import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { LucideIcon } from 'lucide-react';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

interface ServiceTiltedCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  color: string;
  containerHeight?: string;
  containerWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
}

export default function ServiceTiltedCard({
  icon: Icon,
  title,
  description,
  features,
  color,
  containerHeight = "400px",
  containerWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 8,
}: ServiceTiltedCardProps) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: "100%",
          height: "100%",
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Card Content - equivalent to the image in original */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 will-change-transform [transform:translateZ(0)]">
          {/* Icon */}
          <div className="text-center mb-6">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${color} p-4 transition-transform duration-300`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-300 mb-6 leading-relaxed text-center">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-slate-300">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} mr-3 flex-shrink-0`}></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.figcaption
        className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
        style={{
          x,
          y,
          opacity,
          rotate: rotateFigcaption,
        }}
      >
        {title}
      </motion.figcaption>
    </figure>
  );
} 