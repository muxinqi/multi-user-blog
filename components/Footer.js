import { Col, Divider, Link, Row, Spacer, Text } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import NextLink from "next/link";

const Footer = () => {
  const firstLine = [
    { name: "Home", href: "/" },
    { name: "Tag", href: "/tag" },
    { name: "Archive", href: "/archive" },
    { name: "FAQ", href: "/faq" },
    { name: "Donate", href: "/donate" },
    { name: "Sponsors", href: "/sponsors" },
  ];
  const secondLine = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of use", href: "/tos" },
    { name: "Code of Conduct", href: "/code-of-conduct" },
    { name: "Contact", href: "/contact" },
  ];
  const thirdLine = [
    { name: "Twitter", href: "/twitter", icon: <Icon.Twitter /> },
    { name: "Facebook", href: "/facebook", icon: <Icon.Facebook /> },
    { name: "GitHub", href: "/github", icon: <Icon.Github /> },
    { name: "Instagram", href: "/instagram", icon: <Icon.Instagram /> },
    { name: "Telegram", href: "/telegram", icon: <Icon.Send /> },
  ];
  return (
    <div>
      <Spacer y={0.5} />
      <Divider />
      <Spacer y={2} />
      <Row>
        <Col style={{ paddingLeft: "4%", paddingRight: "4%" }}>
          {/* First Line - Home, Archive, Tag, FAQ */}
          <Row justify={"center"}>
            {firstLine.map((e) => (
              <NextLink href={e.href} key={e}>
                <Link block style={{ color: "inherit" }}>
                  {e.name}
                </Link>
              </NextLink>
            ))}
          </Row>

          {/* Second Line - About, Privacy Policy, Terms of use, Contact */}
          <Row justify={"center"} style={{ marginTop: "25px" }}>
            {secondLine.map((e) => (
              <NextLink href={e.href} key={e}>
                <Link block style={{ color: "inherit" }}>
                  {e.name}
                </Link>
              </NextLink>
            ))}
          </Row>

          {/* Third Line - Twitter, Facebook, Github, Instagram, Telegram */}
          <Row justify={"center"} style={{ marginTop: "25px" }}>
            {thirdLine.map((e) => (
              <NextLink href={e.href} key={e}>
                <Link block style={{ color: "inherit", marginLeft: "3%" }}>
                  {e.icon}
                </Link>
              </NextLink>
            ))}
          </Row>
        </Col>
      </Row>
      <Spacer y={1} />
      <Divider style={{ width: "25%", margin: "auto" }} />
      <Spacer y={1} />
      <Row>
        <Col
          style={{
            width: "100%",
            paddingLeft: "6%",
            paddingRight: "6%",
            textAlign: "center",
          }}
        >
          <Row justify={"center"}>
            <Text p>
              <Text b>M Blog</Text> - A platform where you can host your daily
              life and inspiration. With fast global access, and a high SLA
              guarantee.
            </Text>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "100%", paddingLeft: "6%", paddingRight: "6%" }}>
          <Row justify={"center"}>
            <Text p>
              Made with <Icon.HeartFill color={"red"} size={20} /> and{" "}
              <Link href={"https://nextjs.org/?ref=muxinqi.com"}>
                <Text b>Next.JS</Text>
              </Link>
              . Blog Platform &copy; {new Date().getFullYear()}{" "}
            </Text>
          </Row>
        </Col>
      </Row>
      <Spacer y={2} />
    </div>
  );
};
export default Footer;
