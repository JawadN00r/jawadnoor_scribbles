import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getFeaturedCategories } from '../services'

const Header = () => {
  const [featuredCategories, setFeaturedCategories] = useState([])
  useEffect(() => {
    getFeaturedCategories()
      .then((newCategories) => setFeaturedCategories(newCategories))
  }, [])
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-10">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-semiboldbold text-2xl lg:text-4xl
             lg:font-bold text-white"
              id="hh">
              JawadAsif's Scribbles
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {featuredCategories.map((category) => (
            <Link key={category.slug}
              href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle
               text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div >
  )
}

export default Header
