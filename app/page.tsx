import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentGrid } from "@/components/component-grid"
import { AddComponentButton } from "@/components/add-component-button"

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Kanteeno UI Viewer</h1>
        <p className="text-muted-foreground">
          Browse, download, and contribute UI components for the Kanteeno ecosystem
        </p>
        <a 
          href="/zip-upload-guide.md" 
          target="_blank" 
          className="text-sm text-primary hover:underline mt-2 inline-block"
        >
          How to upload components
        </a>
      </header>

      <Tabs defaultValue="user-app" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="user-app">User App</TabsTrigger>
            <TabsTrigger value="chefs-magic">Chefs Magic</TabsTrigger>
            <TabsTrigger value="admin">Admin App</TabsTrigger>
          </TabsList>
          <AddComponentButton />
        </div>

        <TabsContent value="user-app">
          <ComponentGrid category="user-app" />
        </TabsContent>

        <TabsContent value="chefs-magic">
          <ComponentGrid category="chefs-magic" />
        </TabsContent>

        <TabsContent value="admin">
          <ComponentGrid category="admin" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
