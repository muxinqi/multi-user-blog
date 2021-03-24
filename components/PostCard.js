import { Button, Card, Link, Loading, Row, Tag, Text, useMediaQuery, User } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import Image from "next/image";
import { useCommentsCountByPostId } from "../lib/useHomePosts";
import NextLink from "next/link"

const hash = s => {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

const PostCard = ({ post }) => {
  const isXS = useMediaQuery('xs')
  const {
    id,
    title,
    slug,
    createdAt,
    likesCount,
    viewsCount,
    tags,
    coverImage,
    author
  } = post
  const tagTypeArray = ['default', 'secondary', 'success', 'warning', 'error', 'dark']
  const commentsCount = useCommentsCountByPostId(id)
  const avatarUrl = author.image ? author.image : 'https://www.gravatar.com/avatar/'+hash(author.email+'')
  return (
    <Row style={{ marginBottom: "15px" }}>
      <Card shadow style={{ width: "100%" }}>
        {!coverImage && <></>}
        {coverImage &&
          <NextLink href={`/posts/${id}`}>
            <a>
            <Image
              src={coverImage}
              alt="Post Cover Image"
              layout="responsive"
              width={210}
              height={90}
            />
            </a>
          </NextLink>
        }
        <NextLink href={`/posts/${id}`}>
          <Link underline><Text h2 style={{ marginTop: "15px", marginBottom: "-10px" }}>{title}</Text></Link>
        </NextLink>
        <br />
        {!tags && <></>}
        {tags.map(tag => (
          <Tag type={tagTypeArray[Math.floor(Math.random() * tagTypeArray.length)]} style={{ marginRight: "1%" }}
               key={tag.id}>#{tag.name}</Tag>
        ))}
        <Card.Footer>
          <User src={avatarUrl} name={author.name ? author.name : "User"} >
          </User>
          <NextLink href={`/posts/${id}`}>
            <Button auto icon={<Icon.Heart />}
                    style={{ marginRight: "2%" }}>{likesCount}&nbsp;{isXS ? "" : "reactions"}</Button>
          </NextLink>
          {
            typeof(commentsCount.data) == 'undefined' &&
            <Loading />
          }
          {
            typeof(commentsCount.data) !== 'undefined' &&
              <NextLink href={`/posts/${id}#discussion`}>
                <Button auto icon={<Icon.MessageCircle />}>
                  {commentsCount.data.toString()}&nbsp;{isXS ? "" : "comments"}
                </Button>
              </NextLink>
          }
        </Card.Footer>
      </Card>
    </Row>
  )
}
export default PostCard