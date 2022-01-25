import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, [])
  // console.log(categories)
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8 pb-12 text-sm sm:text-base">
      <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
        Categories
      </h3>
      {categories.map((category) => (
        <Link key={category.slug}
          href={`/category/${category.slug}`}>
          <span className="cursor-pointer text-sm font-bold inline-block bg-pink-600 rounded-full text-white px-3 py-2 m-1 hover:shadow-lg hover:-translate-y-1 hover:bg-indigo-700 active:scale-90 transition duration-150">
            {`${category.name} (${category.post.length})`}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
