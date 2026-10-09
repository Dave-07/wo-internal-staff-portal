import { useEffect, useRef } from "react";

export function useOutsideClick({ close: handler, listenOnCapturing = true }) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      document.addEventListener("click", handleClick, listenOnCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenOnCapturing);
    },
    [handler, listenOnCapturing],
  );

  return ref;
}
