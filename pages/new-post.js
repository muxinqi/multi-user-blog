import Header from "components/Header";
import {AutoComplete, Button, Card, Col, Grid, Input, Page, Row, Spacer, Text} from "@geist-ui/react";
import * as Icon from '@geist-ui/react-icons'
import Editor from "rich-markdown-editor";
import ReactMde, {SuggestionsDropdownProps} from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as React from "react";

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Andre",
          value: "@andre"
        },
        {
          preview: "Angela",
          value: "@angela"
        },
        {
          preview: "David",
          value: "@david"
        },
        {
          preview: "Louise",
          value: "@louise"
        }
      ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const NewPostPage = () => {
  const tagOptions = [
    { label: 'London', value: 'london' },
    { label: 'Sydney', value: 'sydney' },
    { label: 'Shanghai', value: 'shanghai' },
  ]
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  return (
    <>
      {/*<Header />*/}
      <Page.Body>
        <Grid.Container justify={"center"} style={{ marginTop: '-35px', paddingLeft: '3%', paddingRight: '3%' }}>
          <Grid xs={24} md={14}>
            <Col>
              <Row>
                <Input icon={<Icon.Type />} placeholder={"Title"} width="100%" size={"large"}>
                  <Text h2>Write a new post</Text>
                </Input>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Grid.Container gap={0.5}>
                  <Grid xs={24} lg={12}>
                    <Input width="100%" icon={<Icon.Paperclip />} placeholder={"Your slug just like hello-world"}>
                    </Input>
                  </Grid>
                  <Grid xs={24} lg={12}>
                    <AutoComplete icon={<Icon.Hash />} width="100%" placeholder={"Add up to 4 tags..."} options={tagOptions}/>
                  </Grid>
                </Grid.Container>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Card style={{ width: '100%', height: '65vh' }}>
                  <div className="container" style={{ height: 'auto' }}>
                    <Editor
                      maxLength={100000}
                      scrollTo={true}
                      placeholder={"Write your post here..."}
                    />
                  </div>
                  {/*<div className="container">*/}
                  {/*  <ReactMde*/}
                  {/*    value={value}*/}
                  {/*    onChange={setValue}*/}
                  {/*    selectedTab={selectedTab}*/}
                  {/*    onTabChange={setSelectedTab}*/}
                  {/*    generateMarkdownPreview={markdown =>*/}
                  {/*      Promise.resolve(converter.makeHtml(markdown))*/}
                  {/*    }*/}
                  {/*    loadSuggestions={loadSuggestions}*/}
                  {/*    childProps={{*/}
                  {/*      writeButton: {*/}
                  {/*        tabIndex: -1*/}
                  {/*      }*/}
                  {/*    }}*/}
                  {/*  />*/}
                  {/*</div>*/}
                </Card>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Grid.Container gap={0.5}>
                  <Grid xs={24} sm={12} md={6} lg={4}>
                    <Button auto type="success-light" style={{ width: '100%' }}><Text b>publish</Text></Button>
                  </Grid>
                  <Grid xs={24} sm={12} md={6} lg={4}>
                    <Button auto style={{ width: '100%' }}><Text b>Save Draft</Text></Button>
                  </Grid>
                </Grid.Container>
              </Row>
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
      <Page.Footer>

      </Page.Footer>
    </>
  )
}
export default NewPostPage