//function verificaAtualizacao(){
	var ironVersion;
	//var ironVersionTeste = "555";
	try{
		ironVersion = navigator.userAgent.toLowerCase().match(/iron\/[0-9.]+/)[0].substr(5);
	}
	catch(err){
		ironVersion = "Error";
	}
	if (ironVersion != "Error"){ //eh SRWare Iron
		var conteudo = document.getElementsByClassName('news_text')[4-1];

		if (conteudo != null){
			conteudo = conteudo.getElementsByTagName('strong')[0];
			if (conteudo != null){
				try{
					//alert(conteudo.innerHTML+" "+ironVersion);
					if (conteudo.innerHTML == ironVersion){ //nao ha uma nova versao disponivel
						//Nothing
					}
					else{ //ha uma nova versao disponivel
						// cria a noticicacao
						chrome.extension.sendRequest({msg: "Mostra notificacao?", versao: conteudo.innerHTML}, function(response) {console.log(response.returnMsg);});
						
						/*chrome.extension.onRequest.addListener(
							function(request, sender, sendResponse) {

							if (request.msg == "Tem atualizacao?"){
								sendResponse({versao: conteudo.innerHTML, returnMsg: "Ok"});
								console.log("updater retornou mensagem");
							}
							else{
								sendResponse({returnMsg: "Erro"});
								console.log("updater Nao retornou mensagem");
							}
						});*/
					}
				}
				catch(err){
					//alert(conteudo.innerHTML);
				}
			}
		}
		else{
			//nothing
			//alert("Nao encontrado 2");
		}
	}
	else{ //deu erro
		chrome.extension.sendRequest({msg: "Nao e SRWare Iron"}, function(response) {console.log(response.returnMsg);});
	}
	//fecha a aba
	chrome.extension.sendRequest({msg: "Fecha aba"}, function(response) {console.log(response.returnMsg);});
	
//}
//document.addEventListener("DOMNodeInserted", verificaAtualizacao, true);