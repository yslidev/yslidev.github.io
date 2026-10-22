import { isPersonal } from "@/lib/site";
import ProfessionalHome from "@/components/home/ProfessionalHome";
import PersonalHome from "@/components/home/PersonalHome";

export default function Home() {
  return isPersonal ? <PersonalHome /> : <ProfessionalHome />;
}
