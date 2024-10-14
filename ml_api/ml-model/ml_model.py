# from google.colab import drive
# IMPORTANT: RUN THIS CELL IN ORDER TO IMPORT YOUR KAGGLE DATA SOURCES
# TO THE CORRECT LOCATION (/kaggle/input) IN YOUR NOTEBOOK,
# THEN FEEL FREE TO DELETE THIS CELL.
# NOTE: THIS NOTEBOOK ENVIRONMENT DIFFERS FROM KAGGLE'S PYTHON
# ENVIRONMENT SO THERE MAY BE MISSING LIBRARIES USED BY YOUR
# NOTEBOOK.

import os
import sys
from tempfile import NamedTemporaryFile
from urllib.request import urlopen
from urllib.parse import unquote, urlparse
from urllib.error import HTTPError
from zipfile import ZipFile
import tarfile
import shutil

CHUNK_SIZE = 40960
DATA_SOURCE_MAPPING = 'sentiment-analysis-for-mental-health:https%3A%2F%2Fstorage.googleapis.com%2Fkaggle-data-sets%2F5338273%2F8870083%2Fbundle%2Farchive.zip%3FX-Goog-Algorithm%3DGOOG4-RSA-SHA256%26X-Goog-Credential%3Dgcp-kaggle-com%2540kaggle-161607.iam.gserviceaccount.com%252F20240903%252Fauto%252Fstorage%252Fgoog4_request%26X-Goog-Date%3D20240903T112019Z%26X-Goog-Expires%3D259200%26X-Goog-SignedHeaders%3Dhost%26X-Goog-Signature%3D52413e37dc3314cde0b3b9757b829af0985cd44b1bd4b0470eba75d1599167df6c5d57cbdad09e1a749249682ee1bf973ab2826c57fa193c81dae4d15d54931f933217cf8e12023aabb1be63189fe75db1a2d5e737ff3902bdc634eadc9b260a17025e2bf74e9d693f20d5a9d06d29b31cfea83b8a9481df924c0161b62403e9822b547acb7cdefbd7c7d1216436f8d97eaca4f47cb4d5a89c84ca3339071bc885326c3be11c4605e6fe6c7561592bb63dd245c361a91840a325d92794edf01e99d7f9fda5401f0cde8bb536be74a74466a7d2da180909dc7efa040397f381bc6b67c382d5ddeeab6e57d43406c249ee8c70d4520afd9d42a425f6b47780b87b'

KAGGLE_INPUT_PATH='/kaggle/input'
KAGGLE_WORKING_PATH='/kaggle/working'
KAGGLE_SYMLINK='kaggle'

# !umount /kaggle/input/ 2> /dev/null
shutil.rmtree('/kaggle/input', ignore_errors=True)
os.makedirs(KAGGLE_INPUT_PATH, 0o777, exist_ok=True)
os.makedirs(KAGGLE_WORKING_PATH, 0o777, exist_ok=True)

try:
  os.symlink(KAGGLE_INPUT_PATH, os.path.join("..", 'input'), target_is_directory=True)
except FileExistsError:
  pass
try:
  os.symlink(KAGGLE_WORKING_PATH, os.path.join("..", 'working'), target_is_directory=True)
except FileExistsError:
  pass

for data_source_mapping in DATA_SOURCE_MAPPING.split(','):
    directory, download_url_encoded = data_source_mapping.split(':')
    download_url = unquote(download_url_encoded)
    filename = urlparse(download_url).path
    destination_path = os.path.join(KAGGLE_INPUT_PATH, directory)
    try:
        with urlopen(download_url) as fileres, NamedTemporaryFile() as tfile:
            total_length = fileres.headers['content-length']
            print(f'Downloading {directory}, {total_length} bytes compressed')
            dl = 0
            data = fileres.read(CHUNK_SIZE)
            while len(data) > 0:
                dl += len(data)
                tfile.write(data)
                done = int(50 * dl / int(total_length))
                sys.stdout.write(f"\r[{'=' * done}{' ' * (50-done)}] {dl} bytes downloaded")
                sys.stdout.flush()
                data = fileres.read(CHUNK_SIZE)
            if filename.endswith('.zip'):
              with ZipFile(tfile) as zfile:
                zfile.extractall(destination_path)
            else:
              with tarfile.open(tfile.name) as tarfile:
                tarfile.extractall(destination_path)
            print(f'\nDownloaded and uncompressed: {directory}')
    except HTTPError as e:
        print(f'Failed to load (likely expired) {download_url} to path {destination_path}')
        continue
    except OSError as e:
        print(f'Failed to load {download_url} to path {destination_path}')
        continue

print('Data source import complete.')


# drive.mount('/content/drive')


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


data = pd.read_csv('Combined Data.csv')
# data  = pd.read_csv('/kaggle/input/sentiment-analysis-for-mental-health/Combined Data.csv',index_col=0)
# data  = pd.read_excel(io='Combined Data.xlsx',index_col=0, engine='openpyxl')


data.head()


# data_cleaned = data.drop(columns=['Unnamed: 0'])
data_cleaned = data


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


y_pred = logistic_model.predict(X_test)


print("Classification Report:\n", classification_report(y_test, y_pred))




print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

import joblib
joblib.dump(logistic_model, 'logistic_model.pkl')
