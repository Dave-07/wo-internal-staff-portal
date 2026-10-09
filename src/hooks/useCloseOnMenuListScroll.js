import { useEffect } from "react";

export default function useCloseOnMenuListScroll({
  openId,
  id,
  close: handler,
  listenOnCapturing = true,
}) {
  useEffect(() => {
    if (openId !== id) return;

    function handleScroll() {
      handler();
    }

    window.addEventListener("scroll", handleScroll, listenOnCapturing);

    return () =>
      window.removeEventListener("scroll", handleScroll, listenOnCapturing);
  }, [openId, id, handler, listenOnCapturing]);
}
