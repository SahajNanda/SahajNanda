'use client';
import React from "react";
import Outline from "../components/outline";

const data = {
    basics: {
        name: "Sahaj Nanda",
        headline: "Cybersecurity and Privacy M.S. student at the University of Georgia",
    },
    sections: {
        education: {
            items: [
                {
                    institution: "University of Georgia",
                    area: "B.S. Computer Science",
                    studyType: "3.6 GPA",
                    date: "August 2021 - May 2025",
                },
                {
                    institution: "University of Georgia",
                    area: "M.S. Cybersecurity and Privacy",
                    studyType: "3.9 GPA",
                    date: "Expected December 2026",
                },
            ],
        },
        experience: {
            items: [
                {
                    company: "Capgemini",
                    position: "LAUNCH Intern",
                    location: "Dallas, TX",
                    date: "June 2025 - July 2025",
                    summary: [
                        "Developed an LLM service for employees to generate project reports to be shared company wide",
                        "Collaborated with team to publish website using Azure SQL/blob storage and OpenAI services",
                        "Led security testing team on a different project, ensuring AI assistant and other website components were built and performed securely",
                    ],
                },
                {
                    company: "University of Georgia",
                    position: "Project Engineer",
                    location: "Athens, GA",
                    date: "August 2025 - Present",
                    summary: [
                        "Developed auto graded assignments for the UGA Web Development class covering topics such as Node/React, Javascript, and HTML/CSS",
                        "Collaborated on assignment material for Web Development class through weekly meetings"
                    ]
                },
                {
                    company: "University of Georgia",
                    position: "Web Programming TA",
                    location: "Athens, GA",
                    date: "August 2024 - May 2025",
                    summary: [
                        "Assisted 60+ Web Programming students with classwork, homework, and projects",
                        "Taught concepts relating to frontend and backend development (HTML/CSS/JS, React, Node) and database management (MongoDB)",
                        "Worked alongside Web Programming professor and other TA's to plan class content",
                    ],
                },
                {
                    company: "Ivy Bridge Academy",
                    position: "Tutor",
                    location: "Johns Creek, GA",
                    date: "June 2023 - August 2023",
                    summary: [
                        "Taught students K-12 a variety of math subjects, including AP Calculus, algebra, and geometry",
                        "Instructed a classroom of 10+ students in English concepts, including creative/expository writing, reading comprehension, and grammar"
                    ]
                },
            ],
        },
        awards: {
            items: [
                { title: "Best Hardware Hack", awarder: "UGAHacks 9", date: "Feb 2024" },
                { title: "Dean's List", awarder: "University of Georgia", date: "Fall 2024" },
                { title: "Presidential Scholar", awarder: "University of Georgia", date: "Spring 2024" },
                { title: "Eagle Scout", awarder: "Scouts BSA", date: "October 2020" },
            ],
        },
        skills: {
            items: ["Azure", "SQL", "React", "Unix", "Node/Next.js"],
        },
        languages: {
            items: ["C/C++", "Java", "Python", "Javascript", "HTML/CSS"],
        },
        projects: {
            items: [
                {
                    name: "LLM Project Report Generator",
                    summary: [
                        "Implemented Azure OpenAI Services to generate natural language summaries from uploaded project documentation",
                        "Integrated Azure Blob/SQL Storage for encrypted file uploads and retrieval",
                        "Developed a Node.js application with secure user authentication, enabling employees to track project progress company wide",
                    ],
                },
                {
                    name: "Ticket Booking Website",
                    summary: [
                        "Developed a dynamic movie theater website using React, Tailwind CSS, Java, and SQL, enabling admin functionalities such as creating/editing movies and showtimes, and managing customers",
                        "Implemented customer-facing features, including account creation, ticket booking, purchase history access, and email-based account verification",
                        "Designed a user interface and ensured seamless integration of backend functionalities to enhance user experience"
                    ],
                },
                {
                    name: "This website :)",
                    summary: ["A next.js project hosted on vercel"]
                }
            ],
        },
        extracurriculars: {
            items: [
                {
                    name: "WUOG 90.5FM",
                    position: "DJ, Operations Staff",
                    date: "January 2023 - Present",
                    location: "Athens, GA",
                    summary: [
                        "Hosted a weekly radio music show",
                        "Set up audio equipment for concerts hosted on campus"
                    ]
                },
            ],
        },
    },
};

export default function Home() {

    const { basics, sections } = data;

    return (
        <Outline>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-emerald-400">
                    {basics.name}
                </h1>
                <p className="text-lg text-emerald-200">{basics.headline}</p>
            </header>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                {/* LEFT COLUMN */}
                <div>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                            Education
                        </h2>
                        <div className="space-y-3">
                            {sections.education.items.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-medium">{edu.institution}</p>
                                    <p className="text-sm text-gray-300">
                                        {edu.area} — {edu.studyType}
                                    </p>
                                    <p className="text-sm text-gray-400">{edu.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                            Experience
                        </h2>
                        <div className="space-y-5">
                            {sections.experience.items.map((exp, i) => (
                                <div key={i}>
                                    <p className="font-medium">
                                        {exp.position} — {exp.company}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {exp.location} • {exp.date}
                                    </p>
                                    <ul className="list-disc ml-5 text-gray-300">
                                        {exp.summary.map((line, idx) => (
                                            <li key={idx}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-6 mb-10">
                        <div>
                            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {sections.skills.items.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="bg-emerald-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-10">

                    <section>
                        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                            Projects
                        </h2>
                        <div className="space-y-5">
                            {sections.projects.items.map((proj, i) => (
                                <div key={i}>
                                    <p className="font-medium">{proj.name}</p>
                                    <ul className="list-disc ml-5 text-gray-300">
                                        {proj.summary.map((line, idx) => (
                                            <li key={idx}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                            Awards
                        </h2>
                        <div className="space-y-5">
                            {sections.awards.items.map((award, i) => (
                                <div key={i}>
                                    <p className="font-medium">
                                        {award.title}
                                    </p>
                                    {award.date && (
                                        <p className="text-sm text-gray-400">{award.awarder} - {award.date}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                            Extracurriculars
                        </h2>
                        <div className="space-y-5">
                            {sections.extracurriculars.items.map((extra, i) => (
                                <div key={i}>
                                    <p className="font-medium">
                                        {extra.name} — {extra.position}
                                    </p>
                                    <p className="text-sm text-gray-400">{extra.date}</p>
                                    {extra.summary && extra.summary.length > 0 && (
                                        <ul className="list-disc ml-5 text-gray-300">
                                            {extra.summary.map((line: string, idx: number) => (
                                                <li key={idx}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-6 mb-10">
                        <div>
                            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                                Languages
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {sections.languages.items.map((lang, i) => (
                                    <span
                                        key={i}
                                        className="bg-emerald-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Outline>
    );
}