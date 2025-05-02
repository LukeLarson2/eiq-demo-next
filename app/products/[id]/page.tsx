"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useCart } from '@/lib/cart-context'
import { getProductById, getProductsByCategory } from '@/lib/product-data'
import { Product } from '@/lib/types'

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const productId = parseInt(params.id)
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchedProduct = getProductById(productId)
    
    if (!fetchedProduct) {
      router.push('/products')
      return
    }
    
    setProduct(fetchedProduct)
    
    // Get related products from the same category
    const related = getProductsByCategory(fetchedProduct.category)
      .filter(p => p.id !== fetchedProduct.id)
      .slice(0, 4)
    
    setRelatedProducts(related)
    setLoading(false)
  }, [productId, router])
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?category=${product.category}`} className="capitalize">
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${product.id}`} className="text-muted-foreground">
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300 dark:text-gray-600'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.rating.toFixed(1)})
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                • {product.stock} in stock
              </span>
            </div>
          </div>
          
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          
          <p className="text-gray-700 dark:text-gray-300">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-md">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <div className="h-10 w-12 flex items-center justify-center border-x border-gray-200 dark:border-gray-800">
                {quantity}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={increaseQuantity}
                disabled={product.stock <= quantity}
                className="h-10 w-10 rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-800 py-4 space-y-3">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-green-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
              <span>2 year warranty included</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 mr-2 text-green-500" />
              <span>30-day money back guarantee</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="w-full h-64 relative">
                      <Image 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                </div>
                
                <div className="p-4">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="font-bold">
                      ${relatedProduct.price.toFixed(2)}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="rounded-full p-0 w-8 h-8"
                      onClick={() => addToCart(relatedProduct)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}