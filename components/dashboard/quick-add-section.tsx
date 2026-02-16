"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "Scan Barcode", icon: "📷" },
  { label: "AI Photo", icon: "🤖" },
  { label: "Manual Entry", icon: "✏️" },
  { label: "Favorites", icon: "⭐" },
];

export function QuickAddSection() {
  return (
    <Card hover>
      <CardHeader>
        <CardTitle>Quick add</CardTitle>
        <CardDescription>Log a meal or snack</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {actions.map((a) => (
            <Button key={a.label} variant="secondary" size="sm" className="gap-2">
              <span>{a.icon}</span>
              {a.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
