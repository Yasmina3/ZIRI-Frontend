import React from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ExternalLink, Edit, TrendingUp } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processed: "bg-blue-100 text-blue-800 border-blue-200",
  sent: "bg-green-100 text-green-800 border-green-200",
  manual_required: "bg-orange-100 text-orange-800 border-orange-200",
  archived: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function JobCard({ job, onSelect, onEdit, isSelected }) {
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
        onClick={() => onSelect(job)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-600 font-medium">{job.company}</p>
          </div>
          <div className="flex gap-2">
            {job.url && (
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-orange-600 hover:text-orange-700"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(job);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {job.location && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
          )}
          <Badge variant="outline" className="text-xs">
            <Briefcase className="w-3 h-3 mr-1" />
            {job.job_type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {job.platform}
          </Badge>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className={`${statusColors[job.status]} border`}>
            {job.status.replace(/_/g, ' ')}
          </Badge>
          {job.fit_score && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Fit: {job.fit_score}%
            </Badge>
          )}
          {job.interview_likelihood && (
            <Badge variant="outline">
              Interview: {job.interview_likelihood}%
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
}