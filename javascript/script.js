//--DECLARAÇÃO DE VARIÁVEIS--//
var canvas = 0;
var contexto = 0;
var altura = 0;
var largura = 0;
var maxPulos = 3;
var velocidade = 6;
var estadoAtual;
var recorde;
var img; 

estados = {
     jogar: 0,
     jogando: 1,
     perdeu: 2
};

var solo = {
    y: 550,
    altura: 50,
    x:0,



    atualiza: function(){
     this.x -= velocidade - 3.8;
      if(this.x <= -30){
         this.x = 0;
  }
    },

    desenha: function(){ //CRIAÇÃO DO MÉTODO DESENHA PARA MUDAR A COR DO CHÃO
        chao.desenha(this.x, this.y);
        chao.desenha(this.x + chao.largura , this.y);
        //contexto.fillStyle = this.cor; //SELEÇÃO DA COR - this = SELEÇÃO DA VARIÁVEL LOCAL.
    //contexto.fillRect(0, this.y, largura, this.altura); // DIMENÇÕES DO BLOCO A DESENHAR
    }
};

var bloco = { //CRIAÇÃO DE VARIÁVEL ATRIBUINDO DIVERSOS VALORES A TAL
        x:100,
        y:0,
        altura: emoji.altura,
        largura: emoji.largura,
        cor: "red",
        gravidade: 1,
        velocidade: 0,
        pulo: 20,
        qntPulos: 0,
        score: 0,
        rotacao:0,

        atualiza: function(){ //CRIAÇÃO DA GRAVIDADE PELA FUNÇÃO ATUALIZA
         this.velocidade += this.gravidade; // VELOCIDADE ENCREMENTANDO A GRAVIDADE
         this.y += this.velocidade; // MUDANDO O EIXO Y PELA FUNÇÃO ENCREMENTADA DA GRAVIDADE
         this.rotacao += Math.PI / 180 * velocidade;

        if(this.y > solo.y - this.altura && estadoAtual != estados.perdeu){ // SI POSIÇÃO Y DO BLOCO FOR MENOR QUE Y DO CHÃO MAIS ALTURA DO BLOCO.
            this.y = solo.y - this.altura; //ATRIBUINDO VALOR DA POSIÇÃO Y A POSIÇÃO DO SOLO MENOS ALTURA DO BLOCO. 
            this.qntPulos = 0; //ATRIBUINDO VALOR A ZERO A CADA VEZ QUE TOCAR AO SOLO, PARA QUANTIDADE DE PULOS NÃO LIMITAR
            this.velocidade = 0;
        }
        },
        reset: function(){
        this.velocidade = 0;
        this.y = 0;
        if(this.score > recorde){
            localStorage.setItem("recorde", this.score);// guardando valor do recorde remotamente no navegador
            recorde = this.score;
        }
        this.score = 0;
        
        },
        desenha: function(){ // CRIAÇÃO DO METODO DE DESENHO

            contexto.save();
            contexto.translate(this.x + this.largura / 2, this.y + this.altura /2);
            contexto.rotate(this.rotacao);
            emoji.desenha(-this.largura / 2, -this.altura / 2);
            contexto.restore();


            //      contexto.fillStyle = this.cor; // ATRIBUINDO A COR AO OBJETO (this = chamar variável local)
            //      contexto.fillRect(this.x, this.y, this.largura, this.altura); //ATRIBUINDO AS DIMENSÕES DO OBJETO A SER CHAMADO
            
           
        },

        pula: function(){ //CRIAÇÃO DO MÉTODO DE PULO DO BLOCO
            if(this.qntPulos < maxPulos) //DECISÃO PARA DEFINIR O MAXIMO DE QUANTIDADE DE PULOS
            this.velocidade = -this.pulo;//ATRIBUINDO A VELOCIDADE DA GRAVIDADE O VALOR DE -15 DA VARIÁVEL PULO(FAZENDO O OBJETO SUBIR -15 
                                          // CONFORME O PLANO CARTESIANO);
            this.qntPulos++; //ADICIONANDO 1 A CADA PULO PARA O CONTROLE TOTAL DE 3 PULOS.
},
    };

