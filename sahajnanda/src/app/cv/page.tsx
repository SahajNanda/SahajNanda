'use client';
import React from "react";
import Outline from "../components/outline";
import CvSection from "../components/cvSection";
import CvItem from "../components/cvItem";

const education: CvItem[] = [
    {
        title: "University of Georgia",
        date: "Expected December 2026",
        subtitle1: "M.S. Cybersecurity and Privacy",
        subtitle2: "3.9 GPA",

    },
    {
        title: "University of Georgia",
        date: "August 2021 - May 2025",
        subtitle1: "B.S. Computer Science",
        subtitle2: "3.6 GPA",
    },
]

const experience: CvItem[] = [
    {
        title: "Capgemini",
        date: "June 2025 - July 2025",
        subtitle1: "LAUNCH Intern",
        subtitle2: "Dallas, TX",
        details: [
            "Developed an LLM service for employees to generate project reports to be shared company wide",
            "Collaborated with team to publish website using Azure SQL/blob storage and OpenAI services",
            "Led security testing team on a different project, ensuring AI assistant and other website components were built and performed securely",
        ],
    },
    {
        title: "University of Georgia",
        date: "August 2025 - Present",
        subtitle1: "Project Engineer",
        subtitle2: "Athens, GA",
        details: [
            "Developed auto graded assignments for the UGA Web Development class covering topics such as Node/React, Javascript, and HTML/CSS",
            "Collaborated on assignment material for Web Development class through weekly meetings"
        ],
    },
    {
        title: "University of Georgia",
        date: "August 2024 - May 2025",
        subtitle1: "Web Programming TA",
        subtitle2: "Athens, GA",
        details: [
            "Assisted 60+ Web Programming students with classwork, homework, and projects",
            "Taught concepts relating to frontend and backend development (HTML/CSS/JS, React, Node) and database management (MongoDB)",
            "Worked alongside Web Programming professor and other TA's to plan class content",
        ],
    },
    {
        title: "Ivy Bridge Academy",
        date: "June 2023 - August 2023",
        subtitle1: "Tutor",
        subtitle2: "Johns Creek, GA",
        details: [
            "Taught students K-12 a variety of math subjects, including AP Calculus, algebra, and geometry",
            "Instructed a classroom of 10+ students in English concepts, including creative/expository writing, reading comprehension, and grammar"
        ],
    },
]

const projects: CvItem[] = [
    {
        title: "LLM Project Report Generator",
        details: [
            "Developed an LLM service for employees to generate project reports to be shared company wide",
            "Collaborated with team to publish website using Azure SQL/blob storage and OpenAI services",
            "Led security testing team on a different project, ensuring AI assistant and other website components were built and performed securely",
        ],
    },
    {
        title: "Ticket Booking Website",
        details: [
            "Developed a dynamic movie theater website using React, Tailwind CSS, Java, and SQL, enabling admin functionalities such as creating/editing movies and showtimes, and managing customers",
            "Implemented customer-facing features, including account creation, ticket booking, purchase history access, and email-based account verification",
            "Designed a user interface and ensured seamless integration of backend functionalities to enhance user experience"
        ],
    },
    {
        title: "This Website :]",
        details: ["A Next.js project hosted on Vercel"]
    }
];

const awards: CvItem[] = [
    { title: "Best Hardware Hack", subtitle1: "UGAHacks 9", date: "Feb 2024" },
    { title: "Dean's List", subtitle1: "University of Georgia", date: "Fall 2024" },
    { title: "Presidential Scholar", subtitle1: "University of Georgia", date: "Spring 2024" },
    { title: "Eagle Scout", subtitle1: "Scouts BSA", date: "October 2020" },
];

const extracurriculars: CvItem[] = [
    {
        title: "WUOG 90.5FM",
        subtitle1: "DJ, Operations Staff",
        subtitle2: "Athens, GA",
        date: "January 2023 - Present",
        details: [
            "Hosted a weekly radio music show",
            "Set up audio equipment for concerts hosted on campus"
        ],
    },
];

const languages: CvItem[] = [
    { terms: ["C/C++", "Java", "Python", "Javascript", "HTML/CSS"] },
];

const skills: CvItem[] = [
    { terms: ["Azure", "SQL", "React", "Unix", "Node/Next.js"] },
];

export default function Home() {
    return (
        <Outline>
            <header className="mb-2 flex flex-col md:flex-row items-center justify-between text-center">
                <p className="text-2xl font-bold text-emerald-500 md:my-8 mx-auto hover:animate-pulse cursor-default">Cybersecurity and Privacy M.S. student at the University of Georgia</p>
                <button
                    onClick={() => {
                        const pdfUrl = '/sahaj-nanda.pdf';
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        link.download = 'sahaj-nanda.pdf';
                        link.click();
                    }}
                    className="bg-emerald-600 font-bold py-2 px-4 rounded-full mx-auto my-8 h-min hover:animate-pulse cursor-pointer"
                >
                    Download Resume
                </button>
            </header>

            <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-x-16">
                <div>
                    <CvSection title="Education" items={education} />
                    <CvSection title="Experience" items={experience} />
                </div>
                <div>
                    <CvSection title="Projects" items={projects} />
                    <CvSection title="Awards" items={awards} />
                    <CvSection title="Extracurriculars" items={extracurriculars} />
                </div>
                <div>
                    <CvSection title="Languages" items={languages} />
                </div>
                <div>
                    <CvSection title="Skills" items={skills} />
                </div>
            </section>
        </Outline>
    );
}