import React, { useState } from "react";
import { User, Bell, Lock, Palette, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTheme } from "../../context/ThemeContext";

export function SettingsView({
  onTriggerToast,
}: {
  onTriggerToast: (
    title: string,
    description: string,
    type?: "default" | "success" | "warning" | "destructive"
  ) => void;
}) {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("Rishu Rana");
  const [email, setEmail] = useState("rishu@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerToast("Settings Saved", "Your account preferences have been updated successfully.", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Profile Settings */}
      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Profile Details</CardTitle>
            </div>
            <CardDescription>Update your personal information and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Email Address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button type="submit" size="sm" className="gap-1.5 ml-auto">
              <Save className="h-3.5 w-3.5" />
              <span>Save Profile</span>
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Appearance & Theme Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle>Appearance & Theme</CardTitle>
          </div>
          <CardDescription>Customize the look and feel of your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border text-left transition-all ${
                theme === "light"
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <div className="h-20 rounded-lg bg-slate-100 border p-2 mb-2 flex flex-col justify-between">
                <div className="h-2 w-16 bg-slate-300 rounded" />
                <div className="h-4 w-full bg-white rounded border" />
              </div>
              <p className="font-semibold text-sm">Light Mode</p>
              <p className="text-xs text-muted-foreground">Clean, crisp, high-contrast theme</p>
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border text-left transition-all ${
                theme === "dark"
                  ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <div className="h-20 rounded-lg bg-slate-900 border border-slate-700 p-2 mb-2 flex flex-col justify-between">
                <div className="h-2 w-16 bg-slate-700 rounded" />
                <div className="h-4 w-full bg-slate-800 rounded border border-slate-700" />
              </div>
              <p className="font-semibold text-sm">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Modern, eye-friendly low-light theme</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
