# **Comprehensive Architectural and Engineering Report: Dairy Processing Facilities in New Zealand and Australia**

## **1\. Strategic Compliance and Regulatory Architecture**

The establishment of a dairy processing facility or a large-scale milking center in the Oceania region is not merely a construction exercise; it is the creation of a hygienic fortress governed by some of the most stringent food safety frameworks globally. For a Limited Partnership (LP) entering this sector, understanding the regulatory architecture is as critical as understanding the physical engineering. The legal frameworks in New Zealand (NZ) and Australia dictate the physical form of the buildings, the materials used, the flow of personnel, and the digital traceability systems required.

### **1.1 New Zealand: The Ministry for Primary Industries (MPI) Framework**

In New Zealand, the dairy industry is the economic backbone, and its reputation is guarded by the **Ministry for Primary Industries (MPI)**. Any facility design must begin with a thorough interrogation of **NZCP1: Code of Practice for the Design and Operation of Farm Dairies**.1 This document is the bible for farm-side architecture. It is not a suggestion; it is a mandatory standard for anyone supplying raw milk for manufacture.

#### **1.1.1 Risk Management Programmes (RMP)**

The central pillar of the **Animal Products Act 1999** is the Risk Management Programme (RMP). Unlike prescriptive regulations that tell you exactly *what* to build, the RMP requires operators to demonstrate *how* their specific design manages risk.3 For an LP, this offers flexibility for innovation—such as automated milking or novel waste-to-energy systems—but it imposes a heavy burden of validation.

* **Design Implications:** The RMP dictates that the facility must be designed to validate safety *before* operation. This means installing redundant sensor arrays (temperature, flow, conductivity) at every critical control point (CCP) to generate the data required for RMP audits.  
* **Third-Party Supply:** If the facility intends to supply milk to third-party processors, the RMP must specifically cover this transport and transfer risk. A standard farm RMP is insufficient; a specific manufacturing supply RMP is required, influencing the design of tanker loading bays and on-farm storage silos.1

#### **1.1.2 NZCP1 Specific Architectural Constraints**

NZCP1 imposes hard constraints on site layout:

* **Siting and Separation:** The dairy must be located far enough from "offensive" areas (effluent ponds, silage stacks, dusty tracks) to prevent contamination. The prevailing wind direction must be analyzed during site selection to ensure airborne pathogens or odors do not drift into the milking or milk storage areas.1  
* **Milk Storage Room (Vat Room):** This room must be structurally separate from the milking area to prevent aerosolized manure or feed dust from entering. The code mandates impervious, washable surfaces. Concrete floors must be sealed with high-grade epoxy or polyurethane that can withstand daily acid/alkali wash cycles without pitting, as pitting creates harborage for *Listeria*.1

### **1.2 Australia: The Food Standards (FSANZ) Framework**

Across the Tasman, the regulatory architecture is defined by **Food Standards Australia New Zealand (FSANZ)**, specifically **Standard 4.2.4: Primary Production and Processing Standard for Dairy Products**.4 While similar to NZ, the enforcement mechanism is state-based (e.g., Dairy Food Safety Victoria, NSW Food Authority), which introduces localized nuances in hygienic design.

#### **1.2.1 Supply Chain Continuity**

Standard 4.2.4 is unique in explicitly linking the on-farm food safety program with the transport and processing sectors.

* **Transport Hygiene:** The standard mandates that dairy transport businesses—the bridge between farm and factory—must have their own documented food safety programs.4 This affects the architectural design of the **reception bay**. It is not just a parking spot; it is a sanitary processing zone where the tanker must be cleaned (CIP) and sanitized to the same standard as a milk silo.  
* **Traceability:** The facility must have systems to trace inputs (feed, veterinary medicines) and outputs (milk batches). This requires a digital architecture capable of linking a specific cow's milk yield to a specific tanker load, and ultimately to a specific bag of milk powder.4

#### **1.2.2 State-Level Hygienic Design Guidelines**

Bodies like **Dairy Food Safety Victoria (DFSV)** publish specific "Hygienic Design Guidelines" that serve as practical engineering manuals.

* **Building Fabric:** These guidelines specify that internal surfaces must be smooth, impervious, and light-colored to facilitate cleaning and inspection. Wall-to-floor junctions must be coved (curved) to a radius of at least 25mm to prevent dirt accumulation.6  
* **Drainage:** Floors must slope (typically 1:50 or 1:100) toward trapped drains. The use of trench drains is discouraged in high-care areas due to cleaning difficulty; pot drains or slot drains with accessible baskets are preferred.6

### **1.3 Strategic Site Selection and Zoning**

For a large-scale facility, site selection is the first engineering decision.

* **Water Security:** A processing plant is thirsty. It needs potable water for product push-outs and cleaning. However, modern MVR evaporators generate "cow water" (condensate), which can be recovered. A site's viability often hinges on its ability to treat and discharge this water, or polish it for reuse.  
* **Zoning Philosophy:** The facility must be designed with concentric zones of hygiene.  
  * **Black Zone:** Utilities, boilers, wastewater treatment.  
  * **Gray Zone:** Raw milk reception, silos.  
  * **White Zone (High Care):** Pasteurization, evaporation, packing.  
  * **Red Line:** The absolute barrier between basic hygiene and the sterile packing room. Crossing this line requires a complete change of footwear and clothing. This is not just an operational rule; it is an architectural feature involving airlocks, bench-over barriers, and positive pressure airflow systems.8

## ---

**2\. Farm-Side Architecture: The High-Throughput Milking Center**

