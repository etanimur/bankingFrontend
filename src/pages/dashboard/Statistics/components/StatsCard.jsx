export default function StatsCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <h3 className="text-xl text-left pl-4 text-gray-800 font-bold mb-4">
        {title}
      </h3>
      <div className="w-full">{children}</div>
    </div>
  );
}
