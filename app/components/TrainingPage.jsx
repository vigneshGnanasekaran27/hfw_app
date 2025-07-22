"use client";
import React from "react";

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-yellow-50 to-transparent pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <span className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-600 text-2xl font-bold">T</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Training</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">Access training resources and courses.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="text-center text-gray-500">(Training courses UI goes here)</div>
        </div>
      </div>
    </div>
  );
} 