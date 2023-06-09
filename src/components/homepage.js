import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/base/Button";
import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions';
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { select } from "d3-selection";
import * as d3 from "d3";
import "./Questionnaire.css";
// import logo from '../../public/logo.png';
export const HomePageComponent = () => {
  const scrollRef = useRef(null);
  const handleScrollClick = () => {
    // Scroll to the element's top position
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const questionnaire = [
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Detailed", "Direct", "Considerate", "Enthusiastic"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Reserved", "Proactive", "Accommodating", "Analytical"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Courageous", "Diligent", "Service-oriented", "Adaptable"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Thoughtful", "Purposeful", "Appreciative", "Empowering"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Disciplined", "Patient", "Encouraging", "Flexible"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Consistent", "Valuing", "Interactive", "Engaging"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Objective", "Reliable", "Dynamic", "Supporting"],
    },
    {
      question:
        "Please rank the following traits according to what describes you best:",
      options: ["Focused", "Determined", "Supportive", "Interactive"],
    },
  ];

  // Assume `userResponses` is an array containing the user's rankings for each question
  //   const userResponses = [2, 3, 1, 4, 2, 4, 3, 1];

  // Define the personality traits and their corresponding names
  const personalityTraits = [
    {
      name: "Fiery Red",
      description:
        "Direct, decisive, focused, proactive, determined, purposeful, courageous, confident",
      color: "#FF0000",
    },
    {
      name: "Cool Blue",
      description:
        "Detailed, reserved, analytical, disciplined, diligent, thoughtful, consistent, objective",
      color: "#0000FF",
    },
    {
      name: "Earth Green",
      description:
        "Considerate, service-oriented, accommodating, appreciative, supportive, reliable, patient, valuing",
      color: "#008000",
    },
    {
      name: "Sunshine Yellow",
      description:
        "Enthusiastic, adaptable, empowering, flexible, encouraging, interactive, engaging, dynamic",
      color: "#FFFF00",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [transition, setTransition] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [startQuestionnaire, setStartQuestionnaire] = useState(false);
  const handleResponse = (questionIndex, response) => {
    setUserResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[questionIndex] = response;
      return updatedResponses;
    });
    setTransition(true);
  };
  const handleSubmit = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (transition) {
      if (currentQuestion < questionnaire.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowModal(true); // Open the email modal
      }
      setTransition(false);
    }
  }, [transition, currentQuestion, questionnaire.length]);

  const handleModalClose = () => {
    setEmail("");
    setEmailSent(false);
    setShowModal(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
    setEmailSent(true);
  };

  const displayQuestionnaire = () => {
    const question = questionnaire[currentQuestion];

    return (
      <Card className="!bg-green-200">
        <h4>{question.question}</h4>
        <div className="options-container flex justify-center">
          {question.options.map((option, optionIndex) => (
            <CardContent key={optionIndex}>
              <div>
                <label className="mx-4">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={optionIndex + 1}
                    onChange={() =>
                      handleResponse(currentQuestion, optionIndex + 1)
                    }
                    checked={userResponses[currentQuestion] === optionIndex + 1}
                  />
                  <span className="px-4">{option}</span>
                </label>
              </div>
            </CardContent>
          ))}
        </div>
      </Card>
    );
  };
  const rankPersonalityTraits = () => {
    const rankedTraits = userResponses
      .map((response, index) => {
        const traitIndex = response - 1;
        if (traitIndex >= 0 && traitIndex < personalityTraits.length) {
          return {
            trait: personalityTraits[traitIndex].name,
            ranking: index + 1,
          };
        }
        return null;
      })
      .filter((trait) => trait !== null);

    rankedTraits.sort((a, b) => a.ranking - b.ranking);

    return rankedTraits.map((rankedTrait, index) => {
      const trait = personalityTraits.find(
        (trait) => trait.name === rankedTrait.trait
      );

      if (trait) {
        return (
          <p key={index}>
            {trait.name} ({trait.description})
          </p>
        );
      }

      return null;
    });
  };

  const getTopPersonalityTrait = () => {
    const traitRanks = {
      "Fiery Red": 1,
      "Cool Blue": 0.75,
      "Earth Green": 0.5,
      "Sunshine Yellow": 0.25,
    };

    const totalWeight = userResponses.reduce(
      (sum, response, index) => sum + response * (index + 1),
      0
    );

    const traitsSortedByRank = Object.keys(traitRanks).sort(
      (trait1, trait2) => traitRanks[trait2] - traitRanks[trait1]
    );

    for (const trait of traitsSortedByRank) {
      if (totalWeight >= traitRanks[trait]) {
        return trait;
      }
    }

    return "No dominant personality trait found";
  };

  const displayPersonalityTraits = () => {
    if (showResult && emailSent) {
      return (
        <>
          <h3>Ranked Personality Traits:</h3>
          {rankPersonalityTraits()}
          <h3>Top Personality Trait:</h3>
          <p>{getTopPersonalityTrait()}</p>
        </>
      );
    }
    return null;
  };
  const createPieChart = () => {
    const data = userResponses.map((response, index) => ({
      question: index + 1,
      response,
    }));

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = select("#chart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const colorScale = d3
      .scaleOrdinal()
      .domain(personalityTraits.map((trait) => trait.name))
      .range(personalityTraits.map((trait) => trait.color)); // Use personality trait colors

    const pie = d3
      .pie()
      .value((d) => d.response)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll("arc").data(pie(data)).enter();

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) =>
        colorScale(personalityTraits[d.data.response - 1].name)
      ) // Use colorScale with trait name
      .on("mouseover", (event, d) => {
        const trait = personalityTraits[d.data.response - 1].name;
        const tooltip = select("#tooltip")
          .style("opacity", 1)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`);
        tooltip.html(`Trait: ${trait}`);
      })
      .on("mouseout", () => {
        select("#tooltip").style("opacity", 0);
      });

    const labelHeight = 20; // Define the desired height of each legend item

    svg.selectAll("mydots")
    .data(personalityTraits)
    .enter()
    .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d, i) { return 100 + i * 25; })
    .attr("r", 7)
    .style("fill", function(d) { return colorScale(d.color); });
  
  // Add labels in the legend for each name
  svg.selectAll("mylabels")
    .data(personalityTraits)
    .enter()
    .append("text")
    .attr("x", 120)
    .attr("y", function(d, i) { return 100 + i * 25; })
    .text(function(d) { return d.name; })
    .attr("text-anchor", "left")
    .style("fill", "black") // Set the text color to black
    .style("alignment-baseline", "middle");

    svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0, ${height / 2 + 20})`)
      .selectAll("rect")
      .data(personalityTraits)
      .enter()
      .append("rect")
      .attr("x", 10)
      .attr("y", (d, i) => i * 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", (d) => colorScale(d.name)); // Use colorScale with trait name

    svg
      .selectAll(".legend-label")
      .data(personalityTraits)
      .enter()
      .append("text")
      .attr("class", "legend-label")
      .attr("x", 40)
      .attr("y", (d, i) => i * 30 + 15)
      .text((d) => d.name);
  };

  useEffect(() => {
    if (showResult) {
      createPieChart();
    }
  }, [showResult]);

  const handleResultClick = () => {
    setShowResult(true);
  };
  const handleEmailSubmit = () => {
    // Handle the email submission
    // You can perform validation, make an API call, etc.
    console.log(email);
    setShowModal(false);
    handleResultClick();
  };
  return (
    <>
      <div class="shadow-lg">
        <div class="flex flex-row items-center p-24 ">
          <img
            alt="logo"
            src="/logo.png"
            class="basis-1/4 w-[100px] h-[230px]"
          />
          <span className="basis-1/3"></span>
          <section class="basis-1/3">
            Welcome to our Personality Traits website! Here, you can discover
            fascinating insights about yourself and others through the
            exploration of various personality traits. Whether you're curious
            about your dominant traits or seeking to understand different
            personality types, our platform offers valuable rankings and
            descriptions to help you gain a deeper understanding of who you are.
            Embark on a journey of self-discovery and embrace the diversity of
            personalities that make our world so vibrant. Start exploring and
            unravel the intricacies of personality traits today!
          </section>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                handleScrollClick();
                setStartQuestionnaire(true);
              }}
              className="bg-blue-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div ref={scrollRef} class="h-100">
        {startQuestionnaire && userResponses.length !== questionnaire.length ? (
          <div class="flex justify-center items-center py-10 mx-10 ">
            {displayQuestionnaire()}
          </div>
        ) : (
          <>
            {displayPersonalityTraits()}
            {showModal ? null : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded hidden"
                onClick={() => setTransition(true)}
                disabled={transition}
              >
                Submit
              </button>
            )}
          </>
        )}
        {showModal && (
          <Dialog
            open={showModal}
            onClose={handleModalClose}
            fullWidth="md"
            maxWidth="md"
          >
            <DialogTitle>Send the insights on my email</DialogTitle>
            <DialogContent>
              <DialogContentText>Submit your email</DialogContentText>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEmailSubmit}>Send</Button>
              <Button onClick={handleModalClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
        {showResult && <div id="chart-container" />}
        {emailSent && <p>Thank you! Results will be sent to your email.</p>}
        <Button variant="contained" onClick={handleResultClick}>
          Show Results
        </Button>
      </div>
    </>
  );
};
