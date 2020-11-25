import React, { useState } from "react";
import axios from "./axios";
import "./PdfDetails.css";

function PdfDetails() {
  const [info, setInfo] = useState();
  const [fontDetails, setFontDetails] = useState();
  const [sampleDetails, setSampleDetails] = useState();
  const [pdfName, setPdfName] = useState();
  const [pagesCount, setPagesCount] = useState();

  //methhod to run when a PDF file is selected
  const onPdfUpload = async (e) => {
    let formData = new FormData();
    formData.append("file", e.currentTarget.files[0]);
    formData.append("name", "uploaded file");
    setPdfName(e.currentTarget.files[0].name);
    const req = await axios.post("/getFontData", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    //method to display number of pages
    async function addPages() {
      document.getElementById("input").style.visibility = "hidden";
      document.getElementById("pdf__details").style.visibility = "visible";
      document.getElementById("button").style.visibility = "visible";

      setPagesCount(req.data.pdf_length);
    }
    addPages();

    //method to display PDF info
    async function addInfo() {
      let z = [
        <tr>
          <th>Parameter</th>
          <th>Value</th>
        </tr>,
      ];
      let y;

      document.getElementById("input").style.visibility = "hidden";
      document.getElementById("info").style.visibility = "visible";

      const formatDate = (date) => {
        let yyyy = date.slice(2, 6);
        let mm = date.slice(6, 8);
        let dd = date.slice(8, 10);
        let h = date.slice(10, 12);
        let m = date.slice(12, 14);
        let s = date.slice(14, 16);

        return dd + "-" + mm + "-" + yyyy + " " + h + ":" + m + ":" + s;
      };

      if (req.data.pdf_info["/CreationDate"]) {
        req.data.pdf_info["/CreationDate"] = formatDate(
          req.data.pdf_info["/CreationDate"]
        );
      }
      if (req.data.pdf_info["/ModDate"]) {
        req.data.pdf_info["/ModDate"] = formatDate(
          req.data.pdf_info["/ModDate"]
        );
      }
      for (let x in req.data.pdf_info) {
        if (
          req.data.pdf_info[x] !== true &&
          req.data.pdf_info[x] !== false &&
          req.data.pdf_info[x] !== "" &&
          typeof req.data.pdf_info[x] !== "object"
        ) {
          z.push(
            <tr>
              <td>{x.slice(1, x.length)}</td>
              <td>{req.data.pdf_info[x]}</td>
            </tr>
          );
          y = <table className="table">{z}</table>;
        }
        setInfo(y);
      }
    }
    addInfo();

    //method to display PDF font details
    async function addFontData() {
      let z = [
        <tr>
          <th>Font Name</th>
          <th>Sample Text</th>
          <th>Embedded</th>
        </tr>,
      ];
      let y;
      document.getElementById("input").style.visibility = "hidden";
      document.getElementById("font__details").style.visibility = "visible";

      //filtering the data to remove duplicate values
      const data = req.data.font_details;
      const set = new Set(data.map((item) => JSON.stringify(item)));
      const dedup = [...set].map((item) => JSON.parse(item));

      let req1 = dedup;

      for (let x in req1) {
        z.push(
          <tr>
            <td>{req1[x].name.slice(1, req1[x].name.length)}</td>
            <td>{req1[x].text}</td>
            <td>{req1[x].embedded}</td>
          </tr>
        );
        y = <table className="table">{z}</table>;
        setFontDetails(y);
      }
    }
    addFontData();
  };

  //method to redirect to homepage
  function checkNewPdf() {
    window.location.replace("/");
  }
  return (
    <div className="pdf__main">
      <div className="pdf__main1">
        <h1>PDF DETAILS</h1>
        <div id="input" className="input">
          <input
            onChange={onPdfUpload}
            id="file"
            name="file"
            type="file"
            accept=".pdf"
          />
        </div>
        <div id="pdf__details" style={{ visibility: "hidden" }}>
          <h3>Displaying results for : {pdfName}</h3>
          <h3>Total Pages in PDF: {pagesCount}</h3>
        </div>
        <div id="info" style={{ visibility: "hidden" }}>
          <h1> Information</h1>
          <div className="info__table">{info}</div>
        </div>

        <div id="font__details" style={{ visibility: "hidden" }}>
          <h1> Font Details</h1>
          <div className="font__table">{fontDetails}</div>
        </div>
        <div id="sample__details" style={{ visibility: "hidden" }}>
          <h1> Sample Content</h1>
          <div className="sample__table">{sampleDetails}</div>
        </div>
        <button
          id="button"
          style={{ visibility: "hidden" }}
          className="button"
          onClick={checkNewPdf}
        >
          Check another PDF
        </button>
      </div>
    </div>
  );
}

export default PdfDetails;
