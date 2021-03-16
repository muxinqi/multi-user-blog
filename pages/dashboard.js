import Header from "components/Header";
import Footer from "components/Footer";
import {Card, Col, Grid, Image, Row, Spacer, Table, Text} from "@geist-ui/react";

const DashboardPage = () => {
  const data = [
    { property: 'type', description: 'Content type', type: 'secondary | warning', default: '-' },
    { property: 'Component', description: 'DOM element to use', type: 'string', default: '-' },
    { property: 'bold', description: 'Bold style', type: 'boolean', default: 'true' },
  ]
  return (
    <>
      <Header isLoggedIn={true} />

      <Spacer y={2} />
        <Grid.Container justify={"center"}>
          <Grid lg={18}>
            <Col >
              <Row>
                <Text h2>Dashboard</Text>
              </Row>
              {/* Statistics Card */}
              <Row>
                <Grid.Container gap={1.5}>
                  <Grid lg={6}>
                    <Card shadow style={{ width: '100%' }} >
                      <Text size={30} b >0</Text>
                      <Text type="secondary">Total post reactions</Text>
                    </Card>
                  </Grid>
                  <Grid lg={6}>
                    <Card shadow style={{ width: '100%' }} >
                      <Text size={30} b>&lt; 500</Text>
                      <Text type="secondary">Total post views</Text>
                    </Card>
                  </Grid>
                  <Grid lg={6}>
                    <Card shadow style={{ width: '100%' }} >
                      <Text size={30} b>0</Text>
                      <Text type="secondary">Listings created</Text>
                    </Card>
                  </Grid>
                  <Grid lg={6}>
                    <Card shadow style={{ width: '100%' }} >
                      <Text size={30} b>0</Text>
                      <Text type="secondary">Total post reactions</Text>
                    </Card>
                  </Grid>
                </Grid.Container>
              </Row>
              <Row>
                <Spacer y={2} />
              </Row>
              <Row>
                <Grid.Container gap={2} justify={"center"}>
                  <Grid lg={5}>
                    <Card shadow style={{ width: '100%', height: '400px' }} />
                  </Grid>
                  <Grid lg={19}>
                    <Col>
                      <Row>
                        <Text h3 b> Posts </Text>
                      </Row>
                      <Row>
                        <Card shadow style={{ width: '100%' }} >
                          <Image src={"https://i.loli.net/2021/03/08/vIX8FhKtDNyrziq.png"} height={200} width={200}/>
                          <Row justify={"center"}>
                            <Text b size={"large"}>This is where you can manage your posts, but you haven't written anything yet.</Text>
                          </Row>
                          <Text h1>test</Text>
                          <Table data={data}>
                            <Table.Column prop="property" label="property" />
                            <Table.Column prop="description" label="description" />
                            <Table.Column prop="type" label="type" />
                            <Table.Column prop="default" label="default" />
                          </Table>
                        </Card>
                      </Row>
                    </Col>
                  </Grid>
                </Grid.Container>
              </Row>
            </Col>
          </Grid>
        </Grid.Container>
      <Footer />
    </>
  )
}
export default DashboardPage