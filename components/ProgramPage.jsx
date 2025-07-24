"use client";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { ArrowRight, Clock, Users, CheckCircle, MapPin } from "lucide-react";
import { trainingData } from "@/data/trainingData";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const ProgramPage = ({ params }) => {
  const [program, setProgram] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Redirect logged-in users to dashboard version if not already there
  useEffect(() => {
    if (status === "authenticated" && pathname.startsWith("/training/")) {
      router.replace(`/dashboard${pathname}`);
    }
  }, [status, pathname, router]);

  // Find the program from the data
  useEffect(() => {
    if (params?.program) {
      const fetchedProgram = findProgramBySlug(params.program);
      setProgram(fetchedProgram);
    }
  }, [params]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Program not found</h1>
      </div>
    );
  }

  const handleJoinClick = () => {
    if (!session) {
      // User is not logged in, redirect to login page with callbackUrl and programTitle
      const currentPath = window.location.pathname;
      const callbackUrl = `${currentPath}`;
      // You can add extra params to callbackUrl if needed
      signIn(undefined, { callbackUrl });
      return;
    }
    // User is logged in, proceed with normal flow
    proceedToJoin();
  };

  const proceedToJoin = () => {
    // Determine if the program is from online or offline category
    const mode = program.mode?.includes("online") ? "online" : "offline";

    // Determine if it's group or one-on-one based on program type
    const type = program.id.toLowerCase().includes("group")
      ? "group"
      : "one-on-one";

    // Create the URL with query parameters
    const queryParams = new URLSearchParams({
      mode: mode,
      type: type,
      program: slugify(program.title),
    }).toString();

    window.location.href = `/join/${queryParams}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div>
          <div className="relative h-64">
            <Image
              src={program.image}
              alt={program.title}
              fill
              width={500}
              height={300}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
              <p className="text-gray-600">{program.fullDescription}</p>
            </div>

            {/* Program Structure Section */}
            {program.program_structure && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-purple-600">
                  Program Structure
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(program.program_structure).map(
                    ([phaseKey, phase]) => (
                      <div
                        key={phaseKey}
                        className="bg-purple-50 rounded-xl p-6 border-2 border-purple-100"
                      >
                        {/* Existing phase content structure */}
                        {phase && (
                          <div>
                            <div className="font-bold text-lg mb-2">
                              {phase.title}
                            </div>
                            <div className="text-gray-700 mb-2">
                              {phase.description}
                            </div>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-purple-500" />
                                <span>{phase.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-purple-500" />
                                <span>{phase.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-500" />
                                <span>{phase.participants}</span>
                              </div>
                            </div>
                            {phase.sessions && (
                              <div className="mt-2">
                                <div className="font-semibold">Sessions:</div>
                                <div className="flex gap-4">
                                  <div>
                                    <span className="font-medium">Total: </span>
                                    <span>{phase.sessions.total}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Guided: </span>
                                    <span>{phase.sessions.guided}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Benefits, Schedule, and Ideal For sections grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <h4 className="text-lg font-bold">Key Benefits</h4>
                </div>
                <ul className="space-y-3">
                  {program.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <h4 className="text-lg font-bold">Schedule</h4>
                </div>
                <div className="space-y-3">
                  {Object.entries(program.schedule_details).map(
                    ([key, value]) => (
                      <div key={key}>
                        <span className="font-semibold capitalize">
                          {key.replace("_", " ")}: {" "}
                        </span>
                        {value}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-purple-500" />
                  <h4 className="text-lg font-bold">Perfect For</h4>
                </div>
                <ul className="space-y-3">
                  {program.ideal_for.map((ideal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{ideal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={handleJoinClick}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions remain the same
function findProgramBySlug(slug) {
  const allPrograms = [
    ...trainingData.online.categories.flatMap((cat) => cat.programs),
    ...trainingData.offline.categories.flatMap((cat) => cat.programs),
  ];
  return allPrograms.find((program) => slugify(program.title) === slug);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default ProgramPage; 