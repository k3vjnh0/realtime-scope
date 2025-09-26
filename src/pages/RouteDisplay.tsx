import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RouteDisplay() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Route Display</h1>
        <p className="text-muted-foreground">
          Interactive route planning and navigation system
        </p>
      </div>
      
      <Card className="h-[calc(100vh-200px)]">
        <CardHeader>
          <CardTitle>Route Buddy System</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <iframe
            src="https://nt-wet-route-buddy.lovable.app"
            className="w-full h-full min-h-[600px] border-0 rounded-b-lg"
            title="Route Buddy System"
            allow="geolocation; microphone; camera"
          />
        </CardContent>
      </Card>
    </div>
  );
}