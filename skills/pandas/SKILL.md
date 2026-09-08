---
name: pandas
description: Pandas data analysis skill for Python, optimized for telecommunications, drive test, KPI/QoS, CSV/Excel processing, data cleaning, aggregation, time-series preparation, geospatial integration, Polars/Dask interoperability, and production-grade data workflows.
---

# Pandas Data Analysis Skill

## 1. Purpose

Use Pandas for structured data analysis and transformation in Python.

This skill is optimized for professional workflows involving:

- CSV files
- Excel files
- Parquet files
- SQL datasets
- Telecommunications data
- Drive Test data
- Network KPI
- QoS analysis
- RSRP / RSRQ / SINR
- RSCP / EcNo / RxLevel / RxQual
- Throughput
- Cell ID
- PCI
- EARFCN
- Frequency
- Operator analysis
- Time-series preparation
- Data cleaning
- Data aggregation
- Data validation
- Reporting datasets

Prefer Pandas for normal-sized datasets.

Use Polars or Dask when the dataset is too large for efficient Pandas processing.

---

# 2. Core Principles

## 2.1 Inspect before modifying

Never blindly modify a dataset.

First inspect:

```python
df.shape
df.head()
df.tail()
df.columns
df.dtypes
df.info()
df.isna().sum()
df.nunique()
```

For larger datasets:

```python
df.memory_usage(deep=True).sum()
```

Always understand:

1. Number of rows
2. Number of columns
3. Data types
4. Missing values
5. Duplicate records
6. Unique identifiers
7. Date/time fields
8. Numeric columns
9. Categorical columns
10. Potential data-quality problems

---

# 3. Loading Data

## 3.1 CSV

Basic:

```python
import pandas as pd

df = pd.read_csv("data.csv")
```

Semicolon delimiter:

```python
df = pd.read_csv("data.csv", sep=";")
```

Explicit encoding:

```python
df = pd.read_csv(
    "data.csv",
    sep=";",
    encoding="utf-8"
)
```

For unknown/bad encoding, inspect the file before choosing an encoding.

---

## 3.2 Excel

```python
df = pd.read_excel("data.xlsx")
```

Specific sheet:

```python
df = pd.read_excel(
    "data.xlsx",
    sheet_name="Sheet1"
)
```

Multiple sheets:

```python
sheets = pd.read_excel(
    "data.xlsx",
    sheet_name=None
)
```

---

## 3.3 Parquet

Prefer Parquet for repeated analytical workflows when appropriate:

```python
df = pd.read_parquet("data.parquet")
```

Parquet is usually preferable to CSV for preserving types and efficient analytical storage.

---

## 3.4 SQL

Use database connectors rather than loading entire databases unnecessarily.

Example:

```python
query = """
SELECT *
FROM raw_scanner
"""

df = pd.read_sql(query, connection)
```

For large tables, query only required columns and rows.

---

# 4. Data Inspection

Always start with:

```python
print(df.shape)
print(df.columns.tolist())
print(df.dtypes)
```

Then:

```python
df.info()
```

Statistical overview:

```python
df.describe()
```

Including categorical columns:

```python
df.describe(include="all")
```

Unique values:

```python
df.nunique()
```

Value distribution:

```python
df["Operator"].value_counts(dropna=False)
```

---

# 5. Column Naming

Prefer consistent snake_case internally:

```python
df = df.rename(columns={
    "Full Date Time": "full_datetime",
    "Cell Id": "cell_id",
    "PCI LTE": "pci_lte",
    "DL EARFCN": "dl_earfcn",
    "WB RSRP": "rsrp",
    "WB RSRQ": "rsrq"
})
```

Avoid unnecessarily renaming source columns if the original names are required for reporting.

When creating analytical pipelines, preserve a mapping between source and analytical names.

---

# 6. Data Types

Inspect:

```python
df.dtypes
```

Convert numeric:

```python
df["rsrp"] = pd.to_numeric(
    df["rsrp"],
    errors="coerce"
)
```

Convert categorical:

```python
df["operator"] = df["operator"].astype("category")
```

Convert string:

```python
df["cell_id"] = df["cell_id"].astype("string")
```

Never silently convert identifiers such as Cell ID, PCI, EARFCN, or codes into inappropriate floating-point types.

Identifiers are not necessarily measurements.

---

# 7. Missing Values

Inspect:

```python
df.isna().sum()
```

Percentage:

