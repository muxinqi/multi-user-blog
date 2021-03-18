import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Input,
  Link,
  Page,
  Popover,
  Spacer,
  Text,
  useMediaQuery
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons"
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client"

const Header = () => {
  const [ session, loading ] = useSession()
  const avatarUrl = "https://secure.gravatar.com/avatar/5ffb7ee3f383639957f01622f391815d"
  const [visible, setVisible] = useState(false)
  const changeHandler = (next) => {
    setVisible(next)
  }
  const isXS = useMediaQuery('xs')
  const content = () => (
    <>
      <Popover.Item title>
        <span>{session.user.name}</span>
      </Popover.Item>
      <Popover.Item>
        <Link href={"/dashboard"}> Dashboard </Link>
      </Popover.Item>
      <Popover.Item>
        <Link href={"/new-post"}> Write a post </Link>
      </Popover.Item>
      <Popover.Item>
        <Link href={"/settings"}> Settings </Link>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <a onClick={(e) => {
             e.preventDefault()
             signOut({
               callbackUrl: process.env.BASE_URL
             })
           }}
        > Logout </a>
      </Popover.Item>
    </>
  )
  return (
    <Page.Header>
      <Card shadow style={{ width: "100%" }}>
        <Grid.Container justify={"center"} >
          {/* More Option */}
          <Grid xs={4} sm={0}>
            <Link href={"/"}>
              <Button size={isXS ? "small":"medium"} auto icon={<Icon.Menu />}/>
            </Link>
          </Grid>

          {/* Blog Logo */}
          <Grid xs={0} sm={4} md={3.5} lg={3}>
            <Link href={"/"}>
              <Button auto type="secondary-light">
                <Text h3> Blog </Text>
              </Button>
            </Link>
          </Grid>

          {/* Search Bar */}
          <Grid xs={0} sm={7} md={8} lg={9} xl={8}>
            <Input placeholder="Search" width="100%"/>
          </Grid>

          {/* Blank Bar */}
          <Grid xs={6.5} sm={4} md={5} lg={5} xl={4} />


          {!session && <>
            {/* Login Button */}
            <Grid xs={0} sm={3.5} md={3} lg={3} xl={2}>
                <Button size={isXS ? "small":"medium"} auto onClick={() => signIn()}>
                  <Text b> Log in </Text>
                </Button>
            </Grid>

            {/* Search Button */}
            <Grid xs={4} sm={0} lg={0}>
              <Button size={isXS ? "small":"medium"} auto icon={<Icon.Search />}/>
            </Grid>

            {/* Sign Up Button */}
            <Grid xs={9.5} sm={5.5} md={4.5} lg={4} xl={3}>
              <Link href={"/enter?state=new-user"}>
                <Button size={isXS ? "small":"medium"} auto type="success-light">
                  <Text b> Create account </Text>
                </Button>
              </Link>
            </Grid>
          </>}
          {session && <>
            {/* Write post  button */}
            <Grid xs={10} md={4.5} lg={3.5} xl={2.5}>
              <Link href={"/new-post"}>
                <Button size={isXS ? "small":"medium"} auto type="success-light">
                  <Text b> Write a post </Text>
                </Button>
              </Link>
            </Grid>

            {/* Avatar Popover */}
            <Grid xs={3.5} md={3} lg={3.5} xl={1}>
              <Spacer x={0.5} />
              <Popover content={content} visible={visible}
                       trigger={"hover"} placement={"bottomEnd"}
                       onVisibleChange={changeHandler}>
                <Avatar size={isXS ? 36 : 42 } src={session.user.image || avatarUrl} />
              </Popover>
            </Grid>
          </>}

        </Grid.Container>
      </Card>
    </Page.Header>
  )
}

export default Header