
export default function Loading() {
  return (
  <div className="relative h-screen flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-44 w-44 border-t-4 border-b-4 border-w3" />
    <div className="typewriter">
    <div className="slide"><i></i></div>
    <div className="paper"></div>
    <div className="keyboard"></div>
</div>
</div>
)
}
