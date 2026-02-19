import React from "react";
import Layout from "@/components/layout/Layout";
import { resumeStyles } from "@/components/ResumeStyles/Styles";
import TemplateCard from "./TemplateCard";
import Wrapper from "@/components/Wrappers";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { canCreateResume } from "@/lib/permissions";
import { safeResumeCount } from "@/lib/dbSafe";
import TemplatesSidebar from "./TemplatesSidebar";

export default async function TemplatesPage() {
  const { userId } = await auth();

  // Avoid blocking the server render on DB calls — the client (`TemplateCard`)
  // already fetches `/api/user/subscription` and `/api/user/resume-count`
  // to compute `canCreate`. Render immediately and let client adjust UI.
  const isUser = !!userId;
  // TEMPORARY: Allow template selection for testing
  const canCreate = true;

  return (
    <Layout footerStyle>
      <Wrapper bgColor="bg-w3 pattern3 pb-20" isTop2>
        <TemplatesSidebar
          templates={resumeStyles}
          canCreate={canCreate}
          isUser={isUser}
        />
      </Wrapper>
    </Layout>
  );
}
