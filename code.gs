/** 
 Copyright (c) 2021 Diego Azevedo

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
*/

/**============================================== SOBRE O AUTOR ==============================================
* 
* AUTOR: Diego Azevedo Silva
* GITHUB DO AUTOR: https://github.com/diegoatwa/ 
* LINKEDIN DO AUTOR: https://www.linkedin.com/in/diegoazevedosilva/
* 
* ============================================ SOBRE O SOFTWARE =============================================
* 
* DATA DE MODIFICAÇÃO: 18/01/2021
* VERSÃO: 2.0
* GITHUB DO PROJETO: https://github.com/diegoatwa/credito-inteligente-para-imagens-e-textos
* Licença: MIT
* Google Workspace Marketplace: https://gsuite.google.com/marketplace/app/cr%C3%A9dito_inteligente_para_imagens_e_texto/409258008777
============================================================================================================*/

var ui = SlidesApp.getUi();
var mail = Session.getEffectiveUser().getEmail();

function criarMenuLateral(menu, titulo) {
var html = HtmlService.createHtmlOutputFromFile(menu)
.setTitle(titulo);
ui.showSidebar(html);
}

function onOpen(e) {
ui
.createAddonMenu()
.addItem('🚩 Start', 'Start')
.addToUi();
}

// Usados para criar UI especifica e definir funcionalizades do aplicativo para determinados grupos de usuário.
var emailMatrix = [
  "contato.diegoazevedo@gmail.com",
  ]

var emailProfessor = [] //["contato.diegoazevedo@gmail.com"]
var emailEscola = [] //["contato.diegoazevedo@gmail.com"]
var emailDev = [] //["contato.diegoazevedo@gmail.com"]

