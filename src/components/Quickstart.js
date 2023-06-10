import React from "react";

export const Quickstart = ({
  startQuestionnaire,
  handleScrollClick,
  setStartQuestionnaire,
}) => {
  return (
    <div className="flex items-center p-24">
      <img alt="logo" src="/logo.png" className="w-1/4 h-[230px]" />
      <span className="w-1/4" />
      <section className="w-2/4 ">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to our Personality Traits website!
        </h1>

        <p className="text-left p-2">
          Here, you can discover fascinating insights about yourself and others
          through the exploration of various personality traits. Whether you're
          curious about your dominant traits or seeking to understand different
          personality types, our platform offers valuable rankings and
          descriptions to help you gain a deeper understanding of who you are.
          Embark on a journey of self-discovery and embrace the diversity of
          personalities that make our world so vibrant. Start exploring and
          unravel the intricacies of personality traits today!
        </p>
        {!startQuestionnaire && (
          <button
            onClick={() => {
              handleScrollClick();
              setStartQuestionnaire(true);
            }}
            className="bg-[#ADB5BD] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex flex-col"
          >
            Get Started
          </button>
        )}
      </section>
    </div>
  );
};
