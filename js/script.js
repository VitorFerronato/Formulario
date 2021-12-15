(function () {

    const campoCep = document.getElementById("cep");

    // Adiciona um listener (ouvinte) para monitorar quando houver um evento blur (sair do campo)
    campoCep.addEventListener("blur", function () {

        let cep = campoCep.value;

        // Remove todos os caracteres que nao sejam digitos
        cep = cep.replace(/\D/g, '');

        if (cep.length == 8) {
            buscarCep(cep);
        } else {
            alert("O Cep informado é inválido.");
        }
    });

    const buscarCep = function(cep) {

        const url = `https://viacep.com.br/ws/${cep}/json`;
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    
                    let response = JSON.parse(xhr.responseText);
                    
                    if(response.error) {
                        console.log("Cep não localizado.")
                    } else {
                        document.getElementById("cidade").value = response.localidade;
                        document.getElementById("estado").value = response.uf;
                        document.getElementById("endereco").value = response.logradouro;
                    }
                }
            }
        };

        xhr.send();
    }

})();