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

  for(float i = 0.0; i < 12.0; i++) {
    float wave = 0.5 * sin(p.x - time * 4.5 + (i  * time * 0.6));
    float colwave = 0.03 / abs(p.y + wave);

    //rainbow
    float rt = i * 1.0 + 4.4;
    float r = (sin(rt) +1.0) * 0.5;
    float g = (sin(rt - 2.0) + 1.0) * 0.5;
    float b = (sin(rt - 4.0) + 1.0) * 0.5;
    vec3 rainbow = vec3(r,g,b);

    float grad = (sin(i * 0.65 + 4.3) + 1.0) * 0.5;

    colwave = clamp(0.0,1.0, colwave);

    col += vec3(colwave,colwave,colwave) * grad * rainbow;
  }

  //ガンマ補正
  float m = 1.0;
  col.x = pow(col.x, m);
  col.y = pow(col.y, m);
  col.z = pow(col.z, m);

  gl_FragColor = vec4(col, 1.0);

}