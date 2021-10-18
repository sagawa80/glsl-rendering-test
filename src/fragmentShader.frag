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

  float wave = 0.5 * sin(p.x - time * 4.5 + (1.0  * time * 0.6));
  float colwave = 0.03 / abs(p.y + wave);

  vec3 color = vec3(1.0,0.0,0.0);

  colwave = clamp(0.0,1.0, colwave);

  col += vec3(colwave,colwave,colwave) * color;

  float wave2 = 0.5 * sin(p.x - time * 4.5 + (2.0  * time * 0.6));
  float colwave2 = 0.03 / abs(p.y + wave2);

  vec3 color2 = vec3(0.0,1.0,0.0);

  colwave2 = clamp(0.0,1.0, colwave2);

  col += vec3(colwave2,colwave2,colwave2) * color2;

  float wave3 = 0.5 * sin(p.x - time * 4.5 + (3.0  * time * 0.6));
  float colwave3 = 0.03 / abs(p.y + wave3);

  vec3 color3 = vec3(0.0,0.0,1.0);

  colwave3 = clamp(0.0,1.0, colwave3);

  col += vec3(colwave3,colwave3,colwave3) * color3;

  gl_FragColor = vec4(col, 1.0);

}