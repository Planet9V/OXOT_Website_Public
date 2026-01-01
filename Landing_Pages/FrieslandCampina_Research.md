# FrieslandCampina Research & OXOT Strategy Mapping

## Target Profile: FrieslandCampina
- **Strategy**: "Expedition 2030"
- **Key Goals**: 
    - Annual cost savings of €400-500M by 2026.
    - Restructuring from 4 divisions into 7 business groups.
    - Focus on "sustainable growth" and "optimizing value from milk".
- **Recent Activity**:
    - Doubling production capacity for whey protein isolates at **Borculo** facility.
    - Job reductions (1,800 positions) to streamline operations.
    - "Grass to Glass" entire supply chain control.

## Alignment with OXOT Services

### 1. Cyber Digital Twin -> "Operational Clarity"
**Pain Point**: Restructuring complexity and need for cost savings.
**OXOT Solution**: A Digital Twin of the OT network provides visibility into inefficiencies. It's not just security; it's operational observability.
**Messaging**: "Expedition 2030 requires flawless execution. Our Digital Twin ensures your new Borculo expansion and restructured supply chain aren't importing legacy technical debt."

### 2. Agent Blue -> "Supply Chain Resilience"
**Pain Point**: Global dairy supply chain volatility (commodity prices, geo-politics).
**OXOT Solution**: Agent Blue's "Neural Physics" predicts disruptions.
**Messaging**: "From Grass to Glass to Grid. Predict threats to your automated milking systems and processing plants before they impact yield."

### 3. Industrial Cybersecurity -> "Protecting the Margins"
**Pain Point**: Operating on thin margins (8.6% EBITDA). A ransomware attack would wipe out the projected cost savings.
**OXOT Solution**: Specialized OT Security (IEC 62443).
**Messaging**: "Don't let a breach erase your €500M savings target. Secure the savings."

## Design Strategy (Acquisitions Style)
- **Visuals**: Dark mode, "Premium", Neon accents.
- **Palette**: 
    - **Primary**: OXOT Blue (Security)
    - **Accent**: Gold (Dairy/Yield/Value)
    - **Alert**: Red (Threats)
- **Components to Adapt**:
    - `HeroSection`: "Sovereign Immunity for the Dairy Chain".
    - `DealTimeline` -> **"Transformation Timeline"**: De-risking the Expedition 2030 roadmap.
    - `CyberDebtCalculator` -> **"Downtime Risk Calculator"**: Calculating cost of 1 day of downtime at Borculo.
    - `ContactFormCTA`: "Request the Dairy Shield Briefing".

## Action Plan
1.  **Refactor Page**: Rewrite `src/app/campaigns/friesland-campina/page.tsx` completely.
2.  **Import Components**: Reuse `BackgroundEffect`, `ContactFormCTA`.
3.  **New Components**: Create `DairySupplyChainRadar` (based on `SupplyChainRadar`) and `EfficiencySavingsVisualizer`.
