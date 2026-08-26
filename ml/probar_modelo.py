import json
import os
import sys

# Silenciar logs innecesarios de TensorFlow
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing import image

# Obtener ruta de la imagen desde los argumentos de la consola (o por defecto test_lunar.jpg)
img_path = sys.argv[1] if len(sys.argv) > 1 else "test_lunar.jpg"

try:
    if not os.path.exists(img_path):
        raise FileNotFoundError(
            f"No se encontró la imagen en la ruta: {img_path}"
        )

    model_path = "models/melascan_model.h5"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"No se encontró el modelo en: {model_path}")

    # Cargar el modelo entrenado
    model = tf.keras.models.load_model(model_path)

    # Cargar y preprocesar la imagen al tamaño 224x224 exigido por MobileNetV2
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)

    # Aplicar la normalización nativa de MobileNetV2 (transforma píxeles al rango [-1, 1])
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    # Inferencia
    prediction = float(model.predict(img_array, verbose=0)[0][0])

    # Interpretación del resultado basado en el mapeo {'benigno': 0, 'melanoma': 1}
    if prediction > 0.50:
        resultado = {
            "diagnostico": "MELANOMA",
            "certeza": round(prediction * 100, 2),
        }
    else:
        resultado = {
            "diagnostico": "BENIGNO",
            "certeza": round((1.0 - prediction) * 100, 2),
        }

    print(json.dumps(resultado))

except Exception as e:
    print(json.dumps({"error": str(e)}))