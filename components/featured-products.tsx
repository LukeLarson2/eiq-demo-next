"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useCart } from '@/lib/cart-context'
import { getFeaturedProducts } from '@/lib/product-data'
import { Product } from '@/lib/types'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const { addToCart } = useCart()
  
  useEffect(() => {
    // Simulate loading data from an API
    setProducts(getFeaturedProducts())
  }, [])
  
  if (products.length === 0) {
    return (
      <div className="w-full grid place-items-center py-12">
        <div className="animate-pulse space-y-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {products.map((product) => (
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
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-2 right-2 bg-white/80 dark:bg-gray-950/80 hover:bg-white dark:hover:bg-gray-950 rounded-full"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
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
  )
}