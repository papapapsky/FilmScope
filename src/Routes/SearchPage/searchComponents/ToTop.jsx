import { useEffect, useState } from "react";

export const ToTop = () => {
  const [show, setShow] = useState(false);
  const [animation, setAnimation] = useState("");

  const handeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 840) {
        setAnimation("AnimationsShow");
        setShow(true);
      } else {
        setAnimation("AnimationsRemove");

        setTimeout(() => {
          setShow(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {show && (
        <div className={`toTop ${animation}`} onClick={handeClick}>
          ↑
        </div>
      )}
    </>
  );
};
