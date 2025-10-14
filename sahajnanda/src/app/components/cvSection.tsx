import React from 'react';
import CvItem from "./cvItem";

type CvSectionProps = {
    title: string;
    items: CvItem[];
};

function CvSection({ title, items }: CvSectionProps) {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-emerald-500 mb-4 hover:animate-pulse cursor-default">{title}</h2>
            {items.map((item, index) => (
                <CvItem key={index} {...item} />
            ))}
        </section>
    );
}

export default CvSection;