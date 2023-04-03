import Markdown from "@/content/markdown";
import { api } from "@/trpc/api";
import { Message } from "@/types/openai";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Avatar, Box, Button } from "@mui/material";
import { Pulse } from "@oxygen/design-system";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChatBody,
  ChatButton,
  ChatContainer,
  ChatMain,
  ChatTextarea,
} from "./styles";

export default function Chat() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
  }>({
    messages: [
      {
        message: "Hi there how can I help you?",
        type: "apiMessage",
      },
    ],
    history: [],
  });
  const [error, setError] = useState<boolean>(false); // new error state

  const { messages, pending, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  // TRPC mutation
  const clippyQuery = api.clippy.query.useMutation();

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!query) {
      alert("Please input a question");
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: "userMessage",
          message: question,
        },
      ],
      pending: undefined,
    }));

    setLoading(true);
    setQuery("");

    try {
      const response = await clippyQuery.mutateAsync({ question, history });
      console.log("response", response);
      setMessageState((state) => ({
        history: [...state.history, [question, response.text]], // update to use response.data.text
        messages: [
          ...state.messages,
          {
            type: "apiMessage",
            message: response.text, // update to use response.data.text
          },
        ],
        pending: undefined,
      }));
      setError(false); // reset error state if there is no error
    } catch (error) {
      console.log("error", error);
      setError(true); // set error state to true
    } finally {
      setLoading(false);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === "Enter" && query) {
      handleSubmit(e);
    } else if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  const chatMessages = useMemo(() => {
    return [
      ...messages,
      ...(pending ? [{ type: "apiMessage", message: pending }] : []),
    ];
  }, [messages, pending]);

  return (
    <>
      <Box>
        <ChatContainer>
          <ChatMain>
            <ChatBody>
              <Box ref={messageListRef} sx={{ width: "100%", height: "100%" }}>
                {chatMessages.map((message, index) => {
                  return (
                    <Box
                      key={index}
                      sx={(theme: any) => ({
                        display: "flex",

                        width: "100%",
                        padding: "1.5rem",
                        color: theme?.vars.palette.text?.primary,
                        borderBottom: `1px solid ${theme?.vars.palette.background?.backgroundHighlight}`,
                        ...(message.type === "apiMessage"
                          ? {
                              backgroundColor:
                                theme?.vars.palette.background
                                  ?.backgroundContrast,
                            }
                          : {
                              backgroundColor:
                                theme?.vars.palette.background?.backgroundLight,
                            }),
                      })}
                    >
                      <Box
                        sx={{
                          marginRight: "10px",
                        }}
                      >
                        <Avatar
                          alt="API"
                          sx={(theme: any) => ({
                            backgroundColor: theme?.vars.palette.primary?.main,
                          })}
                        >
                          {message.type === "apiMessage" ? "🤖" : "🧑"}
                        </Avatar>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Markdown children={message.message} />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </ChatBody>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: "2rem 0",
                flexDirection: "column",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <ChatTextarea
                    disabled={loading}
                    onKeyDown={handleEnter}
                    ref={textAreaRef}
                    autoFocus={false}
                    rows={1}
                    maxLength={512}
                    id="userInput"
                    name="userInput"
                    placeholder={
                      loading ? "Waiting for response..." : "Send a message..."
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <ChatButton type="submit" disabled={loading}>
                    {loading ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "0.2rem",
                          right: "0.25rem",
                        }}
                      >
                        <Pulse />
                      </Box>
                    ) : (
                      // Send icon SVG in input field
                      <Box
                        component="svg"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        sx={{
                          transform: "rotate(90deg)",
                          width: "1.2em",
                          height: "1.2em",
                          fill: "currentColor",
                        }}
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </Box>
                    )}
                  </ChatButton>
                </Box>
              </Box>
            </Box>
          </ChatMain>
        </ChatContainer>
      </Box>
    </>
  );
}
