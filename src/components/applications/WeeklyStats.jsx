import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfWeek, format, addWeeks } from "date-fns";
import { BarChart3 } from "lucide-react";

export default function WeeklyStats({ applications }) {
  const getWeeklyData = () => {
    const weeks = {};
    applications.forEach(app => {
      const appDate = new Date(app.sent_date || app.created_date);
      const weekStart = startOfWeek(appDate, { weekStartsOn: 1 });
      const weekKey = format(weekStart, 'yyyy-MM-dd');
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = {
          weekStart,
          count: 0,
          responses: 0
        };
      }
      weeks[weekKey].count++;
      if (app.response_received) {
        weeks[weekKey].responses++;
      }
    });

    return Object.values(weeks)
      .sort((a, b) => b.weekStart - a.weekStart)
      .slice(0, 4);
  };

  const weeklyData = getWeeklyData();

  return (
    <Card className="mb-6 border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          Weekly Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weeklyData.map((week, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-xs text-gray-500 mb-2">
                Week of {format(week.weekStart, 'MMM d')}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {week.count}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {week.responses} responses
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}