The modern Oceania dairy farm is a factory in the field. With herds averaging 400-800 cows and mega-farms exceeding 2,000, the milking center is designed for throughput, flow, and data capture. The architecture centers around the rotary platform.

### **2.1 Rotary Platform Engineering**

The external rotary milking system is the industry standard for efficiency. The platform functions as a continuous production line where the cow is the work unit. Two dominant systems—the **DeLaval Rotary E300** and the **GEA DairyRotor T8900**—define the current state of the art.

#### **2.1.1 Structural Dynamics and Drive Systems**

The platform is a massive rotating structure, often concrete, floating on a roller system.

* **Undercarriage Design:** The **GEA T8900** utilizes a **quad-roller drive system**. Heavy-duty nylon rollers are profiled to match the track, distributing the immense weight (up to 100 tonnes fully loaded) evenly. This reduces friction and maintenance compared to steel-on-steel drives.10  
* **DeLaval's Cockpit Concept:** The **DeLaval E300** centralizes control in a "Cockpit." This is an architectural choice to place the operator at a command station near the cups-on area, providing a 360-degree view. The platform drive is often variable speed (VSD), governed by the milking time of the slowest cow or the group's average flow rate.12  
* **Subway Architecture:** For large LPs, a "Subway" or basement design is essential. In this configuration, the milk lines, vacuum pumps, pulsation airlines, and receiver vessels are located *underneath* the platform deck.13  
  * *Advantage:* It separates the mechanical "noise" from the milking environment, creating a calmer atmosphere for cows (which let down milk faster).  
  * *Maintenance:* Mechanics can service equipment during milking without entering the sterile zone.  
  * *Hygiene:* It removes clutter from the bail area, making wash-down easier and more effective.

#### **2.1.2 Bail Profile and Cow Flow**

The "bottleneck" in any rotary is cow entry and exit.

* **FastBail and 1.5 Entry:** DeLaval's **FastBail™** design uses a low-profile bail with no sharp edges. The entry lane is widened to 1.5 cow widths, creating a funnel effect that reduces hesitation. If a cow stops, the one behind can nudge her in or bypass slightly, keeping the flow continuous.12  
* **FastExit Geometry:** The exit area is critical for platform rotation speed. The **FastExit™** system uses an angled bail combined with a physical "exit bow." As the platform rotates to the exit position, the bow gently guides the cow's head and shoulder outward. The bail angle naturally points her toward the exit lane, meaning she steps off without having to back up or turn sharply. This allows the platform to run faster, increasing cows-per-hour throughput by up to 7%.12

### **2.2 Automation and Robotics Integration**

To combat labor shortages, automation is embedded into the architecture.

* **Teat Spray Robots (TSR):** Positioned at the exit, standalone robots (like the TSR) use camera vision to locate teats and apply iodine disinfectant. The architecture must provide footprint and utility connections (compressed air, chemical lines) for these robots.12  
* **Automatic Cup Removers (ACR):** Integrated into the bail, these use flow sensors to detect when milking is finished. They shut off the vacuum and retract the cluster.  
* **Interactive Data Display (IDD):** Screens at the cups-on position display real-time data for the cow in front of the operator—health alerts, withhold status (antibiotics), and expected yield. This digital layer is physically integrated into the bail cabinet.12

### **2.3 Milk Cooling Infrastructure: The Rapid Cooling Curve**

The cooling system is the largest energy consumer on the farm and a critical compliance point. The "Rapid Cooling Curve" is non-negotiable.

#### **2.3.1 Regulatory Thermodynamics**

New Zealand (NZCP1): Milk must be 10°C within 4 hours of milking start, and 6°C within 6 hours (or 2 hours after finish).15  
Australia (FSANZ): Milk must be 5°C within 3.5 hours.17  
Design Implication: Passive cooling is rarely enough. A hybrid active/passive system is standard.

#### **2.3.2 Plate Heat Exchanger (PHE) Design**

The primary cooling stage uses a PHE.

* **Counter-Current Flow:** Well water flows in the opposite direction to milk.  
* **Efficiency:** A properly sized PHE will cool milk to within **2°C** of the incoming water temperature. If well water is 14°C, milk exits at 16°C.15  
* **Flow Ratios:** To achieve this, the water flow rate must be **3 times** the milk flow rate (3:1 ratio). This requires large-bore plumbing and high-capacity water pumps. For a rotary milking 600 cows/hour, milk flow might be 15,000 L/hr, requiring 45,000 L/hr of water flow.15

#### **2.3.3 Secondary Cooling and Thermal Storage**

Since 16°C is above the 6°C legal limit, a secondary stage is needed.

* **Banked PHE:** The milk passes through a second section of the plate cooler. This section uses **glycol** or **chilled water** from an ice bank.  
* **Snap Chilling:** Milk enters the silo at 4-5°C, instantly arresting bacterial growth.  
* **Thermal Storage:** LPs often install large ice banks. Ice is built up at night (using cheaper off-peak electricity) and melted during milking to provide massive cooling power without sizing the refrigeration compressor for peak load.18

### **2.4 Effluent Management Architecture**

Handling the waste from 1,000+ cows requires industrial-grade treatment.

* **Flood Washing:** The yard is cleaned using a "green water" flood wash—recycled effluent water released from high-volume header tanks.  
* **Solid Separation:** The **GEA Slope Screen** is a passive, curved stainless steel wedge wire screen. Effluent is pumped over it; liquid falls through, solids slide off. It has no moving parts, reducing failure points.20  
* **Mechanical Drying:** For bedding recovery, the solids from the screen can be fed into a **Roller Press** (like the GEA XPress), which squeezes moisture out, producing a dry, stackable solid.21

