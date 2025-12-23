"use server";

import { z } from "zod";
import { generateResume, type ResumeInput } from "@/ai/flows/resume-generation";

const resumeSchema = z.object({
  jobDescription: z.string().min(50, "Job description should be at least 50 characters."),
  resumeText: z.string().min(100, "Resume text should be at least 100 characters."),
});

interface ResumeState {
  message: string;
  customizedResume?: string;
  errors?: {
    jobDescription?: string[];
    resumeText?: string[];
  };
}

export async function generateCustomizedResume(
  prevState: ResumeState,
  formData: FormData
): Promise<ResumeState> {
  const validatedFields = resumeSchema.safeParse({
    jobDescription: formData.get("jobDescription"),
    resumeText: formData.get("resumeText"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const resumeInput: ResumeInput = {
      jobDescription: validatedFields.data.jobDescription,
      resumeText: validatedFields.data.resumeText,
    };
    const result = await generateResume(resumeInput);
    return {
      message: "Resume generated successfully!",
      customizedResume: result.customizedResume,
    };
  } catch (error) {
    console.error("AI Error:", error);
    return {
      message: "An error occurred while generating the resume. Please try again.",
    };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

interface ContactState {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success?: boolean;
}

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
    const validatedFields = contactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!validatedFields.success) {
        return {
            message: "Validation failed. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }
    
    // In a real application, you would send an email or save to a database here.
    // For this example, we'll just log the data and simulate a successful submission.
    console.log("Contact form submitted:", validatedFields.data);

    return {
        message: "Thank you for your message! I'll get back to you soon.",
        success: true,
    };
}
