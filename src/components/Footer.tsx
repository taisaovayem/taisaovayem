import { HomeIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Link } from "@radix-ui/themes";
import QuickNavigate from "./QuickNavigage";

export function Footer() {
  return (
    <footer className="w-full py-8 grid gap-4 grid-flow-col auto-cols-max">
      <Link href="/">
        <span className="inline-block align-middle">
          <HomeIcon />
        </span>{" "}
        Trang chủ
      </Link>
      <Link href="/about">
        {" "}
        <span className="inline-block align-middle">
          <InfoCircledIcon />
        </span>{" "}
        Giới thiệu
      </Link>
      <QuickNavigate />
    </footer>
  );
}
