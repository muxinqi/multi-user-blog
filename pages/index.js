import {
  Button,
  Card,
  Col,
  Grid,
  Link,
  Loading,
  Page,
  Row,
  Spacer,
  Text,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import PostCard from "components/PostCard";
import Header from "components/Header";
import Footer from "components/Footer";
import { useHomePosts } from "lib/useHomePosts";
import { SITE_NAME } from "lib/constants";
import Head from "next/head";
import { signIn, useSession } from "next-auth/client";
import NextLink from "next/link";

function PostFeed() {
  const { posts, isLoading, isError } = useHomePosts();
  if (isError) return <h1>Something went wrong!</h1>;
  if (isLoading) return <Loading>Loading</Loading>;
  return (
    <>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}

export default function HomePage() {
  const [session, loading] = useSession();
  const text = "M Blog is a community of 34567,678 amazing developers";
  const smallText =
    "We're a place where coders share, stay up-to-date and grow their careers.";

  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      {/* Header */}
      <Header />

      {/* Body */}
      <Page.Body>
        <Grid.Container
          gap={1}
          justify="center"
          style={{ paddingLeft: "1.5%", paddingRight: "1.5%" }}
        >
          <Grid xs={0} sm={7} lg={5.5} xl={4.5}>
            {/* Left SideBar */}
            <Col>
              <Row style={{ flexWrap: "wrap" }}>
                {loading && <Loading />}
                {!session && (
                  <>
                    <Card shadow style={{ width: "100%" }}>
                      <Text h5>{text}</Text>
                      <Text small>{smallText}</Text>
                      <Spacer y={0.618} />
                      <Row justify={"center"}>
                        <Button auto type="success-light">
                          Create account
                        </Button>
                      </Row>
                      <Spacer y={0.618} />
                      <Row justify={"center"}>
                        <Button auto>Log in</Button>
                      </Row>
                    </Card>
                    <Spacer y={1} />
                  </>
                )}
                <Button auto icon={<Icon.Home />} style={{ width: "100%" }}>
                  <NextLink href={"/"}>
                    <Link>Home</Link>
                  </NextLink>
                </Button>
                <Spacer y={0.3} />
                {loading && <Loading />}
                {!session && (
                  <>
                    <Button
                      auto
                      icon={<Icon.Key />}
                      style={{ width: "100%" }}
                      onClick={() => signIn()}
                    >
                      <Link href={"/"}>Sign In/Up</Link>
                    </Button>
                    <Spacer y={0.3} />
                  </>
                )}
                <Button auto icon={<Icon.Archive />} style={{ width: "100%" }}>
                  <Link href={"/"}>Archive</Link>
                </Button>
              </Row>
            </Col>
          </Grid>
          <Grid xs={24} sm={17} lg={13} xl={11.5}>
            {/* Middle Content Feed */}
            <Col>
              <PostFeed />
            </Col>
          </Grid>
          <Grid xs={0} lg={5.5} xl={5.5}>
            {/* Right SideBar */}
            <Col>
              <Card shadow style={{ width: "100%", height: "500px" }} />
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>

      {/* Footer */}
      <Footer />
    </>
  );
}
