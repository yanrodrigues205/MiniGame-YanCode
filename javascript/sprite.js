function Sprite(x, y, largura, altura){
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    
    this.desenha = function(xCanvas, yCanvas){
        contexto.drawImage(img,this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
    }
}
var backg = new Sprite(0,0,600,600),
    emoji = new Sprite(620,35, 60,60),
    retry = new Sprite( 2, 605, 207,190),
    jogar = new Sprite(609, 110, 384, 276),
    chao =  new Sprite(10, 900, 600, 50);