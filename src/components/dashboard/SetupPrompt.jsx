import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Rocket, FileText, Settings as SettingsIcon, Search } from "lucide-react";

export default function SetupPrompt() {
  const steps = [
    {
      icon: FileText,
      title: "Upload Documents",
      description: "Upload your resume and cover letter templates",
      action: "Go to Settings"
    },
    {
      icon: Search,
      title: "Configure Search",
      description: "Set your job search preferences and keywords",
      action: "Go to Settings"
    },
    {
      icon: Rocket,
      title: "Start Applying",
      description: "Add jobs and let AI generate applications",
      action: "Add First Job"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Zivi Agent!
          </h1>
          <p className="text-xl text-gray-600">
            Let's get you set up in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to={createPageUrl("Settings")}>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8">
              <SettingsIcon className="w-5 h-5 mr-2" />
              Start Setup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}