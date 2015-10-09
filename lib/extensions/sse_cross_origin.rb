silence_warnings do
  SseRailsEngine::Connection::SSE_HEADER = [
    "HTTP/1.1 200 OK\r\n",
    "Content-Type: text/event-stream\r\n",
    "Cache-Control: no-cache, no-store\r\n",
    "Connection: close\r\n",
    "Access-Control-Allow-Origin: #{Rails.application.config.samson.uri}\r\n",
    "Access-Control-Allow-Credentials: true\r\n",
    "\r\n"
  ].join.freeze
end
