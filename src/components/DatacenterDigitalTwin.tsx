'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cpu, Server, Zap, Thermometer, Shield, Database, AlertTriangle,
    ChevronRight, X, Building, Eye, Layers, Target, Activity,
    RotateCcw, Maximize2, FileText, Link2, Gauge, Fan, Battery, Monitor,
    LayoutGrid, Power, Wind
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import ThreatIntelOverlay
const ThreatIntelOverlay = dynamic(() => import('./ThreatIntelOverlay'), { ssr: false })

// ==================== DATACENTER SBOM (CycloneDX) ====================
// Enhanced with specific equipment details
const DC_SBOM = {
    // Zone 5: Power Systems
    'ups-vertiv-exl': {
        bomRef: 'urn:aeon:dc:ups-vertiv-exl-001',
        name: 'Vertiv Liebert EXL S1 800kVA UPS',
        zone: 'Z5A-PowerRoom',
        zoneLabel: 'Power Room (Secure)',
        version: '2.4.1',
        supplier: 'Vertiv Co.',
        description: 'Online double-conversion 3-phase UPS with 97% efficiency. 15min VRLA battery runtime.',
        connections: ['pdu-servertech', 'ats-asco', 'epms-schneider'],
        sbom: [
            { name: 'Liebert Firmware', version: '2.4.1', purl: 'pkg:firmware/vertiv/liebert-exl@2.4.1', cve: 'CVE-2024-1111', epss: 0.089, cvss: 7.5, description: 'Remote management RCE.' },
            { name: 'SNMP Agent', version: '3.2', purl: 'pkg:generic/snmp-agent@3.2', cve: 'CVE-2024-0001', epss: 0.023, cvss: 5.5, description: 'Info disclosure.' }
        ],
        rams: { mtbf: '300000h', sil: 2, availabilityTarget: 0.99999, safetyFunction: 'Power Continuity' },
        iec62443: { slTarget: 3, frMapping: ['FR7-RA', 'FR3-SI'], tier: 'Tier IV' }
    },
    'gen-caterpillar': {
        bomRef: 'urn:aeon:dc:gen-caterpillar-001',
        name: 'Caterpillar 3516B 2000kW Diesel Generator',
        zone: 'Z5A-PowerRoom',
        zoneLabel: 'Power Room (Secure)',
        version: 'EPA Tier 4',
        supplier: 'Caterpillar Inc.',
        description: 'V16, 4-stroke-cycle diesel engine. 2000 ekW standby power.',
        connections: ['ats-asco'],
        sbom: [
            { name: 'Deep Sea DSE8610 Controller', version: '4.2', purl: 'pkg:firmware/deepsea/dse8610@4.2', cve: null, epss: 0.001, description: '' }
        ],
        rams: { mtbf: '50000h', sil: 2, availabilityTarget: 0.999, safetyFunction: 'Emergency Power' },
        iec62443: { slTarget: 2, frMapping: ['FR7-RA', 'FR3-SI'], tier: 'Tier II' }
    },
    // Zone 6: Cooling
    'chiller-york': {
        bomRef: 'urn:aeon:dc:chiller-york-001',
        name: 'York YVAA 1500-ton Air-Cooled Chiller',
        zone: 'Z6A-CoolingYard',
        zoneLabel: 'Cooling Yard (Outdoor)',
        version: '4.8.0',
        supplier: 'Johnson Controls',
        description: 'Variable speed drive screw chiller. High efficiency air-cooled configuration.',
        connections: ['bms-siemens'],
        sbom: [
            { name: 'York Microprocessor Control', version: '4.8.0', purl: 'pkg:firmware/york/yk-controller@4.8.0', cve: null, epss: 0.003, description: '' }
        ],
        rams: { mtbf: '80000h', sil: 1, availabilityTarget: 0.999, safetyFunction: 'Primary Cooling' },
        iec62443: { slTarget: 2, frMapping: ['FR7-RA', 'FR3-SI'], tier: 'Tier II' }
    },
    'crac-liebert': {
        bomRef: 'urn:aeon:dc:crac-liebert-001',
        name: 'Liebert DS Precision Cooling',
        zone: 'Z6A-DataHall',
        zoneLabel: 'Data Hall (Internal)',
        version: '5.2.0',
        supplier: 'Vertiv Co.',
        description: 'Downflow configuration with EC fans. Connected to chilled water loop.',
        connections: ['bms-siemens', 'chiller-york'],
        sbom: [
            { name: 'Liebert iCOM', version: '5.2.0', purl: 'pkg:firmware/vertiv/icom@5.2.0', cve: 'CVE-2024-5555', epss: 0.089, cvss: 7.2, description: 'SQLi in logs.' }
        ],
        rams: { mtbf: '60000h', sil: 1, availabilityTarget: 0.9999, safetyFunction: 'Thermal Control' },
        iec62443: { slTarget: 3, frMapping: ['FR7-RA'], tier: 'Tier III' }
    },
    // Data Hall Racks
    'rack-server-01': {
        bomRef: 'urn:aeon:dc:rack-server-01',
        name: 'Compute Rack A01',
        zone: 'Z2-DataHall',
        zoneLabel: 'Data Hall (Cold Aisle)',
        version: 'N/A',
        supplier: 'Dell/Cisco',
        description: 'High-density compute rack with 42U capacity. Dual PDU feeds.',
        connections: ['pdu-servertech', 'ToR-Switch'],
        sbom: [
            { name: 'Dell iDRAC9', version: '5.10', purl: 'pkg:firmware/dell/idrac9@5.10', cve: 'CVE-2024-9999', epss: 0.85, cvss: 9.8, description: 'Critical RCE in management interface.' }, // HIGH RISK DEMO
            { name: 'VMware ESXi', version: '7.0', purl: 'pkg:sw/vmware/esxi@7.0', cve: 'CVE-2024-8888', epss: 0.45, cvss: 8.8, description: 'Heap overflow.' }
        ],
        rams: { mtbf: 'N/A', sil: 0, availabilityTarget: 0.999, safetyFunction: 'Compute' },
        iec62443: { slTarget: 3, frMapping: ['FR1-IAC', 'FR3-SI', 'FR7-RA'], tier: 'Tier III' }
    }
}

