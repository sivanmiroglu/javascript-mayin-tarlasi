var pointsHistory = []


    if(localStorage.getItem("pointsHistory")){
        pointsHistory = localStorage.getItem("pointsHistory").split(',');
    }
    else{
        localStorage.setItem("pointsHistory","")
    }

    var localHighScore = Number(localStorage.getItem("highScore"))

    //kullanıcı tarayıcısında daha önce bu oyunun score tutulmadıysa!
    if (localHighScore == undefined || localHighScore == null) {
        localStorage.setItem("highScore", 0);
    }

    document.getElementById("highScore").innerHTML = "High Score: " + localHighScore;


    function gameStart() {

        document.getElementById('btnStart').style.display = 'none'

        var points = 0;
        document.getElementById("points").innerHTML = "Points: " + points;

        document.getElementById("container").innerHTML = "";
        var mines = [];

        for (i = 0; i < 5; i++) {

            var randomMine = Math.floor(Math.random() * 25) + 1;

            if (mines.includes(randomMine)) {
                i--;
            }
            else {
                mines.push(randomMine);
            }

        }
        
        //Sayfa açıldığında 25 tane buton ekranda kare şeklide belirsin

        var btnTop = 0;
        var btnLeft = 0;
        for (i = 1; i <= 25; i++) {

            var newButton = document.createElement("button");
            newButton.style.width = 100 + "px";
            newButton.style.height = 100 + "px";
            newButton.style.position = "fixed"
            newButton.style.left = btnLeft + "px";
            newButton.onclick = clickMine;

            newButton.id = i;

            if (i % 5 == 1 && i != 1) {

                newButton.style.left = 0 + "px";
                btnTop += 100;
                btnLeft = 0;

            }
            newButton.style.top = btnTop + "px";

            btnLeft += 100

            document.getElementById("container").appendChild(newButton);
        }


        function clickMine() {

            //Eğer tıklanılan mayın numarası dizide varsa patlat! ve kırmızı yap!
            
            var tiklanilanNo = Number(this.id);

            this.disabled = true;
            this.style.cursor ='not-allowed'

            if (mines.includes(tiklanilanNo)) {

                if (points > localHighScore) {
                    localStorage.setItem("highScore", points);
                    document.getElementById("highScore").innerHTML = "High Score: " + points;
                }

                var audio = new Audio('bomb.wav');
                audio.volume = 0.1;
                audio.play();
                document.getElementById('btnStart').style.display = 'inline'

                pointsHistory.push(points);
                localStorage.setItem("pointsHistory", pointsHistory.join())

                points = 0;
                document.getElementById("points").innerHTML = "Points: " + points;

                for (i = 1; i <= 25; i++) {

                    var btnMayin = document.getElementById(i);

                    if (mines.includes(i)) {
                        btnMayin.style.backgroundColor = 'red'
                    }
                    else {
                        btnMayin.style.backgroundColor = 'aqua'

                    }
                }


                alert("Kaybettin bebeto!");
                 if (confirm("Bir daha oynamak ister misin!")) {
                     gameStart()
                 } 
            }
            else {
                var audio = new Audio('click.wav');
                audio.play();

                this.style.backgroundColor = 'aqua';
                points += 10;

                document.getElementById("points").innerHTML = "Points: " + points;
            }
        }

        document.addEventListener('contextmenu', function (evt) {
            var btnId = Number(evt.path[0].id)

            if (mines.includes(btnId)) {
                document.getElementById(btnId).style.backgroundColor = 'pink'
                setTimeout(() => {
                    document.getElementById(btnId).style.backgroundColor = '#FCFCFC'

                }, 500);

            }
        })

    }