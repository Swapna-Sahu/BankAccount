import React, { useState } from "react";
import Chats from "../Chats/Chats";
//import { analyzeNextSteps } from "../../HelperFunctions/analyzeNextSteps";
//import "./Chatbot.scss";
const analyzeNextSteps = (step: number, userResponse: string) => {
    return step === 0
      ? {
          purpose: "specify field",
          message: `Nice to meet you, ${userResponse}! It looks like your our customer. Which area you are looking for help?`,
          options: ["Account", "Loans", "Other"]
        }
      : step === 1
      ? {
          purpose: "specify experience",
          message:
            "Ok! we will conect you with an expert in that field. Anything else you want to know?"
        }
      : step === 2
      ? {
          purpose: "end",
          message:
            "Thank you so much for spending time chatting with me. Bye!"
        }
      : {
          purpose: "bye",
          message: "Bye!"
        };
  };
  
  
interface ResponseBotObject {
  purpose: string;
  message: string;
  options?: string[];
  sender: string;
}

const Chatbot: React.FC = () => {
  const [userResponse, setUserResponse] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<ResponseBotObject>({
    purpose: "",
    message: "",
    sender: "bot"
  });
  const [sendUserResponse, setSendUserResponse] = useState<string>("");

  // setting next step when there's response and option click
  const setNextStep = (response: string) => {
    setStep(prevState => prevState + 1);
    setSendUserResponse(response);
    let res = analyzeNextSteps(step, response);
    setBotResponse({ ...res, sender: "bot" });
    setUserResponse("");
  };

  const optionClick = (e: React.MouseEvent<HTMLElement>) => {
    let option = e.currentTarget.dataset.id;
    if (option) {
      setNextStep(option);
    }
  };

  // event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResponse(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNextStep(userResponse);
  };

  return (
    <div className="chat-container">
      <Chats
        userResponse={userResponse}
        botResponse={botResponse}
        sendUserResponse={sendUserResponse}
        optionClick={optionClick}
      />
      <form onSubmit={e => handleSubmit(e)} className="form-container">
        <input
          onChange={e => handleInputChange(e)}
          value={userResponse}
        ></input>
        <button>
          <i className="far fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;