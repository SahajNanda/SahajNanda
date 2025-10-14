import React from 'react';
import CvItem from "./cvItem";

type CvSectionProps = {
    title: string;
    items: CvItem[];
};

function CvSection({ title, items }: CvSectionProps) {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">{title}</h2>
            {items.map((item, index) => (
                <CvItem key={index} {...item} />
            ))}
        </section>
    );
}

export default CvSection;