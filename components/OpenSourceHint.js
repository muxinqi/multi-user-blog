import {Col, Row, Text} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";

const OpenSourceHint = () => {
  return (
    <>
      <Col style={{ paddingLeft: '6%', paddingRight: '6%' }}>
        <Row justify={"center"}>
          <Text>Open Source <Icon.HeartFill color="red"/> Free Forever</Text>
        </Row>
        <Row justify={"center"} >
          <Text>{`We strive for transparency and don't collect excess data.`}</Text>
        </Row>
      </Col>
    </>
  )
}
export default OpenSourceHint