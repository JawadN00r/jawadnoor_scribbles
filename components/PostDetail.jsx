import React, { useEffect } from 'react'
import moment from 'moment'
import hljs from 'highlight.js';
// import python from 'highlight.js/lib/languages/python';
// import java from 'highlight.js/lib/languages/java';
// import cpp from 'highlight.js/lib/languages/cpp';


const PostDetail = ({ post }) => {
  // hljs.registerLanguage('python', python);
  // hljs.registerLanguage('java', java);
  // hljs.registerLanguage('cpp', cpp);

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }

      if (obj.code) {
        modifiedText = (<code key={index}
          className="text-gray-800 bg-gray-100 mx-1 px-1.5 py-0.5
          rounded font-mono">
          {text}
        </code>)
      }
    }

    switch (type) {
      case 'heading-one':
        return <h1 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8 sm:text-sm lg:text-base">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'bulleted-list':
        return <ul className="block list-disc my-4 mx-0 pl-10 sm:text-sm lg:text-base" key={index}>{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(i, item.text, item, item.type)}</React.Fragment>)}</ul>;
      case 'list-item':
        return <li className="list-item" key={index}>{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(i, item.text, item, item.type)}</React.Fragment>)}</li>;
      case 'list-item-child':
        // console.log(obj)
        return obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(i, item.text, item)}</React.Fragment>);
      case 'code-block':
        return <pre key={index} className="my-8">
          <code>{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(i, item.text, item, item.type)}</React.Fragment>)}</code></pre>;
      case 'class':
        return <pre key={index}>
          <code className={obj.className}>{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(i, item.text, item, item.type)}</React.Fragment>)}</code></pre>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8
     pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-2 md:mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center w-full mb-4 md:mb-8 justify-center">
          <div className="flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <img
              alt={post.author.name}
              height="30px"
              width="30px"
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 text-xs md:text-sm">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle text-xs md:text-sm justify-center">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-xl md:text-3xl font-semibold text-center">
          {post.title}
        </h1>
        {/* {console.log(post.content.raw)} */}
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  )
}

export default PostDetail
