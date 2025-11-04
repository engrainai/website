import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";
import waveformImage from "@assets/generated_images/AI_voice_waveform_visualization_a2482147.png";

interface VoiceSampleCardProps {
  name: string;
  description: string;
  voiceType: string;
}

function VoiceSampleCard({ name, description, voiceType }: VoiceSampleCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid={`card-voice-${name.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start gap-4">
        <Button
          size="icon"
          variant={isPlaying ? "default" : "outline"}
          onClick={togglePlay}
          className="shrink-0"
          data-testid={`button-play-${name.toLowerCase().replace(/\s/g, '-')}`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
              {voiceType}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          <div className="relative h-12 rounded-md overflow-hidden bg-muted/30">
            <img 
              src={waveformImage} 
              alt="Voice waveform" 
              className={`w-full h-full object-cover transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-50'}`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-primary/10 animate-pulse" />
            )}
          </div>
        </div>
        
        <Volume2 className="w-5 h-5 text-muted-foreground shrink-0" />
      </div>
    </Card>
  );
}

export function VoiceSamples() {
  const samples = [
    {
      name: "Professional Sarah",
      description: "Clear, articulate voice perfect for corporate environments and professional services.",
      voiceType: "Professional"
    },
    {
      name: "Friendly Marcus",
      description: "Warm and welcoming tone ideal for hospitality, retail, and customer-focused businesses.",
      voiceType: "Friendly"
    },
    {
      name: "Energetic Alexa",
      description: "Upbeat and enthusiastic voice that brings energy to fitness, events, and dynamic brands.",
      voiceType: "Energetic"
    },
    {
      name: "Calm Thomas",
      description: "Soothing and reassuring tone perfect for healthcare, wellness, and service industries.",
      voiceType: "Calm"
    }
  ];

  return (
    <section id="voices" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Experience Our AI Voice Receptionist
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from a variety of professional voices tailored to match your brand's personality and customer expectations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {samples.map((sample) => (
            <VoiceSampleCard key={sample.name} {...sample} />
          ))}
        </div>
      </div>
    </section>
  );
}
