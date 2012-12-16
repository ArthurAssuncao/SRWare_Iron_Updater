var oldChromeVersion = !chrome.runtime;
var URL = "http://www.srware.net/en/software_srware_iron_download.php?";
var novaVersao;
var idAbaCriada;

function onInit(){

	//cria a aba do site srware.net
	chrome.tabs.create({"url": URL, "active": false, "selected": false}, function(tab){idAbaCriada = tab.id;});

	chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {

		if (request.msg == "Mostra notificacao?" && sender.tab.url.indexOf("www.srware.net")>-1){
			novaVersao = request.versao;
			mostraNotificacao(novaVersao);
			/*if (isNotIron){
				var notificacaoNaoIron = webkitNotifications.createNotification(
					'Nao e o SRWare Iron',
					'Voce nao esta usando o SRWare Iron'
				);
			}*/
			sendResponse({returnMsg: "Notificacao exibida"});
			console.log("SRWare Iron Updater Notificacao exibida");
		}
		else
		if (request.msg == "Nao e SRWare Iron"){
			var notificacaoNaoIron = webkitNotifications.createNotification(
				'img/icone.ico',
				'Nao é o SRWare Iron',
				'Voce não está usando o SRWare Iron'
			);
			notificacaoNaoIron.show();
			sendResponse({returnMsg: "Notificacao mostrada"});
			console.log("Nao e SRWare Iron");
		}
		else
		if (request.msg == "Fecha aba" && sender.tab.url.indexOf("www.srware.net")>-1){
			chrome.tabs.remove(idAbaCriada, null);
			sendResponse({returnMsg: "Aba fechada"});
			console.log("SRWare Iron Updater fechou a aba");
		}
		else
		if (request.msg == "Qual a versao?"){
			sendResponse({returnMsg: getNewVersion()});
			console.log("SRWare Iron: nova versao " + getNewVersion());
		}
		else{
			sendResponse({returnMsg: "Notificacao nao foi exibida"});
			console.log("SRWare Iron Updater Notificacao nao foi exibida");
		}
	});

	/*chrome.tabs.getSelected(null, function(tab) {
	chrome.tabs.sendRequest(idAbaCriada, {msg: "Tem atualizacao?"}, function(response) {
		//novaVersao = response.versao;
		novaVersao = "17";
		mostraNotificacao(novaVersao);
	});
	});*/

	//fecha a aba do site srware.net
	/*chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {

		if (request.msg == "Fecha aba" && sender.tab.url.indexOf("www.srware.net")>-1){
			chrome.tabs.remove(idAbaCriada, null);
			sendResponse({returnMsg: "Aba fechada"});
			console.log("SRWare Iron Updater fechou a aba");
		}
		else{
			sendResponse({returnMsg: "Notificacao nao foi fechada"});
			console.log("SRWare Iron Updater Notificacao nao foi exibida");
		}
	});*/
	//setTimeout("chrome.tabs.getSelected(null, function(tab) {chrome.tabs.remove(idAbaCriada, null);});", 20000);
}

function mostraNotificacao(novaVersao){
	var URLDownload = "http://www.srware.net/downloads/srware_iron.exe";

	var notification = webkitNotifications.createHTMLNotification(
		'notificacao.html'
	);

	// Then show the notification.
	notification.show();
	notification.onclick = function(){
		chrome.tabs.create({"url": URLDownload}, null);
	};
}

function getNewVersion(){
	return novaVersao;
}

if (oldChromeVersion) {
	onInit();
}
else {
	chrome.runtime.onInstalled.addListener(onInit);
	//chrome.runtime.onBrowserStartup.addListener(onInit);
	if (chrome.runtime.onStartup) {
		chrome.runtime.onStartup.addListener(function() {
			console.log('Starting browser... checking updates');
			onInit();
		});
	}
	else{
		// This hack is needed because Chrome 22 does not persist browserAction icon
		// state, and also doesn't expose onStartup. So the icon always starts out in
		// wrong state. We don't actually use onStartup except as a clue that we're
		// in a version of Chrome that has this problem.
		chrome.windows.onCreated.addListener(function() {
			console.log('Window created... checking updates.');
			onInit();
		});
	}
}