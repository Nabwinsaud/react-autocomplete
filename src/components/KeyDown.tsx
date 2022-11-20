import { useState } from "react";

enum Arrow {
  ARROWDOWN = "ArrowDown",
  ARROWUP = "ArrowUp",
  ARROWRight = "ArrowRight",
  ARROWLEFT = "ArrowLeft",
}
export default function KeyBoard() {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleKey = (event: React.KeyboardEvent) => {
    // code or key
    switch (event.code) {
      case Arrow.ARROWDOWN:
        setTop((prev) => prev + 15);
        break;
      case Arrow.ARROWUP:
        setTop((prev) => prev - 15);
        break;
      case Arrow.ARROWLEFT:
        setLeft((prev) => prev - 15);
        break;
      case Arrow.ARROWRight:
        setLeft((prev) => prev + 15);
        break;

      default:
        setTop(0);
        setLeft(0);
    }
  };

  return (
    <>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Click on the container and press Arrow down and start using
      </p>
      <div className="container" onKeyDown={handleKey} tabIndex={0}>
        <div className="move" style={{ top: top, left: left }}></div>
      </div>
    </>
  );
}
