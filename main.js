const btnSubscribe = document.getElementById('btnSubscribe');
const btnUnSubscribe = document.getElementById('btnUnSubscribe');
const textInstanceIdToken = document.getElementById('textInstanceIdToken');

// メッセージング オブジェクトの取得
const messaging = firebase.messaging();

// アプリにウェブ認証情報を設定する
messaging.usePublicVapidKey("BMfx4WNaV2QqRkaXwu2rJpjJWdTJ5F-QT5BCoAoQP_0OUubdNWZT-pJcqIbFXCeueAB48nznn2vR9ZQrUcfyrOg");

// 権限要求
function requestPermission() {
    // 通知を受信する権限を要求する
    messaging.requestPermission().then(function () {
        // 現在の登録トークンの取得
        messaging.getToken().then(function (token) {
            textInstanceIdToken.value = token;
            btnSubscribe.style.display = 'none';
            btnUnSubscribe.style.display = 'block';
        }).catch(function (err) {
            textInstanceIdToken.value = 'トークンの取得に失敗しました（' + err + '）。';
        });
    }).catch(function (err) {
        textInstanceIdToken.value = '通知の許可が得られませんでした（' + err + '）。';
    });
}

// トークン削除
function deleteToken() {
    // トークン取得
    messaging.getToken().then(function (currentToken) {
        // トークン削除
        messaging.deleteToken(currentToken).then(function () {
            textInstanceIdToken.value = 'トークンが削除されました';
            btnSubscribe.style.display = 'block';
            btnUnSubscribe.style.display = 'none';
        }).catch(function (err) {
            textInstanceIdToken.value = 'トークンの削除に失敗しました（' + err + '）。';
        });
    }).catch(function (err) {
        textInstanceIdToken.value = 'トークン取得時にトークンの取得に失敗しました（' + err + '）。';
    });
}

// 初期化
window.onload = function () {
    // イベント登録
    btnSubscribe.onclick = requestPermission;
    btnUnSubscribe.onclick = deleteToken;
    // トークン取得
    messaging.getToken().then(function (currentToken) {
        if (currentToken) {
            // サーバ側へトークンを収集するための何らかの処理
            // sendTokenToServer(currentToken);
            textInstanceIdToken.value = currentToken;
            btnSubscribe.style.display = 'none';
            btnUnSubscribe.style.display = 'block';
        } else {
            // トークン無い場合
            textInstanceIdToken.value = '通知の許可をしていません。「通知を許可する」を押してください。';
        }
    }).catch(function (err) {
        textInstanceIdToken.value = 'トークンの取得に失敗しました（' + err + '）。';
    });
};