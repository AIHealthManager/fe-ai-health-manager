import { useState, useRef, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar } from "~/components/ui/avatar"
import { Mic, MicOff, Send, User, Bot, Play, Pause, Loader2 } from "lucide-react"
import { cn } from "~/lib/utils"
import { ScrollArea } from "~/components/ui/scroll-area"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type: "text" | "voice"
  audioUrl?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI health assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = {}

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Reset audio playing state when audio ends
  useEffect(() => {
    const handleAudioEnd = () => setIsPlaying(null)

    Object.values(audioRefs.current).forEach((audio) => {
      audio.addEventListener("ended", handleAudioEnd)
    })

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.removeEventListener("ended", handleAudioEnd)
      })
    }
  }, [messages])

  // Handle sending a text message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  // Handle sending a voice message
  const handleSendVoiceMessage = async () => {
    if (!mediaBlobUrl) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: "Voice message",
      sender: "user",
      timestamp: new Date(),
      type: "voice",
      audioUrl: mediaBlobUrl,
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've received your voice message. How can I assist you with your health concerns?",
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      clearBlobUrl()
    }, 2000)
  }

  // Handle playing/pausing audio
  const toggleAudioPlayback = (messageId: string, audioUrl: string) => {
    if (!audioRefs.current[messageId]) {
      audioRefs.current[messageId] = new Audio(audioUrl)
    }

    const audioElement = audioRefs.current[messageId]

    if (isPlaying === messageId) {
      audioElement.pause()
      setIsPlaying(null)
    } else {
      // Pause any currently playing audio
      if (isPlaying) {
        audioRefs.current[isPlaying]?.pause()
      }

      audioElement.play()
      setIsPlaying(messageId)
    }
  }

  // Simple AI response generator
  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How are you feeling today?"
    } else if (lowerMessage.includes("headache")) {
      return "I'm sorry to hear you have a headache. How long have you been experiencing it? Is it accompanied by any other symptoms?"
    } else if (lowerMessage.includes("medication") || lowerMessage.includes("medicine")) {
      return "I can help you track your medications. Would you like to add a new medication to your health record?"
    } else if (lowerMessage.includes("appointment") || lowerMessage.includes("doctor")) {
      return "Would you like me to help you schedule a doctor's appointment or record details from a recent visit?"
    } else {
      return "I understand you're concerned about your health. Could you provide more details so I can assist you better?"
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Bot size={20} />
            AI Health Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.sender === "ai" && (
                        <Avatar className="h-8 w-8 bg-blue-100 border border-blue-200">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </Avatar>
                      )}

                      <div
                        className={cn(
                          "rounded-lg p-3",
                          message.sender === "user"
                            ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
                            : "bg-slate-100 text-slate-800",
                        )}
                      >
                        {message.type === "text" ? (
                          <p>{message.content}</p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 rounded-full p-0"
                              onClick={() => toggleAudioPlayback(message.id, message.audioUrl!)}
                            >
                              {isPlaying === message.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <div className="h-10 flex items-center">
                              <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full bg-white/80 rounded-full",
                                    isPlaying === message.id ? "animate-pulse" : "",
                                  )}
                                  style={{ width: isPlaying === message.id ? "100%" : "0%" }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>

                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 bg-teal-100 border border-teal-200">
                          <User className="h-4 w-4 text-teal-600" />
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[80%]">
                      <Avatar className="h-8 w-8 bg-blue-100 border border-blue-200">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </Avatar>
                      <div className="rounded-lg p-3 bg-slate-100 text-slate-800">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              {status === "recording" && (
                <div className="mb-2 flex items-center gap-2 text-sm text-red-500">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Recording... Click the microphone to stop and send.
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant={status === "recording" ? "destructive" : "outline"}
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    if (status === "recording") {
                      stopRecording()
                    } else {
                      startRecording()
                    }
                  }}
                >
                  {status === "recording" ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>

                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={status === "recording" || isLoading}
                />

                <Button
                  className="shrink-0 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                  size="icon"
                  onClick={() => {
                    if (mediaBlobUrl) {
                      handleSendVoiceMessage()
                    } else {
                      handleSendMessage()
                    }
                  }}
                  disabled={(inputValue.trim() === "" && !mediaBlobUrl) || status === "recording" || isLoading}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>

              {mediaBlobUrl && status !== "recording" && (
                <div className="mt-2 flex items-center gap-2 text-sm text-teal-600">
                  <Play className="h-4 w-4" />
                  Voice message ready to send
                  <Button variant="link" className="p-0 h-auto text-sm" onClick={() => clearBlobUrl()}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
