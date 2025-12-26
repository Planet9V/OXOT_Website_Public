'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Factory, Train, Droplets, RotateCcw, Maximize2, Eye, Layers, Target,
    AlertTriangle, FileText, X, Activity, Shield, Link2, Database, ChevronRight
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Import ThreatIntelOverlay
const ThreatIntelOverlay = dynamic(() => import('./ThreatIntelOverlay'), { ssr: false })

// ==================== SBOM DATA (CycloneDX-inspired) ====================
const SBOM_DATA = {
    // Railway Station Components
    'plc-rail-signaling': {
        bomRef: 'urn:aeon:component:plc-rail-signaling-001',
        name: 'Signaling Safety PLC',
        zone: 'Z1-Safety',
        version: '2.9.4',
        supplier: 'Siemens AG',
        description: 'Safety-rated PLC controlling platform interlocking and signal aspects per EN 50129 SIL-4.',
        connections: ['hmi-rail-main', 'sensor-rail-occupation', 'actuator-signal-aspects'],
        sbom: [
            { name: 'SIMATIC S7-1500F Firmware', version: '2.9.4', purl: 'pkg:firmware/siemens/s7-1500f@2.9.4', cve: 'CVE-2024-38876', epss: 0.089, cvss: 7.5, description: 'Integer overflow in packet parsing.' },
            { name: 'OpenSSL', version: '1.0.2k', purl: 'pkg:deb/debian/openssl@1.0.2k', cve: 'CVE-2024-0778', epss: 0.342, cvss: 9.8, description: 'Denial of service via infinite loop.' },
        ],
        rams: { mtbf: '50000h', sil: 4, availabilityTarget: 0.99999, safetyFunction: 'Interlocking Logic' },
        iec62443: { slTarget: 4, frMapping: ['FR1-IAC', 'FR2-UC', 'FR3-SI', 'FR6-TRE'] }
    },
    'hmi-rail-main': {
        bomRef: 'urn:aeon:component:hmi-rail-main-001',
        name: 'Operator Workstation HMI',
        zone: 'Z2-Supervision',
        version: '7.5 SP2',
        supplier: 'Siemens AG',
        description: 'Safety display workstation for train control operators.',
        connections: ['plc-rail-signaling', 'server-historian'],
        sbom: [
            { name: 'WinCC Runtime', version: '7.5', purl: 'pkg:nuget/siemens/wincc@7.5', cve: 'CVE-2024-2222', epss: 0.153, cvss: 8.1, description: 'Unauthenticated RCE in web navigation.' }
        ],
        rams: { mtbf: '8760h', sil: 2, availabilityTarget: 0.999, safetyFunction: 'Operator Display' },
        iec62443: { slTarget: 3, frMapping: ['FR1-IAC', 'FR2-UC', 'FR4-DC'] }
    },
    'sensor-rail-occupation': {
        bomRef: 'urn:aeon:component:sensor-rail-occupation-001',
        name: 'Axle Counter (Occupancy)',
        zone: 'Z0-Field',
        version: '4.2.1',
        supplier: 'Frauscher',
        description: 'Inductive wheel sensor for track vacancy detection.',
        connections: ['plc-rail-signaling'],
        sbom: [
            { name: 'Frauscher Firmware', version: '4.2.1', purl: 'pkg:firmware/frauscher/fadc@4.2.1', cve: null, epss: 0.002, description: '' }
        ],
        rams: { mtbf: '100000h', sil: 4, availabilityTarget: 0.999999, safetyFunction: 'Track Detection' },
        iec62443: { slTarget: 2, frMapping: ['FR3-SI', 'FR7-RA'] }
    },
    // Hydroelectric Dam
    'plc-dam-turbine': {
        bomRef: 'urn:aeon:component:plc-dam-turbine-001',
        name: 'Turbine Governor PLC',
        zone: 'Z1-Control',
        version: '5.6.2',
        supplier: 'ABB Ltd',
        description: 'High-performance controller for Francis turbine speed regulation.',
        connections: ['hmi-dam-control', 'actuator-wicket-gates', 'sensor-turbine-speed'],
        sbom: [
            { name: 'ABB AC500-XC Firmware', version: '5.6.2', purl: 'pkg:firmware/abb/ac500-xc@5.6.2', cve: 'CVE-2024-5555', epss: 0.078, cvss: 7.2, description: 'Privilege escalation in bootloader.' }
        ],
        rams: { mtbf: '87600h', sil: 3, availabilityTarget: 0.9999, safetyFunction: 'Turbine Speed Control' },
        iec62443: { slTarget: 4, frMapping: ['FR1-IAC', 'FR2-UC', 'FR3-SI'] }
    },
    'actuator-wicket-gates': {
        bomRef: 'urn:aeon:component:actuator-wicket-gates-001',
        name: 'Wicket Gate Servo',
        zone: 'Z0-Field',
        version: '2.3.0',
        supplier: 'Voith Hydro',
        description: 'Hydraulic servo actuator controlling water flow.',
        connections: ['plc-dam-turbine'],
        sbom: [],
        rams: { mtbf: '43800h', sil: 2, availabilityTarget: 0.999, safetyFunction: 'Water Flow Control' },
        iec62443: { slTarget: 2, frMapping: ['FR3-SI', 'FR7-RA'] }
    },
    'hmi-dam-control': {
        bomRef: 'urn:aeon:component:hmi-dam-control-001',
        name: 'Dam Control HMI',
        zone: 'Z2-Supervision',
        version: '12.1',
        supplier: 'GE Digital',
        description: 'iFIX-based SCADA visualization for dam operations.',
        connections: ['plc-dam-turbine'],
        sbom: [
            { name: 'GE iFIX', version: '12.1', purl: 'pkg:nuget/ge/ifix@12.1', cve: 'CVE-2024-8888', epss: 0.234, cvss: 8.8, description: 'Stack buffer overflow.' }
        ],
        rams: { mtbf: '8760h', sil: 2, availabilityTarget: 0.999, safetyFunction: 'Operator Interface' },
        iec62443: { slTarget: 3, frMapping: ['FR1-IAC', 'FR2-UC'] }
    }
}

