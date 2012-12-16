var oldChromeVersion = !chrome.runtime;
var novaVersao;

chrome.extension.sendRequest({msg: "Qual a versao?"},
function(response){
	returnMsg = response.returnMsg;
	novaVersao = returnMsg;
	console.log(returnMsg);
	insereDados();
});

function insereDados(){
	document.getElementById('versao').innerHTML = novaVersao;
	document.getElementById('download_msg').innerHTML = chrome.i18n.getMessage("click_download");
}