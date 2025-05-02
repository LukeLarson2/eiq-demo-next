import ProductsList from '@/components/products-list'
import ProductsFilter from '@/components/products-filter'

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Browse our selection of premium tech products
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <ProductsFilter />
          </div>
          
          <div className="lg:w-3/4">
            <ProductsList />
          </div>
        </div>
      </div>
    </div>
  )
}