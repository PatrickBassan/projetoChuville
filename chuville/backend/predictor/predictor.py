"""Modulo MLP Regressor"""
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
from imblearn.over_sampling import SMOTE

# Carregando dataset
df = pd.read_csv("../../../dataAnalysis/NAN chuville.csv", names=['Chuva', 'Mare', 'Lua', 'Alagou'])

# Preenchendo features vazias usando median
df['Chuva'] = df['Chuva'].fillna(df['Chuva'].median())

# Separando features e classes
X_train = df.drop('Alagou',axis=1)
X_train = df.drop('Chuva',axis=1)
y = df['Alagou']

# Visualizando a quantidade de dados por classe antes da execução do SMOTE
np.bincount(y)

# Oversampling do dataset
smt = SMOTE()
X_smt, y_smt = smt.fit_resample(X_train, y)

# Visualizando a quantidade de dados por classe após a execução do SMOTE
np.bincount(y_smt)

trainX, testX, trainY, testY = train_test_split(X_smt, y_smt, test_size = 0.3)

sc=StandardScaler()

scaler = sc.fit(trainX)
trainX_scaled = scaler.transform(trainX)
testX_scaled = scaler.transform(testX)

#Regressor
mlp_reg = MLPRegressor(
    hidden_layer_sizes=(150,100,50),
    max_iter = 1000,
    activation = 'relu',
    solver = 'adam'
)
mlp_reg.fit(trainX_scaled, trainY)

# Deploy com pickle
with open('predictorModel', 'wb') as f:
    pickle.dump(mlp_reg, f)
