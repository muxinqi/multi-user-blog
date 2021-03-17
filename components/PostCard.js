import {Button, Card, Image, Link, Row, Tag, Text, useMediaQuery, User} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";

const PostCard = ({ post }) => {
  const isXS = useMediaQuery('xs')
  const {
    id,
    title,
    slug,
    createdAt,
    tags,
    coverImage,
    author
  } = post
  const tagTypeArray = ['default', 'secondary', 'success', 'warning', 'error', 'dark']

  const commentsCount = 0
  return (
    <Row style={{  marginBottom: '15px' }}>
      <Card shadow style={{width: '100%'}}>
        {!coverImage && <></>}
        {coverImage &&
          <Image width="100%" src={coverImage}/>
        }
        <Link href={`/posts/${id}`}><Text h2>{title}</Text></Link>
        {/*<Text type="secondary">{description}</Text>*/}
        <br />
        {tags.map(tag => (
          <Tag type={tagTypeArray[Math.floor(Math.random()*tagTypeArray.length)]} style={{ marginRight: "1%" }} key={tag.id}>#{tag.name}</Tag>
        ))}
        <Card.Footer>
          <User src={author.image} name={author.name} />
          <Button auto icon={<Icon.Heart />} style={{ marginRight: "2%" }}>&nbsp;{commentsCount}&nbsp;&nbsp;{isXS ? "" : "reactions"}</Button>
          <Button auto icon={<Icon.MessageCircle />}>&nbsp;{commentsCount}&nbsp;&nbsp;{isXS ? "" : "comments"}</Button>
        </Card.Footer>
      </Card>
    </Row>
  )
}
export default PostCard