```python
missing_pct = (
    df.isna().mean() * 100
).sort_values(ascending=False)
```

Drop rows only when justified:

```python
df = df.dropna(subset=["cell_id"])
```

Fill numeric values only when domain logic supports it:

```python
df["rsrp"] = df["rsrp"].fillna(df["rsrp"].median())
```

Do NOT blindly replace every missing value with zero.

For telecom measurements:

```text
missing RSRP != RSRP of 0
missing throughput != throughput of 0
missing SINR != SINR of 0
```

Preserve the distinction.

---

# 8. Duplicate Records

Check:

```python
df.duplicated().sum()
```

View duplicates:

```python
df[df.duplicated(keep=False)]
```

Remove exact duplicates:

```python
df = df.drop_duplicates()
```

For domain-specific duplicates:

```python
df = df.drop_duplicates(
    subset=[
        "full_datetime",
        "latitude",
        "longitude",
        "cell_id"
    ]
)
```

Do not remove duplicates without understanding whether repeated measurements are legitimate.

---

# 9. String Cleaning

Normalize whitespace:

```python
df["operator"] = (
    df["operator"]
    .astype("string")
    .str.strip()
)
```

Normalize case:

```python
df["operator"] = df["operator"].str.upper()
```

Replace empty strings:

```python
df["operator"] = df["operator"].replace(
    r"^\s*$",
    pd.NA,
    regex=True
)
```

---

# 10. Date and Time

Convert:

```python
df["full_datetime"] = pd.to_datetime(
    df["full_datetime"],
    errors="coerce"
)
```

Extract components:

```python
df["date"] = df["full_datetime"].dt.date
df["hour"] = df["full_datetime"].dt.hour
df["day"] = df["full_datetime"].dt.day
df["month"] = df["full_datetime"].dt.month
df["weekday"] = df["full_datetime"].dt.day_name()
```

Sort:

```python
df = df.sort_values("full_datetime")
```

For time-series operations, set the datetime index when appropriate:

```python
df = df.set_index("full_datetime")
```

---

# 11. Telecom Data Validation

Before analysis, validate measurement ranges.

Examples:

### RSRP

Typical LTE RSRP values are approximately:

```text
-140 dBm to -44 dBm
```

Example validation:

```python
df["rsrp_valid"] = df["rsrp"].between(-140, -44)
```

### RSRQ

Example:

```python
df["rsrq_valid"] = df["rsrq"].between(-30, 0)
```

### SINR

Do not blindly impose a universal physical range if the source equipment has its own specification.

Instead inspect:

```python
df["sinr"].describe()
```

Then detect suspicious values:

```python
df[
    (df["sinr"] < lower_bound) |
    (df["sinr"] > upper_bound)
]
```

Use source-device documentation whenever exact measurement limits matter.

---

# 12. Telecom KPI Categorization

Never hard-code business thresholds without confirming the applicable specification.

Example pattern:

```python
def classify_rsrp(value):
    if pd.isna(value):
        return "Unknown"

    if value >= -85:
        return "Excellent"
    elif value >= -95:
        return "Good"
    elif value >= -105:
        return "Fair"
    else:
        return "Poor"
```

Apply:

```python
df["rsrp_category"] = df["rsrp"].apply(
    classify_rsrp
)
```

For vectorized operations, prefer `numpy.select`:

```python
import numpy as np

conditions = [
    df["rsrp"] >= -85,
    df["rsrp"] >= -95,
    df["rsrp"] >= -105
]

choices = [
    "Excellent",
    "Good",
    "Fair"
]

df["rsrp_category"] = np.select(
    conditions,
    choices,
    default="Poor"
)
```

Thresholds must come from the relevant operator, regulator, project, or measurement specification.

---

# 13. Operator Mapping

Use explicit mapping dictionaries.

Example:

```python
operator_map = {
    1: "Indosat",
    21: "Indosat",
    89: "Indosat",
    9: "XL Smart",
    28: "XL Smart",
    10: "Telkomsel",
    20: "Telkomsel",
    8: "XL Smart",
    11: "XL Smart"
}

df["operator_name"] = df["mnc"].map(operator_map)
```

If mappings are project-specific, keep them in configuration rather than scattering them throughout code.

---

# 14. Frequency Analysis

For frequency:

```python
df["frequency"].value_counts()
```

Cross-tabulation:

```python
pd.crosstab(
    df["operator_name"],
    df["frequency"]
)
```

Operator + technology:

