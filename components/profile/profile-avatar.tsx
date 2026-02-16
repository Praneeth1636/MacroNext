"use client";

import { useUser } from "@clerk/nextjs";

export function ProfileAvatar({ name, email }: { name: string | null; email: string | null }) {
  const { user } = useUser();
  const imageUrl = user?.imageUrl;
  const displayName = name || email?.split("@")[0] || "?";
  const initial = displayName[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#f5f3ff] text-xl font-bold text-[#6c47ff]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initial
        )}
      </div>
      <div>
        <p className="font-semibold text-[#171717]">{displayName}</p>
        {email && <p className="text-[14px] text-[#737373]">{email}</p>}
      </div>
    </div>
  );
}
