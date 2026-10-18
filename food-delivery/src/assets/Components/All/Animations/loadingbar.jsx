import { useEffect, useState } from "react";
import Bike from "../../../Images/delivery-vehicle.png";
import "../../../CSS/style.css";

const foods = [
  { img: "/food-images/pizza.png",    alt: "Pizza" },
  { img: "/food-images/burger.png",   alt: "Burger",    scale: 0.9 },
  { img: "/food-images/fries.png",    alt: "Fries",     scale: 1.3 },
  { img: "/food-images/taco.png",     alt: "Taco" },
  { img: "/food-images/donut.png",    alt: "Donut" },
  { img: "/food-images/noodles.png",  alt: "Noodles" },
  { img: "/food-images/sushi.png",    alt: "Sushi" },
  { img: "/food-images/icecream.png", alt: "Ice cream" },
];

const RADIUS = 105; // px, distance from center
const SIZE = 48; // px

// Resolves once the image is downloaded and decoded (or if it fails)
function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.decode) img.decode().then(resolve, resolve);
      else resolve();
    };
    img.onerror = resolve; // don't block forever if one image fails
    img.src = src;
  });
}

export default function LoadingBar({ load = "" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all(foods.map((f) => preload(f.img))).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-amber-100 transition-opacity duration-300 ${load}`}
    >
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Fade wrapper: mounts when images are ready, so the animation always plays */}
        {ready && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ animation: "foodFadeIn 0.8s ease-out forwards" }}
          >
            {/* Rotating ring */}
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
              {foods.map((item, i) => {
                const angle = (i * 360) / foods.length;
                const rad = (angle * Math.PI) / 180;
                const x = RADIUS * Math.sin(rad);
                const y = -RADIUS * Math.cos(rad);

                return (
                  <div
                    key={item.alt}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Counter-rotation keeps each image upright */}
                    <div className="animate-[spin_8s_linear_infinite_reverse]">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="object-contain"
                        style={{
                          width: SIZE,
                          height: SIZE,
                          transform: `scale(${item.scale ?? 1})`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Center delivery vehicle */}
        <img
          src={Bike}
          alt="Delivery Vehicle"
          className="relative z-10 w-32 h-32 object-contain"
        />
      </div>

      <div className="mt-8 flex items-baseline space-x-1 font-mono font-bold text-neutral-800 text-lg sm:text-xl">
        <span>Please wait</span>
        <span className="inline-flex">
          <span className="animate-[dot_1.5s_infinite_0ms]">.</span>
          <span className="animate-[dot_1.5s_infinite_300ms]">.</span>
          <span className="animate-[dot_1.5s_infinite_600ms]">.</span>
        </span>
      </div>
    </div>
  );
}