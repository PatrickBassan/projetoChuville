# -*- coding: utf-8 -*-
"""Chuville

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1HWzhO6v3zTsvipoEMOxUP3Jpa4biLQcM
"""

# Comparação de Modelos
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.cluster import KMeans
from sklearn.neural_network import MLPClassifier
# Carregando dataset
dataset = pd.read_csv("chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])
dataset.head()

X = dataset.iloc[:, 1:-1].values
Y = dataset.iloc[:, 3].values

from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X)

X = scaler.transform(X)

# Preparando modelos
models = []
models.append(('LR', LogisticRegression()))
models.append(('LDA', LinearDiscriminantAnalysis()))
models.append(('KNN', KNeighborsClassifier()))
models.append(('KM', KMeans()))
models.append(('MLPC', MLPClassifier()))
models.append(('CART', DecisionTreeClassifier()))
models.append(('NB', GaussianNB()))
models.append(('SVM', SVC()))
# Avaliando cada modelo
results = []
names = []
scoring = 'accuracy'
for name, model in models:
	kfold = model_selection.KFold(n_splits=10)
	cv_results = model_selection.cross_val_score(model, X, Y, cv=kfold, scoring=scoring)
	results.append(cv_results)
	names.append(name)
	msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
	print(msg)
# Gráfico
fig = plt.figure()
fig.suptitle('Algorithm Comparison')
ax = fig.add_subplot(111)
plt.boxplot(results)
ax.set_xticklabels(names)
plt.show()

from imblearn.over_sampling import SMOTE
import numpy as np
import pandas as pd

# Carregando dataset
df = pd.read_csv("NAN chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])

# Preenchendo features vazias usando median
df['Chuva'] = df['Chuva'].fillna(df['Chuva'].median())

# Separando features e classes
X_train = df.drop('Alagou',axis=1)
X_train = df.drop('Data',axis=1)
y = df['Alagou']

# Visualizando a quantidade de dados por classe antes da execução do SMOTE
np.bincount(y)

# Oversampling do dataset
smt = SMOTE()
X_smt, y_smt = smt.fit_resample(X_train, y)

# Visualizando a quantidade de dados por classe após a execução do SMOTE
np.bincount(y_smt)

# Comparação de Modelos
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.cluster import KMeans
from sklearn.neural_network import MLPClassifier

# Pré-processamento dos dados
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X_smt)

X = scaler.transform(X_smt)

# Preparando modelos
models = []
models.append(('LR', LogisticRegression()))
models.append(('LDA', LinearDiscriminantAnalysis()))
models.append(('KNN', KNeighborsClassifier()))
models.append(('KM', KMeans()))
models.append(('MLPC', MLPClassifier()))
models.append(('CART', DecisionTreeClassifier()))
models.append(('NB', GaussianNB()))
models.append(('SVM', SVC()))

# Avaliando cada modelo
results = []
names = []
scoring = 'accuracy'
for name, model in models:
	kfold = model_selection.KFold(n_splits=10)
	cv_results = model_selection.cross_val_score(model, X_smt, y_smt, cv=kfold, scoring=scoring)
	results.append(cv_results)
	names.append(name)
	msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
	print(msg)

# Gráfico
fig = plt.figure()
fig.suptitle('Algorithm Comparison')
ax = fig.add_subplot(111)
plt.boxplot(results)
ax.set_xticklabels(names)
plt.show()

# KNN
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import MinMaxScaler

dataset = pd.read_csv("chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])
dataset.head()

X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, 3].values

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30)

from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X_train)

X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors=5)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)

from sklearn.metrics import classification_report, confusion_matrix
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

# KNN (New Dataset)

from imblearn.over_sampling import SMOTE
import numpy as np
import pandas as pd

# Carregando dataset
df = pd.read_csv("NAN chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])

# Preenchendo features vazias usando median
df['Chuva'] = df['Chuva'].fillna(df['Chuva'].median())

# Separando features e classes
X_train = df.drop('Alagou',axis=1)
X_train = df.drop('Data',axis=1)
y = df['Alagou']

# Visualizando a quantidade de dados por classe antes da execução do SMOTE
np.bincount(y)

# Oversampling do dataset
smt = SMOTE()
X_smt, y_smt = smt.fit_resample(X_train, y)

# Visualizando a quantidade de dados por classe após a execução do SMOTE
np.bincount(y_smt)

import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import MinMaxScaler

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X_smt, y_smt, test_size=0.30)

