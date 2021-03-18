import Header from "components/Header";
import { 
  Avatar, Button, Card, Col, Description, Divider, Grid, Image, Link, Page, 
  Popover, Row, Spacer, Tag, Text, Textarea, User
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import Footer from "components/Footer";


export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${context.params.id}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    }
  }
}

const PostPage = ({ data }) => {
  const {
    title,
    coverImage,
    createdAt,
    renderedContent,
    tags,
    author,
  } = data
  const tagTypeArray = ['default', 'secondary', 'success', 'warning', 'error', 'dark']
  const readTime = '45 min read'
  const content = () => (
    <>
      <Popover.Item title>
        <span>用户设置</span>
      </Popover.Item>
      <Popover.Item>
        <Link href="#">一个超链接</Link>
      </Popover.Item>
      <Popover.Item>
        <Link color href="#">前往修改用户配置</Link>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <span>命令行工具</span>
      </Popover.Item>
    </>
  )
  return (
    <>
      <Header />
      <Page.Body>
        <Grid.Container gap={1.5} justify={"center"}>
          <Grid xs={0} md={2} lg={1.5}>
            {/* Left SideBar */}
            <Col>
              <Spacer y={2} />
              <Row style={{ flexWrap: 'wrap' }}>
                <Button auto icon={<Icon.ThumbsUp />} />
              </Row>
              <Spacer y={0.618} />
              <Row style={{ flexWrap: 'wrap' }}>
                <Button auto icon={<Icon.Bookmark />} />
              </Row>
              <Spacer y={0.618} />
              <Row style={{ flexWrap: 'wrap' }}>
                <Popover content={content} placement={"right"}>
                  <Button auto icon={<Icon.MoreHorizontal />} />
                </Popover>
              </Row>
            </Col>
          </Grid>
          <Grid xs={24} md={21.5} lg={14}>
            {/* Middle Content Feed */}
            <Col>
              <Card shadow style={{width: '100%'}} >
                {/* Post Header Image */}
                <Image width="100%" src={coverImage} />
                <Spacer y={3} />
                {/* Post Title */}
                <Text h1>{title}</Text>
                <Row>
                {tags.map(tag => (
                  <Tag type={tagTypeArray[Math.floor(Math.random()*tagTypeArray.length)]} style={{ marginRight: "1%" }} key={tag.id}>#{tag.name}</Tag>
                ))}
                </Row>
                <Spacer y={0.618}/>
                <Row align={"middle"}>
                  <User src={author.image} name={author.name} /><Spacer x={0.5} />
                  <Text type="secondary" small>{ new Date(createdAt).toDateString }</Text><Spacer x={1.5} />
                </Row>
                <Divider><Text type="secondary" small>{readTime}</Text></Divider>
                <Spacer y={1.5} />

                {/* Post Content */}
                <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
                
                <Spacer y={1.5} />
                <Divider />
                <Spacer y={1.5} />
                {/* Comments Input*/}
                <Row justify={"space-between"}>
                  <Text b size="1.8rem">Discussion (3)</Text>
                </Row>
                <Spacer y={1} />
                <Row>
                  <Avatar text="Joe" size="medium"/>
                  <Spacer x={0.5} />
                  <Textarea width="90%" placeholder="Add to the discussion" />
                </Row>
                <Spacer y={1} />

                <Row>
                  <Avatar src={"https://i.loli.net/2021/03/07/uAfLay5rhPlskK9.png"} size="medium" />
                  <Spacer x={0.5} />
                  <Card style={{ width: "90%" }} >
                    <Row>
                      <Link href={"/muxinqi"}><Text small b type="secondary">jamesfranklin-max</Text></Link>
                      <Spacer x={0.5} />
                      <Link href={"/muxinqi"}><Text small type="secondary">{new Date().toDateString()}</Text></Link>
                      <Button auto size="small" icon={<Icon.MoreHorizontal />} style={{ position: "absolute", right: "0px" }} />
                    </Row>
                    <Text p>
                      Yesterday was stuck with back tracking question, this really helped a lot.
                      Since having a step by step approach helps in breaking down the problem statement in smaller unit, solving becomes easier.
                    </Text>
                    <Text p/>
                    <Text p>
                      Thanks, This will definitely help the community.
                    </Text>
                  </Card>
                </Row>
              </Card>
            </Col>
          </Grid>
          <Grid xs={0}  md={2} lg={0}></Grid>
          <Grid xs={24} md={21.5} lg={6}>
            {/* Right SideBar */}
            <Col>
              <Card shadow style={{width: '100%'}} >
                <Row align={"middle"}>
                  <Avatar src={author.image} size="medium"/>
                  <Spacer x={0.5} />
                  <Text b size={20}> {author.name} </Text>
                </Row>
                <Text p> Founder: intervue.io Loves Innovation Javascript Enthusiast </Text>
                <Spacer y={0.618} />
                <Button auto type="success-light" style={{ width: '100%' }}> <Text b> Follow </Text> </Button>
                <Spacer y={1} />
                <Description title="LOCATION" content={"New Delhi"} />
                <Spacer y={0.618} />
                <Description title="JOINED" content={ new Date(author.createdAt).toDateString() } />
              </Card>
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
      <Footer />
    </>
  )
}
export default PostPage