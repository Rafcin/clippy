import React, { useRef } from "react";
import { UrlPreviewContainer } from "./styles";

interface UrlPreviewProps {
  url: string;
}

export const UrlPreview: React.FC<UrlPreviewProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <UrlPreviewContainer>
      {url && (
        <iframe
          src={url}
          title="Website preview"
          ref={iframeRef}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
      )}
    </UrlPreviewContainer>
  );
};
