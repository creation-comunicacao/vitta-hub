import { HomeVideo } from './experience';
export type HomeScene = 'vitta' | 'fitness' | 'aquatic' | 'sports';
// Add approved local sources here after encoding against docs/HOME-EXPERIENCIA.md.
export const homeVideos: Record<HomeScene, {webm?:string;mp4?:string}> = {
  vitta: {}, fitness: {}, aquatic: {}, sports: {},
};
export function HomeMedia({scene}: {scene:Exclude<HomeScene,'vitta'>}) {
  const slug = scene==='fitness'?'hub-fitness':scene==='aquatic'?'hub-aquatico':'hub-esportivo';
  return <div className={`home-media media-${scene}`} aria-hidden="true"><picture><source media="(max-width:600px)" srcSet={`/hubs/${slug}-700.webp`}/><img src={`/hubs/${slug}-1400.webp`} width="1400" height="933" alt="" loading="lazy" decoding="async"/></picture><HomeVideo {...homeVideos[scene]}/><div className="home-media-light"/><svg className="home-trails" viewBox="0 0 1000 700" fill="none" preserveAspectRatio="xMidYMid slice">{scene==='fitness'?<><ellipse cx="620" cy="370" rx="320" ry="245"/><ellipse cx="620" cy="370" rx="290" ry="215"/></>:scene==='aquatic'?<><path d="M-100 200 Q200 20 500 200 T1100 200"/><path d="M-100 250 Q200 70 500 250 T1100 250"/><path d="M-100 300 Q200 120 500 300 T1100 300"/></>:<><path d="M240 650 Q300 260 930 150" pathLength="1"/><circle cx="650" cy="380" r="150"/><path d="M100 580 H920 M500 60 V700"/></>}</svg><div className="home-scene-wipe"/></div>;
}
