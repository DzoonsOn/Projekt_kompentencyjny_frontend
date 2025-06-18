"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EyeSVG from "../public/EyeSVG";
import { AiOutlineRobot } from "react-icons/ai";

gsap.registerPlugin(ScrollTrigger);

const MainPage = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  const detectronRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
      .from(logoRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
      })
      .from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(buttonsRef.current, {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

    featuresRef.current.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      });
    });

    if (detectronRef.current) {
      gsap.fromTo(
        detectronRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: detectronRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power4.out",
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <div
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div ref={logoRef}>
          <EyeSVG className="w-24 h-24 mb-4" />
        </div>

        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl"
        >
          Witaj w ProductFinder
        </h1>

        <div ref={buttonsRef} className="flex gap-6 flex-wrap justify-center">
          <Link
            href="/products"
            className="text-white font-bold px-8 py-4 rounded-full text-xl shadow-md hover:bg-red-700 transition"
            style={{ backgroundColor: "#99ccff" }}
          >
            Przeglądaj produkty
          </Link>
          <Link
            href="/contact"
            className="bg-white border  font-bold px-8 py-4 rounded-full text-xl shadow-md hover:bg-red-100 transition"
            style={{ borderColor: "#99ccff", color: "#99ccff" }}
          >
            Kontakt
          </Link>
        </div>
      </div>

      {/* Cechy */}
      <section
        className="py-20 px-6 rounded-t-3xl"
        style={{
          backgroundColor: "rgba(153, 204, 255, 0.3)",
          color: "#4169E1",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Dlaczego ProductFinder?
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {["Szybkość", "Dokładność", "Skalowalność"].map((feature, idx) => (
            <div
              key={feature}
              ref={(el) => {
                if (el) featuresRef.current[idx] = el;
              }}
              className="bg-white  rounded-2xl p-6 shadow-lg text-center hover:scale-105 transition-transform border"
              style={{ borderColor: "#4169E1", color: "#4169E1" }}
            >
              <h3 className="text-xl font-bold mb-2">{feature}</h3>
              <p className="text-sm">
                {feature === "Szybkość"
                  ? "Nasza aplikacja działa błyskawicznie."
                  : feature === "Dokładność"
                  ? "Dokładnie wykrywamy braki w produktach."
                  : "Dostosowana do dużych sklepów i magazynów."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detectron2 */}
      <section className="py-32 px-6 bg-white text-center">
        <div
          ref={detectronRef}
          className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-60 animate-pulse z-0"></div>
          <div className="relative z-10 mb-6">
            <div
              className=" text-white p-5 rounded-full shadow-2xl animate-pulse scale-110 transition-transform"
              style={{ backgroundColor: "#99ccff" }}
            >
              <AiOutlineRobot size={42} />
            </div>
          </div>

          <h2
            className="text-3xl md:text-4xl font-extrabold mb-6 z-10 relative"
            style={{ color: "#99ccff" }}
          >
            Detectron2 – nasz wybór
          </h2>

          <p className="text-gray-700 text-md md:text-lg leading-relaxed z-10 relative">
            Zdecydowaliśmy się na{" "}
            <span className="font-semibold" style={{ color: "#99ccff" }}>
              Detectron2
            </span>
            , ponieważ łączy on niezwykłą precyzję z szybkością działania.
            Doskonale sprawdza się w analizie obrazów, segmentacji produktów
            oraz detekcji braków — to serce naszej technologii.
          </p>
        </div>
      </section>

      {/* Sekcja technologii z ciągłą animacją */}
      <section className="py-20 px-6 bg-gray-50 overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 mb-10">
          W czym pracujemy
        </h2>
        <div className="relative">
          <div
            className="flex gap-12 items-center whitespace-nowrap animate-techLoop"
            style={{ animation: "techLoop 30s linear infinite" }}
          >
            {[
              "PyTorch",
              "Detectron2",
              "OpenCV",
              "React",
              "GSAP",
              "TailwindCSS",
              "Next.js",
              "Node.js",
            ].map((tech, i) => (
              <div
                key={i}
                className="text-gray-600 bg-white px-6 py-3 rounded-xl shadow-md text-lg font-semibold border border-gray-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
