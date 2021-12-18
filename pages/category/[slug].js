import React,{useState,useEffect,useRef} from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import _ from 'lodash'

import { getCategories,getSearchResultOfCategory } from "../../services";
import { PostCard, Categories, Loader } from "../../components";

const CategoryPost = ({ posts,slug }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const [seachedPosts, setSeachedPosts] = useState([])
  const [skip, setSkip] = useState(0)
  const searchInputRef = useRef()

  useEffect(() => {
    const searchString = searchInputRef.current.value
    if(searchString) {
      getSearchResultOfCategory(searchString,0,slug).then(
        (result)=>(setSeachedPosts(result))
      )
      setSkip(0)
    } else {
      setSeachedPosts(posts)
    }
    }, [slug])

  const handleSearch = (e) => {
    const searchString = searchInputRef.current.value
    getSearchResultOfCategory(searchString,0,slug).then(
      (result)=>(setSeachedPosts(result))
    )
    setSkip(0)
  }

  const handleNextButton = (e) => {
    const newSkip = skip + 6
    setSkip(newSkip)
    const searchString = searchInputRef.current.value
    getSearchResultOfCategory(searchString,newSkip,slug).then(
      (result)=>(setSeachedPosts(result))
    )
  }

  const handlePreviousButton = (e) => {
    const newSkip = Math.max(0,skip - 6)
    setSkip(newSkip)
    const searchString = searchInputRef.current.value
    getSearchResultOfCategory(searchString,newSkip,slug).then(
      (result)=>(setSeachedPosts(result))
    )
  }

  return (
    <>
      <Head>
        <title>{slug}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-4 sm:px-10 mb-8 relative">
        {/* search box */}
        <div className="searchBox post-styles_searchBox__2MHHz">
          <input type="text" className="searchInput post-styles_searchInput__3NdUh"
          ref={searchInputRef} placeholder="Search" onChange={_.debounce(handleSearch,700)}/>
          <button className="searchButton post-styles_searchButton__2fH5K">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
        {/* main section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
            {seachedPosts.edges?.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
            {/* previous and next button */}
            {seachedPosts.edges?.length &&
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
            }
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps(props) {
  const { params } = props
  props.key = params.slug
  const posts = await getSearchResultOfCategory("",0,params.slug);
  const slug = params.slug
  return {
    props: { posts,slug },
    revalidate:60
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
