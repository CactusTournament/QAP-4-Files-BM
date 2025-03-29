import sys
import time

def ProgressBar(iteration, total, prefix='', suffix='', length=30, fill='█'):
    # Generate and display a progress bar with % complete at the end.
 
    percent = ("{0:.1f}").format(100 * (iteration / float(total)))
    filled_length = int(length * iteration // total)
    bar = fill * filled_length + '-' * (length - filled_length)
    sys.stdout.write(f'\r{prefix} |{bar}| {percent}% {suffix}')
    sys.stdout.flush()
 

# Display a blinking message to let the user know the data is saved.

def BlinkMessage(message, blinks=5, blink_delay=0.3, clear_delay=0.3):
    for _ in range(blinks):  # Control the number of blinks
        print(message, end='\r')
        time.sleep(blink_delay)  # To create the blinking effect
        sys.stdout.write('\033[2K\r')  # Clears the entire line and carriage returns
        time.sleep(clear_delay)  # Delay after clearing the line


def ExFeatures(EXTRA_LIAB_RATE, EXTRA_GLASS_RATE, LOANER_CAR_RATE, ExtraLiab, GlassCov, CarLoan, CarsInsured):
    # Function will accept the extra liability, glass coverage, and loaner car rates and the user's choices for each.
    while True:
        ExLiabAmt = 0
        ExGlassAmt = 0
        ExCarLoanAmt = 0
        TotalExCost = 0
        if ExtraLiab == "Y":
            ExLiabAmt += EXTRA_LIAB_RATE * CarsInsured
        else:
            0
        if GlassCov == "Y":
            ExGlassAmt += EXTRA_GLASS_RATE * CarsInsured
        else: 
            0

        if CarLoan == "Y":
            ExCarLoanAmt += LOANER_CAR_RATE * CarsInsured
        else:
            0
        TotalExCost = ExLiabAmt + ExGlassAmt + ExCarLoanAmt
        return TotalExCost

def InsurPremCalc(ADD_CAR_DISC, BASIC_PREM_RATE, EXTRA_LIAB_RATE, EXTRA_GLASS_RATE, LOANER_CAR_RATE, HST_RATE, CarsInsured, ExtraLiabOpt, GlassCov, LoanerCar):
    # Function will accept the rates for the basic premium, extra liability, glass coverage, loaner car, and HST as well as the user's choices for each.
    InsurPrem = (((BASIC_PREM_RATE * ADD_CAR_DISC) * (CarsInsured - 1)) ) + BASIC_PREM_RATE

    TotExCost = ExFeatures(EXTRA_LIAB_RATE, EXTRA_GLASS_RATE, LOANER_CAR_RATE, ExtraLiabOpt, GlassCov, LoanerCar, CarsInsured)

    TotInsurPrem = InsurPrem + TotExCost

    HST = HST_RATE * TotInsurPrem

    TotCost = TotInsurPrem + HST

    return InsurPrem, TotExCost, TotInsurPrem, HST, TotCost


