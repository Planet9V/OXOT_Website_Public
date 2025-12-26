# **Exploit Prediction Scoring System (EPSS) Data & Statistics**

Source: FIRST.org EPSS Data & Statistics  
Data As Of: December 14, 2025

## **Overview**

The Exploit Prediction Scoring System (EPSS) is a data-driven effort for estimating the likelihood (probability) that a software vulnerability will be exploited in the wild.

## **Current Statistics (Dec 14, 2025\)**

* **Total CVEs Scored:** 305,969  
* **New CVEs Scored:** 36

## **Data Fields**

The EPSS data is provided in CSV format with the following fields:

1. **cve:** The CVE identifier (e.g., CVE-2023-1234).  
2. **epss:** The probability score (between 0 and 1).  
   * *Interpretation:* A higher score indicates a higher probability of exploitation in the wild within the next 30 days.  
3. **percentile:** The percentile rank of the score.  
   * *Interpretation:* The proportion of all scored vulnerabilities that have the same or lower EPSS score.

## **Model Version History**

When performing historical analysis, it is important to note the major model updates, as they result in significant shifts in scoring data:

* **EPSS v4 (Current):** Started publishing on **March 17, 2025**.  
* **EPSS v3:** Published from March 7, 2023, to March 16, 2025\.  
* **EPSS v2:** Published from February 4, 2022, to March 6, 2023\.  
* **EPSS v1:** Published from April 14, 2021, to February 3, 2022\.

## **Accessing Data**

* **Daily CSV:** https://epss.empiricalsecurity.com/epss\_scores-YYYY-mm-dd.csv.gz  
* **Example (Feb 1, 2023):** https://epss.empiricalsecurity.com/epss\_scores-2023-02-01.csv.gz