## ---

**3\. Logistics Architecture: The Reception Interface**

The chain of custody moves from farm vat to road tanker, and then to the processing plant. This logistical interface is a high-risk zone for contamination and fraud.

### **3.1 Tanker Design and Sampling Systems**

The milk tanker is a mobile storage silo.

* **Barrel Design:** Tankers are typically stainless steel with internal baffles to prevent liquid surge during braking. They are insulated to maintain temperature (must not rise \>1°C during transport).  
* **Automated Sampling:** Disputes over fat/protein (payment) and antibiotics are resolved via sampling.  
  * **On-Tanker Systems:** The **IDMC Automatic Milk Measurement and Sampling System** mounts to the rear of the tanker. It uses a peristaltic pump to draw a drip-sample continuously during loading. It fills RFID-tagged bottles, ensuring the sample is a perfect composite of the entire load.22  
  * **In-Line Samplers:** At the factory reception, samplers like the **Sentry ISOLOK MSA** are used. This device mounts directly to the 3-inch line. A pneumatic plunger extends into the milk stream, captures a fixed volume (e.g., 1ml), and retracts, depositing it into a sterile bag. It is fully CIP cleanable and verified to 3-A sanitary standards.23

### **3.2 Reception Bay Engineering**

The reception bay must process tankers rapidly (Turnaround Time \< 45 mins).

* **Drive-Through Architecture:** Bays are designed as tunnels to prevent reversing accidents. Floors are heavily graded (1:40) to large trench drains to handle spills and wash water.  
* **De-aeration:** As the tanker pumps out, it sucks air at the end. This air ruins flow meter accuracy. **Air Eliminators** are large vertical vessels installed before the flow meter. They slow the milk velocity, allowing bubbles to rise and vent, ensuring only liquid passes through the meter.24  
* **Measurement:** **Coriolis Mass Flow Meters** (e.g., Endress+Hauser Promass) are the standard. They measure mass directly (kg), which is unaffected by temperature or air bubbles, unlike volumetric magnetic flow meters.  
* **CIP Integration:** The bay is equipped with high-flow CIP supply and return lines. Once empty, the tanker connects to the CIP loop. The plant's CIP kitchen pumps hot caustic and acid through the tanker's spray balls, cleaning it for the next run. This effectively makes the tanker part of the plant's sanitary zone.24

## ---

**4\. Processing Plant Architecture: The Liquid Phase**

Once inside the plant, the milk enters the "Wet Process." The architecture here is defined by stainless steel pipe matrices, valve clusters, and thermal units.

### **4.1 Valve Matrix Architecture: The Neural Network**

The plant's flexibility depends on its valve matrix. This array of valves allows milk to flow from any reception line to any silo, or from any silo to the pasteurizer, while simultaneously cleaning other lines.

* **Mixproof Technology:** The industry relies on **Double-Seat Mixproof Valves** (e.g., **Alfa Laval Unique Mixproof**, **Pentair Südmo F269J**).  
  * *The Problem:* In a single-seat valve, if the seal fails, cleaning chemicals could leak into the milk.  
  * *The Solution:* Mixproof valves have two plugs. Between them is a "leakage chamber" open to the atmosphere. If either seal fails, the fluid leaks out the drain, visually alerting the operator, but *never* crossing into the other line. This allows 24/7 operation where CIP and Production occur side-by-side.25  
  * *SpiralClean:* For high-hygiene applications (ESL/UHT), valves feature **SpiralClean** technology. This channels CIP fluid around the valve spindles and into the leakage chamber, sanitizing the "dark areas" that traditional CIP misses.28

### **4.2 Separation and Standardization**

The separator is a high-speed centrifuge (4,000+ RPM) that spins skim milk away from cream.

* **Hermetic Design:** Modern separators (e.g., **GEA MSI/MSE**) use a **hydrohermetic feed**. The inlet pipe is submerged in a liquid seal, preventing air from entering the bowl.  
  * *Benefit:* Air damages fat globules (shearing) and causes foaming. Hermetic separators handle the product gently, improving cream quality.29  
* **Proplus System:** Separators must eject "sludge" (dirt, somatic cells). Traditional ejection loses some milk. **GEA's Proplus** extends the time between ejections, reducing product loss and water consumption.29  
* **Cold Separation:** A growing trend for LPs producing bioactive ingredients (Lactoferrin). Milk is separated cold (4-6°C) rather than warm (50°C). This prevents bacterial growth and protein denaturation but requires larger, specialized centrifuges.29

### **4.3 Heat Treatment Architecture**

Pasteurization (72°C/15s) is the critical safety step.

* **Plate Heat Exchangers (PHE):** The workhorse for standard milk. They are highly efficient, with **regeneration sections** that use the hot outgoing milk to pre-heat the cold incoming milk, recovering up to 94% of the energy.30  
* **Tubular Heat Exchangers (THE):** Used for UHT, cream, or long-run products.  
  * *Tetra Pak P2P:* Traditional tubular exchangers use water as an intermediate (Product-to-Water-to-Product). Tetra Pak's **P2P (Product-to-Product)** technology presses the concentric tubes together, allowing direct heat transfer. This cuts energy use by 55%.31  
  * *Floating Protection:* In UHT (140°C), thermal expansion can crack steel. The **Floating Protection System** allows the inner tubes to slide/expand relative to the shell, preventing stress fractures.31

### **4.4 Pumping Technology**

