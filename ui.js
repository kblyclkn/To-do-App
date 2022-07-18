function UI() {
    this.btn_start = document.querySelector(".btn_start"),
    this.btn_next = document.querySelector(".next_btn"),
    this.btn_replay = document.querySelector(".btn_replay"),
    this.btn_quit = document.querySelector(".btn_quit"),
    this.quiz_box = document.querySelector(".quiz_box"),
    this.score_box = document.querySelector(".score_box"),
    this.option_list = document.querySelector(".option_list"),
    this.correctIcon = '<div class="icon"><i class="fa fa-check"></i></div>', // cevap seçeneklerinde renk ve iconumuz olacaktı bu iconları dışarı tanımladık
   this.incorrectIcon = '<div class="icon"><i class="fa fa-times"></i></div>', // cevap seçeneklerinde renk ve iconumuz olacaktı bu iconları dışarı tanımladık
   this.time_text = document.querySelector(".time_text"),
   this.time_second = document.querySelector(".time_second"),
   this.time_line = document.querySelector(".time_line")
}

UI.prototype.soruGoster = function(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = ``;

    for (let cevap in soru.cevapSecenekleri) {
        options +=
            `
                <div class="option">
                    <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
            
                </div>            
            `;
    }

    document.querySelector(".question_text").innerHTML = question
    this.option_list.innerHTML = options;

    const option = this.option_list.querySelectorAll(".option"); // cevap seçeneklirine css atamaları yapacağız ve html içerisinde cevap seçeneklerinin olduğu class isimleri option class ları bunlara ulaştık.

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)") // click eventi verdik ve optionSelected dedik bu işlem seçenek işraretlendiğinde yada tıklandığında harekete geçir demek
    }
}
/* kaçıncı soruda olduğumuzun gösterilmesi */
UI.prototype.soruSayisiniGoster = function(soruSirasi, toplamSoru) {
    let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>`;
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}

UI.prototype.skoruGoster = function (toplamSoru, dogruCevap) {
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz`;
    document.querySelector(".score_box .score_text").innerHTML = tag;
}