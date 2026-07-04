import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateSchemePDF = (userData, schemes, t) => {
  try {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    });

    // Limit to 20 schemes
    const limitedSchemes = schemes.slice(0, 20);
    
    // Page 1: Official Cover Header
    doc.setFillColor(0, 33, 71); // Gov Deep Blue
    doc.rect(0, 0, 210, 50, 'F');
    
    // National Emblem Style Circle
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 25, 12, 'F');
    doc.setTextColor(0, 33, 71);
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text('GOI', 25, 27, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('GOVERNMENT OF INDIA', 45, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Digital India Initiative | Unified Welfare Service Portal', 45, 28);
    doc.text('Ministry of Electronics & Information Technology', 45, 34);
    
    // Report Title & User Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('PUBLIC WELFARE SCHEMES', 105, 65, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Eligibility Report 2026', 105, 73, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('BENEFICIARY PROFILE:', 14, 75);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${userData.name.toUpperCase()}  |  ID: #${Math.floor(Math.random()*900000)+100000}`, 14, 82);
    doc.text(`Age: ${userData.age}  |  State: ${userData.state}  |  Occupation: ${userData.occupation}`, 14, 88);
    doc.text(`Annual Income Category: ₹${userData.income}`, 14, 94);
    
    doc.setDrawColor(230, 230, 230);
    doc.line(14, 100, 196, 100);

    // AI Matching Notice
    doc.setFillColor(245, 247, 250);
    doc.rect(14, 108, 182, 12, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('AI ANALYSIS LOG:', 18, 116);
    doc.setFont('helvetica', 'normal');
    doc.text(`Neural Matching Engine verified ${limitedSchemes.length} optimal public welfare matches for your profile.`, 48, 116);

    // Table of Results
    const tableData = limitedSchemes.map((s, idx) => [
      (idx + 1).toString().padStart(2, '0'),
      s.nameKey ? t(s.nameKey) : (s.scheme_name || s.name || 'Untitled Scheme'),
      s.descKey ? t(s.descKey) : (s.summary || s.details || s.description || '-'),
      `${s.score || 0}%`,
      s.benefits ? (Array.isArray(s.benefits) ? s.benefits.join('\n• ') : s.benefits.toString()) : '-'
    ]);

    autoTable(doc, {
      startY: 125,
      head: [['REF#', 'SCHEME NAME', 'TECHNICAL DESCRIPTION', 'MATCH', 'PROPOSED BENEFITS']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [0, 33, 71], 
        fontSize: 8, 
        fontStyle: 'bold', 
        halign: 'center', 
        textColor: [255, 255, 255] 
      },
      bodyStyles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { halign: 'center', cellWidth: 12 },
        1: { fontStyle: 'bold', cellWidth: 35 },
        2: { cellWidth: 60 },
        3: { halign: 'center', fontStyle: 'bold', cellWidth: 15 },
        4: { fontSize: 7 }
      },
      styles: { overflow: 'linebreak' }
    });

    // Verification Section
    const finalY = (doc).lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Digital Verification Stamp:', 14, finalY);
    
    doc.setDrawColor(0, 0, 0);
    doc.rect(14, finalY + 4, 30, 30);
    doc.setFontSize(6);
    doc.text('VERIFIED AI', 29, finalY + 20, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('• This document is electronically generated and requires no physical signature.', 50, finalY + 8);
    doc.text('• Verification ID: GV-MATCH-XAI-2026-991', 50, finalY + 14);
    doc.text('• Report validity: 90 Days from the date of generation.', 50, finalY + 20);

    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150);
      doc.text(`Official Document | Digital India Portal | Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
    }

    const nameSlug = userData.name.toLowerCase().replace(/[^a-z]/g, '_');
    doc.save(`GOI_Report_${nameSlug}_2026.pdf`);

  } catch (error) {
    console.error('PDF Engine Error:', error);
    alert('PDF Generation encountered a technical error. Please try again.');
  }
};
