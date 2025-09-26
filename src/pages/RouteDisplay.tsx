export function RouteDisplay() {
  return (
    <div className="h-[calc(100vh-120px)]">
      <iframe
        src="https://nt-wet-route-buddy.lovable.app"
        className="w-full h-full border-0"
        title="Route Planner"
        allow="geolocation; microphone; camera"
      />
    </div>
  );
}