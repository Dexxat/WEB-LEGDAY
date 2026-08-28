Instrucciones: recorte local de fondo (Pillow + NumPy)

1) Colocar la imagen hero original en:

   assets/images/hero-src.jpg

   (o `hero-src.png` si ya tiene alpha)

2) Instalar dependencias (en macOS/Linux):

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install pillow numpy
```

3) Ejecutar el script de recorte:

```bash
python3 scripts/remove_bg.py assets/images/hero-src.jpg assets/images/hero-processed.png
```

4) Reemplazar en `index.html` la referencia de la imagen del hero por `assets/images/hero-processed.png`.

5) Si querés, puedo generar yo mismo el cambio en `index.html` una vez que subas el archivo `hero-processed.png`.

Notas:
- El método es heurístico: funciona bien para fondos relativamente uniformes. Si necesitás calidad profesional (recortes muy finos), recomiendo usar un servicio especializado o aportar un PNG recortado manualmente.
- Ajustá el parámetro `threshold` en `scripts/remove_bg.py` si queda demasiado resto del fondo.
