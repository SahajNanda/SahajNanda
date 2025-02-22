'use client'
import Card from './components/card';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  let cards = [
    { title: 'ABOUT', children: <h2>hey</h2>, color: 'blue' },
    { title: 'EDUCATION', children: <h2>hey</h2>, color: 'red' },
    { title: 'EXPERIENCE', children: <h2>heyyyyyyyyyyyyyyyyyyyyy</h2>, color: 'green' },
    { title: 'PROJECTS', children: <h2>hey</h2>, color: 'purple' },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Head>
        <title>Sahaj Nanda</title>
      </Head>
      <div className="flex flex-row h-screen w-screen justify-end">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            title={card.title} 
            expanded={expandedIndex === index} 
            color={card.color} 
            onClick={() => handleExpand(index)}
          >
            {card.children}
          </Card>
        ))}
      </div>
    </div>
  );
}