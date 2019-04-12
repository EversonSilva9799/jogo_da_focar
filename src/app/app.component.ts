import { Component } from '@angular/core';
import { ForcaService } from './modelo/forca.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private palavras = ['emprego', 'azul', 'amarelo', 'branco', 'javascript', 'corrida', 'bruno', 'felicidade'];
  tentativas: number;
  palavra: String;
  secreta = [];
  chutes = [];
  novaInformacao: boolean;
  jaFoiChutado: boolean;
  info: String;
  win: boolean;



  public constructor(private forcaService: ForcaService  ) {
    this.gerarPalavra();
    this.novaInformacao = false;
    this.jaFoiChutado = false;
    this.info = '';
    this.chutes = [];
    this.win = false;
  }


  /**
   *Verifica se a letra digitada existe na palavra secreta
   * @param letra
   */
  public verificarLetra(letra) {

    // Verificando se as tentativas não acabaram
    if (this.tentativas > 0) {

      this.novaInformacao = false;

      // Verificando se a letra vinda do input não foi chutada antes
      if (!(this.chutes.includes(letra.value))) {
        this.chutes.push(letra.value);
        for (let i = 0; i < this.palavra.length; i++) {
          if (this.palavra[i] === letra.value) {
            this.adicionarLetra(letra.value, i);

          }
        }

        if ((this.secreta.includes(letra.value))) {

        } else {
          this.novaInformacao = true;
          this.info = 'Você Errou';
        }


      } else {
        this.novaInformacao = true;
        this.info = `A letra '${letra.value}' já foi chutada`;

      }
      this.tentativas--;
    } else {

      this.novaInformacao = true;
      this.info = `Fim de Jogo`;
    }
  }


  /**
   * Adiciona a letra no array secreta (Caso exista na palavra secreta)
   * @param letra
   * @param posicao
   */
  public adicionarLetra(letra, posicao){
    this.secreta[posicao] = letra;

    if (!this.secreta.includes('_')) {
        this.novaInformacao = true;
        this.win = true;
        this.info = `Parabéns Você Ganhou`;

    }


  }

  /**
   * Vai criar um array do mesmo tamanho da palavra secreta
   */
  public iniciarPalavraSecreta() {
    this.secreta = [];
    for (let i = 0; i < this.palavra.length; i++) {
      this.secreta.push('_');

    }
  }

  /**
   * Seleciona uma palavra do array para ser a secreta
   */
  public gerarPalavra() {
    // Escolhendo uma palvra da lista de plavras
    const palavraEscolhida = Math.floor(Math.random() * this.palavras.length);
    this.palavra = this.palavras[palavraEscolhida]

    // Retirando a palavra escolhida da lista de palavras
   // this.palavras.splice(palavraEscolhida, 1);

    // Números de tentativas
    this.tentativas = (this.palavra.length);

    this.iniciarPalavraSecreta();

    this.novaInformacao = true;
    this.info = 'Nova Palavra gerada';

    this.chutes = [];

    this.win = false;

  }


}



