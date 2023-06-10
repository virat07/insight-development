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
import html2canvas from "html2canvas";
import emailjs from "emailjs-com";

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
  const [isValidEmail, setIsValidEmail] = useState(true);

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
      const delay = 500; // Delay in milliseconds (1 second)

      const timer = setTimeout(() => {
        if (currentQuestion < questionnaire.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowModal(true); // Open the email modal
        }
        setTransition(false);
      }, delay);

      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts or the transition changes
      };
    }
  }, [transition, currentQuestion, questionnaire.length]);

  const handleModalClose = () => {
    setEmailSent(false);
    setShowModal(false);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleEmailSubmit = (event) => {
    if (validateEmail(email)) {

      setShowModal(false);
      handleResultClick();
    //  setEmail(event.target.value);
      setEmailSent(true);
    } else {
      setEmailSent(false);
      setShowModal(false);
      setIsValidEmail(false);
    }
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

    const legendWidth = 200;
    const legendHeight = 30 * personalityTraits.length;
    const legendMargin = 20;

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${width - legendWidth - legendMargin}, ${
          height / 2 - legendHeight / 2
        })`
      );

    const legendItem = legend
      .selectAll(".legend-item")
      .data(personalityTraits)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 30})`);

    legendItem
      .append("circle")
      .attr("class", "legend-dot")
      .attr("cx", 10)
      .attr("cy", 5)
      .attr("r", 7)
      .style("fill", (d) => colorScale(d.name));

    legendItem
      .append("line")
      .attr("class", "legend-line")
      .attr("x1", 10)
      .attr("x2", 30)
      .attr("y1", 5)
      .attr("y2", 5)
      .style("stroke", (d) => colorScale(d.name))
      .style("stroke-width", 2);

    legendItem
      .append("text")
      .attr("class", "legend-label")
      .attr("x", 40)
      .attr("y", 9) // Adjust the y position for vertical alignment
      .text((d) => d.name);
  };

  const sendEmail = (image, src, email) => {
    emailjs
      .send(
        "service_26xm8be",
        "template_lb9v2ul",
        {
          contentID: src,
          htmlBody:
            '<html><body>this is an <img src="cid:' +
            src +
            '"> embedded picture.</body></html>',
          to_email: email,
          insights: image,
        },
        "HiVn_9D3ex98vxf7u"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  useEffect(() => {
    if (showResult) {
      createPieChart();
      const graphContainer = document.getElementById("chart-container");
      const scaleFactor = 0.5;
      graphContainer.style.transform = `scale(${scaleFactor})`;
      html2canvas(graphContainer)
        .then((canvas) => {
          // Convert the canvas to a data URL
          const dataUrl = canvas.toDataURL("image/png");

          // Create a new image element
          const image = new Image();
          image.src = dataUrl;
          console.log(image);
          sendEmail(image, dataUrl, email);
          // Append the image to the DOM or attach it to the email
          // ...
          graphContainer.style.transform = "scale(1)";
        })
        .catch((error) => {
          console.error("Error converting graph to image:", error);
        });
    }
  }, [showResult]);

  const handleResultClick = () => {
    setShowResult(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div class="shadow-lg bg-[#6C757D]">
        <div className="flex items-center p-24">
          <img alt="logo" src="/logo.png" className="w-1/4 h-[230px]" />
          <span className="w-1/4" />
          <section className="w-2/4 ">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to our Personality Traits website!
            </h1>

            <p className="text-left p-2">
              Here, you can discover fascinating insights about yourself and
              others through the exploration of various personality traits.
              Whether you're curious about your dominant traits or seeking to
              understand different personality types, our platform offers
              valuable rankings and descriptions to help you gain a deeper
              understanding of who you are. Embark on a journey of
              self-discovery and embrace the diversity of personalities that
              make our world so vibrant. Start exploring and unravel the
              intricacies of personality traits today!
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
      </div>
      {showResult && (
        <div
          className="flex justify-center items-center"
          id="chart-container"
        />
      )}
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
                className="bg-[#ADB5BD] hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded hidden"
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
                error={!isValidEmail}
                helperText={!isValidEmail && "Invalid email format"}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleEmailSubmit}
                className="bg-[#ADB5BD] hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                Send
              </Button>
              {/* <Button
                onClick={handleModalClose}
                className="bg-[#ADB5BD] hover:bg-red-800 text-white font-bold py-2 px-4 mt-4 rounded"
              >
                Cancel
              </Button> */}
            </DialogActions>
          </Dialog>
        )}

        {emailSent && (
          <p className="bg-[#212529] text-[#fff]">
            Thank you! Results will be sent to your email.
          </p>
        )}
      </div>
    </>
  );
};
