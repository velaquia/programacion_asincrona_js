
function type2clase(type) {
    let clase = "";
    switch (type) {
        case "normal":
             clase = "normal";
             break;
         case "grass":
            clase = "planta";
             break;
        case "fire":
            clase = "fuego";
             break;
        case "water":
            clase = "agua";
            break;
        case "electric":
            clase = "electricidad";
             break;
        case "poison":
            clase = "veneno";
            break;
        default:
            clase = "desconocido";
            break;
    }
    return clase;
}