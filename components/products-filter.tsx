"use client"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'

export default function ProductsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') 
      ? [searchParams.get('category') as string] 
      : []
  )
  
  const categories = [
    { id: 'laptops', label: 'Laptops' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'accessories', label: 'Accessories' }
  ]
  
  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','))
    }
    
    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      params.set('minPrice', priceRange[0].toString())
      params.set('maxPrice', priceRange[1].toString())
    }
    
    router.push(`/products?${params.toString()}`)
  }
  
  const resetFilters = () => {
    setPriceRange([0, 2000])
    setSelectedCategories([])
    router.push('/products')
  }
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }
  
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>
      
      <Accordion type="single" collapsible defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={priceRange}
                max={2000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <Label htmlFor="min-price" className="text-xs mb-1 block">Min</Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="min-price"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([
                        Number(e.target.value), 
                        priceRange[1]
                      ])}
                      className="pl-6"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <Label htmlFor="max-price" className="text-xs mb-1 block">Max</Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="max-price"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([
                        priceRange[0], 
                        Number(e.target.value)
                      ])}
                      className="pl-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        className="w-full mt-6" 
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
  )
}