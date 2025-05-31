import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.impute import SimpleImputer

# Load dataset
df = pd.read_csv("train.csv")  # Ensure train.csv is in the same folder

# ----- 1. Data Cleaning -----
# Fill missing Age with median
df["Age"] = SimpleImputer(strategy="median").fit_transform(df[["Age"]])

# Fill missing Embarked with most frequent value
df["Embarked"] = SimpleImputer(strategy="most_frequent").fit_transform(df[["Embarked"]])

# Drop Cabin (too many missing values)
df.drop(columns=["Cabin"], inplace=True)

# ----- 2. Noisy Data Handling (Binning) -----
# Binning Age into categories
df["AgeGroup"] = pd.cut(
    df["Age"],
    bins=[0, 12, 18, 35, 60, 100],
    labels=["Child", "Teen", "Young Adult", "Adult", "Senior"]
)

# ----- 3. Data Integration & Correlation -----
correlation = df[["Survived", "Age", "Fare"]].corr()
print("Correlation Matrix:\n", correlation)

# Visualize correlation
sns.heatmap(correlation, annot=True, cmap="coolwarm")
plt.title("Feature Correlation")
plt.show()

# Save cleaned data
df.to_csv("titanic_cleaned.csv", index=False)