// ==================== SCENE CONFIGS ====================
const SCENES = {
    railway: {
        id: 'railway', name: 'Railway Station', icon: Train, color: 'cyan',
        description: 'Metro signaling & interlocking system (SIL-4)'
    },
    dam: {
        id: 'dam', name: 'Hydroelectric Dam', icon: Droplets, color: 'blue',
        description: 'Turbine governor & SCADA control'
    }
}

// ==================== MAIN COMPONENT ====================
export default function BabylonDigitalTwin() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [activeScene, setActiveScene] = useState<'railway' | 'dam'>('railway')
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
    const [isExploded, setIsExploded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [babylonLoaded, setBabylonLoaded] = useState(false)
    const [showThreatOverlay, setShowThreatOverlay] = useState(false)
    const engineRef = useRef<any>(null)
    const sceneRef = useRef<any>(null)

    // Load Babylon + GridMaterial
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

    // Build Holographic Scene
    useEffect(() => {
        if (!babylonLoaded || !canvasRef.current || !(window as any).BABYLON) return
        const BABYLON = (window as any).BABYLON

        setIsLoading(true)
        const engine = new BABYLON.Engine(canvasRef.current, true, { stencil: true })
        engineRef.current = engine
        const scene = new BABYLON.Scene(engine)
        sceneRef.current = scene
        scene.clearColor = new BABYLON.Color4(0.01, 0.01, 0.02, 1)

        // Holographic Lighting
        const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene)
        hemi.intensity = 0.3
        hemi.groundColor = new BABYLON.Color3(0, 0.2, 0.4) // Blueish ground ambient

        const spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(0, 10, 0), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene)
        spot.intensity = 0.8
        spot.diffuse = new BABYLON.Color3(0.5, 0.8, 1)

        const gl = new BABYLON.GlowLayer("glow", scene)
        gl.intensity = 1.2

        // Grid Ground
        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, scene)
        const groundMat = new BABYLON.GridMaterial('groundMat', scene)
        groundMat.majorUnitFrequency = 5
        groundMat.minorUnitVisibility = 0.3
        groundMat.gridRatio = 1
        groundMat.mainColor = new BABYLON.Color3(0, 0.05, 0.1)
        groundMat.lineColor = new BABYLON.Color3(0, 0.3, 0.6)
        groundMat.opacity = 0.8
        ground.material = groundMat
        ground.position.y = -2

        // --- HOLOGRAPHIC MATERIALS ---
        const createHoloMat = (colorHex: string) => {
            const mat = new BABYLON.StandardMaterial("holo_" + colorHex, scene)
            const col = BABYLON.Color3.FromHexString(colorHex)
            mat.diffuseColor = col
            mat.emissiveColor = col.scale(0.4) // Inner glow
            mat.alpha = 0.6
            mat.wireframe = true // Tech look
            return mat
        }

        const createSolidMat = (colorHex: string) => {
            const mat = new BABYLON.StandardMaterial("solid_" + colorHex, scene)
            const col = BABYLON.Color3.FromHexString(colorHex)
            mat.diffuseColor = col
            mat.specularColor = BABYLON.Color3.White()
            mat.emissiveColor = col.scale(0.1)
            return mat
        }

        // --- SCENE BUILDERS ---
        const buildInteractiveComponent = (mesh: any, id: string) => {
            mesh.metadata = {
                id,
                originalPos: mesh.position.clone(),
                explodeDir: mesh.position.clone().normalize()
            }
            mesh.isPickable = true
            mesh.actionManager = new BABYLON.ActionManager(scene)
            mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
                setSelectedComponent(id)
            }))
        }

        if (activeScene === 'railway') {
            // Tracks (Procedural)
            const trackL = BABYLON.MeshBuilder.CreateBox("trackL", { width: 0.2, height: 0.1, depth: 20 }, scene)
            trackL.position.x = -1
            trackL.position.y = -1.9
            trackL.material = createSolidMat('#555555')

            const trackR = BABYLON.MeshBuilder.CreateBox("trackR", { width: 0.2, height: 0.1, depth: 20 }, scene)
            trackR.position.x = 1
            trackR.position.y = -1.9
            trackR.material = createSolidMat('#555555')

            // Sleepers
            for (let i = -9; i < 9; i += 1.5) {
                const sl = BABYLON.MeshBuilder.CreateBox("sleeper" + i, { width: 3, height: 0.1, depth: 0.5 }, scene)
                sl.position.z = i
                sl.position.y = -2
                sl.material = createSolidMat('#332211')
            }

            // SIGNAL (Actuator)
            const pole = BABYLON.MeshBuilder.CreateCylinder("pole", { height: 4, diameter: 0.2 }, scene)
            pole.position = new BABYLON.Vector3(3, 0, 0)
            pole.material = createSolidMat('#888888')

            const head = BABYLON.MeshBuilder.CreateBox("head", { width: 0.5, height: 1.5, depth: 0.5 }, scene)
            head.position = new BABYLON.Vector3(3, 1.5, 0)
            head.material = createSolidMat('#111111')

            const lightGreen = BABYLON.MeshBuilder.CreateSphere("lg", { diameter: 0.3 }, scene)
            lightGreen.position = new BABYLON.Vector3(2.7, 1.8, 0)
            lightGreen.material = createHoloMat('#00ff00')
            // Group signal
            const signalRoot = new BABYLON.TransformNode("signalRoot", scene)
            pole.parent = signalRoot
            head.parent = signalRoot
            lightGreen.parent = signalRoot
            // Interactable
            const signalHitbox = BABYLON.MeshBuilder.CreateBox("signalBox", { width: 1, height: 4, depth: 1 }, scene)
            signalHitbox.position = new BABYLON.Vector3(3, 0, 0)
            signalHitbox.visibility = 0
            buildInteractiveComponent(signalHitbox, 'plc-rail-signaling') // Mapping to PLC/Signal logic for demo

            // SENSOR (Axle Counter)
            const sensor = BABYLON.MeshBuilder.CreateBox("sensor", { width: 1, height: 0.3, depth: 0.5 }, scene)
            sensor.position = new BABYLON.Vector3(-1.2, -1.8, -4)
            sensor.material = createHoloMat('#ffff00')
            buildInteractiveComponent(sensor, 'sensor-rail-occupation')

            // HMI (Booth)
            const booth = BABYLON.MeshBuilder.CreateBox("booth", { width: 2, height: 2.5, depth: 2 }, scene)
            booth.position = new BABYLON.Vector3(-4, -0.75, 2)
            booth.material = createHoloMat('#00ffff')
            buildInteractiveComponent(booth, 'hmi-rail-main')

        } else {
            // DAM
            // Turbine (Cylinder + Blades)
            const turbineBody = BABYLON.MeshBuilder.CreateCylinder("tBody", { height: 2, diameter: 2 }, scene)
            turbineBody.position.y = -1
            turbineBody.material = createSolidMat('#4444ff')

            for (let i = 0; i < 6; i++) {
                const blade = BABYLON.MeshBuilder.CreateBox("blade" + i, { width: 0.2, height: 1.5, depth: 3 }, scene)
                blade.rotation.y = i * (Math.PI / 3)
                blade.position.y = -1
                blade.material = createHoloMat('#00aaff')
                blade.parent = turbineBody
            }

            // Animation
            scene.registerBeforeRender(() => {
                turbineBody.rotation.y += 0.05
            })

            buildInteractiveComponent(turbineBody, 'plc-dam-turbine')

            // Wicket Gates (Ring)
            const ring = BABYLON.MeshBuilder.CreateTorus("gateRing", { diameter: 3.5, thickness: 0.3 }, scene)
            ring.position.y = 0.2
            ring.material = createHoloMat('#00ff88')
            buildInteractiveComponent(ring, 'actuator-wicket-gates')

            // HMI
            const panel = BABYLON.MeshBuilder.CreateBox("panel", { width: 3, height: 2, depth: 0.2 }, scene)
            panel.position = new BABYLON.Vector3(0, 2, 4)
            panel.material = createHoloMat('#aa00ff')
            buildInteractiveComponent(panel, 'hmi-dam-control')
        }

        // Camera
        const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 3, 14, BABYLON.Vector3.Zero(), scene)
        camera.attachControl(canvasRef.current, true)
        camera.wheelPrecision = 20

        engine.runRenderLoop(() => scene.render())
        window.addEventListener('resize', () => engine.resize())
        setIsLoading(false)

        return () => { scene.dispose(); engine.dispose() }
    }, [babylonLoaded, activeScene])

    const toggleExplode = () => { /* reuse explode logic if needed, skipped for procedural focus */ }
    const currentScene = SCENES[activeScene]
    const selectedData = selectedComponent ? SBOM_DATA[selectedComponent as keyof typeof SBOM_DATA] : null

    return (
        <>
            <div className="bg-black/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm relative">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
                    <div>
                        <h3 className="text-white font-bold text-lg flex items-center gap-2 font-mono">
                            <Factory size={18} className="text-cyan-400" />
                            DIGITAL_TWIN_VIEWER
                        </h3>
                        <p className="text-[10px] text-gray-500 font-mono">HOLOGRAPHIC MODE • {currentScene.name.toUpperCase()}</p>
                    </div>
                    <div className="flex gap-2">
                        {Object.values(SCENES).map(s => (
                            <button key={s.id} onClick={() => { setActiveScene(s.id as any); setSelectedComponent(null) }}
                                className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center gap-1 transition-all border
                            ${activeScene === s.id ? `bg-${s.color}-500/20 text-${s.color}-400 border-${s.color}-500/50` : 'text-gray-500 border-transparent hover:text-white'}`}>
                                <s.icon size={12} /> {s.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Viewport */}
                <div className="flex h-[500px]">
                    <div className="flex-1 relative bg-black">
                        {isLoading && <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-mono text-xs animate-pulse">INITIALIZING HOLOGRAM...</div>}
                        <canvas ref={canvasRef} className="w-full h-full outline-none" />
                    </div>

                    {/* Detail Panel */}
                    <AnimatePresence>
                        {selectedData && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 340, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="border-l border-white/10 bg-black/80 backdrop-blur-xl flex flex-col p-5 overflow-y-auto"
                            >
                                <div className="flex justify-between mb-4">
                                    <h4 className="text-lg font-bold text-white cursor-pointer group">
                                        {selectedData.name}
                                        <span className="block text-[10px] text-cyan-500 font-mono group-hover:text-cyan-400 transition-colors">{selectedData.bomRef}</span>
                                    </h4>
                                    <button onClick={() => setSelectedComponent(null)}><X size={16} className="text-gray-500 hover:text-white" /></button>
                                </div>

                                <p className="text-xs text-gray-400 mb-4">{selectedData.description}</p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                                        <span className="text-gray-500">SIL Level</span>
                                        <span className={`font-bold ${selectedData.rams.sil >= 3 ? 'text-green-400' : 'text-yellow-400'}`}>SIL-{selectedData.rams.sil}</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                                        <span className="text-gray-500">Security Target</span>
                                        <span className={`font-bold ${selectedData.iec62443.slTarget >= 3 ? 'text-red-400' : 'text-orange-400'}`}>SL-T {selectedData.iec62443.slTarget}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowThreatOverlay(true)}
                                    className="w-full py-3 mb-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded flex items-center justify-center gap-2 text-red-400 font-bold text-xs transition-all"
                                >
                                    <AlertTriangle size={14} /> THREAT INTEL
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

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
