'use server';

/**
 * @fileOverview Resume generation flow that tailors a resume to a specific job application.
 *
 * - generateResume - A function to generate a customized resume.
 * - ResumeInput - The input type for the generateResume function.
 * - ResumeOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description for which the resume is being tailored.'),
  resumeText: z.string().describe('The current resume text to be customized.'),
});
export type ResumeInput = z.infer<typeof ResumeInputSchema>;

const ResumeOutputSchema = z.object({
  customizedResume: z
    .string()
    .describe('The customized resume tailored to the job description.'),
});
export type ResumeOutput = z.infer<typeof ResumeOutputSchema>;

export async function generateResume(input: ResumeInput): Promise<ResumeOutput> {
  return resumeGenerationFlow(input);
}

const resumePrompt = ai.definePrompt({
  name: 'resumePrompt',
  input: {schema: ResumeInputSchema},
  output: {schema: ResumeOutputSchema},
  prompt: `You are an expert resume writer. You will be provided with a job description and a resume.
Your task is to customize the resume to match the job description, highlighting the most relevant skills and experience.

Job Description: {{{jobDescription}}}

Resume:
{{{resumeText}}}

Customized Resume:`,
});

const resumeGenerationFlow = ai.defineFlow(
  {
    name: 'resumeGenerationFlow',
    inputSchema: ResumeInputSchema,
    outputSchema: ResumeOutputSchema,
  },
  async input => {
    const {output} = await resumePrompt(input);
    return output!;
  }
);