* **Twin Screw Pumps:** For viscous products (cream, yoghurt) or gentle handling of curds, the **Fristam FDS** is the gold standard.  
  * *Dual Duty:* It can pump product gently at low speed, then ramp up to 3,600 RPM to pump CIP fluid. This eliminates the need for a separate CIP return pump and bypass valves, simplifying the pipework architecture.32

## ---

**5\. Processing Plant Architecture: Powder Production**

For export-focused LPs, turning milk into powder (WMP/SMP) is the primary goal. This involves massive energy exchange infrastructure.

### **5.1 Evaporation: MVR vs. TVR**

Before drying, 85% of the water is removed in the evaporator. The choice of technology drives OpEx.

* **Mechanical Vapor Recompression (MVR):** This is the modern standard for efficiency.  
  * *Mechanism:* A massive high-speed centrifugal fan (or turbo-compressor) takes the vapor boiled off the milk, compresses it, and feeds it back into the heating shell. The compression adds energy (heat), allowing the waste vapor to boil the next batch of milk.  
  * *Efficiency:* It operates like a heat pump. It consumes \~10-30 kWh of electricity per ton of water evaporated. It requires almost no steam during steady operation.34  
* **Thermal Vapor Recompression (TVR):** Uses a steam jet thermocompressor (venturi) to recycle vapor.  
  * *Comparison:* TVR is cheaper to build but consumes massive amounts of steam (gas/coal). It is less efficient (\~600 kWh equivalent per ton). However, TVR is often used as a "finisher" stage to get the solids from 45% to 52% just before the dryer, as MVR struggles with high boiling point elevation at high concentrations.36

### **5.2 Spray Dryer Engineering**

The spray dryer turns the concentrate into powder.

* **Atomization:**  
  * *Rotary Atomizers:* A spinning wheel flings droplets. Good for standard powders.  
  * *Nozzle Atomizers:* High-pressure pumps (200 Bar) force milk through sapphire nozzles. This creates specific particle sizes and is essential for **Agglomerated (Instant)** powders and **Infant Formula**. LPs targeting high-value markets typically specify nozzle dryers.37  
* **Chamber Geometry:** "Tall Form" dryers are standard. The vertical height allows droplets to dry completely before reaching the bottom cone, preventing sticking.  
* **Fluid Beds:**  
  * *Internal:* A fluid bed at the bottom of the chamber catches moist powder and finishes the drying gently.  
  * *External:* A vibrating fluid bed outside the chamber cools the powder and separates "fines" (dust). Fines are blown back to the top of the dryer (agglomeration) to stick to wet droplets, creating the "cluster" structure that makes powder dissolve instantly in water.38

### **5.3 Powder Handling and Safety**

* **Explosion Suppression:** Milk powder dust is explosive (Kst \~100-150). Architecture includes **Rupture Discs** (weak panels that blow out to a safe area) and **CO2/Chemical Suppression** systems that detect a pressure spike and flood the chamber in milliseconds.39  
* **Dense Phase Conveying:** Powder is moved to silos using "Dense Phase" vacuum or pressure. Low velocity prevents the granules from shattering, preserving the "instant" quality.

## ---

**6\. Packaging Architecture: The High-Care Zone**

The packaging room is the most sensitive zone in the plant.

### **6.1 Hygienic Zoning: The Red Line**

* **Red Line Protocol:** This is a physical and procedural barrier.  
  * *Architecture:* A "bench-over" barrier. Staff sit, remove "transition" shoes, swing legs over the bench, and put on "Red Zone" captive boots.  
  * *Airflow:* The packing room is positively pressured with HEPA-filtered air (H13 grade). Air flows *out* of the room, preventing dust or pathogens from entering.8  
  * *Dry Zone:* No water is allowed. Sinks are often removed or located in airlocks. Cleaning is done with vacuums and alcohol wipes. Drains are minimized or sealed to prevent *Cronobacter* or *Listeria* coming up from the sewers.9

### **6.2 Filling Technology**

* **Limited Intervention (Li) Fillers:** Machines like the **GEA Avapac / RBF-Li** series are fully enclosed.  
  * *Process:* The machine grabs a bag, opens it, fills it using a bottom-up auger (to minimize dust), and heat-seals it.  
  * *MAP:* Before sealing, probes evacuate air and inject N2/CO2 to lower residual oxygen (\<2%). This prevents fat oxidation (rancidity) and extends shelf life to 24 months.40  
  * *Safety:* The entire process happens inside a glass cabinet. Operators do not touch the open bag, eliminating human contamination risk.41  
* **FIBC (Bulk Bag) Filling:** For industrial customers, 1-ton bags are used.  
  * **Tetra Pak S DB006:** A specialized unit that hangs the bag, inflates the liner, and fills it. It uses a double-fan system to shape the bag (removing creases) and a weighing system that auto-tares to ensure commercial accuracy.42

## ---

**7\. Automation and Digital Architecture**

The nervous system of the facility.

### **7.1 Network Protocols**

* **EtherNet/IP:** The standard for **Rockwell Automation (Allen-Bradley)** architectures. It uses standard TCP/IP hardware, making IT/OT integration seamless. Dominant in NZ plants influenced by US technology (e.g., Fonterra legacy sites).43  
* **Profinet:** The standard for **Siemens** architectures. It offers **Isochronous Real-Time (IRT)**, which synchronizes motion axes with sub-microsecond precision. This is often preferred for high-speed packaging machines.45

### **7.2 The IO Layer: AS-i vs. IO-Link**

