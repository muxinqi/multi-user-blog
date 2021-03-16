import {Button, Card, Image, Link, Row, Text, User} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";

const HeadImage = ({ headImageUrl }) => {
  const hasImage = headImageUrl.indexOf('http') === 0
  if (hasImage) {
    return (
      <Image height="400" src={headImageUrl}/>
    )
  } else {
    return (
      <></>
    )
  }
}

const PostCard = ({ post }) => {
  const {
    id,
    title,
    slug,
    createdAt,
    tags,
    coverImage,
    author
  } = post
  console.log("post: ", JSON.stringify(coverImage))
  const commentsCount = 0
  return (
    <Row style={{  marginBottom: '15px' }}>
      <Card shadow style={{width: '100%'}}>
        {!coverImage && <></>}
        {coverImage &&
          <HeadImage headImageUrl={coverImage} />
        }
        <Link href={`/posts/${slug}`}><Text h3>{title}</Text></Link>
        {/*<Text type="secondary">{description}</Text>*/}
        <Card.Footer>
          <User src={author.image} name={author.name} />
          <Button auto icon={<Icon.MessageCircle />}>&nbsp;{commentsCount}&nbsp;&nbsp;comments</Button>
        </Card.Footer>
      </Card>
    </Row>
  )
}
export default PostCard