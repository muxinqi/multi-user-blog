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
        <a href={`/api/auth/signout`}
           onClick={(e) => {
             e.preventDefault()
             signOut()
           }}
        > Logout </a>
      </Popover.Item>
    </>
  )
  return (
    <Page.Header>
      <Card shadow>
        <Grid.Container justify={"center"}>
          {/* More Option */}
          <Grid xs={3} md={0}>
            <Link href={"/"}>
              <Button size={isXS ? "small":"medium"} auto icon={<Icon.Menu />}/>
            </Link>
          </Grid>

          {/* Blog Logo */}
          <Grid xs={0} lg={2}>
            <Link href={"/"}>
              <Button auto type="secondary-light">
                <Text h3> Blog </Text>
              </Button>
            </Link>
          </Grid>

          {/* Search Bar */}
          <Grid xs={0} lg={6}>
            <Input placeholder="Search" width="100%"/>
          </Grid>

          {/* Blank Bar */}
          <Grid xs={6} lg={6}/>


          {!session && <>
            {/* Login Button */}
            <Grid xs={0} lg={2}>
              <Link href={"/enter"}>
                <Button size={isXS ? "small":"medium"} auto onClick={() => signIn()}>
                  <Text b> Log in </Text>
                </Button>
              </Link>
            </Grid>

            {/* Search Button */}
            <Grid xs={5} lg={0}>
              <Button size={isXS ? "small":"medium"} auto icon={<Icon.Search />}/>
            </Grid>

            {/* Sign Up Button */}
            <Grid xs={10} lg={3}>
              <Link href={"/enter?state=new-user"}>
                <Button size={isXS ? "small":"medium"} auto type="success-light">
                  <Text b> Create account </Text>
                </Button>
              </Link>
            </Grid>
          </>}
          {session && <>
            {/* Write post  button */}
            <Grid lg={3}>
              <Link href={"/new-post"}>
                <Button auto type="success-light">
                  <Text b> Write a post </Text>
                </Button>
              </Link>
            </Grid>

            {/* Avatar Popover */}
            <Grid lg={2}>
              <Spacer x={0.5} />
              <Popover content={content} visible={visible}
                       trigger={"hover"} placement={"bottomEnd"}
                       onVisibleChange={changeHandler}>
                <Avatar size={42} src={avatarUrl} />
              </Popover>
            </Grid>
          </>}

        </Grid.Container>
      </Card>
    </Page.Header>
  )
}

export default Header