```python
pd.crosstab(
    df["operator_name"],
    df["technology"]
)
```

Operator + band:

```python
pd.crosstab(
    df["operator_name"],
    df["band_number"]
)
```

---

# 15. GroupBy

Basic:

```python
df.groupby("operator_name")["rsrp"].mean()
```

Multiple metrics:

```python
summary = (
    df.groupby("operator_name")
      .agg(
          avg_rsrp=("rsrp", "mean"),
          median_rsrp=("rsrp", "median"),
          avg_rsrq=("rsrq", "mean"),
          avg_throughput=("throughput", "mean"),
          samples=("rsrp", "count")
      )
      .reset_index()
)
```

Multiple dimensions:

```python
summary = (
    df.groupby(
        ["operator_name", "band_number"]
    )
    .agg(
        avg_rsrp=("rsrp", "mean"),
        avg_rsrq=("rsrq", "mean"),
        avg_throughput=("throughput", "mean")
    )
    .reset_index()
)
```

---

# 16. Merge / Join

Always inspect key uniqueness before merging.

Basic:

```python
result = df1.merge(
    df2,
    on="cell_id",
    how="left"
)
```

Multiple keys:

```python
result = df1.merge(
    df2,
    on=["cell_id", "date"],
    how="left"
)
```

Validate expected relationship:

```python
result = df1.merge(
    df2,
    on="cell_id",
    how="left",
    validate="many_to_one"
)
```

Use `validate` whenever practical.

This helps detect accidental row multiplication.

---

# 17. Concatenation

Use `pd.concat`.

```python
combined = pd.concat(
    [df1, df2, df3],
    ignore_index=True
)
```

Never use deprecated:

```python
df.append(...)
```

---

# 18. Pivot Tables

```python
pivot = pd.pivot_table(
    df,
    index="operator_name",
    columns="band_number",
    values="rsrp",
    aggfunc="mean"
)
```

Useful for:

- operator comparison
- frequency comparison
- KPI matrices
- daily reports

---

# 19. Filtering

Use boolean masks:

```python
df[df["rsrp"] < -105]
```

Multiple conditions:

```python
df[
    (df["rsrp"] < -105) &
    (df["rsrq"] < -15)
]
```

Use `.loc` when modifying:

```python
df.loc[
    df["rsrp"] < -105,
    "coverage_status"
] = "Poor"
```

---

# 20. Telecom Bad Spot Detection

Example:

```python
bad_spot = df[
    (df["rsrp"] < -105) &
    (df["rsrq"] < -15)
]
```

Add throughput:

```python
bad_spot = df[
    (df["rsrp"] < -105) &
    (df["rsrq"] < -15) &
    (df["throughput"] < 1000)
]
```

Thresholds are examples only.

Use project-specific KPI criteria in production.

---

# 21. Throughput Analysis

Summary:

```python
df["throughput"].describe()
```

Categorization:

```python
conditions = [
    df["throughput"] >= 1000,
    df["throughput"] < 1000
]

choices = [
    "Baik Sekali",
    "Kurang"
]

df["throughput_category"] = np.select(
    conditions,
    choices,
    default="Unknown"
)
```

Distribution:

```python
df["throughput_category"].value_counts()
```

---

# 22. Time-Series Resampling

Hourly KPI:

```python
hourly = (
    df.set_index("full_datetime")
      .resample("1h")
      .agg(
          avg_rsrp=("rsrp", "mean"),
          avg_rsrq=("rsrq", "mean"),
          avg_throughput=("throughput", "mean"),
          samples=("rsrp", "count")
      )
)
```

Daily:

```python
daily = (
    df.set_index("full_datetime")
      .resample("1D")
      .agg(
          avg_rsrp=("rsrp", "mean"),
          avg_throughput=("throughput", "mean")
      )
)
```

---

# 23. Rolling Analysis

Rolling average:

```python
df["rsrp_rolling"] = (
    df["rsrp"]
    .rolling(window=10)
    .mean()
)
```

Time-based rolling:

```python
df = df.set_index("full_datetime")

df["throughput_rolling"] = (
    df["throughput"]
    .rolling("30min")
    .mean()
)
```

Always sort the datetime index first.

---

# 24. Performance Optimization

First measure:

```python
df.memory_usage(deep=True)
```

Optimize strings:

```python
df["operator"] = df["operator"].astype("category")
```

Select required columns:

```python
df = df[
    [
        "full_datetime",
        "cell_id",
        "rsrp",
        "rsrq",
        "sinr",
        "throughput"
    ]
]
```

