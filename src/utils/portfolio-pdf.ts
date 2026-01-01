
import { ServiceData, regions, getRegionalPrice, formatPrice, Region } from '@/data/services-portfolio';

interface GeneratePDFParams {
    selectedServices: ServiceData[];
    regionId: string;
    clientSize: 'small' | 'medium' | 'enterprise';
    clientName: string;
}

export const generatePortfolioPDF = async ({
    selectedServices,
    regionId,
    clientSize,
    clientName
}: GeneratePDFParams): Promise<void> => {
    try {
        // Dynamic import of jsPDF to avoid SSR issues
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let y = margin;

        const region = regions[regionId] || regions.EU;

        // Calculate totals
        const totals = selectedServices.reduce((acc, service) => {
            const price = getRegionalPrice(service, regionId, clientSize);
            return {
                min: acc.min + price.min,
                max: acc.max + price.max,
                count: acc.count + 1,
                goldCount: acc.goldCount + (service.tier === 'Gold' ? 1 : 0),
                blueCount: acc.blueCount + (service.tier === 'Blue' ? 1 : 0),
                redCount: acc.redCount + (service.tier === 'Red' ? 1 : 0)
            };
        }, { min: 0, max: 0, count: 0, goldCount: 0, blueCount: 0, redCount: 0 });

        // === COVER PAGE ===
        // Header bar
        doc.setFillColor(10, 10, 10);
        doc.rect(0, 0, pageWidth, 60, 'F');

        // Gold accent line
        doc.setFillColor(212, 164, 24);
        doc.rect(0, 60, pageWidth, 2, 'F');

        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text('AEON CYBER', margin, 35);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text('Strategic Portfolio Proposal', margin, 48);

        // Client info
        y = 80;
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(10);
        doc.text('PREPARED FOR', margin, y);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(clientName, margin, y + 10);

        // Date and region
        y += 25;
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, y);
        doc.text(`Region: ${region.name}`, margin, y + 6);
        doc.text(`Client Size: ${clientSize.charAt(0).toUpperCase() + clientSize.slice(1)}`, margin, y + 12);

        // Summary box
        y += 30;
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(margin, y, pageWidth - 2 * margin, 60, 3, 3, 'F');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('EXECUTIVE SUMMARY', margin + 10, y + 12);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(55, 65, 81);
        doc.text(`Total Services: ${totals.count}`, margin + 10, y + 24);
        doc.text(`Estimated Annual Value: ${region.symbol}${formatPrice(totals.min, '')} - ${region.symbol}${formatPrice(totals.max, '')}`, margin + 10, y + 32);
        doc.text(`Tier Mix: ${totals.goldCount} Gold | ${totals.blueCount} Blue | ${totals.redCount} Red`, margin + 10, y + 40);
        doc.text(`ROI Projection: ~137% (Year 1 Conservative)`, margin + 10, y + 48);


        // === SERVICES PAGES ===
        // Each service gets its own detailed block

        selectedServices.forEach((service, index) => {
            doc.addPage();
            y = margin;

            const price = getRegionalPrice(service, regionId, clientSize);
            const tierColor = service.tier === 'Gold' ? [212, 164, 24] :
                service.tier === 'Blue' ? [0, 66, 214] : [214, 0, 0];

            // Header Strip
            doc.setFillColor(tierColor[0], tierColor[1], tierColor[2]);
            doc.rect(0, 0, pageWidth, 20, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(`${service.tier.toUpperCase()} TIER SERVICE`, margin, 12);
            doc.text(`Ref: #${service.id.toString().padStart(3, '0')}`, pageWidth - margin, 12, { align: 'right' });

            y = 35;

            // Service Title
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(service.name, margin, y);

            y += 10;
            // Short Description
            doc.setTextColor(107, 114, 128);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'italic');
            const pitch = doc.splitTextToSize(service.elevatorPitch, pageWidth - 2 * margin);
            doc.text(pitch, margin, y);
            y += (pitch.length * 5) + 5;

            // Pricing Box
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.1);
            doc.line(margin, y, pageWidth - margin, y);
            y += 10;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);
            doc.text(`Investment: ${price.symbol}${formatPrice(price.min, '')} - ${price.symbol}${formatPrice(price.max, '')} / year`, margin, y);
            doc.text(`Timeline: ${service.timeline.threeMonths}`, pageWidth - margin, y, { align: 'right' });

            y += 15;

            // Detailed Content Grid
            const boxWidth = (pageWidth - 3 * margin) / 2;

            // Business Case
            if (service.details?.business) {
                doc.setFillColor(245, 247, 250);
                doc.roundedRect(margin, y, pageWidth - 2 * margin, 40, 2, 2, 'F');

                doc.setTextColor(0, 40, 100);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Business Case', margin + 5, y + 8);

                doc.setTextColor(60, 60, 60);
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                const busText = doc.splitTextToSize(service.details.business, pageWidth - 2 * margin - 10);
                doc.text(busText, margin + 5, y + 16);

                y += 50;
            }

            // Technical Deployment
            if (service.details?.technical) {
                doc.setFillColor(250, 245, 245); // slight red tint? or just gray
                doc.setFillColor(245, 245, 250);
                doc.roundedRect(margin, y, pageWidth - 2 * margin, 50, 2, 2, 'F');

                doc.setTextColor(0, 40, 100);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Technical Deployment', margin + 5, y + 8);

                doc.setTextColor(60, 60, 60);
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');

                // Handle simple markdown bold **text** by removing asterisks (simplified for PDF)
                const cleanTech = service.details.technical.replace(/\*\*/g, '');
                const techText = doc.splitTextToSize(cleanTech, pageWidth - 2 * margin - 10);
                doc.text(techText, margin + 5, y + 16);

                y += 60;
            }

            // Financial Impact
            if (service.financialImpact) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text('Projected Impact', margin, y);
                y += 8;

                service.financialImpact.forEach(impact => {
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(80, 80, 80);
                    doc.text(`• ${impact.metric}: ${impact.improvement} (${impact.without} -> ${impact.with})`, margin + 5, y);
                    y += 6;
                });
                y += 5;
            }

            // Differentiator
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 100, 0); // Open Green
            doc.text('Critical Differentiator:', margin, y + 5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);
            doc.text(service.differentiator, margin + 45, y + 5);

        });

        // === FOOTER ON LAST PAGE ===
        doc.setFillColor(10, 10, 10);
        doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(8);
        doc.text('AEON CYBER | Advanced Digital Twin Platform', margin, pageHeight - 8);
        doc.text('www.aeoncyber.io', pageWidth - margin, pageHeight - 8, { align: 'right' });

        // Save
        doc.save(`AEON_Strategic_Portfolio_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);

    } catch (error) {
        console.error('PDF generation failed:', error);
        throw error;
    }
};
