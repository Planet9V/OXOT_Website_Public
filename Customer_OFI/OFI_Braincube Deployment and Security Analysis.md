# **Digital Transformation in the Global Cocoa Supply Chain: A Comprehensive Analysis of the ofi and Braincube Strategic Partnership**

## **Executive Summary**

The convergence of operational technology (OT) and information technology (IT) has fundamentally altered the competitive landscape of the global food and beverage manufacturing sector. This report provides an exhaustive analysis of the strategic digital transformation initiative undertaken by **ofi** (Olam Food Ingredients) in collaboration with the Industrial Internet of Things (IIoT) platform provider **Braincube**. Centered on a critical cocoa processing facility—one of the largest in **ofi**'s global network—this initiative serves as a definitive case study in the application of "Product Clone" digital twin technology and Artificial Intelligence (AI) to solve the chronic challenge of biological variability in agricultural processing.

The analysis is anchored in the empirical results achieved by **ofi**: a **6.5% increase in yield**, a **25% improvement in throughput**, and eight consecutive months of **100% quality scores**.1 These metrics were realized not through capital-intensive hardware expansion, but through the deployment of Braincube’s architecture, which connects shop-floor data from Programmable Logic Controllers (PLCs) directly to cloud analytics, subsequently pushing optimized setpoints back to the production line.

Furthermore, this report examines the critical role of **Mindsprint**, **ofi**’s digital technology partner, in orchestrating this integration within a complex enterprise ecosystem.3 It also provides a rigorous assessment of the cybersecurity implications of such architectures under the European Union’s **NIS2 Directive**, particularly Article 21 concerning supply chain security.4 As industrial platforms increasingly bridge the air gap between the cloud and the factory floor, the governance of these "Edge" environments becomes a matter of regulatory compliance and critical infrastructure protection.

This document is structured to serve as a strategic blueprint for industry stakeholders, detailing the operational physics of cocoa processing, the algorithmic mechanics of the Braincube platform, the change management strategies employed by leadership, and the future trajectory of autonomous manufacturing.

## ---

**1\. The Operational Context: The Economics and Physics of Cocoa Processing**

To fully appreciate the magnitude of the results achieved by **ofi**—specifically the 6.5% yield gain—one must first understand the complex economic and physical dynamics of the global cocoa processing industry.

### **1.1 The High-Volume, Low-Margin Imperative**

Cocoa processing is characterized by high volumes and thin margins. The cost of the raw material (dried cocoa beans) constitutes a dominant percentage of the Cost of Goods Sold (COGS). Consequently, process yield—defined as the ratio of finished product (cocoa liquor, butter, powder) to raw material input—is the single most significant determinant of profitability. In a facility processing 50,000 to 100,000 metric tonnes of beans annually, a yield improvement of even 0.5% translates to millions of dollars in recovered value.

The industry has historically operated under the assumption that mechanical efficiency had reached its theoretical limit. Improvements were sought in increments of 0.1%. The **6.5% yield increase** reported by **ofi** 1 is therefore statistically anomalous in the context of traditional mechanical optimization, suggesting a fundamental paradigm shift enabled by digital intervention.

### **1.2 The Challenge of Biological Variability**

Unlike discrete manufacturing (e.g., automotive or electronics), where input components are standardized to precise specifications, food processing deals with biological inputs. Cocoa beans are inherently variable.

* **Origin Diversity:** Beans from Ghana, Côte d'Ivoire, Ecuador, or Indonesia possess different physical properties (size, shell thickness, hardness) and chemical compositions (fat content, moisture levels).5  
* **Harvest Conditions:** Seasonality affects moisture content. Sun-drying versus artificial drying creates variances in shell brittleness.5  
* **Fermentation:** The degree of fermentation affects the bean's density and how it fractures during processing.

