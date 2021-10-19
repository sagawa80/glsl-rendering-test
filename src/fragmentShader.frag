varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);//正規化

  float c = length(p * 4.0);
  float c2 = step(0.999, sin(c));
  gl_FragColor = vec4(vec3(c2),ufa);
}