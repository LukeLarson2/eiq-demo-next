import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import FeaturedProducts from '@/components/featured-products';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to TechTrove
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Premium tech products for your everyday needs. Free shipping on orders over $50.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/products">
                <Button className="transition-all duration-300 hover:shadow-lg group">
                  Shop Now
                  <ShoppingBag className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Products
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Check out our most popular items this week
              </p>
            </div>
          </div>
          <FeaturedProducts />
          <div className="flex justify-center mt-8">
            <Link href="/products">
              <Button variant="outline" className="group">
                View All Products 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Shop by Category
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Find exactly what you're looking for
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {["Laptops", "Smartphones", "Accessories"].map((category) => (
              <div 
                key={category}
                className="relative group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl"
              >
                <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800"></div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/products?category=${category.toLowerCase()}`}>
                    <Button variant="secondary" size="lg">
                      Shop {category}
                    </Button>
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-950 transition-transform transform translate-y-0 group-hover:translate-y-full">
                  <h3 className="text-xl font-bold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}