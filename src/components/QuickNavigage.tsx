"use client";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Grid } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

export function QuickNavigate() {
  const [isScroolDown, setIsScroolDown] = useState(false);

  function navigateUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function detectScroll() {
      const st = document.documentElement.scrollTop;
      setIsScroolDown(st > 100);
    }
    const detectScrollDebounce = debounce(detectScroll, 500);
    document.addEventListener("scroll", detectScrollDebounce);
    return () => document.removeEventListener("scroll", detectScrollDebounce);
  }, []);

  return (
    <Box className="fixed right-10 bottom-10 w-10">
      <Grid gap="2">
        {isScroolDown && (
          <Button color="indigo" variant="soft" onClick={navigateUp}>
            <ChevronUpIcon />
          </Button>
        )}
      </Grid>
    </Box>
  );
}

export default QuickNavigate;
