import Head from "next/head";
import { PostWidget, Categories, PostCard } from "../components";
import { getPost2,getSearchResult,getPosts } from "../services";
import { FeaturedPosts } from "../sections";
import {useState,useEffect,useRef} from 'react'
import _ from 'lodash'
import { Feed } from "feed";
import fs from "fs";

export default function Home({posts}) {
  const [seachedPosts, setSeachedPosts] = useState([])
  const [skip, setSkip] = useState(0)
  const searchInputRef = useRef()

  
  useEffect(() => {
    setSeachedPosts(posts)
    }, [])
  // console.log(seachedPosts)
    
  const handleSearch = (e) => {
    const searchString = searchInputRef.current.value
    // console.log(searchString)
    getSearchResult(searchString,0).then(
      (result)=>(setSeachedPosts(result))
    )
    setSkip(0)
  }

  const handleNextButton = (e) => {
    const newSkip = skip + 6
    setSkip(newSkip)
    // console.log(skip)
    // console.log(newSkip)
    const searchString = searchInputRef.current.value
    // console.log(searchString)
    getSearchResult(searchString,newSkip).then(
      (result)=>(setSeachedPosts(result))
    )
  }

  const handlePreviousButton = (e) => {
    const newSkip = Math.max(0,skip - 6)
    setSkip(newSkip)
    // console.log(skip)
    // console.log(newSkip)
    const searchString = searchInputRef.current.value
    // console.log(searchString)
    getSearchResult(searchString,newSkip).then(
      (result)=>(setSeachedPosts(result))
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8 relative">
      <Head>
        <title>JawadAsif's Scribbles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="searchBox post-styles_searchBox">
        <input type="text" className="searchInput post-styles_searchInput"
         ref={searchInputRef} placeholder="Search" onChange={_.debounce(handleSearch,700)}/>
        <button className="searchButton post-styles_searchButton">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
          {seachedPosts.edges?.map((post, index) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
          {/* {console.log(posts.edges)} */}
          <div className="flex justify-content absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
            <button areal-label="Previous" disabled={!seachedPosts.pageInfo?.hasPreviousPage}
            onClick={handlePreviousButton}
            className="hover:ring-2 hover:ring-offset-1 font-semibold 
            focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white
            focus:bg-black focus:outline-none hover:scale-x-95 w-full sm:w-auto 
            bg-black transition duration-150 ease-in-out rounded text-white
              px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black">
                Previous
            </button>
            <button areal-label="Next" disabled={!seachedPosts.pageInfo?.hasNextPage}
            onClick={handleNextButton}
            className="hover:ring-2 hover:ring-offset-1
              font-semibold hover:ring-white focus:ring-white focus:ring-2 
              focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-x-95 
              w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded
            text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400
            disabled:text-black">
              Next
            </button>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

const generateRSSFeed = async()=>{
  const posts = await getPosts();
  const siteURL = "https://blog.jawadasif.vercel.app";
  const date = new Date();
  const author = {
    name: "Md Jawad Noor Asif",
    email: "jawad.asif.bd@gmail.com",
    link: "https://jawadasif.vercel.app",
  };
  const feed = new Feed({
    title: "JawadAsif's Scribbles",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/vercel.svg`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Md. Jawad Noor Asif`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  // console.log(posts);
  posts.forEach((post) => {
    post = post.node
    // console.log(post)
    const url = `${siteURL}/post/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: new Date(post.createdAt),
    });
  });
  if (process.env.NODE_ENV === 'production') {
    // fs.mkdirSync("./rss", { recursive: true });
    fs.writeFileSync("feed.xml", feed.rss2());
    fs.writeFileSync("atom.xml", feed.atom1());
    fs.writeFileSync("feed.json", feed.json1());
  }
  else {
    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());
  }
  // const staticOutputPath = path.join(process.cwd(), 'rss');
  // // console.log(staticOutputPath)
  // // console.log({process})
  // fs.mkdirSync(staticOutputPath, { recursive: true });
  // fs.writeFileSync(path.join(staticOutputPath,'feed.xml'), feed.rss2());
  // fs.writeFileSync(path.join(staticOutputPath,'atom.xml'), feed.atom1());
  // fs.writeFileSync(path.join(staticOutputPath,'feed.json'), feed.json1());
}

export async function getStaticProps() {
  const posts = (await getPost2()) || [];
  await generateRSSFeed();
  return {
    props: { posts },
    revalidate: 60
  };
}
