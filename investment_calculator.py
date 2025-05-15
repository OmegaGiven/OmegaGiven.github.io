def calculate_investment_future_value(principal: float, apy: float, years: int) -> float:
    """
    Calculate the future value of an investment using compound interest.

    Args:
        principal (float): Initial investment amount in dollars.
        apy (float): Annual Percentage Yield (APY) as a percentage (e.g., 5 for 5%).
        years (int): Number of years the investment will grow.

    Returns:
        float: The future value of the investment, rounded to two decimal places.
    """
    if principal <= 0 or apy <= 0 or years <= 0:
        raise ValueError("All inputs must be positive numbers.")

    # Convert APY from percentage to decimal and calculate future value
    rate = apy / 100
    future_value = principal * (1 + rate) ** years
    return round(future_value, 2)
