import {Card, Col, Divider, Grid, Link, Page, Row, Spacer, Text} from "@geist-ui/react";
import * as Icon from '@geist-ui/react-icons';

const Footer = () => {
  return (
    <div>
      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />
      <Row>
        <Col style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          {/* First Line - Home, Archive, Tag, FAQ */}
          <Grid.Container gap={.5} justify="center">
            <Grid xs={5} sm={3} md={2} lg={1.5}>
              <Link href={"/"}>
                <Text>Home</Text>
              </Link>
            </Grid>
            <Grid xs={5} sm={3} md={2} lg={1.5}>
              <Link href={"/archive"}>
                <Text>Archive</Text>
              </Link>
            </Grid>
            <Grid xs={4} sm={2.5} md={2} lg={1}>
              <Link href={"/tag"}>
                <Text>Tag</Text>
              </Link>
            </Grid>
            <Grid xs={4} sm={2.5} md={2} lg={1}>
              <Link href={"/faq"}>
                <Text>FAQ</Text>
              </Link>
            </Grid>
            <Grid xs={8} sm={4} md={3} lg={2}>
              <Link href={"/zen-of-code"}>
                <Text>Zen of Code</Text>
              </Link>
            </Grid>
            <Grid xs={6} sm={3} md={2} lg={1.3}>
              <Link href={"/donate"}>
                <Text>Donate</Text>
              </Link>
            </Grid>
            <Grid xs={6} sm={3} md={2} lg={1.5}>
              <Link href={"/sponsors"}>
                <Text>Sponsors</Text>
              </Link>
            </Grid>
          </Grid.Container>

          {/* Second Line - About, Privacy Policy, Terms of use, Contact */}
          <Grid.Container gap={.5} justify="center" >
            <Grid xs={8} sm={4.5} md={3} lg={2.5}>
              <Link href={"/privacy"}>
                <Text>Privacy Policy</Text>
              </Link>
            </Grid>
            <Grid xs={8} sm={4.5} md={3} lg={2.5}>
              <Link href={"/tos"}>
                <Text>Terms of use</Text>
              </Link>
            </Grid>
            <Grid xs={4} sm={3} md={2} lg={1.5}>
              <Link href={"/contact"}>
                <Text>Contact</Text>
              </Link>
            </Grid>
          </Grid.Container>

          <Spacer y={0.5} />

          {/* Third Line - Twitter, Facebook, Github, Instagram, Telegram */}
          <Grid.Container gap={.5} justify="center" >
            <Grid xs={3.5} sm={3} md={2} lg={1}>
              <Link href={"/twitter"}>
                <Icon.Twitter />
              </Link>
            </Grid>
            <Grid xs={3.5} sm={3} md={2} lg={1}>
              <Link href={"/facebook"}>
                <Icon.Facebook />
              </Link>
            </Grid>
            <Grid xs={3.5} sm={3} md={2} lg={1}>
              <Link href={"/github"}>
                <Icon.Github />
              </Link>
            </Grid>
            <Grid xs={3.5} sm={3} md={2} lg={1}>
              <Link href={"/instagram"}>
                <Icon.Instagram />
              </Link>
            </Grid>
            <Grid xs={3.5} sm={3} md={2} lg={1}>
              <Link href={"/telegram"}>
                <Icon.Send />
              </Link>
            </Grid>
          </Grid.Container>
        </Col>
      </Row>
      <Spacer y={1} />
      <Divider style={{ width: '20%', margin: 'auto' }} />
      <Spacer y={1} />
      <Row>
        <Col style={{ width: '100%', paddingLeft: '6%', paddingRight: '6%' }}>
          <Row justify={"center"}>
            <Text p><Text b>M Blog</Text> - A platform where you can host your daily life and inspiration. With fast global access and a high SLA guarantee.</Text>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: '100%', paddingLeft: '6%', paddingRight: '6%' }}>
          <Row justify={"center"}>
            <Text p>Made with love and <Link href={"https://nextjs.org/?ref=muxinqi.com"}><Text b>Next.JS</Text></Link>. Blog Platform &copy; {new Date().getFullYear()} </Text>
          </Row>
        </Col>
      </Row>
      <Spacer y={2} />
    </div>
  )
}
export default Footer