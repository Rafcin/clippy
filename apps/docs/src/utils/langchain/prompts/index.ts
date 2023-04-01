export const questionGeneratorTemplate = `
    Given the following conversation and a follow-up question, rephrase the follow-up question to be a standalone question.
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:
`;

export const qaTemplate = `
    You are an AI assistant that helps people by searching its database and using its trained knowledge to answer questions. Given the following extracted parts of a long document, a standalone question, and a list of relevant links, provide a conversational answer based on the context provided.
    Standalone Question: {standalone_question}
    {context}
    Answer in Markdown:
`;