var obstaculos ={ //CRIANDO VARIAVEL E ATRIBUINDO DIVERSOS VALORES SOBRE ELA
    obs: [], //CRIANDO UMA VARIAVEL PARA ADICIONAR OUTRAS DENTRO
    cores: ["#7B68EE", "#FF8C00", "	#FFFF00", "#8B4513", "#32CD32"], //CRIANDO VARIAVEL PARA ADICIONAR AS CORES DE TODOS OBSTACULOS
    tempoInsere: 0,

    insere: function(){
       
        this.obs.push({
            x: largura,
            largura: 50,
            //largura: 30 + Math.floor(21 * Math.random()), //ADICIONANDO LARGURA ALEÁTORIA QUE VAI ATÉ 20
            altura: 30 + Math.floor(120 * Math.random()), // ADICIONANDO ALTURA ALEÁTPRIA QUE VAI ATÉ 119
            cor: this.cores[Math.floor(5 * Math.random())] // ADICIONANDO COR ALEATÓRIA DENTRE AS QUE ESTÃO NA VARIÁVEL CORES
        })


        if(bloco.score >= 40){
            bloco.gravidade = 1.5;
            this.tempoInsere = 38 + Math.floor(15* Math.random()); //DEFININDO A POSIÇÃO PELO TEMPO ALATÓRIO DOS OBJETOS
        }else
        if(bloco.score >=10){
            contexto.save();
            contexto.translate(largura / 2, altura /2);
            contexto.fillStyle = "black"; //definindo cor da fonte de score
    contexto.font = "50px Arial Sans-Serif ";
            contexto.fillText("Level 2!", 200, 0);
            bloco.gravidade = 1.3;
            this.tempoInsere = 45 + Math.floor(18* Math.random()); //DEFININDO A POSIÇÃO PELO TEMPO ALATÓRIO DOS OBJETOS
        } else{  
        bloco.gravidade = 1;
             this.tempoInsere = 50 + Math.floor(21* Math.random()); //DEFININDO A POSIÇÃO PELO TEMPO ALATÓRIO DOS OBJETOS
        }
        contexto.restore();
    },
    

    atualiza: function(){ //CRIANDO MÉTODO PARA ADICIONAR OS OBSTACULOS AO CANVA
       
       if (this.tempoInsere == 0) //SI TEMPO FOR MAIOR QUE 0
           this.insere();//CHAMANDO A FUNÇÃO INSERE PARA ADICIONALOS A TELA
           
       else
            this.tempoInsere--;
        for(var i = 0, tam = this.obs.length; i < tam; i++){ // ESTRUTURA PARA REPETIR A ADIÇÃO DOS OBSTACULOS NA TELA
            var obs = this.obs[i];

            obs.x -= velocidade; //AJUSTANDO O PONTO X DO OBSTACULOS CONFORME A DA VELOCIDADE(PARA FAZER O EFEITO DE CORRER OS OBSTACULOS A ESQUERDA)
            
            if(bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= solo.y - obs.altura)
            //ESTRUTURA DE DECISÃO DEFININDO AS DIMENSÕES QUE O OBSTACULO SE ENCONTRARA
                estadoAtual = estados.perdeu;

            else if(obs.x == 0){
                    bloco.score++; // adicionando valor ao score com a decição si bloco for maior que 0, porque ele sempre será
            }

           else if(obs.x <= -obs.largura){ //DEFININDO PARA OS BLOCOS SEREM RETIRADOS DO GAME
                this.obs.splice(i, 1); // COMANDO PARA RETIRADA
                tam--; //PARA EVITAR CONFLITO ENTRE 2 OU MAIS OBSTACULOS
                i--;
            }
        }
    },

    limpa: function(){
        this.obs= [];
    }, 

    desenha: function(){ //CRIANDO METODO PARA DESENHAR O LAYOUT DOS OBSTACULOS

        for(var i =0, tam = this.obs.length; i < tam; i++){ // ESTRUTURA PARA REPETIR A ADIÇÃO DOS OBSTACULOS NA TELA
            var obs = this.obs[i]; //SELECIONANDO O ELEMENTO QUE IRAR SER DESENHADO
            contexto.fillStyle = obs.cor; //DEFININDO COR PELA VARIAVEL QUE ESTÁ SETADA PARA SER ALEÁTORIA
            contexto.fillRect(obs.x, solo.y - obs.altura, obs.largura, obs.altura); //ADICIONANDO AS VARIAVEIS PARA CONSTRUÇÃO DO OBSTACULO
        }  
    },
    
};

