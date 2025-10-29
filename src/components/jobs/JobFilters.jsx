import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function JobFilters({ onFilterChange }) {
  const [status, setStatus] = useState("all");
  const [platform, setPlatform] = useState("all");

  const handleChange = (type, value) => {
    if (type === "status") setStatus(value);
    if (type === "platform") setPlatform(value);
    onFilterChange({ 
      status: type === "status" ? value : status,
      platform: type === "platform" ? value : platform
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <Select value={status} onValueChange={(value) => handleChange("status", value)}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processed">Processed</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="manual_required">Manual Required</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <Select value={platform} onValueChange={(value) => handleChange("platform", value)}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Indeed">Indeed</SelectItem>
            <SelectItem value="StepStone">StepStone</SelectItem>
            <SelectItem value="Xing">Xing</SelectItem>
            <SelectItem value="Direct">Direct</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}