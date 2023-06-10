import emailjs from "emailjs-com";

export const personalityTraits = [
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

export const questionnaire = [
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

export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const sendEmail = (image, src, email) => {
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
