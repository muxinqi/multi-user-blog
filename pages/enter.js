import { Card, Col, Grid, Page, Spacer } from "@geist-ui/react";
import { useRouter } from "next/router";
import Header from "components/Header";
import ThirdPartyAuth from "components/ThirdPartyAuth";
import AccountInput from "components/AccountInput";
import OpenSourceHint from "components/OpenSourceHint";
import Footer from "components/Footer";

function LoginPage() {
  const router = useRouter();
  const query = router.query;
  const isSigningUp = query["state"] === "new-user";
  const isLoggingIn = !isSigningUp;
  return (
    <>
      <Header />
      <Page.Body>
        <Grid.Container gap={0.618} justify="center">
          <Grid xs={24} sm={18} md={16} lg={10} xl={8}>
            {/* Middle Content Feed */}
            <Col>
              <Card shadow>
                <ThirdPartyAuth isLoggingIn={isLoggingIn} />
                <Spacer y={0.5} />
                <AccountInput isLoggingIn={isLoggingIn} />
              </Card>
              <OpenSourceHint />
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
      <Footer />
    </>
  );
}

export default LoginPage;
