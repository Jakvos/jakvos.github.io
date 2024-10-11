function zobrazStracháka() {
    document.getElementById("strachak").style.display = "block";
    document.getElementById("strasidelnyZvuk").play();
}





function zobrazStracháka() {
    const obrazky = ["haloween.png", "stock-photo-creepy-bloody-doll-in-the-dark-1338834074.jpg.jpg", "stock-photo-creepy-bloody-doll-in-the-dark-1338834074(1).jpg"];
    const nahodnyIndex = Math.floor(Math.random() * obrazky.length);
    document.getElementById("strachak").src = obrazky[nahodnyIndex];
    document.getElementById("strachak").style.display = "block";
}