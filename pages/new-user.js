import { Button, Col, Grid, Input, Page, Row, Spacer, useToasts } from "@geist-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

function NewUserPage() {
  const router = useRouter()
  const [value, setValue] = useState()
  const [, setToast] = useToasts()
  async function handleClick() {
    // username is empty
    if (!value || value.length === 0) {
      setToast({
        text: 'username can not be empty!',
        type: 'warning'
      })
      return
    }
    const res = await fetch(`/api/users/${value}`, {
      method: 'PATCH'
    })
    const data = await res.json()
    console.log(JSON.stringify(data))
    if (data.username === value) {
      router.push('/dashboard')
    }
  }

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
              <Button type="success-light" onClick={handleClick}>Confirm</Button>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>
    </Page.Body>
  )
}

export default NewUserPage