In a traditional "analog" factory, the processing equipment—roasters, winnowers, and grinders—operates on fixed setpoints or "recipes" that are averages. For example, a roaster might be set to 140°C for "West African Beans." However, if a specific batch of beans has a slightly higher moisture content (8% instead of 6%), the standard recipe will result in under-roasting. Conversely, if the beans are drier, the standard recipe causes over-roasting and breakage.

This inability to dynamically adjust to input variability creates the "Black Box" problem. Operators, lacking real-time visibility into the chemical state of the bean inside the machine, rely on "hunches" and reactive adjustments.1 By the time a quality test confirms a deviation, tonnes of material have already been processed sub-optimally.

### **1.3 The Mechanics of Yield Loss: The Winnowing Stage**

The critical control point for yield in cocoa processing is **Winnowing**. This is the stage where the roasted beans are crushed (broken) and the lighter shells are separated from the heavier nibs (the meat of the bean) using air classification (aspirators).

* **The Conflict:** The goal is to remove 100% of the shell (which is waste or low-value biomass) while retaining 100% of the nib.  
* **The Reality:** If the airflow is too strong, valuable small nib particles are blown away with the shells. This is direct yield loss. If the airflow is too weak, shell pieces remain with the nibs. This is a quality defect (high shell content in liquor), which can damage downstream grinders and affect flavor.5

Balancing this separation requires precise control of breaker speeds and air velocities, adjusted in real-time for the specific brittleness of the incoming bean batch. Without AI, operators tend to run conservatively—sacrificing yield to ensure they meet quality specs. The **ofi** case study indicates that digital transformation unlocked the ability to run closer to the edge of these physical constraints without crossing them.

## ---

**2\. The Technological Architecture: Braincube’s IIoT Platform**

The technological backbone of **ofi**'s transformation is the **Braincube** IIoT (Industrial Internet of Things) platform. This solution differentiates itself from standard data visualization tools through its specialized architecture designed for continuous manufacturing processes.

### **2.1 The "Product Clone" Technology: Solving the Time-Lag Problem**

The central innovation utilized by **ofi** is the **Product Clone** (Digital Twin). In a continuous processing line, data is generated by sensors at different times.

* The **Cleaning** machine measures bean weight at Time *T*.  
* The **Roaster** measures temperature at Time *T+30 minutes*.  
* The **Winnower** measures airflow at Time *T+45 minutes*.  
* The **Grinder** measures power consumption at Time *T+60 minutes*.  
* The **Lab** tests the finished liquor at Time *T+120 minutes*.

A standard database sees these as unrelated timestamps. Braincube’s "Product Clone" algorithm calculates the dynamic lag times of every conveyor, buffer, and silo to align these data points.6 It virtually "tags" a slice of material and follows it through the factory.

This results in a structured dataset where a single row represents a specific batch of finished product, appended with the exact conditions it experienced at every step of its journey. This contextualization is the prerequisite for meaningful AI analysis. As **G.K. Lee**, Process and Data Analytics Manager at **ofi**, noted, the goal was to move from "finding data" to "creating actionable insights".1 The Product Clone transforms raw time-series data into a structured genealogy of production.

### **2.2 Edge-to-Cloud Hybrid Architecture**

The system deployed at **ofi** utilizes a hybrid architecture that balances the low-latency requirements of the shop floor with the high-compute capabilities of the cloud.

#### **2.2.1 The Edge Layer**

The **Braincube Edge** device is physically installed on the factory network (OT Network). Its primary functions are:

* **Connectivity:** It interfaces directly with the PLCs (Programmable Logic Controllers) and SCADA systems. It speaks industrial protocols such as **Modbus TCP**, **OPC UA**, **EtherNet/IP**, and proprietary driver languages.7  
* **Buffering:** It collects high-frequency data (e.g., millisecond vibration readings) and buffers it locally to prevent data loss during network outages.  
* **Live Computation:** It runs lightweight models to provide real-time dashboards to operators.

#### **2.2.2 The Cloud Layer**

The **Braincube Cloud** hosts the heavy analytical engines.

