"use client"

import React, { useState, useEffect } from "react"
import { ComponentCard } from "@/components/component-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ZipUploader } from "@/components/zip-uploader"

// Default mock data - will be used if no components are loaded from the server
const defaultComponents = {
  "user-app": [
    {
      id: "ua1",
      name: "Login Screen",
      description: "User authentication screen with social login options",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ua2",
      name: "Menu Browser",
      description: "Browse restaurant menu items with filtering",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ua3",
      name: "Order Tracker",
      description: "Real-time order status tracking interface",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ],
  "chefs-magic": [
    {
      id: "cm1",
      name: "Kitchen Dashboard",
      description: "Overview of current orders and kitchen status",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "cm2",
      name: "Recipe Viewer",
      description: "Detailed recipe instructions with timing",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "cm3",
      name: "Inventory Manager",
      description: "Track and manage kitchen inventory",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ],
  admin: [
    {
      id: "ad1",
      name: "Analytics Dashboard",
      description: "Business performance metrics and charts",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ad2",
      name: "User Management",
      description: "Customer and staff account management",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ad3",
      name: "Menu Editor",
      description: "Create and edit menu items and categories",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ],
}

interface Component {
  id: string
  name: string
  description: string
  thumbnail: string
  category?: string
  componentPath?: string
}

interface ComponentGridProps {
  category: "user-app" | "chefs-magic" | "admin"
}

export function ComponentGrid({ category }: ComponentGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [components, setComponents] = useState<Record<string, Component[]>>({
    "user-app": [],
    "chefs-magic": [],
    "admin": []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadComponents() {
      try {
        // Try to fetch components from the server
        const response = await fetch('/api/components')
        
        if (response.ok) {
          const data = await response.json()
          
          // Organize components by category
          const categorizedComponents: Record<string, Component[]> = {
            "user-app": [],
            "chefs-magic": [],
            "admin": []
          }
          
          // Add components to their respective categories
          data.components.forEach((component: Component) => {
            if (component.category && categorizedComponents[component.category]) {
              categorizedComponents[component.category].push(component)
            }
          })
          
          // If we have components in any category, use them
          const hasComponents = Object.values(categorizedComponents).some(arr => arr.length > 0)
          
          if (hasComponents) {
            setComponents(categorizedComponents)
          } else {
            // Fall back to default components if no components were loaded
            setComponents(defaultComponents)
          }
        } else {
          // Fall back to default components if API call fails
          setComponents(defaultComponents)
        }
      } catch (error) {
        console.error('Error loading components:', error)
        // Fall back to default components if there's an error
        setComponents(defaultComponents)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadComponents()
  }, [])

  const categoryComponents = components[category] || []
  
  const filteredComponents = categoryComponents.filter(
    (component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search components..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ZipUploader />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[300px] bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No components found. Try a different search or upload new components.</p>
        </div>
      )}
    </div>
  )
}
