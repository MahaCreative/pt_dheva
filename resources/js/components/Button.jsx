export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 ease-in-out font-oswald';

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow hover:shadow-lg',
        danger: 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl',
        success: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    };

    const sizes = {
        xs: 'px-3 py-1.5 text-xs',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3 text-lg',
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
}
