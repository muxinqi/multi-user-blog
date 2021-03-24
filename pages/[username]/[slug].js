import Header from "components/Header";
import {
  Avatar,
  Button,
  Card,
  Col,
  Description,
  Divider,
  Grid,
  Image,
  Link,
  Page,
  Popover,
  Row,
  Spacer,
  Tag,
  Text,
  Textarea,
  User
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import Footer from "components/Footer";

const PostPage = () => {
  const title = 'The ultimate guide for data structures & algorithm interviews'
  const tag1 = '#career'
  const tag2 = '#beginners'
  const tag3 = '#algorithms'
  const tag4 = '#javascript'
  const postHeadImageUrl = 'https://i.loli.net/2021/03/07/xfQZ3cUb76Siy5E.png'
  const avatarUrl = 'https://unix.bio/assets/avatar.png'
  const name = 'Witt'
  const date = new Date().toDateString()
  const readTime = '45 min read'
  const h1Content = 'Why you should read this?'
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
        <Grid.Container gap={2} justify={"center"}>
          <Grid lg={1.5}>
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
          <Grid lg={14}>
            {/* Middle Content Feed */}
            <Col>
              <Card shadow style={{width: '100%'}} >
                {/* Post Header Image */}
                <Image width="100%" src={postHeadImageUrl} />
                <Spacer y={3} />
                {/* Post Title */}
                <Text h1>{title}</Text>
                <Row>
                  <Tag>{tag1}</Tag><Spacer x={0.5} />
                  <Tag>{tag2}</Tag><Spacer x={0.5} />
                  <Tag>{tag3}</Tag><Spacer x={0.5} />
                  <Tag>{tag4}</Tag><Spacer x={0.5} />
                </Row>
                <Spacer y={0.618}/>
                <Row align={"middle"}>
                  <User src={avatarUrl} name={name} /><Spacer x={0.5} />
                  <Text type="secondary" small>{date}</Text><Spacer x={1.5} />
                </Row>
                <Divider><Text type="secondary" small>{readTime}</Text></Divider>
                <Spacer y={1.5} />
                {/* Post Content */}
                <Text h2>{h1Content}</Text>
                <Text p>
                  There are N number of directions to go into when preparing for a technical interview. This guide is a summary of my experience and one single direction that can be taken which will give you results for sure without digressing from your path.
                  It will save you time as you do not have to follow multiple resources online.
                </Text>
                <Text p>
                  I have prepared a checklist of things from my personal experience while preparing for companies like Uber, Google, Flipkart, Amazon, Microsoft & Facebook.
                  I gave about 2 hours everyday for a period of 2 months for the preparation and this is the summary.
                </Text>
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
          <Grid lg={6}>
            {/* Right SideBar */}
            <Col>
              <Card shadow style={{width: '90%'}} >
                <Row align={"middle"}>
                  <Avatar src={"https://i.loli.net/2021/03/07/O154GQiXntzVA8k.png"} size="medium"/>
                  <Spacer x={0.5} />
                  <Text b size={20}> Rahul Arora </Text>
                </Row>
                <Text p> Founder: intervue.io Loves Innovation Javascript Enthusiast </Text>
                <Spacer y={0.618} />
                <Button auto type="success-light" style={{ width: '100%' }}> <Text b> Follow </Text> </Button>
                <Spacer y={1} />
                <Description title="LOCATION" content={"New Delhi"} />
                <Spacer y={0.618} />
                <Description title="JOINED" content={ new Date().toDateString() } />
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