import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ROICalculatorProps {
  onGetQuote?: () => void;
}

export function ROICalculator({ onGetQuote }: ROICalculatorProps) {
  const [missedCalls, setMissedCalls] = useState(20);
  const [avgTransaction, setAvgTransaction] = useState(500);

  const calculations = useMemo(() => {
    const closeRate = 0.30; // 30% of leads convert
    const recoveryRate = 0.62; // 62% recovery with AI

    const monthlyLost = missedCalls * avgTransaction * closeRate;
    const annualLost = monthlyLost * 12;
    const monthlyRecoverable = monthlyLost * recoveryRate;
    const annualRecoverable = annualLost * recoveryRate;

    return {
      monthlyLost,
      annualLost,
      monthlyRecoverable,
      annualRecoverable,
    };
  }, [missedCalls, avgTransaction]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Calculate Your Lost Revenue
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how much revenue you could be leaving on the table from missed calls and unanswered leads.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Inputs */}
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-medium">Missed Calls Per Month</Label>
                    <span className="text-2xl font-bold text-primary">{missedCalls}</span>
                  </div>
                  <Slider
                    value={[missedCalls]}
                    onValueChange={(value) => setMissedCalls(value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-medium">Average Transaction Value</Label>
                    <span className="text-2xl font-bold text-primary">{formatCurrency(avgTransaction)}</span>
                  </div>
                  <Slider
                    value={[avgTransaction]}
                    onValueChange={(value) => setAvgTransaction(value[0])}
                    min={100}
                    max={5000}
                    step={50}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>$100</span>
                    <span>$2,500</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Based on industry average: 30% close rate on inbound leads
                </p>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${missedCalls}-${avgTransaction}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Monthly Lost */}
                    <Card className="p-5 bg-background/80 border-destructive/30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Monthly Revenue Lost</p>
                          <p className="text-3xl font-bold text-destructive">
                            {formatCurrency(calculations.monthlyLost)}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Annual Lost */}
                    <Card className="p-5 bg-background/80 border-destructive/30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <DollarSign className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Annual Revenue Lost</p>
                          <p className="text-3xl font-bold text-destructive">
                            {formatCurrency(calculations.annualLost)}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Recovery Potential */}
                    <Card className="p-5 bg-primary/10 border-primary/30">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Potential Recovery with Engrain AI
                          </p>
                          <p className="text-3xl font-bold text-primary">
                            {formatCurrency(calculations.annualRecoverable)}
                            <span className="text-base font-normal text-muted-foreground">/year</span>
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Based on 62% recovery rate
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatePresence>

                {onGetQuote && (
                  <Button
                    size="lg"
                    className="w-full mt-4"
                    onClick={onGetQuote}
                  >
                    Start Recovering Revenue
                    <TrendingUp className="ml-2 w-5 h-5" />
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
