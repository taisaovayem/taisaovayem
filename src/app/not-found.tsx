import { Badge, Box, Heading } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <Box className="bg-gray-100 rounded-xl p-9">
      <Badge color="pink" className="mb-4">Lỗi</Badge>
      <Heading>Không tìm thấy trang</Heading>
    </Box>
  );
}
