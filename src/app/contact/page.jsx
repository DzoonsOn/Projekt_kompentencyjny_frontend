"use client";

import { useRef } from "react";

export default function Categories() {
  const featuresRef = useRef([]);
  return (
    <div className="my-20">
      <section
        className="py-20 px-6 rounded-t-3xl"
        style={{
          backgroundColor: "white",
          color: "#4169E1",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Jak się z nami skontaktować?
        </h2>
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {["Telefon", "Adres", "E-mail"].map((feature, idx) => (
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
                {feature === "Telefon"
                  ? "+48 22 123 45 67\n wt.–czw. 9:00–17:00"
                  : feature === "Adres"
                  ? "ul. Nowoczesna 12, 00-123 Warszawa\n pon.–pt. 9:00–17:00"
                  : "support@shelfdetect.com"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
