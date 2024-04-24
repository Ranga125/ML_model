from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sklearn.linear_model import LinearRegression
#from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import os

@api_view(['POST'])
def submit_inputs(request):
    # Load the data
    data = pd.read_csv("E:mushroom.csv")

    # Get input values from the request data
    cap_diameter = request.data.get('cap_diameter')                 # Renamed from input1
    cap_shape = request.data.get('cap_shape')                       # Renamed from input2
    cap_surface = request.data.get('cap_surface')                   # Renamed from input3
    cap_color = request.data.get('cap_color')                       # Renamed from input4
    does_bruise_or_bleed = request.data.get('does_bruise_or_bleed') # Renamed from input5
    gill_attachment = request.data.get('gill_attachment')           # Renamed from input6
    gill_color = request.data.get('gill_color')                     # Renamed from input7 
    stem_height = request.data.get('stem_height')                   # Renamed from input8
    stem_width = request.data.get('stem_width')                     # Renamed from input9
    stem_color = request.data.get('stem_color')                     # Renamed from input10
    has_ring = request.data.get('has_ring')                         # Renamed from input11
    ring_type = request.data.get('ring_type')                       # Renamed from input12
    habitat = request.data.get('habitat')                           # Renamed from input13
    season = request.data.get('season')                             # Renamed from input14

    # Convert input values to float
    try:
        cap_diameter = float(cap_diameter)
        cap_shape = float(cap_shape)
        cap_surface = float(cap_surface)
        cap_color = float(cap_color)
        does_bruise_or_bleed = float(does_bruise_or_bleed)
        gill_attachment = float(gill_attachment)
        gill_color = float(gill_color)
        stem_height = float(stem_height)
        stem_width = float(stem_width)
        stem_color = float(stem_color)
        has_ring = float(has_ring)
        ring_type = float(ring_type)
        habitat = float(habitat)
        season = float(season)
    except ValueError:
        return Response({'error': 'One or more input values are not valid numbers'}, status=status.HTTP_400_BAD_REQUEST)

    # Impute missing values
    from sklearn.impute import SimpleImputer

    # Handle cap_surface
    if data['cap_surface'].dtype == object:
        data['cap_surface'] = data['cap_surface'].fillna(data['cap_surface'].mode()[0])
    else:
        se = SimpleImputer(missing_values=np.nan, strategy="mean")
        se.fit(data[['cap_surface']])
        data[['cap_surface']] = se.transform(data[['cap_surface']])

    # Handle gill_attachment
    if data['gill_attachment'].dtype == object:
        data['gill_attachment'] = data['gill_attachment'].fillna(data['gill_attachment'].mode()[0])
    else:
        se = SimpleImputer(missing_values=np.nan, strategy="mean")
        se.fit(data[['gill_attachment']])
        data[['gill_attachment']] = se.transform(data[['gill_attachment']])

    # Handle ring_type
    if data['ring_type'].dtype == object:
        data['ring_type'] = data['ring_type'].fillna(data['ring_type'].mode()[0])
    else:
        se = SimpleImputer(missing_values=np.nan, strategy="mean")
        se.fit(data[['ring_type']])
        data[['ring_type']] = se.transform(data[['ring_type']])

    #drop
    data=data.drop("gill_spacing",axis=1)
    data=data.drop("stem_root",axis=1)
    data=data.drop("stem_surface",axis=1)
    data=data.drop("veil_type",axis=1)
    data=data.drop("veil_color",axis=1)
    data=data.drop("spore_print_color",axis=1)
    
    #labelencoder
    from sklearn.preprocessing import LabelEncoder
    le = LabelEncoder()
    cat_cols = ['class','cap_shape','cap_surface','cap_color','does_bruise_or_bleed','gill_attachment','gill_color','stem_color','has_ring','ring_type','habitat','season']
    data[cat_cols]=data[cat_cols].apply(le.fit_transform)
    #X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size = 0.2, stratify=Y, random_state=2)

    # Prepare input features (assuming columns 1, 2, 3, and 7 are relevant)
    X = data.iloc[:, [1,2,3,4,5,6,7,8,9,10,11,12,13,14]]  # Adjust column indices based on your dataset
    Y = data.iloc[:, [0]]          # Adjust column index based on your dataset

    # Train a linear regression model
    rg = LinearRegression()
    rg.fit(X, Y)

    # Predict the output based on input values
    out = rg.predict([[cap_diameter,cap_shape,cap_surface,cap_color,does_bruise_or_bleed,gill_attachment,gill_color,stem_height,stem_width,stem_color,has_ring ,ring_type,habitat,season]])

    # Process the output
    output = f'Class: {int(out[0][0])}'  # Format output as integer

    return Response({'output': output})
