# OSINT Batch 2 Findings

## 4. OT Hardware Fingerprinting
- **Findings**: Public documents focus on sustainability (biomass boilers) and production capacity, not engineering specs.
- **Inference**: "Security by Obscurity" is active. No public engineering brochures found.
- **Specifics**: Koog aan de Zaan facility uses automated refiners and conches, but control system brands (Siemens/Rockwell) are not explicitly named in press releases.

## 5. Exposed Services (Shodan)
- **Status**: No public reports of exposed Modbus/S7/BACnet ports for Olam.
- **Dorks**: Standard dorks (`org:"Olam" port:502`) yield no results in search summaries.
- **Assessment**: Perimeter likely firewalled, or assets registered under obscure ISP names (not "Olam").

## 6. Supply Chain Logistics
- **Status**: No specific 3PL partners (Maersk, DHL, etc.) identified in public search.
- **Note**: "Olam Direct" is the primary digital interface, but the physical logistics partners are hidden.
