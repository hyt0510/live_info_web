"use client"
import { Canvas } from '@react-three/fiber';
import { DigitalEarth } from 'react-digital-earth/src';

interface EarthProps {
  size?: number;
  rotationSpeed?: number;
}

export function Earth({ size = 150, rotationSpeed = 0.001 }: EarthProps) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.1} />
        <DigitalEarth 
          dayTexture="/images/earth_day.jpg"
          nightTexture="/images/earth_night.jpg"
          rotationSpeed={rotationSpeed}
        />
      </Canvas>
    </div>
  );
}