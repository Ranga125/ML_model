from rest_framework import serializers
from .models import InputData

class InputDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputData
        fields = '__all__'
