import noProjectImage from "../assets/no-projects.png";
import Button from "./Button.jsx";
import { Rocket, FileText, Calendar, CheckCircle } from "lucide-react";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto fade-in">
      {/* Animated Icon */}
      <div className="mb-8 float-animation">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
          <img
            src={noProjectImage}
            alt="No projects"
            className="w-12 h-12 object-contain opacity-60"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          No Project Selected
        </h2>
        <p className="text-slate-600 text-lg mb-2">
          Ready to organize your work?
        </p>
        <p className="text-slate-500">
          Select an existing project or create a new one to get started with
          your productivity journey.
        </p>
      </div>

      {/* CTA Button */}
      <div className="space-y-4">
        <Button
          onClick={onStartAddProject}
          variant="primary"
          className="px-8 py-4 text-lg font-semibold"
        >
          <span className="flex items-center gap-3">
            <Rocket className="w-5 h-5" />
            Create a New Project
          </span>
        </Button>

        <p className="text-xs text-slate-400 mt-4">
          Transform your ideas into organized, actionable projects
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 gap-4 mt-12 w-full max-w-lg">
        <div className="glass-card p-4 text-center">
          <FileText className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
          <p className="text-xs text-slate-600 font-medium">Organize Tasks</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Calendar className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
          <p className="text-xs text-slate-600 font-medium">Track Deadlines</p>
        </div>
        <div className="glass-card p-4 text-center">
          <CheckCircle className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
          <p className="text-xs text-slate-600 font-medium">Complete Goals</p>
        </div>
      </div>
    </div>
  );
}