* **Storage:** It serves as the long-term historian, storing terabytes of production data.  
* **CrossRank AI:** This is Braincube’s proprietary algorithm. It mines the historical Product Clones to identify the "Golden Batch"—the specific combination of parameters that historically yielded the best results.9  
* **Model Training:** The AI models are trained in the cloud using the massive historical dataset and then pushed back to the Edge for execution.

### **2.3 CrossRank AI: The Mathematics of Optimization**

The CrossRank algorithm is designed to rank input variables by their impact on the output. In the context of **ofi**, the system analyzed thousands of variables—roaster temperatures, fan speeds, bed depths, moisture levels—to answer the question: *"Which variables are the true drivers of yield loss?"*

By isolating the critical few variables from the trivial many, the system could prescribe optimal setpoints. For example, the AI might discover that for "Bean Type A" with "Moisture Level X," the "Winnower Airflow" must be exactly 45.5 Hz. If the operator runs it at 48 Hz, yield drops by 1%. If they run it at 43 Hz, shell content spikes. The AI provides the precise, mathematically validated setpoint.9

## ---

**3\. The ofi Implementation Case Study**

### **3.1 Project Scope and Objectives**

The implementation focused on a specific, high-volume production line at one of **ofi**’s key cocoa plants. While the specific location is not explicitly named in the primary case study text, context clues point to **ofi**'s flagship processing hubs in the Netherlands (**Koog aan de Zaan** or **Wormer**) or Germany (**Mannheim**), which are noted for their advanced innovation centers and sustainability initiatives.11

The initial objectives were modest:

* **Target:** Increase yield by 2-3%.  
* **Problem:** The line was underperforming on throughput and yield.  
* **Current State:** Teams used manual data collection (spreadsheets), leading to slow reaction times and decisions based on intuition rather than fact.1

### **3.2 Change Management: The Role of Leadership**

Digital transformation is as much a cultural challenge as a technical one. The project was championed by **G.K. Lee**, Process and Data Analytics Manager. Lee’s strategy focused on **Data Democratization**.

Previously, data analysis was the domain of a few engineers who would extract data, clean it, and present retrospective reports days later. Braincube changed this workflow by providing "Self-Service Analytics".2

* **Operator Empowerment:** Frontline operators were given tablets showing real-time "Live" apps. These apps didn't just show what *was* happening; they showed what *should* be happening.  
* **The Shift from Reactive to Proactive:** Instead of waiting for a lab test to fail, operators received proactive alerts from the Digital Twin predicting a deviation. This allowed them to adjust setpoints *before* the product went out of spec.1

### **3.3 The Results: Redefining Performance Limits**

The project achieved results that far exceeded the initial ROI calculations.

#### **3.3.1 Yield: \+6.5%**

The line achieved a **6.5% increase in yield** within four months.1

* **Mechanism:** The AI likely optimized the winnowing and breaking process, minimizing the loss of nibs to the shell stream. By dynamically adjusting the breaker speeds based on the bean moisture profile (tracked by the Digital Twin), the system minimized waste.  
* **Impact:** In the commodity cocoa market, a 6.5% reduction in raw material waste represents a massive improvement in gross margin.

#### **3.3.2 Throughput: \+25%**

Simultaneously, the line achieved a **25% increase in throughput**.2

* **Mechanism:** Throughput is often constrained by "bottleneck" machines. Operators often run machines slower than their design capacity to maintain stability and avoid jams or quality excursions. By using AI control, process variance was reduced. A stable process can be run faster. The AI effectively "de-bottlenecked" the line by proving that higher speeds could be maintained without sacrificing quality.

#### **3.3.3 Quality: 100% Compliance**

For eight consecutive months post-implementation, the line achieved a **100% quality score** (zero defects).2

* **Mechanism:** The "Golden Batch" settings ensured that the process remained within the "Safe Operation Window." By eliminating the manual variance of operator-to-operator adjustments, the product quality became perfectly consistent.

## ---

