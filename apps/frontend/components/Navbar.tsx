"use client"; // Required for client-side scroll handling

import { Button } from "@mui/material";
import { Shapes } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 ml-25 lg:ml-30">
          <Shapes className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold ">Whiteboard</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="hidden md:block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Button
            className="bg-rose-500 hover:bg-rose-600 text-white"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
