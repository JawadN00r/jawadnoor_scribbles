import Head from "next/head";
import { PostWidget, Categories, PostCard } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-4 sm:px-10 mb-8 relative">
      <Head>
        <title>JawadAsif's Scribbles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.node.title} />
          ))}
          {/* <div class="flex justify-content absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
            <button areal-label="Previous" disabled="" className="hover:ring-2 hover:ring-offset-1 font-semibold 
            focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white
            focus:bg-black focus:outline-none hover:scale-95 w-full sm:w-auto 
            bg-black transition duration-150 ease-in-out rounded text-white
              px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black">
                Previous
            </button>
            <button areal-label="Next" className="hover:ring-2 hover:ring-offset-1
              font-semibold hover:ring-white focus:ring-white focus:ring-2 
              focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95 
              w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded
            text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400
            disabled:text-black">
              Next
            </button>
          </div> */}
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

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