function touch_clique(tc){

    if(estadoAtual == estados.jogando){ //DEFININDO O CLICK CONFORME AS SELEÇÕES DE
        bloco.pula() == true;                           //ESTADO DE JOGO
            }else if(estadoAtual == estados.jogar){
                estadoAtual = estados.jogando = true;
            }else if(estadoAtual == estados.perdeu && bloco.y >= 2 * altura){
                obstaculos.limpa() = true;
                estadoAtual = estados.jogar = true;
                bloco.reset() = true;
            }
}
function touch_soltou(ts){
    if(estadoAtual == estados.jogando){ //DEFININDO O CLICK CONFORME AS SELEÇÕES DE
                bloco.pula()== false;                           //ESTADO DE JOGO
             }else if(estadoAtual == estados.jogar){
                estadoAtual = estados.jogando = false;
             }else if(estadoAtual == estados.perdeu && bloco.y >= 2 * altura){
                obstaculos.limpa() = false;
                estadoAtual = estados.jogar = false;
                bloco.reset() = false;
    }
}

function mouse_clique(e){
    if(estadoAtual == estados.jogando){ //DEFININDO O CLICK CONFORME AS SELEÇÕES DE
bloco.pula();                           //ESTADO DE JOGO
    }else if(estadoAtual == estados.jogar){
        estadoAtual = estados.jogando;
    }else if(estadoAtual == estados.perdeu && bloco.y >= 2 * altura){
        obstaculos.limpa();
        estadoAtual = estados.jogar;
        bloco.reset();
    }
}
function tecla_clique(t){
    var space = 32;
    var enter = 13;
    var id = t.keyCode;

    if (id == space && estadoAtual == estados.jogando){
        bloco.pula();
    }else if(id == space && estadoAtual == estados.jogar){
        estadoAtual = estados.jogando;
    }else if(id == space  && estadoAtual == estados.perdeu && bloco.y >= 2 * altura){
       obstaculos.limpa();
       estadoAtual = estados.jogar;
       bloco.reset();
    }

    
    if (id == enter && estadoAtual == estados.jogando){
        bloco.pula();
    }else if(id == enter && estadoAtual == estados.jogar){
        estadoAtual = estados.jogando;
    }else if(id == enter  && estadoAtual == estados.perdeu && bloco.y >= 2 * altura){
       obstaculos.limpa();
       estadoAtual = estados.jogar;
       bloco.reset();
    }
}

function main(){
    altura = window.innerHeight;//TAMANHO DA ALTURA DA TELA DO USUÁRIO
    largura = window.innerWidth; //TAMANHO DA LARGURA DE TELA DO USUÁRIO
    
    if(largura >= 500){//DEFINIÇÃO DE TAMANHO DE RESOLUÇÕES
        largura = 600;
        altura = 600;
    }
    
    canvas = document.createElement("canvas"); // CRIANDO ELEMENTO CANVAS PELO JAVASCRIPT
    canvas.width = largura; // ATRIBUINDO VALOR AO CANVA DAS VARIÁVEIS CRIADAS
    canvas.height = altura;
    canvas.style.border = "0.1vw solid #000";
    contexto = canvas.getContext('2d');
    document.body.appendChild(canvas); //ADICIONANDO A VARIÁVEL CANVAS DENTRO DE BODY DO HTML

    document.addEventListener("touchstart", touch_clique);
    document.addEventListener("touchend", touch_soltou);
    document.addEventListener("keydown", tecla_clique);
    document.addEventListener("mousedown", mouse_clique); //ADICIONANDO EVENTO DE CLIQUE DO MOUSE A FUNÇÃO CLIQUE
    estadoAtual = estados.jogar;
    recorde = localStorage.getItem("recorde");

    if(recorde == null){
        recorde = 0;
    }

    img = new Image();
    img.src = "../img/img.png";

    roda(); //--chamando função roda
}


