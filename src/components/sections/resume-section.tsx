"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateCustomizedResume } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? "Generating..." : "Generate Resume"}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function ResumeSection() {
  const [state, formAction] = useFormState(generateCustomizedResume, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.customizedResume) {
        toast({
            title: "Success!",
            description: "Your customized resume has been generated.",
        });
    } else if (state.message && (state.errors || !state.customizedResume)) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
        });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (state.customizedResume) {
      navigator.clipboard.writeText(state.customizedResume);
      toast({
        title: "Copied to clipboard!",
        description: "Your customized resume has been copied.",
      });
    }
  };

  return (
    <section id="resume" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            AI-Powered Resume Tailor
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            Paste a job description and your resume to get a tailored version in seconds.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Provide the details for customization.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste the job description here..."
                    className="min-h-[150px]"
                    required
                  />
                  {state.errors?.jobDescription && (
                    <p className="text-sm text-destructive">{state.errors.jobDescription[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resumeText">Your Resume</Label>
                  <Textarea
                    id="resumeText"
                    name="resumeText"
                    placeholder="Paste your current resume text here..."
                    className="min-h-[250px]"
                    required
                  />
                  {state.errors?.resumeText && (
                    <p className="text-sm text-destructive">{state.errors.resumeText[0]}</p>
                  )}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Customized Resume</CardTitle>
              <CardDescription>Your tailored resume will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              {state.customizedResume ? (
                <div className="relative flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10"
                    onClick={handleCopy}
                    aria-label="Copy resume"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Textarea
                    readOnly
                    value={state.customizedResume}
                    className="h-full w-full resize-none bg-background"
                  />
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <Sparkles className="mx-auto mb-2 h-8 w-8" />
                    <p>Awaiting generation...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
