varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);//正規化
  float l = sin(length(vec2(0.0, 0.0) - p) * 30.0 + time * 5.0);
  gl_FragColor = vec4(vec3(l),ufa);
}