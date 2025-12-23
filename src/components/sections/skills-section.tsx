"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const skillsData = [
  { skill: "Product Strategy", level: 90 },
  { skill: "Agile/Scrum", level: 95 },
  { skill: "User Research", level: 85 },
  { skill: "Data Analysis", level: 80 },
  { skill: "Roadmapping", level: 90 },
  { skill: "A/B Testing", level: 75 },
  { skill: "SQL", level: 70 },
  { skill: "JIRA", level: 95 },
];

const chartConfig = {
  level: {
    label: "Proficiency",
    color: "hsl(var(--primary))",
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            My Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-xl">
            A blend of technical, strategic, and user-focused skills to deliver impactful products.
          </p>
        </div>
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Proficiency</CardTitle>
              <CardDescription>Visualizing my strengths across key product management areas.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="skill"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "hsl(var(--foreground))", fontSize: 14 }}
                      width={120}
                    />
                    <ChartTooltip
                      cursor={{ fill: 'hsl(var(--card))' }}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar dataKey="level" fill="var(--color-level)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
