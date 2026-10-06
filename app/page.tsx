import { Hero } from '@/components/sections/ui';
import { Ecosystem, B2B, Hubs, Miva, Journey, Consultancy, Nutrition, Experience, Team, Content, FinalCTA } from '@/components/sections/home';
import { HomeExperience } from '@/components/home/experience';
import './home-experience.css';
export default function Home(){return <HomeExperience><div className="home-opening" data-home-scene="vitta" data-intro="playing"><Hero/></div><Ecosystem/><B2B/><Hubs cinematic/><Miva/><Journey/><Consultancy/><Nutrition/><Experience/><Team/><Content/><FinalCTA/></HomeExperience>}
