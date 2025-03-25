"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye } from "lucide-react"
import { CodeViewer } from "@/components/code-viewer"

interface Component {
  id: string
  name: string
  description: string
  thumbnail: string
}

interface ComponentCardProps {
  component: Component
}

// Mock code for demonstration - replace with actual component code
const mockReactCode = `import React from 'react';
import { Button } from '@/components/ui/button';

export function ${(component: Component) => component.name.replace(/\s+/g, "")}() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">${(component: Component) => component.name}</h2>
      <p className="mb-4">${(component: Component) => component.description}</p>
      <Button>Action Button</Button>
    </div>
  );
}`

export function ComponentCard({ component }: ComponentCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = () => {
    // Create component file content
    const fileContent = mockReactCode
      .replace(/\${.*=> component.name.replace.*}/g, component.name.replace(/\s+/g, ""))
      .replace(/\${.*=> component.name}/g, component.name)
      .replace(/\${.*=> component.description}/g, component.description)

    // Create a blob with the file content
    const blob = new Blob([fileContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = `${component.name.replace(/\s+/g, "-").toLowerCase()}.tsx`
    document.body.appendChild(a)
    a.click()

    // Clean up
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={component.thumbnail || "/placeholder.svg"} alt={component.name} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{component.name}</CardTitle>
        <p className="text-muted-foreground text-sm">{component.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{component.name}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="p-4 border rounded-lg">
                <div className="aspect-video relative bg-muted rounded-lg flex items-center justify-center">
                  <Image
                    src={component.thumbnail || "/placeholder.svg"}
                    alt={component.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="code">
                <CodeViewer
                  code={mockReactCode
                    .replace(/\${.*=> component.name.replace.*}/g, component.name.replace(/\s+/g, ""))
                    .replace(/\${.*=> component.name}/g, component.name)
                    .replace(/\${.*=> component.description}/g, component.description)}
                />
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-4">
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="default" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

