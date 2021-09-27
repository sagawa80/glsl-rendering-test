varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  gl_FragColor = vec4(ufr,ufg,ufb,ufa);
}