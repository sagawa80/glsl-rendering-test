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

  vec3 col = vec3(0.0);

  float wave = 0.6 * sin(p.x + time);
  float colwave = 0.05 / abs(p.y + wave);

  vec3 color = vec3(1.0,0.0,0.0);

  colwave = clamp(0.0,1.0, colwave);

  col += vec3(colwave,colwave,colwave) * color;

  gl_FragColor = vec4(col, 1.0);

}