Use explicit dtypes when reading large files:

```python
df = pd.read_csv(
    "data.csv",
    dtype={
        "cell_id": "string",
        "pci": "Int64",
        "earfcn": "Int64"
    }
)
```

Read only required columns:

```python
df = pd.read_csv(
    "data.csv",
    usecols=[
        "Full Date Time",
        "Cell Id",
        "WB RSRP",
        "WB RSRQ"
    ]
)
```

---

# 25. When to Use Polars

Use Pandas when:

- dataset fits comfortably in memory
- transformations are moderate
- ecosystem compatibility matters
- working with GeoPandas
- rapid exploratory analysis is required

Consider Polars when:

- dataset is large
- transformations are heavily tabular
- performance is important
- lazy execution is useful

Do not rewrite working Pandas code into Polars without a performance or scalability reason.

---

# 26. When to Use Dask

Use Dask when:

- data is too large for comfortable Pandas processing
- many files need parallel processing
- computation can be partitioned
- distributed or out-of-core processing is useful

Typical workflow:

```text
Many CSV files
      ↓
Dask
      ↓
Filtering
      ↓
Aggregation
      ↓
Parquet
      ↓
Pandas
      ↓
Final Analysis
```

Avoid using Dask merely because a dataset is large in row count.

Measure memory and processing time first.

---

# 27. Pandas + GeoPandas

For geographic telecom data:

```python
import geopandas as gpd

gdf = gpd.GeoDataFrame(
    df,
    geometry=gpd.points_from_xy(
        df["longitude"],
        df["latitude"]
    ),
    crs="EPSG:4326"
)
```

Typical workflow:

```text
Pandas
 ↓
Clean Data
 ↓
Validate Coordinates
 ↓
GeoPandas
 ↓
Spatial Analysis
 ↓
Coverage Map
```

Do not use Pandas-only logic for spatial operations when GeoPandas provides a more appropriate operation.

---

# 28. Pandas + NetworkX

For network topology:

```python
import networkx as nx

G = nx.from_pandas_edgelist(
    df,
    source="source_cell",
    target="target_cell",
    edge_attr=True
)
```

Typical telecom workflow:

```text
Cell Table
    ↓
Neighbor Table
    ↓
Pandas
    ↓
NetworkX
    ↓
Graph
    ↓
Topology Analysis
```

Potential applications:

- neighbor relationships
- handover relationships
- cell connectivity
- network topology
- graph centrality
- critical nodes

---

# 29. Data Quality Framework

For production pipelines, create explicit validation checks.

Example:

```python
quality_report = {
    "rows": len(df),
    "columns": len(df.columns),
    "duplicate_rows": int(df.duplicated().sum()),
    "missing_cells": int(df["cell_id"].isna().sum()),
    "missing_rsrp": int(df["rsrp"].isna().sum()),
    "missing_rsrq": int(df["rsrq"].isna().sum()),
}
```

Validation should include:

```text
Schema
 ↓
Data Types
 ↓
Missing Values
 ↓
Duplicates
 ↓
Range Checks
 ↓
Referential Integrity
 ↓
Temporal Consistency
 ↓
Geographic Validity
```

---

# 30. Geographic Validation

Latitude:

```python
df["latitude_valid"] = df["latitude"].between(-90, 90)
```

Longitude:

```python
df["longitude_valid"] = df["longitude"].between(-180, 180)
```

Invalid coordinates:

```python
invalid_geo = df[
    ~df["latitude_valid"] |
    ~df["longitude_valid"]
]
```

Do not silently drop invalid coordinates.

Create a validation report first.

---

# 31. Output to Excel

Basic:

```python
df.to_excel(
    "output.xlsx",
    index=False
)
```

Multiple sheets:

```python
with pd.ExcelWriter(
    "telecom_report.xlsx",
    engine="openpyxl"
) as writer:

    summary.to_excel(
        writer,
        sheet_name="Summary",
        index=False
    )

    bad_spot.to_excel(
        writer,
        sheet_name="Bad Spot",
        index=False
    )
```

---

# 32. Output to CSV

```python
df.to_csv(
    "output.csv",
    index=False
)
```

Semicolon:

```python
df.to_csv(
    "output.csv",
    sep=";",
    index=False
)
```

---

# 33. Output to Parquet

```python
df.to_parquet(
    "output.parquet",
    index=False
)
```

