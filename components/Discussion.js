import {Avatar, Button, Card, Col, Grid, Link, Row, Spacer, Text, Textarea, useInput, useToasts} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import React, { useState } from "react";
import { useSession } from "next-auth/client"

const Discussion = () => {
  const [ session ] = useSession()
  const [ btnDisable, setBtnDisable ] = useState(true)
  const [ showSubmitBtn, setShowSubmitBtn ] = useState(false)
  const { state, setState, bindings } = useInput()
  const [, setToast] = useToasts()

  const handleSubmit = () => {
    setToast({
      type: "default",
      text: state
    })
  }

  const SubmitBtn = () => (
    <Row style={{ marginTop: "15px" }}>
      <Button auto type="success" onClick={handleSubmit} disabled={btnDisable}> Submit </Button>
      <Spacer y={0.5} />
      <Button auto type="secondary" ghost disabled={btnDisable}> Preview </Button>
    </Row>
  )

  const handleInputChange = e => {
    setState(e.target.value)
    if ( e.target.value.length > 0 ) {
      // display submit button
      setBtnDisable(false)
    } else {
      setBtnDisable(true)
    }
  }

  return (
    <>
      <Grid.Container>
        <Grid xs={24} style={{ marginBottom: "15px" }}>
          <Text b size="1.8rem">Discussion (3)</Text>
        </Grid>
        <Grid xs={3}>
          {!session && <Avatar text="You" size="medium"/>}
          {session && <Avatar src={session.user.image} size="medium"/>}
        </Grid>
        <Grid xs={21}>
          <Col>
            <Row>
              <Textarea width="100%"  {...bindings} onChange={handleInputChange} placeholder="Add to the discussion"
                        onFocus={() => setShowSubmitBtn(true)} />
            </Row>
            { showSubmitBtn ? <SubmitBtn /> : null }
          </Col>
        </Grid>
        <Grid xs={3} style={{ marginTop: "25px" }}>
          <Avatar src={"https://i.loli.net/2021/03/07/uAfLay5rhPlskK9.png"} size="medium" />
        </Grid>
        <Grid xs={21} style={{ marginTop: "25px" }}>
          <Card style={{ width: "100%" }} >
            <Row>
              <Link href={"/muxinqi"}><Text small b type="secondary">jamesfranklin-max</Text></Link>
              <Spacer x={0.5} />
              <Link href={"/muxinqi"}><Text small type="secondary">{new Date().toDateString()}</Text></Link>
              <Button auto size="small" icon={<Icon.MoreHorizontal />} style={{ position: "absolute", right: "0px" }} />
            </Row>
            <div>
              <Text p>
                Yesterday was stuck with back tracking question, this really helped a lot.
                Since having a step by step approach helps in breaking down the problem statement in smaller unit, solving becomes easier.
              </Text>
              <Text p/>
              <Text p>
                Thanks, This will definitely help the community.
              </Text>
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  )
}
export default Discussion