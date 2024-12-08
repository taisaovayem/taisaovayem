import { GitHubLogoIcon, HomeIcon } from "@radix-ui/react-icons";
import { Theme, Container, Link } from "@radix-ui/themes";

export function Footer() {
    return <footer className="w-full py-8 grid gap-4 grid-flow-col auto-cols-max">
    <Link href="/">
      <span className="inline-block align-middle">
        <HomeIcon />
      </span>{" "}
      Trang chủ
    </Link>
    <Link href="https://github.com/tmthan/taisaovayem">
      <span className="inline-block align-middle">
        <GitHubLogoIcon />
      </span>{" "}
      Đóng góp
    </Link>
  </footer>
}