**4\. Operational Technology (OT) Integration and Control Strategy**

A critical aspect of the **ofi** deployment is the depth of integration. The research indicates that Braincube enables "direct integration with PLCs" and applies "AI-recommended setpoints applied directly on the line".2

### **4.1 The Evolution of Control: Open Loop vs. Closed Loop**

Industrial AI implementations typically follow a maturity curve:

1. **Open Loop (Advisor Mode):** The AI analyzes data and displays a recommendation on a dashboard. The human operator reads it, decides if they agree, and manually types the new setpoint into the HMI (Human Machine Interface). This is the "Human-in-the-Loop" model.  
2. **Closed Loop (Autopilot):** The AI writes the setpoint directly to the PLC memory register. The machine adjusts automatically without human intervention.

The **ofi** case study describes a transition toward the **Autonomous Factory**.2 While the initial phase likely involved operator confirmation (Advisor Mode), the reference to "applied directly on the line" and the vision of autonomy suggests a roadmap toward Closed Loop control for critical parameters. This "direct integration" is facilitated by the Braincube Edge’s ability to act as a **Write** agent on the industrial network, not just a **Read** agent.

### **4.2 Protocol Interoperability**

To achieve this, the platform had to bridge the heterogeneity of the shop floor. A typical cocoa plant may have:

* **Roasters** running on Siemens S7 PLCs (Profibus/Profinet).  
* **Grinders** running on Allen-Bradley ControlLogix (EtherNet/IP).  
* **Legacy Conveyors** running on Modbus Serial.7

Braincube’s library of drivers allows it to normalize these diverse protocols into a single unified data model in the cloud. This interoperability is crucial for the "Product Clone" to work, as it must stitch together data from the Roaster (Siemens) and the Grinder (Rockwell) into a single timeline.

## ---

**5\. Cybersecurity Governance and NIS2 Compliance**

The integration of cloud analytics with critical industrial infrastructure introduces significant cybersecurity risks. As **ofi** operates in the European Union, this infrastructure falls under the scope of the **NIS2 Directive** (Network and Information Security Directive 2), which classifies food production as a critical sector.

### **5.1 The Threat Landscape: Attacks on Digital Twins and OT**

Connecting a PLC to the cloud expands the attack surface.

* **Setpoint Manipulation Attacks:** If a threat actor were to compromise the Braincube platform or the connection to the Edge, they could theoretically write malicious setpoints to the PLCs. For example, setting a roaster temperature to a dangerously high level could cause a fire, or disabling a safety interlock could lead to equipment damage.13  
* **Adversarial AI Attacks:** Attackers could inject subtle "noise" into the sensor data (Sensor Spoofing) to fool the AI into making bad recommendations. This is known as an adversarial attack on the Digital Twin.15

### **5.2 NIS2 Article 21: Supply Chain Security**

**NIS2 Article 21** explicitly mandates that essential entities (like **ofi**) must manage the cybersecurity risks of their **supply chain**.4 This means **ofi** is legally accountable for the security posture of its vendors, including Braincube.

**Compliance Requirements for Cloud/IIoT Vendors:**

1. **Risk Analysis:** **ofi** must verify that Braincube performs regular risk assessments.  
2. **Incident Handling:** There must be a protocol for Braincube to report security breaches to **ofi** within the strict NIS2 timelines (24 hours for early warning, 72 hours for full report).17  
3. **Vulnerability Management:** Ensuring that the Edge devices are patched against known vulnerabilities (CVEs).

### **5.3 Braincube’s Security Posture and Architecture**

To meet these rigorous requirements, Braincube employs a "Defense in Depth" architecture:

