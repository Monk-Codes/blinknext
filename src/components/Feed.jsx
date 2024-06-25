import Posts from "./Posts";
import MobProfile from "./MobProfile";

export default function Feed() {
 return (
  <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
   {/* Posts (Left) */}
   <section className="md:col-span-2">
    <Posts />
   </section>

   {/* MiniProfile (Right) */}
   <section className="hidden md:inline-grid md:col-span-1">
    <div className="fixed w-[320px]">
     <MobProfile />
    </div>
   </section>
  </main>
 );
}
