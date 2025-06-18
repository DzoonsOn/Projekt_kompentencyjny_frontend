"use client";
const Footer = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center px-4 h-[5rem] border rounded-md shadow-md mt-auto w-full"
      style={{ backgroundColor: "#99ccff" }}
    >
      <div className="flex items-center">
        <span className=" font-semibold" style={{ color: "#4169E1" }}>
          Aplikacja: ShelfDetect v1.0
        </span>
      </div>
      <div className="flex items-center space-x-6 mt-2 md:mt-0">
        <div className="flex items-center text-gray-600">
          <i className="fas fa-calendar-alt mr-1"></i>
          <span className="text-sm" style={{ color: "#4169E1" }}>
            Kontakt: support@shelfdetect.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