* **AS-Interface (AS-i):** A simple yellow flat cable. Devices piercing the cable to connect.  
  * *Use Case:* Connecting hundreds of mixproof valves. Each valve head (e.g., ThinkTop) clips onto the cable. It reduces wiring loom size by 90% compared to point-to-point wiring.46  
* **IO-Link:** A smart point-to-point protocol.  
  * *Use Case:* Smart sensors. An IO-Link pressure sensor tells the PLC not just the pressure (process value) but also its own health, serial number, and if the wire is broken. It allows "parameter server" functionality: if a sensor fails, you plug in a new one, and the IO-Link master automatically downloads the settings to it.48

### **7.3 Control Systems (DCS)**

* **PlantPAx (Rockwell):** A Distributed Control System (DCS) that standardizes objects. A "Pump" in the software is a pre-validated block of code with built-in alarms, interlocks, and HMI faceplates. This standardization is vital for validating the plant against FDA/MPI requirements.50  
* **Wonderware (AVEVA):** Often used as the supervisory layer (SCADA) in NZ dairies (e.g., Woodlands Dairy), providing a "System of Systems" view that ties together the milking shed, tanker reception, and processing plant into one dashboard.52

## ---

**8\. Utilities and Sustainability Infrastructure**

### **8.1 Water and Steam**

* **Cow Water Recovery:** The condensate from the MVR evaporator is recovered. It is polished using Reverse Osmosis (RO) and UV sterilization. It is then used for boiler feed or CIP make-up water, significantly reducing the plant's draw on aquifers.35  
* **Bio-Boilers:** With the phasing out of coal in NZ, LPs are installing biomass boilers (wood chip) or Electrode Boilers (electric steam generation) to decarbonize the thermal load.

### **8.2 CIP Kitchens**

* **Decentralized Architecture:** Instead of one giant CIP room, modern plants use satellite kitchens. A dedicated CIP set for the Raw Milk Silos, another for the Evaporator, another for the Packer.  
  * *Benefit:* Reduces "dead legs" (long pipes full of stagnant water), saves energy (less pumping), and prevents cross-contamination between raw and pasteurized zones.53

## ---

**9\. Conclusion and Implementation Roadmap**

For the Limited Partnership, the path to a compliant, high-performance dairy facility in Oceania is clear but rigorous.

1. **Compliance First:** The design must originate from the **RMP** (NZ) or **Food Safety Program** (AU). The physical separation of zones and the capability for digital traceability must be baked into the architectural drawings.  
2. **Platform Choice:** Select a rotary platform (**DeLaval E300** or **GEA T8900**) that integrates with the herd management software. Prioritize **Subway** designs for maintenance ease.  
3. **Process Efficiency:** Adopt **MVR Evaporation** technology to minimize OpEx and **mixproof valve matrices** to maximize uptime.  
4. **Automation Strategy:** Standardize on a DCS (**PlantPAx**) and a network protocol (**EtherNet/IP** or **Profinet**) early. Do not mix and match.  
5. **Hygiene Discipline:** Invest heavily in the "Red Line" architecture of the packing room. The **Li Filler** is the single most effective tool for removing human contamination risk from the final product.

This facility, built to these specifications, will not only meet the current stringent standards of MPI and FSANZ but will be future-proofed against the increasing demands of global food safety auditors.

### ---

**Data Appendices**

#### **Table 1: Equipment Specification Matrix**

| Component | Preferred Technology | Key Feature | Regulatory Link |
| :---- | :---- | :---- | :---- |
| **Milking** | Rotary w/ Subway | FastExit, Nylon Rollers | NZCP1 (Hygiene) |
| **Cooling** | 3:1 Water:Milk PHE | 2°C Approach Temp | MPI Cooling Curve |
| **Reception** | Coriolis Mass Flow | Air Elimination | FSANZ 4.2.4 (Traceability) |
| **Valves** | Mixproof Double Seat | Leakage Chamber | 3-A / EHEDG |
| **Evaporator** | MVR (Mechanical) | \~30 kWh/ton Efficiency | Sustainability |
| **Dryer** | Nozzle Atomizer | Agglomerated Powder | Market Spec |
| **Filler** | Limited Intervention (Li) | MAP Gassing, Enclosed | High Care Zoning |

#### **Table 2: Network & Control Architecture**

| Layer | Technology | Function | Benefit |
| :---- | :---- | :---- | :---- |
| **Sensor** | IO-Link | Smart Instrumentation | Auto-parameterization |
| **Actuator** | AS-Interface | Valve Control | 90% Wiring Reduction |
| **Fieldbus** | EtherNet/IP | PLC-to-Device Comms | IT Integration |
| **Control** | PlantPAx DCS | Process Logic | Validated Code Objects |
| **Supervisory** | AVEVA / Wonderware | Plant-wide HMI | Unified Dashboard |

#### **Works cited**

