import { Post } from "@/helpers/post";
import { Text } from "@radix-ui/themes";

type ClipboardContentProps = {
  post: Post;
};

export function ClipboardContent({ post }: ClipboardContentProps) {
  return (
    <div className="rounded-xl p-4" style={{boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.08), 0 2px 7px 0 rgba(0, 0, 0, 0.08)'}}>
      <Text as="div" size="2" weight="bold" className="mb-4">
        {post.data.title}
      </Text>
      <Text
        as="div"
        color="gray"
        size="2"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></Text>
    </div>
  );
}

export default ClipboardContent;
