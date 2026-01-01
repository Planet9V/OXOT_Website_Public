# OSINT Batch 3 Findings

## 7. Executive Pattern of Life
- **Findings**: No specific travel patterns or hotel preferences found for A. Shekhar or Rishi Kalra.
- **Events**: Only general corporate events (Ofi Invest) mentioned.
- **Assessment**: hard targets for physical collection; standard spear-phishing likely required.

## 8. Breach History
- **Findings**: No mentions of Olam/OFI in 2023-2025 ransomware leak sites (LockBit, Akira, etc.).
- **Assessment**: Either they haven't been hit, or they pay quietly and quickly.

## 9. SaaS Vendor Ecosystem
- **Findings**: No public confirmation of Workday/Salesforce.
- **Critical Discovery**: Heavy reliance on **Custom/Proprietary Platforms**:
    - **AtSource**: Supply chain tracking (300+ customers).
    - **Olam Direct**: Farmer app (2.8M users).
    - **OFIS**: Farmer Info System.
    - **Jiva**: AI platform for smallholders (Olam Ventures).
- **Attack Vector**: These custom apps likely contain IDORs, API vulnerabilities, and hardcoded credentials, making them a higher-probability target than hardened SaaS like Salesforce.
