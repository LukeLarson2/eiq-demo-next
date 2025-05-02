import { Product } from '@/lib/types'

export const products: Product[] = [
  {
    id: 1,
    name: "Pro Book 13",
    description: "Ultra-thin laptop with 13-inch Retina display, 16GB RAM, and 512GB SSD storage. Perfect for professionals and students alike.",
    price: 1299.99,
    category: "laptops",
    image: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "SmartPhone X",
    description: "Next-generation smartphone with 6.7-inch OLED display, triple camera system, and all-day battery life.",
    price: 999.99,
    category: "smartphones",
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.9,
    stock: 20,
    featured: true
  },
  {
    id: 3,
    name: "Wireless Earbuds Pro",
    description: "Premium wireless earbuds with active noise cancellation, spatial audio, and 24-hour battery life with charging case.",
    price: 199.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    stock: 30,
    featured: true
  },
  {
    id: 4,
    name: "Gaming Laptop Elite",
    description: "High-performance gaming laptop with 15.6-inch 144Hz display, RTX 3080 graphics, and RGB keyboard.",
    price: 1899.99,
    category: "laptops",
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.6,
    stock: 8
  },
  {
    id: 5,
    name: "Smartphone Ultra",
    description: "Feature-packed smartphone with 6.5-inch Super AMOLED display, 108MP camera, and 5000mAh battery.",
    price: 799.99,
    category: "smartphones",
    image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    stock: 25
  },
  {
    id: 6,
    name: "Smart Watch Series 5",
    description: "Advanced smartwatch with always-on display, health monitoring features, and 18-hour battery life.",
    price: 399.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    stock: 18,
    featured: true
  },
  {
    id: 7,
    name: "2-in-1 Convertible Laptop",
    description: "Versatile 2-in-1 laptop with touchscreen display, 360-degree hinge, and long battery life.",
    price: 999.99,
    category: "laptops",
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    stock: 12
  },
  {
    id: 8,
    name: "Noise-Cancelling Headphones",
    description: "Over-ear headphones with industry-leading noise cancellation, 30-hour battery life, and premium sound quality.",
    price: 299.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.8,
    stock: 15
  },
  {
    id: 9,
    name: "Smartphone Budget",
    description: "Affordable smartphone with 6.2-inch HD+ display, quad-camera system, and 5000mAh battery.",
    price: 299.99,
    category: "smartphones",
    image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.3,
    stock: 30
  },
  {
    id: 10,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 39.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    stock: 40
  },
  {
    id: 11,
    name: "Pro Book 15",
    description: "Powerful laptop with 15-inch Retina display, 32GB RAM, and 1TB SSD storage. Perfect for content creators.",
    price: 1799.99,
    category: "laptops",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.9,
    stock: 10
  },
  {
    id: 12,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 12-hour battery life.",
    price: 129.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.6,
    stock: 22
  }
]

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category)
}

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}