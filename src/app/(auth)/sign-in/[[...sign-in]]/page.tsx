import BackStyle3 from "@/components/backgroundStyle/BackStyle3";
import Layout from "@/components/layout/Layout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <BackStyle3 className="flex h-[90vh] items-center justify-center py-8">
      <Layout>
        <SignIn />
      </Layout>
    </BackStyle3>
  );
}
