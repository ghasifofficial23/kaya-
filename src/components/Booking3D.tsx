import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Text, PerspectiveCamera, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TABLES } from '../constants';
import { Table } from '../types';
import { cn } from '../lib/utils';

interface TableModelProps {
  table: Table;
  isSelected: boolean;
  onSelect: (table: Table | null) => void;
}

function TableModel({ table, isSelected, onSelect }: TableModelProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);

  const isLarge = table.seats >= 6;
  const width = isLarge ? 1.4 : 1;
  const depth = isLarge ? 1.4 : 1;
  const height = 0.1;
  
  const baseColor = table.status === 'reserved' ? '#C8442A' : '#4A9B6A';
  const color = isSelected ? '#D4A44C' : hovered ? '#5DB47E' : baseColor;

  return (
    <group 
      ref={groupRef} 
      position={table.position}
      onClick={(e) => {
        e.stopPropagation();
        if (table.status === 'available') onSelect(table);
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        if (isSelected) onSelect(null);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={isSelected ? 2 : 0} rotationIntensity={0} floatIntensity={isSelected ? 0.5 : 0}>
        {/* Table Top */}
        <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.2} 
            metalness={0.1}
            emissive={isSelected ? '#D4A44C' : '#000000'}
            emissiveIntensity={isSelected ? 0.2 : 0}
          />
        </mesh>

        {/* Legs */}
        {[[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].map((pos, i) => (
          <mesh key={i} position={[pos[0] * (width - 0.2), 0, pos[1] * (depth - 0.2)]} castShadow>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color="#1A1510" roughness={0.8} />
          </mesh>
        ))}

        {/* Table Label */}
        <Text
          position={[0, 0.46, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.25}
          color={isSelected ? "#1A1612" : "#F5EFE0"}
        >
          {table.label}
        </Text>

        {/* Status Indicator Glow */}
        {isSelected && (
          <pointLight position={[0, 0.5, 0]} intensity={2} distance={2} color="#D4A44C" />
        )}
      </Float>

      {/* Tooltip */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 1.2, 0]} center>
          <div className="bg-[#1A1612]/95 border border-[#D4A44C]/30 text-[#F5EFE0] px-4 py-2 rounded-sm text-xs whitespace-nowrap pointer-events-none drop-shadow-2xl backdrop-blur-md">
            <strong className="block text-[#D4A44C] mb-1 font-bebas tracking-wider text-sm">{table.label} — {table.area}</strong>
            <div className="flex items-center justify-between gap-4">
              <span>{table.seats} Guests</span>
              <span className={table.status === 'reserved' ? 'text-[#C8442A] font-bold' : 'text-[#4A9B6A]'}>
                {table.status.toUpperCase()}
              </span>
            </div>
            <p className="text-[10px] text-[#8A8278] mt-1 italic">{table.note}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export const Booking3D = ({ selectedTableId, onSelect }: { selectedTableId: string | null; onSelect: (table: Table | null) => void }) => {
  const [activeFloor, setActiveFloor] = useState(1);
  const floorTables = TABLES.filter(t => (t.floor || 1) === activeFloor);

  return (
    <div className="w-full h-full min-h-[500px] bg-[#1A1612] relative cursor-crosshair">
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 40 }}>
        <PerspectiveCamera makeDefault position={[12, 10, 12]} />
        <OrbitControls 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.2} 
          minDistance={8} 
          maxDistance={18} 
          autoRotate={!selectedTableId}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.4} />
        <spotLight 
          position={[10, 15, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#D4A44C" />

        <group position={[0, -0.4, 0]}>
          {/* Main Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#241F1A" roughness={0.9} />
          </mesh>
          
          <gridHelper args={[20, 20, "#D4A44C33", "#D4A44C11"]} position={[0, 0.01, 0]} />

          {/* Wall accents */}
          <mesh position={[0, 1, -10]}>
            <boxGeometry args={[20, 2, 0.1]} />
            <meshStandardMaterial color="#1A1612" transparent opacity={0.2} />
          </mesh>
          <mesh position={[-10, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[20, 2, 0.1]} />
            <meshStandardMaterial color="#1A1612" transparent opacity={0.2} />
          </mesh>

          {/* Big Floor Label */}
          <Text
            position={[0, 0.02, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={2.5}
            color="#D4A44C"
            fillOpacity={0.03}
          >
            {activeFloor === 1 ? 'DINING ROOM' : 'UPPER LEVEL'}
          </Text>
        </group>

        {floorTables.map((table) => (
          <TableModel 
            key={table.id} 
            table={table} 
            isSelected={selectedTableId === table.id}
            onSelect={onSelect}
          />
        ))}
      </Canvas>

      <div className="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
        <h4 className="font-bebas text-lg tracking-widest text-[#D4A44C]/30 uppercase">3D Floor Plan View</h4>
        <p className="text-[10px] text-[#8A8278] italic uppercase tracking-wider">Drag to rotate • Click to select</p>
      </div>

      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <button 
          onClick={() => setActiveFloor(1)}
          className={cn("px-4 py-2 text-xs font-bebas tracking-widest transition-colors border backdrop-blur-md", activeFloor === 1 ? "bg-[#D4A44C] text-[#1A1612] border-[#D4A44C]" : "bg-[#1A1612]/60 text-[#D4A44C] border-[#D4A44C]/30 hover:bg-[#D4A44C]/20")}
        >
          FLOOR 1
        </button>
        <button 
          onClick={() => setActiveFloor(2)}
          className={cn("px-4 py-2 text-xs font-bebas tracking-widest transition-colors border backdrop-blur-md", activeFloor === 2 ? "bg-[#D4A44C] text-[#1A1612] border-[#D4A44C]" : "bg-[#1A1612]/60 text-[#D4A44C] border-[#D4A44C]/30 hover:bg-[#D4A44C]/20")}
        >
          FLOOR 2
        </button>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-none p-4 bg-black/40 backdrop-blur-sm border border-white/5">
        <div className="flex items-center gap-3 text-[9px] tracking-widest uppercase text-[#F5EFE0]/70">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4A9B6A]" /> Available
        </div>
        <div className="flex items-center gap-3 text-[9px] tracking-widest uppercase text-[#F5EFE0]/70">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C8442A]" /> Reserved
        </div>
        <div className="flex items-center gap-3 text-[9px] tracking-widest uppercase text-[#F5EFE0]/70">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4A44C]" /> Selected
        </div>
      </div>
    </div>
  );
};
