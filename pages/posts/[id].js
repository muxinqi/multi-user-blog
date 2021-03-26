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
  Loading,
  Page,
  Popover,
  Row,
  Spacer,
  Tag,
  Text,
  Textarea,
  useInput,
  User,
  useToasts,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import Footer from "components/Footer";
import { getSession, useSession } from "next-auth/client";
import React, { useState } from "react";
import { useCommentsByPostId } from "lib/useCommentsByPostId";
import moment from "moment";
import Head from "next/head";
import { SITE_NAME } from "lib/constants";
import PropTypes from "prop-types";

export async function getServerSideProps({ params, req }) {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${params.id}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  const isPrivatePost = !data.published;
  const session = await getSession({ req });
  if (!session) {
    if (isPrivatePost) {
      return {
        notFound: true,
      };
    }
  } else {
    const visitorIsNotAuthor = data.author.email !== session.user.email;
    if (isPrivatePost && visitorIsNotAuthor) {
      return {
        notFound: true,
      };
    }
  }
  // post views increment
  fetch(`${process.env.BASE_URL}/api/posts/${params.id}/views`, {
    method: "PATCH",
  });
  return {
    props: {
      data,
      postId: params.id,
    },
  };
}

const PostPage = ({ data }) => {
  PostPage.propTypes = {
    data: PropTypes.object.isRequired,
  };
  const {
    id: postId,
    title,
    coverImage,
    createdAt,
    renderedContent,
    tags,
    author,
  } = data;
  const tagTypeArray = [
    "default",
    "secondary",
    "success",
    "warning",
    "error",
    "dark",
  ];
  const readTime = "45 min read";
  const [likePost, setLikePost] = React.useState(false);
  const content = () => (
    <>
      <Popover.Item title>
        <span>用户设置</span>
      </Popover.Item>
      <Popover.Item>
        <Link href="#">一个超链接</Link>
      </Popover.Item>
      <Popover.Item>
        <Link color href="#">
          前往修改用户配置
        </Link>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <span>命令行工具</span>
      </Popover.Item>
    </>
  );
  const handleLike = () => {
    fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
      method: "PATCH",
    }).then((res) => {
      if (res.ok) {
        setLikePost(true);
      }
    });
  };

  return (
    <>
      <Head>
        <title>
          {title} - {SITE_NAME}
        </title>
      </Head>
      <Header />
      <Page.Body>
        <Grid.Container gap={1.5} justify={"center"}>
          <Grid xs={0} md={2} lg={1.5}>
            {/* Left SideBar */}
            <Col>
              <Spacer y={2} />
              <Row style={{ flexWrap: "wrap" }}>
                <Button
                  auto
                  icon={
                    likePost ? <Icon.HeartFill color="red" /> : <Icon.Heart />
                  }
                  onClick={handleLike}
                />
              </Row>
              <Spacer y={0.618} />
              <Row style={{ flexWrap: "wrap" }}>
                <Button auto icon={<Icon.Bookmark />} />
              </Row>
              <Spacer y={0.618} />
              <Row style={{ flexWrap: "wrap" }}>
                <Popover content={content} placement={"right"}>
                  <Button auto icon={<Icon.MoreHorizontal />} />
                </Popover>
              </Row>
            </Col>
          </Grid>
          <Grid xs={24} md={21.5} lg={14}>
            {/* Middle Content Feed */}
            <Col>
              <Card shadow style={{ width: "100%" }}>
                {/* Post Header Image */}
                <Image width="100%" src={coverImage} />
                <Spacer y={3} />
                {/* Post Title */}
                <Text h1>{title}</Text>
                <Row>
                  {tags.map((tag) => (
                    <Tag
                      type={
                        tagTypeArray[
                          Math.floor(Math.random() * tagTypeArray.length)
                        ]
                      }
                      style={{ marginRight: "1%" }}
                      key={tag.id}
                    >
                      #{tag.name}
                    </Tag>
                  ))}
                </Row>
                <Spacer y={0.618} />
                <Row align={"middle"}>
                  <User src={author.image} name={author.name} />
                  <Spacer x={0.5} />
                  <Text type="secondary" small>
                    {new Date(createdAt).toDateString}
                  </Text>
                  <Spacer x={1.5} />
                </Row>
                <Divider>
                  <Text type="secondary" small>
                    {readTime}
                  </Text>
                </Divider>
                <Spacer y={1.5} />

                {/* Post Content */}
                <div dangerouslySetInnerHTML={{ __html: renderedContent }} />

                <Spacer y={1.5} />
                <Divider />
                <Spacer y={1.5} />
                {/* Discussion Area */}
                <Discussion postId={postId} id="discussion" />
              </Card>
            </Col>
          </Grid>
          <Grid xs={0} md={2} lg={0} />
          <Grid xs={24} md={21.5} lg={6}>
            {/* Right SideBar */}
            <Col>
              <Card shadow style={{ width: "100%" }}>
                <Row align={"middle"}>
                  <Avatar src={author.image} size="medium" />
                  <Spacer x={0.5} />
                  <Text b size={20}>
                    {" "}
                    {author.name}{" "}
                  </Text>
                </Row>
                <Text p>
                  {" "}
                  Founder: intervue.io Loves Innovation Javascript Enthusiast{" "}
                </Text>
                <Spacer y={0.618} />
                <Button auto type="success-light" style={{ width: "100%" }}>
                  {" "}
                  <Text b> Follow </Text>{" "}
                </Button>
                <Spacer y={1} />
                <Description title="LOCATION" content={"New Delhi"} />
                <Spacer y={0.618} />
                <Description
                  title="JOINED"
                  content={new Date(author.createdAt).toDateString()}
                />
              </Card>
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
      <Footer />
    </>
  );
};