function Start() {
  try{
    const modo = verificacaoModo()
    if (modo === "Professor") {
      criarMenuProfessor()
    } else if (modo === "Matrix") {
      criarMenuMatrix()
    } else if (modo === "Escola") {
      criarMenuEscola()
    } else if (modo === "Dev") {
      criarMenuDev()
    } else {
      criarMenuComum()
    }
  }catch (e) {
    erro(e)
  }
}
function verificacaoModo(){
  try{
    if (emailMatrix.indexOf(mail) != -1){
      return "Matrix"
    }else if (emailProfessor.indexOf(mail) != -1){
      return "Professor"
    }else if (emailEscola.indexOf(mail) != -1){
      return "Escola"
    }else if (emailDev.indexOf(mail) != -1){
      return "Dev"
    }else{
      return "Comum"//"Comum"
    }
  }catch (e) {
    erro(e)
  }
}
function criarMenuComum() {
  criarMenuLateral('IndexComum', 'Credito Inteligente para Imagens e Textos')
  console.log("START - criarMenuComum: " + mail)
}
function criarMenuMatrix() {
  criarMenuLateral('IndexMatrix', 'Modo Pleno 👑')
  console.log("START - criarMenuMatrix: " + mail)
}
function criarMenuProfessor() {
 criarMenuLateral('IndexProfessor', 'Modo Professor 👑')
  console.log("START - criarMenuProfessor: " + mail)
}
function criarMenuEscola() {
 criarMenuLateral('IndexEscola', 'Modo Escola 👑')
  console.log("START - criarMenuEscola: " + mail)
}
function criarMenuDev() {
 criarMenuLateral('IndexDev', 'Modo Desenvolvedor 🐱‍💻')
  console.log("START - criarMenuDev: " + mail)
}
function erro(e) {
  var erro = e.toString()
  ui.alert(erro)
  console.error(erro)
}
function decidirAssinar(modo) {
  try{
    if (modo === "Professor") {
      return false
    } else if (modo === "Matrix") {
      return true
    } else if (modo === "Escola") {
      return true
    } else if (modo === "Dev") {
      return true
    } else {
      return false
    }
  }catch (e) {
    erro(e)
  }
}
function obterEntradas(titulo) {
  try{
    var entradaUsuario = ui.prompt(titulo, 'Exemplo: @User', ui.ButtonSet.OK);
    if (entradaUsuario.getSelectedButton() == ui.Button.OK) {
      const saidaUsuario = entradaUsuario.getResponseText();
      return saidaUsuario
    }else{
      return false
    }
  }catch (e) {
    erro(e)
  }
}
function coletarLinkImagem(modo) {
  try{
    if (decidirAssinar(modo) || modo === "Professor") {
      var saidaLinkImagem = ui.prompt('Link da imagem', 'Dica: use "Tab -> Enter" para clicar no botão OK', ui.ButtonSet.OK).getResponseText()
      return saidaLinkImagem
    } else {
      return ""
    }
  }catch (e) {
    erro(e)
  }
  console.log("coletarLinkImagem " + mail)
}
function Freepik(entradaPredefinidaNomeUsuario, entradaPredefinidaURL) { 
  try {
    if (entradaPredefinidaNomeUsuario === ''){
      entradaPredefinidaNomeUsuario = extrairUsuarioFreepik(entradaPredefinidaURL)
    }
    if (entradaPredefinidaNomeUsuario === false) {
      ui.alert('Erro ao obter crédito automaticamente','Verifique a url e tente novamente.\nSe o problema persistir nos avise, por favor.', ui.ButtonSet.OK)
    } else {
      SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()
      const quem = "Freepik"
      const modo = verificacaoModo()
      //const titulo = tituloDaPrompt(quem)
      var saidaUsuario = entradaPredefinidaNomeUsuario //obterEntradas(titulo)
      if (saidaUsuario != false){
        const saidaLinkImagem = entradaPredefinidaURL //coletarLinkImagem(modo)
        const font = decidirFonte(modo)
        roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font)
      }
    }
  } catch (e) {
    erro(e)
  }
  console.log("Freepik " + mail)
}
function Pixabay(entradaPredefinidaNomeUsuario, entradaPredefinidaURL) { 
  try {
    SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()
    const quem = "Pixabay"
    const modo = verificacaoModo()
    //const titulo = tituloDaPrompt(quem)
    const saidaUsuario = entradaPredefinidaNomeUsuario //obterEntradas(titulo)
    if (saidaUsuario != false){
      const saidaLinkImagem = entradaPredefinidaURL //coletarLinkImagem(modo)
      const font = decidirFonte(modo)
      roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font)
    }
  } catch (e) {
    erro(e)
  }
  console.log("Pixabay " + mail)
}
function Pexels(entradaPredefinidaNomeUsuario, entradaPredefinidaURL) { 
  try {
    SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()
    const quem = "Pexels"
    const modo = verificacaoModo()
    //const titulo = tituloDaPrompt(quem)
    const saidaUsuario = entradaPredefinidaNomeUsuario //obterEntradas(titulo)
    if (saidaUsuario != false){
      const saidaLinkImagem = entradaPredefinidaURL //coletarLinkImagem(modo)
      const font = decidirFonte(modo)
      roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font)
    }
  } catch (e) {
    erro(e)
  }
  console.log("Pexels " + mail)
}
function PxHere(entradaPredefinidaNomeUsuario, entradaPredefinidaURL) { 
  try {
    if (entradaPredefinidaNomeUsuario === ''){
      entradaPredefinidaNomeUsuario = extrairUsuarioPxHere(entradaPredefinidaURL)
    }
    if (entradaPredefinidaNomeUsuario === false) {
      ui.alert('Erro ao obter crédito automaticamente','Verifique a url e tente novamente.\nSe o problema persistir nos avise, por favor.', ui.ButtonSet.OK)
    } else {
      SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()
      const quem = "PxHere"
      const modo = verificacaoModo()
      //const titulo = tituloDaPrompt(quem)
      const saidaUsuario = entradaPredefinidaNomeUsuario //obterEntradas(titulo)
      if (saidaUsuario != false){
        const saidaLinkImagem = entradaPredefinidaURL //coletarLinkImagem(modo)
        const font = decidirFonte(modo)
        roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font)
      }
    }
  } catch (e) {
    erro(e)
  }
  console.log("PxHere " + mail)
}
function Unsplash(entradaPredefinidaNomeUsuario, entradaPredefinidaURL) { 
  try {
    if (entradaPredefinidaNomeUsuario === ''){
      entradaPredefinidaNomeUsuario = extrairUsuarioUnsplash(entradaPredefinidaURL)
    }
    if (entradaPredefinidaNomeUsuario === false) {
      ui.alert('Erro ao obter crédito automaticamente','Verifique a url e tente novamente.\nSe o problema persistir nos avise, por favor.', ui.ButtonSet.OK)
    } else {
      SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()
      const quem = "Unsplash"
      const modo = verificacaoModo()
      //const titulo = tituloDaPrompt(quem)
      const saidaUsuario = entradaPredefinidaNomeUsuario //obterEntradas(titulo)
      if (saidaUsuario != false){
        const saidaLinkImagem = entradaPredefinidaURL //coletarLinkImagem(modo)
        const font = decidirFonte(modo)
        roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font)
      }
    }
  } catch (e) {
    erro(e)
  }
  console.log("Unsplash " + mail)
}
function Giphy(entradaPredefinidaNomeUsuario, entradaPredefinidaURL) { 
  try {
    SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements()
    const quem = "Giphy"
    const modo = verificacaoModo()
    //const titulo = tituloDaPrompt(quem)
    const saidaUsuario = entradaPredefinidaNomeUsuario //obterEntradas(titulo)
    if (saidaUsuario != false){
      const saidaLinkImagem = entradaPredefinidaURL //coletarLinkImagem(modo)
      const font = decidirFonte(modo)
      roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font)
    }
  } catch (e) {
    erro(e)
  }
  console.log("Giphy " + mail)
}
function decidirFonte(modo) {
  try{
    if (modo === "Professor") {
      return "Source Sans Pro"
    } else if (modo === "Matrix") {
      return "Source Sans Pro"
    } else if (modo === "Escola") {
      return "Source Sans Pro"
    } else if (modo === "Dev") {
      return "Source Sans Pro"
    } else {
      return "Raleway"
    }
  }catch (e) {
    erro(e)
  }
  console.log("decidirFonte " + mail)
}
function creditoPersonalizado() {
  try {
    SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements();
    var bancoPersoEntrada = ui.prompt('🔍 De onde você tirou a imagem?', 'Exemplo: 500px', ui.ButtonSet.OK);
    if (bancoPersoEntrada.getSelectedButton() == ui.Button.OK) {
      var entradaUsuario = ui.prompt('🖼️ Quem é o autor?', 'Exemplo: NickName', ui.ButtonSet.OK);
      if (entradaUsuario.getSelectedButton() == ui.Button.OK) {
        var entradaLinkImagem = ui.prompt('🌐 Link da imagem', 'Dica: use "Tab -> Enter" para clicar no botão OK', ui.ButtonSet.OK);
        if (entradaLinkImagem.getSelectedButton() == ui.Button.OK) {
          var modo = verificacaoModo()
          var font = decidirFonte(modo)
          var saidaLinkImagem = entradaLinkImagem.getResponseText();
          var saidaUsuario = entradaUsuario.getResponseText();
          var bancoPersoSaida = bancoPersoEntrada.getResponseText();
          roboTextoPersonalizado(modo, bancoPersoSaida, saidaUsuario, saidaLinkImagem, font);
        }
      }
    }
  } catch (e) {
    erro(e)
  }
  console.log("creditoPersonalizado " + mail)
}
function roboTextoPredefinido(quem, modo, saidaUsuario, saidaLinkImagem, font) {
  try {
    var bancoPredefinido = "Imagem: " + quem + ", @" + saidaUsuario
    var selecaoUI = SlidesApp.getActivePresentation().getSelection();
    var elementos = selecaoUI.getPageElementRange().getPageElements();
    var posicaoTopo = elementos[0].getTop();
    var posicaoEsquerda = elementos[0].getLeft();
    var tamanhoAltura = elementos[0].getHeight();
    var tamanhoLargura = elementos[0].getWidth();
    var alturaCredito = posicaoTopo + tamanhoAltura;
    var caixaTexto = selecaoUI.getCurrentPage().insertShape(SlidesApp.ShapeType.TEXT_BOX, posicaoEsquerda - 8, alturaCredito - 4, tamanhoLargura + 8, 15);
    var textoInserido = caixaTexto.getText();
    var eProf = modo === "Professor"
    textoInserido.setText(bancoPredefinido.toString());
    textoInserido.getTextStyle().setFontFamily(font).setFontSize(8);
    if (decidirAssinar(modo)) {
      assinarPredefinido(saidaLinkImagem)
    }
    if (eProf) {
      textoInserido.getTextStyle().setLinkUrl(saidaLinkImagem)
    }
  } catch (e) {
    erro(e)
  }
  console.log("roboTextoPredefinido " + mail)
}
function assinarPredefinido(saidaLinkImagem) {
  try{
    var font = "Source Sans Pro"
    var assinatura = "Imagem revisada por: "
    var paragrafoInserido = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide().getNotesPage().getSpeakerNotesShape().getText().insertParagraph(0, assinatura + mail + " - " + saidaLinkImagem.toString());
    paragrafoInserido.getRange().getTextStyle().setLinkUrl(saidaLinkImagem).setFontFamily(font).setFontSize(10);
  }catch (e) {
    erro(e)
  }
  console.log("assinarPredefinido " + mail)
}
function assinarFontePredefinido(saidaLinkImagem) {
  try{
    var font = "Source Sans Pro"
    var assinatura = "Fonte revisada por: "
    var paragrafoInserido = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide().getNotesPage().getSpeakerNotesShape().getText().insertParagraph(0, assinatura + mail + " - " + saidaLinkImagem.toString());
    paragrafoInserido.getRange().getTextStyle().setLinkUrl(saidaLinkImagem).setFontFamily(font).setFontSize(10);
  }catch (e) {
    erro(e)
  }
  console.log("assinarPredefinido " + mail)
}
function roboTextoPersonalizado(modo, bancoPersoSaida, saidaUsuario, saidaLinkImagem, font) {
  try{
    SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements();
    var selecaoUI = SlidesApp.getActivePresentation().getSelection();
    var elementos = selecaoUI.getPageElementRange().getPageElements();
    var posicaoTopo = elementos[0].getTop();
    var posicaoEsquerda = elementos[0].getLeft();
    var tamanhoAltura = elementos[0].getHeight();
    var tamanhoLargura = elementos[0].getWidth();
    var alturaCredito = posicaoTopo + tamanhoAltura;
    var caixaTexto = selecaoUI.getCurrentPage().insertShape(SlidesApp.ShapeType.TEXT_BOX, posicaoEsquerda - 8, alturaCredito - 4, tamanhoLargura + 8, 15);
    var textoInserido = caixaTexto.getText();
    var eProf = verificacaoModo() === "Professor"
    textoInserido.setText("Imagem: " + bancoPersoSaida.toString() + ", @" + saidaUsuario.toString());
    textoInserido.getTextStyle().setFontFamily(font).setFontSize(8);
    textoInserido.getTextStyle().setFontFamily(font).setFontSize(8);
    if (decidirAssinar(modo)) {
      assinarPredefinido(saidaLinkImagem)
    }
    if (eProf) {
      textoInserido.getTextStyle().setLinkUrl(saidaLinkImagem)
    }
  }catch (e) {
    erro(e)
  }
  console.log("roboTextoPersonalizado " + mail)
}
function roboTextoPersonalizadoHTML(text, link) {
  try{
    var modo = "Matrix"
    var font = "Source Sans Pro"
    SlidesApp.getActivePresentation().getSelection().getPageElementRange().getPageElements();
    var selecaoUI = SlidesApp.getActivePresentation().getSelection();
    var elementos = selecaoUI.getPageElementRange().getPageElements();
    var posicaoTopo = elementos[0].getTop();
    var posicaoEsquerda = elementos[0].getLeft();
    var tamanhoAltura = elementos[0].getHeight();
    var tamanhoLargura = elementos[0].getWidth();
    var alturaCredito = posicaoTopo + tamanhoAltura;
    var caixaTexto = selecaoUI.getCurrentPage().insertShape(SlidesApp.ShapeType.TEXT_BOX, posicaoEsquerda - 8, alturaCredito - 4, tamanhoLargura + 8, 15);
    var textoInserido = caixaTexto.getText();
    var eProf = verificacaoModo() === "Professor"
    textoInserido.setText(text.toString());
    textoInserido.getTextStyle().setFontFamily(font).setFontSize(8);
    textoInserido.getTextStyle().setFontFamily(font).setFontSize(8);
    if (decidirAssinar(modo)) {
      assinarPredefinido(link)
    }
    if (eProf) {
      textoInserido.getTextStyle().setLinkUrl(saidaLinkImagem)
    }
  }catch (e) {
    erro(e)
  }
  console.log("roboTextoPersonalizado " + mail)
}
function roboAssinarImagem(link) {
  try {
    var assinatura = "Imagem revisada por: "
    var font = "Source Sans Pro"
    var slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide();
    var saidaLinkImagem = link
    var paragrafoInserido = slide.getNotesPage().getSpeakerNotesShape().getText().insertParagraph(0, assinatura + mail + " - " + saidaLinkImagem.toString());
    paragrafoInserido.getRange().getTextStyle().setLinkUrl(saidaLinkImagem).setFontFamily(font).setFontSize(10).setBold(false);
  } catch (e) {
    erro(e)
  }
  console.log("roboAssinarImagem " + mail)
}
function roboAssinarVideo(link) {
  try {
    var assinatura = "Vídeo revisado por: "
    var font = "Source Sans Pro"
    var slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide();
    var saidaLinkImagem = link
    var paragrafoInserido = slide.getNotesPage().getSpeakerNotesShape().getText().insertParagraph(0, assinatura + mail + " - " + saidaLinkImagem.toString());
    paragrafoInserido.getRange().getTextStyle().setLinkUrl(saidaLinkImagem).setFontFamily(font).setFontSize(10).setBold(false);
  } catch (e) {
    erro(e)
  }
  console.log("roboAssinarVideo " + mail)
}
function roboAssinarLink(link) {
  try {
    var assinatura = "Link revisado por: "
    var font = "Source Sans Pro"
    var slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide();
    var saidaLinkImagem = link
    var paragrafoInserido = slide.getNotesPage().getSpeakerNotesShape().getText().insertParagraph(0, assinatura + mail + " - " + saidaLinkImagem.toString());
    paragrafoInserido.getRange().getTextStyle().setLinkUrl(saidaLinkImagem).setFontFamily(font).setFontSize(10).setBold(false);
  } catch (e) {
    erro(e)
  }
  console.log("roboAssinarLink " + mail)
}
function fonte(title, link) {
  try {
    var selecaoUI = SlidesApp.getActivePresentation().getSelection();
    var elementos = selecaoUI.getPageElementRange().getPageElements();
    var saidaTitulo = title
    var saidaLinkFonte = link
    if (saidaLinkFonte.length > 30) {
      ui.alert(":-(", "Parece que você não inseriu uma URL encurtada", ui.ButtonSet.OK);
    } else if (saidaTitulo.length < 2) {
      ui.alert(":-(", "Parece que você não inseriu o Título da matéria", ui.ButtonSet.OK);
    } else {
      var mes = mesAbreviado()
      var ano = anooo()
      var modo = verificacaoModo()
      var eProf = modo === "Professor"
      var mesAno = mes + "/" + ano
      var font = decidirFonte(modo)
      var posicaoTopo = elementos[0].getTop();
      var posicaoEsquerda = elementos[0].getLeft();
      var tamanhoAltura = elementos[0].getHeight();
      var tamanhoLargura = elementos[0].getWidth();
      var alturaCredito = posicaoTopo + tamanhoAltura;
      var textoInserido = SlidesApp.getActivePresentation().getSelection().getCurrentPage().insertShape(SlidesApp.ShapeType.TEXT_BOX, posicaoEsquerda - 7, alturaCredito - 4, tamanhoLargura + 7, 35).getText();
      textoInserido.appendText(saidaTitulo.toString()).getTextStyle().setBold(true).setFontFamily(font).setFontSize(8);
      textoInserido.appendText('\nDisponível no endereço <').getTextStyle().setFontFamily(font).setFontSize(8).setBold(false);
      textoInserido.appendText(saidaLinkFonte).getTextStyle().setLinkUrl(saidaLinkFonte);
      textoInserido.appendText('> acesso em ' + mesAno + '\nCom adaptações para fins pedagógicos.').getTextStyle().setFontFamily(font).setFontSize(8).setBold(false);
      if (eProf) {
        textoInserido.getParagraphs()[0].getRange().getTextStyle().setLinkUrl(saidaLinkFonte)
      }
      if (decidirAssinar(modo)) {
        assinarFontePredefinido(link)
      }
    }
    
    
  } catch (e) {
    erro(e)
  }
  console.log("fonte " + mail)
}
function tchauTodaSujeira() {
  try {
    var quantidadeSlides = SlidesApp.getActivePresentation().getSlides().length;
    for (d = 0; d < quantidadeSlides; d++) {
      var slide = SlidesApp.getActivePresentation().getSlides()[d].getPageElements();
      for (i = 0; i < slide.length; i++) {
        if (d == 2) {
          var elementos = slide[i];
          elementos.select()
          if (elementos.getLeft() < 0) {
            elementos.remove()
          } else if (elementos.getLeft() > 720) {
            elementos.remove()
          }
        } else {
          var elementos = slide[i];
          elementos.select();
          if (elementos.getTop() < 0) {
            elementos.remove();
          } else if (elementos.getTop() > 405) {
            elementos.remove();
          } else if (elementos.getLeft() < 0) {
            elementos.remove();
          } else if (elementos.getLeft() > 720) {
            elementos.remove();
          }
        }
      }
    }
  } catch (e) {
    erro(e)
  }
  console.log("tchauTodaSujeira " + mail)
}
function tchauSujeiraPaginaSelecionada() {
  try {
    var slide = SlidesApp.getActivePresentation().getSelection().getCurrentPage().getPageElements();
    for (i = 0; i < slide.length; i++) {
      var elementos = slide[i];
      elementos.select();
      if (elementos.getTop() < 0) {
        elementos.remove();
      } else if (elementos.getTop() > 405) {
        elementos.remove();
      } else if (elementos.getLeft() < 0) {
        elementos.remove();
      } else if (elementos.getLeft() > 720) {
        elementos.remove();
      }
    }
  } catch (e) {
    erro(e)
  }
  console.log("tchauSujeiraPaginaSelecionada " + mail)
}
function mesAbreviado() {
  try{
    const entradaData = Date().toString();
    const entradaMes = entradaData[4] + entradaData[5] + entradaData[6];
    var mesAbreviado = "Error";
    switch (entradaMes) {
      case "Jan":
        mesAbreviado = "Jan";
        break;
      case "Feb":
        mesAbreviado = "Fev";
        break;
      case "Mar":
        mesAbreviado = "Mar";
        break;
      case "Apr":
        mesAbreviado = "Abr";
        break;
      case "May":
        mesAbreviado = "Mai";
        break;
      case "Jun":
        mesAbreviado = "Jun";
        break;
      case "Jul":
        mesAbreviado = "Jul";
        break;
      case "Aug":
        mesAbreviado = "Ago";
        break;
      case "Sep":
        mesAbreviado = "Set";
        break;
      case "Oct":
        mesAbreviado = "Out";
        break;
      case "Nov":
        mesAbreviado = "Nov";
        break;
      case "Dec":
        mesAbreviado = "Dez";
        break;
    }
    return mesAbreviado
  }catch (e) {
    erro(e)
  }
}
function anooo() {
  try{
    const entradaData = Date().toString();
    const ano = entradaData[11] + entradaData[12] + entradaData[13] + entradaData[14]
    return ano
  }catch (e) {
    erro(e)
  }
}
function tudoJuntoMatrix() {
  try {
    tchauTodaSujeira()
    verificacaoNomeProfessor()
    verificacaoDuploEnter()
    verificacaoDuploEspaco()
  } catch (e) {
    erro(e)
  }
  console.log("tudoJuntoMatrix " + mail)
  console.log("" + mail)
}
