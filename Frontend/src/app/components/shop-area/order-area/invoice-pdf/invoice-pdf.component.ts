import { Component, OnInit } from "@angular/core";
// import "pdfmake/build/pdfmake";
// import "pdfmake/build/vfs_fonts";
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const pdfMake = require("pdfmake/build/pdfmake.js");
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-invoice-pdf",
  templateUrl: "./invoice-pdf.component.html",
  styleUrls: ["./invoice-pdf.component.css"],
})
export class InvoicePDFComponent {
  generatePDF() {
    const dd = {
      content: [
        "First paragraph",
        "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
      ],
    };

    pdfMake.createPdf(dd).download();
  }
}
