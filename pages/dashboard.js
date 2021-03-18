import Header from "components/Header";
import Footer from "components/Footer";
import {Card, Col, Grid, Image, Row, Spacer, Table, Text, ButtonDropdown} from "@geist-ui/react";

const DashboardPage = () => {
  const data = [
    { id: '1', title: 'Content type', date: 2020, default: '-' },
    { id: '2', title: 'DOM element to use', date: 2020, default: '-' },
    { id: '3', title: 'Bold style', date: 2020, default: 'true' },
  ]
  return (
    <>
      <Header />
      <Spacer y={2} />
      <Grid.Container justify={"center"}>
        <Grid xs={24} xl={21}>
          <Col >
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
                  <Card shadow style={{ width: '100%' }} >
                    <Text size={30} b >0</Text>
                    <Text type="secondary">Total post reactions</Text>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card shadow style={{ width: '100%' }} >
                    <Text size={30} b>&lt; 500</Text>
                    <Text type="secondary">Total post views</Text>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card shadow style={{ width: '100%' }} >
                    <Text size={30} b>0</Text>
                    <Text type="secondary">Listings created</Text>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card shadow style={{ width: '100%' }} >
                    <Text size={30} b>0</Text>
                    <Text type="secondary">Total post reactions</Text>
                  </Card>
                </Grid>
                <Grid xs={0} md={7} lg={6} xl={5} style={{ marginTop: "15px" }}>
                  <Card shadow style={{ width: '100%', height: '400px' }} />
                </Grid>
                <Grid md={17} lg={18} xl={19} style={{ marginTop: "15px" }}>
                  <Col>
                    <Text h3 b> Posts </Text>
                    <Card shadow style={{ width: '100%' }} >
                      <Image src={"https://i.loli.net/2021/03/08/vIX8FhKtDNyrziq.png"} />
                      <Row justify={"center"}>
                        <Text b size={"large"}>This is where you can manage your posts, but you haven't written anything yet.</Text>
                      </Row>
                      <Text h1>test</Text>
                      <Table data={data}>
                        <Table.Column prop="id" label="id" />
                        <Table.Column prop="title" label="title" />
                        <Table.Column prop="date" label="date" />
                        <Table.Column prop="default" label="default" />
                      </Table>
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