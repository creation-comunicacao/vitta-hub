#!/usr/bin/env python3
"""Build the approved five-shot Hero. Requires FFmpeg with libx264 and xfade.
Usage: FFMPEG_BIN=/path/to/ffmpeg python3 scripts/build-hero-film.py /path/to/source/videos
Run from the repository root. Client originals are never modified.
"""
import sys, os, shutil, subprocess
from pathlib import Path
ff=os.environ.get('FFMPEG_BIN') or shutil.which('ffmpeg')
if not ff: raise SystemExit('Install FFmpeg or set FFMPEG_BIN.')
source=Path(sys.argv[1])
files=[str(source/name) for name in [
 'Creating_luxury_product_commercial_8e5bf6e9_1080p.mp4',
 'kling_20261125_VIDEO_Create_a_p_2780_0.mp4',
 'Football_player_dribbling_ball_a4fbae95_1080p.mp4',
 'Fitness_commercial_with_personal…_1f1ef05d_1080p.mp4',
 'Football_player_dribbling_ball_7cf33df6_1080p.mp4',
]]
out=Path('public/media/home');out.mkdir(exist_ok=True,parents=True)
# Community first, sporting life, guided gym, outdoors, brief supplementation close.
shots=[(3,0,4.5,.6),(2,.2,3.5,.57),(4,.35,4,.65),(1,.2,2.5,.55),(0,.3,2.5,.5)]
for mode,w,h in [('desktop',1440,810),('mobile',720,960)]:
 cmd=[ff,'-y'];filters=[]
 for i,(idx,start,duration,focus) in enumerate(shots):
  cmd+=['-ss',str(start),'-t',str(duration),'-i',files[idx]]
  filters.append(f'[{i}:v]fps=24,scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h}:(iw-ow)*{focus}:(ih-oh)*0.45,setsar=1,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS,fps=24[v{i}]')
 last='v0';total=shots[0][2]
 for i in range(1,len(shots)):
  nxt=f'x{i}';filters.append(f'[{last}][v{i}]xfade=transition=fade:duration=0.4:offset={total-.4},fps=24[{nxt}]');total+=shots[i][2]-.4;last=nxt
 filters.append(f'[{last}]fade=t=in:st=0:d=0.3,fade=t=out:st={total-.3}:d=0.3[film]')
 cmd+=['-filter_complex',';'.join(filters),'-map','[film]','-an','-c:v','libx264','-preset','slow','-crf','25' if mode=='desktop' else '27','-pix_fmt','yuv420p','-movflags','+faststart','-g','48','-threads','4',str(out/f'hero-film-{mode}.mp4')]
 subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL,stderr=None)
 print(mode,total,(out/f'hero-film-{mode}.mp4').stat().st_size,flush=True)
