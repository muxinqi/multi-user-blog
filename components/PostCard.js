import {
  Button,
  Card,
  Image,
  Link,
  Loading,
  Row,
  Tag,
  Text,
  useMediaQuery,
  User,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
// import NextImage from "next/image";
import { useCommentsCountByPostId } from "../lib/useHomePosts";
import NextLink from "next/link";
import moment from "moment";
import PropTypes from "prop-types";

const hash = (s) => {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

const PostCard = ({ post, mark }) => {
  const isXS = useMediaQuery("xs");
  const {
    id,
    title,
    // slug,
    createdAt,
    likesCount,
    rawContent,
    // viewsCount,
    tags,
    coverImage,
    author,
  } = post;
  const tagTypeArray = [
    "default",
    "secondary",
    "success",
    "warning",
    "error",
    "dark",
  ];
  const commentsCount = useCommentsCountByPostId(id);
  const avatarUrl = author.image
    ? author.image
    : "https://www.gravatar.com/avatar/" + hash(author.email + "");

  // description highlight
  let highlightContent = null;
  const keywordsIndex =
    mark && rawContent && rawContent.search(new RegExp(mark, "i"));
  const textLengthBeforeKeywords = 40;
  const textLengthAfterKeywords = 80;
  if (mark && rawContent && keywordsIndex !== -1) {
    const startIndex =
      keywordsIndex > textLengthBeforeKeywords
        ? keywordsIndex - textLengthBeforeKeywords
        : 0;
    const endIndex =
      rawContent.length - 1 - keywordsIndex > textLengthAfterKeywords
        ? keywordsIndex + textLengthAfterKeywords
        : rawContent.length - 1;
    const length = endIndex - startIndex;
    // Note the $& in it.
    // This is a reference to the matching word, with case preserved.
    highlightContent = rawContent
      .substr(startIndex, length)
      .replace(new RegExp(mark, "gi"), "<mark>$&</mark>");
  }
  return (
    <Row style={{ marginBottom: "15px" }}>
      <Card shadow style={{ width: "100%" }}>
        <Card.Body style={{ padding: "0" }}>
          {/* Cover Image */}
          {coverImage && (
            <NextLink href={`/posts/${id}`}>
              <a>
                <Image
                  src={coverImage}
                  alt="Post Cover Image"
                  layout="responsive"
                  width={2100}
                  height={900}
                />
              </a>
            </NextLink>
          )}
        </Card.Body>
        <Card.Content
          style={{ paddingLeft: "2%", paddingRight: "2%", paddingBottom: "2%" }}
        >
          {/* Title */}
          <NextLink href={`/posts/${id}`}>
            <Link underline>
              <Text h2 style={{ marginTop: "-10px", marginBottom: "-10px" }}>
                {title}
              </Text>
            </Link>
          </NextLink>
          <br />

          {/* Tags */}
          {tags &&
            tags.map((tag) => (
              <Tag
                type={
                  tagTypeArray[Math.floor(Math.random() * tagTypeArray.length)]
                }
                style={{ marginRight: "1%", marginTop: "1%" }}
                key={tag.id}
              >
                #{tag.name}
              </Tag>
            ))}

          {/* Keywords Highlight for Search */}
          {mark && highlightContent && (
            <div dangerouslySetInnerHTML={{ __html: highlightContent }} />
          )}
        </Card.Content>

        <Card.Footer style={{ paddingLeft: "0", paddingRight: "2%" }}>
          {/* Author Avatar */}
          <User src={avatarUrl} name={author.name ? author.name : "User"}>
            {moment(createdAt).fromNow()}
          </User>
          {/* Reactions Count */}
          <NextLink href={`/posts/${id}`}>
            <Button auto icon={<Icon.Heart />} style={{ marginRight: "2%" }}>
              {likesCount}&nbsp;{isXS ? "" : "reactions"}
            </Button>
          </NextLink>
          {/* Comments Count */}
          {typeof commentsCount.data == "undefined" && <Loading />}
          {typeof commentsCount.data !== "undefined" && (
            <NextLink href={`/posts/${id}#discussion`}>
              <Button auto icon={<Icon.MessageCircle />}>
                {commentsCount.data.toString()}&nbsp;{isXS ? "" : "comments"}
              </Button>
            </NextLink>
          )}
        </Card.Footer>
      </Card>
    </Row>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
  mark: PropTypes.string,
};

export default PostCard;
