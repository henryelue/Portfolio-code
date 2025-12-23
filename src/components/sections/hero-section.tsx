import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');

export default function HeroSection() {
  return (
    <section id="profile" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
              Henry Elue
            </h1>
            <h2 className="mt-2 text-2xl font-medium text-foreground/90 md:text-3xl">
              Product Manager
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
            Product Manager with 3+ years of experience delivering B2B and B2C software products and platforms. Strong track record of turning complex problems into clear roadmaps, shipped features, and measurable results for both businesses and end users. Skilled in product discovery, data-informed prioritization, and collaborating with cross-functional teams across Engineering, Design, Sales, and Customer Success. 
            </p>
            <div className="mt-6 flex gap-4">
              <Button asChild>
                <Link href="#contact">Get in Touch</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="#projects">View Projects</Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center space-x-4 md:justify-start">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="order-first flex items-center justify-center md:order-last">
            {profileImage && (
              <Image
                src={profileImage.imageUrl}
                alt={profileImage.description}
                data-ai-hint={profileImage.imageHint}
                width={400}
                height={400}
                className="h-64 w-64 rounded-full border-4 border-primary/20 object-cover shadow-lg md:h-96 md:w-96"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
