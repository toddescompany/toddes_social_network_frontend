import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialFunctionsService {

  constructor() { }

  calculaADiferencaEntreDatas(dataDaPostagem: string)
  {
    const now = new Date(); // Data de hoje
    const past = new Date(dataDaPostagem); // Outra data no passado
    const diff = Math.abs(now.getTime() - past.getTime());
    // Subtrai uma data pela outra

    // unidades
      const dias = Math.ceil(diff / (1000 * 60 * 24)) - 1; // Divide o total
      const horas = Math.ceil(diff / (1000 * 60 * 60)) - 1; // Divide o total
      const minutos = Math.ceil(diff / (1000 * 60)) - 1; // Divide o total
      const segundos = Math.ceil(diff / (1000)); // Divide o total
      let saidaDaData = ''

      if (dias == 0 && horas == 0 && minutos == 0 && segundos > 0)
      {// SE TEM MENOS DE 1M - MOSTRA EM SEGUNDOS
        saidaDaData = segundos + " segundos atrás"
      }
      else if(dias == 0 && horas == 0 && minutos > 0)
      { // SE PASSOU DE 1M, - MOSTRA SÓ OS MINUTOS
        saidaDaData = minutos + " minutos atrás"
      }
      else if(dias == 0 && horas > 0 && horas < 24)
      { // SE PASSOU DE 1H - MOSTRA AS HORAS E OS MINUTOS
        saidaDaData = horas + " horas atrás"
      }
      else if(dias == 0 && horas > 0 && horas > 24)
      { // SE PASSOU DE 24H - MOSTRA A QUANTIDADE DE DIAS SOMENTE
        saidaDaData = dias + " dias atrás"
      }
      else if(dias > 7)
      {   // SE PASSOU DE UMA SEMANA - MOSTRA A DATA E O HORÁRIO
        saidaDaData = " " + past.toLocaleString()
      }


    return (saidaDaData)
  }

  expandirIMG(event: any)
  {
      var modal = <HTMLElement> document.getElementById("myModal");
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    const modalImg = <HTMLElement> document.getElementById("img01");
    const captionText = <HTMLElement> document.getElementById("caption");
    modal.style.display = "block";
    modalImg.setAttribute("src", event.src)
    captionText.innerHTML = event.alt;
  }
}
