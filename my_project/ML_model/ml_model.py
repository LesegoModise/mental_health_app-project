import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import precision_score, recall_score, f1_score



# data = pd.read_csv('/content/drive/MyDrive/combined/Combined Data.csv')
data  = pd.read_csv('combined_data.csv')

data.head()

# data_cleaned = data.drop(columns=['Unnamed: 0'])
data_cleaned = data
#print
print(data_cleaned.head())

tfidf_vectorizer = TfidfVectorizer(stop_words='english' , max_features=5000)
# Convert the 'statement' column to string type and replace NaN values with empty strings
x = tfidf_vectorizer.fit_transform(data_cleaned['statement'].astype(str).fillna(''))
y = data_cleaned['status']

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42) # Changed X to x




# View training data ratio
y_train.value_counts()/len(y_train)

# View train test Split count
print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)


# Oversampling
from imblearn.over_sampling import RandomOverSampler
ros = RandomOverSampler(random_state=42)
X_resampled, y_resampled = ros.fit_resample(X_train, y_train)

# View training data ratio (class balancing)
y_resampled.value_counts()/len(y_resampled)

# !pip install scikit-learn # install the scikit-learn library that contains the LogisticRegression class
from sklearn.linear_model import LogisticRegression # import the LogisticRegression class

logistic_model = LogisticRegression(max_iter=300)  # Increase max_iter if needed
logistic_model.fit(X_resampled, y_resampled)

#
y_pred = logistic_model.predict(X_test)


#
print("Classification Report:\n", classification_report(y_test, y_pred))