"use client"

import { useState } from "react"
import { ComponentCard } from "@/components/component-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

// Mock data - replace with your actual components
const mockComponents = {
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
    {
      id: "ua4",
      name: "User Profile",
      description: "User profile management screen",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ua5",
      name: "Payment Form",
      description: "Secure payment processing interface",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ua6",
      name: "Notifications Panel",
      description: "User notifications and alerts panel",
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
    {
      id: "cm4",
      name: "Order Queue",
      description: "Prioritized order preparation queue",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "cm5",
      name: "Staff Scheduler",
      description: "Kitchen staff scheduling interface",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "cm6",
      name: "Quality Control",
      description: "Food quality tracking and reporting",
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
    {
      id: "ad4",
      name: "Settings Panel",
      description: "System configuration and preferences",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ad5",
      name: "Reports Generator",
      description: "Create custom business reports",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      id: "ad6",
      name: "Permissions Manager",
      description: "Role-based access control settings",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ],
}

interface ComponentGridProps {
  category: "user-app" | "chefs-magic" | "admin"
}

export function ComponentGrid({ category }: ComponentGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const components = mockComponents[category]

  const filteredComponents = components.filter(
    (component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search components..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <ComponentCard key={component.id} component={component} />
        ))}
      </div>
    </div>
  )
}

