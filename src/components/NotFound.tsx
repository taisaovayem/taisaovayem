import { Flex, Heading, Text } from "@radix-ui/themes";

export function NotFound() {
  return (
    <article className="text-center">
      <Flex justify="center">
        <img src="/404.jpg" className="max-w-80" />
      </Flex>
      <Heading mb="2" size="4">
        Oh oh! Trang không tồn tại rùi!
      </Heading>
      <Text>
        Trang bạn truy cập đang không tồn tại rùi. Có thể ai đó gửi nhầm đường
        link rồi. Hãy thử quay lại trang chủ nhé.
      </Text>
    </article>
  );
}

export default NotFound;
