const { execSync } = require('child_process');
const getfile = (fname) => require('fs').readFileSync(fname, 'utf8');

console.log(process.argv);
let name = process.argv[2];

const wpsort = () => {
    getfile(name).split("wget --timeout=3 -O web.tmp").map(v => {
    let data = v.split("\n").filter(row => row.trim()[0]=="|");
    let p = data.map(v => v.split("=").map(v => v.trim().replace(/&lt;!-- .+?\-->/g, "")))
        .map(v => [v[0].split("|").pop().trim(), v.slice(1).join("=").replace(/&lt;ref.+?&lt;\/ref>/g,"")])
        .filter(v => v[1]);
    let names = p.filter(v=>v.length > 1 && (v[0].indexOf("名")!=-1 || v[0].indexOf("ふりがな")!=-1 || v[0].indexOf("name")!=-1));
    //console.log(v.split("[horizon]").pop().split("\n").shift(), names.length == 0 ? "nothing":JSON.stringify(names));
    let name = names.find(v => v[0].indexOf("名")!=-1);
    let read = names.find(v => v[0].indexOf("ふりがな")!=-1);
    console.log(v.split("[horizon]").pop().split("\n").shift(), ",",name && name[1], ",", read && read[1]);
    });
};


const ggl = (name) => {
    let qname = encodeURIComponent(name);
    let url = "https://www.google.com/search?q=${qname} -O hamakan.html";
    execSync(`wget '${url}'`);
};

const yf = (name) => {
    let qname = encodeURIComponent(name);
    let cmd0 = ` wget --timeout=3 -O yfgk.html https://search.yahoo.co.jp/image/search?p=${qname}&ei=UTF-8;`;
    let ret0 = execSync(cmd0);
    let qsed = 's/</\\n</g';
    let cmd1 = `sed -e "${qsed}" yfgk.html  | grep "preload" | grep '"image"'`
    let ret1 = execSync(cmd1);
    console.log("<hr>", name);
    console.log(ret1.toString());
};

const tm = (name) => {
    let qname = encodeURIComponent(name);
    let html = "web.tmp"
    let cmd0 = `wget --timeout=3 -O ${html} 'https://www.vip-times.co.jp/?s=&sc=st&w=${qname}'`;
    console.log(cmd0);
    let ret0 = execSync(cmd0);
    let qsed = 'talentComponent__txt';
    let cmd1 = `grep '${qsed}' ${html}`
    let ret1 = execSync(cmd1).toString();
    console.log("<hr>", name);
    console.log(ret1);
};

const wp = (name) => {
    let qname = encodeURIComponent(name);
    let html = "web.tmp"
    let cmd0 = `wget --timeout=3 -O ${html} 'https://ja.wikipedia.org/wiki/${qname}?action=edit&veswitched=1'`;
    console.log(cmd0);
    let ret0 = execSync(cmd0);
    let qsed = 'textarea';
    let cmd1 = `grep '${qsed}' ${html} -A 50`
    let ret1 = execSync(cmd1).toString();
    console.log("[horizon]", name);
    let ret2 = ret1.split("<textarea ").slice(1).shift().split("</textarea>").shift()
    console.log("[textarea]" + ret2);
};

`
伊藤 沙莉
羽生善治
加藤一二三
吉田 沙保里
宮川大輔
橋爪功
高橋英樹
高畑淳子
佐藤健
斎藤 工
坂口健太郎
寺島進
小池栄子
杉本哲太
川口 春奈
相武紗季
沢口靖子
中川大志
中村倫也
藤井聡太
梅沢富美男
浜辺 美波
鈴木亮平
`.trim().split("\n").slice(0).map(name => {
    execSync("sleep 1");
    wp(name.split(" ").join(""));
});
    
    
return;// yf(name);

`
 wget https://ja.wikipedia.org/wiki/%E8%A5%BF%E7%94%B0%E6%95%8F%E8%A1%8C#/media/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Toshiyuki_Nishida_cropped_3_Toshiyuki_Nishida_20180511.jpg
 wget --timeout=3 -O amami.html https://search.yahoo.co.jp/image/search?p=%E5%A4%A9%E6%B5%B7%E7%A5%90%E5%B8%8C&ei=UTF-8
 sed -e "s/</\n</g" amami.html  | grep "preload" | grep '"image"'
`
`
https://ja.wikipedia.org/wiki/%E5%8A%A0%E8%97%A4%E6%B5%A9%E6%AC%A1
https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%97%E3%83%AB%E8%B6%85%E5%90%88%E9%87%91
https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%B3%E3%83%8B%E3%83%B3%E3%82%B0%E7%AB%B9%E5%B1%B1
https://ja.wikipedia.org/wiki/%E6%B1%9F%E9%A0%AD2:50
https://ja.wikipedia.org/wiki/%E5%A4%A7%E6%9D%91%E5%B4%91
https://ja.wikipedia.org/wiki/%E3%81%8A%E3%81%8B%E3%81%9A%E3%82%AF%E3%83%A9%E3%83%96
https://ja.wikipedia.org/wiki/%E3%81%8F%E3%81%BE%E3%81%A0%E3%81%BE%E3%81%95%E3%81%97
https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AD%E3%81%A1%E3%82%83%E3%82%93_(%E3%81%8A%E7%AC%91%E3%81%84%E8%8A%B8%E4%BA%BA)
https://ja.wikipedia.org/wiki/%E3%82%B3%E3%82%A6%E3%83%A1%E5%A4%AA%E5%A4%AB
https://ja.wikipedia.org/wiki/%E3%82%B1%E3%83%B3%E3%83%89%E3%83%BC%E3%82%B3%E3%83%90%E3%83%A4%E3%82%B7






`
