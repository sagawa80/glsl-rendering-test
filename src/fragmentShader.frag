varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

const float PI  = 3.14;
const float PI2 = PI* 2.;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);//正規化

  vec2 translate = vec2(time*0.5,0.0);
  p += translate;

  float l=length(vec2(0,(p.y+sin(p.x*PI)+sin(p.x*PI2))*3.5));
  l += 0.5;
  vec3 c = vec3(smoothstep(0.5,0.52,l));
  c += vec3(0.0,1.0,0.0);

  float cl=length(vec2(0,p.y*2.0+cos(p.x*PI2)));
  cl += 0.5;
  vec3 cc = vec3(smoothstep(0.5,0.52,cl));
  cc += vec3(1.0,0.0,0.0);

  vec3 pc = c * cc;

  gl_FragColor = vec4(pc,ufa);
}