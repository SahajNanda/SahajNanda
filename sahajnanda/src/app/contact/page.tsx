"use client";
import { useState } from "react";
import Outline from "../components/outline";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <Outline>
            <div className="flex flex-col items-center justify-center p-4">
                <div className="max-w-xl ">
                    <h1 className="text-4xl font-semibold text-emerald-500 mb-6 text-center hover:animate-pulse cursor-default">
                        Contact Me
                    </h1>
                    <p className="text-gray-300 mb-8 text-center hover:text-emerald-500 hover:animate-pulse transition duration-900 ease-in-out cursor-default">
                        Fill out the form below or email me directly at{" "}
                        <a
                            href="mailto:mail@sahajnanda.com"
                            className="text-emerald-500 hover:underline cursor-pointer"
                        >
                            mail@sahajnanda.com
                        </a>.
                    </p>

                    {submitted ? (
                        <div className="text-center text-emerald-400 font-medium">
                            ✅ Thank you! Your message has been sent.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm mb-2 text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm mb-2 text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-md border border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 outline-none transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded-full hover:animate-pulse cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </Outline>
    );
}