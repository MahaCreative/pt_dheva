export default function Input({ label, error, type = 'text', className = '', required = false, ...props }) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {label}
                    {required && <span className="ml-1 text-orange-600">*</span>}
                </label>
            )}
            <input
                type={type}
                className={`rounded-lg border-2 border-blue-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    error ? 'border-orange-600 focus:border-orange-600 focus:ring-orange-200' : ''
                } ${className}`}
                {...props}
            />
            {error && (
                <p className="text-xs text-orange-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {error}
                </p>
            )}
        </div>
    );
}
