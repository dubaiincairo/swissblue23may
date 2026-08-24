import React from "react";
import type { Metadata } from "next";
import SaudiHospitalityAdminDashboard from "@/components/saudihospitalityweb/admin-dashboard";

export const metadata: Metadata = {
  title: "لوحة تحكم المنظومة الرقمية للضيافة | Saudi Hospitality Web Admin",
  description: "لوحة التحكم وإدارة العملاء المتوقعين ومحتوى العرض التسويقي لمنظومة سويس بلو للضيافة.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SaudiHospitalityAdminPage() {
  return <SaudiHospitalityAdminDashboard />;
}
