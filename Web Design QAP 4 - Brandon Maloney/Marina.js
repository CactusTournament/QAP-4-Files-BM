// Desc: A program for the St. John's Marina & Yacht club to allow them to enter the appropriate information and prepare a receipt for yachts docked at their club.
// Author: Brandon Maloney & SD 14
// Date: March 18, 2025

//Define Constants
const SITE_EVEN_RATE = 80.00 
const SITE_ODD_RATE = 120.00 

const ALT_MEM_RATE = 5.00 

const CLEAN_SERV_RATE = 50.00 
const VIDEO_SERV_RATE = 35.00 

const HST_RATE = .15 

const STAN_MEM_RATE = 75.00 
const EXEC_MEM_RATE = 150.00

const PROC_FEE_RATE = 59.99 
const CANC_FEE_RATE = .60 

const currentDate = new Date();
const currentDateFormatted = currentDate.getFullYear() + "/" +
  String(currentDate.getMonth() + 1).padStart(2, '0') + "/" +
  String(currentDate.getDate()).padStart(2, '0');


// Format options for printing.
const cur2Format = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: "2",
  maximumFractionDigits: "2",
});

// Gather user input.


// Gather user input.

let MemSitNum = prompt("Enter the membership site number(1-100): ")
MemSitNum = parseInt(MemSitNum);
let MemNam = prompt("Enter the membership name: ")
let StAdd = prompt("Enter the street address: ")
let City = prompt("Enter the city: ")
let Prov = prompt("Enter the province(Ex. AB, NL, BC, NY...): ")
let PostCod = prompt("Enter the postal code(XXXXXX): ")
let PhonNum = prompt("Enter the phone number(XXX-XXX-XXXX): ")
let CellNum = prompt("Enter the cell number(XXX-XXX-XXXX): ")
let MemType = prompt("Enter the membership type(S/E): ")
let MemFamFren = prompt("Family/friends on account: ")
let CleanServ = prompt("Cleaning service?(Y/N): ")
let VideoServ = prompt("Video Service?(Y/N): ")


// Perform program calculations.

SitCharge = 0
if (MemSitNum % 2 == 0) {
  SitCharge = SITE_EVEN_RATE + (MemFamFren * ALT_MEM_RATE)
} else {
  SitCharge = SITE_ODD_RATE + (MemFamFren * ALT_MEM_RATE)
}

let CleanServTot = 0
let VideoServTot = 0
if (CleanServ == "Y") {
  CleanServTot = CLEAN_SERV_RATE
}
else {
  CleanServTot = 0
}
if (VideoServ == "Y") {
  VideoServTot = VIDEO_SERV_RATE
}
else {
  VideoServTot = 0
}

// Display if the customer chose the additional services.
let CleanServMsg = ""
if (CleanServ == "Y") {
  CleanServMsg = "YES"
}
else {
  CleanServMsg = "NO"
}
let VideoServMsg = ""
if (VideoServ == "Y") {
  VideoServMsg = "YES"
}
else {
  VideoServMsg = "NO"
}

let ExtCharge = CleanServTot + VideoServTot
let SubTot = SitCharge + ExtCharge
let Taxes = SubTot * HST_RATE
let MonCharTot = SubTot + Taxes
let MemDues = (MemType == "S") ? STAN_MEM_RATE : EXEC_MEM_RATE;
let MonFeeTot = MonCharTot + MemDues;

// Display the membership type.
let MemTypeMsg = ""
if (MemType == "S") {
  MemTypeMsg = "Standard"
}
else {
  MemTypeMsg = "Executive"
}

let YearFeeTot = MonFeeTot * 12
let MonPayTot = (YearFeeTot + PROC_FEE_RATE) / 12

// Cancellation fee if the customer cancels without proper notice.
let CanFee = (SitCharge * 12) * CANC_FEE_RATE

// Display the results

document.writeln("<table class='marinareceipt'>");
document.writeln("<tr>");
document.writeln("<td class='mainhead' colspan='2'>&nbsp; St. John's Marina & Yacht Club<br />Yearly Member Receipt<br /></td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td colspan='2'><br /> Client Name and Address:<br /><br /><hr/><br />" + MemNam + ", " + StAdd + "<br /> "+ City +", " + Prov + ", " + PostCod + "<br /><br />Phone: " + PhonNum + "(H) <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + CellNum + "(C)<br /><br /></td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Site #: " + MemSitNum + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Member type: " + MemTypeMsg + "</td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Alternate Members:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ MemFamFren + "<br />Weekly Site Cleaning:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CleanServMsg + "<br />Video Surveillance:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + VideoServMsg + "<br /></td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Site Charge:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ cur2Format.format(SitCharge) +"<br/>Extra charges:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ cur2Format.format(ExtCharge) +"<br/></td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Subtotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + cur2Format.format(SubTot) + "<br/>Sales tax (HST): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + cur2Format.format(Taxes) + "</td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Total monthly charges:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + cur2Format.format(MonCharTot) + "<br/>Monthly dues:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + cur2Format.format(MemDues) + "<br/></td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Total monthly fees:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ cur2Format.format(MonFeeTot)+"<br/>Total yearly fees:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+cur2Format.format(YearFeeTot)+"</td>")
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Monthly payment:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + cur2Format.format(MonPayTot) + "<br/><br/></td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='receiptbox'colspan='2'>Issued:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + currentDateFormatted + "<br /><br />HST Reg NO: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;549-33-5849-47<br /><br />Cancellation fee:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + cur2Format.format(CanFee) + "</td>");
document.writeln("</tr>");

document.writeln("<tr>");
document.writeln("<td class='blackbox' colspan='2'><br /></td>");
document.writeln("</tr>");
document.writeln("</table>");



 


