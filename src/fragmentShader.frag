varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  float r = abs(sin(time));
  float g = abs(cos(time));
  float b = (r + g) / 2.0;
  gl_FragColor = vec4(r,g,b,ufa);
}