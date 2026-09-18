import { createFileRoute } from "@tanstack/react-router";
import { FamilyApp } from "@/components/family-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FamilyApp />;
}
