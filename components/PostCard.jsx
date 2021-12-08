import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post }) => (
  <div className=" shadow-2xl rounded-lg p-2 lg:p-4 pb-4 lg:pb-5 mb-8 relative bg-white">
    {/* <div className="relative shadow-md inline-block w-full h-60 lg:h-80 mb-6">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={post.title}
        className="shadow-lg rounded-t-lg lg:rounded-lg"
        layout="fill"
        src={post.featuredImage.url}
      />
    </div> */}
    <div className="relative overflow-hidden shadow-md pb-40 sm:pb-60 lg:pb-40 mb-3">
      <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 absolute inset-0">
        <img src={post.featuredImage.url} alt={post.title}
          className="object-center absolute h-40 sm:h-60 lg:h-40 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg" />
      </span>
    </div>

    <h1 className="transition duration-700 text-center sm:mb-4 cursor-pointer hover:text-pink-600 text-base sm:text-xl font-semibold">
      <Link href={`/post/${post.slug}`}>{post.title}</Link>
    </h1>
    <div className="flex text-center justify-center items-center mb-4 w-full">
      <div className="flex items-center justify-center lg:mb-0 lg:w-auto mr-4">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.author.name}
          height="20px"
          width="20px"
          className="align-middle rounded-full h-5 w-5 sm:h-7 sm:w-7"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-gray-700 ml-2 text-xs sm:text-base">{post.author.name}</p>
      </div>
      <div className="font-medium text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="align-middle text-xs sm:text-base">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
      </div>
    </div>
    <p className="text-center text-gray-700 font-normal mb-4 text-xs sm:text-base">
      {post.excerpt}
    </p>
    <div className="text-center">
      <Link href={`/post/${post.slug}`}>
        <span className="hover:shadow-lg hover:-translate-y-1 hover:bg-indigo-700 active:scale-90 sm:my-3 transition duration-150 text-xs sm:text-base font-bold inline-block bg-pink-600 rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
      </Link>
    </div>
  </div>
);

export default PostCard;