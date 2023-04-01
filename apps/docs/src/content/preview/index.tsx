import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { UrlPreviewContainer } from "./styles";

interface UrlPreviewProps {
  previewData: {
    screenshot: string;
    websiteUrl: string;
    pageContent?: { text: string; element: HTMLElement }[] | null;
  };
}

export const UrlPreview: React.FC<UrlPreviewProps> = ({ previewData }) => {
  const { screenshot, websiteUrl, pageContent } = previewData || {};
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const highlightText = (text: string, element: HTMLElement) => {
      if (element) {
        const innerText = element.innerText;
        if (innerText && innerText.includes(text)) {
          const regex = new RegExp(text, "g");
          element.innerHTML = innerText.replace(
            regex,
            `<span style="background-color: #FFFF00;">${text}</span>`
          );
        }
      }
    };

    if (pageContent && pageContent.length > 0 && iframeRef.current) {
      pageContent.forEach(({ text, element }) => highlightText(text, element));
    }
  }, [pageContent]);

  return (
    <UrlPreviewContainer>
      {websiteUrl && (
        <iframe
          src={websiteUrl}
          title="Website preview"
          ref={iframeRef}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      )}
      {pageContent && pageContent?.length > 0 && (
        <div>
          <h4>Scraped content:</h4>
          {pageContent.map(({ text }, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      )}
    </UrlPreviewContainer>
  );
};
