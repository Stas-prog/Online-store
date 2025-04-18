import CategoryList from "@/components/categorylist"
import ProductList from "@/components/productlist"
import NewProdList from "@/components/newprodlist"
import Slider from "@/components/slider"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

const HomePage = ({ searchParams }: { searchParams: any }) => {

    return (
    <div className=''>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl mb-3 text-red-500">Кращі товари</h1>
        <Suspense fallback={'loading...'}>
          <ProductList categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!} limit={4} searchParams={searchParams}/>
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl  px-4 md:px-8 lg:px-16 mb-3 text-violet-600">Категорії</h1>
        <Suspense fallback={'loading...'}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16">
        <h1 className="text-2xl text-green-700">Нові товари</h1>
        <Suspense fallback={'loading...'}>
          <NewProdList searchParams={searchParams}/>
        </Suspense>
      </div>
    </div >
  )
}

export default HomePage