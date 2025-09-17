 const fileInput = document.getElementById("fileInput");
    const processBtn = document.getElementById("processBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let img = null;

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        img = new Image();
        img.onload = () => alert("Imagen cargada correctamente");
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    processBtn.addEventListener("click", () => {
      if (!img) {
        alert("Primero selecciona una imagen");
        return;
      }

      const targetWidth = parseInt(document.getElementById("targetWidth").value);
      const targetHeight = parseInt(document.getElementById("targetHeight").value);
      const bgColor = document.getElementById("bgColor").value;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      const scale = Math.min(targetWidth / img.width, targetHeight / img.height);
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
      const offsetX = (targetWidth - newWidth) / 2;
      const offsetY = (targetHeight - newHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      downloadBtn.style.display = "inline-block";
    });

    downloadBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "imagen_ajustada.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });