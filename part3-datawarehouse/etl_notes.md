## ETL Decisions

### Decision 1 — Standardizing Date Formats
Problem: The raw `retail_transactions.csv` file contained dates in three different formats: `YYYY-MM-DD`, `DD-MM-YYYY`, and `DD/MM/YYYY` (e.g., `2023-02-05`, `20-02-2023`, `29/08/2023`). A data warehouse requires uniform date structures for accurate time-series analysis.
Resolution: During the ETL load, I utilized a simulated date-parsing transformation string/CAST function to force all date strings into a standard `YYYY-MM-DD` ISO SQL DATE format before loading them into the `dim_date` table.

### Decision 2 — Unifying Category Casing and Terminology
Problem: The `category` column had inconsistent casing (e.g., `Electronics` vs `electronics`) and inconsistent terminology (e.g., `Grocery` vs `Groceries`). This would cause analytical queries grouping by category to split the same category into multiple distinct rows.
Resolution: I applied string formatting during the load process into `dim_product`. I used a `LOWER()` or title-case function equivalent and mapped terms to a standard (e.g., converting all variations to Title Case "Electronics" and strictly using "Groceries").

### Decision 3 — Generating Surrogate Keys
Problem: The raw transaction file used text-based combinations (like store names) which are inefficient for joining large datasets in a data warehouse Fact table.
Resolution: I created auto-incrementing integer Surrogate Keys (e.g., `store_id`, `product_id`, `date_id`) for all dimension tables. The Fact table exclusively uses these integers to join back to the dimensions, massively improving query performance.
