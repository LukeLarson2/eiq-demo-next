"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart, SlidersHorizontal, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import { products, searchProducts, getProductsByCategory } from '@/lib/product-data'
import { Product } from '@/lib/types'

export default function ProductsList() {
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOption, setSortOption] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  
  useEffect(() => {
    // Get parameters from URL
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const query = searchParams.get('q')
    
    if (query) {
      setSearchQuery(query)
    }
    
    // Apply filters
    let filtered = [...products]
    
    if (category) {
      const categories = category.split(',')
      filtered = filtered.filter(product => categories.includes(product.category))
    }
    
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= Number(minPrice))
    }
    
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(maxPrice))
    }
    
    if (query) {
      filtered = searchProducts(query)
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        // featured or default, keep original order
        break
    }
    
    setFilteredProducts(filtered)
  }, [searchParams, sortOption, searchQuery])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    
    if (searchQuery) {
      params.set('q', searchQuery)
    } else {
      params.delete('q')
    }
    
    window.location.href = `/products?${params.toString()}`
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </form>
        
        <div className="flex items-center gap-4">
          <Select
            value={sortOption}
            onValueChange={setSortOption}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A-Z</SelectItem>
              <SelectItem value="name-desc">Name: Z-A</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProducts.length} products
        </p>
        
        <div className="flex gap-2">
          {searchParams.get('category') && (
            <Badge variant="secondary" className="gap-1">
              {searchParams.get('category')}
              <button 
                className="ml-1 hover:text-destructive"
                onClick={() => {
                  const params = new URLSearchParams(searchParams)
                  params.delete('category')
                  window.location.href = `/products?${params.toString()}`
                }}
              >
                ×
              </button>
            </Badge>
          )}
          
          {searchParams.get('q') && (
            <Badge variant="secondary" className="gap-1">
              "{searchParams.get('q')}"
              <button 
                className="ml-1 hover:text-destructive"
                onClick={() => {
                  const params = new URLSearchParams(searchParams)
                  params.delete('q')
                  window.location.href = `/products?${params.toString()}`
                }}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <div className="w-full h-64 relative">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600'
                      }`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>
                
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="font-bold">
                  ${product.price.toFixed(2)}
                </div>
                
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-1/4 relative">
                <Link href={`/products/${product.id}`}>
                  <div className="w-full h-40 sm:h-full relative">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Link>
              </div>
              
              <div className="flex flex-col p-4 sm:w-3/4">
                <div className="flex justify-between">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4 flex-grow">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </div>
                  
                  <Button 
                    onClick={() => addToCart(product)}
                    className="gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}