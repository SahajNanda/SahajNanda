interface CardProps {
    title: string;
    expanded: boolean;
    children: React.ReactNode;
    color: string;
    onClick: () => void;
}

export default function Card({ title, expanded, children, color, onClick }: CardProps) {
    return (
        <div className="flex flex-row items-center justify-center h-full cursor-pointer">
            <div className={`h-full px-4 flex justify-center`} onClick={onClick} style={{ backgroundColor: color }}>
                <h2 className="mt-6 text-white text-lg" style={{ writingMode: 'vertical-lr' }}>{title}</h2>
            </div>
            {expanded && (
                <div className="w-[400%] p-4 shadow-lg transition-all duration-300 ease-in-out">
                    {children}
                </div>
            )}
        </div>
    );
}