# Description: The OneStop Insurance Company needs a program to enter and calculate new insurance policy information for its customers. 
# Author: Brandon Maloney & SD 14
# Date(s): March 15/25 -
 
 
# Define required libraries.
import FormatValues as FV
import datetime
import os
import OneStopFunc as OSF
import time
from OneStopFunc import ProgressBar


 
# Define program constants.

with open('OneStopDef.dat', 'r') as f:
    NEXT_POL_NUM = int(f.readline().strip())
    BASIC_PREM_RATE = float(f.readline().strip())
    ADD_CAR_DISC = float(f.readline().strip())
    EXTRA_LIAB_RATE = float(f.readline().strip())
    EXTRA_GLASS_RATE = float(f.readline().strip())
    LOANER_CAR_RATE = float(f.readline().strip())
    HST_RATE = float(f.readline().strip())
    PROC_FEE_RATE = float(f.readline().strip())
    NUM_MONTHS = int(f.readline().strip()) 


CUR_DATE = datetime.datetime.now()



# Main program starts here.
while True:
    allowed_char = set("ABCDEFGHIJKLMONPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz.-'")
    allowed_num = set("0123456789")
    # Gather user inputs.
    while True:
        CustFirst = input("Enter customer first name(Type E to end): ").title()
        if CustFirst == "":
            print()
            print("You must enter a first name.")
            print()
        elif CustFirst == "E":
            print()
            print("Thank you for using OneStop Insurance. Goodbye!")
            print()
            break
        else:
            break
    if CustFirst == "E":
        break
    
    while True:
        CustLast = input("Enter customer last name: ").title()
        if CustLast == "":  
            print()
            print("You must enter a last name.")
            print()
        else:
            break
    while True:
        Address = input("Enter customer address: ").title()
        if Address == "":
            print()
            print("You must enter an address.")
            print()
        else:
            break
    while True:
        City = input("Enter the customer city: ").title()
        if City == "":
            print()
            print("You must enter a city.")
            print()
        else:
            break
    while True:
        Provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"]
        Province = input("Enter the customer province(Ex. AB, BC, NL, NS): ").upper()
        if Province not in Provinces:
            print()
            print("You must enter a valid province.")
            print()
        elif Province == "":
            print()
            print("You must enter a province.")
            print()
        else:
            break
    while True:
        PostCode = input("Enter the customer postal code(XXXXXX): ").upper()
        if PostCode == "":
            print()
            print("You must enter a postal code.")
            print()
            
        elif len(PostCode) != 6:
            print()
            print("Must be a valid postal code.")
            print()  
        else: 
            break
    while True:
        PhoneNum = input("Enter the customer phone number(XXX-XXX-XXXX): ")
        if PhoneNum == "":
            print()
            print("You must enter a phone number.")
            print()
        elif len(PhoneNum) != 10:
            print()
            print("You must enter a valid phone number(ie. 123-456-7890).")
            print()
        else:
            break
    PhoneForm = "({}){}-{}".format(PhoneNum[0:3],PhoneNum[3:6],PhoneNum[6:10])
    while True:
        CarsInsured = input("Enter how many vehicles insured(XX): ")
        try:
            CarsInsured = int(CarsInsured)
            if CarsInsured == "":
                    print()
                    print("You must enter a number of cars insured.")
                    print()
            elif CarsInsured < 1:
                    print()
                    print("You must insure at least one vehicle.")
                    print()
            else:
                break 
        except ValueError:
            print()
            print("Please enter a numeric value for how many cars are insured.")
            print()

    while True:
        ExtraLiabOpt = input("Add extra liabilty options?(Y/N): ").upper()
        if ExtraLiabOpt == "":
            print()
            print("You must choose an option.")
            print()
        else:
            break

    ExtraLiabOptMsg = ""
    if ExtraLiabOpt == "Y":
        ExtraLiabOptMsg = "Yes"
    else:
        ExtraLiabOptMsg = "No"

    GlassCov = input("Add optional glass coverage?(Y/N): ").upper()
    while True:
        if GlassCov == "":
            print()
            print("You must choose an option.")
            print()
        else:
            break
    
    if GlassCov == "Y":
        GlassCovMsg = "Yes"
        
    else:
        GlassCovMsg = "No"

    while True:
        LoanerCar = input("Need a loaner?(Y/N): ").upper()
        
        if LoanerCar == "":
            print()
            print("You must choose an option.")
            print()
        else:
            break
    
    if LoanerCar == "Y":
        LoanerCarMsg = "Yes"
        
    else:
        LoanerCarMsg = "No"
        
    

    # Perform required calculations.
    InsurPrem, TotalExCost, TotInsurPrem, HST, TotCost = OSF.InsurPremCalc(
        ADD_CAR_DISC, BASIC_PREM_RATE, EXTRA_LIAB_RATE, EXTRA_GLASS_RATE, 
        LOANER_CAR_RATE, HST_RATE, CarsInsured, ExtraLiabOpt, GlassCov, LoanerCar
    )

    # Let the user choose their payment method, create a library of possible answers.
    FullPayAnswers = ["F", "Fu", "Ful", "Full", "Full P", "Full Pa", "Full Pay", "Full Paym", "Full Payme", "Full Paymen"]

    DownPay = 0.00
    PayMethod = input("What payment method would you like to choose?(Full Payment/Monthly = Every 8 months): ").strip().title()
    if any(PayMethod.startswith(option) for option in FullPayAnswers):
        PayMethodMsg = "Full Payment"
        print()
        print("You have chosen to pay in full.")
        print()
    else: 
        PayMethodMsg = "Monthly"
        print()
        print("You have chosen to pay monthly.")
        print()
        DownPayChoose = input("Would you like to add a downpayment?(Y/N): ").upper()
        if DownPayChoose == "Y":
            DownPay = input("How much would you like to downpay?: ")
            DownPay = float(DownPay)
            print()
            print(f"Downpay added: {FV.FDollar2(DownPay):>10s}")
            print()
        else:
            print()
            print("No Down payment added.")
            print()

    while True:
        if DownPay > 0:
            MonthlyPayment = ((TotCost - DownPay) + PROC_FEE_RATE) / NUM_MONTHS
            break
        else:
            MonthlyPayment = (PROC_FEE_RATE + TotCost) / NUM_MONTHS
            break

    InvoiceDate = CUR_DATE  

    PayIn20Day = InvoiceDate + datetime.timedelta(days = 20)
    while True: 
        if InvoiceDate.month == 12:
            FirstNextMonth = datetime.datetime(InvoiceDate.year + 1,1,1)
            break
        else:
            FirstNextMonth = datetime.datetime(InvoiceDate.year, InvoiceDate.month + 1, 1)
            break

    FirstPayDate = max(PayIn20Day, FirstNextMonth)

    # See if they have a previous claim they would like to apply to their file.
    ClaimNum = [11941, 11942]
    ClaimDate = ["2025-03-16", "2025-12-18"]
    ClaimAmt = [300.00, 500.00]
    while True: 
        PrevClaim = input("Do you have a previous claim number?(Y/N): ").upper()
        if PrevClaim == "Y":

            # Add the new claim to the list.
            ClaimNum.append(int(input("Enter your claim number(XXXXX): ")))
            ClaimDate.append(input("Enter the date of the claim(YYYY-MM-DD): "))
            ClaimAmt.append(float(input("Enter the amount of the claim: ")))
            break
        else:
            break


    
    # Make a blinking message to let the user know the data is saved.
    OSF.BlinkMessage("Generating Policy ...")

    print()
    print("Policy has been saved!")
    # Display results
    os.system("cls" if os.name == "nt" else "clear")
    print(f"            -------------------------")
    print(f"            |OneStop Insurance Policy|")
    print(f"            -------------------------")
    print(f"Invoice Date:                           {FV.FDateS(InvoiceDate):>10s}")
    print(f"First Payment Date:                     {FV.FDateS(FirstPayDate):>10s}")
    print("--------------------------------------------------")
    print(f"Policy Number:                               {NEXT_POL_NUM:>4d}")
    print(f"Number of Cars Insured:                         {CarsInsured:>2d}")
    print("--------------------------------------------------")
    print()
    print(f"{CustFirst} {CustLast}, ")
    print(f"{Address} ")
    print(f"{City}, {Province}, {PostCode}")
    print()
    print(f"Phone:    {PhoneForm}(H)")
    print()
    print("--------------------------------------------------")
    print(f"Extra Liability Options:                       {ExtraLiabOptMsg:>3s}")
    print(f"Glass Coverage:                                {GlassCovMsg:>3s}")
    print(f"Loaner Car:                                    {LoanerCarMsg:>3s}")
    print("--------------------------------------------------")
    print(f"Payment Method:                        {PayMethodMsg:>11s}")
    print(f"Insurance Premium:                      {FV.FDollar2(InsurPrem):>10s}")
    print(f"Total Extra Cost:                       {FV.FDollar2(TotalExCost):>10s}")
    print(f"Total Insurance Premium:                {FV.FDollar2(TotInsurPrem):>10s}")
    print("--------------------------------------------------")
    print(f"Total HST:                              {FV.FDollar2(HST):>10s}")
    print(f"Total Cost:                             {FV.FDollar2(TotCost):>10s}")
    print("--------------------------------------------------")
    print(f"Down Payment:                           {FV.FDollar2(DownPay):>10s}")
    print(f"Monthly Payment:                        {FV.FDollar2(MonthlyPayment):>10s}")
    print(f"Invoice Date:                           {FV.FDateS(InvoiceDate)}")
    print(f"First Payment Date:                     {FV.FDateS(FirstPayDate)}")
    print(f"                 -----------------")
    print(f"                 |Previous Claims|")
    print(f"                 -----------------")
    print("         Claim #    Claim Date    Amount")
    print("        -----------------------------------")

    while True:
        for i in range(len(ClaimNum)):
                print(f"         {ClaimNum[i]}      {ClaimDate[i]}  {FV.FDollar2(ClaimAmt[i]):>10s}")
        break
    print("        -----------------------------------")

    # Ask if the data should be saved.
    SaveDat = input("Would you like to save this policy? (Y/N): ").upper()
    if SaveDat == 'Y':
        # Show progress bar while saving.
        total = 100  
        print("Saving policy...")
        for i in range(total + 1):  
            ProgressBar(i, total, prefix='Progress', suffix='Complete', length=100) 
            time.sleep(0.05) 
        
        # Write the policy data to the file
        f = open("Policies.dat", "a")

        try:
    # Write to the file
            f.write(f"{NEXT_POL_NUM},{CustFirst},{CustLast},{Address},{City},{Province},{PostCode},{PhoneNum},{CarsInsured},{ExtraLiabOpt},{GlassCov},{LoanerCar},{PayMethod},{TotCost},{DownPay},{MonthlyPayment},{InvoiceDate},{FirstPayDate}\n")
            print()
            print("Data has been written successfully!")
            print()
    
        finally:
            f.close()
    else:
        print("The policy has not been saved.")

    # Ask if they would like to create another policy.
    AnotherPol = input("Would you like to enter another policy? (Y/N): ").upper()

    if AnotherPol != "Y":
        print()
        print("Thank you for using OneStop Insurance. Goodbye!")
        print()
        break  
    else:
# Update any values for the next process through the loop.
        NEXT_POL_NUM += 1  
        os.system("cls" if os.name == "nt" else "clear")  
        print("Starting a new policy entry...\n")



        
    

 

 
 
# Any housekeeping duties at the end of the program.