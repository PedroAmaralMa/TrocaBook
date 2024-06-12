function local(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios === null){
        let dados = [
            {"id": 1, "nome": "Pedro Lucas de Faria Cardoso", "email": "satorogojo@gmail.com", "senha": "4575", "cpf": "9857458558"}
        ]
        let n = JSON.stringify(dados)
        localStorage.setItem("usuarios", n)
        return dados
    }
    return usuarios
}

function cadastrar(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    let senha = document.querySelector("#senha").value;
    let CPF = document.querySelector("#CPF").value;
    let ultima_posicao = usuarios.length - 1;
    let id = usuarios[ultima_posicao].id;
    for (let i = 0; i < usuarios.length; i++ ) {
        if (CPF === usuarios[i].cpf ){
            window.alert("Usuário já cadastrado");
            return;
        }
    }

    usuarios.push({"id": id + 1, "nome": nome, "email": email, "senha": senha, "cpf": CPF});
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    window.alert("Cadastro realizado com sucesso!\nRedirecionando para a tela de login...");
    let url = "login.html";
    let url_2 = "cadastro.html";
    window.open(url);
    window.close(url_2);  
}

function login(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let login = document.querySelector("#inputEmail3").value;
    let senha = document.querySelector("#inputPassword3").value;
    for (let i = 0; i < usuarios.length; i++) {
        if (login == usuarios[i].email && senha == usuarios[i].senha) {
            let usuario = [{"id": usuarios[i].id, "nome": usuarios[i].nome, "email": usuarios[i].email, "senha": usuarios[i].senha, "cpf": usuarios[i].cpf}];
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
            document.querySelector("#inputEmail3").value = "";
            document.querySelector("#inputPassword3").value = "";
            let url = "index.html";
            let url_2 = "login.html";
            window.open(url);
            window.close(url_2);
            return;
        }
    }

    window.alert("Cadastro não encontrado.\nVerifique se os dados estão corretos e tente novamente.")

}

function inserir_automaticamente(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let login = document.querySelector("#inputEmail3").value;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === login){
            document.querySelector("#inputPassword3").value = usuarios[i].senha;
            break;
        }

    }
}

function cadastrar_livro(){
    let user_livros = JSON.parse(localStorage.getItem("user_livros"));
    let livros = JSON.parse(localStorage.getItem("livros"));
    let titulo = document.querySelector("#titulo").value;
    let autor = document.querySelector("#autor").value;
    let ano = document.querySelector("#ano").value;
    let imagem = document.querySelector("#imagem").value;
    let id = livros[livros.length - 1].id;
    livros.push({"id": id+1, "livro": titulo, "autor": autor, "ano": ano, "imagem": imagem});
    localStorage.setItem("livros", JSON.stringify(livros));
    window.alert("anuncio realizado com sucesso!");
    if (user_livros === null){
        let user_livros = [{"id": 1,"livro": titulo, "autor": autor, "ano": ano, "imagem": imagem}];
        localStorage.setItem("livros_usuario", JSON.stringify(user_livros));
    }
    else {
        let id_user_livros = user_livros[user_livros.length - 1].id
        user_livros.push({"id": id_user_livros + 1,"livro": titulo, "autor": autor, "ano": ano, "imagem": imagem});
        localStorage.setItem("livros_usuario", JSON.stringify(user_livros));
    }
    let url = "index.html";
    let url_2 = "anunciar.html";
    window.open(url);
    window.close(url_2);
}

function cadastrar_livroP(){
    alert("Função em implementação")
}

function exibir_livros_cadastrados(){
    let div = document.querySelector(".book-card")
    let user_livros = JSON.parse(localStorage.getItem("livros_usuario"));
    if (user_livros === null){
        return
    }
    let contar = 3

    for (let i = 0; user_livros.length > i; i++){
        let img = document.createElement("img");
        img.className = `image-icon-9`
        img.loading = "lazy"
        img.alt = ""
        img.src = user_livros[i].imagem
        img.style.alignSelf = "stretch"
        img.style.flex = "1"
        img.style.position = "relative"
        img.style.borderRadius = "var(--br-x1)"
        img.style.maxWidth = "100%"
        img.style.overflow = "hidden"
        img.style.maxHeight = "100%"
        img.style.objectFit = "cover"
        img.style.marginTop = "10px"
        div.appendChild(img)
        contar ++
    }
}

