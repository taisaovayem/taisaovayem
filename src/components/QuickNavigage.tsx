"use client";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

export function QuickNavigate() {
  const router = useRouter();
  const [scroll, setScroll] = useState<"up" | "down" | "">("");

  function navigateUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateDown() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  useEffect(() => {
    /** Đoạn này copy trên mạng https://stackoverflow.com/questions/31223341/detecting-scroll-direction */
    let lastScrollTop = 0;
    function detectScroll() {
      var st = document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setScroll("down");
      } else if (st < lastScrollTop) {
        setScroll("up");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }
    const detectScrollDebounce = debounce(detectScroll, 500);
    document.addEventListener("scroll", detectScrollDebounce);
    return () => document.removeEventListener("scroll", detectScrollDebounce);
  }, []);

  return (
    <Box className="fixed right-10 bottom-10 w-10">
      <Grid gap="2">
        {scroll === "up" && (
          <Button color="indigo" variant="soft" onClick={navigateUp}>
            <ChevronUpIcon />
          </Button>
        )}
        {scroll === "down" && (
          <Button color="indigo" variant="soft" onClick={navigateDown}>
            <ChevronDownIcon />
          </Button>
        )}
      </Grid>
    </Box>
  );
}

export default QuickNavigate;
