import os
import shutil
import kagglehub
import pandas as pd
import requests
import urllib3

# Parche de red SSL
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
_old_send = requests.Session.send


def _new_send(self, request, **kwargs):
    kwargs["verify"] = False
    return _old_send(self, request, **kwargs)


requests.Session.send = _new_send

# Descargar dataset
dataset_path = kagglehub.dataset_download("kmader/skin-cancer-mnist-ham10000")
csv_path = os.path.join(dataset_path, "HAM10000_metadata.csv")
df = pd.read_csv(csv_path)

# Carpetas
base_dir = "datos"
melanoma_dir = os.path.join(base_dir, "melanoma")
benigno_dir = os.path.join(base_dir, "benigno")
os.makedirs(melanoma_dir, exist_ok=True)
os.makedirs(benigno_dir, exist_ok=True)

# Mapear imágenes
image_path_map = {}
for root, dirs, files in os.walk(dataset_path):
    for file in files:
        if file.endswith(".jpg"):
            image_path_map[file.split(".")[0]] = os.path.join(root, file)

print("Copiando imágenes...")
copiadas_mel = 0
copiadas_ben = 0

for idx, row in df.iterrows():
    img_id, dx = row["image_id"], row["dx"]
    if img_id in image_path_map:
        orig = image_path_map[img_id]
        if dx == "mel":
            shutil.copyfile(orig, os.path.join(melanoma_dir, f"{img_id}.jpg"))
            copiadas_mel += 1
        elif dx == "nv" and copiadas_ben < 1113:
            shutil.copyfile(orig, os.path.join(benigno_dir, f"{img_id}.jpg"))
            copiadas_ben += 1

print(f"Listo: {copiadas_mel} Melanomas y {copiadas_ben} Benignos.")