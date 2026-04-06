"use client";

import { useState, useEffect } from "react";
import ModuleCard from "@/components/ModuleCard";
import { getGrowthData, setGrowthData } from "@/lib/storage";
import { GrowthData, Skill, Project, FinancialEntry } from "@/lib/types";

export default function GrowthPage() {
  const [data, setData] = useState<GrowthData>({
    skills: [],
    projects: [],
    financial: [],
  });
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [finMonth, setFinMonth] = useState("");
  const [finIncome, setFinIncome] = useState("");
  const [finSavings, setFinSavings] = useState("");
  const [finInvested, setFinInvested] = useState("");

  useEffect(() => {
    setData(getGrowthData());
  }, []);

  function save(updated: GrowthData) {
    setGrowthData(updated);
    setData(updated);
  }

  function addSkill() {
    if (!newSkill.trim()) return;
    const activeCount = data.skills.filter((s) => s.status === "active").length;
    if (activeCount >= 3) return;
    const skill: Skill = {
      name: newSkill.trim(),
      startedAt: new Date().toISOString().split("T")[0],
      status: "active",
    };
    save({ ...data, skills: [...data.skills, skill] });
    setNewSkill("");
  }

  function updateSkillStatus(index: number, status: Skill["status"]) {
    const skills = [...data.skills];
    skills[index] = { ...skills[index], status };
    save({ ...data, skills });
  }

  function addProject() {
    if (!newProject.trim()) return;
    const project: Project = {
      name: newProject.trim(),
      description: newProjectDesc.trim(),
      status: "active",
    };
    save({ ...data, projects: [...data.projects, project] });
    setNewProject("");
    setNewProjectDesc("");
  }

  function updateProjectStatus(index: number, status: Project["status"]) {
    const projects = [...data.projects];
    projects[index] = { ...projects[index], status };
    save({ ...data, projects });
  }

  function addFinancial() {
    if (!finMonth) return;
    const entry: FinancialEntry = {
      month: finMonth,
      income: parseFloat(finIncome) || 0,
      savingsRate: parseFloat(finSavings) || 0,
      invested: parseFloat(finInvested) || 0,
    };
    save({ ...data, financial: [...data.financial, entry] });
    setFinMonth("");
    setFinIncome("");
    setFinSavings("");
    setFinInvested("");
    setShowFinanceForm(false);
  }

  const activeSkills = data.skills.filter((s) => s.status === "active");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Growth
        </h1>
        <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
          Skills. Income. Projects. Build leverage.
        </p>
      </div>

      {/* Skills */}
      <ModuleCard
        title="Active Skills"
        subtitle={`${activeSkills.length}/3 slots used. Focus beats breadth.`}
      >
        <div className="space-y-2">
          {data.skills.map((skill, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 rounded-md border ${
                skill.status === "active"
                  ? "border-accent/20 bg-accent-dim"
                  : skill.status === "completed"
                    ? "border-success/20 bg-success-dim"
                    : "border-border bg-surface"
              }`}
            >
              <div>
                <span
                  className={`text-sm font-medium ${
                    skill.status === "active"
                      ? "text-accent"
                      : skill.status === "completed"
                        ? "text-success"
                        : "text-text-muted"
                  }`}
                >
                  {skill.name}
                </span>
                <span className="text-[10px] text-text-muted ml-2">
                  since {skill.startedAt}
                </span>
              </div>
              <select
                value={skill.status}
                onChange={(e) =>
                  updateSkillStatus(i, e.target.value as Skill["status"])
                }
                className="text-xs bg-transparent border-0 text-text-secondary cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          ))}

          {activeSkills.length < 3 && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="e.g., Sales, Copywriting, Public Speaking"
                className="flex-1 px-3 py-2 rounded-md text-sm"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-accent text-bg text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </ModuleCard>

      {/* Projects */}
      <ModuleCard
        title="Projects"
        subtitle="What are you building?"
        className="mt-4"
      >
        <div className="space-y-2">
          {data.projects.map((project, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 rounded-md border ${
                project.status === "active"
                  ? "border-border bg-surface-hover"
                  : project.status === "completed"
                    ? "border-success/20 bg-success-dim"
                    : "border-border bg-surface opacity-50"
              }`}
            >
              <div>
                <span className="text-sm font-medium text-text-primary">
                  {project.name}
                </span>
                {project.description && (
                  <p className="text-xs text-text-muted mt-0.5">
                    {project.description}
                  </p>
                )}
              </div>
              <select
                value={project.status}
                onChange={(e) =>
                  updateProjectStatus(i, e.target.value as Project["status"])
                }
                className="text-xs bg-transparent border-0 text-text-secondary cursor-pointer"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
              </select>
            </div>
          ))}

          <div className="mt-3 pt-3 border-t border-border space-y-2">
            <input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="Project name"
              className="w-full px-3 py-2 rounded-md text-sm"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                placeholder="Brief description (optional)"
                className="flex-1 px-3 py-2 rounded-md text-sm"
              />
              <button
                onClick={addProject}
                className="px-4 py-2 bg-surface-hover text-text-secondary text-sm rounded-md hover:text-text-primary transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </ModuleCard>

      {/* Financial */}
      <ModuleCard
        title="Financial Tracking"
        subtitle="Monthly snapshot. Know your numbers."
        className="mt-4"
      >
        <div className="space-y-2">
          {data.financial
            .slice()
            .reverse()
            .map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3 rounded-md border border-border bg-surface-hover"
              >
                <span className="text-sm font-medium text-text-primary">
                  {entry.month}
                </span>
                <div className="flex gap-4 text-xs text-text-secondary">
                  <span>
                    Income:{" "}
                    <span className="text-text-primary">
                      ${entry.income.toLocaleString()}
                    </span>
                  </span>
                  <span>
                    Saved:{" "}
                    <span className="text-accent">{entry.savingsRate}%</span>
                  </span>
                  <span>
                    Invested:{" "}
                    <span className="text-text-primary">
                      ${entry.invested.toLocaleString()}
                    </span>
                  </span>
                </div>
              </div>
            ))}

          {!showFinanceForm ? (
            <button
              onClick={() => setShowFinanceForm(true)}
              className="w-full py-3 border border-dashed border-border rounded-md text-sm text-text-muted hover:text-text-secondary hover:border-border-strong transition-colors"
            >
              + Add monthly entry
            </button>
          ) : (
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <input
                type="month"
                value={finMonth}
                onChange={(e) => setFinMonth(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-sm"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={finIncome}
                  onChange={(e) => setFinIncome(e.target.value)}
                  placeholder="Income"
                  className="px-3 py-2 rounded-md text-sm"
                />
                <input
                  type="number"
                  value={finSavings}
                  onChange={(e) => setFinSavings(e.target.value)}
                  placeholder="Savings %"
                  className="px-3 py-2 rounded-md text-sm"
                />
                <input
                  type="number"
                  value={finInvested}
                  onChange={(e) => setFinInvested(e.target.value)}
                  placeholder="Invested"
                  className="px-3 py-2 rounded-md text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addFinancial}
                  className="px-4 py-2 bg-accent text-bg text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowFinanceForm(false)}
                  className="px-4 py-2 text-text-muted text-sm hover:text-text-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </ModuleCard>
    </div>
  );
}
