varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

void main() {
  vec3 col = vec3(0.0);
  col.r = gl_FragCoord.x/resolution.x;
  col.b = gl_FragCoord.y/resolution.y;
  gl_FragColor = vec4(col,ufa);
}