// ==================== MAIN COMPONENT ====================
export default function DatacenterDigitalTwin() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
    const [cameraView, setCameraView] = useState<'hall' | 'power' | 'cooling'>('hall')
    const [isLoading, setIsLoading] = useState(true)
    const [babylonLoaded, setBabylonLoaded] = useState(false)
    const [showThreatOverlay, setShowThreatOverlay] = useState(false)
    const engineRef = useRef<any>(null)
    const sceneRef = useRef<any>(null)
    const cameraRef = useRef<any>(null)

    // Load Babylon + Materials
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://cdn.babylonjs.com/babylon.js'
        script.async = true
        script.onload = () => {
            const matScript = document.createElement('script')
            matScript.src = 'https://cdn.babylonjs.com/materialsLibrary/babylon.gridMaterial.min.js'
            matScript.async = true
            matScript.onload = () => setBabylonLoaded(true)
            document.head.appendChild(matScript)
        }
        document.head.appendChild(script)
        return () => { }
    }, [])

    // Build HYPER-DETAIL Scene
    useEffect(() => {
        if (!babylonLoaded || !canvasRef.current || !(window as any).BABYLON) return
        const BABYLON = (window as any).BABYLON
        setIsLoading(true)

        const engine = new BABYLON.Engine(canvasRef.current, true, { stencil: true })
        engineRef.current = engine
        const scene = new BABYLON.Scene(engine)
        sceneRef.current = scene
        scene.clearColor = new BABYLON.Color4(0.005, 0.005, 0.01, 1) // Deep black/blue

        // --- LIGHTING ---
        const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)
        hemi.intensity = 0.3

        // Spotlights for specific zones
        const spotHall = new BABYLON.SpotLight("spotHall", new BABYLON.Vector3(0, 20, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 2.5, 2, scene)
        spotHall.diffuse = new BABYLON.Color3(0.5, 0.8, 1) // Blue tint for data hall
        spotHall.intensity = 0.8

        const spotPower = new BABYLON.SpotLight("spotPower", new BABYLON.Vector3(-20, 20, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 2.5, 2, scene)
        spotPower.diffuse = new BABYLON.Color3(1, 0.9, 0.7) // Warm tint for power
        spotPower.intensity = 0.8

        // --- MATERIALS (PBR-like Standard) ---
        const createMat = (name: string, hex: string, spec: boolean = true) => {
            const mat = new BABYLON.StandardMaterial(name, scene)
            const col = BABYLON.Color3.FromHexString(hex)
            mat.diffuseColor = col
            mat.emissiveColor = col.scale(0.1)
            if (spec) mat.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5)
            return mat
        }

        const yellowMat = createMat("catYellow", "#F5CE0B")
        const blackMat = createMat("matteBlack", "#111111")
        const whiteMat = createMat("cleanWhite", "#eeeeee")
        const rackMat = createMat("rackBlack", "#1a1a1a")
        const trayMat = createMat("trayOrange", "#ffaa00", false)
        const glassMat = createMat("glass", "#88ccff")
        glassMat.alpha = 0.2
        const ledGreen = createMat("ledGreen", "#00ff00")
        ledGreen.emissiveColor = new BABYLON.Color3(0, 1, 0)
        const ledRed = createMat("ledRed", "#ff0000")
        ledRed.emissiveColor = new BABYLON.Color3(1, 0, 0)

        // Grid Floor
        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene)
        const groundMat = new BABYLON.GridMaterial('groundMat', scene)
        groundMat.mainColor = new BABYLON.Color3(0.1, 0.1, 0.2)
        groundMat.lineColor = new BABYLON.Color3(0.1, 0.3, 0.5)
        groundMat.opacity = 0.95
        groundMat.gridRatio = 5
        ground.material = groundMat
        ground.position.y = -0.05

        // --- GEOMETRY BUILDERS ---

        const buildInteractive = (mesh: any, id: string) => {
            mesh.metadata = { id }
            mesh.isPickable = true
            mesh.actionManager = new BABYLON.ActionManager(scene)
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                setSelectedComponent(id)
            }))
        }

        // 1. CATERPILLAR GENERATOR (Power Room)
        const createGenerator = (x: number, z: number, id: string) => {
            const root = new BABYLON.TransformNode("genRoot", scene)
            root.position = new BABYLON.Vector3(x, 0, z)

            // Engine Block (V-Shape)
            const block = BABYLON.MeshBuilder.CreateBox("engBlock", { width: 4, height: 2.5, depth: 8 }, scene)
            block.position.y = 1.25
            block.material = yellowMat
            block.parent = root
            buildInteractive(block, id)

            // Radiator (Black box at front)
            const radiator = BABYLON.MeshBuilder.CreateBox("rad", { width: 5, height: 4, depth: 1 }, scene)
            radiator.position = new BABYLON.Vector3(0, 2, 4.5)
            radiator.material = blackMat
            radiator.parent = root

            // Exhaust Pipe (Curved tube)
            const exhaust = BABYLON.MeshBuilder.CreateTube("exhaust", {
                path: [new BABYLON.Vector3(0, 2, -2), new BABYLON.Vector3(0, 5, -2), new BABYLON.Vector3(2, 6, -2)],
                radius: 0.4
            }, scene)
            exhaust.material = blackMat
            exhaust.parent = root
        }

        // 2. VERTIV UPS (Black Cabinets)
        const createUPS = (x: number, z: number, id: string) => {
            const cab = BABYLON.MeshBuilder.CreateBox("ups", { width: 1.5, height: 3, depth: 1.5 }, scene)
            cab.position = new BABYLON.Vector3(x, 1.5, z)
            cab.material = blackMat
            buildInteractive(cab, id)
        }

        // 3. YORK CHILLER (Cooling Yard)
        const createChiller = (x: number, z: number, id: string) => {
            const root = new BABYLON.TransformNode("chillerRoot", scene)
            root.position = new BABYLON.Vector3(x, 0, z)

            // Base
            const base = BABYLON.MeshBuilder.CreateBox("base", { width: 4, height: 2, depth: 8 }, scene)
            base.position.y = 1
            base.material = whiteMat
            base.parent = root
            buildInteractive(base, id)

            // Fans (V-Bank)
            for (let i = 0; i < 3; i++) {
                const fanHousing = BABYLON.MeshBuilder.CreateCylinder("fan" + i, { height: 0.5, diameter: 2 }, scene)
                fanHousing.rotation.x = Math.PI / 2
                fanHousing.position = new BABYLON.Vector3(0, 2.2, -2.5 + i * 2.5)
                fanHousing.material = blackMat
                fanHousing.parent = root
            }
        }

        // 4. DATA HALL RACK + CONTAINMENT
        const createRack = (x: number, z: number, rowId: string, rackNum: number) => {
            // Cabinet
            const rack = BABYLON.MeshBuilder.CreateBox(`rack-${rowId}-${rackNum}`, { width: 1.2, height: 3.5, depth: 1.5 }, scene)
            rack.position = new BABYLON.Vector3(x, 1.75, z)
            rack.material = rackMat

            // Server LEDs (Blinking effect simulated by static random for now)
            for (let i = 0; i < 8; i++) {
                const led = BABYLON.MeshBuilder.CreatePlane(`led-${i}`, { size: 0.05 }, scene)
                led.parent = rack
                led.position.z = -0.76 // Front face
                led.position.x = (Math.random() - 0.5) * 0.8
                led.position.y = (Math.random() - 0.5) * 3
                led.material = Math.random() > 0.9 ? ledRed : ledGreen
            }

            buildInteractive(rack, 'rack-server-01')
        }

        // --- SCENE LAYOUT & GENERATION ---

        // ZONE 5: Power Room (Left)
        createGenerator(-25, 0, 'gen-caterpillar')
        createGenerator(-25, 12, 'gen-caterpillar-2')

        // UPS Bank (x6)
        for (let i = 0; i < 6; i++) {
            createUPS(-15, -6 + (i * 2.5), 'ups-vertiv-exl')
        }

        // ZONE 7: Data Hall (Center) - HIGH DENSITY
        // 4 Rows of 8 Racks = 32 Racks
        for (let row = 0; row < 4; row++) {
            const zPos = -10 + (row * 6) // Row spacing

            // Cable Tray (Overhead yellow mesh)
            const tray = BABYLON.MeshBuilder.CreateBox(`tray-${row}`, { width: 18, height: 0.2, depth: 1 }, scene)
            tray.position = new BABYLON.Vector3(0, 4.5, zPos)
            tray.material = trayMat

            // Cold Aisle Containment Roof
            const roof = BABYLON.MeshBuilder.CreatePlane(`roof-${row}`, { width: 16, height: 3 }, scene)
            roof.rotation.x = Math.PI / 2
            roof.position = new BABYLON.Vector3(0, 3.5, zPos + 1.5) // Between rows
            roof.material = glassMat

            for (let r = 0; r < 8; r++) {
                const xPos = -9 + (r * 2.5)
                createRack(xPos, zPos, `Row${row + 1}`, r + 1)
            }
        }

        // ZONE 6: Cooling Yard (Right)
        createChiller(25, -6, 'chiller-york')
        createChiller(25, 8, 'chiller-york-2')

        // Walls (Separation)
        const wall1 = BABYLON.MeshBuilder.CreateBox("wall1", { width: 0.5, height: 8, depth: 60 }, scene)
        wall1.position.x = -12
        wall1.material = createMat("wall", "#333333")

        const wall2 = BABYLON.MeshBuilder.CreateBox("wall2", { width: 0.5, height: 8, depth: 60 }, scene)
        wall2.position.x = 12
        wall2.material = createMat("wall", "#333333")

        // --- CAMERA (Orbit Controls) ---
        const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3, 40, BABYLON.Vector3.Zero(), scene)
        camera.attachControl(canvasRef.current, true)
        camera.lowerRadiusLimit = 10
        camera.upperRadiusLimit = 100
        camera.wheelPrecision = 50
        // Auto-rotation: slow continuous spin
        camera.useAutoRotationBehavior = true
        if (camera.autoRotationBehavior) {
            camera.autoRotationBehavior.idleRotationSpeed = 0.05 // Slow rotation
            camera.autoRotationBehavior.idleRotationWaitTime = 1000 // 1 second before auto-rotate
            camera.autoRotationBehavior.idleRotationSpinupTime = 1000 // 1 second spinup
        }
        cameraRef.current = camera

        engine.runRenderLoop(() => scene.render())
        window.addEventListener('resize', () => engine.resize())
        setIsLoading(false)

        return () => { scene.dispose(); engine.dispose() }
    }, [babylonLoaded])

    // Camera Switch Logic (Orbit Target Switch)
    const switchView = (view: 'hall' | 'power' | 'cooling') => {
        setCameraView(view)
        const cam = cameraRef.current
        if (!cam) return

        const BABYLON = (window as any).BABYLON
        // New Targets based on High Density Layout
        const target = view === 'hall' ? new BABYLON.Vector3(0, 0, 0) :
            view === 'power' ? new BABYLON.Vector3(-20, 0, 5) :
                new BABYLON.Vector3(25, 0, 0)

        // Animate Camera (Simple interpolation)
        cam.setTarget(target)
        cam.radius = view === 'hall' ? 25 : 20
    }

    const selectedData = selectedComponent ? DC_SBOM[selectedComponent as keyof typeof DC_SBOM] : null

    return (
        <>
            <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl relative h-[600px] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-gradient-to-r from-gray-900 to-black flex justify-between items-center z-10 relative">
                    <div>
                        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            <Building className="text-oxot-gold" size={18} />
                            TIER III DATACENTER
                        </h2>
                        <div className="flex gap-4 text-[10px] font-mono text-gray-400 mt-1">
                            <span className="flex items-center gap-1"><Power size={10} className="text-oxot-gold" /> 2N POWER</span>
                            <span className="flex items-center gap-1"><Wind size={10} className="text-oxot-blue-light" /> N+1 COOLING</span>
                            <span className="flex items-center gap-1"><Shield size={10} className="text-oxot-gold" /> BIOMETRIC ACCESS</span>
                        </div>
                    </div>

                    {/* Room Switcher */}
                    <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                        <button onClick={() => switchView('power')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${cameraView === 'power' ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:text-white'}`}>POWER</button>
                        <button onClick={() => switchView('hall')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${cameraView === 'hall' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>DATA HALL</button>
                        <button onClick={() => switchView('cooling')} className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${cameraView === 'cooling' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'}`}>COOLING</button>
                    </div>
                </div>

                {/* 3D Viewport */}
                <div className="flex-1 relative bg-black">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
                            <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mb-4" />
                            <div className="text-yellow-500 font-mono text-xs animate-pulse">LOADING ASSETS...</div>
                        </div>
                    )}
                    <canvas ref={canvasRef} className="w-full h-full outline-none block" />

                    {/* Detail Panel Popup */}
                    <AnimatePresence>
                        {selectedData && (
                            <motion.div
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                className="absolute top-4 right-4 bottom-4 w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-6 flex flex-col shadow-2xl z-30"
                            >
                                <button onClick={() => setSelectedComponent(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>

                                <div className="mb-6">
                                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-900/30 px-2 py-1 rounded">{selectedData.bomRef}</span>
                                    <h3 className="text-2xl font-bold text-white mt-2 leading-none">{selectedData.name}</h3>
                                    <div className="text-xs text-gray-400 mt-1">{selectedData.zoneLabel}</div>
                                    <button className="mt-4 flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors" onClick={() => setShowThreatOverlay(true)}>
                                        <AlertTriangle size={18} />
                                        VIEW THREAT CALCULUS
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Overlay */}
            {selectedData && (
                <ThreatIntelOverlay
                    isOpen={showThreatOverlay}
                    onClose={() => setShowThreatOverlay(false)}
                    componentName={selectedData.name}
                    assetId={selectedData.bomRef}
                    epssScore={Math.max(...(selectedData.sbom || []).map(s => s.epss || 0), 0.001)}
                    cves={(selectedData.sbom || []).filter(s => s.cve).map(s => ({ id: s.cve!, cvss: (s as any).cvss || 0, description: s.description || '' }))}
                    frs={selectedData.iec62443.frMapping}
                    zone={selectedData.zone}
                />
            )}
        </>
    )
}
