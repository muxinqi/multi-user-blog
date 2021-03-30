import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Col,
  Divider,
  Grid,
  Input,
  Page,
  Radio,
  Row,
  Spacer,
  Tabs,
  Text,
  useInput,
  useMediaQuery,
  useTabs,
} from "@geist-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import PostCard from "../components/PostCard";

const SearchPage = () => {
  const isMobile = !useMediaQuery("md", { match: "up" });
  const {
    state: keywords,
    setState: setKeywords,
    bindings: keywordsBindings,
  } = useInput("");
  const filterOptions = ["posts", "listings", "comments", "my-posts-only"];
  const [filter, setFilter] = useState(filterOptions[0]);
  const { state: sort, setState: setSort, bindings: sortBindings } = useTabs(
    "relevant"
  );
  const [searchResults, setSearchResults] = useState(null);
  const onKeyup = async (e) => {
    if (e.keyCode === 13) {
      const url = `/api/search?keywords=${keywords}&filter=${filter}&sort=${sort}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);
      } else {
        alert("search failed");
      }
    }
  };
  const SortTab = () => {
    return (
      <Tabs hideDivider {...sortBindings}>
        <Tabs.Item label="Most Relevant" value="relevant" />
        <Tabs.Item label="Newest" value="newest" />
        <Tabs.Item label="Oldest" value="oldest" />
      </Tabs>
    );
  };
  return (
    <>
      <Header />
      <Page.Body style={{ marginTop: "-25px" }}>
        <Grid.Container
          justify={"center"}
          style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
        >
          {isMobile && (
            <Grid xs={24}>
              <Input
                placeholder={"Search..."}
                width="100%"
                {...keywordsBindings}
                onKeyUp={onKeyup}
              />
            </Grid>
          )}
          <Grid xs={24} md={7} xl={4} style={{ marginTop: "15px" }}>
            <Col>
              {!isMobile && searchResults && (
                <Text h3>Search results ({searchResults.length})</Text>
              )}
              {isMobile && <SortTab />}
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <Radio.Group
                  value={filter}
                  onChange={(val) => setFilter(val)}
                  style={{ marginTop: "10px" }}
                >
                  {filterOptions &&
                    filterOptions.map((option) => {
                      const name = option
                        .replace(/-/g, " ")
                        .replace(/^\S/, (s) => s.toUpperCase());
                      return (
                        <Radio value={option} key={option}>
                          {name}
                        </Radio>
                      );
                    })}
                </Radio.Group>
              </div>
              {isMobile && searchResults && (
                <Divider x={5} y={3}>
                  <Text>Search results ({searchResults.length})</Text>
                </Divider>
              )}
            </Col>
          </Grid>
          <Grid xs={24} md={17} xl={11}>
            <Col>
              <Row justify={"end"}>{!isMobile && <SortTab />}</Row>
              {searchResults &&
                searchResults.map((post) => (
                  <PostCard post={post} key={post.id} />
                ))}
            </Col>
          </Grid>
        </Grid.Container>
      </Page.Body>
      <Footer />
    </>
  );
};

export default SearchPage;
