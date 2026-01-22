/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

void main() {
  vec2 uv = vUv - 0.5;
  uv = rotate(uv, uRotation);
  
  float t = uTime * uSpeed;
  
  // High-performance domain warping for liquid movement
  for(float i = 1.0; i < 4.0; i++){
    uv.x += 0.35 / i * sin(i * 3.0 * uv.y + t);
    uv.y += 0.35 / i * cos(i * 3.0 * uv.x + t);
  }

  // Create high-contrast ripple peaks
  float strength = sin(7.0 * (uv.x + uv.y) * uScale);
  
  // Smoothstep creates the 'silver streaks' on the peaks of the waves
  // We narrow the range to make the gray pops more distinct from the black
  float ripples = smoothstep(-0.3, 0.7, strength);
  
  // The 'Specular' highlight - this is what makes it look like liquid metal
  float spec = pow(ripples, 5.0) * 0.45;
  
  // We define a hard black and a mid-tone silver
  vec3 baseBlack = vec3(0.01, 0.01, 0.02);
  vec3 silverHighlight = vec3(0.4, 0.4, 0.45); // This is your "gray stuff"
  
  // Mix based on ripples, then add the spec highlight for extra shine
  vec3 finalColor = mix(baseBlack, silverHighlight, ripples * 0.4) + spec;

  // Final dither to keep gradients smooth on mobile
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) * 0.07 * uNoiseIntensity;
  
  gl_FragColor = vec4(finalColor - noise, 1.0);
}
`;

const SilkPlane = forwardRef(({ uniforms }, ref) => {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [viewport]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </mesh>
  );
});

SilkPlane.displayName = 'SilkPlane';

const Silk = ({ 
  speed = 0.35,          // Slow, viscous speed
  scale = 0.6,           // Scale for prominent ripples
  color = '#000000',     // Base color set to pure black
  noiseIntensity = 0.4, 
  rotation = 45 
}) => {
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uScale: { value: scale },
    uNoiseIntensity: { value: noiseIntensity },
    uRotation: { value: (rotation * Math.PI) / 180 },
    uColor: { value: new THREE.Color(color) }
  }), []);

  useEffect(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    uniforms.uRotation.value = (rotation * Math.PI) / 180;
    uniforms.uColor.value.set(color);
  }, [speed, scale, noiseIntensity, color, rotation, uniforms]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-90">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]} // Capped for smoother mobile performance
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance" 
        }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default Silk;