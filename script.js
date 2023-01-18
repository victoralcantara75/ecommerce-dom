const data = [
    {
      id: 1,
      img: "./img/jaqueta.svg",
      nameItem: "Lightweight Jacket",
      description:
        "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 2,
      img: "./img/gorro.svg",
      nameItem: "Black Hat",
      description:
        "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Acessórios"],
    },
    {
      id: 3,
      img: "./img/mascara.svg",
      nameItem: "Mask",
      description:
        "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
      value: 40,
      addCart: "Adicionar ao carrinho",
      tag: ["Acessórios"],
    },
    {
      id: 4,
      img: "./img/camiseta_preta.svg",
      nameItem: "T-Shirt",
      description:
        "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 5,
      img: "./img/camiseta_branca.svg",
      nameItem: "Short-Sleeve T-Shirt",
      description:
        "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 6,
      img: "./img/moletom.svg",
      nameItem: "Champion Packable Jacket",
      description:
        "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
  ];


var quantidadeProdutos = 0
var precoTotal = 0

function procurarProduto(nome){
    for (let i = 0; i < data.length; i++){
        if (nome == data[i].nameItem)
            return data[i]
    }
}

function adicionarCarrinho(props){

    productName = props.parentNode.childNodes[2].outerText
    console.log(productName)

    productObj = procurarProduto(productName)

    const carItems = document.getElementsByClassName("car-items")[0]

    const carItem = document.createElement('div')
    carItem.classList = "car-item flex-container"

    const image = document.createElement('img')
    image.classList = "car-image"
    image.src = productObj.img

    const carDetail = document.createElement('div')
    carDetail.classList = "car-detail"

    const name = document.createElement('p')
    name.classList = "product-name"
    name.innerHTML = productObj.nameItem

    const price = document.createElement('p')
    price.classList = "product-price"
    price.innerHTML = `R$ ${productObj.value},00`

    const add = document.createElement('p')
    add.classList = "add-carrinho"
    add.innerHTML = "Remover produto"
    add.setAttribute("onclick", `removerCarrinho(this)`)

    carDetail.appendChild(name)
    carDetail.appendChild(price)
    carDetail.appendChild(add)

    carItem.appendChild(image)
    carItem.appendChild(carDetail)

    carItems.appendChild(carItem)

    quantidadeProdutos++;
    precoTotal+= productObj.value

    mostrarResumo()
}

function removerCarrinho(props){

    const item = props.parentNode.parentNode
    const productName = item.childNodes[1].childNodes[0].outerText
    const productObj = procurarProduto(productName)
    item.remove()
    quantidadeProdutos--;
    precoTotal-= productObj.value
    mostrarResumo()
}

const carregarProdutos = () => {

    const vitrine = document.getElementsByClassName("vitrine")[0]
    
    for (let i = 0; i < data.length; i++){

        const card = document.createElement('div')
        card.classList = "card"

        const image = document.createElement('img')
        image.src = data[i].img

        const tag = document.createElement('div')
        tag.classList = "tag flex-container"
        tag.innerHTML = data[i].tag[0]

        const name = document.createElement('p')
        name.classList = "product-name"
        name.innerHTML = data[i].nameItem

        const detail = document.createElement('p')
        detail.classList = "product-detail"
        detail.innerHTML = data[i].description

        const price = document.createElement('p')
        price.classList = "product-price"
        price.innerHTML = `R$ ${data[i].value},00`

        const add = document.createElement('p')
        add.classList = "add-carrinho"
        add.innerHTML = "Adicionar ao carrinho"
        add.setAttribute("onclick", `adicionarCarrinho(this)`)

        card.appendChild(image)
        card.appendChild(tag)
        card.appendChild(name)
        card.appendChild(detail)
        card.appendChild(price)
        card.appendChild(add)

        vitrine.appendChild(card)

    }

}

function criarResumo(){

    const carrinhoVazio = document.getElementsByClassName("carrinho-vazio")[0]
    carrinhoVazio.remove()

    const adicioneItens = document.getElementsByClassName("adicione-itens")[0]
    adicioneItens.remove()

    const right = document.getElementsByClassName("right")[0]

    const resume = document.createElement('div')
    resume.classList = "resume"

    const resumeItem1 = document.createElement('div')
    resumeItem1.classList = "resume-item flex-container"

    const textQuantidade = document.createElement('span')
    textQuantidade.classList = "text"
    textQuantidade.innerHTML = "Quantidade"

    const valueQuantidade = document.createElement('span')
    valueQuantidade.classList = "value"
    valueQuantidade.innerHTML = quantidadeProdutos;

    const resumeItem2 = document.createElement('div')
    resumeItem2.classList = "resume-item flex-container"

    const textTotal = document.createElement('span')
    textTotal.classList = "text"
    textTotal.innerHTML = "Total"

    const valueTotal = document.createElement('span')
    valueTotal.classList = "value"
    valueTotal.innerHTML = `R$ ${precoTotal},00`

    resumeItem1.appendChild(textQuantidade)
    resumeItem1.appendChild(valueQuantidade)

    resumeItem2.appendChild(textTotal)
    resumeItem2.appendChild(valueTotal)

    resume.appendChild(resumeItem1)
    resume.appendChild(resumeItem2)

    right.appendChild(resume)

}

function mostrarResumo(){
    
    const resume = document.getElementsByClassName("resume")[0]

    if (quantidadeProdutos > 0){

        if (resume){
            const quant = resume.childNodes[0].childNodes[1]
            quant.innerHTML = quantidadeProdutos

            const total = resume.childNodes[1].childNodes[1]
            total.innerHTML = `R$ ${precoTotal},00`
        }
        else{
            criarResumo()
        }
    }
    else{
        if (resume){
            resume.remove()
        }

        const carItens = document.getElementsByClassName("car-items")[0]

        const carrinhoVazio = document.createElement('p')
        carrinhoVazio.classList = "carrinho-vazio"
        carrinhoVazio.innerHTML = "Carrinho vazio"

        const adicioneItens = document.createElement('p')
        adicioneItens.classList = "adicione-itens"
        adicioneItens.innerHTML = "Adicione itens"

        carItens.appendChild(carrinhoVazio)
        carItens.appendChild(adicioneItens)

    }
}


carregarProdutos();
mostrarResumo();


