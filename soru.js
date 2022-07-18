function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
    // this.cevabiKontrolEt = function(cevap) {
    //     return cevap === this.dogruCevap
    // }
    
}

/* her bir cevap ataması tek kod ile (prototype) birlikte tüm sorulara tanımlamak için cevabı kontrol et function u prototype içerisine gömüldü ve ne kadar soru yazarsak yazalım cevaın kontrol et prototype içerisinde görünmüş olacak */

Soru.prototype.cevabiKontrolEt = function(cevap) {
return cevap === this.dogruCevap
}

 /* dizi halinde de yapıla bilir */

 let sorular =  [
    new Soru("1-Hangisi Javascript Paket yönetim uygulamasıdır?",{ a: "Node.js", b: "Typescript", c: "Npm", d: "Nuget" }, "c"),
    new Soru("2-Hangisi front-end kapsamında değerlendirilmez?",{ a: "Css", b: "HTML", c: "JavaScript", d: "sql"}, "d"),
    new Soru("3-Hangisi back-end kapsamında değerlendirilmez?",{ a: "node.js", b: "typescript", c: "Angular", d: "react"}, "a"),
    new Soru("4-Hangisi JavaScript programlama dilini kullanmaz?",{ a: "react", b: "angular", c: "vuejs", d: "asp.net"}, "d"),
];