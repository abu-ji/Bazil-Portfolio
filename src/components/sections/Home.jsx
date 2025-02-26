import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import Chatbot from "../Chatbot";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center flex-col md:flex-row relative px-6 md:px-16"
    >
      <RevealOnScroll>
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto w-full">
          {/* Left Side: Text */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Hi, I'm Bazil Nadeem
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              With over four years of experience in the United States Marine
              Corps specializing in communications, I developed a strong
              foundation in problem-solving, adaptability, and technology, with
              the aim of delivering unique and efficient experiences to users.
            </p>

            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#projects"
                className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center md:justify-end mt-8 md:mt-0 md:ml-12 flex-shrink-0">
            <img src="https://www.mobileindustryreview.com/content/images/size/w2000/wordpress/Tech-World.jpg" alt="Connectivity"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg border-4 border-blue-500"
            />
          </div>
        </div>
      </RevealOnScroll>

      {/* Chatbot */}
      <div className="mt-12">
        <Chatbot />
      </div>
    </section>
  );
};
