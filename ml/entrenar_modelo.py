import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Configuración de dimensiones y parámetros
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 12

# Asegurar que exista la carpeta models
os.makedirs("models", exist_ok=True)

# ImageDataGenerator con Data Augmentation y la función nativa preprocess_input de MobileNetV2
datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    rotation_range=180,  # Rotaciones en cualquier ángulo
    zoom_range=0.3,  # Zoom aleatorio de ±30%
    width_shift_range=0.15,  # Desplazamiento horizontal
    height_shift_range=0.15,  # Desplazamiento vertical
    horizontal_flip=True,  # Volteo horizontal
    vertical_flip=True,  # Volteo vertical
    fill_mode="nearest",
    validation_split=0.2,  # 80% Entrenamiento, 20% Validación
)

print("[+] Cargando dataset desde la carpeta 'datos'...")

train_gen = datagen.flow_from_directory(
    "datos",
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="training",
    shuffle=True,
)

val_gen = datagen.flow_from_directory(
    "datos",
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="binary",
    subset="validation",
    shuffle=False,
)

print(f"\n[+] Mapeo de clases confirmado: {train_gen.class_indices}\n")

# Cargar MobileNetV2 con pesos de ImageNet sin la cabeza clasificadora
base_model = MobileNetV2(
    weights="imagenet", include_top=False, input_shape=(224, 224, 3)
)
base_model.trainable = (
    False  # Congelar capas base para preservar el conocimiento previo
)

# Construcción del modelo secuencial
model = models.Sequential(
    [
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation="relu"),
        layers.Dropout(0.4),  # Regularización para evitar Overfitting
        layers.Dense(1, activation="sigmoid"),
    ]
)

# Compilación
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss="binary_crossentropy",
    metrics=["accuracy"],
)

print(
    "[+] Iniciando entrenamiento con Transfer Learning y Data Augmentation..."
)
model.fit(train_gen, epochs=EPOCHS, validation_data=val_gen)

# Guardar el modelo entrenado
model_path = "models/melascan_model.h5"
model.save(model_path)
print(f"\n[✔] Modelo mejorado guardado exitosamente en '{model_path}'")