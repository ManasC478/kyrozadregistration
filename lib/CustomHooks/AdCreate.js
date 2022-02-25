import { useState, useContext, createContext } from "react";

const adCreateContext = createContext();

export const CreateAdProvider = ({ children }) => {
  const adCreate = useAdCreateProvider();
  return (
    <adCreateContext.Provider value={adCreate}>
      {children}
    </adCreateContext.Provider>
  );
};

export const useAdCreate = () => {
  return useContext(adCreateContext);
};

const useAdCreateProvider = () => {
  const [name, setName] = useState("");
  const [format, setFormat] = useState("");
  const [media, setMedia] = useState(null);
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [callToAction, setCallToAction] = useState("No Button");

  return {
    name,
    setName,
    format,
    setFormat,
    media,
    setMedia,
    headline,
    setHeadline,
    description,
    setDescription,
    link,
    setLink,
    callToAction,
    setCallToAction,
  };
};
