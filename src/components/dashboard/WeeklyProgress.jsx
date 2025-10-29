import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, startOfWeek, addDays } from "date-fns";
import { Calendar } from "lucide-react";

export default function WeeklyProgress({ applications, targetPerWeek }) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const thisWeekApps = applications.filter(app => {
    const appDate = new Date(app.sent_date || app.created_date);
    return appDate >= weekStart;
  });

  const progressPercentage = Math.min((thisWeekApps.length / targetPerWeek) * 100, 100);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i);
    const dayApps = thisWeekApps.filter(app => {
      const appDate = new Date(app.sent_date || app.created_date);
      return format(appDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });
    return {
      date: day,
      count: dayApps.length,
      isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    };
  });

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-600" />
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Applications Sent: {thisWeekApps.length} / {targetPerWeek}
            </span>
            <span className="text-sm font-medium text-orange-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={`text-center p-3 rounded-lg border ${
                day.isToday 
                  ? 'bg-orange-50 border-orange-200' 
                  : day.count > 0
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="text-xs text-gray-500 mb-1">
                {format(day.date, 'EEE')}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {day.count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}