1. NZCP1: Design and Operation of Farm Dairies \- nzmpta, accessed December 23, 2025, [https://www.nzmpta.co.nz/file/nzcp1-design-and-operation-of-farm-dairies/open](https://www.nzmpta.co.nz/file/nzcp1-design-and-operation-of-farm-dairies/open)  
2. NZCP1: Design and Operation of Farm Dairies \- Ministry for Primary Industries, accessed December 23, 2025, [https://www.mpi.govt.nz/dmsdocument/46243-Operational-Code-NZCP1-Design-and-Operation-of-Farm-Dairies](https://www.mpi.govt.nz/dmsdocument/46243-Operational-Code-NZCP1-Design-and-Operation-of-Farm-Dairies)  
3. Risk management programmes for farm dairies | NZ Government, accessed December 23, 2025, [https://www.mpi.govt.nz/agriculture/dairy-farming/risk-management-programmes-for-farm-dairies](https://www.mpi.govt.nz/agriculture/dairy-farming/risk-management-programmes-for-farm-dairies)  
4. STANDARD 4.2.4 PRIMARY PRODUCTION AND PROCESSING STANDARD FOR DAIRY PRODUCTS (Australia only), accessed December 23, 2025, [https://pir.sa.gov.au/\_\_data/assets/pdf\_file/0007/238273/Standard\_4\_2\_4\_Dairy\_PPP\_v103.pdf](https://pir.sa.gov.au/__data/assets/pdf_file/0007/238273/Standard_4_2_4_Dairy_PPP_v103.pdf)  
5. Primary Production and Processing (PPP) Standards (Chapter 4), accessed December 23, 2025, [https://www.foodstandards.gov.au/business/primary-production-and-processing](https://www.foodstandards.gov.au/business/primary-production-and-processing)  
6. Hygienic design: guidelines for dairy food manufacturing premises, accessed December 23, 2025, [https://www.safefood.qld.gov.au/wp-content/uploads/2023/05/DFSV\_Guideline-Hygienic-design-October-2017.pdf](https://www.safefood.qld.gov.au/wp-content/uploads/2023/05/DFSV_Guideline-Hygienic-design-October-2017.pdf)  
7. Hygienic design: guidelines for dairy food manufacturing premises, accessed December 23, 2025, [https://www.dairysafe.vic.gov.au/publications-media/regulations-and-resources/guidelines/474-hygienic-design-guideline](https://www.dairysafe.vic.gov.au/publications-media/regulations-and-resources/guidelines/474-hygienic-design-guideline)  
8. Hygienic Zoning in Food Manufacturing | PMG Engineering, accessed December 23, 2025, [https://pmg.engineering/Article/17/hygienic-zoning-in-food-manufacturing/](https://pmg.engineering/Article/17/hygienic-zoning-in-food-manufacturing/)  
9. Framework for Establishing Hygienic Separation in Continuous Dairy Powder Systems in the Event of a Pathogen Positive in Finishe, accessed December 23, 2025, [https://www.usdairy.com/getmedia/6f3c70cb-9a43-41e1-b040-222801ddc579/Hygienic-Separation-Final-10212022.pdf](https://www.usdairy.com/getmedia/6f3c70cb-9a43-41e1-b040-222801ddc579/Hygienic-Separation-Final-10212022.pdf)  
10. DairyRotor T8900 \- United Milking Systems, accessed December 23, 2025, [https://www.unitedmilkingsystems.co.uk/dairyrotor-t8900/](https://www.unitedmilkingsystems.co.uk/dairyrotor-t8900/)  
11. Rotary milking parlor GEA DairyRotor T8900 | top performance 24/7, accessed December 23, 2025, [https://www.gea.com/en/products/milking-farming-barn/milking-solutions/conventional/dairyrotor-t8900-rotary-parlor/](https://www.gea.com/en/products/milking-farming-barn/milking-solutions/conventional/dairyrotor-t8900-rotary-parlor/)  
12. DeLaval Rotary E300 OLD, accessed December 23, 2025, [https://www.delaval.com/en-us/farm-solutions/milking/rotary/delaval-rotary-e300-old/](https://www.delaval.com/en-us/farm-solutions/milking/rotary/delaval-rotary-e300-old/)  
13. T8900 \- Our Products | Papapetrou Farm Technologies Ltd, accessed December 23, 2025, [https://www.pft.com.cy/shop/?productID=106](https://www.pft.com.cy/shop/?productID=106)  
14. DeLaval Rotary E300, accessed December 23, 2025, [https://www.delaval.com/globalassets/uk-ireland/brochures/del0388-rotary-e300-brochure.pdf](https://www.delaval.com/globalassets/uk-ireland/brochures/del0388-rotary-e300-brochure.pdf)  
15. Milk cooling \- DairyNZ, accessed December 23, 2025, [https://www.dairynz.co.nz/milking/milking-plant-maintenance/milk-cooling/](https://www.dairynz.co.nz/milking/milking-plant-maintenance/milk-cooling/)  
16. Meeting milk cooling rules \- Rural News Group, accessed December 23, 2025, [https://www.ruralnewsgroup.co.nz/dairy-news/dairy-management/meeting-milk-cooling-rules](https://www.ruralnewsgroup.co.nz/dairy-news/dairy-management/meeting-milk-cooling-rules)  
17. Raw milk temperatures \- DAFF, accessed December 23, 2025, [https://www.agriculture.gov.au/biosecurity-trade/export/controlled-goods/dairy/registered-establishment/raw-milk-temperatures](https://www.agriculture.gov.au/biosecurity-trade/export/controlled-goods/dairy/registered-establishment/raw-milk-temperatures)  
18. New Milk Cooling Regulations Proposed \- MacDougalls, accessed December 23, 2025, [https://macdougalls.co.nz/wp-content/uploads/2015/04/New-Cooling-Regulations-proposed-Fonterra.pdf](https://macdougalls.co.nz/wp-content/uploads/2015/04/New-Cooling-Regulations-proposed-Fonterra.pdf)  
19. Will your farm meet the 2018 milk cooling standards? \- Read Industrial, accessed December 23, 2025, [https://www.readindustrial.co.nz/2018/03/06/milk-cooling-standards/](https://www.readindustrial.co.nz/2018/03/06/milk-cooling-standards/)  
20. GEA Slope Screen \- Stocker Solutions, accessed December 23, 2025, [https://stockersolutions.co.nz/services/effluent/gea-slope-screen/](https://stockersolutions.co.nz/services/effluent/gea-slope-screen/)  
21. Sloped Screen Separators | GEA, accessed December 23, 2025, [https://www.gea.com/assets/122518/](https://www.gea.com/assets/122518/)  
22. Automatic Milk Measurement and Sampling System \- IDMC Limited, accessed December 23, 2025, [https://www.idmc.com/automatic-milk-measurement-and-sampling-system.php](https://www.idmc.com/automatic-milk-measurement-and-sampling-system.php)  
23. ISOLOK MSA Sanitary Sampler \- Sentry Equipment, accessed December 23, 2025, [https://www.sentry-equip.com/products-services/sampling/isolok-samplers/msa-sanitary-sampler](https://www.sentry-equip.com/products-services/sampling/isolok-samplers/msa-sanitary-sampler)  
24. COLLECTION AND RECEPTION OF MILK \- Dairy Processing Handbook \- Tetra Pak, accessed December 23, 2025, [http://dairyprocessinghandbook.tetrapak.com/chapter/collection-and-reception-milk](http://dairyprocessinghandbook.tetrapak.com/chapter/collection-and-reception-milk)  
25. Südmo Double Seal Valves \- F269J+ \- Food and Beverage Pentair, accessed December 23, 2025, [https://foodandbeverage.pentair.com/en/products/sudmo-double-seal-valves-f269j.html](https://foodandbeverage.pentair.com/en/products/sudmo-double-seal-valves-f269j.html)  
26. Alfa Laval Unique Mixproof Process, accessed December 23, 2025, [https://www.matrixps.com/wp-content/uploads/2018/02/Unique-Mixproof-Process-PD.pdf](https://www.matrixps.com/wp-content/uploads/2018/02/Unique-Mixproof-Process-PD.pdf)  
27. Unique Mixproof Process valve \- Alfa Laval, accessed December 23, 2025, [https://www.alfalaval.us/products/fluid-handling/valves/double-seat-valves/unique-mixproof-process/](https://www.alfalaval.us/products/fluid-handling/valves/double-seat-valves/unique-mixproof-process/)  
28. Alfa Laval Unique Mixproof, accessed December 23, 2025, [https://assets.alfalaval.com/documents/p174be516/alfa-laval-alfa-laval-unique-mixproof-product-leaflet-en.pdf](https://assets.alfalaval.com/documents/p174be516/alfa-laval-alfa-laval-unique-mixproof-product-leaflet-en.pdf)  
29. GEA Separators for Milk and Whey Skimming, accessed December 23, 2025, [https://www.gea.com/en/products/centrifuges-separation/centrifugal-separator/separator/separators-milk-whey-skimming/](https://www.gea.com/en/products/centrifuges-separation/centrifugal-separator/separator/separators-milk-whey-skimming/)  
30. Designing a process line \- Dairy Processing Handbook \- Tetra Pak, accessed December 23, 2025, [http://dairyprocessinghandbook.tetrapak.com/chapter/designing-process-line](http://dairyprocessinghandbook.tetrapak.com/chapter/designing-process-line)  
31. Tetra Pak® Tubular Heat Exchanger with P2P technology, accessed December 23, 2025, [https://www.tetrapak.com/solutions/integrated-solutions-equipment/processing-equipment/heat-transfer/tetra-pak-tubular-heat-exchanger/tetra-pak-tubular-heat-exchanger-with-p2p-technology](https://www.tetrapak.com/solutions/integrated-solutions-equipment/processing-equipment/heat-transfer/tetra-pak-tubular-heat-exchanger/tetra-pak-tubular-heat-exchanger-with-p2p-technology)  
32. NEW: FDS Nano \- Fristam Pumps, accessed December 23, 2025, [https://www.fristam.com/product/fds-nano-twin-screw-pump/](https://www.fristam.com/product/fds-nano-twin-screw-pump/)  
33. FDS Twin Screw Pumps \- Fristam Pumps, accessed December 23, 2025, [https://www.fristam.com/product/product-sanitary-twin-screw-pump/](https://www.fristam.com/product/product-sanitary-twin-screw-pump/)  
34. Mechanical Vapor Recompression (MVR) Evaporation Unit \- Sinitech Industries, accessed December 23, 2025, [https://sinitech.eu/en/sinitech-en/other/blog-en/167-mechanical-vapor-recompression-mvr-evaporation-unit-a-comprehensive-advantage-over-thermal-vapor-recompression-tvr](https://sinitech.eu/en/sinitech-en/other/blog-en/167-mechanical-vapor-recompression-mvr-evaporation-unit-a-comprehensive-advantage-over-thermal-vapor-recompression-tvr)  
35. MVR (Mechanical Vapour Recompression) Systems for Evaporation, Distillation and Drying \- Energy Efficiency & Conservation Authority, accessed December 23, 2025, [https://genless.govt.nz/assets/Business-Resources/Mechanical-vapour-recompression-for-evaporation-distillation-drying.pdf](https://genless.govt.nz/assets/Business-Resources/Mechanical-vapour-recompression-for-evaporation-distillation-drying.pdf)  
36. Evaporators | Dairy Processing Handbook \- Tetra Pak, accessed December 23, 2025, [http://dairyprocessinghandbook.tetrapak.com/chapter/evaporators](http://dairyprocessinghandbook.tetrapak.com/chapter/evaporators)  
37. Milk Powder Production, accessed December 23, 2025, [https://www.rotronic.com/media/news/files/1466670855\_FF-Milk-Powder.pdf](https://www.rotronic.com/media/news/files/1466670855_FF-Milk-Powder.pdf)  
38. MILK POWDER PRODUCTION \- Watson Dairy Consulting, accessed December 23, 2025, [https://dairyconsultant.co.uk/pdf/milk-powder-production.pdf](https://dairyconsultant.co.uk/pdf/milk-powder-production.pdf)  
39. Anhydro MasterSpray 1250 Multi-Stage \- SPX Flow, accessed December 23, 2025, [https://www.spxflow.com/assets/pdf/anhydro-111-gb-masterspray-1250-multi-stage-gb.pdf](https://www.spxflow.com/assets/pdf/anhydro-111-gb-masterspray-1250-multi-stage-gb.pdf)  
40. Limited Intervention Bag Filler Range \- GEA, accessed December 23, 2025, [https://www.gea.com/assets/171133/](https://www.gea.com/assets/171133/)  
41. Limited Intervention Powder Fillers \- GEA, accessed December 23, 2025, [https://www.gea.com/en/products/filling-packaging/bag-sack-powder-fillers/limited-intervention-bag-filler/](https://www.gea.com/en/products/filling-packaging/bag-sack-powder-fillers/limited-intervention-bag-filler/)  
42. Tetra Pak® Big Bag Filling unit S DB006, accessed December 23, 2025, [https://www.tetrapak.com/solutions/integrated-solutions-equipment/processing-equipment/packing-handling/tetra-pak-big-bag-filling-unit-s-db006](https://www.tetrapak.com/solutions/integrated-solutions-equipment/processing-equipment/packing-handling/tetra-pak-big-bag-filling-unit-s-db006)  
43. Ethernet/IP vs. PROFINET: What are the Differences? \- FS.com, accessed December 23, 2025, [https://www.fs.com/blog/network-efficiency-battle-ethernetip-vs-profinet-in-industrial-communications-3831.html](https://www.fs.com/blog/network-efficiency-battle-ethernetip-vs-profinet-in-industrial-communications-3831.html)  
44. Ethernet/IP vs Profinet: The Protocol Heavyweights \- EECO, accessed December 23, 2025, [https://eecoonline.com/inspire/ethernetip-vs-profinet-the-protocol-heavyweights](https://eecoonline.com/inspire/ethernetip-vs-profinet-the-protocol-heavyweights)  
45. EtherNet/IP vs. PROFINET: Which Industrial Ethernet Protocol Is Best for You?, accessed December 23, 2025, [https://www.industrialautomationco.com/blogs/news/ethernet-ip-vs-profinet-which-industrial-ethernet-protocol-is-best-for-you](https://www.industrialautomationco.com/blogs/news/ethernet-ip-vs-profinet-which-industrial-ethernet-protocol-is-best-for-you)  
46. ASi-3, ASi-5, and IO-Link: A Comparison of Three Communication Protocols, accessed December 23, 2025, [https://blog.pepperl-fuchs.com/en/2025/asi-3-asi-5-and-io-link-a-comparison-of-three-communication-protocols/](https://blog.pepperl-fuchs.com/en/2025/asi-3-asi-5-and-io-link-a-comparison-of-three-communication-protocols/)  
47. Does it fit or doesn't it? – AS-Interface and IO-Link \- Bihl+Wiedemann GmbH, accessed December 23, 2025, [https://www.bihl-wiedemann.de/pt/company/news/magazin/does-it-fit-or-doesnt-it-as-interface-and-io-link](https://www.bihl-wiedemann.de/pt/company/news/magazin/does-it-fit-or-doesnt-it-as-interface-and-io-link)  
48. Compare two industrial communications: AS-i vs. IO-Link \- ifm, accessed December 23, 2025, [https://www.ifm.com/us/en/us/learn-more/as-interface/as-i-and-io-link-comparison](https://www.ifm.com/us/en/us/learn-more/as-interface/as-i-and-io-link-comparison)  
49. How ASI and IO-Link Complement Each Other in Process Applications, accessed December 23, 2025, [https://malisko.com/asi-iolink/](https://malisko.com/asi-iolink/)  
50. PlantPAx Distributed Control System Selection Guide \- Literature Library, accessed December 23, 2025, [https://literature.rockwellautomation.com/idc/groups/literature/documents/sg/proces-sg001\_-en-p.pdf](https://literature.rockwellautomation.com/idc/groups/literature/documents/sg/proces-sg001_-en-p.pdf)  
51. PlantPAx Distributed Control System | Rockwell Automation | US, accessed December 23, 2025, [https://www.rockwellautomation.com/en-us/capabilities/process-solutions/process-systems/plantpax-distributed-control-system.html](https://www.rockwellautomation.com/en-us/capabilities/process-solutions/process-systems/plantpax-distributed-control-system.html)  
52. Improving dairy production monitoring and control with AVEVA, accessed December 23, 2025, [https://www.aveva.com/en/perspectives/success-stories/woodlands-dairy/](https://www.aveva.com/en/perspectives/success-stories/woodlands-dairy/)  
53. Guidelines for Choosing the Right Type of CIP System \- Central States Industrial, accessed December 23, 2025, [https://www.csidesigns.com/blog/articles/clean-in-place-guidelines-for-choosing-the-right-size-and-type-of-cip-system](https://www.csidesigns.com/blog/articles/clean-in-place-guidelines-for-choosing-the-right-size-and-type-of-cip-system)