function roda(){
atualiza();//chamando função atualiza
desenha();//chamando função desenha

window.requestAnimationFrame(roda); // COMANDO DE MODO DE ANIMAÇÃO FRAME POR FRAME
}


function atualiza(){
if(estadoAtual == estados.jogando){

    obstaculos.atualiza();//CHAMANDO FUNÇÃO ATUALIZA DA VARIÁVEL OBSTACULOS.
}
solo.atualiza();
bloco.atualiza();///CHAMANDO FUNÇÃO ATUALIZA DA VARIÁVEL BLOCO.
}

   
function desenha(){
//     -- contexto.fillStyle = "#1E90FF" // COMANDO PARA MUDAR COR DE FUNDO
//     -- contexto.fillRect(0,0,largura, altura); // COMANDO SELECIONANDO A ÁREA A MUDAR O FUNDO

    backg.desenha(0,0);
  

    contexto.fillStyle = "black"; //definindo cor da fonte de score
    contexto.font = "50px Arial Sans-Serif "; // definindo tamanho de score
    contexto.fillText(bloco.score, 514,68); // colocando e posicionando score na tela

    if(estadoAtual == estados.jogar){
       //    contexto.fillStyle = "green";//CLOCANDO OS QUADRADOS QUE SIMBOLIZAM QUE PERDEU, REINICIAR E ETC..
       //    contexto.fillRect(largura/2 - 50, altura /2 -50, 100,100);
       jogar.desenha(largura / 2 -192, altura /2 - 138);

    }else if(estadoAtual == estados.perdeu){
        retry.desenha(largura / 2 - 103.5 ,altura /2  - 103.5);
        //contexto.fillStyle = "red";
        //contexto.fillRect(largura/2 - 50, altura /2 -50, 100,100);
        contexto.save();//salvando contexto
        contexto.translate(largura / 2, altura /2);
        contexto.fillStyle = "black";
        
        if(bloco.score > recorde){
            contexto.fillText("Novo Record!", -150, -95);
        }
        else if(recorde < 10){
            contexto.fillText("Recorde " + recorde, -99, -95);
        }
        else if(recorde >=10 && recorde < 100){
            contexto.fillText("Recorde " + recorde, -112, -95);
        }
        else{
            contexto.fillText("Recorde " + recorde, -125, -95);
        }
        

        if(bloco.score < 10){
        contexto.fillText(bloco.score, -15,20);
   
        }else if(bloco.score >= 10 && bloco.score < 100){
            contexto.fillText(bloco.score, -27, 20);
        }else{
            contexto.fillText(bloco.score, -43, 20);
        }
        
        contexto.restore();
    }else if(estadoAtual == estados.jogando){
        obstaculos.desenha();
    }
        

    

    solo.desenha(); //CHAMANDO A FUNÇÃO DA VARIÁVEL SOLO, PARA O SOLO SER DESENHADO.
    bloco.desenha(); //CHAMANDO A FUNÇÃO DA VRAIÁVEL BLOCO, PARA O BLOCO SER ADICIONADO AO DESENHO.
    
}
main(); // chamando função main
var body = document.getElementsByTagName("body");
body.innerHTML = "<a>Jogo para teste de lógica de programação - YanCode<a>";

