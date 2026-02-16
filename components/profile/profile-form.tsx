"use client";

import { saveProfile } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile, Goal, DietType, DeliveryWindow } from "@prisma/client";

const selectClass =
  "w-full rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-3 pr-10 text-[14px] text-[#171717] appearance-none cursor-pointer bg-no-repeat bg-[right_12px_center] focus:outline-none focus:border-[#fb923c] focus:ring-[3px] focus:ring-[rgba(251,146,60,0.12)] transition-all duration-150 mt-1.5";
const selectChevron =
  "bg-[url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23a3a3a3\" stroke-width=\"2\"%3E%3Cpath d=\"M6 9l6 6 6-6\"/%3E%3C/svg%3E')]";

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
        <form action={saveProfile} className="space-y-5 animate-stagger-up">
          <p className="text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-[0.08em]">
            Health & Diet
          </p>
          <div>
            <Label htmlFor="goal">Goal</Label>
            <select
              id="goal"
              name="goal"
              defaultValue={profile?.goal ?? "MAINTAIN"}
              className={`${selectClass} ${selectChevron}`}
            >
              {goals.map((g) => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="dietType">Diet type</Label>
            <select
              id="dietType"
              name="dietType"
              defaultValue={profile?.dietType ?? "NONVEG"}
              className={`${selectClass} ${selectChevron}`}
            >
              {dietTypes.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="allergies">Allergies (comma-separated)</Label>
            <Input id="allergies" name="allergies" defaultValue={profile?.allergies?.join(", ") ?? ""} placeholder="e.g. nuts, shellfish" className="mt-1.5" />
          </div>

          <div className="border-t border-[#f0f0f0] pt-5 mt-6">
            <p className="text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-[0.08em] mb-4">
              Delivery
            </p>
            <div className="space-y-5">
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
            <Label htmlFor="deliveryWindow">Delivery window</Label>
            <select
              id="deliveryWindow"
              name="deliveryWindow"
              defaultValue={profile?.deliveryWindow ?? "AFTERNOON"}
              className={`${selectClass} ${selectChevron}`}
            >
              {windows.map((w) => (
                <option key={w.value} value={w.value}>{w.label}</option>
              ))}
            </select>
          </div>
            </div>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Save profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
