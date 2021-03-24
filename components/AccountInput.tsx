import {Button, Card, Code, Divider, Input, Link, Row, Spacer, Text} from "@geist-ui/react";

const AccountInput = ({ isLoggingIn }) => {
  const loggingInBool = isLoggingIn === true
  if (loggingInBool) {
    return(
      <>
        <Input width="100%">Email</Input>
        <Spacer y={.5}/>
        <Input.Password width="100%">Password</Input.Password>
        <Spacer y={1.5}/>
        <Button auto type="success-light" style={{width: '100%'}}><Text b>Continue</Text></Button>
        <Spacer y={1.5}/>
        <Row justify={"center"}>
          <Link color href={"/users/password/new"}><Text small>I forgot my password</Text></Link>
        </Row>
      </>
    )
  } else {
    return (
      <></>
    )
  }

}
export default AccountInput