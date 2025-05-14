def calculate_fence_cost(height, length, sides):
    # Calculate total square footage
    sqft = height * length * sides

    # Cost of materials
    material_cost = sqft * 0.11

    # Suggested fence cost
    suggested_cost = sqft * 2.25

    # Return results as a JSON string
    import json
    return json.dumps([sqft, material_cost, suggested_cost])
