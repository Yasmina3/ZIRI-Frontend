import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Briefcase, Send, AlertCircle, Target } from "lucide-react";

export default function StatsOverview({ 
  totalJobs, 
  applicationsThisWeek, 
  targetPerWeek,
  pendingActions,
  responseRate 
}) {
  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      color: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      title: "This Week",
      value: `${applicationsThisWeek}/${targetPerWeek}`,
      icon: Send,
      color: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      title: "Pending Actions",
      value: pendingActions,
      icon: AlertCircle,
      color: "bg-orange-500",
      textColor: "text-orange-600"
    },
    {
      title: "Response Rate",
      value: `${responseRate}%`,
      icon: Target,
      color: "bg-purple-500",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-gray-200">
          <div className={`absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 ${stat.color} rounded-full opacity-10`} />
          <CardHeader className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <CardTitle className="text-3xl font-bold mt-2">
                  {stat.value}
                </CardTitle>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-20`}>
                <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}