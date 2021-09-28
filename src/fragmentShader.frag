varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);//正規化
  vec3 destColor = vec3(0.0);
  float f = 0.01 / abs(length(p) - 0.5);
  gl_FragColor = vec4(vec3(f),ufa);
}