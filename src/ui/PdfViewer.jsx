import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
const PdfViewer = ({ pdfUrl }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null); // For getting width
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        if (!pdfUrl) return;

        const loadPdf = async () => {
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            setPdfDoc(pdf);
            setPageNum(1);
        };

        loadPdf();
    }, [pdfUrl]);

    useEffect(() => {
        const render = async () => {
            if (!pdfDoc || !containerRef.current) return;

            const page = await pdfDoc.getPage(pageNum);
            const containerWidth = containerRef.current.clientWidth;

            const viewport = page.getViewport({ scale: 1 });
            const scale = containerWidth / viewport.width; // scale to fit container width
            const scaledViewport = page.getViewport({ scale });

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            await page.render({
                canvasContext: context,
                viewport: scaledViewport,
            }).promise;
        };

        render();
    }, [pdfDoc, pageNum]);

    return (
        <div ref={containerRef} style={{ width: "100%", maxWidth: "100%", overflow: "auto" }}>
            <canvas ref={canvasRef}></canvas>
            {pdfDoc && (
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    <Button variation="primary" size="fit" onClick={() => setPageNum(p => Math.max(1, p - 1))} disabled={pageNum <= 1}>
                        Previous
                    </Button>
                    <span>
                        Page {pageNum} of {pdfDoc.numPages}
                    </span>
                    <Button variation="primary" size="fit" onClick={() => setPageNum(p => Math.min(pdfDoc.numPages, p + 1))} disabled={pageNum >= pdfDoc.numPages}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PdfViewer;
