import Markdown from "@/content/markdown";
import { api } from "@/trpc/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box } from "@mui/material";
import { Pulse } from "@oxygen/design-system";
import {
  AIChatMessage,
  BaseChatMessage,
  HumanChatMessage,
} from "langchain/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ChatBody,
  ChatButton,
  ChatContainer,
  ChatMain,
  ChatTextarea,
} from "./styles";

const chatSchema = z.object({
  question: z.string(),
});

interface ChatData {
  question: string;
}

export default function Chat() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChatData>({
    resolver: zodResolver(chatSchema),
  });

  const [msgs, setMsgs] = useState<BaseChatMessage[]>([
    new AIChatMessage("Hi there how can I help you?"),
  ]);

  // TRPC mutation
  const clippyQuery = api.clippy.query.useMutation({
    onSuccess: (data) => {
      console.log("data", data);
      setMsgs([...msgs, new AIChatMessage(data.output)]);
      console.log("msgs", msgs);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  async function onSubmit(data: ChatData) {
    const { question } = data;
    if (!question) {
      alert("Please input a question");
      return;
    }
    setMsgs([...msgs, new HumanChatMessage(question)]);
    // Clear the input field
    setValue("question", "");
    await clippyQuery.mutateAsync({ question, history: msgs });
  }

  return (
    <>
      <Box>
        <ChatContainer>
          <ChatMain>
            <ChatBody>
              <Box sx={{ width: "100%", height: "100%" }}>
                {msgs.map((message: BaseChatMessage, index: number) => {
                  const isAi = Boolean(message._getType() === "ai");
                  return (
                    <Box
                      key={index}
                      sx={(theme: any) => ({
                        display: "flex",

                        width: "100%",
                        padding: "1.5rem",
                        color: theme?.vars.palette.text?.primary,
                        borderBottom: `1px solid ${theme?.vars.palette.background?.backgroundHighlight}`,
                        ...(isAi
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
                          {isAi ? "🤖" : "🧑"}
                        </Avatar>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Markdown children={message.text} />
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
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <ChatTextarea
                    disabled={clippyQuery.isLoading}
                    autoFocus={false}
                    rows={1}
                    maxLength={512}
                    placeholder={
                      clippyQuery.isLoading
                        ? "Waiting for response..."
                        : "Send a message..."
                    }
                    {...register("question")}
                  />
                  <ChatButton type="submit" disabled={clippyQuery.isLoading}>
                    {clippyQuery.isLoading ? (
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
