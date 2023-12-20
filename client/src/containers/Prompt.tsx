import PieChart from "@/components/charts/PieChart";
import Message from "@/components/general/Message";
import ScrolledToBottomContainer from "@/components/general/ScrollToBottom";
import Input from "@/components/inputs/Input";
import { ConversationT, PropmptResponseT } from "@/types/conversations";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const Prompt = () => {
  const [socket, setSocket] = useState<Socket>();
  const [userPrompt, setUserPrompt] = useState("");
  const [conversations, setConversations] = useState<ConversationT[]>([]);
  const [responseInProgress, setResponseInProgress] = useState(false);

  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handler = (content: string) => {
      setConversations((prev) => {
        const conversations = [...prev];
        const length = conversations.length;
        conversations[length - 1] = {
          ...conversations[length - 1],
          message: conversations[length - 1].message + content,
        };
        return conversations;
      });
    };

    const handleResponseCompleted = (response: PropmptResponseT) => {
      const { emotions } = response;
      setConversations((prev) => {
        const conversations = [...prev];
        const length = conversations.length;
        conversations[length - 1] = { ...conversations[length - 1], emotions };
        return conversations;
      });
      setResponseInProgress(false);
    };

    socket.on("prompt-response", handler);
    socket.on("response-completed", handleResponseCompleted);

    return () => {
      socket.off("prompt-response", handler);
      socket.off("response-completed", handleResponseCompleted);
    };
  }, [socket]);

  const handlePrompt = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !socket) return;
    setResponseInProgress(true);
    setConversations((prev) => [
      ...prev,
      { type: "sent", message: userPrompt },
      { type: "received", message: "" },
    ]);
    socket.emit(
      "prompt",
      `
      Look at the short description and write a poem in 4 sentences or less.
      ${userPrompt}
    `
    );
    setUserPrompt("");
  };

  return (
    <div className="w-[90%] h-full max-w-5xl mx-auto py-10 flex flex-col justify-end">
      <ScrolledToBottomContainer className="overflow-auto ">
        <div className="flex flex-col gap-6 pb-10 overflow-hidden">
          <>
            {conversations.map((conversation, index) => (
              <AnimatePresence key={index}>
                {conversation.type === "sent" ? (
                  <motion.div
                    className="w-[70%] max-w-lg"
                    initial={{ opacity: 0, x: -100, y: 200 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -100, y: 200 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Message
                      key={index}
                      text={conversation.message}
                      type={conversation.type}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className="self-end w-[70%] max-w-lg"
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    transition={{ duration: 1 }}
                  >
                    <Message
                      key={index}
                      text={conversation.message}
                      type={conversation.type}
                    >
                      {conversation.emotions ? (
                        <PieChart data={conversation.emotions} />
                      ) : null}
                    </Message>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </>
        </div>
      </ScrolledToBottomContainer>
      <Input
        disabled={responseInProgress}
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        onKeyDown={handlePrompt}
      />
    </div>
  );
};

export default Prompt;
