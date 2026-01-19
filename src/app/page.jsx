import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import Test from "@/components/Test";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = getServerSession();
  return (
    <div className="space-y-20">
      <Test></Test>
      {JSON.stringify(session)}
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Products></Products>
      </section>
    </div>
  );
}
