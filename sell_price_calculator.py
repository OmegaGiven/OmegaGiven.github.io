# sell_price_calculator.py
def calculate_sell_price(debt, realestate_cost, desired_cashback):
    return (debt + desired_cashback) * (1 + (realestate_cost * 0.01))