* **ISO 27001 Certification:** Braincube is ISO 27001 certified, providing third-party validation of its Information Security Management System (ISMS). This is a primary artifact used to satisfy NIS2 supply chain due diligence.6  
* **Unidirectional/Controlled Connectivity:** The Braincube Edge device typically initiates outbound connections to the Cloud via port 443 (HTTPS/TLS). It does *not* require opening inbound firewall ports from the internet to the factory. This prevents external actors from scanning or accessing the internal OT network directly.6  
* **Data Encryption:** All data in transit is encrypted via HTTPS or SFTP. Data at rest in the cloud is stored on dedicated virtual machines, ensuring tenant isolation.6  
* **Role-Based Access Control (RBAC):** Strict access governance ensures that only authorized personnel can approve setpoint changes.

### **5.4 Clarification on "Roundcube" Vulnerabilities**

It is vital to distinguish **Braincube** (the Industrial AI platform) from **Roundcube** (an open-source webmail client). Security databases (CVEs) list numerous critical vulnerabilities for Roundcube (e.g., XSS, SQL Injection).20 These are **unrelated** to Braincube. However, this highlights the importance of precise vendor risk management under NIS2—confusing a vendor with a vulnerable open-source tool could lead to incorrect risk assessments.

## ---

**6\. The Strategic Role of Mindsprint**

The digital transformation at **ofi** was not a standalone project but part of a broader enterprise strategy supported by **Mindsprint**.

### **6.1 From Internal IT to Strategic Partner**

**Mindsprint** (formerly the IT division of Olam Group) was spun out as a separate entity to provide technology services not just to Olam but to the external market. For **ofi**, Mindsprint acts as the implementation partner and system integrator.22

### **6.2 Enterprise Integration: The "Digital Thread"**

While Braincube optimizes the factory floor, **Mindsprint** ensures this data integrates with the rest of the enterprise.

* **SAP S/4HANA Integration:** Mindsprint managed the migration of Olam’s ERP to SAP S/4HANA (Project Fajger).3 Integrating Braincube with SAP allows for:  
  * **Costing:** Real-time yield data from Braincube updates standard costing models in SAP.  
  * **Inventory:** Precise consumption data improves raw material planning.  
  * **Traceability:** The "Product Clone" data supports end-to-end traceability, a requirement for sustainability certification (e.g., verifying that a specific batch of cocoa butter came from a specific deforestation-free farm).

### **6.3 Building the "Autonomous Factory"**

Mindsprint’s role extends to "Intelligent Enterprise Operations".22 By combining Braincube’s operational AI with Mindsprint’s enterprise AI capabilities, **ofi** is building a feedback loop where commercial signals (market demand, bean prices) influence operational setpoints (yield vs. throughput trade-offs), and operational realities influence commercial strategy.

## ---

**7\. Financial and Sustainability Impact Analysis**

The operational gains at **ofi** translate into significant financial and environmental value.

### **7.1 ROI Modeling**

While specific financial figures are proprietary, we can model the impact based on industry averages for a large cocoa plant (50k tonnes/year).

| Metric | Improvement | Estimated Annual Value | Impact Logic |
| :---- | :---- | :---- | :---- |
| **Yield** | **\+6.5%** | **\~$10M \- $15M** | 6.5% of 50k tonnes \= 3,250 tonnes recovered. @ \~$4,000/tonne (blended price). |
| **Throughput** | **\+25%** | **CapEx Avoidance** | Equivalent to building 25% of a new plant without buying land or machinery. |
| **Quality** | **100% Score** | **\~$500k \- $1M** | Elimination of rework energy, waste disposal fees, and customer penalties. |

### **7.2 Sustainability: Scope 1 and 2 Emissions**

The efficiency gains contribute directly to **ofi**’s sustainability goals, specifically the **Cocoa Compass** ambition.11

* **Energy Intensity (Scope 2):** Increasing throughput by 25% reduces the specific energy consumption (kWh per tonne of product). The baseload energy (lighting, HVAC, motors idling) is spread over a larger production volume.  
* **Waste Valorization (Scope 1):** While **ofi** utilizes cocoa shells as a biofuel in biomass boilers (as seen in Koog aan de Zaan) 11, the most sustainable outcome is to turn raw material into food, not fuel. By increasing yield, **ofi** ensures that more of the carbon-intensive cocoa crop feeds people, maximizing the efficiency of the land used to grow it.

