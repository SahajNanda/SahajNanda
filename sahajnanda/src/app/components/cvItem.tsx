import React from "react";

type CvItem = {
    title?: string;
    date?: string;
    subtitle1?: string;
    subtitle2?: string;
    details?: string[];
    terms?: string[];
};

function CvItem({ title, date, subtitle1, subtitle2, details, terms }: CvItem) {
    return (
        <div className="mb-6">

            <div className="group hover:text-emerald-500 hover:animate-pulse transition duration-900 ease-in-out cursor-default mb-1">
                <h2 className="font-medium flex flex-row justify-between">
                    {title && <span>{title}</span>}
                    {date && <span>{date}</span>}
                </h2>

                <h3 className="text-sm text-slate-300 group-hover:text-emerald-500 transition duration-900 ease-in-out flex flex-row justify-between">
                    {subtitle1 && <span>{subtitle1}</span>}
                    {subtitle2 && <span>{subtitle2}</span>}
                </h3>
            </div>

            <ul className="list-disc ml-5 text-slate-300">
                {details?.map((detail, index) => (
                    <li key={index} className="hover:text-emerald-500 hover:animate-pulse transition duration-900 ease-in-out cursor-default">{detail}</li>
                ))}
            </ul>
            
            {terms && (
                <div className="flex flex-wrap gap-2">
                    {terms.map((term, index) => (
                        <span key={index} className="bg-emerald-600 px-3 py-1 rounded-full text-sm hover:animate-pulse transition duration-900 ease-in-out cursor-default">
                            {term}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CvItem;