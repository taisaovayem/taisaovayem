"use client";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export function QuickNavigate() {
  const router = useRouter();

  function navigateUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateDown() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function navigateHome() {
    router.push("/");
  }

  return (
    <Box className="fixed right-10 bottom-10 w-10">
      <Grid gap="2">
        <Button color="indigo" variant="soft" onClick={navigateUp}>
          <ChevronUpIcon />
        </Button>
        <Button color="indigo" variant="soft" onClick={navigateHome}>
          <HomeIcon />
        </Button>
        <Button color="indigo" variant="soft" onClick={navigateDown}>
          <ChevronDownIcon />
        </Button>
      </Grid>
    </Box>
  );
}

export default QuickNavigate;
