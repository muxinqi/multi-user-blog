import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Col,
  Grid,
  Input,
  Page,
  Radio,
  Tabs,
  Text,
  useInput,
  useTabs,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import NextLink from "next/link";
import { useState } from "react";
import PostCard from "../components/PostCard";
import { useRouter } from "next/router";

const SearchPage = () => {
  const {
    state: keywords,
    setState: setKeywords,
    bindings: keywordsBindings,
  } = useInput("");
  const filterOptions = ["posts", "listings", "comments", "my-posts-only"];
  const sortOptions = [
    { label: "Most Relevant", value: "relevant" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];
  const [filter, setFilter] = useState(filterOptions[0]);
  const [sort, setSort] = useState("relevant");
  const changeSortHandler = async (val) => {
    setSort(val);
    await handleSearch(keywords, filter, val);
    console.log(val);
  };
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (k, f, s) => {
    const qKeywords = k || keywords;
    const qFilter = f || filter;
    const qSort = s || sort;
    const url = `/api/search?keywords=${qKeywords}&filter=${qFilter}&sort=${qSort}`;
    console.log(url);
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setSearchResults(data);
    } else {
      alert("search failed");
    }
  };
  const onKeyup = async (e) => {
    // when `ENTER` key was pressed
    if (e.keyCode === 13) {
      if (keywords) {
        await handleSearch();
      }
    }
  };
  const SortTab = () => {
    return (
      <Tabs hideDivider value={sort} onChange={changeSortHandler}>
        {sortOptions.map((sort) => (
          <Tabs.Item label={sort.label} value={sort.value} key={sort.value} />
        ))}
      </Tabs>
    );
  };
  return (
    <>
      <Header />
      <Page.Body>
        {/* Search Bar */}
        <Grid.Container
          justify={"center"}
          style={{
            paddingLeft: "2%",
            paddingRight: "2%",
            marginTop: "-35px",
            marginBottom: "15px",
          }}
        >
          <Grid xs={24} xl={15}>
            <Input
              clearable
              icon={<Icon.Search />}
              placeholder={"Search..."}
              {...keywordsBindings}
              onKeyUp={onKeyup}
              width="100%"
            />
          </Grid>
        </Grid.Container>

        {/* Title & Sort Tabs */}
        <Grid.Container
          justify={"center"}
          style={{ paddingLeft: "2%", paddingRight: "2%" }}
        >
          <Grid xs={24} sm={12} xl={4}>
            <Text h3>
              Search results{" "}
              {searchResults &&
                searchResults.length > 0 &&
                `(${searchResults.length})`}
            </Text>
          </Grid>
          <Grid xs={24} sm={12} xl={11} justify={"flex-end"}>
            <SortTab />
          </Grid>
        </Grid.Container>

        {/* Filters & Results Feed */}
        <Grid.Container
          justify={"center"}
          style={{ paddingLeft: "2%", paddingRight: "2%" }}
        >
          <Grid xs={24} md={7} xl={4}>
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
                  // other filter support
                  return (
                    <Radio
                      value={option}
                      key={option}
                      disabled={option !== "posts"}
                    >
                      {name}
                    </Radio>
                  );
                })}
            </Radio.Group>
          </Grid>
          <Grid xs={24} md={17} xl={11}>
            <Col>
              {searchResults &&
                searchResults.map((post) => (
                  <PostCard post={post} key={post.id} mark={keywords} />
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
