import {
  AutoComplete,
  Button,
  Card,
  Col,
  Grid,
  Input,
  Loading,
  Page,
  Row,
  Spacer,
  Text,
  useToasts
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde.css";
import "react-mde/lib/styles/css/react-mde-toolbar.css";
import "react-mde/lib/styles/css/react-mde-editor.css";
import { useRouter } from "next/router";
import { SITE_NAME } from "lib/constants";
import Head from "next/head"


const NewPostPage = () => {
  const tagOptions = [
    { label: "London", value: "london" },
    { label: "Sydney", value: "sydney" },
    { label: "Shanghai", value: "shanghai" }
  ];
  const [title, setTitle] = React.useState('');
  const [coverImage, setCoverImage] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [imageIsLoading, setImageIsLoading] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");
  const [toasts, setToast] = useToasts();
  const router = useRouter();

  // const { visible, setVisible, bindings } = useModal()

  function inputValidate() {
    if (typeof (title) == "undefined" || !title || title.length === 0) {
      setToast({
        type: "warning",
        text: "Title cannot bt empty"
      });
      return false;
    }
    if (typeof (slug) == "undefined" || !slug || slug.length === 0) {
      setToast({
        type: "warning",
        text: "Slug cannot be empty"
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async (published, e) => {
    if (!inputValidate()) {
      return;
    }
    const url = "/api/posts";
    const data = {
      title: title,
      coverImage: coverImage,
      slug: slug,
      rawContent: value,
      published: published
    };
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok && res.status === 201) {
        setToast({
          type: "success",
          text: "Post sent successfully"
        });
        router.push("/dashboard");
      } else {
        setToast({
          type: "warning",
          text: "Failed to send comment."
        });
        console.log("failed to send comment: ", res.status);
      }
    }).catch(error => {
      console.log("error: ", error.message);
    });
  };

  function handleImageIconClick() {
    setImageIsLoading(true);
    fetch("https://source.unsplash.com/random/2100x900")
      .then((res) => {
        setCoverImage(res.url);
        setImageIsLoading(false);
      });
  }

  // const save = async function* (data) {
  //   // Promise that waits for "time" milliseconds
  //   const wait = function(time) {
  //     return new Promise((a, r) => {
  //       setTimeout(() => a(), time);
  //     });
  //   };
  //
  //   // Upload "data" to your server
  //   // Use XMLHttpRequest.send to send a FormData object containing
  //   // "data"
  //   // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest
  //
  //   await wait(2000);
  //   // yields the URL that should be inserted in the markdown
  //   yield "https://picsum.photos/300";
  //   await wait(2000);
  //
  //   // returns true meaning that the save was successful
  //   return true;
  // };

  return (
    <>
      <Head>
        <title>Write New Post - {SITE_NAME}</title>
      </Head>
      {/*<Header />*/}
      <Page.Body>
        <Grid.Container justify={"center"} style={{ marginTop: "-35px", paddingLeft: "3%", paddingRight: "3%" }}>
          <Grid xs={24} md={18} lg={16} xl={14}>
            <Col>
              <Row>
                <Input icon={<Icon.Type />} placeholder={"Title"} width="100%" size={"large"}
                       value={title} onChange={e => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
                }}>
                  <Text h2>Write a new post</Text>
                </Input>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Input icon={imageIsLoading ? <Loading /> : <Icon.Image />} placeholder={"Cover Image URL"} width="100%"
                       size={"large"}
                       value={coverImage} onChange={e => setCoverImage(e.target.value)}
                       iconClickable onIconClick={handleImageIconClick}>
                  {/*TODO: add loading*/}
                </Input>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Grid.Container gap={0.5}>
                  <Grid xs={24} lg={12}>
                    <Input width="100%" icon={<Icon.Paperclip />} placeholder={"Your Slug (e.g. hello-world)"}
                           value={slug} onChange={e => setSlug(e.target.value)}>
                    </Input>
                  </Grid>
                  <Grid xs={24} lg={12}>
                    <AutoComplete width="100%" placeholder={"Add Up To 4 Tags..."}
                                  options={tagOptions} />
                  </Grid>
                </Grid.Container>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Card style={{ width: "100%", height: "60vh" }}>
                  <div className="container" style={{ width: "108%", margin: "-22px" }}>
                    <ReactMde
                      value={value}
                      onChange={setValue}
                      selectedTab={selectedTab}
                      onTabChange={setSelectedTab}
                      generateMarkdownPreview={(markdown) =>
                        Promise.resolve(<ReactMarkdown source={markdown} />)
                      }
                      childProps={{
                        writeButton: {
                          tabIndex: -1
                        }
                      }}
                      // paste={{
                      //   saveImage: save
                      // }}
                    />
                  </div>
                </Card>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Grid.Container gap={0.5}>
                  <Grid xs={24} sm={12} md={6} lg={4}>
                    <Button auto type="success-light" style={{ width: "100%" }}
                            onClick={(e) => handleSubmit(true, e)}><Text b>publish</Text></Button>
                  </Grid>
                  <Grid xs={24} sm={12} md={6} lg={4}>
                    <Button auto style={{ width: "100%" }}
                            onClick={(e) => handleSubmit(false, e)}><Text b>Save Draft</Text></Button>
                  </Grid>
                </Grid.Container>
              </Row>
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
    </>
  )
}
export default NewPostPage