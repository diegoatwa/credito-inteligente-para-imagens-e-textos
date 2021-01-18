function extrairUsuarioFreepik(url) {
  var text = UrlFetchApp.fetch(url).getContentText()
  var achar = text.indexOf('data-author-name=') + 18
  if (achar === 17){
    return false
  }
  var newtext = text.slice(achar, achar + 50)
  var textoTratado = newtext.split('"')
  return textoTratado[0]
}

function extrairUsuarioPxHere(url) {
  var text = UrlFetchApp.fetch(url).getContentText()
  var achar = text.indexOf('"author":{"@type":"Person","name":"') + 35
  if (achar === -1){
    return false
  }
  var newtext = text.slice(achar, achar + 50)
  var textoTratado = newtext.split('"')
  if (textoTratado[0] === 'CC0-Photographers'){
    return "Domínio Público"
  }
  return textoTratado[0]
}

function extrairUsuarioUnsplash(url) {
  var text = UrlFetchApp.fetch(url).getContentText()
  var achar = text.indexOf('Download this photo by ') + 23
  if (achar === 31){
    return false
  }
  var newtext = text.slice(achar, achar + 50)
  var textoTratado = newtext.split(' on Unsplash')
  return textoTratado[0]
}
