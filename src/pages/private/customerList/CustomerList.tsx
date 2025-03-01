import { useSelector } from "react-redux";
import "./CustomerList.scss";
import { RootState } from "../../../store";
import { Button } from "@mui/material";
import { useAuthentication } from "../../../hooks/useAuthentication";

// array of table headers
const tableHeader = [
  { id: 1, title: "Client name" },
  { id: 2, title: "Product quantity" },
  { id: 3, title: "Billing date" },
  { id: 4, title: "Contact details" },
  { id: 5, title: "Address" },
  { id: 6, title: "Billing price" },
];

const CustomerList = () => {
  const { logout } = useAuthentication();
  const allInvoices = useSelector(
    (state: RootState) => state.billData.billFormData
  );

  const printInvoice = () => {
    const tableContent = document.querySelector(".table-responsive")?.innerHTML;
    if (!tableContent) return;

    const printWindow = window.open("", "", "width=900,height=700");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed; 
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
              word-wrap: break-word; 
              white-space: normal; 
            }
            th {
              background-color: var(--white);
              font-weight: bold;
            }
            @media print {
              body {
                padding: 0;
                margin: 10mm; 
              }
              table {
                width: 100% !important;
                font-size: 10px; 
              }
              th, td {
                padding: 5px; 
              }
            }
          </style>
        </head>
        <body>
          <h2>Invoice</h2>
          <div style="overflow-x: auto;">
            ${tableContent}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
    };

    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };

  return (
    <div className="customer-list container-fluid">
      <div className="d-flex justify-content-between">
        <h1 className="title">Customer List</h1>
        <Button
          onClick={logout}
          variant="contained"
          color="secondary"
          className="m-2"
        >
          Logout
        </Button>
      </div>
      <div className="table-responsive mt-5">
        <table className="table table-hover">
          <thead>
            <tr>
              {tableHeader.map((item) => (
                <th key={item.id} scope="col">
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allInvoices.length > 0 ? (
              allInvoices.map((item, index) => (
                <tr key={index}>
                  <td>{item.customerName}</td>
                  <td>
                    {item.products.reduce(
                      (total, i) => total + (i.productQuantity ?? 0),
                      0
                    ) ?? 0}
                  </td>
                  <td>{item.billingDate}</td>
                  <td>{item.customerMobileNumber}</td>
                  <td>{item.customerAddress}</td>
                  <td>
                    {item.products.reduce(
                      (total, i) => total + (i.totalPrice ?? 0),
                      0
                    ) ?? 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeader.length} className="text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Button
          onClick={printInvoice}
          variant="contained"
          color="secondary"
          className="m-2"
        >
          Print Invoice
        </Button>
      </div>
    </div>
  );
};

export default CustomerList;
