import {
  Button,
  Code,
  Divider,
  Link,
  Row,
  Spacer,
  Text,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";

const GoSignInHint = ({ isLoggingIn }) => {
  const loggingInBool = isLoggingIn === true;
  if (loggingInBool) {
    return (
      <Row justify={"center"}>
        <Text small type="secondary">
          Have a password? Continue with your email address
        </Text>
      </Row>
    );
  } else {
    return (
      <Row justify={"center"}>
        <Text small type="secondary">
          Already have an account?{" "}
          <Link color href={"/enter"}>
            View more sign in options.
          </Link>
        </Text>
      </Row>
    );
  }
};

const ThirdPartyAuth = ({ isLoggingIn }) => {
  const API_BASE_URL = "http://lcoalhost:8080";
  const OAUTH2_REDIRECT_URI = `${process.env.BASE_URL}/oauth2/redirect`;
  const GITHUB_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorize/github?redirect_uri=" +
    OAUTH2_REDIRECT_URI;

  const loggingInBool = isLoggingIn === true;
  let buttonText;
  if (loggingInBool) {
    buttonText = "Continue";
  } else {
    buttonText = "Sign up";
  }

  return (
    <>
      <Row justify={"center"}>
        <Text h2> Welcome to Blog Platform </Text>
      </Row>
      <Row justify={"center"}>
        <Text p>
          There are <Code>huge number</Code> posts on our platform.
        </Text>
      </Row>
      <a href={GITHUB_AUTH_URL}>
        <Button
          auto
          type="secondary-light"
          icon={<Icon.Github />}
          style={{ width: "100%" }}
        >
          <Text b> {buttonText} with Github </Text>
        </Button>
      </a>
      <Spacer y={0.5} />
      <Button
        auto
        type="success-light"
        icon={<Icon.Send />}
        style={{ width: "100%" }}
      >
        <Text b> {buttonText} with Telegram </Text>
      </Button>
      <Divider />
      <GoSignInHint isLoggingIn={loggingInBool} />
    </>
  );
};
export default ThirdPartyAuth;