Prefer Parquet for intermediate analytical datasets when appropriate.

---

# 34. Reproducible Analysis

A professional analysis should follow:

```text
1. Load
2. Inspect
3. Validate
4. Clean
5. Transform
6. Analyze
7. Visualize
8. Export
```

Do not mix all operations into one giant block of code.

Prefer modular functions:

```python
def load_data(path):
    ...

def clean_data(df):
    ...

def validate_data(df):
    ...

def analyze_kpi(df):
    ...

def export_report(df, path):
    ...
```

---

# 35. Error Handling

Never hide data errors with broad exception handling.

Avoid:

```python
try:
    ...
except:
    pass
```

Prefer:

```python
try:
    df = pd.read_csv(path)
except FileNotFoundError:
    raise FileNotFoundError(
        f"File tidak ditemukan: {path}"
    )
```

For conversion errors, use explicit handling:

```python
df["rsrp"] = pd.to_numeric(
    df["rsrp"],
    errors="coerce"
)
```

Then inspect the resulting missing values.

---

# 36. Avoid Common Pandas Mistakes

Avoid chained assignment:

```python
df[df["rsrp"] < -105]["status"] = "Poor"
```

Prefer:

```python
df.loc[
    df["rsrp"] < -105,
    "status"
] = "Poor"
```

Avoid unnecessary loops:

```python
for i in range(len(df)):
    ...
```

Prefer vectorized operations.

Avoid repeated DataFrame concatenation inside loops.

Prefer:

```python
frames = []

for file in files:
    frames.append(pd.read_csv(file))

df = pd.concat(
    frames,
    ignore_index=True
)
```

---

# 37. Large Multi-File Telecom Workflow

For many CSV files:

```text
                 RAW DATA
                    │
       ┌────────────┼────────────┐
       ↓            ↓            ↓
     CSV 1        CSV 2        CSV N
       │            │            │
       └────────────┼────────────┘
                    ↓
              Schema Check
                    ↓
              Data Cleaning
                    ↓
               Concatenate
                    ↓
              Validation
                    ↓
             KPI Processing
                    ↓
       ┌────────────┼────────────┐
       ↓            ↓            ↓
    Statistics   GeoPandas   Time Series
       │            │            │
       └────────────┼────────────┘
                    ↓
                 Reports
```

---

# 38. Recommended Telecom Data Schema

For drive-test datasets, common analytical fields include:

```text
full_datetime
date
time
collection
longitude
latitude
operator
mcc
mnc
cell_id
pci
dl_earfcn
frequency
frequency_number
dl_bandwidth
technology_band
band_number
technology
rsrp
rsrq
sinr
throughput_dl
throughput_ul
```

Do not assume every dataset contains all fields.

Inspect the actual schema first.

---

# 39. Telecom Analysis Template

Recommended pattern:

```python
import pandas as pd
import numpy as np

# ==========================================
# 1. LOAD
# ==========================================

df = pd.read_csv(
    "drive_test.csv",
    sep=";"
)

# ==========================================
# 2. INSPECT
# ==========================================

print(df.shape)
print(df.dtypes)
print(df.isna().sum())

# ==========================================
# 3. CLEAN
# ==========================================

df.columns = (
    df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

# ==========================================
# 4. CONVERT TYPES
# ==========================================

df["full_datetime"] = pd.to_datetime(
    df["full_datetime"],
    errors="coerce"
)

for column in ["rsrp", "rsrq", "sinr"]:
    if column in df.columns:
        df[column] = pd.to_numeric(
            df[column],
            errors="coerce"
        )

# ==========================================
# 5. VALIDATE
# ==========================================

print("Duplicates:", df.duplicated().sum())

# ==========================================
# 6. ANALYZE
# ==========================================

if "operator" in df.columns:

    summary = (
        df.groupby("operator")
        .agg(
            samples=("operator", "size"),
            avg_rsrp=("rsrp", "mean"),
            avg_rsrq=("rsrq", "mean"),
            avg_sinr=("sinr", "mean")
        )
        .reset_index()
    )

# ==========================================
# 7. EXPORT
# ==========================================

summary.to_excel(
    "telecom_summary.xlsx",
    index=False
)
```

---

# 40. Integration With Other Skills

Use the following decision framework.

## EDA

```text
Pandas → Exploratory Data Analysis
```

Use EDA skill for profiling and exploratory reasoning.

## Statistical Analysis

```text
Pandas → Statistical Analysis
```

