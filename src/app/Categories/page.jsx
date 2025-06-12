"use client";
import { useRouter } from "next/navigation";
import "../components/style/Categories.css";

export default function Categories() {
  const router = useRouter();

  const handleRedirect = (path) => {
    router.push(path);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 className="header">
        <div>STS</div>
        <div className="redDivStyle">Kamery</div>
      </h1>

      <div className="title">
        <h2>Kategorie</h2>
      </div>

      <div className="gridContainer">
        <button
          className="button"
          onClick={() => handleRedirect("MainProduct")}
        >
          Kategoria 1<div className="redSquareStyle">5</div>
        </button>
        <button
          className="button"
          onClick={() => handleRedirect("MainProduct")}
        >
          Kategoria 2<div className="redSquareStyle">12</div>
        </button>
        <button
          className="button"
          onClick={() => handleRedirect("MainProduct")}
        >
          Kategoria 3<div className="redSquareStyle">3</div>
        </button>
        <button
          className="button"
          onClick={() => handleRedirect("MainProduct")}
        >
          Kategoria 4<div className="redSquareStyle">7</div>
        </button>
        <button
          className="button"
          onClick={() => handleRedirect("MainProduct")}
        >
          Kategoria 5<div className="redSquareStyle">9</div>
        </button>
        <button
          className="button"
          onClick={() => handleRedirect("MainProduct")}
        >
          Kategoria 5<div className="redSquareStyle">9</div>
        </button>
      </div>
    </div>
  );
}
