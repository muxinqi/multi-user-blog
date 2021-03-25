import Header from "components/Header";
import Footer from "components/Footer";
import {
  Button,
  ButtonDropdown,
  Card,
  Code,
  Col,
  Grid,
  Image,
  Loading,
  Modal,
  Popover,
  Row,
  Spacer,
  Table,
  Text,
  useMediaQuery,
  useModal,
  useToasts,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useDashboardPosts, useDashboardStats } from "lib/useHomePosts";
import NextLink from "next/link";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import { SITE_NAME } from "lib/constants";
import Head from "next/head";

const DashboardPage = () => {
  // Authentication
  const [session, loading] = useSession();
  if (loading) return null;
  if (!loading && !session) {
    const handleClick = (e) => {
      e.preventDefault();
      signIn({
        callbackUrl: `${process.env.BASE_URL}/dashboard`,
      });
    };
    return (
      <div align="center">
        <h1>❌ Access Denied</h1>
        <strong>
          Please{" "}
          <Button
            auto
            size="small"
            type="success-light"
            ghost
            onClick={handleClick}
          >
            Login
          </Button>{" "}
          first
        </strong>
      </div>
    );
  }
  // Loading Dashboard Page
  const ltSM = useMediaQuery("sm", { match: "down" });
  const stats = useDashboardStats();
  const posts = useDashboardPosts();

  const editOperation = (actions, rowData) => {
    return (
      <NextLink href={`/posts/${rowData.rowValue.id}/edit`}>
        <Button auto size="mini" type="success" ghost>
          Edit
        </Button>
      </NextLink>
    );
  };

  const moreOperation = (actions, rowData) => {
    const [, setToast] = useToasts();
    const [popoverVisible, setPopoverVisible] = React.useState(false);
    const popoverChangeHandler = (next) => {
      setPopoverVisible(next);
    };
    const [
      deletePostLoadingVisible,
      setDeletePostLoadingVisible,
    ] = React.useState(false);
    const handleDeletePost = () => {
      setDeletePostLoadingVisible(true);
      fetch(`/api/posts/${rowData.rowValue.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setModalVisible(false);
            actions.remove();
            setToast({
              type: "warning",
              text: "successful delete post",
            });
          } else {
            setToast({
              type: "error",
              text: "failed to delete post, please try again.",
            });
          }
        })
        .catch((error) => {
          console.log("failed to delete post, error: ", error);
        })
        .finally(() => {
          setDeletePostLoadingVisible(false);
        });
    };
    const { visible, setVisible: setModalVisible, bindings } = useModal();
    const content = () => (
      <>
        <Popover.Item>
          <Button
            auto
            type="error"
            ghost
            iconRight={<Icon.Delete />}
            onClick={() => {
              setPopoverVisible(false);
              setModalVisible(true);
            }}
          >
            Delete
          </Button>
        </Popover.Item>
        <Popover.Item>
          <Button
            auto
            type="success"
            ghost
            iconRight={<Icon.Share />}
            onClick={() => setPopoverVisible(false)}
          >
            Share
          </Button>
        </Popover.Item>
      </>
    );
    return (
      <>
        <Popover
          content={content}
          placement="left"
          visible={popoverVisible}
          onVisibleChange={popoverChangeHandler}
        >
          <Button auto size="mini" icon={<Icon.MoreHorizontal />} />
        </Popover>
        <Modal {...bindings}>
          <Modal.Title>Are you sure to delete this article</Modal.Title>
          <Modal.Content>
            <p>
              The deletion operation is <Code>irrevocable</Code> and{" "}
              <Code>permanent</Code>. After the article is deleted, it will be{" "}
              <b>erased from our server</b>, and the article will not be found
              in the Dashboard.
            </p>
          </Modal.Content>
          <Modal.Action
            passive
            loading={deletePostLoadingVisible}
            onClick={handleDeletePost}
          >
            {" "}
            confirm delete{" "}
          </Modal.Action>
          <Modal.Action onClick={() => setModalVisible(false)}>
            {" "}
            not now{" "}
          </Modal.Action>
        </Modal>
      </>
    );
  };

  // Dashboard posts table data
  let data = [];
  if (posts.posts) {
    const postCountData = (like, view) => {
      const iconSize = 20;
      const iconColor = "grey";
      return (
        <Row>
          <Icon.Heart size={iconSize} color={iconColor} />
          &nbsp;{like}&nbsp;&nbsp;
          {/*<Icon.MessageCircle size={iconSize} color={iconColor} />&nbsp;{like}&nbsp;&nbsp;*/}
          {/* TODO: Add Comment Count */}
          <Icon.Eye size={iconSize} color={iconColor} />
          &nbsp;{view}&nbsp;&nbsp;
        </Row>
      );
    };
    posts.posts.map((post) => {
      data.push({
        id: post.id,
        visible: post.published ? (
          <Icon.Unlock color="green" />
        ) : (
          <Icon.Lock color="red" />
        ),
        title: (
          <Row>
            <Col>
              <NextLink href={`/posts/${post.id}`}>
                <a style={{ color: "inherit" }}>
                  <Text b p style={{ marginBottom: "-6.18px" }}>
                    {post.title}
                  </Text>
                </a>
              </NextLink>
              <Text
                small
                p
                type="secondary"
                title={new Date(post.createdAt).toString()}
              >
                {new Date(post.createdAt).toDateString()}
              </Text>
              {ltSM && (
                <div style={{ marginBottom: "15px" }}>
                  {postCountData(post.likesCount, post.viewsCount)}
                </div>
              )}
            </Col>
          </Row>
        ),
        stats: (
          <>{ltSM ? <></> : postCountData(post.likesCount, post.viewsCount)}</>
        ),
        editOperation,
        moreOperation,
      });
    });
  }
  return (
    <>
      <Head>
        <title>Dashboard - {SITE_NAME}</title>
      </Head>
      <Header />
      <Spacer y={2} />
      <Grid.Container justify={"center"}>
        <Grid xs={24} xl={21}>
          <Col>
            <Grid.Container
              gap={0.8}
              style={{ paddingLeft: "2%", paddingRight: "2%" }}
            >
              <Grid xs={24}>
                <Text h2>Dashboard</Text>
              </Grid>
              {/* Statistics Card */}
              <Grid xs={24} sm={0}>
                <ButtonDropdown style={{ width: "100%", marginBottom: "15px" }}>
                  <ButtonDropdown.Item main>
                    <Text b>Post(0)</Text>
                  </ButtonDropdown.Item>
                  <ButtonDropdown.Item>Listings</ButtonDropdown.Item>
                  <ButtonDropdown.Item>Follower</ButtonDropdown.Item>
                </ButtonDropdown>
              </Grid>
              <Grid xs={12} md={6}>
                <Card shadow style={{ width: "100%" }}>
                  {stats.isLoading && <Loading />}
                  {stats.data && (
                    <Text size={30} b>
                      {stats.data.like}
                    </Text>
                  )}
                  <Text type="secondary">Total post reactions</Text>
                </Card>
              </Grid>
              <Grid xs={12} md={6}>
                <Card shadow style={{ width: "100%" }}>
                  {stats.isLoading && <Loading />}
                  {stats.data && (
                    <Text size={30} b>
                      {stats.data.view < 500 ? "< 500" : stats.data.view}
                    </Text>
                  )}
                  <Text type="secondary">Total post views</Text>
                </Card>
              </Grid>
              <Grid xs={12} md={6}>
                <Card shadow style={{ width: "100%" }}>
                  {stats.isLoading && <Loading />}
                  {stats.data && (
                    <Text size={30} b>
                      0
                    </Text>
                  )}
                  <Text type="secondary">Listings created</Text>
                </Card>
              </Grid>
              <Grid xs={12} md={6}>
                <Card shadow style={{ width: "100%" }}>
                  {stats.isLoading && <Loading />}
                  {stats.data && (
                    <Text size={30} b>
                      0
                    </Text>
                  )}
                  <Text type="secondary">Total post reactions</Text>
                </Card>
              </Grid>
              <Grid xs={0} md={7} lg={6} xl={5} style={{ marginTop: "15px" }}>
                <Card shadow style={{ width: "100%", height: "400px" }} />
              </Grid>
              <Grid
                xs={24}
                md={17}
                lg={18}
                xl={19}
                style={{ marginTop: "15px" }}
              >
                <Col>
                  <Text h3 b>
                    {" "}
                    Posts{" "}
                  </Text>
                  <Card shadow style={{ width: "100%" }}>
                    {posts.isLoading && <Loading />}
                    {posts.posts && posts.posts.length <= 0 ? (
                      <>
                        <Image
                          src={
                            "https://i.loli.net/2021/03/08/vIX8FhKtDNyrziq.png"
                          }
                        />
                        <Row
                          justify={"center"}
                          style={{ marginBottom: "15px" }}
                        >
                          <Text
                            b
                            size={"large"}
                            style={{ textAlign: "center" }}
                          >
                            {`This is where you can manage your posts, but you haven't written anything yet.`}
                          </Text>
                        </Row>
                        <Row justify={"center"}>
                          <NextLink href={"/new-post"}>
                            <Button type="success-light">
                              <Text b>Write your first post now</Text>
                            </Button>
                          </NextLink>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Table data={data}>
                          <Table.Column prop="id" label="id" />
                          <Table.Column prop="visible" label="visible" />
                          <Table.Column prop="title" label="Post" />
                          <Table.Column prop="stats" label="" />
                          <Table.Column prop="editOperation" label="edit" />
                          <Table.Column prop="moreOperation" label="more" />
                        </Table>
                      </>
                    )}
                  </Card>
                </Col>
              </Grid>
            </Grid.Container>
          </Col>
        </Grid>
      </Grid.Container>
      <Footer />
    </>
  );
};
export default DashboardPage;
