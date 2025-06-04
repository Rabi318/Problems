// src/components/PDFDownload.js
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PDFDownload = ({ targetRef, logs }) => {
  const downloadPDF = () => {
    if (logs.length === 0) {
      alert("No entries available to download.");
      return;
    }

    const input = targetRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("MindTrack-Journal.pdf");
    });
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <button onClick={downloadPDF}>Download Journal as PDF</button>
    </div>
  );
};

export default PDFDownload;