function exibir_livros_negociados(){
    let div = document.querySelector(".traded-book-status")
    let negocio_livros = JSON.parse(localStorage.getItem("livronegocio"));
    if (negocio_livros === null){
        window.alert("Nenhum Livro em negociação")
        return
    }
    let contar = 6
    for (let i = 0; negocio_livros.length > i; i++){
        let divcriar = document.createElement("div")
        divcriar.style.width = "206.6px"
        divcriar.style.flexShrink = "0"
        divcriar.style.flexDirection = "column"
        divcriar.style.padding = "0 var(--padding--5xs) 0 0"
        divcriar.style.boxSizing = "border-box"
        divcriar.style.position = "relative"
        divcriar.style.display = "flex"
        divcriar.style.flexDirection = "row"
        divcriar.style.alignItems = "flex-start"
        divcriar.style.justifyContent = "flex-start"
        divcriar.style.margin = "0"
        divcriar.style.marginRight = "46.4px"
        divcriar.className = `traded-book-card${contar}`
        let img = document.createElement("img");
        img.className = `image-anuncio${i}`
        img.loading = "lazy"
        img.alt = ""
        img.src = negocio_livros[i].imagem
        img.style.alignSelf = "stretch"
        img.style.flex = "1"
        img.style.position = "relative"
        img.style.borderRadius = "var(--br-x1)"
        img.style.maxWidth = "100%"
        img.style.overflow = "hidden"
        img.style.maxHeight = "100%"
        img.style.objectFit = "cover"
        divcriar.appendChild(img)
        div.appendChild(divcriar)
        contar ++
    }
}

function logout(){
    sessionStorage.removeItem("usuario");
    let url = "index.html";
    window.close();
    window.open(url);  
}

function logado(){
    let th = document.querySelector("#cabecalhoelementos");
    let bpesquisa = document.querySelector("#pesquisa");
    let nome = document.querySelector("#saudacao")
    let user = JSON.parse(sessionStorage.getItem("usuario"));
    let login = document.querySelector("#loginbotao");
    let cadastro = document.querySelector("#cadastrobotao");
    if (user != null && login != null && cadastro != null){
        login.remove();
        cadastro.remove();

        bpesquisa.style.width = "39%"

        let a_anunciarlivro = document.createElement("a");
        a_anunciarlivro.className = "anunciar-livro4";
        a_anunciarlivro.innerHTML = "Anunciar livro";
        a_anunciarlivro.href = "anunciar.html";

        let a_meuslivros = document.createElement("a");
        a_meuslivros.className = "meus-livros4";
        a_meuslivros.innerHTML = "Meus livros";
        a_meuslivros.href = "index.html";

        let deslogar = document.createElement("button");
        deslogar.style.width = "100px";
        deslogar.style.height = "38px";
        deslogar.onclick = logout;
        deslogar.innerHTML = "Sair";
        deslogar.id = "Deslogar";

        let td_nome = document.createElement("h1");

        let p_user = document.createElement("p");
        p_user.innerHTML = `Olá,  ${user[0].nome}!`;
        p_user.style.marginTop = "-17px"
        p_user.style.marginBottom = "-42px"
        p_user.style.textAlign = "left"
        p_user.style.fontSize = "30px"
        p_user.style.paddingLeft = "18px"
        
        td_nome.appendChild(p_user);

        th.appendChild(a_anunciarlivro);
        th.appendChild(a_meuslivros);
        th.appendChild(deslogar);
        nome.appendChild(td_nome);

    }
    sessionStorage.setItem("usuario", JSON.stringify(user))
}
