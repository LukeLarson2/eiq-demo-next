import Link from 'next/link'
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TechTrove</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Premium tech products for your everyday needs. Free shipping on orders over $50.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <FacebookIcon size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <TwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <InstagramIcon size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                <LinkedinIcon size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=laptops" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products?category=smartphones" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} TechTrove. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}