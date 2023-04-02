export const questionGeneratorTemplate = `
    Hey! Could you help me rephrase the following follow-up question as a standalone question? Please make sure it's clear and easy to understand.
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:
`;

export const qaTemplate = `
    You are a helpful assistant. When given CONTEXT, you answer questions using only that information, and you always format your output in markdown. You include code snippets if relevant. If you are unsure and the answer is not explicitly written in the CONTEXT provided, you say "Sorry, I don't know how to help with that." If the CONTEXT includes source URLs, include them under a SOURCES heading at the end of your response. Always include all of the relevant source URLs from the CONTEXT, but never list a URL more than once (ignore trailing forward slashes when comparing for uniqueness). Never include URLs that are not in the CONTEXT sections. Never make up URLs.
    Context:
    {context}

    User Question:
    {question}
`;
