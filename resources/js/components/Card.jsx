export default function Card({ children, className = '', bg = 'bg-white', title, subtitle, icon }) {
    return (
        <div className={`rounded-xl ${bg} shadow-lg transition-shadow duration-300 hover:shadow-xl ${className}`}>
            {(title || icon) && (
                <div className="border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-3">
                        {icon && <div className="text-2xl">{icon}</div>}
                        <div>
                            {title && <h3 className="font-oswald text-lg font-semibold text-gray-800">{title}</h3>}
                            {subtitle && <p className="font-domine text-sm text-gray-500">{subtitle}</p>}
                        </div>
                    </div>
                </div>
            )}
            <div className="px-6 py-4">{children}</div>
        </div>
    );
}
