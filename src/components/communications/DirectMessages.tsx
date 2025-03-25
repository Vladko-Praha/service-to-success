
import React from "react";
import RealtimeDirectMessages from "./RealtimeDirectMessages";

const DirectMessages = ({ selectedMessageId }: { selectedMessageId: string | null }) => {
  return <RealtimeDirectMessages selectedMessageId={selectedMessageId} />;
};

export default DirectMessages;
