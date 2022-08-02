import { getPosts } from "../../services";
import { Feed } from "feed";

const generateRSSFeed = async () => {
  const posts = await getPosts();
  const siteURL = "https://blog.jawadnoor.vercel.app";
  const date = new Date();
  const author = {
    name: "Md Jawad Noor Asif",
    email: "jawad.asif.bd@gmail.com",
    link: "https://jawadnoor.vercel.app",
  };
  const feed = new Feed({
    title: "JawadNoor's Scribbles",
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
    post = post.node;
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

  //   try {
  //     fs.mkdirSync("./rss", { recursive: true });
  //     fs.writeFileSync("./rss/feed.xml", feed.rss2());
  //     fs.writeFileSync("./rss/atom.xml", feed.atom1());
  //     fs.writeFileSync("./rss/feed.json", feed.json1());
  //   } catch (error) {
  //     console.log("failed in ./rss/");
  //   }
  return feed.rss2();
};

const feed = () => {
  return null;
};

export default feed;

export async function getServerSideProps({ res }) {
  const posts = await generateRSSFeed();
  res.setHeader("Content-Type", "text/xml");
  res.write(posts);
  res.end();
  return {
    props: {},
  };
}

// export async function getInitialProps({ res }) {
//   res.setHeader("Content-Type", "text/xml");
//   res.write(`<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ...
//     </urlset>`);
//   res.end();
// }
