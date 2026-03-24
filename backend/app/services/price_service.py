def calculate_price(service_type: str, priority: str):
    base_prices = {
        "Electronic Projects": (500, 2000),
        "Notes Writing": (100, 500),
        "Record Writing": (200, 700),
        "PPT Creation": (150, 600),
        "Coding Projects": (300, 1500),
        "Website Development": (500, 3000),
    }

    if service_type not in base_prices:
        return 0

    min_price, max_price = base_prices[service_type]

    price = (min_price + max_price) // 2

    if priority == "Urgent":
        price += 200  # extra charge

    return price