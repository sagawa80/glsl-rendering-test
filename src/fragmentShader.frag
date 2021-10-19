varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);//正規化

  float cx = step(0.0, sin(p.x * 20.0));
  float cy = step(0.0, sin(p.y * 20.0));
  float c = 0.0;
  if ((cx + cy) != 1.0) {
    c = 1.0;
  }
  gl_FragColor = vec4(vec3(c),ufa);
}