function zobrazStracháka() {
    document.getElementById("strachak").style.display = "block";
    document.getElementById("strasidelnyZvuk").play();
}





function zobrazStracháka() {
    const obrazky = ["strasidlo1.jpg", "strasidlo2.jpg", "strasidlo3.jpg"];
    const nahodnyIndex = Math.floor(Math.random() * obrazky.length);
    document.getElementById("strachak").src = obrazky[nahodnyIndex];
    document.getElementById("strachak").style.display = "block";
}