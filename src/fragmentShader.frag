varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  vec3 col = vec3(0.0);
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);//正規化
  col.r = (1.0 + p.x) * 0.5;
  gl_FragColor = vec4(col,ufa);
}