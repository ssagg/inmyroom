import React from "react";
import { useRef } from "react";

import Content from "./components/Content/Content";
import Tapbar from "./components/Tapbar/Tapbar";

const App = () => {
  const refScrollUp = useRef<HTMLDivElement | null>(null);
  const handleScrollUp = () => {
    if (refScrollUp.current) {
      refScrollUp.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div ref={refScrollUp}> </div>
      <Content />
      <Tapbar scrollUp={handleScrollUp} />
    </>
  );
};

export default App;