Use Pandas for preparation and aggregation.

Use statistical tools for hypothesis testing, regression, confidence intervals, etc.

## Visualization

```text
Pandas → Matplotlib / Seaborn
```

Prepare data in Pandas before visualization.

## GeoPandas

```text
Pandas → GeoPandas
```

Use GeoPandas for spatial operations.

## Time Series

```text
Pandas → Time Series / Aeon
```

Use Pandas for preparation, resampling, feature creation, and cleaning.

Use dedicated time-series tools for advanced forecasting/classification.

## NetworkX

```text
Pandas → NetworkX
```

Use Pandas to prepare edge/node tables.

Use NetworkX for graph analysis.

## Polars

```text
Pandas ↔ Polars
```

Use Polars for large/high-performance tabular workloads.

## Dask

```text
Dask → Pandas
```

Use Dask for large-scale preprocessing.

Reduce the dataset to a manageable analytical result before switching to Pandas.

---

# 41. Agent Behavior Rules

When asked to analyze a dataset:

1. Inspect the file.
2. Identify schema.
3. Identify data types.
4. Check missing values.
5. Check duplicates.
6. Check invalid values.
7. Identify identifiers.
8. Identify measurements.
9. Identify temporal fields.
10. Identify geographic fields.
11. Clean only where justified.
12. Preserve original data when possible.
13. Explain transformations.
14. Perform analysis.
15. Validate results.
16. Export useful outputs.

Never assume:

- column names
- delimiter
- encoding
- KPI thresholds
- operator mappings
- measurement units
- coordinate system
- time zone
- business rules

Ask or inspect when these affect correctness.

---

# 42. Telecom-Specific Reasoning Rules

Distinguish between:

```text
Identifier
Measurement
Category
Timestamp
Coordinate
KPI
Business Classification
```

Examples:

```text
Cell ID       → Identifier
PCI           → Identifier
EARFCN        → Identifier/configuration
RSRP          → Measurement
RSRQ          → Measurement
SINR          → Measurement
Throughput    → Measurement
Operator      → Category
Technology    → Category
Timestamp     → Temporal
Latitude      → Coordinate
Longitude     → Coordinate
QoS Score     → KPI/business metric
```

Do not calculate averages for identifiers.

Bad:

```python
df["cell_id"].mean()
```

Good:

```python
df["cell_id"].nunique()
```

---

# 43. Final Quality Checklist

Before delivering analysis, verify:

```text
[ ] Dataset loaded successfully
[ ] Schema inspected
[ ] Data types validated
[ ] Missing values checked
[ ] Duplicate records checked
[ ] Invalid numeric values checked
[ ] Coordinates validated
[ ] Date/time parsed
[ ] Units confirmed
[ ] KPI thresholds confirmed
[ ] Aggregations validated
[ ] Merge keys validated
[ ] No accidental row multiplication
[ ] Results statistically sensible
[ ] Output files created successfully
[ ] Source data preserved
[ ] Assumptions documented
```

---

# 44. Preferred Output Style

When producing analysis for a user, report:

## Dataset

```text
Rows:
Columns:
Date range:
Operators:
Technologies:
```

## Data Quality

```text
Missing:
Duplicates:
Invalid values:
Invalid coordinates:
```

## KPI Summary

```text
RSRP:
RSRQ:
SINR:
Throughput:
```

## Findings

Explain the most important patterns.

## Recommendations

Separate:

```text
Observed fact
```

from:

```text
Interpretation
```

and:

```text
Recommendation
```

Never present an assumption as a measured fact.

---

# 45. Core Principle

Pandas is not only a CSV manipulation tool.

For this environment, Pandas is the central data layer connecting:

```text
CSV
Excel
SQL
Parquet
    │
    ▼
  PANDAS
    │
    ├── EDA
    ├── Statistics
    ├── Visualization
    ├── Time Series
    ├── GeoPandas
    ├── NetworkX
    ├── Polars
    └── Dask
    │
    ▼
Telecom Analysis
    │
    ├── Drive Test
    ├── Coverage
    ├── Capacity
    ├── QoS
    ├── KPI
    ├── Frequency
    ├── Cell Analysis
    └── Operator Comparison
    │
    ▼
Excel / CSV / Parquet / Dashboard / Report
```

The agent should prefer clear, reproducible, vectorized Pandas workflows and switch to specialized tools when the task requires geospatial analysis, graph analysis, large-scale processing, advanced statistics, or time-series modeling.