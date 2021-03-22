import Header from "components/Header";
import Footer from "components/Footer";
import {
  Button,
  ButtonDropdown,
  Card,
  Col,
  Grid,
  Image,
  Loading,
  Row,
  Spacer,
  Table,
  Text,
  useMediaQuery
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useDashboardStats, useHomePosts } from "../lib/useHomePosts";
import Link from "next/link";
import { signIn, useSession } from "next-auth/client";

const DashboardPage = () => {
  // Authentication
  const [session, loading] = useSession();
  if (loading) return null;
  if (!loading && !session) {
    const handleClick = (e) => {
      e.preventDefault();
      signIn({
        callbackUrl: `${process.env.BASE_URL}/dashboard`
      });
    };
    return (
      <div align="center">
        <h1>❌ Access Denied</h1>
        <strong>Please <Button auto size="small" type="success-light" ghost
                               onClick={handleClick}>Login</Button> first</strong>
      </div>
    );
  }
  // Loading Dashboard Page
  const ltSM = useMediaQuery("sm", { match: "down" });
  const stats = useDashboardStats();
  const posts = useHomePosts();
  console.log("stats: ", JSON.stringify(stats.data));
  console.log("posts: ", JSON.stringify(posts.posts));

  const editOperation = (actions, rowData) => {
    return <Link href={`/posts/${rowData.rowValue.id}/edit`}>
      <Button auto size="mini" type="success" ghost>Edit</Button>
    </Link>;
  };

  const moreOperation = (actions, rowData) => {
    return <Button auto size="mini" icon={<Icon.MoreHorizontal />} />;
  };

  // Dashboard posts table data
  let data = [];
  if (posts.posts) {
    const postCountData = (like, view) => {
      const iconSize = 20;
      const iconColor = "grey";
      return (
        <Row>
          <Icon.Heart size={iconSize} color={iconColor} />&nbsp;{like}&nbsp;&nbsp;
          <Icon.MessageCircle size={iconSize} color={iconColor} />&nbsp;{like}&nbsp;&nbsp;
          <Icon.Eye size={iconSize} color={iconColor} />&nbsp;{view}&nbsp;&nbsp;
        </Row>
      );
    };
    posts.posts.map(post => {
      console.log("post: ", post);
      data.push({
        id: post.id,
        title:
          <Row>
            <Col>
              <Link href={`/posts/${post.id}`}>
                <Text b p style={{ marginBottom: "-6.18px" }}>{post.title}</Text>
              </Link>
              <Text small p type="secondary">{new Date(post.createdAt).toDateString()}</Text>
              {
                ltSM && <div style={{ marginBottom: "15px" }}>{postCountData(post.like, post.view)}</div>
              }
            </Col>
          </Row>,
        stats: <>
          {
            ltSM ? <></> : postCountData(post.like, post.view)
          }
        </>,
        editOperation,
        moreOperation
      });
    });
  }
  return (
    <>
      <Header />
      <Spacer y={2} />
      <Grid.Container justify={"center"}>
        <Grid xs={24} xl={21}>
          <Col>
            <Grid.Container gap={0.8} style={{ paddingLeft: "2%", paddingRight: "2%" }}>
              <Grid xs={24}>
                <Text h2>Dashboard</Text>
              </Grid>
              {/* Statistics Card */}
              <Grid xs={24} sm={0}>
                <ButtonDropdown style={{ width: "100%", marginBottom: "15px" }}>
                  <ButtonDropdown.Item main><Text b>Post(0)</Text></ButtonDropdown.Item>
                  <ButtonDropdown.Item>Listings</ButtonDropdown.Item>
                  <ButtonDropdown.Item>Follower</ButtonDropdown.Item>
                </ButtonDropdown>
              </Grid>
              <Grid xs={12} md={6}>
                <Card shadow style={{ width: "100%" }}>
                  {stats.isLoading && <Loading />}
                  {
                    stats.data &&
                    <Text size={30} b>{stats.data.like}</Text>
                  }
                  <Text type="secondary">Total post reactions</Text>
                </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card shadow style={{ width: "100%" }}>
                    {stats.isLoading && <Loading />}
                    {
                      stats.data &&
                      <Text size={30} b>
                        {stats.data.view < 500 ? "&lt;&nbsp;500" : stats.data.view}
                      </Text>
                    }
                    <Text type="secondary">Total post views</Text>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card shadow style={{ width: "100%" }}>
                    {stats.isLoading && <Loading />}
                    {
                      stats.data &&
                      <Text size={30} b>0</Text>
                    }
                    <Text type="secondary">Listings created</Text>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card shadow style={{ width: "100%" }}>
                    {stats.isLoading && <Loading />}
                    {
                      stats.data &&
                      <Text size={30} b>0</Text>
                    }
                    <Text type="secondary">Total post reactions</Text>
                  </Card>
                </Grid>
              <Grid xs={0} md={7} lg={6} xl={5} style={{ marginTop: "15px" }}>
                <Card shadow style={{ width: "100%", height: "400px" }} />
              </Grid>
              <Grid xs={24} md={17} lg={18} xl={19} style={{ marginTop: "15px" }}>
                <Col>
                  <Text h3 b> Posts </Text>
                  <Card shadow style={{ width: "100%" }}>
                    {
                      posts.isLoading &&
                      <Loading />
                    }
                    {posts.posts &&
                    posts.posts.length <= 0 ?
                      <>
                        <Image src={"https://i.loli.net/2021/03/08/vIX8FhKtDNyrziq.png"} />
                        <Row justify={"center"} style={{ marginBottom: "15px" }}>
                          <Text b size={"large"} style={{ textAlign: "center" }}>This is where you can manage your
                            posts, but you haven't written anything yet.</Text>
                        </Row>
                        <Row justify={"center"}>
                          <Link href={"/new-post"}>
                            <Button type="success-light">
                              <Text b>
                                Write your first post now
                              </Text>
                            </Button>
                          </Link>
                        </Row>
                      </>
                      :
                      <>
                        <Table data={data}>
                          <Table.Column prop="id" label="id" />
                          <Table.Column prop="title" label="Post" />
                          <Table.Column prop="stats" label="" />
                          <Table.Column prop="editOperation" label="edit" />
                          <Table.Column prop="moreOperation" label="more" />
                        </Table>
                      </>
                    }
                  </Card>
                  </Col>
                </Grid>
            </Grid.Container>
          </Col>
        </Grid>
      </Grid.Container>
      <Footer />
    </>
  )
}
export default DashboardPage