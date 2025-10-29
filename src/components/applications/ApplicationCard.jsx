import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Building2, Calendar, CheckCircle, XCircle, TrendingUp } from "lucide-react";

const statusColors = {
  draft: "bg-gray-100 text-gray-800 border-gray-200",
  ready: "bg-blue-100 text-blue-800 border-blue-200",
  sent: "bg-green-100 text-green-800 border-green-200",
  manual_required: "bg-orange-100 text-orange-800 border-orange-200",
  response_received: "bg-purple-100 text-purple-800 border-purple-200"
};

export default function ApplicationCard({ application, onSelect, onMarkResponse, isSelected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card 
        className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isSelected ? 'border-orange-500 border-2 bg-orange-50' : 'border-gray-200'
        }`}
        onClick={() => onSelect(application)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{application.job_title}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{application.company}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className={`${statusColors[application.status]} border`}>
            {application.status.replace(/_/g, ' ')}
          </Badge>
          {application.sent_date && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {format(new Date(application.sent_date), 'MMM d, yyyy')}
            </Badge>
          )}
          {application.cover_letter_score && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Score: {application.cover_letter_score}/100
            </Badge>
          )}
        </div>

        {application.status === 'sent' && !application.response_received && (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-green-600 hover:text-green-700"
              onClick={() => onMarkResponse(application, true)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Got Response
            </Button>
          </div>
        )}

        {application.response_received && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-purple-700">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Response Received</span>
            </div>
            {application.response_date && (
              <p className="text-xs text-purple-600 mt-1">
                {format(new Date(application.response_date), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}