const DiscussionCard = ({ comment }) => {
  const {
    author: { image, name },
    createdAt,
    renderedContent,
  } = comment;
  DiscussionCard.propTypes = {
    comment: PropTypes.object.isRequired,
  };
  return (
    <>
      <Grid xs={5} sm={3.5} md={3} xl={2} style={{ marginTop: "25px" }}>
        <Avatar src={image} size="medium" />
      </Grid>
      <Grid xs={19} sm={20.5} md={21} xl={22} style={{ marginTop: "25px" }}>
        <Card style={{ width: "100%" }}>
          <Row>
            <Link href={"/muxinqi"}>
              <Text small b type="secondary">
                {name}
              </Text>
            </Link>
            <Spacer x={0.5} />
            <Link href={"/muxinqi"}>
              <Text
                small
                type="secondary"
                title={new Date(createdAt).toString()}
              >
                {moment(createdAt).fromNow()}
              </Text>
            </Link>
            <Button
              auto
              size="small"
              icon={<Icon.MoreHorizontal />}
              style={{ position: "absolute", right: "0px" }}
            />
          </Row>

          {/* Comment Content */}
          <div
            dangerouslySetInnerHTML={{
              __html: renderedContent,
            }}
          />
        </Card>
      </Grid>
    </>
  );
};

const Discussion = ({ postId }) => {
  Discussion.propTypes = {
    postId: PropTypes.number.isRequired,
  };
  const [session] = useSession();
  const [btnDisable, setBtnDisable] = useState(true);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const { state, setState, reset, bindings } = useInput("");
  const [, setToast] = useToasts();

  const toast = (type, text) => {
    setToast({
      type: type,
      text: text,
    });
  };

  const { comments, isLoading, isError } = useCommentsByPostId(postId);

  const handleSubmit = async () => {
    const data = {
      rawContent: state,
    };
    const url = `/api/posts/${postId}/comments`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok && res.status === 201) {
          reset();
          toast("success", "Comment submitted successfully");
        } else {
          toast("warning", "Failed to send comment.");
          console.log("failed to send comment: ", res.status);
        }
      })
      .catch((error) => {
        console.log("error: ", error.message);
      });
  };

  const SubmitBtn = () => (
    <Row style={{ marginTop: "15px" }}>
      <Button auto type="success" onClick={handleSubmit} disabled={btnDisable}>
        {" "}
        Submit{" "}
      </Button>
      <Spacer y={0.5} />
      <Button auto type="secondary" ghost disabled={btnDisable}>
        {" "}
        Preview{" "}
      </Button>
    </Row>
  );

  const handleInputChange = (e) => {
    setState(e.target.value);
    if (e.target.value.length > 0) {
      // display submit button
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  return (
    <>
      <Grid.Container justify={"center"}>
        <Grid xs={24} style={{ marginBottom: "15px" }}>
          <Text b size="1.8rem">
            Discussion (3)
          </Text>
        </Grid>
        <Grid xs={5} sm={3.5} md={3} xl={2}>
          {!session && <Avatar text="Guest" size="medium" />}
          {session && <Avatar src={session.user.image} size="medium" />}
        </Grid>
        <Grid xs={19} sm={20.5} md={21} xl={22}>
          <Col>
            <Row>
              <Textarea
                width="100%"
                {...bindings}
                onChange={handleInputChange}
                placeholder="Add to the discussion"
                onFocus={() => setShowSubmitBtn(true)}
              />
            </Row>
            {showSubmitBtn ? <SubmitBtn /> : null}
          </Col>
        </Grid>
        {isLoading && <Loading />}
        {isError && <>Something went wrong.</>}
        {comments &&
          comments.map((comment) => (
            <DiscussionCard comment={comment} key={comment.id} />
          ))}
      </Grid.Container>
    </>
  );
};

export default PostPage;
