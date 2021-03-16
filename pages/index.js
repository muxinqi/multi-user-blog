import {Button, Card, Col, Grid, Link, Loading, Page, Row, Spacer, Text} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons"
import PostCard from "components/PostCard";
import Header from "components/Header";
import Footer from "components/Footer";
import useSWR from "swr";
import {useGetPosts} from "lib/useGetPosts";

export default function HomePage() {

  const text = "M Blog is a community of 34567,678 amazing developers"
  const smallText = "We're a place where coders share, stay up-to-date and grow their careers."
  const { posts, error } = useGetPosts("/api/home")
  if (error) return <h1>Something went wrong!</h1>
  if (!posts) return <Loading>加载中</Loading>
  return (
    <>
      {/* Header */}
      <Header />

      {/* Body */}
      <Page.Body>
        <Grid.Container gap={2} justify="center">
          <Grid lg={4}>
            {/* Left SideBar */}
            <Col>
              <Row style={{ flexWrap: 'wrap' }}>
                <Card shadow style={{width: '100%'}}>
                  <Text h5>{text}</Text>
                  <Text small>{smallText}</Text>
                  <Spacer y={0.618}/>
                  <Row justify={"center"}>
                    <Button auto type="success-light">Create account</Button>
                  </Row>
                  <Spacer y={0.618}/>
                  <Row justify={"center"}>
                    <Button auto>Log in</Button>
                  </Row>
                </Card>
                <Spacer y={1}/>
                <Button auto icon={<Icon.Home/>} style={{width: '100%'}}><Link href={"/"}>Home</Link></Button>
                <Spacer y={0.3}/>
                <Button auto icon={<Icon.Key/>} style={{width: '100%'}}><Link href={"/"}>Sign In/Up</Link></Button>
                <Spacer y={0.3}/>
                <Button auto icon={<Icon.Archive/>} style={{width: '100%'}}><Link href={"/"}>Archive</Link></Button>
              </Row>
            </Col>
          </Grid>
          <Grid lg={11}>
            {/* Middle Content Feed */}
            <Col>
              {posts.map(post => (
                <PostCard post={post} key={post.id}/>
              ))}
            </Col>

          </Grid>
          <Grid lg={5}>
            {/* Right SideBar */}
            <Col>
              <Card shadow style={{width: '100%', height: '500px'}}/>
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>

      {/* Footer */}
      <Footer />
    </>
  )
}