import { Component, OnInit } from "@angular/core";
const pdfMake = require("pdfmake/build/pdfmake.js");
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { OrderModel } from "src/app/models/order-model.model";
import { authStore } from "src/app/redux/auth.state";
import { ordersStore } from "src/app/redux/orders.state";
import { CartService } from "src/app/services/cart.service";
import { OrdersService } from "src/app/services/orders.service";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-invoice-pdf",
  templateUrl: "./invoice-pdf.component.html",
  styleUrls: ["./invoice-pdf.component.css"],
})
export class InvoicePDFComponent {
  constructor(
    private cartsService: CartService,
    private ordersService: OrdersService
  ) {}

  async downloadPDF() {
    let lastOrder: OrderModel = ordersStore.getState().lastOrder;

    const customer = authStore.getState().customer;

    //Get last orders cart items:
    const cartItems = await this.cartsService.getAllItemsByCart(
      lastOrder?.cartId
    );
    const totalPrice = this.cartsService.getTotalPriceCart();

    if (!lastOrder) return;
    const invoicePDF = {
      content: [
        {
          text: "ShopIn - supermarket online by Rachel Rozental",
          style: "subheader",
          alignment: "center",
        },
        {
          text: "Tax Invoice",
          style: "header",
          alignment: "center",
          bold: true,
          decoration: "underline",
        },
        { text: "Customer Details:", style: "subheader" },
        {
          columns: [
            [
              {
                text: customer.firstName + " " + customer.lastName,
                bold: true,
              },
              { text: customer.username },
              { text: customer.street },
              { text: customer.city },
            ],
            [
              {
                text:
                  "Order Date: " +
                  new Date(lastOrder.orderDate).toLocaleDateString("en-IL"),
                alignment: "right",
              },
              {
                text: `Credit Card: ${lastOrder.creditCard4Charts}`,
                alignment: "right",
              },
            ],
          ],
        },
        {
          text: "Delivery Details:",
          style: "subheader",
          alignment: "left",
        },
        {
          columns: [
            [
              { text: "Delivery Street:" + " " + lastOrder.deliveryStreet },
              { text: "Delivery City:" + " " + lastOrder.deliveryCity },
              {
                text:
                  "Delivery Date:" +
                  " " +
                  new Date(lastOrder.deliveryDate).toLocaleDateString("en-IL"),
              },
            ],
          ],
        },
        { text: "Order Details: ", style: "subheader" },
        {
          style: "tableStyle",
          table: {
            widths: ["*", "auto", "auto", "auto"],
            body: [
              [
                {
                  text: "Product",
                  style: "tableHeader",
                },
                {
                  text: "Quantity",
                  style: "tableHeader",
                },
                {
                  text: "Price",
                  style: "tableHeader",
                },
                {
                  text: "Total Price",
                  style: "tableHeader",
                },
              ],
              ...cartItems.map((c) => [
                c.product.productName,
                c.quantity,
                "ILS" + " " + c.product.price,
                "ILS" + " " + (c.product.price * c.quantity).toFixed(2),
              ]),
            ],
          },
        },
        {
          text:
            "Price without VAT: " +
            "ILS" +
            " " +
            ((totalPrice * 100) / 117).toFixed(2),
          bold: true,
          alignment: "right",
        },
        {
          text: "VAT: " + "ILS" + " " + ((totalPrice * 17) / 117).toFixed(2),
          bold: true,
          alignment: "right",
        },
        {
          text: "Total Price including VAT: " + "ILS" + totalPrice.toFixed(2),
          bold: true,
          alignment: "right",
        },
        {
          text: "The invoice was produced by the system and approved by the tax authorities.",
          alignment: "center",
          style: "commentInvoice",
          fontSize: 10,
        },
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableStyle: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        commentInvoice: {
          margin: [0, 60, 0, 0],
        },
      },
    };

    pdfMake.createPdf(invoicePDF).download();
  }
}
