import Layout from "@/components/layout/Layout";
import Wrapper from "@/components/Wrappers";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Layout>
      <Wrapper bgColor="bg-w3 pattern3 pb-20" isTop2 containerClassName="min-h-screen">
        <div className="flex justify-between">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Your Resumes</h1>
            <p>Loading...</p>
          </div>
        </div>
        <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center py-24 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-white" />
          <p className="mt-6 text-xl text-white/80">Loading your resumes...</p>
        </div>
      </Wrapper>
    </Layout>
  );
}
