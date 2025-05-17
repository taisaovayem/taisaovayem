import { HomeIcon } from "@radix-ui/react-icons";
import { Link } from "@radix-ui/themes";

export function Footer() {
  return (
    <footer className="w-full py-8 grid gap-4 grid-flow-col auto-cols-max">
      <Link href="/">
        <span className="inline-block align-middle">
          <HomeIcon />
        </span>{" "}
        Trang chủ
      </Link>
    </footer>
  );
}
