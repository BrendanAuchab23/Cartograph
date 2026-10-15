"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function OrgSwitcher() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Same empty box on the server and on first client render, so hydration matches.
  if (!mounted) return <div className="h-6 w-32" />;

  return (
    <OrganizationSwitcher
      hidePersonal
      afterSelectOrganizationUrl="/"
      afterCreateOrganizationUrl="/"
      afterLeaveOrganizationUrl="/start"
    />
  );
}