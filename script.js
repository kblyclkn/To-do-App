
    const quiz = new Quiz(sorular);
    const ui = new UI();
/* index içerisinde bir buton oluşturduk ve buna her basıldığında yeni bir soru getirmesini istiyoruz bu yüzden btn-start class lı butona bir click evet atadık ve bir fonksiyon verdik 4 adet sorumuz var şuan için butona her tıkladığımızda sorularımız geliyor fakat sorular bittikten sonra undifind hatası alıyoruz bunu engellemek için bir if blogu oluşturduk ve quiz içindeki sorular uzunluğu quiz içerisikindeki soru indexi ile eşit olmayana kadar soru getir sonrasında else blogu içerisinde quiz bitti de.  */

    ui.btn_start.addEventListener("click", function(){
       
            ui.quiz_box.classList.add("active"); // quizbox clasının içerisine active class ı ekledik ki butona bastığımızda sorular gelsin css de bunun için kod yazdık opacity ve pointer event olan
            startTimer(10);
            startTimerLine();
            ui.soruGoster(quiz.soruGetir()); // soruları getiren kodumuz bunu quiz box içine aktaracağız
            ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length); // kaçıncı soruda olduğumuzu göstermek için ilk soruda getirilecek olan sıra
        ui.btn_next.classList.remove("show") // sorular ilk geldiğinde sonraki soru butonu görünmeyecek
    });


/* Sonraki soruların gösterilermi için eklediğimiz butonun çalışması */

ui.btn_next.addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        clearInterval(counter); // geri sayımı durdur
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        ui.soruGoster(quiz.soruGetir()); // soruları getiren kodumuz bunu quiz box içine aktaracağız
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length); // kaçıncı soruda olduğumuzu göstermek için ilk soruda getirilecek olan sıra
        ui.btn_next.classList.remove("show")
    }else {
        clearInterval(counter); // geri sayımı durdur
        clearInterval(counterLine);
        ui.quiz_box.classList.remove("active"); // quiz bitince score box gelecek gelmeden önce quiz box görünmesin
        ui.score_box.classList.add("active"); // score box u active hale getirdik quiz bittikten sonra
        ui.skoruGoster(quiz.sorular.length,quiz.dogruCevapSayisi);
    }
});

/* quiz bitti ve başa al buttonlarının çalışması  */

ui.btn_quit.addEventListener("click", function() {
    window.location.reload();
})

ui.btn_replay.addEventListener("click", function() {
    quiz.soruIndex = 0; // sorular 0 landı
    quiz.dogruCevapSayisi = 0; // cevap sayısı 0 landı
    ui.btn_start.click(); // btn start a js tarafından basılmış olacak
    ui.score_box.classList.remove("active"); // scorebox sayfadan kalkacak
})

// const option_list = document.querySelector(".option_list");
// const correctIcon = '<div class="icon"><i class="fa fa-check"></i></div>'; // cevap seçeneklerinde renk ve iconumuz olacaktı bu iconları dışarı tanımladık

// const incorrectIcon = '<div class="icon"><i class="fa fa-times"></i></div>'; // cevap seçeneklerinde renk ve iconumuz olacaktı bu iconları dışarı tanımladık


    
/* seçilen şıklara yeni class lar ekleme şıklar doğruysa yeşil yanlışsa kırmızı olacak */
    function optionSelected(option) {
        clearInterval(counter); // seçim yapıldığında geri sayımı durdur
        clearInterval(counterLine); // seçim yapıldığında dur
        let cevap = option.querySelector("span b").textContent;
        let soru = quiz.soruGetir();

        if(soru.cevabiKontrolEt(cevap)) {
            quiz.dogruCevapSayisi += 1;
            option.classList.add("correct");
            option.insertAdjacentHTML("beforeend", ui.correctIcon); // tik işareti eklendi
        }else {
            option.classList.add("incorrect");
            option.insertAdjacentHTML("beforeend", ui.incorrectIcon); // çarpı işareti eklendi
        }
        for(let i=0; i< ui.option_list.children.length; i++ ){ // tek bir seçenek işaretleye bilmek için yazılan döngü
            ui.option_list.children[i].classList.add("disabled") // diğer şıklara basamaması için 
        }
        ui.btn_next.classList.add("show") // cevap seçilince sonraki soru butonu gelecek
    }


    /* cavaplama süresinin eklenmesi */
let counter;

    function startTimer(time) {
        counter = setInterval(timer, 1000) // her 1 saniyede süre 1 düşecek
        function timer() {
            ui.time_second.textContent = time;
            time--; // azaltma işlemi

            if(time < 0) { // 0 dan küçük olduğunda
                clearInterval(counter); // - e düşme
                ui.time_text.textContent = "Süre Bitti"; // 10dan geriye sayacak ve 0 olduğunda süre bitti yazacak
                let cevap = quiz.soruGetir().dogruCevap; // süre bittiğinde doğru cevapları getirecek

                for (let option of ui.option_list.children) { // süre bittiğinde doğru cevapları getirecek
                    if( option.querySelector("span b").textContent == cevap) { // gelen cevap span içerisindeki cevapla doğru olan ise 
                        option.classList.add("correct"); // correct eklenecek 
                        option.insertAdjacentHTML("beforeend", ui.correctIcon);
                    }

                    option.classList.add("disabled"); // cevaplama işlemi durduruldu
                }
                ui.btn_next.classList.add("show"); // sonraki soru butonu süre bitip cevap kendiliğinden geldikten sonra gösterilecek
            }
        }
    }


    /* süre animasyonunun eklenmesi */
    let counterLine;
    function startTimerLine () {
        let line_width = 0;
        counterLine = setInterval(timer, 20); // sn nin 10 da biri süre boyunca
        function timer() { // her çağırıldığında
            line_width += 1; // 5 er arttır
            ui.time_line.style.width = line_width + "px"; // sonuna px ekle

            if(line_width > 549) {
                clearInterval(counterLine);
            }
        }
    }

