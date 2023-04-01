import React, { useRef } from "react";
import { UrlPreviewContainer } from "./styles";

interface UrlPreviewProps {
  previewData: {
    metadata: {
      screenshot: string;
      url: string;
    };
    pageContent?: any;
  };
}

export const UrlPreview: React.FC<UrlPreviewProps> = ({ previewData }) => {
  const { metadata, pageContent } = previewData || {};
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <UrlPreviewContainer>
      {metadata.url && (
        <iframe
          src={metadata.url}
          title="Website preview"
          ref={iframeRef}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      )}
    </UrlPreviewContainer>
  );
};
