import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, CalendarDays, Clock, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Conservative share of repetitive work that AI tools can typically streamline
const TIME_SAVED_RATE = 0.3;
const WORK_WEEKS_PER_YEAR = 50;

interface SliderFieldProps {
  label: string;
  display: string;
  value: number;
  min: number;
  max: number;
  step: number;
  marks: string[];
  onChange: (value: number) => void;
}

function SliderField({ label, display, value, min, max, step, marks, onChange }: SliderFieldProps) {
  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <Label className="text-base font-medium">{label}</Label>
        <span className="text-2xl font-bold text-primary">{display}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="py-4"
      />
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        {marks.map((mark) => (
          <span key={mark}>{mark}</span>
        ))}
      </div>
    </div>
  );
}

interface TimeBackCalculatorProps {
  onGetStarted?: () => void;
}

export function TimeBackCalculator({ onGetStarted }: TimeBackCalculatorProps) {
  const [teamSize, setTeamSize] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const calculations = useMemo(() => {
    const weeklyHoursSaved = teamSize * hoursPerWeek * TIME_SAVED_RATE;
    const annualHoursSaved = weeklyHoursSaved * WORK_WEEKS_PER_YEAR;
    const annualValue = annualHoursSaved * hourlyCost;

    return { weeklyHoursSaved, annualHoursSaved, annualValue };
  }, [teamSize, hoursPerWeek, hourlyCost]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatHours = (value: number): string => {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
  };

  const results = [
    {
      icon: Clock,
      label: "Hours Back Per Week",
      value: formatHours(calculations.weeklyHoursSaved),
      suffix: "hrs",
    },
    {
      icon: CalendarDays,
      label: "Hours Back Per Year",
      value: formatHours(calculations.annualHoursSaved),
      suffix: "hrs",
    },
    {
      icon: DollarSign,
      label: "Estimated Annual Value of That Time",
      value: formatCurrency(calculations.annualValue),
      suffix: "/year",
    },
  ];

  return (
    <section id="calculator" className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-primary shrink-0" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              How Much Time Could AI Give Back?
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Estimate the hours and dollars your team could reclaim by letting AI handle repetitive work.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Inputs */}
              <div className="space-y-8">
                <SliderField
                  label="People on Your Team"
                  display={String(teamSize)}
                  value={teamSize}
                  min={1}
                  max={50}
                  step={1}
                  marks={["1", "25", "50"]}
                  onChange={setTeamSize}
                />
                <SliderField
                  label="Hours Per Person on Repetitive Tasks (Weekly)"
                  display={String(hoursPerWeek)}
                  value={hoursPerWeek}
                  min={0}
                  max={40}
                  step={1}
                  marks={["0", "20", "40"]}
                  onChange={setHoursPerWeek}
                />
                <SliderField
                  label="Average Hourly Cost"
                  display={formatCurrency(hourlyCost)}
                  value={hourlyCost}
                  min={10}
                  max={150}
                  step={5}
                  marks={["$10", "$80", "$150"]}
                  onChange={setHourlyCost}
                />

                <p className="text-sm text-muted-foreground">
                  This estimate assumes AI can streamline about 30% of repetitive work like email, data
                  entry, scheduling, and reporting. Every business is different, and we'll help you find
                  your real numbers.
                </p>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${teamSize}-${hoursPerWeek}-${hourlyCost}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {results.map(({ icon: Icon, label, value, suffix }) => (
                      <Card key={label} className="p-5 bg-background/80 border-primary/30">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{label}</p>
                            <p className="text-3xl font-bold text-primary">
                              {value}
                              <span className="text-base font-normal text-muted-foreground"> {suffix}</span>
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {onGetStarted && (
                  <Button size="lg" className="w-full mt-4" onClick={onGetStarted}>
                    Find My Real Time Savings
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
