import pandas as pd
import os

# Find the dataset path
dataset_path = os.path.join('src', 'data', 'dataset', 'updated_e_waste_recycling_dataset.xlsx')

# Load the dataset
try:
    df = pd.read_excel(dataset_path)
    print(f"Successfully loaded dataset from {dataset_path}")
    print(f"Dataset shape: {df.shape}")
    
    # Display information about the dataset
    print("\nDataset info:")
    print(df.info())
    
    # Display summary statistics
    print("\nSummary statistics:")
    print(df.describe())
    
    # Display column names
    print("\nColumn names:")
    print(df.columns.tolist())
    
    # Check for missing values
    print("\nMissing values:")
    print(df.isnull().sum())
    
    # Display a few sample rows
    print("\nSample data:")
    print(df.head())
    
    # Check categorical variables
    categorical_columns = df.select_dtypes(include=['object']).columns
    print("\nCategorical variables:")
    for col in categorical_columns:
        print(f"\n{col} - unique values:")
        print(df[col].unique())
        print(f"Value counts:")
        print(df[col].value_counts())
    
except Exception as e:
    print(f"Error loading dataset: {str(e)}") 