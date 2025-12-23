"use client";

import { Copyright } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Copyright className="mr-2 h-4 w-4" />
          <span>{year} Profolio. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
