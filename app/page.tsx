"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, position, feedback }),
      });
      const data = await res.json();

      if (res.ok) {
        // Clear all inputs
        setEmail("");
        setPosition("");
        setFeedback("");

        // Show success toast
        toast({
          title: "Success!",
          description: data.message,
          variant: "success",
        });
      } else {
        // Show error toast
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[1024px] bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-transparent"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 flex justify-between items-center">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white">
              Level Up Your Table Tennis Club with Choley!
            </h1>
            <p className="mb-8 text-xl text-gray-200">
              Seamlessly manage players, organize tournaments, and track
              results—all in one place.
            </p>
            <div className="flex max-w-md gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-white/90 border-none text-sm"
              />
              <Button
                onClick={handleSubmit}
                className="!rounded-button bg-red-600 hover:bg-red-700 whitespace-nowrap"
              >
                Join Waitlist
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Be among the first clubs to experience Choley
            </p>
          </div>
          <div className="relative w-[300px] h-[600px]">
            <div className="absolute inset-0 bg-black rounded-[32px] shadow-2xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[20px]"></div>
              <div className="absolute inset-[8px] bg-black rounded-[24px] overflow-hidden">
                <Image
                  src="/app-screenshot.png"
                  alt="Choley App Screenshot"
                  className="h-full w-full object-cover"
                  width={284}
                  height={584}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Club
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools designed specifically for table tennis clubs
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <i
                  className={`${feature.icon} text-3xl text-blue-950 mb-4`}
                ></i>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* How It Works */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <div className="mx-auto h-16 w-16 rounded-full bg-blue-950 flex items-center justify-center">
                    <i className={`${step.icon} text-2xl text-white`}></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-blue-950 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Ready to Transform Your Club?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
                Join the waitlist today and get early access to Choley when we
                launch.
              </p>
              <div className="mt-8 flex flex-col max-w-md mx-auto gap-4">
                <div className="flex gap-4">
                  <Textarea
                    placeholder="We appreciate any features you're interested or any feedback"
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                    rows={6}
                    className="bg-white/90 border-none text-sm"
                  />
                </div>
                <div className="flex gap-4">
                  {/* <div className="relative flex-1"> */}
                  <Select
                    onValueChange={(value) => setPosition(value)}
                    value={position}
                  >
                    <SelectTrigger className="w-full justify-between bg-white/90 border-none text-sm text-gray-900">
                      <SelectValue placeholder="Select your position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="player">Player</SelectItem>
                      <SelectItem value="admin">Club Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* </div> */}
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="bg-white/90 border-none text-sm"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="!rounded-button bg-red-600 hover:bg-red-700 whitespace-nowrap self-center"
                >
                  Join Waitlist
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <div className="flex items-center">
                  <i className="fas fa-lock text-green-400 mr-2"></i>
                  <span className="text-white">Enterprise-grade Security</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-bolt text-yellow-400 mr-2"></i>
                  <span className="text-white">Lightning Fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "fas fa-users",
    title: "Club & Player Management",
    description:
      "Easily manage memberships, track player progress, and handle administrative tasks.",
  },
  {
    icon: "fas fa-trophy",
    title: "Tournament Organizer",
    description:
      "Create and manage tournaments with automated brackets and real-time updates.",
  },
  {
    icon: "fas fa-chart-line",
    title: "Match Results Tracking",
    description:
      "Record scores, track statistics, and analyze performance metrics.",
  },
  {
    icon: "fas fa-tachometer-alt",
    title: "Admin Dashboard",
    description:
      "Comprehensive overview of club activities, members, and tournament data.",
  },
];
const steps = [
  {
    icon: "fas fa-plus-circle",
    title: "Create Your Club",
    description:
      "Set up your club profile and invite members to join your digital community.",
  },
  {
    icon: "fas fa-gamepad",
    title: "Run Tournaments",
    description:
      "Organize competitions and let players submit their match results.",
  },
  {
    icon: "fas fa-sync",
    title: "Sync & Report",
    description:
      "Generate detailed reports and sync with official rating systems.",
  },
];
