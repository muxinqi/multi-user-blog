import {
  Avatar,
  Button,
  Card,
  Grid,
  Input,
  Link,
  Loading,
  Page,
  Popover,
  Spacer,
  Text,
  useMediaQuery,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import NextLink from "next/link";

const hash = (s) => {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

const Header = () => {
  const isMobile = !useMediaQuery("md", { match: "up" });
  return <>{isMobile ? <Mobile /> : <PC />}</>;
};

// Header for Large Screen (width >= 768)
const PC = () => {
  const [session, loading] = useSession();
  return (
    <Page.Header>
      <Card shadow style={{ width: "100%" }}>
        <Grid.Container justify={"center"}>
          <Grid md={14} xl={14}>
            {/* Blog Logo */}
            <NextLink href={"/"}>
              <Button auto type="secondary-light">
                <Text h3> Blog </Text>
              </Button>
            </NextLink>

            <Spacer x={0.5} />

            {/* Search Bar */}
            <div style={{ width: "450px", maxWidth: "100%" }}>
              <Input placeholder="Search" width="100%" />
            </div>
          </Grid>

          <Grid md={10} xl={7} justify={"flex-end"}>
            {session ? (
              // logged in
              <>
                <NextLink href={"/new-post"}>
                  <Button size={"medium"} auto type="success-light">
                    <Text b> Write a post </Text>
                  </Button>
                </NextLink>

                <Spacer x={0.5} />

                {/* Avatar Popover */}
                <AvatarPopover />
              </>
            ) : (
              // guest
              <>
                {/* Login Button */}
                <Button size={"medium"} auto onClick={() => signIn()}>
                  <Text b> Log in </Text>
                </Button>

                <Spacer x={0.5} />

                {/* Create Account Button */}
                <Button
                  size={"medium"}
                  auto
                  type="success-light"
                  onClick={() => signIn()}
                >
                  <Text b> Create account </Text>
                </Button>
              </>
            )}
          </Grid>
        </Grid.Container>
      </Card>
    </Page.Header>
  );
};

// Header for Mobile Screen (width < 768)
const Mobile = () => {
  const [session, loading] = useSession();
  return (
    <Page.Header>
      <Card shadow style={{ width: "100%" }}>
        <Grid.Container
          style={{
            marginTop: "-15px",
            marginBottom: "-15px",
          }}
        >
          {/* Left Side */}
          <Grid xs={10} md={10}>
            {/* More Option Button */}
            <NextLink href={"/"}>
              <Button size={"small"} auto icon={<Icon.Menu />} />
            </NextLink>

            <Spacer x={0.5} />

            {/* Home Button */}
            <NextLink href={"/"}>
              <Button
                auto
                size={"small"}
                icon={<Icon.Home />}
                type="secondary-light"
              />
            </NextLink>
          </Grid>

          {/* Right Side */}
          <Grid xs={14} md={14} justify={"flex-end"}>
            {session ? (
              // logged in
              <>
                {/* Search Button */}
                <Button size={"small"} auto icon={<Icon.Search />} />

                <Spacer x={0.5} />

                {/* Write post  button */}
                <NextLink href={"/new-post"}>
                  <Button size={"small"} auto type="success-light">
                    <Text b> Write a post </Text>
                  </Button>
                </NextLink>

                <Spacer x={0.5} />

                {/* Avatar Popover */}
                <AvatarPopover />
              </>
            ) : (
              // guest
              <>
                {/* Search Button */}
                <Button size={"small"} auto icon={<Icon.Search />} />

                <Spacer x={0.5} />

                {/* Create Account Button */}
                <Button
                  size={"small"}
                  auto
                  type="success-light"
                  onClick={() => signIn()}
                >
                  <Text b> Create account </Text>
                </Button>
              </>
            )}
          </Grid>
        </Grid.Container>
      </Card>
    </Page.Header>
  );
};

const MyAvatar = () => {
  const [session, loading] = useSession();
  const isMobile = !useMediaQuery("md", { match: "up" });
  const size = isMobile ? 32 : 40;
  if (loading) return <Loading />;
  return (
    <Avatar
      size={size}
      src={
        session.user.image
          ? session.user.image
          : "https://www.gravatar.com/avatar/" + hash(session.user.email + "")
      }
    />
  );
};

const AvatarPopover = () => {
  const [session, loading] = useSession();
  const [visible, setVisible] = useState(false);
  const changeHandler = (next) => {
    setVisible(next);
  };
  const content = () => (
    <>
      <Popover.Item title>
        <span>{session.user.name}</span>
      </Popover.Item>
      <Popover.Item>
        <NextLink href={"/dashboard"}>
          <Link> Dashboard </Link>
        </NextLink>
      </Popover.Item>
      <Popover.Item>
        <NextLink href={"/new-post"}>
          <Link style={{ whiteSpace: "nowrap" }}> Write a post </Link>
        </NextLink>
      </Popover.Item>
      <Popover.Item>
        <NextLink href={"/settings"}>
          <Link> Settings </Link>
        </NextLink>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <a
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          {" "}
          Logout{" "}
        </a>
      </Popover.Item>
    </>
  );
  return (
    <>
      <Popover
        content={content}
        visible={visible}
        trigger={"hover"}
        placement={"bottomEnd"}
        onVisibleChange={changeHandler}
      >
        <MyAvatar />
      </Popover>
    </>
  );
};

export default Header;