from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X_train)

X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors=5)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)

from sklearn.metrics import classification_report, confusion_matrix
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

# K-Means
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

dataset = pd.read_csv("chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])
dataset.head()

X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, 3].values

wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)
plt.plot(range(1, 11), wcss)
plt.title('Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
plt.show()

kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
pred_y = kmeans.fit_predict(X)
plt.scatter(X[:,0], X[:,1])
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c='red')
plt.show()

# K-Means (New Dataset)

from imblearn.over_sampling import SMOTE
import numpy as np
import pandas as pd

# Carregando dataset
df = pd.read_csv("NAN chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])

# Preenchendo features vazias usando median
df['Chuva'] = df['Chuva'].fillna(df['Chuva'].median())

# Separando features e classes
X_train = df.drop('Alagou',axis=1)
X_train = df.drop('Data',axis=1)
y = df['Alagou']

# Visualizando a quantidade de dados por classe antes da execução do SMOTE
np.bincount(y)

# Oversampling do dataset
smt = SMOTE()
X_smt, y_smt = smt.fit_resample(X_train, y)

from matplotlib import pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(X_smt)
    wcss.append(kmeans.inertia_)
plt.plot(range(1, 11), wcss)
plt.title('Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
plt.show()

kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
pred_y = kmeans.fit_predict(X_smt)
X = X_smt.iloc[:, 1:-1].values
plt.scatter(X[:,0], X[:,1])
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c='red')
plt.show()

# MLP Regressor
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
from sklearn import metrics

dataset = pd.read_csv("chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])
dataset.head()

x = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, 3].values

trainX, testX, trainY, testY = train_test_split(x, y, test_size = 0.3)

sc=StandardScaler()

scaler = sc.fit(trainX)
trainX_scaled = scaler.transform(trainX)
testX_scaled = scaler.transform(testX)

#Regressor
mlp_reg = MLPRegressor(hidden_layer_sizes=(150,100,50), max_iter = 1000,activation = 'relu', solver = 'adam')
mlp_reg.fit(trainX_scaled, trainY)

#Avaliando o modelo
y_pred = mlp_reg.predict(testX_scaled)
df_temp = pd.DataFrame({'Actual': testY, 'Predicted': y_pred})
df_temp.head()
df_temp = df_temp.head(30)
df_temp.plot(kind='bar',figsize=(10,6))
plt.grid(which='major', linestyle='-', linewidth='0.5', color='green')
plt.grid(which='minor', linestyle=':', linewidth='0.5', color='black')
plt.show()

print('Mean Absolute Error:', metrics.mean_absolute_error(testY, y_pred))
print('Mean Squared Error:', metrics.mean_squared_error(testY, y_pred))
print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(testY, y_pred)))

plt.plot(mlp_reg.loss_curve_)
plt.title("Loss Curve", fontsize=14)
plt.xlabel('Iterations')
plt.ylabel('Cost')
plt.show()

# MLP Regressor (New Dataset)

from imblearn.over_sampling import SMOTE
import numpy as np
import pandas as pd

# Carregando dataset
df = pd.read_csv("NAN chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])

# Preenchendo features vazias usando median
df['Chuva'] = df['Chuva'].fillna(df['Chuva'].median())

# Separando features e classes
X_train = df.drop('Alagou',axis=1)
X_train = df.drop('Data',axis=1)
y = df['Alagou']

# Visualizando a quantidade de dados por classe antes da execução do SMOTE
np.bincount(y)

# Oversampling do dataset
smt = SMOTE()
X_smt, y_smt = smt.fit_resample(X_train, y)

# Visualizando a quantidade de dados por classe após a execução do SMOTE
np.bincount(y_smt)

import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
from sklearn import metrics

trainX, testX, trainY, testY = train_test_split(X_smt, y_smt, test_size = 0.3)

sc=StandardScaler()

scaler = sc.fit(trainX)
trainX_scaled = scaler.transform(trainX)
testX_scaled = scaler.transform(testX)

#Regressor
mlp_reg = MLPRegressor(hidden_layer_sizes=(150,100,50), max_iter = 1000,activation = 'relu', solver = 'adam')
mlp_reg.fit(trainX_scaled, trainY)

#Avaliando o modelo
y_pred = mlp_reg.predict(testX_scaled)
df_temp = pd.DataFrame({'Actual': testY, 'Predicted': y_pred})
df_temp.head()
df_temp = df_temp.head(30)
df_temp.plot(kind='bar',figsize=(10,6))
plt.grid(which='major', linestyle='-', linewidth='0.5', color='green')
plt.grid(which='minor', linestyle=':', linewidth='0.5', color='black')
plt.show()

print('Mean Absolute Error:', metrics.mean_absolute_error(testY, y_pred))
print('Mean Squared Error:', metrics.mean_squared_error(testY, y_pred))
print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(testY, y_pred)))