## ---

**8\. Future Outlook: Generative AI and the Industrial Metaverse**

The success of the **ofi** and Braincube partnership lays the groundwork for the next wave of innovation.

* **Generative AI for Operations:** Tools like "Companion AI" 23 (Braincube’s answer to ChatGPT for factories) will allow operators to query the system using natural language: *"Why did the yield drop on Line 3 last night?"* The AI will synthesize the Product Clone data to provide a plain-text root cause analysis.  
* **Prescriptive Automation:** Moving from "Human-in-the-Loop" to full "Closed Loop" control across all unit operations, effectively creating a self-driving factory.

## **9\. Conclusion**

The collaboration between **ofi** and **Braincube**, orchestrated by **Mindsprint**, represents a benchmark in the digital transformation of the process industries. By successfully deploying **Product Clone** technology to master the variability of cocoa processing, **ofi** achieved a **6.5% yield increase** and **25% throughput improvement**—figures that redefine the operational limits of the sector.

Crucially, this case study demonstrates that high-value digital transformation is compatible with rigorous governance. By adhering to **ISO 27001** standards and preparing for **NIS2** compliance, **ofi** has built a secure, scalable platform. The integration of OT data with cloud analytics has successfully turned the "Black Box" of cocoa manufacturing into a transparent, data-driven engine of value creation.

---

**Disclaimer:** This report is based on publicly available case studies, technical documentation, and industry analysis. Specific operational details may vary based on proprietary internal configurations of the entities involved.

#### **Works cited**

