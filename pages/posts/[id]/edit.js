import {
  AutoComplete,
  Button,
  Card,
  Col,
  Grid,
  Input,
  Loading,
  Page,
  Popover,
  Link,
  Tag,
  Row,
  Spacer,
  Text,
  useToasts,
} from "@geist-ui/react";
import React from "react";
import { useRouter } from "next/router";
import * as Icon from "@geist-ui/react-icons";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde.css";
import "react-mde/lib/styles/css/react-mde-toolbar.css";
import "react-mde/lib/styles/css/react-mde-editor.css";
import Head from "next/head";
import { SITE_NAME } from "lib/constants";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${params.id}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      postId: params.id,
    },
  };
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const EditPostPage = ({ data, postId }) => {
  const tagOptions = [
    { label: "London", value: "london" },
    { label: "Sydney", value: "sydney" },
    { label: "Shanghai", value: "shanghai" },
  ];
  const [title, setTitle] = React.useState(data.title);
  const [coverImage, setCoverImage] = React.useState(data.coverImage);
  const [slug, setSlug] = React.useState(data.slug);
  const [imageIsLoading, setImageIsLoading] = React.useState(false);
  const [tags, setTags] = React.useState(data.tags);
  const [tagInputValue, setTagInputValue] = React.useState();
  const [value, setValue] = React.useState(data.rawContent);
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [toasts, setToast] = useToasts();
  const router = useRouter();

  // const { visible, setVisible, bindings } = useModal()

  const onTagInputKeyup = (e) => {
    if (e.keyCode === KeyCodes.comma || e.keyCode === KeyCodes.enter) {
      // tag length cannot be empty
      if (!tagInputValue) {
        setToast({
          type: "warning",
          text: "⚠️ Please input tag name",
        });
        return;
      }
      if (tags.some((e) => e.name === tagInputValue)) {
        setToast({
          type: "warning",
          text: "⚠️ Please enter a different label",
        });
        return;
      }
      tags.push({ name: tagInputValue });
      setTagInputValue("");
      // setTagOptions([]);
      setToast({
        type: "success",
        text: (
          <div>
            ✅ Add tag <b>`{tagInputValue}`</b> successful
          </div>
        ),
      });
    }
  };

  const tagInputValueChangeHandler = (e) => setTagInputValue(e);

  const handleDeleteTag = (tagName) => {
    // delete tag by tagName
    const newTags = tags.filter((value) => {
      return value.name !== tagName;
    });
    setTags(newTags);
  };

  function inputValidate() {
    if (typeof title == "undefined" || !title || title.length === 0) {
      setToast({
        type: "warning",
        text: "Title cannot bt empty",
      });
      return false;
    }
    if (typeof slug == "undefined" || !slug || slug.length === 0) {
      setToast({
        type: "warning",
        text: "Slug cannot be empty",
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async (published, e) => {
    if (!inputValidate()) {
      return;
    }
    const url = `/api/posts/${postId}`;
    const data = {
      title: title,
      coverImage: coverImage,
      slug: slug,
      rawContent: value,
      tags: tags,
      published: published,
    };
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok && res.status === 200) {
          setToast({
            type: "success",
            text: "Post sent successfully",
          });
          router.push("/dashboard");
        } else {
          setToast({
            type: "warning",
            text: "Failed to send post.",
          });
          console.log("failed to send post: ", res.status);
        }
      })
      .catch((error) => {
        console.log("error: ", error.message);
      });
  };

  function handleImageIconClick() {
    setImageIsLoading(true);
    fetch("https://source.unsplash.com/random/2100x900").then((res) => {
      if (res.ok) {
        setCoverImage(res.url);
        setImageIsLoading(false);
        setToast({
          type: "success",
          text: "✅ Randomly get pictures successfully",
        });
      }
    });
  }

  const save = async function* (data) {
    // Promise that waits for "time" milliseconds
    const wait = function (time) {
      return new Promise((a, r) => {
        setTimeout(() => a(), time);
      });
    };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);
    // yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300";
    await wait(2000);

    // returns true meaning that the save was successful
    return true;
  };

  return (
    <>
      <Head>
        <title>Edit Post - {SITE_NAME}</title>
      </Head>
      {/*<Header />*/}
      <Page.Body>
        <Grid.Container
          justify={"center"}
          style={{ marginTop: "-35px", paddingLeft: "3%", paddingRight: "3%" }}
        >
          <Grid xs={24} md={18} lg={16} xl={14}>
            <Col>
              <Row>
                <Input
                  icon={<Icon.Type />}
                  placeholder={"Title"}
                  width="100%"
                  size={"large"}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
                  }}
                >
                  <Text h2>Write a new post</Text>
                </Input>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Input
                  icon={imageIsLoading ? <Loading /> : <Icon.Image />}
                  placeholder={"Cover Image URL"}
                  width="100%"
                  size={"large"}
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  iconClickable
                  onIconClick={handleImageIconClick}
                >
                  {/*TODO: add loading*/}
                </Input>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Grid.Container gap={0.5}>
                  <Grid xs={24}>
                    {tags &&
                      tags.map((tag) => (
                        <Popover
                          key={tag.name}
                          content={
                            <Button
                              auto
                              type={"error"}
                              ghost
                              iconRight={<Icon.Delete />}
                              onClick={() => handleDeleteTag(tag.name)}
                            >
                              delete
                            </Button>
                          }
                        >
                          <Link
                            block
                            onClick={(e) => e.preventDefault()}
                            style={{ paddingLeft: "3px", paddingRight: "3px" }}
                          >
                            <Tag>#{tag.name}</Tag>
                          </Link>
                        </Popover>
                      ))}
                  </Grid>
                  <Grid xs={24} lg={12}>
                    <Input
                      width="100%"
                      icon={<Icon.Paperclip />}
                      placeholder={"Your Slug (e.g. hello-world)"}
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={24} lg={12}>
                    {/* Post Tag Input Bar */}
                    <AutoComplete
                      icon={<Icon.Hash />}
                      width="100%"
                      placeholder={"Add Up To 4 Tags..."}
                      value={tagInputValue}
                      onChange={tagInputValueChangeHandler}
                      // options={tagOptions}
                      clearable
                      // disableFreeSolo
                      disabled={tags && tags.length >= 4}
                      onKeyUp={onTagInputKeyup}
                      // onSearch={tagSearchHandler}
                      labelRight={tags && tags.length + " / 4"}
                    />
                  </Grid>
                </Grid.Container>
              </Row>
              <Row>
                <Spacer y={0.5} />
              </Row>
              <Row>
                <Card style={{ width: "100%", height: "60vh" }}>
                  <div
                    className="container"
                    style={{ width: "108%", margin: "-22px" }}
                  >
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
                          tabIndex: -1,
                        },
                      }}
                      paste={{
                        saveImage: save,
                      }}
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
                    <Button
                      auto
                      type="success-light"
                      style={{ width: "100%" }}
                      onClick={(e) => handleSubmit(true, e)}
                    >
                      <Text b>update</Text>
                    </Button>
                  </Grid>
                  <Grid xs={24} sm={12} md={6} lg={4}>
                    <Button
                      auto
                      style={{ width: "100%" }}
                      onClick={(e) => handleSubmit(false, e)}
                    >
                      <Text b>Save Draft</Text>
                    </Button>
                  </Grid>
                </Grid.Container>
              </Row>
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
    </>
  );
};
export default EditPostPage;