plt.plot(mlp_reg.loss_curve_)
plt.title("Loss Curve", fontsize=14)
plt.xlabel('Iterations')
plt.ylabel('Cost')
plt.show()

# MLP Classifier
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import ConfusionMatrixDisplay
from sklearn.metrics import classification_report

dataset = pd.read_csv("chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])
dataset.head()

x = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, 3].values

trainX, testX, trainY, testY = train_test_split(x, y, test_size = 0.2)

sc=StandardScaler()

scaler = sc.fit(trainX)
trainX_scaled = scaler.transform(trainX)
testX_scaled = scaler.transform(testX)

#Classificador
mlp_clf = MLPClassifier(hidden_layer_sizes=(150,100,50), max_iter = 300,activation = 'relu', solver = 'adam')
mlp_clf.fit(trainX_scaled, trainY)

#Avaliando o modelo
y_pred = mlp_clf.predict(testX_scaled)
print('Accuracy: {:.2f}'.format(accuracy_score(testY, y_pred)))

fig = ConfusionMatrixDisplay.from_estimator(mlp_clf, testX_scaled, testY, display_labels=mlp_clf.classes_)
fig.figure_.suptitle("Confusion Matrix for Winequality Dataset")
plt.show()

print(classification_report(testY, y_pred))

plt.plot(mlp_clf.loss_curve_)
plt.title("Loss Curve", fontsize=14)
plt.xlabel('Iterations')
plt.ylabel('Cost')
plt.show()

# MLP Classifier (New Dataset)

from imblearn.over_sampling import SMOTE
import numpy as np
import pandas as pd

# Carregando dataset
df = pd.read_csv("NAN chuville.csv", names=['Data','Chuva', 'Mare', 'Lua', 'Alagou'])

# Preenchendo features vazias usando median
df['Chuva'] = df['Chuva'].fillna(df['Chuva'].median())

# Separando features e classes
X_train = df.drop('Alagou',axis=1)
X_train = df.drop('Data',axis=1)
y = df['Alagou']

# Visualizando a quantidade de dados por classe antes da execução do SMOTE
np.bincount(y)

# Oversampling do dataset
smt = SMOTE()
X_smt, y_smt = smt.fit_resample(X_train, y)

# Visualizando a quantidade de dados por classe após a execução do SMOTE
np.bincount(y_smt)

import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import ConfusionMatrixDisplay
from sklearn.metrics import classification_report

trainX, testX, trainY, testY = train_test_split(X_smt, y_smt, test_size = 0.3)

sc=StandardScaler()

scaler = sc.fit(trainX)
trainX_scaled = scaler.transform(trainX)
testX_scaled = scaler.transform(testX)

#Classificador
mlp_clf = MLPClassifier(hidden_layer_sizes=(150,100,50), max_iter = 300,activation = 'relu', solver = 'adam')
mlp_clf.fit(trainX_scaled, trainY)

#Avaliando o modelo
y_pred = mlp_clf.predict(testX_scaled)
print('Accuracy: {:.2f}'.format(accuracy_score(testY, y_pred)))

fig = ConfusionMatrixDisplay.from_estimator(mlp_clf, testX_scaled, testY, display_labels=mlp_clf.classes_)
fig.figure_.suptitle("Confusion Matrix for Winequality Dataset")
plt.show()

print(classification_report(testY, y_pred))

plt.plot(mlp_clf.loss_curve_)
plt.title("Loss Curve", fontsize=14)
plt.xlabel('Iterations')
plt.ylabel('Cost')
plt.show()