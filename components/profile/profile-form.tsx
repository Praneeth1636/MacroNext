"use client";

import { saveProfile } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile, Goal, DietType, DeliveryWindow } from "@prisma/client";

const inputClass =
  "w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#a3a3a3] focus:outline-none focus:border-[#6c47ff] focus:ring-[3px] focus:ring-[rgba(108,71,255,0.1)] transition-all duration-150";

const goals: { value: Goal; label: string }[] = [
  { value: "CUT", label: "Cut" },
  { value: "MAINTAIN", label: "Maintain" },
  { value: "BULK", label: "Bulk" },
];

const dietTypes: { value: DietType; label: string }[] = [
  { value: "VEG", label: "Vegetarian" },
  { value: "NONVEG", label: "Non-veg" },
  { value: "VEGAN", label: "Vegan" },
  { value: "KETO", label: "Keto" },
  { value: "HALAL", label: "Halal" },
];

const windows: { value: DeliveryWindow; label: string }[] = [
  { value: "MORNING", label: "Morning" },
  { value: "AFTERNOON", label: "Afternoon" },
  { value: "EVENING", label: "Evening" },
];

export function ProfileForm({ profile }: { profile: Profile | null }) {
  return (
    <Card accent>
      <CardHeader>
        <CardTitle>Basic profile</CardTitle>
        <CardDescription>Goal, diet, allergies, and delivery address</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={saveProfile} className="space-y-5">
          <div>
            <Label>Goal</Label>
            <select name="goal" defaultValue={profile?.goal ?? "MAINTAIN"} className={inputClass + " mt-1.5"}>
              {goals.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Diet type</Label>
            <select name="dietType" defaultValue={profile?.dietType ?? "NONVEG"} className={inputClass + " mt-1.5"}>
              {dietTypes.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <Input id="allergies" name="allergies" defaultValue={profile?.allergies?.join(", ") ?? ""} placeholder="e.g. nuts, shellfish" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="addressLine1">Address line 1</Label>
            <Input id="addressLine1" name="addressLine1" defaultValue={profile?.addressLine1 ?? ""} required className="mt-1.5" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={profile?.city ?? ""} required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" defaultValue={profile?.state ?? ""} required className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="zip">ZIP</Label>
            <Input id="zip" name="zip" defaultValue={profile?.zip ?? ""} required className="mt-1.5" />
          </div>
          <div>
            <Label>Delivery window</Label>
            <select name="deliveryWindow" defaultValue={profile?.deliveryWindow ?? "AFTERNOON"} className={inputClass + " mt-1.5"}>
              {windows.map((w) => (
                <option key={w.value} value={w.value}>{w.label}</option>
              ))}
            </select>
          </div>
          <Button type="submit">Save profile</Button>
        </form>
      </CardContent>
    </Card>
  );
}
