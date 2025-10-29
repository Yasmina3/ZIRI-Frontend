import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Mail, 
  TrendingUp,
  FileText,
  CheckCircle,
  Zap,
  Brain,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Intelligent fit scoring and interview likelihood prediction for every job"
    },
    {
      icon: FileText,
      title: "Smart Cover Letters",
      description: "Dual AI generation with AIDA-based selection for maximum impact"
    },
    {
      icon: Mail,
      title: "Automated Sending",
      description: "Direct email applications with professional formatting and tracking"
    },
    {
      icon: Target,
      title: "Geographic Targeting",
      description: "Define search areas and track applications by location"
    },
    {
      icon: TrendingUp,
      title: "Success Analytics",
      description: "Track application rates, responses, and optimize your strategy"
    },
    {
      icon: Shield,
      title: "SQPS Compliance",
      description: "Built with pharmaceutical-grade quality and traceability standards"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Setup Your Profile",
      description: "Upload your resume and cover letter templates"
    },
    {
      number: "02",
      title: "Configure Search",
      description: "Define locations, keywords, and application goals"
    },
    {
      number: "03",
      title: "Let AI Work",
      description: "System finds jobs, generates letters, and sends applications"
    },
    {
      number: "04",
      title: "Track & Optimize",
      description: "Monitor success rates and refine your approach"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Zivi Agent</h1>
                <p className="text-xs text-gray-500">by SQPS</p>
              </div>
            </div>
            <Link to={createPageUrl("Dashboard")}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Job Application System</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Personal Job Application
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"> AI Agent</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Automate your job search with intelligent matching, AI-generated cover letters, 
              and seamless application tracking. Land your dream job faster with Zivi Agent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-gray-300">
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-orange-600">10x</div>
                <div className="text-sm text-gray-600">Faster Applications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">Automated</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI and built with SQPS quality standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to automate your job search
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-orange-100 mb-4">
                  {step.number}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-orange-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Job Search?
            </h3>
            <p className="text-xl text-orange-100 mb-10">
              Join thousands of professionals landing their dream jobs with AI automation
            </p>
            <Link to={createPageUrl("Dashboard")}>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg">
                Get Started Now
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Zivi Agent</span>
          </div>
          <p className="mb-2">Powered by SQPS - Quality & Compliance Standards</p>
          <p className="text-sm">© 2024 Zivi Agent. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}