1. From Complexity to Clarity: Ofi's Manufacturing Transformation with Braincube, accessed December 23, 2025, [https://braincube.com/customer-stories/ofi-olam-food-ingredients-breakthrough-productivity-management/](https://braincube.com/customer-stories/ofi-olam-food-ingredients-breakthrough-productivity-management/)  
2. Case Study: Ofi increases throughput by 25% with real-time data \- Braincube, accessed December 23, 2025, [https://old.braincube.com/resource/ofi-increases-throughput-25-percent-real-time-data-visualization/](https://old.braincube.com/resource/ofi-increases-throughput-25-percent-real-time-data-visualization/)  
3. Olam Agri & Mindsprint: Scaling Vision and Defining the Future of Agri-Business \- YouTube, accessed December 23, 2025, [https://www.youtube.com/watch?v=VvKQZqLAzX8](https://www.youtube.com/watch?v=VvKQZqLAzX8)  
4. NIS2 requirements: A complete guide to compliance & implementation \- DataGuard, accessed December 23, 2025, [https://www.dataguard.com/nis2/requirements/](https://www.dataguard.com/nis2/requirements/)  
5. The Fascinating Journey of Cauliflorous Cocoa Cultivation \- ofi, accessed December 23, 2025, [https://shop.ofi.com/journey-of-cocoa-cultivation](https://shop.ofi.com/journey-of-cocoa-cultivation)  
6. Your Questions Answered \- Braincube FAQ, accessed December 23, 2025, [https://braincube.com/braincube-faq/](https://braincube.com/braincube-faq/)  
7. Modbus Master Setup Guide | PDF | Transmission Control Protocol, accessed December 23, 2025, [https://de.scribd.com/document/486396385/Manual-BrainCube-Connect-with-Modbus-EN-1711](https://de.scribd.com/document/486396385/Manual-BrainCube-Connect-with-Modbus-EN-1711)  
8. Best industrial IoT software 2025 \- FitGap, accessed December 23, 2025, [https://us.fitgap.com/search/industrial-iot-software](https://us.fitgap.com/search/industrial-iot-software)  
9. Braincube: The Leading Industrial Analytics for Process Health \- AVEVA, accessed December 23, 2025, [https://www.aveva.com/en/products/braincube-the-leading-industrial-analytics-for-process-health/](https://www.aveva.com/en/products/braincube-the-leading-industrial-analytics-for-process-health/)  
10. Our Solutions \- Braincube, accessed December 23, 2025, [https://old.braincube.com/solutions/](https://old.braincube.com/solutions/)  
11. Olam food ingredients turn cocoa shells into factory power \- ofi, accessed December 23, 2025, [https://www.ofi.com/en-us/news-and-events/press-release/olam-food-ingredients-turns-cocoa-shells-into-power-to-fuel-factory](https://www.ofi.com/en-us/news-and-events/press-release/olam-food-ingredients-turns-cocoa-shells-into-power-to-fuel-factory)  
12. Guided tour of cocoa factory Koog aan de Zaan \- Zeehavendagen Amsterdam, accessed December 23, 2025, [https://zeehavendagenamsterdam.nl/en/activiteiten/cacaofabriek-ofi/](https://zeehavendagenamsterdam.nl/en/activiteiten/cacaofabriek-ofi/)  
13. How to Secure Digital Twins in Manufacturing \- ISA Global Cybersecurity Alliance, accessed December 23, 2025, [https://gca.isa.org/blog/how-to-secure-digital-twins-in-manufacturing](https://gca.isa.org/blog/how-to-secure-digital-twins-in-manufacturing)  
14. Addressing 4 Security Risks of Digital Twins in Manufacturing \- IndustrialSage, accessed December 23, 2025, [https://www.industrialsage.com/addressing-4-security-risks-of-digital-twins-in-manufacturing/](https://www.industrialsage.com/addressing-4-security-risks-of-digital-twins-in-manufacturing/)  
15. (PDF) Industrial Sensor Redundancy Strategies for Resilience Against Cyber Manipulation, accessed December 23, 2025, [https://www.researchgate.net/publication/398399445\_Industrial\_Sensor\_Redundancy\_Strategies\_for\_Resilience\_Against\_Cyber\_Manipulation](https://www.researchgate.net/publication/398399445_Industrial_Sensor_Redundancy_Strategies_for_Resilience_Against_Cyber_Manipulation)  
16. AADMIP: Adversarial Attacks and Defenses Modeling in Industrial Processes \- IJCAI, accessed December 23, 2025, [https://www.ijcai.org/proceedings/2024/1030.pdf](https://www.ijcai.org/proceedings/2024/1030.pdf)  
17. NIS2 Compliance Guide for OT, ICS & IIoT Owners | Shieldworkz, accessed December 23, 2025, [https://shieldworkz.com/nis2-compliance-framework](https://shieldworkz.com/nis2-compliance-framework)  
18. NIS2 Compliance: How Armis Centrix™ Can Help, accessed December 23, 2025, [https://www.armis.com/solutions/nis2/](https://www.armis.com/solutions/nis2/)  
19. Braincube offers data-driven solutions for manufacturers. \- Oncely, accessed December 23, 2025, [https://oncely.com/products/braincube-discount](https://oncely.com/products/braincube-discount)  
20. roundcube \- CVE: Common Vulnerabilities and Exposures, accessed December 23, 2025, [https://www.cve.org/CVERecord/SearchResults?query=roundcube](https://www.cve.org/CVERecord/SearchResults?query=roundcube)  
21. Critical 10-Year-Old Roundcube Webmail Bug Allows Authenticated Users Run Malicious Code \- The Hacker News, accessed December 23, 2025, [https://thehackernews.com/2025/06/critical-10-year-old-roundcube-webmail.html](https://thehackernews.com/2025/06/critical-10-year-old-roundcube-webmail.html)  
22. About us \- Mindsprint, accessed December 23, 2025, [https://www.mindsprint.com/about-us](https://www.mindsprint.com/about-us)  
23. Braincube Productivity Management System | Manufacturing Transformed, accessed December 23, 2025, [https://braincube.com/productivity-management-system/](https://braincube.com/productivity-management-system/)