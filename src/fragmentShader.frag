varying vec2 vUv;

uniform float time;
uniform vec2 resolution;

uniform float ufr;
uniform float ufg;
uniform float ufb;
uniform float ufa;

// webgl-noise
// Description : Array and textureless GLSL 2D/3D/4D simplex noise functions.
//      Author : Ian McEwan,Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20201014(stegu)
//     License : Copyright(C)2011 Ashima Arts.All rights reserved.
//               Distributed under the MIT License.See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise

vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2, p2),dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m = m * m;
  return 105.0 * dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

//HSVカラー生成
vec3 hsv(float h,float s,float v){
  vec4 t = vec4(1.0,2.0/3.0,1.0/3.0,3.0);
  vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
  return v * mix(vec3(t.x),clamp(p - vec3(t.x),0.0,1.0),s);
}

//行列による回転
vec3 rotate(vec3 p,float radX,float radY,float radZ){
  mat3 mx = mat3(
    1.0,0.0,0.0,
    0.0,cos(radX),-sin(radX),
    0.0,sin(radX),cos(radX)
  );
  mat3 my = mat3(
    cos(radY),0.0,sin(radY),
    0.0,1.0,0.0,
    -sin(radY),0.0,cos(radY)
  );
  mat3 mz = mat3(
    cos(radZ),-sin(radZ),0.0,
    sin(radZ),cos(radZ),0.0,
    0.0,0.0,1.0
  );
  return mx * my * mz * p;
}

//球形に座標アニメーション
vec3 sphericalPolarCoord(float radius, float rad1, float rad2){
  return vec3(
    sin(rad1) * cos(rad2) * radius,
    sin(rad1) * sin(rad2) * radius,
    cos(rad1) * radius
  );
}

//スムーズに結合するための補間
float smoothMin(float d1, float d2, float k){
  float h = exp(-k * d1) + exp(-k * d2);
  return -log(h) / k;
}

//球体の距離関数
float distanceFuncSphere(vec3 p,float r){
  return length(p) - r;
}

//距離関数
float distanceFunc(vec3 p){
  float n1 = snoise(p * 0.3 + time / 100.0);
  vec3 p1 = rotate(p,radians(time),radians(time),radians(time));
  vec3 s1 = sphericalPolarCoord(3.0,radians(time),radians(-time * 2.0));
  float d1 = distanceFuncSphere(p1+s1,1.25) - n1 * 0.25;

  vec3 p2 = rotate(p,radians(time),radians(time),radians(time));
  vec3 s2 = sphericalPolarCoord(3.0,radians(-time * 5.0),radians(-time));
  float d2 = distanceFuncSphere(p2+s2,1.25) - n1 * 0.25;

  vec3 p3 = rotate(p,radians(time),radians(time),radians(time));
  vec3 s3 = sphericalPolarCoord(3.0,radians(time),radians(-time * 5.0));
  float d3 = distanceFuncSphere(p3+s3,1.25) - n1 * 0.25;

  return smoothMin(smoothMin(d1,d2,2.0),d3,2.0);
}

//法線を計算
vec3 getNormal(vec3 p){
  float d = 0.001;
  return normalize(vec3(
    distanceFunc(p + vec3(d,0.0,0.0)) - distanceFunc(p + vec3(-d,0.0,0.0)),
    distanceFunc(p + vec3(0.0,d,0.0)) - distanceFunc(p + vec3(0.0,-d,0.0)),
    distanceFunc(p + vec3(0.0,0.0,d)) - distanceFunc(p + vec3(0.0,0.0,-d))
  ));
}

void main(void){

  //フラグメント座標の正規化
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x,resolution.y);

  //カメラの位置
  vec3 cPos = vec3(0.0,0.0,10.0);

  //カメラの向き
  vec3 cDir = vec3(0.0,0.0,-1.0);

  //カメラの上方向
  vec3 cUp = vec3(0.0,1.0,0.0);

  //カメラの横方向
  vec3 cSide = cross(cDir,cUp);

  //フォーカスする深度
  float targetDepth = 1.8;

  //レイ（光線）
  vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

  //マーチングループ
  float distance = 0.0;
  float rLen = 0.0;
  vec3 rPos = cPos;
  for(int i = 0; i < 64; i++){
    distance = distanceFunc(rPos);
    rLen += distance;
    rPos = cPos + ray * rLen * 0.2;
  }

  //法線の取得
  vec3 normal = getNormal(rPos);

  //メタボールアニメーション
  if(abs(distance) < 1.0){
    float n = snoise(rPos * 0.2 + time / 100.0);
    vec3 p = rotate(rPos,radians(time * -2.0),radians(time * 2.0),radians(time * -2.0));
    float d = distanceFuncSphere(p,1.6) - n;

    if(d > 2.0){
        gl_FragColor = vec4(hsv(dot(normal,cUp) * 0.8 + time / 200.0,0.2,dot(normal,cUp) * 0.6 + 0.6),1.0);
    }else if(d < 2.0 && d > 1.0){
        gl_FragColor = vec4(hsv(dot(normal,cUp) * 0.1 + time / 100.0,0.8,dot(normal,cUp) * 0.3 + 0.8),1.0);
    }else{
        gl_FragColor = vec4(hsv(dot(normal,cUp) * 0.8 + time / 200.0,0.2,dot(normal,cUp) * 0.6 + 0.5),1.0);
    }
  }else{
    gl_FragColor = vec4(vec3(0.0),1.0);
  }
}