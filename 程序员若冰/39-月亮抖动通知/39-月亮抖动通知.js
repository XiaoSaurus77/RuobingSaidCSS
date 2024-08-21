// Using VFX-JS.
// https://amagi.dev/vfx-js
import { VFX } from "https://esm.sh/@vfx-js/core";

function lerp(a,b,t) {
return a * (1 - t) + b * t;
}

const shader = `
precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;
uniform vec3 mouseDir;
#define PI 3.141593

mat2 rot(float t) {
return mat2(cos(t), -sin(t), sin(t), cos(t));
}

float rand(vec2 p) {
return fract(sin(dot(p, vec2(484., 398.)) * 984.));
}

float sdSphere(vec3 p, float r) {
return length(p) - r;
}

float map(vec3 p) {
// Center sphere
float d = sdSphere(p - mouseDir * 8., 3.);

// Rotate world
p.xz *= rot(sin(time * 0.3) * 0.5);  
p.xy *= rot(time * 0.7);  

// Place spheres
float l = 4.4;
d = min(d, sdSphere(p + vec3(1, 1, 1) * l, 2.0));
d = min(d, sdSphere(p + vec3(-1, -1, 1) * l * 2., 1.7));  
d = min(d, sdSphere(p + vec3(-1, 1, -1) * l, 1.2));  
d = min(d, sdSphere(p + vec3(1, -1, -1) * l, 2.9));    

return d;
}

vec3 getNormal(vec3 p) {
vec2 d = vec2(1, 0);
return normalize(vec3(
map(p + d.xyy) - map(p - d.xyy),
map(p + d.yxy) - map(p - d.yxy),
map(p + d.yyx) - map(p - d.yyx)
));
}

vec3 spectrum(float x) {
return cos((x - vec3(0, .5, 1)) * vec3(.6, 1., .5) * PI);
}

float surface(vec3 p, vec3 n, vec3 rd, vec3 lig) {        
float c = 0.;

// specular
vec3 hal = normalize(lig - rd);
float spe = pow(clamp(dot(hal, n), 0., 1.), 250.);
c += spe * 0.9;
  
// diffuse
c += clamp(dot(n, lig), 0., 1.) * 0.4;

return c;
}

void main() {
vec2 uv = (gl_FragCoord.xy - offset) / resolution;
vec2 p = uv * 2. - 1.;
p.x *= resolution.x / resolution.y;

p *= resolution.y / 1000.;

vec3 ro = vec3(0, 0, 30);
vec3 rd = normalize(vec3(p, -7));
vec3 rp;

float t = 0.;
float d;

vec4 c = vec4(0);
vec4 light = vec4(0);  

vec3 n = vec3(-1);

for (int i = 0; i < 50; i++) {
rp = ro + rd * t;
d = map(rp);

if (d < 0.01) {     
  n = getNormal(rp); 
  break;
}
if (t > 50.) {
  break;
}

t += d;
}

if (n.z > 0.) {
float glaze = clamp(1. + dot(rd, n), 0., 1.);

// Cheap dispersion
float z = rp.z + 5.; // wall at z = -5.
for (float x = 0.; x <= 1.; x += 0.1) { 
  float xx = x * 2. - 1.; // remap to [-1, 1]

  float ior = 1.5 + x * 2.;
  vec3 rd2 = rp + refract(rd, n, 1. / ior);
   
  vec2 uv2 = uv + rd2.xy * z * 0.003 * xx * glaze;
  uv2 += rand(rp.xy) * 0.1 * pow(glaze, 3.);

  vec4 tc = texture2D(src, uv2);
  c += vec4(spectrum(x * 0.7) * 2., 1) * tc.a;
}
c /= 11.;    

// fresnel
c += pow(glaze, 3.) * 0.8 * vec4(.6, .9, 1, 1);

// lighting
c += surface(rp, n, rd, normalize(vec3(-.8, 1., .2))) * vec4(.8, .9, 1, 1);
c += surface(rp, n, rd, normalize(vec3(1., -0.7, .1)));

c = clamp(c, 0., 1.);    
c += vec4(0.0, 0.02, 0.03, 0.1);
}

// Vignette
c += vec4(0, 0, 0, pow(length(p), 2.) * 0.04);
c += rand(uv * 2.) * 0.1;

c.rgb /= c.a;
gl_FragColor = c;
}
`;

// Constants
const padding = 30;
const lineHeight = 1.2;
const leading = 0.17;
const ratio = window.devicePixelRatio || 1;

// Source element
const e = document.querySelector('h1');

// Canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

const vfx = new VFX({ pixelRatio: 0.5});

// Sync text to canvas
function sync() {   
// Dimensions
const rect = e.getBoundingClientRect();  
canvas.style.position = "fixed";
canvas.style.left = `${rect.left - padding}px`;
canvas.style.top = `${rect.top - padding}px`;   
canvas.style.width = `${rect.width + padding * 2}px`;
canvas.style.height = `${rect.height + padding * 2}px`; 
canvas.width = (rect.width + padding * 2) * ratio;
canvas.height = (rect.height + padding * 2) * ratio;
canvas.style.pointerEvents = "none";

// Sync text styles
const styles = window.getComputedStyle(e); 
const fontSize = parseFloat(styles.fontSize);
const halfLeading = fontSize * leading;  
ctx.scale(ratio, ratio);
ctx.clearRect(0, 0, rect.width, rect.height);
ctx.font = styles.font;
ctx.fillStyle = "rgba(0, 0, 0, 1)";
//  ctx.fillStyle = "white";
ctx.textBaseline = "top";  
ctx.textAlign = "center";

// Draw lines
const lines = e.innerText.split('\n');
let yOffset = 0;
for (const line of lines) {
ctx.fillText(line, padding + rect.width * 0.5, padding + halfLeading + yOffset);    
yOffset += fontSize * lineHeight;
}

// Update VFX-JS texture
vfx.update(canvas);
}

// Setup events
const mo = new MutationObserver(sync); 
mo.observe(e, { 
subtree: true,
characterData: true,
attributes: true,
});
window.addEventListener("resize", sync);
window.addEventListener("load", sync);
document.addEventListener("keydown", sync);
document.addEventListener("keyup", sync);

let mouse = [0, 0];
let mouseTarget = [0, 0];
window.addEventListener("mousemove", (e) => {
mouseTarget = [
e.clientX / window.innerWidth * 2. - 1,
-(e.clientY / window.innerHeight * 2 - 1),
];
});

// Init
vfx.add(canvas, { shader, overflow: true, uniforms: {
mouseDir: () => {
mouse = [
  lerp(mouse[0], mouseTarget[0], 0.05), 
  lerp(mouse[1], mouseTarget[1], 0.05)
];
return [mouse[0], mouse[1], 0]
},
}});
sync();
