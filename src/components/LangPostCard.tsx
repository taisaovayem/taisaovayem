"use client";
import { Box, Card, Link, Text } from "@radix-ui/themes";
import { replaceRoute } from "@/helpers";

type PostCardProps = {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
};

export function LangPostCard({
  slug,
  title,
  description,
  thumbnailUrl,
}: PostCardProps) {
  return (
    <Card>
      <Link href={`/${slug}`} className="no-underline hover:no-underline">
        {thumbnailUrl ? (
          <Box className="-mx-4 -mt-4">
            <img src={thumbnailUrl} />
          </Box>
        ) : null}
        {Boolean(title) && (
          <Text
            as="div"
            size="5"
            weight="bold"
            className="my-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <Text
          as="div"
          color="gray"
          size="2"
          dangerouslySetInnerHTML={{ __html: replaceRoute(description) }}
        ></Text>
      </Link>
    </Card>
  );
}

export default LangPostCard;
