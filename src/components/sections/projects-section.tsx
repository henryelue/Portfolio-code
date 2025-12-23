import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project Alpha",
    description: "A web application for project management, designed to improve team collaboration and productivity. Features include task tracking, real-time updates, and reporting.",
    image: PlaceHolderImages.find(p => p.id === 'project-1'),
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Beta",
    description: "A mobile app for personal finance management. It helps users track their expenses, create budgets, and achieve their financial goals through intuitive visualizations.",
    image: PlaceHolderImages.find(p => p.id === 'project-2'),
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Gamma",
    description: "An e-commerce platform with a focus on personalized user experience. Implemented A/B testing to increase conversion rates by 15%.",
    image: PlaceHolderImages.find(p => p.id === 'project-3'),
    liveUrl: "#",
    repoUrl: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-card py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            Here are some of the key projects I've worked on, showcasing my skills in product management and development.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {project.image && (
                <Image
                  src={project.image.imageUrl}
                  alt={project.image.description}
                  data-ai-hint={project.image.imageHint}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-end">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={project.repoUrl} aria-label="GitHub Repository">
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={project.liveUrl} aria-label="Live Demo">
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
