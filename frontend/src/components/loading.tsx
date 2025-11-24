const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-slate-600">Loading employees...</p>
    </div>
  );
};
export default LoadingSpinner;
