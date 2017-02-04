// モジュール読み込み
var client = require('cheerio-httpcli');

var date = new Date();
var fullYear = date.getFullYear();

for (var year = 2000; year <= fullYear; year++) {
var text = year + '年のテレビアニメ';
var search_txt = encodeURIComponent(text);
// スクレイピング開始
client.fetch('https://ja.wikipedia.org/wiki/Category:' + search_txt, {}, function (err, $, res) {
    // アニメのタイトルを取得
    $('.mw-category-group a').each(function() {
      console.log('"' + $(this).text() + '",' + $(this).attr('href'));
    });

    // 2ページ目取り込む
    var nextPageLink = $("a:contains('次のページ')").attr('href')
    if (nextPageLink) {
      client.fetch('https://ja.wikipedia.org/' + nextPageLink, {}, function (err, $, res) {
          // アニメのタイトルを取得
          $('.mw-category-group a').each(function() {
            console.log('"' + $(this).text() + '",' + $(this).attr('href'));
          });
      });
    }

  });
}

