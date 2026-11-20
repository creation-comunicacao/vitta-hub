import { Hero } from '@/components/sections/ui';
import { Ecosystem, B2B, Hubs, Miva, Experience, FinalCTA } from '@/components/sections/home';
import { HomeExperience } from '@/components/home/experience';
import { LaunchConsultancy, LaunchNutrition } from '@/components/sections/launch-home';
import './home-experience.css';
export default function Home(){return <HomeExperience><div className="home-opening" data-home-scene="vitta" data-intro="playing"><Hero/></div><Ecosystem/><B2B/><Hubs cinematic/><Miva/><LaunchConsultancy/><LaunchNutrition/><Experience/><FinalCTA/></HomeExperience>}
