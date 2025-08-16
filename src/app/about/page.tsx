import { Heading, Link, Text } from "@radix-ui/themes";
import { ReactNode } from "react";
import styles from "./style.module.css";

type Props = {
  children: ReactNode;
};

function Title({ children }: Props) {
  return (
    <Heading size="7" className="pt-4 text-violet-400">
      {children}
    </Heading>
  );
}

function Paragrap({ children }: Props) {
  return (
    <Text as="p" className="py-4">
      {children}
    </Text>
  );
}

export default function About() {
  return (
    <>
      <Heading size="9" className="py-8">
        Không chỉ là{" "}
        <Text as="span" className={styles["meme"]}>
          meme
        </Text>
      </Heading>
      <Paragrap>taisaovayem còn có những thứ hay ho khác nữa</Paragrap>
      <Link href="https://an.taisaovayem.com">
        <Title>an.taisaovayem.com</Title>
      </Link>
      <Paragrap>
        Công cụ chia tiền cho những lần đặt món chung và là câu trả lời cho câu
        hỏi hôm nay ăn gì
      </Paragrap>
      <Link href="https://saptet.taisaovayem.com">
        <Title>saptet.taisaovayem.com</Title>
      </Link>
      <Paragrap>
        Trang bắt đầu dành cho trình duyệt web với thông báo còn bao lâu nữa thì
        đến Tết
      </Paragrap>
      <Link href="https://bio.taisaovayem.com">
        <Title>bio.taisaovayem.com</Title>
      </Link>
      <Paragrap>
        Nơi lưu trữ thiết kế trang bio của riêng bạn mà không bị giới hạn với
        những mẫu có sẵn của các dịch vụ bio đang hoạt động
      </Paragrap>
      <Link href="https://rip.taisaovayem.com">
        <Title>rip.taisaovayem.com</Title>
      </Link>
      <Paragrap>RIP</Paragrap>
      <Link href="https://toku.taisaovayem.com">
        <Title>toku.taisaovayem.com</Title>
      </Link>
      <Paragrap>Bookmark phim siêu nhân được sưu tầm từ các nhóm dịch</Paragrap>
      <Link href="https://ip.taisaovayem.com">
        <Title>ip.taisaovayem.com</Title>
      </Link>
      <Paragrap>
        Hiển thị public ip của bạn để sử dụng cho các ứng dụng cần dùng đến địa
        chỉ ip
      </Paragrap>
      <Paragrap>
        Li&ecirc;n hệ:
        <Link href="mailto: why@taisaovayem.com">why@taisaovayem.com</Link>
      </Paragrap>
      <Link href="/">Quay lại trang chủ</Link>
    </>
  );
}
