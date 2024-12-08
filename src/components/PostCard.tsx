import { Card, Link, Text } from "@radix-ui/themes";
import { Value } from "vfile";

export type PostCardProps = {
  title: string;
  slug: string;
  description: Value;
};

export function PostCard({ slug, title, description }: PostCardProps) {
  return (
    <Card className="shadow-lg">
      <Link href={`/post/${slug}`}>
        <Text as="div" size="2" weight="bold" className="mb-4">
          {title}
        </Text>
        <Text
          as="div"
          color="gray"
          size="2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Text>
      </Link>
    </Card>
  );
}

export default PostCard;
