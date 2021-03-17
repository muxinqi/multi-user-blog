import useSession from 'next-auth/client';
import { Page, Input, Grid, Button, Col, Row, Spacer } from '@geist-ui/react';
import { useState } from 'react';
import { checkUsername } from 'lib/checkUsername';

const submit = () => {
  
}

const NewUserPage = () => {
  const [value, setValue] = useState()
  const handler = async e => {
    setValue(e.target.value)
    console.log(e.target.value)
    const res = await fetch(
      `/api/users/${e.target.value}?checkAvailable=true`, {
        method: 'GET',
    })
    const result = await res.json()
    console.log(result)
  }
  return (
    <Page.Body>
      <Grid.Container justify={"center"}>
        <Grid style={{ marginTop: "20vh" }}>
          <Col>
            <Row>
              <Input value={value} name="username" onChange={handler} placeholder="4-16 digits, including numbers or letters" style={{ width: "61.8vh" }} >
                Enter username:
              </Input>
            </Row>
            <Spacer y={0.618}/>
            <Row justify="center">
              <Button type="success-light">Confirm</Button>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    </Page.Body>
  )
}

export default NewUserPage