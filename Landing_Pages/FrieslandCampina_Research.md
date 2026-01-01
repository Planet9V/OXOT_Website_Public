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

## Deep Dive Intelligence (Internal Brief Data)

### 1. Executive Stakeholders
| Role | Name | Notes |
|------|------|-------|
| **CEO** | **Jan Derck van Karnebeek** | Focused on "Expedition 2030" profitability. New leadership team (Jan 2024). |
| **CISO** | **Rob Reijnders** | Primary target. Likely concerned with "Business Continuity" vs. Cost Cutting. |
| **Chief Supply Chain** | **David Cutter** | Oversees "Grass to Glass". Concerned with Borculo expansion & logistics. |
| **CFO** | **Hans Janssen** | Owner of the €500M savings target. Pitch: "Cyber incidents destroy savings." |

### 2. Company Background (The Baseline)
- **Financials**: ~€12.9B Revenue (2024), down 1.1%. 8.6% EBITDA.
- **Scale**: One of the world's largest dairy cooperatives. ~19,576 Employees (down 1,400 via restructuring).
- **History**: Formed in 2008 (Merger of Friesland Foods + Campina). Roots to 1871.
- **M&A Alert**: Pending merger with **Milcobel** (Belgium) set for Jan 1, 2026. *Huge integration trigger.*
- **Key Brands**: Campina, Chocomel, Fristi, Milner, Frico, Debic (B2B).

### 3. Strategic Context: "Expedition 2030"
- **Goal**: Annual cost savings of **€400-500 MILLION** starting 2026.
- **Mechanism**: Restructuring into 7 business groups.
- **Risk**: Significant organizational change increases "insider threat" and "orphaned asset" risks.
- **Sustainability**: "Nourishing a better planet" (Separate from Expedition 2030, but related). Targets Net Neutral by 2050.

### 3. Cyber Threat Landscape (Food & Agri)
- **Sector Trend**: Ransomware attacks on Food/Agri surged **27% in 2024**.
- **Major Threat Actors**:
    - **RansomHub**: Top actor targeting US/Global food sectors (23 incidents).
    - **CL0P, FunkSec**: Highly active in late 2024.
- **Supply Chain Risk**: "Just-in-time" dairy processing implies **Zero Tolerance for Downtime**. Milk spoils; it cannot wait for decryption keys.

### 4. Technical Intelligence
- **Cloud**: AWS (Managed by **Ricoh Cloud Services**).
    - *Gap*: Does Ricoh have deep OT security expertise? Or just IT patching?
- **OT/Automation**: **Siemens Xcelerator** mentioned for standardizing OT across sites.
    - *Angle*: "Is your Siemens environment fully visible to your SOC, or is it a blind spot?"

### 5. Outreach Toolkit

#### Email 1: The "Financial Risk" Angle (Cold)
**Subject**: Protecting the €500M savings target (Expedition 2030)
**Body**:
> Jan Derck / Hans,
>
> Expedition 2030's goal of €500M in annual savings is ambitious. However, the 27% surge in ransomware attacks on the Food & Beverage sector (RansomHub, CL0P) puts that entire margin at risk.
>
> A single 48-hour outage at Borculo would cost more than the annual savings from your restructuring.
>
> OXOT's "Operational Immunity" platform maps your Siemens OT environment to predict and neutralize threats before they impact production. We don't just secure the network; we secure the savings.
>
> Briefing attached.
> [Link to Internal Brief]

#### Email 2: The "CISO/Technical" Angle (Warm)
**Subject**: Visibility into Siemens OT Standardization
**Body**:
> Rob,
>
> Noticed the move to standardize OT via Siemens Xcelerator. Great for efficiency, but it creates a unified attack surface.
>
> Our analysis shows a gap between Ricoh's management of your AWS environment and the physical reality of your shop floor assets. If an attacker pivots from cloud to PLC (as seen in recent FunkSec campaigns), would you see it in time?
>
> We have modeled a "Dairy Shield" defense profile specifically for this IT/OT gap.
>
> Worth a 15-min deep dive?

#### Email 3: The "Supply Chain" Angle (Follow-up)
**Subject**: Milk doesn't wait for decryption keys
**Body**:
> David,
>
> In the dairy supply chain, latency is spoilage.
>
> We are seeing a trend of ransomware groups targeting "Just-in-Time" processing facilities because they know the pressure to pay is immediate.
>
> OXOT provides "Pre-Crime" intelligence for your supply chain. We can predict downstream disruptions based on upstream signals. It's not just cybersecurity; it's yield protection.
>
> Can we show you the model?
